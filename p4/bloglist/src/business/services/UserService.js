const UserModel = require("../models/UserModel");
const BaseService = require("./BaseService");
const SHA256 = require('../../utils/encryption/SHA256');

/**
 * Handles user logic
 * 
 * @param {*} dbRepository 
 */
function UserService(dbRepository){
    BaseService.call(this, dbRepository);

    /**
     * Logins user in the system
     * 
     * @param {string} username 
     * @param {string} password
     * @returns {Promise<UserModel | null>} user information if creditentials are valid and null otherwise
     */
    this.loginUserAsync = async function(username, password){
        // Hash password before checking database
        password = await SHA256.hashString(password);
        return dbRepository.loginUserAsync(username, password);
    }

    /**
     * Registers user into the system
     * 
     * @param {string} username
     * @param {string} password
     * @returns {Promise<UserModel | null>} new user if username is unique and null otherwise
     */
    this.registerUserAsync = async function(username, password, name){
        // Hash password before going to database
        password = await SHA256.hashString(password);
        return dbRepository.registerUserAsync(username, password, name);
    }
}

module.exports = UserService;
