const { User } = require('../../models');
const { notFound404, success200 } = require('../../helpers');

const updateSubscription = async (req, res) => {
  const { subscription } = req.query;
  const { _id } = req.user;
  const data = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true },
  );
  if (!data) notFound404(data);
  success200(res, data);
};

module.exports = updateSubscription;
