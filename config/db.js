const crypto = require('crypto');

module.exports = {
    uri: 'mongodb://localhost:27017/mean',
    secret: crypto.randomBytes(256).toString('hex'),
    db: 'development database: mean'
}