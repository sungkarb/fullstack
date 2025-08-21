const logger = require('./logger');

/**
 * Prints out request information
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
}

/**
 * Middleware for unkwnown endpoints
 * 
 * @param {*} request 
 * @param {*} response 
 */
const unknownEndpoint = (request, response) => {
    response.status(404).send({errorMessage: 'Unknown endpoint'});
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);
    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
