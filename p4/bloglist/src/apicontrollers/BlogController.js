const express = require('express');
const BlogModel = require('../business/models/BlogModel');
const JwtHandler = require('./token/JwtHandler');

/**
 * API controller for blogs
 * 
 * @param {*} blogService - repository for communicating with database
 * @param {JwtHandler} jwtHandler - creates and validates jwt tokens
 */
function BlogController(blogService, jwtHandler){

    // Create new router
    const router = express.Router();

    // Define all main endpoints for this controller
    router.get("/", (request, response, next) => {
        blogService
            .getAllAsync()
            .then((blogs) => {
                response.status(200).json(blogs);
            })
            .catch((error) => {
                next(error);
            });
    });

    router.get("/:id", (request, response, next) => {
        // Check that token is valid and extract id
        const userId = getUserIdFromHeader(request.headers);
        if (!userId){
            return response.status(401).json({ errorMesage: "Invalid token" });
        }

        const id = request.params.id;
        blogService
            .getByIdAsync(id)
            .then((data) => {
                if (data){
                    // Check that blog belongs to the user
                    if (data.userId !== userId){
                        return response.status(401).json({ errroMessage: "Blog doesn't belong to this user"})
                    }
                    const result = data.toJSON ? data.toJSON() : data;
                    delete result.userId;
                    response.status(200).json(result);
                }
                else {
                    response.status(404).json({ errorMessage: "Blog with this id wasn't found" });
                }
            })
            .catch((error) => {
                next(error);
            })
    });

    router.post("/", (request, response, next) => {
        // Check that token is valid and extract id
        const userId = getUserIdFromHeader(request.headers);
        if (!userId){
            return response.status(401).json({ errorMesage: "Invalid token" });
        }

        // Check that request is valid
        const newBlog = request.body;
        if (!checkRequestBodyBlog(newBlog)){
            return response.status(400).end();
        }

        // Add to database
        const blogModel = new BlogModel(
            "",
            userId,
            newBlog.title,
            newBlog.author,
            newBlog.url,
            newBlog.likes
        );
        blogService
            .addAsync(blogModel)
            .then((data) => {
                const result = data.toJSON ? data.toJSON() : data;
                delete result.userId;
                response.status(201).json(result);
            })
            .catch((error) => {
                next(error);
            });
    });

    router.put("/:id", async (request, response, next) => {
        // Check that token is valid and extract id
        const userId = getUserIdFromHeader(request.headers);
        if (!userId){
            return response.status(401).json({ errorMesage: "Invalid token" });
        }
        
        if (!checkRequestBodyBlog(request.body)){
            return response.status(400).end();
        }

        // Parse body and get id
        const id = request.params.id;
        const newBlog = request.body;
        const blogModel = new BlogModel(
            id,
            userId,
            newBlog.title,
            newBlog.author,
            newBlog.url,
            newBlog.likes
        );

        try {
            // Check that blog belongs to user
            const temp = await blogService.getByIdAsync(id);
            if (!temp){
                return response.status(404).json({ errorMessage: "No blog with this id" });
            }
            else if (temp.userId !== userId){
                return response.status(401).json({ errorMesage: "Blog doesn't belong to this user" });
            }

            // Update database
            const data = await blogService.updateAsync(blogModel);
            const result = data.toJSON ? data.toJSON() : data;
            delete result.userId;
            return response.json(result);
        }
        catch (error){
            next(error);
        }
    });

    router.delete("/:id", async (request, response, next) => {
        // Check that token is valid and extract id
        const userId = getUserIdFromHeader(request.headers);
        if (!userId){
            return response.status(401).json({ errorMesage: "Invalid token" });
        }
        
        const id = request.params.id;
        try {
            // Check that blog belongs to user
            const temp = await blogService.getByIdAsync(id);
            if (!temp){
                return response.status(404).json({ errorMessage: "No blog with this id" });
            }
            else if (temp.userId !== userId){
                return response.status(401).json({ errorMesage: "Blog doesn't belong to this user" });
            }

            // Update database
            const data = await blogService.removeAsync(id);
            return response.status(200).end();
        }
        catch (error){
            next(error);
        }

    });

    this.getRouter = function(){
        return router;
    }

    /**
     * Check that blog information is full and valid
     * 
     * @param {Object} blogRequest 
     * @returns {Boolean} true if blog requests is valid and false otherwise
     */
    const checkRequestBodyBlog = (blogRequestBody) => {
        return Object.hasOwn(blogRequestBody, "title") &&
                Object.hasOwn(blogRequestBody, "author") &&
                Object.hasOwn(blogRequestBody, "url") &&
                Object.hasOwn(blogRequestBody, "likes");
    }

    /**
     * Get user id from authentification token
     * 
     * @param {*} header 
     * @returns {string | null} user id from token or null if invalid header
     *                          token is invalid or it doesn't contain id
     */
    const getUserIdFromHeader = (header) => {
        // Try to get authorization
        const authHeader = header.authorization;
        if (!authHeader){
            return null;
        }

        // Parse token from string 'Bearer {token}'
        const tokenParts = authHeader.split(' ');
        if (tokenParts.length != 2 || tokenParts[0] !== "Bearer"){
            return null;
        }
        const token = tokenParts[1];

        // Validate token
        const payload = jwtHandler.validateToken(token);
        if (!payload){
            return null;
        }
        else {
            return payload.id;
        }
    }
}

module.exports = BlogController;
