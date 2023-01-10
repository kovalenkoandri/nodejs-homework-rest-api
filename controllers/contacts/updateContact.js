const { Сontact } = require('../../models');

const updateContact = async (contactId, body) =>
  Сontact.findByIdAndUpdate({ _id: contactId }, body, { new: true });

module.exports = updateContact;
