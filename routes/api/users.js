const express = require("express");

const { joiUpdateSubscription } = require('../../models/user');
const {
  auth, upload,
  controllerWrapper,
  validationQuery,
} = require('../../middlewares');
const {users: ctrl} = require("../../controllers");

const router = express.Router();

router.get('/current', auth, controllerWrapper(ctrl.getCurrent));
router.patch(
  '/avatars',
  auth,
  upload.single('avatar2'),
  // controllerWrapper(ctrl.handleJimp),
  controllerWrapper(ctrl.updateAvatar),
);
router.patch(
  '/',
  auth,
  validationQuery(joiUpdateSubscription),
  controllerWrapper(ctrl.updateSubscription),
);

module.exports = router;