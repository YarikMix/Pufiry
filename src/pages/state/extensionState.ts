import { proxy } from "valtio";

export enum Actions {
  GET_STATE = "get-state",
  SET_STATE = "set-state",
}

export enum Mode {
  fullPage,
  selective
}

export const state = proxy({
  mode: Mode.selective,
});

export type ExtensionState = typeof state;

export const updateState = (payload: Partial<typeof state>) => {
  chrome.runtime.sendMessage({ type: Actions.SET_STATE, payload });
};
