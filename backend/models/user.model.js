'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: Number, // 0 - User, 1 - NGO, 2 - Admin
    createdAt: {type: Date, default: new Date()},
    updatedAt: Date
});

let users = mongoose.model('users', userSchema);

module.exports = users;