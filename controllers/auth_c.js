
const User = require('./../models/user_m');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const bcryptNodejs = require('bcrypt-nodejs');

// get all users
exports.users = (req, res) => {
    User.find()
    .exec()
    .then(doc => {
        res.status(200).json({
            success: true,
            users: doc
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            error: err
        })
    })
}


// new user registration
exports.registration = (req, res) => {
    if(!req.body.email) {
        res.json({success: false, message: 'You must provide an E-Mail address'});
    } else if (!req.body.uname) {
        res.json({success: false, message: 'You must provide a Username'});
    } else if (!req.body.pass) {
        res.json({success: false, message: 'You must provide a Password'});
    } else {
        let user = new User({
            email: req.body.email.toLowerCase(),
            uname: req.body.uname.toLowerCase(),
            pass: req.body.pass
        });
        user.save((err) => {
            if(err) {
                if(err.code === 11000) {
                    res.json({success: false, message: 'Username or E-Mail already exists'});
                } else if (err.errors) {
                    if(err.errors.email) {
                        res.json({success: false, message: err.errors.email.message});
                    } else if(err.errors.uname) {
                        res.json({success: false, message: err.errors.uname.message});
                    } else if(err.errors.pass) {
                        res.json({success: false, message: err.errors.pass.message});
                    }
                } else {
                    res.json({success: false, message: `Could not save user: ${err}`});
                }
            } else {
                res.json({success: true, message: 'New user registered'});
            }
        })
    }
}


// check for doublicate E-Mail
exports.checkemail = (req, res) => {
    if(!req.params.email) {
        res.status(500).json({
            success: false,
            message: 'E-Mail was not provided'
        })
    } else {
        User.findOne({email: req.params.email}, (err, user) => {
            if(err) {
                res.status(500).json({
                    success: false,
                    message: err
                })
            } else if(user) {
                res.status(500).json({
                    success: false,
                    message: 'E-Mail already taken'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Ok'
                })
            }
        })
    }
}


// check for doublicate user-name
exports.checkuname = (req, res) => {

    if(!req.params.uname) {
        res.status(500).json({
            success: false,
            message: 'User-Name was not provided'
        })
    } else {
        User.findOne({uname: req.params.uname}, (err, user) => {
            if(err) {
                res.status(500).json({
                    success: false,
                    message: err
                })
            } else if(user) {
                res.status(500).json({
                    success: false,
                    message: 'User-Name already taken'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Ok'
                })
            }
        })
    }
}


// user login
exports.login = (req, res) => {
    if(!req.body.uname) {
        res.status(400).json({
            success: false,
            message: 'User-Name was not provided'
        })
    } else if(!req.body.pass) {
        res.status(400).json({
            success: false,
            message: 'Password was not provided'
        })
    } else {
        User.findOne({uname: req.body.uname.toLowerCase()}, (err, user) => {
            if(err) {
                res.status(500).json({
                    success: false,
                    message: err
                })
            } else if(!user) {
                res.status(401).json({
                    success: false,
                    message: 'User-Name not found'
                })
            } else {
                bcryptNodejs.compare(req.body.pass, user.pass, (err, veryfied) => {
                    if(err) {
                        res.status(401).json({
                            success: false,
                            message: err
                        })
                    } else if(!veryfied) {
                        res.status(401).json({
                            success: false,
                            message: 'Password invalid'
                        })
                    } else {
                        let token = jwt.sign({userId: user._id}, config.secret, {expiresIn: '24h'});
                        res.status(200).json({
                            success: true,
                            message: 'User Authorized',
                            token: token,
                            user: {
                                username: user.uname
                            }
                        })
                    }
                })
                
            }
        })
    }
}


// get auth user profile
exports.getProfile = (req, res) => {
    User.findById(req.decode.userId)
    .exec()
    .then((user) => {

        if(!user) {
            res.status(401).json({
                success: false,
                message: 'user not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'token verified',
                user: user
            })
        }
    })
    .catch((err) => {
        res.status(401).json({
            success: false,
            message: 'token invalid',
            error: err
        })
    })
}

