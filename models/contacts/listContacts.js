const { Сontact } = require('../contact');
const listContacts = async (req) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const { skip } = (page - 1) * limit;
  return Сontact.find({ owner: _id }, '', { skip, limit: Number(limit) });
};
module.exports = listContacts;
