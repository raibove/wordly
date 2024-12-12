import { RedisType } from "./challenge.js";
export * as ChallengeLeaderboard from "./leaderboard.js";

export const getChallengeLeaderboardScoreKey = (challenge: number) =>
    `challenge:${challenge}:leaderboard:score` as const;

export const getLeaderboardByScore = async ({ redis, challenge, sort, start, stop }: {
    redis: RedisType,
    challenge: number,
    sort: "ASC" | "DESC",
    start: number,
    stop: number
}) => {
    const result = await redis.zRange(
        getChallengeLeaderboardScoreKey(challenge),
        start,
        stop,
        { by: "rank", reverse: sort === "DESC" },
    );

    if (!result) {
        throw new Error(`No leaderboard found challenge ${challenge}`);
    }
    return result;
}

export const addEntry = async ({ redis, challenge, username, score, avatar }:
    {
        redis: RedisType,
        challenge: number,
        username: string,
        score: number
    }
) => {
    console.log(`Adding entry for challenge ${challenge} with username ${username} and score ${score}`);
    await redis.zAdd(getChallengeLeaderboardScoreKey(challenge), {
        member: username,
        score 
    });
}

/**
 * Return 0 based! (0 is the best)
 *
 * I d
 */
export const getRankingsForMember =  async ({ redis, challenge, username }: {
    redis: RedisType,
    challenge: number,
    username: string
}) => {
      // TODO: Workaround because we don't have zRevRank
      const totalPlayersOnLeaderboard = await redis.zCard(
        getChallengeLeaderboardScoreKey(challenge),
      );
  
      const userRank = await redis.zRank(
        getChallengeLeaderboardScoreKey(challenge),
        username,
      );

      const score =  await redis.zScore(
        getChallengeLeaderboardScoreKey(challenge),
        username,
    );


      return {
        rank: totalPlayersOnLeaderboard - (userRank ?? 0),
        score: score ?? 0
      };
    }
  
    export const getHasUserPlayedChallenge = async ({redis, challenge, username}: {
        redis: RedisType,
        challenge: number,
        username: string
    }) => {
        const score = await redis.zScore(
            getChallengeLeaderboardScoreKey(challenge),
            username,
        );
        return Boolean(score);
    }