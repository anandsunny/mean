const Blog = require('../models/blogs_m');
const mongoose = require('mongoose');


// create new blog
exports.create = (req, res) => {

    if (!req.body.title) {
        res.status(400).json({ success: false, message: 'Blog title is required.' });
    } else if (!req.body.body) {
        res.status(400).json({ success: false, message: 'Blog body is required.' });
    } else if (!req.body.createdBy) {
        res.status(400).json({ success: false, message: 'Blog creator is required.' });
    } else if(!req.file) {
        res.status(400).json({ success: false, message: 'Cover image is required.' });
    } else {
        const blog = new Blog({
            title: req.body.title,
            body: req.body.body,
            createdBy: req.body.createdBy,
            blogImg: req.file.filename
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
exports.blogs = (req, res) => {
    Blog.find()
    .sort({'_id': -1})
    .exec()
    .then(result => {
        if(!result) {
            res.status(204).json({ success: false, message: 'No blogs found' })
        } else {
            res.status(200).json({ success: true, result: result })
        }
    })
    .catch(err => {
        res.status(204).json({ success: false, message: err })
    })
}

// get single blog
exports.blog = (req, res) => {
    const blogid = req.params.blogId;
    if(mongoose.Types.ObjectId.isValid(blogid)) {
        Blog.find({'_id': blogid})
        .exec()
        .then(result => {
            if(!result) {
                res.status(204).json({success: false, message: 'No blog found'});
            } else {
                res.status(200).json({success: true, blog: result});
            }
        })
        .catch(err => {
            res.status(204).json({success: false, message: err});
        })
    } else {
        res.status(204).json({success: false, message: 'Invalid blog id'});
    }

}


exports.edit = (req, res) => {
    console.log(req.file);
    const id = req.params.blogId;
    const updateOpts = {};

    //set values and fields for update
    for(const [key, val] of Object.entries(req.body)) {
        updateOpts[key] = val;
    }

    //set file if exist
    if(req.file) updateOpts['blogImg'] = req.file.filename;
    
    Blog.updateOne({_id: id}, {$set: updateOpts})
    .exec()
    .then(result => {
        res.status(200).json({
            success: true,
            message: 'blog edited',
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err: err
        })
    })

}


