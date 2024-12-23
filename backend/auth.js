const jwt = require('jsonwebtoken');
const config = require('./config');

const authenticate = (token) => {
    try {
        return jwt.verify(token, config.jwt.secret, config.jwt.options);
    } catch (e) {
        throw new Error('Authentication failed');
    }
};

module.exports = { authenticate };