'use strict'

let express = require('express');
let router = express.Router();
let donationController = require('../controllers/donation.controller');
let itemController = require('../controllers/item.controller');

router.route('/getalldonations')
.get(
    donationController.getAllDonations
);

router.route('/donate')
.post(
    itemController.addItems,
    donationController.addDonation
)


module.exports = router;

