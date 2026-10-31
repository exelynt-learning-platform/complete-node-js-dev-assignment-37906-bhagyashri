const express = require("express");
const app = express();

const tasksRouter = require("./routes/tasks");

app.use(express.json());

app.use("/tasks", tasksRouter);

app.listen(3000, () => {
    console.log("Express server is running on port 3000");
});