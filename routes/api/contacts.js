const express = require('express');
const contactsOperations = require('../../models/contacts');
const { controllerWrapper } = require('../../middlewares');
const { productSchema } = require('../../schemas');
const router = express.Router();
const listContacts = async (req, res, next) => {
  const products = await contactsOperations.listContacts();
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result: products,
    },
  });
};
router.get('/', controllerWrapper(listContacts));
const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};
router.get('/:contactId', controllerWrapper(getContactById));

const addContact = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }
  if (
    (await contactsOperations.listContacts()).find(
      (el) => el.name === req.body.name,
    )
  ) {
    const err = new Error(`{name} already exists`);
    err.status = 404;
    throw err;
  }
  if (
    (await contactsOperations.listContacts()).find(
      (el) => el.email === req.body.email,
    )
  ) {
    const err = new Error(`{email} already exists`);
    err.status = 404;
    throw err;
  }
  if (
    (await contactsOperations.listContacts()).find(
      (el) => el.phone === req.body.phone,
    )
  ) {
    const err = new Error(`{phone} already exists`);
    err.status = 404;
    throw err;
  }
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    result,
  });
};

router.post('/', controllerWrapper(addContact));
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    message: 'contact deleted',
  });
};

router.delete('/:contactId', controllerWrapper(removeContact));
const updateContact = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    const error = new Error(`Not found`);
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    result,
  });
};
router.put('/:contactId', controllerWrapper(updateContact));

module.exports = router;
