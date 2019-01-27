const express = require('express');
var io = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = express()
  .use((req, res) => res.sendFile(__dirname + '/public/index.html') )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


var socket = io.listen(server);
var countUsers = 0;
var history = [];
var count = 0;
var max = 100;

socket.on('connect', function(client){ 
	countUsers++;
    socket.emit('usersCount', countUsers);

    client.emit('chatHistory', {'chat' : history, users : countUsers});

    client.on('addMessage', function(data) {
    	sendMessage(data);
    });

    client.on('disconnect',function(){
        countUsers--;
		socket.emit('usersCount', countUsers);
    });

    client.emit('serverResp', '1234');

});

var sendMessage = function(data) {
	var dt = {'user': data.user, 'msg' : data.message, 'date' : Date.now()};
    history.push(dt);
    socket.emit('addMessage', dt);
}
