// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const { GMAIL_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: 'smtp.gmail.com',
//   port: 465, // 25, 465 и 2255
//   secure: true,
//   auth: {
//     user: 'wawa260@gmail.com',
//     pass: GMAIL_PASSWORD,
//   }, 
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: 'wawa260@gmail.com',
//   from: 'wawa260@gmail.com',
//   subject: 'Новая заявка с сайта',
//   html: '<p>С сайта пришла новая заявка</p>',
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message));

// //   const sendEmail = async (data) => {
// //     const email = { ...data, from: 'wawa260@gmail.com' };
// //     await sgMail.send(email);
// //     return true;
// //   };

// //   module.exports = sendEmail;