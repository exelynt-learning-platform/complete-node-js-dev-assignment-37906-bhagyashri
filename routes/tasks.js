
const express = require("express");

const router = express.Router();

// Temporary in-memory task storage
let tasks = [
    {
        id: 1,
        title: "Learn Node.js",
        description: "Understand Express and REST APIs",
        status: "pending"
    },
    {
        id: 2,
        title: "Complete Swagger assignment",
        description: "Document all API endpoints",
        status: "completed"
    }
];

/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Learn Node.js
 *         description:
 *           type: string
 *           example: Understand Express and REST APIs
 *         status:
 *           type: string
 *           enum: [pending, completed]
 *           example: pending
 *     TaskInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: Learn Express
 *         description:
 *           type: string
 *           example: Understand REST APIs
 *         status:
 *           type: string
 *           enum: [pending, completed]
 *           example: pending
 */

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns all tasks in the system.
 *     tags:
 *       - Tasks
 *     responses:
 *       '200':
 *         description: Tasks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalTasks:
 *                   type: integer
 *                   example: 2
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       '500':
 *         description: Internal server error.
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        totalTasks: tasks.length,
        tasks
    });
});

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '201':
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Invalid or missing task details.
 *       '500':
 *         description: Internal server error.
 */
router.post("/", (req, res) => {
    const { title, description, status } = req.body;

    if (
        typeof title !== "string" || !title.trim() ||
        typeof description !== "string" || !description.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Title and description are required."
        });
    }

    if (
        status !== undefined &&
        !["pending", "completed"].includes(status)
    ) {
        return res.status(400).json({
            success: false,
            message: "Status must be pending or completed."
        });
    }

    const newTask = {
        id: tasks.length
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1,
        title: title.trim(),
        description: description.trim(),
        status: status || "pending"
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        task: newTask
    });
});

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update.
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '200':
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Invalid task ID or task details.
 *       '404':
 *         description: Task not found.
 *       '500':
 *         description: Internal server error.
 */
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid task ID."
        });
    }

    const task = tasks.find(item => item.id === id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found."
        });
    }

    const { title, description, status } = req.body;

    if (
        typeof title !== "string" || !title.trim() ||
        typeof description !== "string" || !description.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Title and description are required."
        });
    }

    if (
        status !== undefined &&
        !["pending", "completed"].includes(status)
    ) {
        return res.status(400).json({
            success: false,
            message: "Status must be pending or completed."
        });
    }

    task.title = title.trim();
    task.description = description.trim();

    if (status !== undefined) {
        task.status = status;
    }

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task
    });
});

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete.
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       '200':
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Invalid task ID.
 *       '404':
 *         description: Task not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid task ID."
        });
    }

    const taskIndex = tasks.findIndex(item => item.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Task not found."
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        task: deletedTask
    });
});

module.exports = router;
