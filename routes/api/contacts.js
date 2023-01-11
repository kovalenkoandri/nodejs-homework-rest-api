const express = require('express');
const { auth, controllerWrapper, validation400 } = require('../../middlewares');
const { contacts: ctrl } = require('../../controllers');
const { joiContactSchema } = require('../../models/contact');
const { joiContactSchemaFavorite } = require('../../models/contact');
const router = express.Router();

router.get('/', auth, controllerWrapper(ctrl.listContacts));

router.get('/:contactId', controllerWrapper(ctrl.getContactById));

router.post(
  '/',
  auth,
  validation400(joiContactSchema),
  controllerWrapper(ctrl.addContact),
);

router.delete('/:contactId', controllerWrapper(ctrl.removeContact));

router.put(
  '/:contactId',
  // validation400(joiContactSchema),
  controllerWrapper(ctrl.updateContact),
);

router.patch(
  '/:contactId/favorite',
  validation400(joiContactSchemaFavorite),
  controllerWrapper(ctrl.updateStatusContact),
);

module.exports = router;
