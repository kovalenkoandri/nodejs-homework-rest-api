const contacts = require('./contacts.json');
const { v4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');
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

const addContact = async (body) => {
  const products = await listContacts();
  const newProduct = { id: v4(),...body };
  products.push(newProduct);
  const filePath = path.join(__dirname, 'contacts.json');
  await fs.writeFile(filePath, JSON.stringify(products));
  return newProduct;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
