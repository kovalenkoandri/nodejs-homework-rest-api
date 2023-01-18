const { User } = require('../../models');
const fsSync = require('fs');
// const fs = require('fs/promises');
const Jimp = require('jimp');
const sharp = require('sharp');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const ImageKit = require('imagekit');

cloudinary.config({
  secure: true,
});
const imagekit = new ImageKit({
  publicKey: 'public_ORBWILMeHfwdACTacb9STD4WE7A=',
  privateKey: process.env.IMAGE_KIT_CRED,
  urlEndpoint: 'https://ik.imagekit.io/xtrtlw85x/',
});
imagekit.url({
  useUniqueFileName: false,
});

// const tempDir = 'temp/rm';
// Promise.resolve(fs.mkdir(tempDir, { recursive: true }));
const imageToBase64 = require('image-to-base64');

const updateAvatar = async (req, res) => {
  const tempUpload = req.file.path;

  try {
    let avatarURL;
    // let base64String;
    await Jimp.read(tempUpload).then((img) => {
      img.resize(250, 250).write('temp/rm/3.jpg');
    });
    // await sharp(tempUpload).resize(320, 240).toFile('temp/rm/3.jpg');
    // const file = fsSync.readFileSync(tempUpload);
    // const blob = Buffer.from(file);
    // await imageToBase64('temp/rm/3.jpg') // Path to the image
    //   .then((response) => {
    //     // console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
    //     base64String = response;
    //   })
    //   .catch((error) => {
    //     console.log(error); // Logs an error if there was one
    //   });
    const file = fsSync.readFileSync('temp/rm/3.jpg');
    const base64String = Buffer.from(file).toString('base64');
    await imagekit
      .upload({
        file: base64String,
        fileName: 'myimage.jpg',
      })
      .then((response) => {
        console.log(response);
        avatarURL = response.url;
      })
      .catch((error) => {
        console.log(error);
      });
    // await cloudinary.uploader
    //   .upload('temp/rm/3.png', {
    //     tags: 'basic_sample',
    //     public_id: 'my_favorite_pizza',
    //     // height: 250,
    //     // width: 250,
    //     // crop: 'fill',
    //   })
    //   .then(function (image) {
    //     avatarURL = image.url;
    //   })
    //   .catch(function (err) {
    //     console.log();
    //     console.log('** File Upload (Promise)');
    //     if (err) {
    //       console.warn(err);
    //     }
    //   });
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } finally {
    const files = [
      'temp/rm/2.jpg',
      // 'temp/rm/3.jpg',
      'temp/rm/iceberg.jpg',
      'temp/rm/default-image.jpg',
    ];
    files.forEach((path) => fsSync.existsSync(path) && fsSync.unlinkSync(path));

    // await fs.rm(tempDir, { recursive: true, force: true }, (err) => {
    //   if (err) {
    //     throw err;
    //   }
    // });
    // await fs.mkdir(tempDir, { recursive: true });
  }
};

module.exports = updateAvatar;
