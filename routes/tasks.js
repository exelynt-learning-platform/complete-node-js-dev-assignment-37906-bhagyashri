const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Temporary task data.
let tasks = [
    {
        id: 1,
        title: "Learn Express.js",
        description: "Understand Express basics",
        dueDate: "2026-11-15",
        completed: false
    }
];

// 1. Logging Middleware
function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

    next();
}

// 2. Authentication Middleware
function authenticationMiddleware(req, res, next) {
    const validToken = "my-secret-token";
    const authorizationHeader = req.headers.authorization;

    const token = authorizationHeader
        ? authorizationHeader.split(" ")[1]
        : null;

    if (token !== validToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Missing or invalid token."
        });
    }

    next();
}

// 3. Task Validation Middleware
const validateTask = [
    body("title")
        .isString()
        .withMessage("Title must be a string.")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters long."),

    body("description")
        .isString()
        .withMessage("Description must be a string.")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Description is required."),

    body("dueDate")
        .isString()
        .withMessage("Due date must be a string.")
        .bail()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("Due date must be a valid date in YYYY-MM-DD format.")
];

// Apply logging and authentication to task routes.
router.use(loggingMiddleware);
router.use(authenticationMiddleware);

// GET: Retrieve all tasks.
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Tasks fetched successfully.",
        tasks: tasks
    });
});

// POST: Create a task after validating the request.
router.post("/", validateTask, (req, res) => {
    // Check validation results before creating a task.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Task validation failed.",
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }

    // Create task only when validation succeeds.
    const { title, description, dueDate } = req.body;

    const newTask = {
        id: tasks.length > 0
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully.",
        task: newTask
    });
});

// Export router.
module.exports = router;