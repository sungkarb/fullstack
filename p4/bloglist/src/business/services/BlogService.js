const BaseService = require('./BaseService');

/**
 * Service for managing blog models
 * 
 * @param {*} dbRepository 
 */
function BlogService(dbRepository){
    // Inherit all normal crud operations
    BaseService.call(this, dbRepository);
}

module.exports = BlogService;
