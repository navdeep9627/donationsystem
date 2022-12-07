'use strict'

let express = require('express');
let router = express.Router();
let userController = require('../controllers/user.controller');

router.route('/register')
.post(
    userController.register
);

router.route('/login')
.post(
    userController.login
);

module.exports = router;

