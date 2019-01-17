
const express = require('express');
const router = express.Router();
const auth_c = require('../controllers/auth_c');
const auth_check = require('./../middlewares/check_auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, 'public/img/users');
    },
    filename: function(req, file, cd) {
        cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cd) => {
    const fileTypes = /jpg|jpeg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if(extName && mimeType) {
        return cd(null, true);
    } else {
        return cd('Error: image only');
    }
}


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



// user registration
router.post('/register', upload.single('profile'), auth_c.registration);

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
