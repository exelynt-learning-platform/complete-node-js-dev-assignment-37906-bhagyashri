const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const tasksRouter = require("./routes/tasks");

// Parse JSON for normal JSON requests.
app.use(express.json());

// Serve frontend files.
app.use(express.static(path.join(__dirname, "public")));

// Serve uploaded files.
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// Mount task router.
app.use("/tasks", tasksRouter);

// Keep your other routes and 404/error handlers here.

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});