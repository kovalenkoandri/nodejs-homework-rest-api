const express = require('express');
const { controllerWrapper, validation400 } = require('../../middlewares');
const { controllers } = require('../../controllers');
const { productSchema } = require('../../schemas')
const router = express.Router();

router.get('/', controllerWrapper(controllers.listContacts));

router.get('/:contactId', controllerWrapper(controllers.getContactById));

router.post('/', validation400(productSchema),controllerWrapper(controllers.addContact));

router.delete('/:contactId', controllerWrapper(controllers.removeContact));

router.put('/:contactId', validation400(productSchema), controllerWrapper(controllers.updateContact));

module.exports = router;
