
const express = require('express');
const router = express.Router();
const blogs_c = require('../controllers/blogs_c');


// create new blog
router.post('/newBlog', blogs_c.newBlog);

// get all blogs
router.get('/blogs', blogs_c.allBlogs);

module.exports = router;

