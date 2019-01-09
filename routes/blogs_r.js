
const express = require('express');
const router = express.Router();
const blogs_c = require('../controllers/blogs_c');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : function(req, file, cd) {
        cd(null, './public/img')
    },
    filename: function(req, file, cd){
        cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cd) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if(extName && mimetype) {
        return cd(null, true);
    } else {
        cd('Error: image only');
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // max 5mb file
    },
    fileFilter: fileFilter
})



// create new blog
router.post('/', upload.single('blogImg'), blogs_c.create);

// get all blogs
router.get('/',  blogs_c.blogs);

// get blog by id
router.get('/:blogId',  blogs_c.blog);

// update blog by id
router.patch('/:blogId', upload.single('blogImg'), blogs_c.edit);

module.exports = router;

