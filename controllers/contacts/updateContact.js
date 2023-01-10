const { Сontact } = require('../../models');
const { success200, notFound404 } = require('../../helpers');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Сontact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!data) notFound404(data);
  success200(res, data);
};

module.exports = updateContact;
