const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();



    // user registration
    router.post('/register', (req, res) => {
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
    });

    router.get('/users', (req, res) => {
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
    })

    module.exports = router;
