const http = require('http');
const hostname = 'agnia.herokuapp.com';
const port = Number(process.env.PORT || 3000);
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('some text '+req.headers.host );
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});