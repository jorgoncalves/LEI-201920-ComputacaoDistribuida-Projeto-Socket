const axios = require('axios');

const { auth } = require('./rest-address');

exports.login = async (data) => {
  try {
    const response = await axios(`${auth}/login`, {
      method: 'POST',
      data: data,
    });
    return {
      status: response.status,
      statusText: response.statusText,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data.message,
      ...error.response.data,
    };
  }
};

exports.signup = async (data) => {
  try {
    const response = await axios(`${auth}/signup`, {
      method: 'POST',
      data: data,
    });
    return {
      status: response.status,
      statusText: response.data.statusText,
      data: response.data.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data.message,
      ...error.response.data.data,
    };
  }
};
