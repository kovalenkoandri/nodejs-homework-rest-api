const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../helpers');
const { User } = require('../../models');
const { Unauthorized } = require('http-errors');

const verifyResend = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: 'missing required field email' });
  }
  if (!user.verify) {
    const verificationToken = uuidv4();
    await sendEmail(email, verificationToken);
    await User.findByIdAndUpdate(user._id, {
      verificationToken,
    });
      throw new Unauthorized(
        'Unauthorized/wrong email, please check your register email for letter and go by the link within',
      );
  }
  if (user.verify) {
    res.status(400).json({
      message: 'Verification has already been passed',
    });
  }
};

module.exports = verifyResend;
