import { Devvit } from "@devvit/public-api";
import { BlocksToWebviewMessage } from "../../game/shared.js";
import { WEBVIEW_ID } from "../constants.js";

export const sendMessageToWebview = (
  context: Devvit.Context,
  message: BlocksToWebviewMessage,
) => {
  context.ui.webView.postMessage(WEBVIEW_ID, message);
};


export const stringifyValues = <T extends Record<string, any>>(
  obj: T,
): Record<keyof T, string> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, String(value)]),
  ) as Record<keyof T, string>;
};

export const isServerCall = (e: unknown) => {
  if (e instanceof Error && e.message === "ServerCallRequired") {
    // console.log(`Throwing circuit breaker!`);
    throw e;
  }
};