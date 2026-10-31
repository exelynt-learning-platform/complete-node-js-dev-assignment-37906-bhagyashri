const express = require("express");
const app = express();

const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");

app.use(express.json());

// Serve uploaded files.
app.use("/uploads", express.static("uploads"));

// Serve frontend files if you are using the public folder.
app.use(express.static("public"));

// Mount routers.
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
    console.log("Express server is running on port 3000");
});