
const welcomeButton = document.getElementById("welcomeButton");
const tasksButton = document.getElementById("tasksButton");
const usersButton = document.getElementById("usersButton");

const message = document.getElementById("message");
const tasksResult = document.getElementById("tasksResult");
const usersResult = document.getElementById("usersResult");

// Display a welcome message.
welcomeButton.addEventListener("click", () => {
    message.textContent = "Welcome! Your Express application is working.";
});

// Fetch all tasks from the Express Router.
tasksButton.addEventListener("click", async () => {
    try {
        const response = await fetch("/tasks");
        const data = await response.json();

        tasksResult.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        tasksResult.textContent = "Unable to fetch tasks.";
        console.error(error);
    }
});

// Fetch all users from the Express Router.
usersButton.addEventListener("click", async () => {
    try {
        const response = await fetch("/users");
        const data = await response.json();

        usersResult.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        usersResult.textContent = "Unable to fetch users.";
        console.error(error);
    }
});
