
const express = require("express");

const app = express();
const PORT = 3000;

// Import the task and user routers.
const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");

// Built-in middleware to read JSON request bodies.
app.use(express.json());

// Custom middleware to log HTTP method and URL.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Serve frontend files from the public folder.
app.use(express.static("public"));

// Welcome route.
app.get("/welcome", (req, res) => {
    res.status(200).send("Welcome to the Express Mini Application!");
});

// About route.
app.get("/about", (req, res) => {
    res.status(200).json({
        success: true,
        message: "This is the About page."
    });
});

// Search route using query parameters.
app.get("/search", (req, res) => {
    const keyword = req.query.keyword;

    if (typeof keyword !== "string" || keyword.trim() === "") {
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

// Mount the task router at /tasks.
app.use("/tasks", tasksRouter);

// Mount the user router at /users.
app.use("/users", usersRouter);

// Route to intentionally generate a server error.
app.get("/force-error", (req, res, next) => {
    const error = new Error("This is an intentionally forced server error.");
    next(error);
});

// 404 middleware for undefined routes.
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

// Centralized error-handling middleware.
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
