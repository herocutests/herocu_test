export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_MESSAGES_HISTORY = "ADD_MESSAGES_HISTORY";
export const ADD_USERSLIST = "ADD_USERSLIST";
export const ADD_USER = "ADD_USER";
export const SET_USER = "SET_USER";
export const TYPE_USERNAME = "TYPE_USERNAME";
export const SET_ERROR = "SET_ERROR";
export const TOGGLE_STICKERS = "TOGGLE_STICKERS";
export const SEND_STICKERS = "SEND_STICKERS";
export const EDIT_MESSAGE = "EDIT_MESSAGE";
export const READ_MESSAGES = "READ_MESSAGES";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const USER_TYPING = "USER_TYPING";
export const SET_USERS_COUNT = "SET_USERS_COUNT";

export function addMessage(message, mid) {
	return { type: "ADD_MESSAGE", message : message, mid : mid}
};

export function addMessagesHistory(history) {
	return { type: "ADD_MESSAGES_HISTORY", history }
};

export function addUsersList(users) {
	return { type: "ADD_USERSLIST", users }
};

export function addUser(user, uid) {
	return { type: "ADD_USER", user: user, uid : uid }
};

export function setUser(uid) {
	return { type: "SET_USER", uid }
};

export function typeUsername(e) {
	return { type: "TYPE_USERNAME", e: e }
};

export function setError(error) {
	return { type: "SET_ERROR", error: error }
};

export function toggleStickers() {
	return { type: "TOGGLE_STICKERS" }
};

export function sendSticker(sid) {
	return { type: "SEND_STICKERS", sid : sid }
};

export function editMessage(mid) {
	return { type: "EDIT_MESSAGE", mid : mid }
};

export function readMessages(toMessage) {
	return { type: "READ_MESSAGES", toMessage : toMessage }
};

export function sendMessage(e, mid) {
	return { type: "SEND_MESSAGE", e: e, mid : mid }
};

export function usersTyping(users) {
	return { type: "USER_TYPING", users: users}
};

export function setUsersCount(count) {
	return { type: "SET_USERS_COUNT", count: count}
};