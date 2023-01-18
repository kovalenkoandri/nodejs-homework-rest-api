const { User } = require('../../models');
const fsSync = require('fs');
// const fs = require('fs/promises');
const Jimp = require('jimp');
// const sharp = require('sharp');
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
  // urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id/',
});
// const imageURL = imagekit.url({
//   path: '/default-image.jpg',
//   src: 'https://ik.imagekit.io/your_imagekit_id/xtrtlw85x/endpoint/myimage.png',
//   transformation: [
//     {
//       height: '300',
//       width: '400',
//     },
//   ],
// });
// const tempDir = 'temp/rm';
    // Promise.resolve(fs.mkdir(tempDir, { recursive: true }));
const updateAvatar = async (req, res) => {
  const tempUpload = req.file.path;

  try {
    let avatarURL;
    await Jimp.read(tempUpload).then((img) => {
      img.resize(250, 250).write('temp/rm/3.jpg');
    });
    // await sharp('temp/2.png').resize(320, 240).toFile('temp/3.png');
    const file = fsSync.readFileSync(tempUpload);
    const blob = Buffer.from(file);
    // const file = fs.readFileSync('/some/place/image.png');
    // const base64String = Buffer.from(file).toString('base64');
    await imagekit
      .upload({
        file: blob,
        fileName: 'myimage.jpg',
        // extensions: [
        //   {
        //     name: 'google-auto-tagging',
        //     maxTags: 5,
        //     minConfidence: 95,
        //   },
        // ],
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
      'temp/rm/3.jpg',
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
