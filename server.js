const express = require("express");
const cors = require("cors");
const path = require("path");

const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");

const app = express();

const PORT = 3000;

// 1. Allowed frontend origins
const allowedOrigins = [
    "http://localhost:5173"
];

// 2. CORS configuration
const corsOptions = {
    origin: (origin, callback) => {

        // Allow requests that do not contain an Origin header,
        // such as server-to-server requests and command-line tools.
        if (!origin) {
            return callback(null, true);
        }

        // Allow only origins in the allowlist.
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Do not send Access-Control-Allow-Origin for blocked origins.
        return callback(null, false);
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: false,

    optionsSuccessStatus: 204
};

// 3. Apply CORS globally before routes
app.use(cors(corsOptions));

// 4. Built-in middleware
app.use(express.json());

// 5. Serve frontend static files and uploaded files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 6. API routes
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

// 7. Sample route to test CORS
app.get("/api/cors-test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CORS request successful!",
        data: "Your frontend can access this API."
    });
});

// 8. 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

// 9. Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
