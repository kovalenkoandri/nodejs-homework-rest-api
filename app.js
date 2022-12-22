const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');
require('dotenv').config();
const { DB_HOST, PORT = 3000 } = process.env;
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found-)' });
});

app.use((err, req, res) => {
  res.status(err.status).json({ message: err.message });
});

mongoose.set('strictQuery', false);
mongoose
  .connect(DB_HOST)
  .then(async () => {
    try {
      console.log('Database connection successful');
      app.listen(PORT);
      console.log(`server started!!!!!!!!!! on port: ${PORT}`);
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
module.exports = app;
