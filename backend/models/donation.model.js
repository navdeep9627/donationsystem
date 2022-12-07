'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let donationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    items: [{item: { type: Schema.Types.ObjectId, ref: 'items' }, quantity: Number}],
    createdAt: {type: Date, default: new Date()},
    updatedAt: Date
});

let donations = mongoose.model('donations', donationSchema);

module.exports = donations;