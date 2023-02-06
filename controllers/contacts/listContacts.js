const { Contact } = require('../../models');
const { success200 } = require('../../helpers');

const listContacts = async (req, res) => {
  const data = await Contact.find();
  success200(res, data);
};

module.exports = listContacts;
