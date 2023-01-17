const Jimp = require('jimp');
const handleJimp = async (req, res) => {
  const tempUpload = req.file.path;
  console.log(tempUpload);
  // const img = await Jimp.read(tempUpload);
  // const resizedImg = await img.resize(250, 250);
  // const writtenImg = await resizedImg.write(tempUpload);
  // return writtenImg;
  // return Jimp.read(tempUpload)
  //   .then((img) => {
  //     return img.resize(250, 250);
  //   })
  //   .then((img) => {
  //     return img.write(tempUpload);
  //   });
  Jimp.read(tempUpload, (err, lenna) => {
    if (err) throw err;
    lenna
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(tempUpload); // save
  });
};

module.exports = handleJimp;
