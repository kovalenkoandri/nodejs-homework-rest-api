const rewriteContacts = require('./rewriteContacts');
const listContacts = require('./listContacts.js');

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

module.exports = removeContact;
