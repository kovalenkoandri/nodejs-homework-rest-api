const app = require('./app');
const { DB_HOST, PORT = 3000 } = process.env;
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
  .connect(DB_HOST)
  .then(async () => {
    try {
      console.log('Database connection successful');
      app.listen(PORT);
      console.log(`Server running. Use our API on port: ${PORT}`);
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
