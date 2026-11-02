
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers } = require("../controllers/userController");

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *       '401':
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getAllUsers);

module.exports = router;
