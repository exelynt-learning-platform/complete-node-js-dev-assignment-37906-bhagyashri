
function notFoundMiddleware(req, res, next) {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
}

function errorMiddleware(err, req, res, next) {
    console.error("Error:", err.message);

    if (err.name === "MulterError") {
        const message = err.code === "LIMIT_FILE_SIZE"
            ? "File size must not exceed 5 MB."
            : err.message;

        return res.status(400).json({
            success: false,
            message
        });
    }

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500
            ? "Internal server error."
            : err.message
    });
}

module.exports = {
    notFoundMiddleware,
    errorMiddleware
};
