const mongoose = require('mongoose');
const UserEntity = require('../entities/UserEntity');

function UserRepository(connectionString){
    // Open communication
    mongoose.connection.openUri(connectionString);
    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        name: String
    });
    userSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject.__v;
            delete returnedObject._id;
        }
    });
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    /**
     * Gets all users from database
     * 
     * @returns {Promise<UserEntity[]>}
     */
    this.getAllAsync = function(){
        return User.find({});
    }

    /**
     * Finds user by its id
     * 
     * @param {string} id 
     * @returns {Promise<UserEntity | null>} user object or null if id is invalid
     */
    this.getByIdAsync = function(id){
        return User.findById(id);
    }

    /**
     * Adds new user to repository
     * 
     * @param {UserEntity} userEntity 
     * @returns {Promise<UserEntity>} inserted object
     */
    this.addAsync = function(userEntity){
        const newUser = new User({
            username: userEntity.username,
            password: userEntity.password,
            name: userEntity.name
        });

        return newUser.save();
    }

    /**
     * Updates user
     * 
     * @param {UserEntity} userEntity 
     * @returns {Promise<UserEntity | null>} updated user model or null if not found by id
     */
    this.updateAsync = function(userEntity){
        return User.findByIdAndUpdate(userEntity.id, userEntity, { new: true });
    }

    /**
     * Removes user by its id
     * 
     * @param {string} id 
     * @returns {Promise<UserEntity | null>} removed user model or null if not found
     */
    this.removeAsync = function(id){
        return User.findByIdAndDelete(id);
    }

    /**
     * Checks that user with login creditentials is in database
     * 
     * @param {string} username
     * @param {string} password
     * @returns {Promise<UserEntity | null>} gets user with this creditentials ortherwise returns null
     */
    this.loginUserAsync = function(username, password){
        return User.findOne({
            username: username,
            password: password
        });
    }

    /**
     * Registers user in a database
     * 
     * @param {string} username 
     * @param {string} password 
     * @param {string} name 
     * @returns {Promsise<UserEntity | null>} newly created user or null if username is not unique
     */
    this.registerUserAsync = async function(username, password, name){
        const queriedUser = await User.findOne({username: username});
        if (queriedUser){
            return null;
        }

        // Create new user at this point
        const newUser = new UserEntity("", username, password, name);
        return this.addAsync(newUser);
    }
}

module.exports = UserRepository;
