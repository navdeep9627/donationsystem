'use strict'
const sgMail = require('@sendgrid/mail')

exports.sendApproveEmail = (req, res) => {
    let body = `You request for ${req.locals.req?.reqQuantity} ${getType(req.locals.req?.itemId?.itemSubType)} has been accepted.`
    sgMail.setApiKey('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');
    const msg = {
    to: req.locals.req?.userId?.email, // Change to your recipient
    from: 'donationsystem123@gmail.com', // Change to your verified sender
    subject: 'Request Accepted',
    text: body,
    html: `<strong>${body}</strong>`,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
        res.status(200).jsonp({ status: "success", message: "Email sent successfully" });
    })
    .catch((error) => {
        console.error(JSON.stringify(error))
        res.status(200).jsonp({ status: "failure", message: "Email failed" });
    })
}

exports.sendRejectEmail = (req, res) => {
    let body = `You request for ${req.locals.req?.reqQuantity} ${getType(req.locals.req?.itemId?.itemSubType)} has been rejected.`
    sgMail.setApiKey('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');
    const msg = {
    to: req.locals.req?.userId?.email, // Change to your recipient
    from: 'donationsystem123@gmail.com', // Change to your verified sender
    subject: 'Request Declined',
    text: body,
    html: `<strong>${body}</strong>`,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
        res.status(200).jsonp({ status: "success", message: "Email sent successfully" });
    })
    .catch((error) => {
        console.error(JSON.stringify(error))
        res.status(200).jsonp({ status: "failure", message: "Email failed" });
    })
}

let getType = (subtype) => {
    if(subtype === 1) return 'Shirts'; 
    else if(subtype === 2) return 'Pants';
    else if(subtype === 3) return 'Science Books';
    else if(subtype === 4) return 'Maths Books';
    else return '';
}