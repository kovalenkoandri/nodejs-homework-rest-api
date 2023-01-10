const { Сontact } = require('../../models');

const removeContact = async (contactId) =>
  Сontact.findByIdAndRemove({ _id: contactId });

module.exports = removeContact;
