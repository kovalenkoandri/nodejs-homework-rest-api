const express = require('express');
const { listContacts } = require('../../models/contacts');
const { getContactById } = require('../../models/contacts');
const { addContact } = require('../../models/contacts');
const { removeContact } = require('../../models/contacts');
const { updateContact } = require('../../models/contacts');
const { productSchema } = require('../../schemas');
const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    const products = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: products,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
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
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    if ((await listContacts()).find((el) => el.name === req.body.name)) {
      const err = new Error(`{name} already exists`);
      err.status = 404;
      throw err;
    }
    if ((await listContacts()).find((el) => el.email === req.body.email)) {
      const err = new Error(`{email} already exists`);
      err.status = 404;
      throw err;
    }
    if ((await listContacts()).find((el) => el.phone === req.body.phone)) {
      const err = new Error(`{phone} already exists`);
      err.status = 404;
      throw err;
    }
    const result = await addContact(req.body);
    res.status(201).json({
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      message: 'contact deleted',
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
