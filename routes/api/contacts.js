const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  // removeContact,
} = require('../../models/contacts.js');
const router = express.Router();
const { productSchema } = require('../../schemas');
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
      const error = new Error(`Product with id=${contactId} not found`);
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
    const result = await addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
