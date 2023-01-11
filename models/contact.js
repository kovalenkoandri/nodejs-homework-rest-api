const { Schema, model } = require('mongoose');
const Joi = require('joi');

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false },
);

const joiContactSchema = Joi.object({
  name: Joi.string().pattern(/\w\s\w/).min(5).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(20).required(),
  favorite: Joi.boolean(),
});
const joiContactSchemaFavorite = Joi.object({
  favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

module.exports = { Contact, joiContactSchema, joiContactSchemaFavorite };
