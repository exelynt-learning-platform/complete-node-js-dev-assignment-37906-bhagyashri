
const express = require("express");

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Express Error Handling Application!"
    });
});

// Route to intentionally generate a server error
app.get("/force-error", (req, res, next) => {
    const error = new Error(
        "This is an intentionally forced server error."
    );

    next(error);
});

// 404 middleware for undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error. Something went wrong on the server."
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});
