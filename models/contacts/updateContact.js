const Сontact = require('../category');

const updateContact = async (contactId, body) =>
  Сontact.findByIdAndUpdate({ _id: contactId }, body, { new: true });

module.exports = updateContact;
