const Сontact = require('../category');

const addContact = async ({name, email, phone}) =>
  Сontact.create({ name, email, phone });

module.exports = addContact;
