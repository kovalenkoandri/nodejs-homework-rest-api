const validationQuery = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      });
      return;
    }
    next();
  };
};

module.exports = { validationQuery };
