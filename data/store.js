
const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com"
    }
];

let tasks = [
    {
        id: 1,
        title: "Complete Node.js assignment",
        description: "Build a Task Manager API",
        status: "pending",
        userId: 1,
        dueDate: "2026-11-10",
        attachment: null,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Learn Express",
        description: "Understand Express middleware",
        status: "completed",
        userId: 2,
        dueDate: "2026-11-12",
        attachment: null,
        createdAt: new Date().toISOString()
    }
];

function getTasks() {
    return tasks;
}

function setTasks(updatedTasks) {
    tasks = updatedTasks;
}

function getUsers() {
    return users;
}

module.exports = {
    getTasks,
    setTasks,
    getUsers
};
