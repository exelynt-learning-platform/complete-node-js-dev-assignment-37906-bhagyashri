
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Student Management API is running"
    });
});

// Student routes
app.use("/students", studentRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// Start server after MongoDB connection
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`Student API: http://localhost:${PORT}/students`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();

// Gracefully close MongoDB connection
process.on("SIGINT", async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    } catch (error) {
        console.error("Error closing MongoDB:", error.message);
    } finally {
        process.exit(0);
    }
});
