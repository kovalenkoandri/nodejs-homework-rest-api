const listContacts = require('./listContacts');

const getContactById = async (contactId = 1) => {
  const products = await listContacts();
  const product = products.find((item) => item.id === contactId.toString());
  if (!product) {
    return null;
  }
  return product;
};

module.exports = getContactById;
