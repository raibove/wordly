export type Page =
  | "home"
  | "pokemon";

export type WebviewToBlockMessage = {
  type: "GET_POKEMON_REQUEST";
  payload: { name: string };
};

export type BlocksToWebviewMessage = {
  type: "INIT";
  payload: {};
} | {
  type: "GET_POKEMON_RESPONSE";
  payload: { number: number; name: string; error?: string };
};

export type DevvitMessage = {
  type: "devvit-message";
  data: { message: BlocksToWebviewMessage };
};
