const { catchAsync } = require('./util/catchAsync');
const {
  getAllClientes,
  getCliente,
  findCliente,
  updateCliente,
  clientHistory,
} = require('./util/restCall-Clientes');
const { getAllParques, createParque } = require('./util/restCall-Parques');
const {
  getAllRegistos,
  createRegisto,
  updateRegisto,
  getRegisto,
} = require('./util/restCall-Registos');
const { login, signup } = require('./util/restCall-Login');

const io = require('socket.io')(80);

const auth = io.of('/auth').on('connection', async (socket) => {
  socket.on('login', async (data) => {
    console.log('login - ', data);
    const response = await Promise.resolve(login(data));
    console.log(response);
    socket.emit('responseLogin', response);
  });
  socket.on('signup', async (data) => {
    console.log('signup - ', data);
    const response = await Promise.resolve(signup(data));
    console.log(response);
    socket.emit('responseSignup', response);
  });
});

const clients = io.of('/clients').on('connection', async (socket) => {
  socket.on('getAllClients', async () => {
    console.log('getAllClients');
    const response = await Promise.resolve(getAllClientes());
    socket.emit('responseGetAll', response);
  });

  socket.on('getCliente', async (data) => {
    console.log('getCliente');
    const response = await Promise.resolve(getCliente(data));
    console.log(response);
    socket.emit('responseCliente', response);
  });
  // manda para todos. Identico ao broadcast?
  socket.on('findClient', async (data) => {
    const response = await Promise.resolve(findCliente(data));
    console.log(response);
    socket.emit('responseFind', response);
  });
  socket.on('updateCliente', async (data) => {
    console.log('updateCliente', data);
    const response = await Promise.resolve(updateCliente(data));
    console.log(response);
    socket.emit('responseUpdate', response);
  });

  socket.on('getClientHistory', async (data) => {
    console.log('getClientHistory', data);
    const response = await Promise.resolve(clientHistory(data));
    console.log(response);
    socket.emit('responseClientHistory', response);
  });
});
const parques = io.of('/parques').on('connection', async (socket) => {
  socket.on('getAllParques', async () => {
    console.log('getAllParques');
    const responseParque = await Promise.resolve(getAllParques());
    console.log(responseParque);

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

  socket.on('getRegisto', async (data) => {
    console.log('getRegisto');
    const responseRegisto = await Promise.resolve(getRegisto(data));
    socket.emit('responseGetRegisto', responseRegisto);
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
