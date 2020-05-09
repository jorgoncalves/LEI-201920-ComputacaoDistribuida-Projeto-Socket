const io = require('socket.io')(80);
const chat = io.of('/chat').on('connection', (socket) => {
  // manda para todos. Identico ao broadcast?
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
