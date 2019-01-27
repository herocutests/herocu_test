var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.get('/', function (req, res) {
 res.end(JSON.stringify({ Hello: 'World'}));
});

app.listen(port, function () {
 console.log(`Example app listening on port `+port);
});