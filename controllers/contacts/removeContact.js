const { Сontact } = require('../../models');
const { notFound404 } = require('../../helpers');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Сontact.findByIdAndRemove({ _id: contactId });
  if (!data) notFound404(data);
  res.status(200).json({
    message: 'contact deleted',
  });
};

module.exports = removeContact;
