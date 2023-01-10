const express = require("express");

const { auth, controllerWrapper } = require('../../middlewares');
const {users: ctrl} = require("../../controllers");

const router = express.Router();

router.get('/users/current', auth, controllerWrapper(ctrl.getCurrent));

module.exports = router;