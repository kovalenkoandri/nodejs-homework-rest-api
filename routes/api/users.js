const express = require("express");

const { joiUpdateSubscription } = require('../../models/user');
const {
  auth,
  controllerWrapper,
  validationQuery,
} = require('../../middlewares');
const {users: ctrl} = require("../../controllers");

const router = express.Router();

router.get('/current', auth, controllerWrapper(ctrl.getCurrent));

router.patch(
  '/',
  auth,
  validationQuery(joiUpdateSubscription),
  controllerWrapper(ctrl.updateSubscription),
);

module.exports = router;