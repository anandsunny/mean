const Blog = require('../models/blogs_m');




// create new blog
exports.newBlog = (req, res) => {
    if (!req.body.title) {
        res.status(400).json({ success: false, message: 'Blog title is required.' });
    } else if (!req.body.body) {
        res.status(400).json({ success: false, message: 'Blog body is required.' });
    } else if (!req.body.createdBy) {
        res.status(400).json({ success: false, message: 'Blog creator is required.' });
    } else {
        const blog = new Blog({
            title: req.body.title,
            body: req.body.body,
            createdBy: req.body.createdBy
        });
        blog.save()
        .then(result => {
            if(!result) {
                res.status(500).json({ success: false, message: 'blog is not created' })
            } else {
                res.status(200).json({ success: true, message: 'Blog saved!' });
            }
        })
        .catch(err => {
            if (err.errors) {
                if (err.errors.title) {
                    res.status(400).json({ success: false, message: err.errors.title.message });
                } else if (err.errors.body) {
                    res.status(400).json({ success: false, message: err.errors.body.message });
                } else {
                    res.status(400).json({ success: false, message: err.errors });
                }
            } else {
                res.status(500).json({ success: false, message: err });
            }
        });
    }
}


// get all blogs
exports.allBlogs = (req, res) => {
    Blog.find()
    .sort({'_id': -1})
    .exec()
    .then(result => {
        if(!result) {
            res.status(204).json({ success: false, message: 'No blogs found' })
        } else {
            res.status(200).json({ success: true, blogs: result })
        }
    })
    .catch(err => {
        res.status(204).json({ success: false, message: err })
    })
}

