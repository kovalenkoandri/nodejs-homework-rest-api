const contactsOperations = require('../models/contacts');
const { success200, notFound404, alreadyExists400 } = require('../helpers');

const listContacts = async (req, res) => {
  const data = await contactsOperations.listContacts();
  success200(res, data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsOperations.getContactById(contactId);
  if (!data) notFound404(contactId);
  success200(res, data);
};

const addContact = async (req, res) => {
  // if (
  //   (await contactsOperations.listContacts()).find(
  //     (el) => el.name === req.body.name,
  //   )
  // )
  //   alreadyExists400(req.body.name);
  // if (
  //   (await contactsOperations.listContacts()).find(
  //     (el) => el.email === req.body.email,
  //   )
  // )
  //   alreadyExists400(req.body.email);
  // if (
  //   (await contactsOperations.listContacts()).find(
  //     (el) => el.phone === req.body.phone,
  //   )
  // )
  //   alreadyExists400(req.body.phone);
  const data = await contactsOperations.addContact(req.body);
  res.status(201).json({
    data,
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsOperations.removeContact(contactId);
  if (!data) notFound404(data);
  res.status(200).json({
    message: 'contact deleted',
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsOperations.updateContact(contactId, req.body);
  if (!data) notFound404(data);
  success200(res, data);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsOperations.updateStatusContact(
    contactId,
    req.body,
  );
  if (!data) notFound404(data);
  success200(res, data);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
