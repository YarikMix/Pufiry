import { Actions, ExtensionState, state } from "../state/extensionState";

interface MessageWithoutPayload {
	type: Actions.GET_STATE;
	payload?: never;
}

interface MessageWithPayload {
	type: Actions.SET_STATE;
	payload: Partial<ExtensionState>;
}

type Message = MessageWithoutPayload | MessageWithPayload;

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set(state);

	chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
		if (message.type === Actions.GET_STATE) {
			sendResponse(state);
		}

		if (message.type === Actions.SET_STATE) {
			Object.assign(state, message.payload);
			chrome.storage.local.set(state);
		}
	});
});