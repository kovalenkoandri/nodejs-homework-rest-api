const notFound404 = ( contactId) => {
  const error = new Error(`Object with id=${contactId} not found`);
  error.status = 404;
  throw error;
};

module.exports = notFound404;
