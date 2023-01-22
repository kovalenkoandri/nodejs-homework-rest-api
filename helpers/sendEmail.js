require('dotenv').config();
const nodemailer = require('nodemailer');

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

const sendEmail = async (toMail, verificationToken) => {
  const email = {
    to: toMail,
    from: 'wawa260@meta.ua',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: `<a target="_blank" href="http://localhost:4000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };
  await transporter.sendMail(email);
};

module.exports = sendEmail;
