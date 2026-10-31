
const express = require("express");

// Create an Express application.
const app = express();

// Define the server port.
const PORT = 3000;

// Start the server and listen on port 3000.
app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});
