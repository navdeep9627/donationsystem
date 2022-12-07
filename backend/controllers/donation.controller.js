'use strict'

let Donation = require('../models/donation.model');


exports.getAllDonations = async (req, res) => {
    const donations = await Donation.find({})
    .populate('items.item', '-_id -netQuantity -createdAt -__v')
    .populate('userId', '-_id -email -createdAt -role -password -__v')
    .sort({createdAt: -1});
    res.status(200).jsonp({status: "success", message: "All Donations fetched successfully", data: donations});    
}

exports.addDonation = async (req, res) => {
    let donationReq = req.locals.donation;
    donationReq.createdAt = new Date();
    const donation = await (await Donation.create(donationReq)).populate('items.item', '-_id -netQuantity -createdAt -__v');
    res.status(200).jsonp({status: "success", message: "Donation added successfully", data: donation});    
}
