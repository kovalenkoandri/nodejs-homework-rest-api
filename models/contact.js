const { Schema, model } = require('mongoose');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
);

const Joi = require('joi');

const joiContactSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(20).required(),
  favorite: Joi.boolean(),
});
const joiContactSchemaFavorite = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = { joiContactSchema, joiContactSchemaFavorite };

const Сontact = model('contact', contactSchema);

module.exports = { Сontact };
