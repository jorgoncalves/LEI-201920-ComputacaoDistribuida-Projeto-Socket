const axios = require('axios');

const constants = require('./rest-address');

exports.getAllParques = async () => {
  const response = await axios(constants.parques, {
    method: 'GET',
  });
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
};

exports.createParque = async (data) => {
  const response = await axios(constants.parques, {
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
