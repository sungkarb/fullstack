const jwt = require('jsonwebtoken');
const SHA256 = require('../../utils/encryption/SHA256');

/**
 * Handles creation and validation of jwt token
 * 
 * @param {string} key - secret key for JWT  
 */
function JwtHandler(key){
    this.key = key;

    /**
     * Creates a JWT token with associated payload ingrained
     * 
     * @param {*} payload
     * @returns {string} authentification token
     */
    this.createToken = function(payload){
        const token = jwt.sign(payload, this.key, { expiresIn: '1h'});
        return token;
    }

    /**
     * Verifies JWT token and returns payload if token is valid
     * 
     * @param {string} token 
     * @returns {Object | jwt.JsonWebTokenError | jwt.TokenExpiredError} payload
     *          associated with token or jwt error objects
     */
    this.validateToken = function(token){
        return jwt.verify(token, this.key);
    }
}

module.exports = JwtHandler;
