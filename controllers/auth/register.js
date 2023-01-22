const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../helpers');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exists`);
  }

  const verificationToken = uuidv4();

  const avatarURL = gravatar.url(email, {
    protocol: 'https',
    size: '150',
    rating: 'g',
    default: 'retro',
  });

  const newUser = new User({ name, email, avatarURL, verificationToken });

  newUser.setPassword(password);

  await newUser.save();

  await sendEmail(email, verificationToken);

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
