const express = require("express");

// Create an Express application.
const app = express();

// Define the server port.
const PORT = 3000;

// Middleware to parse incoming JSON and form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route: Home
app.get("/home", (req, res) => {
    res.send("Welcome to the Home Page!");
});

// GET route: About
app.get("/about", (req, res) => {
    res.send("This is the About Page.");
});

// GET route: Contact
app.get("/contact", (req, res) => {
    res.send("This is the Contact Page.");
});

// POST route: Submit
app.post("/submit", (req, res) => {
    const receivedData = req.body;

    res.json({
        message: "Data received successfully!",
        receivedData: receivedData
    });
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});