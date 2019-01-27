var app = express.createServer();
app.listen();
return 'Server running on %s', app.address().port;