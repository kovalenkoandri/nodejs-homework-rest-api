const express = require('express');
const { auth, controllerWrapper, validation400 } = require('../../middlewares');
const { controllers } = require('../../controllers');
const { joiContactSchema } = require('../../models/contact');
const { joiContactSchemaFavorite } = require('../../models/contact');
const router = express.Router();

router.get('/', auth, controllerWrapper(controllers.listContacts));

router.get('/:contactId', controllerWrapper(controllers.getContactById));

router.post(
  '/',
  auth,
  validation400(joiContactSchema),
  controllerWrapper(controllers.addContact),
);

router.delete('/:contactId', controllerWrapper(controllers.removeContact));

router.put(
  '/:contactId',
  validation400(joiContactSchema),
  controllerWrapper(controllers.updateContact),
);

router.patch(
  '/:contactId/favorite',
  validation400(joiContactSchemaFavorite),
  controllerWrapper(controllers.updateStatusContact),
);

module.exports = router;
