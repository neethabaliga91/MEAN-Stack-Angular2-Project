const crypto = require('crypto');
crypto.randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/'+this.db,
    secret : crypto,
    db : 'process-guide'
}