
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

// Helper function to handle errors
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

// POST /students - Create a student
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

// GET /students - Filter, project and sort students
router.get("/", async (req, res) => {
    try {
        const { grade, sort = "asc" } = req.query;

        // Validate sort parameter
        if (!["asc", "desc"].includes(sort)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sort parameter. Use asc or desc."
            });
        }

        // Validate grade parameter
        if (grade !== undefined) {
            if (typeof grade !== "string" || !grade.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Grade must be a non-empty string."
                });
            }
        }

        // Build filter
        const filter = {};

        if (grade !== undefined) {
            filter.grade = grade.trim();
        }

        // Execute query:
        // 1. Filter by grade
        // 2. Select only name and email
        // 3. Sort by age
        const students = await Student.find(filter)
            .select("name email -_id")
            .sort({ age: sort === "asc" ? 1 : -1 });

        return res.status(200).json({
            success: true,
            count: students.length,
            message: students.length === 0
                ? "No students found matching the given filter"
                : "Students retrieved successfully",
            data: students
        });

    } catch (error) {
        return handleError(res, error);
    }
});

// GET /students/:id - Get one student
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
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

// PUT /students/:id - Update a student
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
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

// DELETE /students/:id - Delete a student
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
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
