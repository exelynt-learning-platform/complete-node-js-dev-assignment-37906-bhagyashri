
const { body, validationResult } = require("express-validator");
const { getUsers } = require("../data/store");

const validateTask = [
    body("title")
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters."),

    body("description")
        .trim()
        .isLength({ min: 5, max: 500 })
        .withMessage("Description must be between 5 and 500 characters."),

    body("status")
        .optional()
        .isIn(["pending", "in-progress", "completed"])
        .withMessage("Status must be pending, in-progress or completed."),

    body("userId")
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer.")
        .custom(value => {
            const userExists = getUsers().some(
                user => user.id === Number(value)
            );

            if (!userExists) {
                throw new Error("User does not exist.");
            }

            return true;
        }),

    body("dueDate")
        .isISO8601({ strict: true })
        .withMessage("Due date must be a valid YYYY-MM-DD date.")
        .custom(value => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                throw new Error("Due date must use YYYY-MM-DD format.");
            }

            return true;
        })
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }

    next();
}

module.exports = {
    validateTask,
    handleValidationErrors
};
