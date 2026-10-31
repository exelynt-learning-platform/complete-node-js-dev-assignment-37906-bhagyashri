
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
    body,
    validationResult
} = require("express-validator");

const router = express.Router();

let tasks = [];

// 1. Logging middleware
function loggingMiddleware(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );
    next();
}

// 2. Authentication middleware
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

// 3. Multer storage configuration
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

// 4. Allowed file types
const allowedTypes = {
    "application/pdf": [".pdf"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/webp": [".webp"]
};

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

// 5. Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// 6. Task validation
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

// GET /tasks
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Tasks fetched successfully.",
        tasks
    });
});

// POST /tasks
router.post(
    "/",
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
    validateTask,
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Remove uploaded file if task data is invalid.
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Unable to remove invalid upload:", err);
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

        const newTask = {
            id: tasks.length + 1,
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            dueDate: req.body.dueDate,
            attachment: req.file
                ? {
                    fileName: req.file.filename,
                    filePath: `/uploads/${req.file.filename}`
                }
                : null
        };

        tasks.push(newTask);

        return res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task: newTask
        });
    }
);

module.exports = router;
