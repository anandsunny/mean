const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// check valid length of title string
let titleLengthChecker = title => {
    if (!title) {
      return false;
    } else {
        if (title.length < 5 || title.length > 50) {
            return false;
        } else {
            return true; 
        }
    }
};

// check valid string formate of title
let alphaNumericTitleChecker = title => {
    if (!title) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(title);
    }
};

// array of title validators
const titleValidators = [
    {
        validator: titleLengthChecker,
        message: 'Title must be more than 5 characters but no more than 50'
    },
    {
        validator: alphaNumericTitleChecker,
        message: 'Title must be alphanumeric'
    }
];

// valid body length
let bodyLengthChecker = body => {
    if (!body) {
        return false; 
    } else {
        if (body.length < 5 || body.length > 500) {
            return false;
        } else {
            return true;
      }
    }
};

// array of body validators
const bodyValidators = [
    {
        validator: bodyLengthChecker,
        message: 'Body must be more than 5 characters but no more than 500.'
    }
];

// valid length of comment
let commentLengthChecker = comment => {
    if (!comment[0]) {
      return false;
    } else {
        if (comment[0].length < 1 || comment[0].length > 200) {
            return false;
        } else {
            return true;
        }
    }
};
  
// array of comment validators
const commentValidators = [
    {
        validator: commentLengthChecker,
        message: 'Comments may not exceed 200 characters.'
    }
];


// blog schema
const blogSchema = new Schema({
    title: { type: String, required: true, validate: titleValidators },
    body: { type: String, required: true, validate: bodyValidators },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    disLikes: { type: Number, default: 0 },
    disLikedBy: { type: Array },
    comments: [{
        comment: { type: String, validate: commentValidators },
        commentator: { type: String }
    }],
    blogImg: { type: String }
});


// export schema as module
module.exports = mongoose.model('Blog', blogSchema);