const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../helpers');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { SENDINBLUE } = process.env;
 
const nodemailerConfig = {
  host: 'smtp-relay.sendinblue.com',
  port: 587, // 25, 465 и 2255
  secure: false,
  ignoreTLS: true,
  auth: {
    user: 'wawa260@gmail.com',
    pass: SENDINBLUE,
  },
};
 
const transporter = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: 'wawa260@gmail.com',
  from: 'wawa260@meta.ua',
  subject: 'Message title',
  text: 'Plaintext version of the message',
  html: '<p>HTML version of the message</p>',
};

// transporter
//   .sendMail(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message));

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

  newUser.save();
 
  const mail = {
    to: email,
    subject: 'Подтверждения email',
    html: `<a target="_blank" href="http://localhost:4000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

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
