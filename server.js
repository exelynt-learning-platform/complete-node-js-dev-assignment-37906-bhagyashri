
const express = require("express");

// Create an Express application.
const app = express();

// Define the server port.
const PORT = 3000;

// Route 1: Get user details using route parameters.
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;

    // Validate the user ID.
    if (!userId) {
        return res.status(400).send("Error: User ID is required.");
    }

    res.status(200).send(`User ID received successfully: ${userId}`);
});

// Handle missing user ID.
app.get("/user", (req, res) => {
    res.status(400).send("Error: User ID is required.");
});

// Route 2: Search using query parameters.
app.get("/search", (req, res) => {
    const keyword = req.query.keyword;

    // Validate the keyword.
    if (
        typeof keyword !== "string" ||
        keyword.trim() === ""
    ) {
        return res.status(400).send("Error: Search keyword is required.");
    }

    res.status(200).send(`You searched for: ${keyword}`);
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});
