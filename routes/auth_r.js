
const express = require('express');
const router = express.Router();
const auth_c = require('../controllers/auth_c');
const auth_check = require('./../middlewares/check_auth');



// user registration
router.post('/register', auth_c.registration);

// get all users
router.get('/users', auth_c.users);

// check for doublicate email
router.get('/checkemail/:email', auth_c.checkemail);

// check for doublicate username
router.get('/checkuname/:uname', auth_c.checkuname);

// user login
router.post('/login', auth_c.login);

// user get profile
router.get('/getProfile', auth_check, auth_c.getProfile);


module.exports = router;
