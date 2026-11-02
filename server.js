
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");

const app = express();

const PORT = process.env.PORT || 3000;

// Allowed frontend origins
const allowedOrigins = [
    "http://localhost:5173"
];

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

// Swagger documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Swagger JSON specification
app.get("/api-docs.json", (req, res) => {
    res.json(swaggerSpec);
});

// CORS testing endpoint
app.get("/api/cors-test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CORS request successful!"
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error."
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger documentation: http://localhost:${PORT}/api-docs`);
});
