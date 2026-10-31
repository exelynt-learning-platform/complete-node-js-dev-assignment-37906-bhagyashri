
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");

const app = express();

const PORT = process.env.PORT || 3000;

// 1. Ensure uploads directory exists
const uploadDirectory = path.join(__dirname, "uploads");

fs.mkdirSync(uploadDirectory, { recursive: true });

// 2. Configure allowed frontend origins
const allowedOrigins = [
    "http://localhost:5173"
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests without an Origin header,
        // such as curl and server-to-server requests.
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Do not add Access-Control-Allow-Origin for blocked origins.
        return callback(null, false);
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: false,

    optionsSuccessStatus: 204
};

// 3. Apply CORS globally BEFORE mounting routes
app.use(cors(corsOptions));

// 4. Built-in middleware
app.use(express.json());

// 5. Serve static files and uploaded attachments
app.use(express.static(path.join(__dirname, "public")));

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);


// Mount routers
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

// 7. Public route for testing CORS from the frontend
app.get("/api/cors-test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CORS request successful!",
        data: "Your frontend can access this API."
    });
});

// 8. JSON 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

// 9. General error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.status ? err.message : "Internal server error."
    });
});

// 10. Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
