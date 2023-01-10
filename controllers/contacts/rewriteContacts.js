const fs = require('fs/promises');
const path = require('path');

const rewriteContacts = async (products) => {
  const filePath = path.join(__dirname, 'contacts.json');
  await fs.writeFile(filePath, JSON.stringify(products));
};

module.exports = rewriteContacts;