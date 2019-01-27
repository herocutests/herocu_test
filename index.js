const express = require('express')
const PORT = process.env.PORT || 5000

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT);
});
