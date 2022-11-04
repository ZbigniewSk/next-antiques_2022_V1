const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

const onError = (err, req, res, next) => {
  // await db.disconnect();
  res.status(500).end({ message: err.toString() });
  next();
};

export { getError, onError };
