const { catchAsync } = require('./util/catchAsync');
const { getAllClientes, createCliente } = require('./util/restCall-Clientes');
const { getAllParques, createParque } = require('./util/restCall-Parques');
const {getAllRegistos,createRegisto} = require('./util/restCall-Registos');

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
    const response = await Promise.resolve(getAllClientes());
    console.log(response);
    socket.emit('responseGetAll', response);
  });
});
const parques = io.of('/parques').on('connection', (socket) => {
  socket.on('getAllParques', async () => {
    const responseParque = await Promise.resolve(getAllParques());
    console.log(responseParque);
    socket.emit('responseGetAllParque', responseParque);
  });
});

const registos = io.of('/registos').on('connection', (socket) => {
  socket.on('getAllRegistos', async () => {
    const responseRegistos = await Promise.resolve(getAllRegistos());
    console.log(responseRegistos);
    socket.emit('responseGetAllRegistos', responseRegistos);
  });
});
