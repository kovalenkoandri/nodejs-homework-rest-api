const { Сontact } = require('../category');

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  return Сontact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true },
  );
};

module.exports = updateStatusContact;
