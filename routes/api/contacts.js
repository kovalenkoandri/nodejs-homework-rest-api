const express = require('express')
const {
  listContacts,
  getContactById,
  // addContact,
  // removeContact,
} = require('../../models/contacts.js');
const router = express.Router()

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
})

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
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
