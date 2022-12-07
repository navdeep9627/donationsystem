'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let itemSchema = new Schema({
    itemType: Number, // 1 - clothes, 2 - books
    itemSubType: Number, // 1 - shirts, 2 - pants, 3 - science books, 4 - math books
    netQuantity: Number,
    createdAt: {type: Date, default: new Date()},
    updatedAt: Date
});

let items = mongoose.model('items', itemSchema);

module.exports = items;