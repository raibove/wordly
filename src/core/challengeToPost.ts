import { RedisType } from "./challenge.js";

export * as ChallengeToPost from "./challengeToPost.js";

// Original to make it super explicit since we might let people play the archive on any postId
export const getChallengeToOriginalPostKey = () =>
  `challenge_to_original_post` as const;

export const getChallengeNumberForPost =  async ({ redis, postId }: {redis: RedisType, postId: string}) => {
    const challengeNumber = await redis.zScore(
      getChallengeToOriginalPostKey(),
      postId,
    );

    if (!challengeNumber) {
      throw new Error(
        "No challenge number found for post. Did you mean to create one?",
      );
    }
    return challengeNumber;
  }

export const getPostForChallengeNumber = async ({ redis, challenge }: {redis: RedisType, challenge: number}) => {
    const posts = await redis.zRange(
      getChallengeToOriginalPostKey(),
      challenge,
      challenge,
      { by: "score" },
    );

    if (!posts) {
      throw new Error("No post found for challenge number");
    }

    if (posts.length !== 1) {
      throw new Error("Multiple posts found for the same challenge number");
    }

    return posts[0].member;
  }

export const setChallengeNumberForPost =   async ({ redis, challenge, postId }: {redis: RedisType, challenge: number, postId: string}) => {
    await redis.zAdd(getChallengeToOriginalPostKey(), {
      member: postId,
      score: challenge,
    });
  }