const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
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
  name: Joi.string()
    .pattern(/\w\s\w/)
    .min(5)
    .max(20)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(20).required(),
  favorite: Joi.boolean(),
});

const joiContactPutSchema = Joi.object({
  name: Joi.string()
    .pattern(/\w\s\w/)
    .min(5)
    .max(20),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(20),
  favorite: Joi.boolean(),
  owner: Joi.string().min(20).max(30),
});
const joiContactSchemaFavorite = Joi.object({
  favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiContactSchema,
  joiContactSchemaFavorite,
  joiContactPutSchema,
};
