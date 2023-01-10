const express = require("express");

const { auth, controllerWrapper } = require('../../middlewares');
const {users: ctrl} = require("../../controllers");

const router = express.Router();

router.get('/users/current', auth, controllerWrapper(ctrl.getCurrent));

router.patch('/users', auth, controllerWrapper(ctrl.updateSubscription));

module.exports = router;