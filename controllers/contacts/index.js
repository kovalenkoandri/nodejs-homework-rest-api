const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const removeContact = require('./removeContact');
const updateStatusContact = require('./updateStatusContact');
const listContactsPagination = require('./listContactsPagination');

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
  listContactsPagination,
};
