const listContacts = require('./listContacts');
const rewriteContacts = require('./rewriteContacts');

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

module.exports = updateContact;
