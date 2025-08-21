/**
 * Represents user in database
 * 
 * @param {*} id 
 * @param {*} username 
 * @param {*} password 
 * @param {*} name 
 */
function UserEntity(id, username, password, name){
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
}

module.exports = UserEntity;
