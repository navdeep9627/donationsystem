'use strict'

let express = require('express');
let router = express.Router();
let requestController = require('../controllers/request.controller');
let itemController = require('../controllers/item.controller');
let notify = require('../helpers/notify');

router.route('/:userId/getallrequests')
.get(
    requestController.getRequests
);

router.route('/getallrequestsadmin')
.get(
    requestController.getRequestsAdmin
);

router.route('/sendrequest')
.post(
    requestController.sendRequest
);

router.route('/:userId/getallmyitems')
.get(
    requestController.getAllMyItems
);

router.route('/:reqId/approvereq')
.get(
    requestController.approveReq,
    itemController.updateQnty,
    notify.sendApproveEmail
)

router.route('/:reqId/rejectreq')
.get(
    requestController.rejectReq,
    notify.sendRejectEmail
)

module.exports = router;

