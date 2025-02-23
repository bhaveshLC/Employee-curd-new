function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong.";
  if (err.isJoi) {
    message = err.details[0].message;
    statusCode = 400;
  }
  // if (statusCode == 500) {
  //   console.error(err);
  // }
  res.status(statusCode).json({
    statusCode,
    message,
  });
}
module.exports = errorHandler;
