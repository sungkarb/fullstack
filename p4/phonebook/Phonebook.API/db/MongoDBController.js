const mongoose = require('mongoose');
const PersonModel = require('../Models/PersonModel');

function MongoDBController(connectionString){
    // Connect to database and define schema
    mongoose.connect(connectionString)
        .then((response) => {
        console.log("Connected to database");
        })
        .catch((e) => {
            console.log("Failed to connect to database");
            throw new Error(e);
        });

    const personSchema = new mongoose.Schema({
        name: {
            type: String,
            minLength: 3,
            required: true
        },
        number: String,
    });
    const Person = mongoose.model('Person', personSchema);

    /**
     * Gets person by its id
     * 
     * @param {string} personId 
     * @returns {PersonModel} Get person by its id from database
     */
    this.getByIdAsync = function(personId){
        return Person.findById(personId).then((data) => {
            if (data){
                return new PersonModel(data._id, data.name, data.number);
            }
            else {
                return null;
            }
        })
    }

    /**
     * Returns all users from database
     * 
     * @returns {PersonModel[]} Get all persons
     */
    this.getAllAsync = function(){
        return Person.find({}).then((data) => {
            return data.map((item) => {
                return new PersonModel(item._id, item.name, item.number);
            });
        });
    }

    /**
     * Adds person model to the database and assigns it unique id after insertion
     * 
     * @param {PersonModel} personModel 
     */
    this.addAsync = function(personModel){
        const person = new Person({
            name: personModel.name,
            number: personModel.number
        });

        return person.save().then((data) => {
            personModel.id = data._id.toString();
        });
    }

    /**
     * Updates model in database
     * 
     * @param {PersonModel} personModel 
     */
    this.updateAsync = function(personModel){
        return Person.findByIdAndUpdate(personModel.id, {
            name: personModel.name,
            number: personModel.number
        }).then((data) => {
            return data;
        });
    }

    /**
     * Removes person from database by its id
     * 
     * @param {string} personId 
     */
    this.removeAsync = function(personId){
        return Person.findByIdAndDelete(personId).then((data) => {
            return data;
        });
    }
}

module.exports = MongoDBController;
