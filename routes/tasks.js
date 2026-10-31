
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
    body,
    validationResult
} = require("express-validator");

const router = express.Router();

// Temporary task data for testing.
let tasks = [];

// 1. Logging Middleware
function loggingMiddleware(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );

    next();
}

// 2. Authentication Middleware
function authenticationMiddleware(req, res, next) {
    const authorization = req.headers.authorization;

    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    if (token !== "my-secret-token") {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Missing or invalid token."
        });
    }

    next();
}

// 3. Multer Storage Configuration
const uploadDirectory = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        const extension = path.extname(file.originalname).toLowerCase();

        cb(null, uniqueName + extension);
    }
});

// 4. Allowed File Types
const allowedTypes = {
    "application/pdf": [".pdf"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/webp": [".webp"]
};

// File Type Validation
function fileFilter(req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();

    const allowedExtensions = allowedTypes[file.mimetype];

    if (
        allowedExtensions &&
        allowedExtensions.includes(extension)
    ) {
        return cb(null, true);
    }

    cb(new Error(
        "Invalid file type. Only PDF, JPG, JPEG, PNG, GIF and WEBP files are allowed."
    ));
}

// 5. Multer Upload Configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// 6. Task Validation Middleware
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
        .isISO8601({
            strict: true,
            strictSeparator: true
        })
        .withMessage("Due date must be a valid date in YYYY-MM-DD format.")
];

// Apply Logging and Authentication to All Task Routes.
router.use(loggingMiddleware);
router.use(authenticationMiddleware);

// 7. GET /tasks - Pagination and Filtering
router.get("/", (req, res) => {

    // Read query parameters with default values.
    const page = req.query.page === undefined
        ? 1
        : Number(req.query.page);

    const limit = req.query.limit === undefined
        ? 10
        : Number(req.query.limit);

    const status = req.query.status === undefined
        ? undefined
        : req.query.status.trim().toLowerCase();

    // Validate page number.
    if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({
            success: false,
            message: "Page must be a positive integer."
        });
    }

    // Validate limit.
    if (!Number.isInteger(limit) || limit < 1) {
        return res.status(400).json({
            success: false,
            message: "Limit must be a positive integer."
        });
    }

    // Validate status.
    if (
        status !== undefined &&
        !["pending", "completed"].includes(status)
    ) {
        return res.status(400).json({
            success: false,
            message: "Status must be either pending or completed."
        });
    }

    // Apply status filtering.
    const filteredTasks = status
        ? tasks.filter(task => {
            const taskStatus = task.status ||
                (task.completed ? "completed" : "pending");

            return taskStatus === status;
        })
        : tasks;

    // Calculate pagination details.
    const totalTasks = filteredTasks.length;

    const totalPages = Math.ceil(totalTasks / limit);

    const startIndex = (page - 1) * limit;

    const endIndex = startIndex + limit;

    // Get the required tasks.
    const paginatedTasks = filteredTasks.slice(
        startIndex,
        endIndex
    );

    // Send structured JSON response.
    return res.status(200).json({
        success: true,
        message: "Tasks fetched successfully.",

        pagination: {
            totalTasks: totalTasks,
            currentPage: page,
            limit: limit,
            totalPages: totalPages
        },

        filters: {
            status: status || "all"
        },

        tasks: paginatedTasks
    });
});

// 8. POST /tasks - Create Task with Attachment
router.post(
    "/",

    // Multer Upload Middleware
    (req, res, next) => {
        upload.single("attachment")(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            next();
        });
    },

    // Task Validation Middleware
    validateTask,

    // Task Creation Route Handler
    (req, res) => {

        const errors = validationResult(req);

        // Handle validation errors.
        if (!errors.isEmpty()) {

            // Remove uploaded file if task validation fails.
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error(
                            "Unable to remove invalid upload:",
                            err
                        );
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: "Task validation failed.",

                errors: errors.array().map(error => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }

        // Create a new task.
        const newTask = {
            id: tasks.length > 0
                ? Math.max(...tasks.map(task => task.id)) + 1
                : 1,

            title: req.body.title.trim(),

            description: req.body.description.trim(),

            dueDate: req.body.dueDate,

            status: "pending",

            completed: false,

            attachment: req.file
                ? {
                    fileName: req.file.filename,
                    filePath: `/uploads/${req.file.filename}`
                }
                : null
        };

        // Save task in temporary memory.
        tasks.push(newTask);

        // Return successful response.
        return res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task: newTask
        });
    }
);

// Export Router
module.exports = router;
