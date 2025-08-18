/**
 * Represents single phone information in the system
 * 
 * @param {String} id 
 * @param {string} name 
 * @param {string} number 
 */
function PersonModel(id, name, number){
    this.id = id;
    this.name = name;
    this.number = number;
}

module.exports = PersonModel;
