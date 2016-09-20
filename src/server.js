const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../client/index.html`);

const onRequest = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const app = http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

const io = socketio(app);

// increase value
const onIncrease = (sock) => {
  const socket = sock;

  socket.on('increase', (data) => {
    let newData = data.count;
    newData += 1;


    io.sockets.emit('increase', { count: newData });
  });
};

io.sockets.on('connection', (socket) => {
  onIncrease(socket);
});

console.log('Websocket server started');
