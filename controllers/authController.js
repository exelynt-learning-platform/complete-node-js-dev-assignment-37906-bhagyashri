
function login(req, res) {
    const { apiKey } = req.body;

    if (!apiKey || apiKey !== process.env.API_TOKEN) {
        return res.status(401).json({
            success: false,
            message: "Invalid API key."
        });
    }

    res.status(200).json({
        success: true,
        message: "Authentication successful.",
        token: apiKey,
        tokenType: "Bearer"
    });
}

module.exports = { login };
