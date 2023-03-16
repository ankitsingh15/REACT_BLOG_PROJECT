const success = (statusCode, result) => {
  return {
    status: "OK",
    statusCode,
    result,
  };
};
const error = (statusCode, message) => {
  return {
    status: "Error",
    statusCode,
    message,
  };
};

module.exports = {
  success,
  error,
};
