const { success200 } = require('../../helpers');

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  const data = {
    user: { email, subscription },
  };
  success200(res, data);
};

module.exports = getCurrent;
