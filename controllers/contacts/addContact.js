const { Contact } = require('../../models');

const addContact = async (req, res) => {
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;
  const data = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });
  res.status(201).json({
    data,
  });
};

module.exports = addContact;
