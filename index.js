var express = require('express');
var io = require('socket.io');

var PORT = process.env.PORT || 3000;

var path = require('path');

server = express()
	.use(express.static(path.resolve(__dirname + '/public')))
	.use((req, res) => res.sendFile(__dirname + '/public/index.html') )
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

let socket = io.listen(server);
let countUsers = 0;
let users = {};
let history = [];
let typing = [];
let count = 0;
let loginList = [];

socket.on('connect', function(client){ 
	client.id = '';

	socket.emit('loginUser');

	client.on('userName', function(data, isUserLoggedResponce) {
		if (data.user.split(' ').join('').length == 0) {
			socket.emit('incorrectUsername');
			return false;
		}
		var index = loginList.indexOf(data.user);
		if (index !== -1) {
			socket.emit('existUsername');
			return false;
		}
		loginList.push(data.user);
		countUsers++;
		count++;
    	client.id = data.user;
    	client.secret = count;
    	users[count] = {'name' : data.user, 'color' : getColor()};
    	socket.emit('userLoggedIn', {'count' : countUsers, 'uid' : count});
    	useradded(client.id);
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

    socket.emit('usersCount', countUsers);

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
        countUsers--;
        useroff(client.id);
		socket.emit('usersCount', countUsers);
    });

});

var sendMessage = function(data, cid) {
	var dt = {'user': cid, 'msg' : data.message, 'date' : Date.now(), 'isChanged' : false};
    history.push(dt);
    socket.emit('addMessage', {'message' : dt, 'id' : (history.length - 1)});
}

var sendTyping = function() {
    socket.emit('usersTyping', {users : typing});
}

var rewriteMessage = function(data, mid) {
    socket.emit('rewriteMessage', {message: data, mid : mid});
}

var useradded = function(uname) {
	socket.emit('chatNewUser', {'user' : uname, 'usersList' : users});
}

var useroff = function(uname) {
	socket.emit('chatGoneUser', uname);
}