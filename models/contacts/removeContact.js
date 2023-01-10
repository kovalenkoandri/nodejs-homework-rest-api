const { Сontact } = require('../contact');

const removeContact = async (contactId) =>
  Сontact.findByIdAndRemove({ _id: contactId });

module.exports = removeContact;
