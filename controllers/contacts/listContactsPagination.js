const { Contact } = require('../../models');
const { success200 } = require('../../helpers');

const listContactsPagination = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  const { page = 1, limit = 7, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find(
    // { owner: _id, favorite },
    { owner: _id},
    'email phone favorite',
    // { },{},
    {
      skip,
      limit: Number(limit),
    },
  ).populate('owner', '_id email subscription');
  success200(res, data);
};

module.exports = listContactsPagination;
