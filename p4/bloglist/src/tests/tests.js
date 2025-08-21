// Libraries and modules
const supertest = require('supertest');
const assert = require('node:assert');
const { test, beforeEach, after, describe } = require('node:test'); 

const config = require('../utils/config');
const logger = require('../utils/logger');
const createApp = require('../server');
const BlogRepository = require('../data/repositories/BlogRepository');
const { default: mongoose } = require('mongoose');

// Create a test server
const dbRepository = new BlogRepository(config.MONGODB_URI);
const app = createApp();
const api = supertest(app);

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    }  
];

// Before each test, make database empty and insert test blogs
beforeEach(async () => {
    await dbRepository.removeAllAsync();
    await Promise.all(blogs.map((blog) => {
        return dbRepository.addAsync(blog);
    }));
});

// Test all api call
describe('GET requests', () => {
    test("All blogs are returned", async () => {
        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body.length, blogs.length);
    });
    
    test("Blog has a field with name id", async () => {
        const response = await api.get(`/api/blogs`);
        const firstObject = response.body[0];
        assert.ok(Object.hasOwn(firstObject, "id"));
    });
})

describe("POST requests", () => {
    test("Correctly added new blog", async () => {
        const blog = {
            title: "UW Madison strikes again!",
            author: "Sungkar Bolat",
            url: "https://google.com",
            likes: 10,
        };

        const response = await api.post("/api/blogs").send(blog);
        const addedBlog = response.body;
        delete addedBlog.id;
        assert.deepStrictEqual(addedBlog, blog);
    });

    test("Blog misses url", async () => {
        const blog = {
            title: "UW Madison strikes again!",
            author: "Sungkar Bolat",
            likes: 10,
        };

        const response = await api.post("/api/blogs").send(blog);
        assert.strictEqual(response.status, 400);
    });
});

describe("DELETE requests", () => {
    test("Deleting single blog", async () => {
        const allBlogs = (await api.get("/api/blogs")).body;
        const firstBlog = allBlogs[0];

        const response = await api.delete(`/api/blogs/${firstBlog.id}`);
        assert.strictEqual(response.status, 204);
    });
});

describe("PUT requests", () => {
    test("Updating single blog", async () => {
        const allBlogs = (await api.get("/api/blogs")).body;
        
        // Modify first blog a little bit
        const firstBlog = allBlogs[0];
        firstBlog.title = "Great life of Bucky Badger";

        const response = await api.put(`/api/blogs/${firstBlog.id}`).send(firstBlog);
        assert.deepStrictEqual(firstBlog, response.body);
    });
});

after(async () => {
    await mongoose.connection.close();
    console.log("Closed connection to database");
});
