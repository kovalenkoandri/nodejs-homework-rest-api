const express = require('express');

const { joiUpdateSubscription, joiVerifyEmail } = require('../../models/user');
const {
  auth,
  upload,
  controllerWrapper,
  validationQuery,
  validation400,
} = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, controllerWrapper(ctrl.getCurrent));
router.patch(
  '/avatars',
  auth,
  upload.single('avatar2'),
  controllerWrapper(ctrl.updateAvatar),
);
router.get('/verify/:verificationToken', controllerWrapper(ctrl.verifyEmail));
router.post(
  '/verify',
  validation400(joiVerifyEmail),
  controllerWrapper(ctrl.verifyResend),
);
router.patch(
  '/',
  auth,
  validationQuery(joiUpdateSubscription),
  controllerWrapper(ctrl.updateSubscription),
);

module.exports = router;
