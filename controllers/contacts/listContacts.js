const { Contact } = require('../../models');
const { success200 } = require('../../helpers');

const listContacts = async (req, res) => {
  console.log(Contact);
  const { _id } = req.user;
  const { page = 1, limit = 2, favorite = true } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
    favorite,
  });
  success200(res, data);
};

module.exports = listContacts;
