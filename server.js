const express = require("express");

// Create an Express application.
const app = express();

const PORT = 3000;

// Middleware to parse JSON request bodies.
app.use(express.json());

// Route 1: Plain text response.
app.get("/text", (req, res) => {
    res.status(200).send("Welcome! This is a plain text response.");
});

// Route 2: HTML response.
app.get("/html", (req, res) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Express HTML Response</title>
        </head>
        <body>
            <h1>Welcome to Express.js</h1>
            <p>This is an HTML response from the Express server.</p>
        </body>
        </html>
    `);
});

// Route 3: JSON API response.
app.get("/api/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Rahul",
            email: "rahul@example.com"
        },
        {
            id: 2,
            name: "Amit",
            email: "amit@example.com"
        }
    ];

    res.status(200).json({
        success: true,
        message: "Users retrieved successfully.",
        users: users
    });
});

// Route 4: Create a user with a POST request.
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    // Validate the incoming data.
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required."
        });
    }

    // Send a successful creation response.
    res.status(201).json({
        success: true,
        message: "User created successfully.",
        user: {
            id: 3,
            name: name,
            email: email
        }
    });
});

// Route 5: Custom error response.
app.get("/error", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Requested resource was not found."
    });
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});