
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
            minlength: [2, "Name must contain at least 2 characters"]
        },

        age: {
            type: Number,
            required: [true, "Student age is required"],
            min: [5, "Age must be at least 5"],
            max: [100, "Age cannot exceed 100"]
        },

        grade: {
            type: String,
            required: [true, "Student grade is required"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Student email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
