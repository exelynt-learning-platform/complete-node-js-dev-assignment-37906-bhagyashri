
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

// Helper function for checking student ID
const isValidStudentId = (id) => {
    return mongoose.isValidObjectId(id);
};

// Helper function for handling errors
const handleError = (res, error) => {
    if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(
            (err) => err.message
        );

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: messages
        });
    }

    if (error.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }

    console.error("Student API Error:", error.message);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

// 1. CREATE STUDENT
// POST /students
router.post("/", async (req, res) => {
    try {
        const { name, age, grade, email } = req.body;

        const student = new Student({
            name,
            age,
            grade,
            email
        });

        const savedStudent = await student.save();

        return res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: savedStudent
        });

    } catch (error) {
        return handleError(res, error);
    }
});

// 2. GET ALL STUDENTS
// GET /students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        return res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });

    } catch (error) {
        return handleError(res, error);
    }
});

// 3. GET STUDENT BY ID
// GET /students/:id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidStudentId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {
        return handleError(res, error);
    }
});

// 4. UPDATE STUDENT
// PUT /students/:id
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidStudentId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const allowedFields = ["name", "age", "grade", "email"];
        const updateData = {};

        for (const field of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                updateData[field] = req.body[field];
            }
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one valid field to update"
            });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent
        });

    } catch (error) {
        return handleError(res, error);
    }
});

// 5. DELETE STUDENT
// DELETE /students/:id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidStudentId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: deletedStudent
        });

    } catch (error) {
        return handleError(res, error);
    }
});

module.exports = router;
