
const express = require("express");

// Create a router for user-related routes.
const router = express.Router();

// Temporary user data.
let users = [
    { id: 1, name: "Rahul", email: "rahul@example.com" },
    { id: 2, name: "Amit", email: "amit@example.com" }
];

// GET route - Retrieve all users.
// URL: GET /users
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Users fetched successfully.",
        users: users
    });
});

// POST route - Create a new user.
// URL: POST /users
router.post("/", (req, res) => {
    const { name, email } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof email !== "string" ||
        email.trim() === ""
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid name and email are required."
        });
    }

    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
        name: name.trim(),
        email: email.trim()
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User created successfully.",
        user: newUser
    });
});

// Export the user router.
module.exports = router;
