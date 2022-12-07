'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let requestSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    itemId: { type: Schema.Types.ObjectId, ref: 'items' },
    reqQuantity: Number,
    status: {type: Schema.Types.Number, default: 0}, // 0 - pending, 1 - accepted, 2 - declined
    createdAt: {type: Date, default: new Date()},
    updatedAt: Date
});

let requests = mongoose.model('requests', requestSchema);

module.exports = requests;