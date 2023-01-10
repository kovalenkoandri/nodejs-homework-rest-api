const { Сontact } = require('../../models');
const { alreadyExists400 } = require('../../helpers');

const addContact = async (req, res) => {
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;
  const getAll = await Сontact.find({});
  if (getAll.find((el) => el.name === name))
    alreadyExists400(name);
  if (getAll.find((el) => el.email === email))
    alreadyExists400(email);
  if (getAll.find((el) => el.phone === phone))
    alreadyExists400(phone);
  const data = await Сontact.create({ name, email, phone, favorite, owner: _id });
  res.status(201).json({
    data,
  });
};

module.exports = addContact;
