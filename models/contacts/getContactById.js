const { Сontact } = require('../category');

const getContactById = async (contactId = 1) =>
  Сontact.findOne({ _id: contactId });

module.exports = getContactById;
