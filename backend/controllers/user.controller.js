'use strict'

let User = require('../models/user.model');
let jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let user = {
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password,
        role: parseInt(req.body.role)
    }
    let userE = await User.findOne({email: user.email});
    if(userE){
        res.status(200).jsonp({status: "failure", message: "User already exist"});
    }
    else{
        let reg = await User.create(user);
        console.log('reg', reg);
        res.status(200).jsonp({status: "success", message: "User registered successfully"});    
    }
}

exports.login = async (req, res) => {
    console.log('req body', req.body)
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.findOne({email});
    if(user){
        if(user?.email === email && user?.password === password){
            const token = jwt.sign({ email: email, role: user?.role, name: user.name, userId: user._id }, 's3cr3tk3y');
            res.status(200).jsonp({status: "success", message: "authenticated", token: token, auth: true, role: user.role});    
        }
        else{
            res.status(200).jsonp({status: "failure", message: "unauthenticated", auth: false});    
        }
    }
    else{
        res.status(200).jsonp({status: "failure", message: "no user exist", auth: false});    
    }
}

