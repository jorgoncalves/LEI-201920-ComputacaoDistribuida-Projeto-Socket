const { catchAsync } = require('./util/catchAsync');
const { getAllClientes, createCliente } = require('./util/restCall-Clientes');
const { getAllParques, createParque } = require('./util/restCall-Parques');
const {
  getAllRegistos,
  createRegisto,
  updateRegisto,
} = require('./util/restCall-Registos');

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
    socket.emit('responseGetAll', response);
  });
});
const parques = io.of('/parques').on('connection', (socket) => {
  socket.on('getAllParques', async () => {
    const responseParque = await Promise.resolve(getAllParques());
    socket.emit('responseGetAllParque', responseParque);
  });
});

const registos = io.of('/registos').on('connection', async (socket) => {
  // socket.on('getAllRegistos', async () => {
  const responseRegistos = await Promise.resolve(getAllRegistos());
  socket.emit('responseGetAllRegistos', responseRegistos);
  // });
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
