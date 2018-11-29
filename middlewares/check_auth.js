const jwt = require('jsonwebtoken');
const config = require('./../config/db')

module.exports = (req, res, next) => {
    
    try {
        const token = req.headers.authtoken;
        const decode = jwt.verify(token, config.secret);
        req.decode = decode;
        next();
    } catch(err) {
        res.status(401).json({
            success: false,
            req: req,
            message: `!Auth Failed Error: ${err}`
        });
    }
}