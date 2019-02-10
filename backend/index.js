var express = require('express');
var io = require('socket.io');

var PORT = process.env.PORT || 3000;

var path = require('path');

server = express()
	.use(express.static(path.resolve( '/build')))
	.use((req, res) => res.sendFile( '/build/index.html') )
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

let socket = io.listen(server);
let countUsers = 0;
let countOnline = 0;
let users = {};
let history = [];
let typing = [];
let count = 0;
let loginList = [];
let lastReadMessage = 0;

socket.on('connect', function(client){ 
	client.id = '';
	client.secret = '';
	client.emit('loginUser');

	client.on('userName', function(data) {
		let username = data.user.split(' ').join('');
		if (username.length == 0) {
			client.emit('incorrectUsername');
			return false;
		}
		var index = loginList.indexOf(username);
		if (index !== -1) {
			client.emit('existUsername');
			return false;
		}
		if(client.id != ''){
			client.emit('returnUsername', {'uid' : client.secret});
			return;
		}
		loginList.push(username);
		countUsers++;
		count++;
		countOnline++;
    	client.id = username;
    	client.secret = count;
    	users[count] = {'name' : username, 'color' : getColor(), online : true, inChat : true};
    	client.emit('userLoggedIn', {'uid' : count});
    	usersCountSend();
    	useradded(count);
    });

    function getColor() {
    	var r = (Math.round(Math.random()* 127) + 127).toString(16);
    	var g = (Math.round(Math.random()* 127) + 127).toString(16);
    	var b = (Math.round(Math.random()* 127) + 127).toString(16);
    	return '#' + r + g + b;
    }

    function checkUsername() {
    	return client.id == '';
    }

    client.emit('chatHistory', {'chat' : history, users : countUsers, userList : users});

    client.on('addMessage', function(data) {
    	if(checkUsername() || data.message.split(' ').join('').length == 0)
    		return false;
    	if(history[data.mid] !== undefined){
    		changeMessageData(data);
    		return false;
    	}
    	sendMessage(data, client.secret);
    });

    function changeMessageData(data) {
    	if(history[data.mid].user != client.secret)
    		return false;
    	history[data.mid].msg = data.message;
    	history[data.mid].isChanged = true;
    	rewriteMessage(history[data.mid], data.mid);
    }

    client.on('userTyping', function() {
    	if(checkUsername())
    		return false;
    	typing.push(client.id);
    	sendTyping();
    });

    client.on('userStopTyping', function() {
    	sliceTyping();
    	sendTyping();
    });

    client.on('readAll', function() {
    	if(history.length == 0 || lastReadMessage == history.length - 1 || client.id == '')
    		return;
    	for(var i = lastReadMessage; i < history.length; i++){
    		if(countUsers > 1 && history[i].user == client.secret)
    			continue;
    		history[i].unread = false;
    		lastReadMessage = i;
    	}
    	socket.emit('readAll', {'toMessage' : lastReadMessage});
    });

    function sliceTyping() {
    	var index = typing.indexOf(client.id);
		if (index != -1) typing.splice(index, 1);
    }

    client.on('disconnect',function(){
    	var index = loginList.indexOf(client.id);
    	sliceTyping();
		if (index == -1) 
			return false;
		loginList.splice(index, 1);
		users[client.secret].inChat = false;
        countUsers--;
        countOnline--;
        usersCountSend();
        useroff(client.id);
		socket.emit('usersCount', countUsers);
		client.id = '';
		client.secret = '';
		socket.emit('toggleOnline', {'usersList' : users});
    });

    client.on('toggleOnline', function() {
    	if(checkUsername())
    		return;
    	changeOnline();
    	socket.emit('toggleOnline', {'usersList' : users});
    });

    function changeOnline() {
    	users[client.secret].online = users[client.secret].online == false ? true : false;
    	if(users[client.secret].online == false)
    		countOnline--;
    	if(users[client.secret].online == true)
    		countOnline++;
    }

});

var usersCountSend = function() {
	socket.emit('usersCount', countUsers);
}

var sendMessage = function(data, cid, system = false) {
	var dt = {'user': cid, 'msg' : data.message, 'date' : Date.now(), 'isChanged' : false, 'unread' : (countOnline > 1 ? false : true), isSystem : system};
    history.push(dt);
    socket.emit('addMessage', {'message' : dt, 'id' : (history.length - 1)});
}

var sendTyping = function() {
    socket.emit('usersTyping', {users : typing});
}

var rewriteMessage = function(data, mid) {
    socket.emit('rewriteMessage', {message: data, mid : mid});
}

var useradded = function(uid) {
	sendMessage({message : 'К чату присоединился '+users[uid]['name']}, -1, true);
	socket.emit('chatNewUser', {'uid' : uid, 'user' : users[uid]});
}

var useroff = function(uname) {
	sendMessage({message : 'Чат покинул '+uname}, -1, true);
}