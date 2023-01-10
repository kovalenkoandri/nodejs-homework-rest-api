const { User } = require('../../models');
const { notFound404, success200 } = require('../../helpers');

const updateSubscription = async (req, res) => {
  const { subscription } = req.query;
  if (
    subscription !== 'starter' ||
    subscription !== 'pro' ||
    subscription !== 'business'
  )
    notFound404(subscription);
  const { contactId } = req.params;
  if (!contactId) notFound404(contactId);
  const data = await User.findByIdAndUpdate(
    { _id: contactId },
    { subscription },
    { new: true },
  );
  if (!data) notFound404(data);
  success200(res, data);
};

module.exports = updateSubscription;
