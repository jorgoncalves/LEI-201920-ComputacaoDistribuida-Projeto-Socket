const axios = require('axios');

const constants = require('./util/rest-address');
const { catchAsync } = require('./util/catchAsync');

const io = require('socket.io')(80);

const clients = io.of('/clients').on('connection', (socket) => {
  // manda para todos. Identico ao broadcast?
  socket.on('formSubmit', async (data) => {
    console.log(data);
    const response = await Promise.resolve(createCliente(data));
    console.log(response);
    socket.emit('response', response);
  });

  socket.on('getAllClients', async () => {
    const response = await Promise.resolve(getAllClients());
    console.log(response);
    socket.emit('responseGetAll', response);
    
  });
});
const news = io.of('/news').on('connection', (socket) => {
  socket.emit('item', { news: 'item' });
  socket.emit('news', { hello: 'world' });
  socket.on('woot', (data) => {
    console.log(data);
  });
});

const getAllClients = async () => {
  const response = await axios(constants.clients, {
    method: 'GET',
  });
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
};

const createCliente = async (data) => {
  const response = await axios(constants.clients, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
};
