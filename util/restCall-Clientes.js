const axios = require('axios');

const constants = require('./rest-address');

exports.getAllClientes = async () => {
  const response = await axios(constants.clients, {
    method: 'GET',
  });
  return {
    status: response.status,
    statusText: response.statusText,
    message: response.data.message,
    data: response.data,
  };
};

exports.getCliente = async (data) => {
  console.log(data);

  const response = await axios(`${constants.clients}/${data._id}`, {
    method: 'GET',
  });
  return {
    status: response.status,
    statusText: response.statusText,
    message: response.data.message,
    data: response.data,
  };
};

exports.createCliente = async (data) => {
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
    message: response.data.message,
    data: response.data,
  };
};

exports.updateCliente = async (data) => {
  const response = await axios(`${constants.clients}/${data._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
  return {
    status: response.status,
    statusText: response.statusText,
    message: response.data.message,
    data: response.data.data,
  };
};

exports.findCliente = async (data) => {
  const response = await axios(`${constants.clients}/find`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
  return {
    status: response.status,
    statusText: response.statusText,
    message: response.message,
    data: response.data,
  };
};

exports.clientHistory = async (data) => {
  const response = await axios(`${constants.clients}/history/${data._id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });
  return {
    status: response.status,
    statusText: response.statusText,
    message: response.message,
    data: response.data,
  };
};
