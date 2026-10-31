const express = require("express");
const app = express();
const PORT = 3000;

const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");

// Parse JSON request bodies before the routers.
app.use(express.json());

// Mount the task and user routers.
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});