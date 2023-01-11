const { Contact } = require('../../models');
const { notFound404, success200 } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const data = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true },
  );
  if (!data) notFound404(data);
  success200(res, data);
};

module.exports = updateStatusContact;
