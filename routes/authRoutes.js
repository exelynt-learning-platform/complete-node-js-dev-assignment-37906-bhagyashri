
const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Authenticate using the assignment API key
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [apiKey]
 *             properties:
 *               apiKey:
 *                 type: string
 *                 example: my-secret-token
 *     responses:
 *       '200':
 *         description: Authentication successful
 *       '401':
 *         description: Invalid API key
 */
router.post("/login", login);

module.exports = router;
