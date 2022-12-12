const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(20).required(),
});

module.exports = productSchema;