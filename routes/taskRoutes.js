
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    validateTask,
    handleValidationErrors
} = require("../validators/taskValidator");

const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// All task routes require authentication.
router.use(authMiddleware);

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
 *           example: Complete assignment
 *         description:
 *           type: string
 *           example: Build a Task Manager API
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *         userId:
 *           type: integer
 *           example: 1
 *         dueDate:
 *           type: string
 *           format: date
 *           example: "2026-11-10"
 *         attachment:
 *           type: object
 *           nullable: true
 *           properties:
 *             filename:
 *               type: string
 *             originalName:
 *               type: string
 *             mimetype:
 *               type: string
 *             size:
 *               type: integer
 *             url:
 *               type: string
 *     TaskInput:
 *       type: object
 *       required: [title, description, userId, dueDate]
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *         userId:
 *           type: integer
 *         dueDate:
 *           type: string
 *           format: date
 */

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get tasks with pagination and filters
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Paginated and filtered task list
 *       '400':
 *         description: Invalid query parameters
 *       '401':
 *         description: Unauthorized
 */
router.get("/", getAllTasks);

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a task with an optional attachment
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/TaskInput'
 *               - type: object
 *                 properties:
 *                   attachment:
 *                     type: string
 *                     format: binary
 *     responses:
 *       '201':
 *         description: Task created successfully
 *       '400':
 *         description: Validation or file upload error
 *       '401':
 *         description: Unauthorized
 */
router.post(
    "/",
    upload.single("attachment"),
    validateTask,
    handleValidationErrors,
    createTask
);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task and optionally replace its attachment
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/TaskInput'
 *               - type: object
 *                 properties:
 *                   attachment:
 *                     type: string
 *                     format: binary
 *     responses:
 *       '200':
 *         description: Task updated successfully
 *       '400':
 *         description: Invalid ID or validation error
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Task not found
 */
router.put(
    "/:id",
    upload.single("attachment"),
    validateTask,
    handleValidationErrors,
    updateTask
);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Task deleted successfully
 *       '400':
 *         description: Invalid task ID
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Task not found
 */
router.delete("/:id", deleteTask);

module.exports = router;
