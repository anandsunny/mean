const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptNodejs = require('bcrypt-nodejs');

// cutome username validations
let unameLengthChecker = (uname) => {
    if (!uname) {
      return false; 
    } else if ( uname.length < 3 || uname.length > 15 ) {
      return false;
    } else {
      return true; 
    }
  };

let validUname = (uname) => {
    if(!uname) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(uname);
    }
}

const unameValidators = [
    {
        validator: unameLengthChecker,
        message: 'Username must be at least 3 charecters but not more than 15' 
    },
    {
        validator: validUname,
        message: 'Username must not have any spacial charecters'
    }
]
// custom username validations end


// custom email validations
let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
}

let emailLegthChecker = (email) => {
    if (!email) {
        return false;
    } else if (email.length < 5 || email > 50) {
        return false;
    } else {
        return true;
    }
}

const emailValidators = [
    {
        validator: validEmailChecker,
        message: 'Must be a valid E-Mail'
    },
    {
        validator: emailLegthChecker,
        message: 'E-Mail must be at least 5 charecters but not more than 50'
    }
];
// custom email validattions end

// custom password validations start
let passLengthChecker = (pass) => {
    if (!pass) {
        return false;
    } else if (pass.length < 8 || pass.length > 35) {
        return false;
    } else {
        return true;
    }
}

let validPass = (pass) => {
    if (!pass) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(pass);
    }
}

const passValidators = [
    {
        validator: passLengthChecker,
        message: 'Password must be at least 8 charecters but not more than 35'
    },
    {
        validator: validPass,
        message: 'Password must have at least one Uppercase, Lowercase, Special Charecter, Number'
    }
];
// end custom pass validation

userSchema = new Schema({
    uname: { type: String, unique: true, required: true, lowercase: true, validate: unameValidators },
    email: { type: String, unique: true, required: true, lowercase: true, validate: emailValidators },
    pass: { type: String, required: true, validate: passValidators },
});

userSchema.pre('save', function(next) {
    
    
    if(!this.isModified('pass'))
        return next();
    
    bcryptNodejs.hash(this.pass, null, null, (err, hash) => {
        if (err) 
            return next(err);
        this.pass = hash;
        next();
    })    
});


module.exports = mongoose.model('User', userSchema);
