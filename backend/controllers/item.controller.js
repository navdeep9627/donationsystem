'use strict'

let Item = require('../models/item.model');

exports.addItems = async (req, res, next) => {
    req.locals = {};
    let items = req.body.donation;
    let donation = {userId: req.body.userId, items: [], };
    for(let i of items){
        let item = await Item.findOne({itemType: i?.itemType, itemSubType: i?.itemSubType});
        console.log('item', item, 'i', i)
        if(item){
            item = await Item.findByIdAndUpdate(item._id, {netQuantity: item?.netQuantity + i?.quantity, updatedAt: new Date()});
        }
        else{
            if(i.quantity){
                item = await Item.create({itemType: i.itemType, itemSubType: i.itemSubType, netQuantity: i.quantity});
            }
        }
        if(item){
            donation.items.push({item: item._id, quantity: i?.quantity});
        }
    }
    req.locals.donation = donation;
    next();
}

exports.getAllItems = async (req, res) => {
    const items = await Item.find({});
    res.status(200).jsonp({status: "success", data: items});
}

exports.updateQnty = async (req, res, next) => {
    const itemId = req.locals?.req?.itemId?._id;
    let item = await Item.findById(itemId);
    let netQuantity = item?.netQuantity - req.locals?.req?.reqQuantity;
    item = await Item.findByIdAndUpdate(itemId, { netQuantity });
    next();
}