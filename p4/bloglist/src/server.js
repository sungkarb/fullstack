// Utilities
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
// Server and database repository
const express = require('express');
const BlogRepository = require('./data/repositories/BlogRepository');
const BlogController = require('./apicontrollers/BlogController');
const BlogService = require('./business/Services/BlogService');
const UserRepository = require('./data/repositories/UserRepository');
const UserService = require('./business/services/UserService');
const UserController = require('./apicontrollers/UserController');
const JwtHandler = require('./apicontrollers/token/JwtHandler');

// Create dependencies such as repository, 
function createApp(){
    const blogRepository = new BlogRepository(config.MONGODB_URI);
    const blogService = new BlogService(blogRepository);
    const blogApiController = new BlogController(blogService, new JwtHandler(config.JWT_KEY));

    const userRepository = new UserRepository(config.MONGODB_URI);
    const userService = new UserService(userRepository);
    const userApiControlelr = new UserController(userService, new JwtHandler(config.JWT_KEY));

    // Add middleware
    const app = express();
    app.use(express.static('dist'));
    app.use(express.json());
    app.use(middleware.requestLogger);

    // Blog api controller
    app.use('/api/blogs', blogApiController.getRouter());
    app.use('/api/users', userApiControlelr.getRouter());

    // Error handling
    app.use(middleware.unknownEndpoint);
    app.use(middleware.errorHandler);

    return app;
}

const app = createApp();
app.listen(config.PORT, () => {
    logger.info("Started server");
});


module.exports = createApp;
