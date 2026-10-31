
const express = require("express");
const router = express.Router();


function authenticationMiddleware(req, res, next) {
    const authorization = req.headers.authorization;

    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    const expectedToken = process.env.API_TOKEN;

    if (!expectedToken || token !== expectedToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Missing or invalid token."
        });
    }

    next();
}

router.use(authenticationMiddleware);

module.exports = router;
