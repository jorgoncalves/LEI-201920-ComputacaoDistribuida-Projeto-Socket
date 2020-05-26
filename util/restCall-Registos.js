const axios = require('axios');

const constants = require('./rest-address');

exports.getAllRegistos = async () => {
  const response = await axios(constants.registos, {
    method: 'GET',
  });
  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
};

exports.getRegisto = async (data) => {
  const response = await axios(`${constants.registos}/findRegister`, {
    method: 'GET',
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

exports.createRegisto = async (data) => {
  const response = await axios(constants.registos, {
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

exports.updateRegisto = async (data) => {
  const response = await axios(`${constants.registos}/${data.idRegisto}`, {
    method: 'PUT',
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
