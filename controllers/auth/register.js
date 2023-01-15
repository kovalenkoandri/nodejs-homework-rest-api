const { User } = require('../../models');
const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exists`);
  }

  const avatarURL = gravatar.url(email, {
    protocol: 'https',
    size: '150',
    rating: 'g',
    default: 'retro',
  });

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ name, email, password: hashPassword, avatarURL });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
      },
    },
  });
};

module.exports = register;
