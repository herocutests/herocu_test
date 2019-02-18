import io from 'socket.io-client';
import * as actions from "./actions/index";
import helperFunctions from "./helper";
import { SET_ERROR, EDIT_MESSAGE } from "./actions/index";

const url = (window.location.hostname === "localhost" ? "http://localhost:5000/" : window.location.hostname)
var socket = null, isTyping = false, intervalStopTyping;

var stopTyping = () => {
	socket.emit('userStopTyping');
	isTyping = false;
}

export function Middleware(store) {
  return next => action => {
	if(action.type === "TYPE_USERNAME"){
		let value = action.e.target.value.replace(/ /g, "");
		if(helperFunctions.isEmptyValue(value)){
			return next({
	        	type: SET_ERROR,
	        	error: "Не корректное имя"
	        });
		}
	    if(!helperFunctions.isEnterButton(action.e))
			return next({
		    	type: SET_ERROR,
		    	error: ""
		    });
	    socket.emit('userName', {'user': value});
	    return next({
			type: SET_ERROR,
			error: ""
		});
	}
	if(action.type === "SEND_MESSAGE"){
	    let e = action.e;
	    if(helperFunctions.isEnterCtrlButton(e)){
			e.target.value += '\r\n';
			return;
		}
		if(helperFunctions.isEnterButton(e)){
			e.preventDefault();
			socket.emit('addMessage', {'message': e.target.value, mid : action.mid});
			e.target.value = "";
			return next({
				type: EDIT_MESSAGE,
				mid: -1
			});
		}
		clearTimeout(intervalStopTyping);
		intervalStopTyping = setTimeout(stopTyping, 1000);
		if(isTyping === true)
			return;
		socket.emit('userTyping');
		isTyping = true;
	}
	if(action.type === "SEND_STICKERS"){
		socket.emit('addSticker', {'message': action.sid.toString()});
	}
	return next(action);
}
}


export default function(store) {
	let windowFocus = true;
	socket = io.connect(url, {secure: true});
	socket.on('existUsername', () => {
	    store.dispatch(actions.setError("Пользователь с таким именем уже есть"));
	});
    socket.on('incorrectUsername', () => {
        store.dispatch(actions.setError("Не корректное имя"));
    });
    socket.on('loginUser', () => {
    	store.dispatch(actions.setUser(-1));
	});
	socket.on('userLoggedIn', (data) => {
		store.dispatch(actions.setUser(data.uid));
	});
	socket.on('returnUsername', (data) => {
		store.dispatch(actions.setUser(data.uid));
	});
	socket.on('chatHistory', (data) => {
		store.dispatch( actions.addUsersList(data.userList) );
		store.dispatch( actions.addMessagesHistory(data.chat));
		store.dispatch( actions.setUsersCount(data.users));
	});
	socket.on('usersCount', (data) => {
		store.dispatch( actions.setUsersCount(data));
	});
	socket.on('rewriteMessage', (data) => {
		store.dispatch( actions.addMessage(data.message, data.mid) );
	});
	socket.on('addMessage', (data) => {
		store.dispatch( actions.addMessage(data.message, data.id) );
		if(windowFocus === false && data.message['isSystem'] === false){
			document.getElementById('chatAudio').play();
			document.title = "New messages";
		}
		if(windowFocus === true)
			socket.emit('readAll');
	});
	socket.on('readAll', (data) => {
		store.dispatch( actions.readMessages(data.toMessage) );
	});
	socket.on('chatNewUser', (data) => {
		store.dispatch( actions.addUser(data.user, data.uid) );
	});
	socket.on('usersTyping', (data) => {
		store.dispatch( actions.usersTyping(data.users) );
	});
	socket.on('toggleOnline', (data) => {
		store.dispatch( actions.addUser(data.info, data.uid) );
	});

	window.addEventListener("focus", (event) => {
		document.title = "Chat";
		socket.emit('toggleOnline');
		socket.emit('readAll');
		windowFocus = true;
	})
	window.addEventListener("blur", (event) => {
		socket.emit('toggleOnline');
		windowFocus = false;
	})
}

