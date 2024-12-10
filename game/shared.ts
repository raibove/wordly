export interface ChallengeInfo {
  words: string,
  totalPlayers: number,
}

export type Page =
  | "home";

export type WebviewToBlockMessage = { type: "INIT" } 

export type BlocksToWebviewMessage = {
  type: "INIT_RESPONSE";
  payload: {
    postId: string;
    username: string;
    challengeInfo: ChallengeInfo
  };
} 

export type DevvitMessage = {
  type: "devvit-message";
  data: { message: BlocksToWebviewMessage };
};
