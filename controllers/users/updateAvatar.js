const { User } = require('../../models');
const fs = require('fs/promises');
// const Jimp = require('jimp');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
});

const updateAvatar = async (req, res) => {
  const tempUpload = req.file.path;
  // const tempUpload = 'public/avatars/2.png';
  //  Jimp.read(tempUpload).then((img) => {
  //   img.resize(250, 250).write(tempUpload);
  // });
  
  try {
    let avatarURL;
    await cloudinary.uploader
      .upload(tempUpload, {
        tags: 'basic_sample',
        // height: 250,
        // width: 250,
        // crop: 'fill',
      })
      .then(function (image) {
        avatarURL = image.url;
      })
      .catch(function (err) {
        console.log();
        console.log('** File Upload (Promise)');
        if (err) {
          console.warn(err);
        }
      });
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } finally {
     await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
