export * as Challenge from './challenge.js';
import { Devvit, Post, TriggerContext } from "@devvit/public-api";
import { stringifyValues } from './utils/utils.js';
import { Preview } from './components/Preview.js';
import { getRandomWords } from './words.js';
import { ChallengeToPost } from './challengeToPost.js';

const WORDS_PER_LEVEL = 5;

export const getCurrentChallengeNumberKey = () => 'current_challenge_number' as const;

export const getChallengeKey = (challenge: number) => `challenge:${challenge}` as const;

export type RedisType = Devvit.Context['redis']

export const getCurrentChallengeNumber = async ({ redis }: { redis: RedisType }) => {
  const currentChallengeNumber = await redis.get(getCurrentChallengeNumberKey());
  if (!currentChallengeNumber) {
    throw new Error('No current challenge number found');
  }
  return parseInt(currentChallengeNumber);
}

export const incrementCurrentChallengeNumber = async ({ redis }: { redis: RedisType }) => {
  await redis.incrBy(getCurrentChallengeNumberKey(), 1);
}

export const setCurrentChallengeNumber = async ({ redis, number }: { redis: RedisType, number: Number }) => {
  await redis.set(getCurrentChallengeNumberKey(), number.toString());
}

export const getChallenge = async ({ redis, challenge }: { redis: RedisType, challenge: any }) => {
  const result = await redis.hGetAll(getChallengeKey(challenge));

  if (!result) {
    throw new Error('No challenge found');
  }
  return result;
}

interface ChallengeConfig {
  redis: RedisType,
  challenge: number,
  config: {
    words: string[],
    totalPlayers: number,
  }
}

export const setChallenge = async ({ redis, challenge, config }: ChallengeConfig) => {
  await redis.hSet(getChallengeKey(challenge), stringifyValues(config));
}

export const initialize = async ({ redis }: { redis: RedisType }) => {
  const result = await redis.get(getCurrentChallengeNumberKey());
  if (!result) {
    await redis.set(getCurrentChallengeNumberKey(), '0');
  } else {
    console.log('Challenge key already initialized');
  }
}

export const incrementChallengeTotalPlayers = async ({ redis, challenge }: { redis: RedisType, challenge: number }) => {
  await redis.hIncrBy(getChallengeKey(challenge), 'totalPlayers', 1);
}


export const makeNewChallenge = async ({ context }: { context: Devvit.Context }) => {
  console.log('Making new challenge...');
  const [currentChallengeNumber, currentSubreddit] = await Promise.all([
    // WordList.getCurrentWordList({
    //   redis: context.redis,
    // }),
    // ChallengeToWord.getAllUsedWords({
    //   redis: context.redis,
    // }),
    getCurrentChallengeNumber({ redis: context.redis }),
    context.reddit.getCurrentSubreddit(),
  ]);

  console.log('Current challenge number:', currentChallengeNumber);

  // // Find index of first unused word
  // const unusedWordIndex = wordList.findIndex((word: string) => !usedWords.includes(word));

  // if (unusedWordIndex === -1) {
  //   throw new Error('No unused words available in the word list');
  // }

  // const newWord = wordList[unusedWordIndex];
  const newWords = getRandomWords(WORDS_PER_LEVEL)
  const newChallengeNumber = currentChallengeNumber + 1;

  console.log('Current challenge number:', currentChallengeNumber);

  let post: Post | undefined;

  try {
    // TODO: Transactions are broken
    const txn = context.redis;
    // const txn = await context.redis.watch();
    // await txn.multi();

    // Clean up the word list while we have the data to do so
    // await WordList.setCurrentWordListWords({
    //   redis: txn,
    //   // Remove all words up to and including the found word
    //   words: wordList.slice(unusedWordIndex + 1),
    // });

    post = await context.reddit.submitPost({
      subredditName: currentSubreddit.name,
      title: `Wordly #${newChallengeNumber}`,
      preview: <Preview />,
    });

    await setChallenge({
      redis: txn,
      challenge: newChallengeNumber,
      config: {
        words: newWords,
        totalPlayers: 0,
      },
    });

    await setCurrentChallengeNumber({ number: newChallengeNumber, redis: txn });
    // await ChallengeToWord.setChallengeNumberForWord({
    //   challenge: newChallengeNumber,
    //   redis: txn,
    //   word: newWord,
    // });
    await ChallengeToPost.setChallengeNumberForPost({
      challenge: newChallengeNumber,
      postId: post.id,
      redis: txn,
    });

    // Edge case handling for the first time
    // if (currentChallengeNumber > 0) {
    //   await Streaks.expireStreaks({
    //     redis: context.redis,
    //     // @ts-expect-error THis is due to the workaround
    //     txn,
    //     challengeNumberBeforeTheNewestChallenge: currentChallengeNumber,
    //   });
    // }

    // await txn.exec();

    console.log(
      'New challenge created:',
      'New Challenge Number:',
      newChallengeNumber,
      'New words:',
      newWords,
      'Post ID:',
      post.id
    );

    return {
      postId: post.id,
      postUrl: post.url,
      challenge: newChallengeNumber,
    };
  } catch (error) {
    console.error('Error making new challenge:', error);

    // If the transaction fails, remove the post if created
    if (post) {
      console.log(`Removing post ${post.id} due to new challenge error`);
      await context.reddit.remove(post.id, false);
    }

    throw error;
  }
}
