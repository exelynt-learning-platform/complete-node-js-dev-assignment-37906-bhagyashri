
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI is missing from .env");
        }

        await mongoose.connect(mongoURI);

        console.log("MongoDB connected successfully!");
        console.log("Database:", mongoose.connection.name);

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established.");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected.");
});

module.exports = connectDB;
