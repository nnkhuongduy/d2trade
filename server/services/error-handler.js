const errorHandler = (err, res, statusCode) => {
  console.log(err);
  res.sendStatus(statusCode)
}

module.exports = errorHandler