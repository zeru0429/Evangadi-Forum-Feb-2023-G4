const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('It is working...');
    res.end();
  }
});

const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

server.listen(port, host, (error) => {
  if (error) console.log(error);
  console.log(`Server is running at http://${host}:${port}`);
});