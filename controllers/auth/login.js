const { User } = require('../../models');
const { Unauthorized } = require('http-erros');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`Email ${email} not found`);
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw new Unauthorized('Password wrong');
  }
};

module.exports = login;
