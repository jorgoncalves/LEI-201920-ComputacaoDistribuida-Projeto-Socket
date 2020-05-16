const axios = require('axios');

const constants = require('./rest-address');

exports.getAllClientes = async () => {
  const response = await axios(constants.clients, {
    method: 'GET',
  });
  return {
    status: response.status,
    statusText: response.statusText,
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
    data: response.data,
  };
};
