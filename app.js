const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const chat = io.of('/chat').on('connection', (socket) => {
  socket.emit('a message', {
    that: 'only',
    '/chat': 'will get',
  });
  chat.emit('a message', {
    everyone: 'in',
    '/chat': 'will get',
  });
});

const news = io.of('/news').on('connection', (socket) => {
  socket.emit('item', { news: 'item' });
});

io.on('connection', (socket) => {
  socket.emit('test', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});
