var express = require('express');
var io = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = express()
  .use((req, res) => res.sendFile(__dirname + '/public/index.html') )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

let socket = io.listen(server);
let countUsers = 0;
let history = [];
let typing = [];
let count = 0;
let max = 100;
let users = {};

socket.on('connect', function(client){ 
	//socket.username = 'user'+Math.floor(Math.random() * 1000);
	client.id = 'user'+Math.floor(Math.random() * 1000);
	countUsers++;
	//var address = client.manager.handshaken[client.id].address;
	//users[address] = 'user'+Math.floor(Math.random() * 1000);
	console.log(client.id);

    socket.emit('usersCount', countUsers);

    client.emit('chatHistory', {'chat' : history, users : countUsers, userName : client.id});

    client.on('addMessage', function(data) {
    	sendMessage(data, client.id);
    });

    client.on('userTyping', function() {
    	typing.push(client.id);
    	sendTyping();
    });

    client.on('userStopTyping', function() {
    	var index = typing.indexOf(client.id);
		if (index !== -1) typing.splice(index, 1);
    	sendTyping();
    });

    client.on('disconnect',function(){
        countUsers--;
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
