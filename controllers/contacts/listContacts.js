const { Contact } = require('../../models');
const { success200 } = require('../../helpers');

const listContacts = async (req, res) => {
  console.log(Contact.contact);
  const { _id } = req.user;
  console.log(_id);
  const { page = 1, limit = 2, favorite = true } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner: _id }).populate(
    'owner',
    '_id name email',
  );;
  // const data = await Contact.find().populate('owner', '_id name email');
  // const data = await Contact.find({ owner: _id }, '', {
  //   skip,
  //   limit: Number(limit),
  //   favorite,
  // }).populate('owner', '_id name email');
  success200(res, data);
};

module.exports = listContacts;
