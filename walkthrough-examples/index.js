const http = require('http');
const server = http.createServer((req, res) =>{
  if (req.url === '/') {
      res.write('Hello World!');
      res.end();
	return;
  }
  if (req.url === '/api/course') {
	res.write(JSON.stringify([1, 2, 3]));
	res.end();
	return;
  }
});

// server.on('connection', (socket) => {
//   console.log('New connection...');
// });

server.listen(3000);

console.log('Listening on port 3000...');