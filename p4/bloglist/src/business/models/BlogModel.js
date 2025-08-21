function BlogModel(id, userId, title, author, url, likes){
    this.id = id;
    this.userId = userId
    this.title = title;
    this.author = author;
    this.url = url;
    this.likes = likes;
}

module.exports = BlogModel;
