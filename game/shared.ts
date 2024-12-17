export interface ChallengeInfo {
  words: string,
  totalPlayers: number,
}

export type Page = "home" | "leadboard" | 'alreadyPlayed' | 'loading';

export type WebviewToBlockMessage = { type: "INIT" } |
{
  type: "UPDATE_SCORE";
  value: number;
} | 
{
  type: "GET_LEADERBOARD";
} | {
  type: "GET_USER_RANK";
} | {
  type: "CREATE_NEW_GAME"
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
     leaderboard: {member: string, score: number}[]
    }
  }
  | {
    type: "USER_RANK";
    payload: {
      rank: number;
      score: number;
    }
  }

export type DevvitMessage = {
  type: "devvit-message";
  data: { message: BlocksToWebviewMessage };
};
