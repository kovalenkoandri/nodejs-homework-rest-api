const { Сontact } = require('../../models');
const { success200, notFound404 } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId = 1 } = req.params;
  const data = await Сontact.findOne({ _id: contactId });
  if (!data) notFound404(contactId);
  success200(res, data);
};

module.exports = getContactById;
