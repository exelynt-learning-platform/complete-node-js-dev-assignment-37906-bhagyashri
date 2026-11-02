
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Fail at startup if the authentication token is missing.
if (!process.env.API_TOKEN) {
    throw new Error("API_TOKEN is missing from the .env file.");
}

// Import middleware
const loggerMiddleware = require("./middleware/loggerMiddleware");

const {
    notFoundMiddleware,
    errorMiddleware
} = require("./middleware/errorMiddleware");

// Import routers
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Import Swagger configuration
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Ensure uploads directory exists
const uploadDirectory = path.join(__dirname, "uploads");

fs.mkdirSync(uploadDirectory, { recursive: true });

// CORS configuration
const allowedOrigins = [
    process.env.FRONTEND_ORIGIN || "http://localhost:5173"
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: false
};

// 1. Request logging
app.use(loggerMiddleware);

// 2. CORS
app.use(cors(corsOptions));

// 3. Parse JSON request bodies
app.use(express.json());

// 4. Serve uploaded attachments
app.use(
    "/uploads",
    express.static(uploadDirectory)
);

// 5. API routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

// 6. Swagger documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// OpenAPI JSON
app.get("/api-docs.json", (req, res) => {
    res.json(swaggerSpec);
});

// 7. Handle unknown routes
app.use(notFoundMiddleware);

// 8. Central error handling (must be last)
app.use(errorMiddleware);

// Start server
// Connect to MongoDB before starting the Express server.
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

// Start the application.
startServer();

// Gracefully close the database connection when the application stops.
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
});
