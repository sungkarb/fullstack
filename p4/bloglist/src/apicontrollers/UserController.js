const express = require('express');
const JwtHandler = require('./token/JwtHandler');
const UserService = require('../business/services/UserService');

/**
 * Handles API calls for user management
 * 
 * @param {UserService} userService 
 * @param {JwtHandler} jwtHandler - creates and validates jwt tokens
 */
function UserController(userService, jwtHandler){
    // Create router and define its key endpoints
    const router = express.Router();

    router.post("/login", (request, response, next) => {
        const loginInfo = request.body;
        if (!Object.hasOwn(loginInfo, "username") || !Object.hasOwn(loginInfo, "password")){
            return response.status(400).end({ errorMessage: "Missing username or password"});
        }

        userService
            .loginUserAsync(loginInfo.username, loginInfo.password)
            .then((userModel) => {
                if (!userModel){
                    response.status(401).end({ errorMessage: "Invlid username or password"});
                }
                else {
                    response.json({
                        token: jwtHandler.createToken({id: userModel.id})
                    });
                }
            })
            .catch(error => {
                next(error);
            })
    });

    router.post("/register", (request, response, next) => {
        const registerInfo = request.body;
        if (!Object.hasOwn(registerInfo, "username") || !Object.hasOwn(registerInfo, "password") || !Object.hasOwn(registerInfo, "name")){
            return response.status(400).end({ errorMessage: "Missing username or password or name"});
        }

        userService
            .registerUserAsync(registerInfo.username, registerInfo.password, registerInfo.name)
            .then((userModel) => {
                if (!userModel){
                    response.status(409).end({ errorMessage: "username is already taken"});
                }
                else {
                    response.status(200).end();
                }
            })
            .catch((error) => {
                next(error);
            });
    })

    this.getRouter = function(){
        return router;
    }
}

module.exports = UserController;
