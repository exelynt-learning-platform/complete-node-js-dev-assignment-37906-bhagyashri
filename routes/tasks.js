
const express = require("express");

// Create a router for task-related routes.
const router = express.Router();

// Temporary task data.
let tasks = [
    { id: 1, title: "Learn Express.js", completed: false },
    { id: 2, title: "Practice Express Router", completed: false }
];

// GET route - Retrieve all tasks.
// URL: GET /tasks
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Tasks fetched successfully.",
        tasks: tasks
    });
});

// POST route - Create a new task.
// URL: POST /tasks
router.post("/", (req, res) => {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Task title is required."
        });
    }

    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
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

// Export the task router.
module.exports = router;
