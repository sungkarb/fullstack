/**
 * Represents blog information in application
 * 
 * @param {string} id 
 * @param {string} userId
 * @param {string} title 
 * @param {string} author 
 * @param {string} url 
 * @param {Number} likes 
 */
function BlogEntity(id, userId, title, author, url, likes){
    this.id = id;
    this.userId = userId
    this.title = title;
    this.author = author;
    this.url = url;
    this.likes = likes;
}

module.exports = BlogEntity;