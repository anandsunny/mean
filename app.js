const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/db');
const cors = require('cors');
const auth = require('./routes/auth');

const app = express();

// db connection
mongoose.connect(
    config.uri,
    { promiseLibrary: global.Promise}, 
    (err) => {
    if(err) {
        console.log('Could not connect database: ', err);
    } else {
        console.log(`Connected to: ${config.db}`);
    }
})


// Middlewares
// app.use(cors({origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + './public'));
app.use('/auth', auth);



module.exports = app;