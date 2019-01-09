const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/db');
const cors = require('cors');
const auth_r = require('./routes/auth_r');
const blogs_r = require('./routes/blogs_r');
const common_r = require('./routes/common_r');

const app = express();

// db connection
mongoose.connect(
    config.uri,
    { 
        promiseLibrary: global.Promise,
        useCreateIndex: true,
        useNewUrlParser: true
    }, 
    (err) => {
    if(err) {
        console.log('Could not connect database: ', err);
    } else {
        console.log(`Connected to ${config.db}`);
    }
})


// Middlewares
app.use(cors({origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(express.static(__dirname + './public'));
app.use(express.static('public'));
app.use('/auth', auth_r);
app.use('/blogs', blogs_r);
app.use('/common', common_r);



module.exports = app;