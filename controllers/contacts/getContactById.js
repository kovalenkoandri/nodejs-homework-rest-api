const { Сontact } = require('../../models');

const getContactById = async (contactId = 1) =>
  Сontact.findOne({ _id: contactId });

module.exports = getContactById;
