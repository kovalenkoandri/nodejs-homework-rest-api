const express = require('express');

const {
  controllerWrapper,
  validation400
} = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const {joiRegisterSchema, joiLoginSchema} = require("../../models/user");

const router = express.Router();

router.post(
  '/register',
    validation400(joiRegisterSchema),
  controllerWrapper(ctrl.register),
);
router.post(
  '/login',
  validation400(joiLoginSchema),
  controllerWrapper(ctrl.login),
);
module.exports = router;
