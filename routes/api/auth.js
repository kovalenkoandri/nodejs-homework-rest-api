const express = require('express');

const { auth, controllerWrapper, validation400 } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

const router = express.Router();

router.post(
  '/users/signup',
  validation400(joiRegisterSchema),
  controllerWrapper(ctrl.register),
);
router.post(
  '/users/login',
  validation400(joiLoginSchema),
  controllerWrapper(ctrl.login),
);
router.get('/users/logout', auth, controllerWrapper(ctrl.logout));
module.exports = router;
