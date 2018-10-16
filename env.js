const fs = require('fs');

if (fs.existsSync('./public')) {
    process.env.NODE_ENV = 'production';
    process.env.dbUri = 'mongodb://patel:patel@ds153752.mlab.com:53752/angular-2-app';
    process.env.dbName = 'production database: mean';
} else {
    process.env.NODE_ENV = 'development';
    process.env.dbUri = 'mongodb://localhost:27017/mean';
    process.env.dbName = 'development database: mean';
}