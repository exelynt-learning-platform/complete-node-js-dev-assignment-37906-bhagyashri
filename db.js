const mongoose = require("mongoose");

// Connect the Node.js application to MongoDB.
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from the .env file.");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully!");
        console.log(`Database Name: ${mongoose.connection.name}`);

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);

        // Stop the application if the initial database connection fails.
        process.exit(1);
    }
};

// Log database connection errors.
mongoose.connection.on("error", (error) => {
    console.error("MongoDB runtime connection error:", error.message);
});

// Log when MongoDB disconnects.
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected.");
});

module.exports = connectDB;