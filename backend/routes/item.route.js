'use strict'

let express = require('express');
let router = express.Router();
let itemController = require('../controllers/item.controller');

router.route('/getallitems')
.get(
    itemController.getAllItems
);


module.exports = router;

