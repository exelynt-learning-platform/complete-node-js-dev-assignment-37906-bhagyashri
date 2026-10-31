
const express = require("express");

const router = express.Router();

// Temporary in-memory task storage
let tasks = [
    {
        id: 1,
        title: "Complete Node.js assignment",
        description: "Test CORS configuration",
        status: "pending"
    },
    {
        id: 2,
        title: "Test API",
        description: "Verify GET and POST requests",
        status: "completed"
    }
];

// GET /tasks - Fetch all tasks
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        totalTasks: tasks.length,
        tasks
    });
});

// POST /tasks - Create a new task
router.post("/", (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: "Title and description are required."
        });
    }

    const newTask = {
        id: tasks.length
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1,
        title,
        description,
        status: "pending"
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        task: newTask
    });
});

module.exports = router;
