const PersonModel = require("./Models/PersonModel");
const MongoDBController = require('./db/MongoDBController');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

// Initialize database connection
const connectionString = process.env.MONGODB_URI;
const db = new MongoDBController(connectionString);

// Define middleware
const app = express();
app.use(express.json());
app.use(express.static("dist"));

morgan.token('body', (req) => {
    if (req.method === "POST"){
        return JSON.stringify(req.body);
    }
    return "";
});
app.use(morgan(':method :url :status :response-time ms :body'));

// Define REST API endpoints
app.get("/api/persons", (request, response, next) => {
    lastRequest = new Date();
    db.getAllAsync()
        .then((data) => {
        response.json(data);
        })
        .catch(e => {
            next(e);
        });
});

app.get("/info", async (request, response, next) => {
    // Get current time and compute statistics
    lastRequest = new Date();
    db.getAllAsync().then((data) => {
        const numPeople = data.length;
        response.send(
            `Phonebook has info for ${numPeople} people\n` +
            lastRequest
        );
    })
    .catch((e) => {
        next(e);
    });
});

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    db.getByIdAsync(id).then((data) => {
        if (data){
            response.json(data);
        }
        else {
            response.status(404).end();
        }
    })
    .catch((e) => next(e));
});

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    db.removeAsync(id).then((data) => {
        if (data){
            response.status(200).end();
        }
        else {
            response.status(404).end();
        }
    }).catch((e) => next(e));
});

app.post("/api/persons", (request, response, next) => {
    // Check incoming object
    const newPerson = request.body;
    if (!(Object.hasOwn(newPerson, "name") && Object.hasOwn(newPerson, "number"))){
        response.status(400).json({errorMessage: "Request doesn't contain name or number information"});
    }
    else {
        db.addAsync(newPerson).then(() => {
            response.status(200).end();
        }).catch((e) => next(e));
    }
});

// Endpoint for unknown routes
app.use((request, response, next) => {
    console.log("Unknown endpoint");
    next();
});

// Endpoint for db issues
app.use((error, request, response, next) => {
    response.status(500).end();
    next(error);
});

const port = 3000;
app.listen(port, () => {
    console.log("Starting a server");
});
