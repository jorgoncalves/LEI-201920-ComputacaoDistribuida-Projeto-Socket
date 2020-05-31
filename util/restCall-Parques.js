const axios = require('axios');

const constants = require('./rest-address');

exports.getAllParques = async (data) => {
  const response = await axios(constants.parques, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
};

exports.findPark = async (data) => {
  const response = await axios(`${constants.parques}/find`, {
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

exports.updateParque = async (data) => {
  const response = await axios(`${constants.parques}/${data._id}`, {
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
