const mongoose = require('mongoose');
const BlogEntity = require('../entities/BlogEntity');

/**
 * MongoDB Blog repository for handling data connection and manipulation
 * 
 * @param {string} connectionString 
 */
function BlogRepository(connectionString){
    // Initialize connection and schema
    mongoose.connect(connectionString);
    const blogSchema = new mongoose.Schema({
        userId: String,
        title: String,
        author: String,
        url: String,
        likes: Number,
    });
    blogSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    });
    const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

    /**
     * Gets all blogs from the database
     * 
     * @returns {BlogEntity[]} list of blog entitites 
     */
    this.getAllAsync = function(){
        return Blog.find({});
    }

    /**
     * Gets blog by its id
     * 
     * @param {string} id - id of the blog
     * @returns {BlogEntity} blog with this id or null if not found
     */
    this.getByIdAsync = function(id){
        return Blog.findById(id);
    }

    /**
     * Inserts new blog entity object to mongodb database and updates id of the entity
     * 
     * @param {BlogEntity} blogEntity
     * @returns {BlogEntity} inserted blog
     */
    this.addAsync = function(blogEntity){
        const newBlog = new Blog({
            userId: blogEntity.userId,
            title: blogEntity.title,
            author: blogEntity.author,
            url: blogEntity.url,
            likes: blogEntity.likes
        });
        return newBlog.save();
    }

    /**
     * Updates blog in database
     * 
     * @param {BlogEntity} blogEntity 
     * @returns {BlogEntity} updated blog entity from database or null if blog
     *          couldn't be found
     */
    this.updateAsync = function(blogEntity){
        return Blog.findByIdAndUpdate(blogEntity.id, blogEntity, { new: true });
    }

    /**
     * Removes blog from database based on its id
     * 
     * @param {string} id - blog's id
     * @returns {BlogEntity} blog entity that was deleted or null if blog
     *                      with this id wasn't found
     */
    this.removeAsync = function(id){
        return Blog.findByIdAndDelete(id);
    }

    /**
     * Removes all blogs from database
     */
    this.removeAllAsync = function(){
        return Blog.deleteMany({});
    }

    this.closeConnection = function(){
        return mongoose.connection.close();
    }
};

module.exports = BlogRepository;
