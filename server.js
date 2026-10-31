
const express = require("express");

const app = express();
const PORT = 3000;

// Built-in middleware to read JSON request bodies.
app.use(express.json());

// Custom middleware to log the HTTP method and requested URL.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Serve HTML, CSS, and JavaScript files from the public folder.
app.use(express.static("public"));

// Home route - sends a text response.
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Express Mini Application!");
});

// About route - sends a JSON response.
app.get("/about", (req, res) => {
    res.status(200).json({
        success: true,
        message: "This is the About page."
    });
});

// Route parameter - reads the user ID using req.params.
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;

    res.status(200).json({
        success: true,
        message: "User details fetched successfully.",
        userId: userId
    });
});

// Query parameter - reads the search keyword using req.query.
app.get("/search", (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword || keyword.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Please provide a search keyword."
        });
    }

    res.status(200).json({
        success: true,
        message: `You searched for: ${keyword}`
    });
});

// POST route - receives JSON data from the client.
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required."
        });
    }

    res.status(201).json({
        success: true,
        message: "User created successfully.",
        user: {
            name: name,
            email: email
        }
    });
});

// Route to intentionally generate a server error for testing.
app.get("/force-error", (req, res, next) => {
    const error = new Error("This is an intentionally forced server error.");
    next(error);
});

// 404 middleware - handles routes that do not exist.
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

// Centralized error-handling middleware - handles unexpected errors.
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error. Something went wrong."
    });
});

// Start the Express server.
app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});
