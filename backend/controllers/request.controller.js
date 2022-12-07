'use strict'

let Request = require('../models/request.model');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


exports.getRequests = async (req, res) => {
    const requests = await Request.find({ userId: req.params.userId })
        .populate('itemId', '-netQuantity -createdAt -__v')
        .sort({ createdAt: -1 });
    res.status(200).jsonp({ status: "success", requests });
}

exports.getRequestsAdmin = async (req, res) => {
    const requests = await Request.find({})
        .populate('itemId', '-netQuantity -createdAt -__v')
        .populate('userId', '-_id -createdAt -role -password -__v')
        .sort({ createdAt: -1 });
        res.status(200).jsonp({ status: "success", requests });
}

exports.sendRequest = async (req, res) => {
    req.body.request.createdAt = new Date();
    const request = await (await Request.create(req.body.request)).populate('itemId', '-_id -netQuantity -createdAt -__v');
    res.status(200).jsonp({ status: "success", data: request });
}

exports.getAllMyItems = async (req, res) => {
    let acceptedReq = await Request.aggregate([
        {
            '$match': {
                'userId': mongoose.Types.ObjectId(req.params.userId),
                'status': 1
            }
        }, {
            '$group': {
                '_id': {
                    'itemId': '$itemId'
                },
                'reqQuantity': {
                    '$sum': '$reqQuantity'
                }
            }
        },
        {
            '$lookup': {
                'from': "items",
                'localField': "_id.itemId",
                'foreignField': "_id",
                'as': "item"
            }
        }
    ])
    res.status(200).jsonp({ status: "success", data: acceptedReq });

}

exports.approveReq = async (req, res, next) => {
    req.locals= {};
    const request = await Request.findByIdAndUpdate(req.params.reqId, {status: 1})
                            .populate('itemId', '-netQuantity -createdAt -__v')
                            .populate('userId', '-_id -createdAt -role -password -__v')

    req.locals.req = request;
    next();
}

exports.rejectReq = async (req, res, next) => {
    req.locals = {};
    const request = await Request.findByIdAndUpdate(req.params.reqId, {status: 2})
                            .populate('itemId', '-netQuantity -createdAt -__v')
                            .populate('userId', '-_id -createdAt -role -password -__v')

    req.locals.req = request;
    next();
}