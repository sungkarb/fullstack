const BlogModel = require("../models/BlogModel");

/**
 * Base service for CRUD operations
 * 
 * @param {*} dbRepository - repository holding blogs
 */
function BaseService(dbRepository){
    this.dbRepository = dbRepository;

    /**
     * Returns all models from database
     */
    this.getAllAsync = function(){
        return dbRepository.getAllAsync();
    }

    /**
     * Get a model by its id
     * 
     * @param {string} id 
     */
    this.getByIdAsync = function(id){
        return dbRepository.getByIdAsync(id);
    }

    /**
     * Inserts new model in a system and returns inserted model
     */
    this.addAsync = function(model){
        return dbRepository.addAsync(model);
    }

    /**
     * Updates model in a database
     * 
     * @param {*} model - updated model
     */
    this.updateAsync = function(model){
        return dbRepository.updateAsync(model);
    }

    /**
     * Removes model in a database by its id
     * 
     * @param {*} id - model unique id
     */
    this.removeAsync = function(id){
        return dbRepository.removeAsync(id);
    }
}

module.exports = BaseService;
