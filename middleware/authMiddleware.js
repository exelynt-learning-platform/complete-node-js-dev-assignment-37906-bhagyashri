
function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization;

    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    const expectedToken = process.env.API_TOKEN;

    if (!token || token !== expectedToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Provide a valid Bearer token."
        });
    }

    next();
}

module.exports = authMiddleware;
