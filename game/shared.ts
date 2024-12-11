export interface ChallengeInfo {
  words: string,
  totalPlayers: number,
}

export type Page = "home" | "leadboard" | '';

export type WebviewToBlockMessage = { type: "INIT" } |
{
  type: "UPDATE_SCORE";
  value: number;
} | 
{
  type: "GET_LEADERBOARD";
}

export type BlocksToWebviewMessage = {
  type: "INIT_RESPONSE";
  payload: {
    postId: string;
    username: string;
    challengeInfo: ChallengeInfo,
    hasUserPlayedChallenge: boolean;
  } 
} | {
    type: "LEADERBOARD_SCORE";
    payload: {
      rank: number;
      score: number;
    }
  }

export type DevvitMessage = {
  type: "devvit-message";
  data: { message: BlocksToWebviewMessage };
};
