const contacts = require('./contacts.json');
const { v4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');

const rewriteContacts = async (products) => {
  const filePath = path.join(__dirname, 'contacts.json');
  await fs.writeFile(filePath, JSON.stringify(products));
};

const listContacts = async () => contacts;

const getContactById = async (contactId = 1) => {
  const products = await listContacts();
  const product = products.find((item) => item.id === contactId.toString());
  if (!product) {
    return null;
  }
  return product;
};

const removeContact = async (contactId) => {
  const products = await listContacts();
  const idx = products.findIndex((item) => item.id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  products.splice(idx, 1);
  await rewriteContacts(products);
  return 'Success remove';
};

const addContact = async (body) => {
  const products = await listContacts();
  const newProduct = { id: v4(), ...body };
  products.push(newProduct);
  await rewriteContacts(products);
  return newProduct;
};

const updateContact = async (contactId, body) => {
  const products = await listContacts();
  const idx = products.findIndex((item) => item.id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const updateProduct = { ...products[idx], ...body };
  products[idx] = updateProduct;
  await rewriteContacts(products);
  return updateProduct;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
