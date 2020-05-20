const { catchAsync } = require('./util/catchAsync');
const { getAllClientes, createCliente } = require('./util/restCall-Clientes');
const { getAllParques, createParque } = require('./util/restCall-Parques');
const {
  getAllRegistos,
  createRegisto,
  updateRegisto,
} = require('./util/restCall-Registos');

const io = require('socket.io')(80);

const clients = io.of('/clients').on('connection', async (socket) => {
  socket.on('getAllClients', async () => {
    console.log('getAllClients');
    const response = await Promise.resolve(getAllClientes());
    socket.emit('responseGetAll', response);
  });
  // manda para todos. Identico ao broadcast?
  socket.on('formSubmit', async (data) => {
    console.log(data);
    const response = await Promise.resolve(createCliente(data));
    console.log(response);
    socket.emit('response', response);
  });
});
const parques = io.of('/parques').on('connection', async (socket) => {
  socket.on('getAllParques', async () => {
    console.log('getAllParques');
    const responseParque = await Promise.resolve(getAllParques());
    socket.emit('responseGetAllParque', responseParque);
  });

  socket.on('formSubmit', async (data) => {
    socket.emit('responsePark', { hello: 'world' });
    console.log(data);
    const respCreateParque = await Promise.resolve(createParque(data));
    socket.emit('respCreateParque', respCreateParque);
  });
});

const registos = io.of('/registos').on('connection', async (socket) => {
  socket.on('getAllRegistos', async () => {
    console.log('getAllRegistos');
    const responseRegistos = await Promise.resolve(getAllRegistos());
    socket.emit('responseGetAllRegistos', responseRegistos);
  });
  socket.on('createNewRegisto', async (data) => {
    console.log(data);
    const responseNewRegistos = await Promise.resolve(createRegisto(data));
    socket.emit('responseNewRegistos', responseNewRegistos);
  });

  socket.on('registerSubmit', async (data) => {
    console.log(data);
    const response = await Promise.resolve(updateRegisto(data));
    socket.emit('response', response);
  });
});
