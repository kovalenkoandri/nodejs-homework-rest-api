const Сontact = require('../category');

const removeContact = async (contactId) =>
  Сontact.findByIdAndRemove({ _id: contactId });

module.exports = removeContact;
