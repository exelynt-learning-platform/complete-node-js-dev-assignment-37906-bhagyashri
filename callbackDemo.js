
const fs = require("fs");
const path = require("path");

// Function to read a file asynchronously.
// filename: Name of the file to read.
// callback: Function that executes after the file-reading operation finishes.
function readFileAsync(filename, callback) {

    // Build the file path using path.join().
    const filePath = path.join(__dirname, filename);

    // fs.readFile() reads the file asynchronously.
    // It does not block the main thread while reading.
    fs.readFile(filePath, "utf8", (error, data) => {

        // Handle errors if the file cannot be read.
        if (error) {
            callback(error, null);
            return;
        }

        // Pass the file content to the callback function.
        callback(null, data);
    });
}

// Start reading the first file.
console.log("Starting asynchronous file reading...\n");

readFileAsync("file1.txt", (error, data1) => {

    if (error) {
        console.error("Error reading file1.txt:", error.message);
        return;
    }

    console.log("Content of File 1:");
    console.log(data1);

    // Read the second file only after the first file is read.
    readFileAsync("file2.txt", (error, data2) => {

        if (error) {
            console.error("Error reading file2.txt:", error.message);
            return;
        }

        console.log("Content of File 2:");
        console.log(data2);

        // Read the third file only after the second file is read.
        readFileAsync("file3.txt", (error, data3) => {

            if (error) {
                console.error("Error reading file3.txt:", error.message);
                return;
            }

            console.log("Content of File 3:");
            console.log(data3);

            console.log("All files read successfully in sequence.");
        });
    });
});

console.log("\nMain program continues without waiting for file reading.");
