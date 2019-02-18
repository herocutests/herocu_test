import { ADD_MESSAGE, ADD_MESSAGES_HISTORY, ADD_USERSLIST, ADD_USER, SET_USER, SET_ERROR, TOGGLE_STICKERS, EDIT_MESSAGE, READ_MESSAGES, USER_TYPING, SET_USERS_COUNT } from "../actions/index";

const initialState = {
	isUserLoggedIn: false,
	isWindowFocus: true,
	uid: -1,
	usersList: {},
	messagesList: {},
	midEdit: -1,
	editMessage: '',
	errorLoginMessage: '',
	isStickersShown : false,
	lastRead : 0,
	usersTyping : "",
	usersCount: 0
};

function rootReducer(state = initialState, action) {
	if (action.type === ADD_MESSAGE) {
	    return {...state, messagesList: {...state.messagesList, [action.mid]: action.message}}
	}
	if (action.type === ADD_USER) {
	    return {...state, usersList: {...state.usersList, [action.uid]: action.user}}
	}
	if (action.type === ADD_MESSAGES_HISTORY) {
		return Object.assign({}, state, {
	        messagesList: action.history
	    });
	}
	if (action.type === ADD_USERSLIST) {
		return Object.assign({}, state, {
	        usersList: action.users
	    });
	}
	if (action.type === SET_USER) {
		return Object.assign({}, state, {
			isUserLoggedIn : action.uid !== -1 ? true : false,
	        uid: action.uid
	    });
	}
	if (action.type === TOGGLE_STICKERS) {
		return Object.assign({}, state, {
			isStickersShown : state.isStickersShown === false ? true : false,
	        uid: action.uid
	    });
	}
	if (action.type === SET_ERROR) {
		return Object.assign({}, state, {
			errorLoginMessage : action.error
	    });
	}
	if (action.type === SET_USERS_COUNT) {
		return Object.assign({}, state, {
			usersCount : action.count
	    });
	}
	if (action.type === EDIT_MESSAGE) {
		return Object.assign({}, state, {
			midEdit : action.mid,
			editMessage: action.mid === -1 ? "" : state.messagesList[action.mid]['msg']
	    });
	}
	if (action.type === READ_MESSAGES) {
		for(var i = state.lastRead; i <= action.toMessage; i++){
			state.messagesList[i]['unread'] = {...state, messagesList: {...state.messagesList, [i]: {...state.messagesList[i], ['unread'] : false}}}
	    }
	    return {...state, lastRead: action.toMessage}
	}
	if (action.type === USER_TYPING) {
		var users = "";
		var index = action.users.indexOf(state.uid);
		if (index !== -1) action.users.splice(index, 1);
		for(var i = 0; i < action.users.length; i++){
			users += state.usersList[action.users[i]]['name']+(i === action.users.length - 1 ? ' печата'+(action.users.length > 1 ? 'ют' : 'ет')+' сообщение:' : ', ');
		}
		return {...state, usersTyping: users}
	}
	return Object.assign({}, state, {});
}

export default rootReducer;