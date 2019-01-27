const express = require('express');
const io = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = express()
  .use((req, res) => res.sendFile(__dirname + '/public/index.html') )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


let socket = io.listen(server);
let countUsers = 0;
let userName = 'user';
let history = [];
let typing = [];
let count = 0;
let max = 100;

socket.on('connect', function(client){ 

	userName = 'user'+Math.floor(Math.random() * 1000);
	countUsers++;

    socket.emit('usersCount', countUsers);

    client.emit('chatHistory', {'chat' : history, users : countUsers, userName : userName});

    client.on('addMessage', function(data) {
    	sendMessage(data);
    });

    client.on('userTyping', function() {
    	typing.push(userName);
    	sendTyping();
    });

    client.on('userStopTyping', function() {
    	var index = typing.indexOf(userName);
		if (index !== -1) typing.splice(index, 1);
    	sendTyping();
    });

    client.on('disconnect',function(){
        countUsers--;
		socket.emit('usersCount', countUsers);
    });

});

var sendMessage = function(data) {
	var dt = {'user': userName, 'msg' : data.message, 'date' : Date.now()};
    history.push(dt);
    socket.emit('addMessage', dt);
}

var sendTyping = function() {
    socket.emit('usersTyping', {users : typing});
}
