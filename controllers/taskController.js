
const { getTasks, setTasks } = require("../data/store");

function getAllTasks(req, res) {
    let tasks = [...getTasks()];

    const {
        page = 1,
        limit = 10,
        status,
        userId,
        fromDate,
        toDate
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
        !Number.isInteger(pageNumber) || pageNumber < 1 ||
        !Number.isInteger(limitNumber) || limitNumber < 1 ||
        limitNumber > 100
    ) {
        return res.status(400).json({
            success: false,
            message: "Page must be positive and limit must be between 1 and 100."
        });
    }

    if (
        status &&
        !["pending", "in-progress", "completed"].includes(status)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid status filter."
        });
    }

    if (userId && (!Number.isInteger(Number(userId)) || Number(userId) < 1)) {
        return res.status(400).json({
            success: false,
            message: "Invalid userId filter."
        });
    }

    if (
        fromDate && !/^\d{4}-\d{2}-\d{2}$/.test(fromDate) ||
        toDate && !/^\d{4}-\d{2}-\d{2}$/.test(toDate)
    ) {
        return res.status(400).json({
            success: false,
            message: "Dates must use YYYY-MM-DD format."
        });
    }

    if (fromDate && toDate && fromDate > toDate) {
        return res.status(400).json({
            success: false,
            message: "fromDate cannot be later than toDate."
        });
    }

    // Apply status, user and date filters.
    if (status) {
        tasks = tasks.filter(task => task.status === status);
    }

    if (userId) {
        tasks = tasks.filter(task => task.userId === Number(userId));
    }

    if (fromDate) {
        tasks = tasks.filter(task => task.dueDate >= fromDate);
    }

    if (toDate) {
        tasks = tasks.filter(task => task.dueDate <= toDate);
    }

    const totalTasks = tasks.length;
    const totalPages = Math.ceil(totalTasks / limitNumber);
    const startIndex = (pageNumber - 1) * limitNumber;

    const paginatedTasks = tasks.slice(
        startIndex,
        startIndex + limitNumber
    );

    res.status(200).json({
        success: true,
        pagination: {
            totalTasks,
            totalPages,
            currentPage: pageNumber,
            limit: limitNumber
        },
        tasks: paginatedTasks
    });
}

function createTask(req, res) {
    const tasks = getTasks();

    const newTask = {
        id: tasks.length
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || "pending",
        userId: Number(req.body.userId),
        dueDate: req.body.dueDate,
        attachment: req.file
            ? {
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                url: `/uploads/${req.file.filename}`
            }
            : null,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    setTasks(tasks);

    res.status(201).json({
        success: true,
        message: "Task created successfully.",
        task: newTask
    });
}

function updateTask(req, res) {
    const id = Number(req.params.id);
    const tasks = getTasks();
    const index = tasks.findIndex(task => task.id === id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            success: false,
            message: "Invalid task ID."
        });
    }

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Task not found."
        });
    }

    const oldTask = tasks[index];

    const updatedTask = {
        ...oldTask,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || oldTask.status,
        userId: Number(req.body.userId),
        dueDate: req.body.dueDate,
        attachment: req.file
            ? {
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                url: `/uploads/${req.file.filename}`
            }
            : oldTask.attachment
    };

    tasks[index] = updatedTask;
    setTasks(tasks);

    res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        task: updatedTask
    });
}

function deleteTask(req, res) {
    const id = Number(req.params.id);
    const tasks = getTasks();

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            success: false,
            message: "Invalid task ID."
        });
    }

    const task = tasks.find(item => item.id === id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found."
        });
    }

    setTasks(tasks.filter(item => item.id !== id));

    res.status(200).json({
        success: true,
        message: "Task deleted successfully.",
        task
    });
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};
