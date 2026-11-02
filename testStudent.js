
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./db");
const Student = require("./models/Student");

const testStudent = async () => {
    try {
        await connectDB();

        console.log("\n--- Testing Valid Student ---");

        const validStudent = new Student({
            name: "Rahul Sharma",
            age: 22,
            grade: "A",
            email: `rahul${Date.now()}@example.com`
        });

        await validStudent.save();

        console.log("Valid student saved successfully!");
        console.log(validStudent);

        console.log("\n--- Testing Invalid Student ---");

        const invalidStudent = new Student({
            name: "",
            age: 150,
            grade: "",
            email: "invalid-email"
        });

        await invalidStudent.save();

        console.log("Unexpected: invalid student was saved.");

    } catch (error) {
        if (error.name === "ValidationError") {
            console.log("Validation failed as expected:");

            Object.values(error.errors).forEach((err) => {
                console.log("-", err.message);
            });

        } else {
            console.error("Test failed:", error.message);
        }

    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        console.log("\nMongoDB connection closed.");
    }
};

testStudent();
