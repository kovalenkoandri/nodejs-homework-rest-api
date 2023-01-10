const { Сontact } = require('../../models');
const { success200 } = require('../../helpers');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const { skip } = (page - 1) * limit;
  const data = await Сontact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  });
  success200(res, data);
};

module.exports = listContacts;
