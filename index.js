var http = require('http');
var port = 8888;

var server = http.createServer(function(req, res) {
    res.end("Hello from Express!");
});

server.listen(port);