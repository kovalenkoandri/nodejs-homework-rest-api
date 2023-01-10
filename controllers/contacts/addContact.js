const { Сontact } = require('../../models');

const addContact = async ({ name, email, phone, favorite }) =>
  Сontact.create({ name, email, phone, favorite });

module.exports = addContact;
