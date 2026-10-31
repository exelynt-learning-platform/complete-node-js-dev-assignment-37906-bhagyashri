
const express = require("express");

const router = express.Router();

// Temporary task data.
let tasks = [
    { id: 1, title: "Learn Express.js", completed: false },
    { id: 2, title: "Practice Express Router", completed: false }
];

// 1. Logging Middleware
function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();

    console.log(
        `[${timestamp}] ${req.method} ${req.originalUrl}`
    );

    next();
}

// 2. Authentication Middleware
function authenticationMiddleware(req, res, next) {
    const validToken = "my-secret-token";

    // Read the token from the Authorization header.
    const authorizationHeader = req.headers.authorization;

    // Expected format: Bearer my-secret-token
    const token = authorizationHeader
        ? authorizationHeader.split(" ")[1]
        : null;

    if (token !== validToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Missing or invalid token."
        });
    }

    // Token is valid. Continue to the route handler.
    next();
}

// Apply middleware in the correct sequence.
// Logging runs first, then authentication.
router.use(loggingMiddleware);
router.use(authenticationMiddleware);

// 3. GET Route - Retrieve all tasks.
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Tasks fetched successfully.",
        tasks: tasks
    });
});

// 4. POST Route - Create a new task.
router.post("/", (req, res) => {
    const { title } = req.body;

    if (
        typeof title !== "string" ||
        title.trim() === ""
    ) {
        return res.status(400).json({
            success: false,
            message: "Task title is required."
        });
    }

    const newTask = {
        id: tasks.length > 0
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1,
        title: title.trim(),
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully.",
        task: newTask
    });
});

// Export the router.
module.exports = router;
