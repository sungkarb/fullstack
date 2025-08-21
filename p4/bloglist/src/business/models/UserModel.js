/**
 * Represents single user in application
 * 
 * @param {*} id 
 * @param {string} username 
 * @param {string} password 
 * @param {string} name 
 */
function UserModel(id, username, password, name){
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
}

module.exports = UserModel;
