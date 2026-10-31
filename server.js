
const express = require("express");

// Create an Express application.
const app = express();

const PORT = 3000;

// Middleware 1: Parse incoming JSON data.
app.use(express.json());

// Middleware 2: Global request logger.
// This middleware runs for every incoming request.
app.use((req, res, next) => {
    console.log(`Method: ${req.method} | URL: ${req.originalUrl}`);

    // Pass control to the next middleware or route.
    next();
});

// Middleware 3: Validate registration data.
function validateRegistration(req, res, next) {
    const { name, email } = req.body;

    // Check whether name and email are provided.
    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof email !== "string" ||
        email.trim() === ""
    ) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required."
        });
    }

    // Validation passed. Continue to the route handler.
    next();
}

// POST route: Register a user.
// Validation middleware runs before the route handler.
app.post("/register", validateRegistration, (req, res) => {
    const { name, email } = req.body;

    res.status(201).json({
        success: true,
        message: "User registered successfully!",
        user: {
            name: name,
            email: email
        }
    });
});

// Start the Express server.
app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});
