
const express = require("express");

// Create an Express application.
const app = express();

// Define the server port.
const PORT = 3000;

// Serve static files from the public folder.
app.use(express.static("public"));

// Start the server.
app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});
