const listContacts = require('./listContacts');
const { v4 } = require('uuid');
const rewriteContacts = require('./rewriteContacts');

const addContact = async (body) => {
  const products = await listContacts();
  const newProduct = { id: v4(), ...body };
  products.push(newProduct);
  await rewriteContacts(products);
  return newProduct;
};

module.exports = addContact;
