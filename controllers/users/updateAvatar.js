const { User } = require('../../models');
// const fsSync = require('fs');
const fs = require('fs/promises');
const Jimp = require('jimp');
// const sharp = require('sharp');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
});
const tempDir = 'temp/rm';
Promise.resolve(fs.mkdir(tempDir, { recursive: true }));

const updateAvatar = async (req, res) => {
  const tempUpload = req.file.path;

  try {
    let avatarURL;
    await Jimp.read(tempUpload).then((img) => {
      img.resize(250, 250).write('temp/rm/3.png');
    });
    // await sharp('temp/2.png').resize(320, 240).toFile('temp/3.png');

    await cloudinary.uploader
      .upload('temp/rm/3.png', {
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
    // const files = ['temp/2.png', 'temp/3.png'];
    // files.forEach((path) => fsSync.existsSync(path) && fsSync.unlinkSync(path));
    await fs.rm(tempDir, { recursive: true, force: true }, (err) => {
      if (err) {
        throw err;
      }
    });
    await fs.mkdir(tempDir, { recursive: true });
  }
};

module.exports = updateAvatar;
