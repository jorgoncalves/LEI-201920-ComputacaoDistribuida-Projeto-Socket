exports.catchAsync = (fn) => {
  return async (data) => {
    try {
      const resp = await fn(data);
      return resp;
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  };
};
