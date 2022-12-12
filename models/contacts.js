// const fs = require('fs/promises')
// const fs = require('fs').promises;
const contacts = require('./contacts.json');

const listContacts = async () => contacts;

const getContactById = async (contactId = 1) => {
  const products = await listContacts();
  const product = products.find((item) => item.id === contactId.toString());
  if (!product) {
    return null;
  }
  return product;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
