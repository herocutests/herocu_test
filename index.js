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
let users = [];
let history = [];
let typing = [];
let count = 0;

socket.on('connect', function(client){ 
	client.id = '';

	socket.emit('loginUser');

	client.on('userName', function(data, isUserLoggedResponce) {
		if (data.user.split(' ').join('').length == 0) {
			socket.emit('incorrectUsername');
			return false;
		}
		var index = users.indexOf(data.user);
		if (index !== -1) {
			socket.emit('existUsername');
			return false;
		}
		users.push(data.user);
		countUsers++;
    	client.id = data.user;
    	socket.emit('userLoggedIn', countUsers);
    	useradded(client.id);
    });

    function checkUsername() {
    	return client.id == '';
    }

    socket.emit('usersCount', countUsers);

    client.emit('chatHistory', {'chat' : history, users : countUsers, userName : client.id});

    client.on('addMessage', function(data) {
    	if(checkUsername() || data.message.split(' ').join('').length == 0)
    		return false;
    	sendMessage(data, client.id);
    });

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
    	var index = users.indexOf(client.id);
    	sliceTyping();
		if (index == -1) 
			return false;
		users.splice(index, 1);
        countUsers--;
        useroff(client.id);
		socket.emit('usersCount', countUsers);
    });

});

var sendMessage = function(data, cid) {
	var dt = {'user': cid, 'msg' : data.message, 'date' : Date.now()};
    history.push(dt);
    socket.emit('addMessage', dt);
}

var sendTyping = function() {
    socket.emit('usersTyping', {users : typing});
}

var useradded = function(uname) {
	socket.emit('chatNewUser', uname);
}

var useroff = function(uname) {
	socket.emit('chatGoneUser', uname);
}