
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(__dirname, "inputs");

// Callback-based function to read a file.
function readFileCallback(filename, callback) {
    const filePath = path.join(inputFolder, filename);

    fs.readFile(filePath, "utf8", (error, data) => {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, data);
    });
}

console.log("Starting callback-based file reading...\n");

// Read files one after another using nested callbacks.
readFileCallback("file1.txt", (error, data1) => {
    if (error) {
        console.error("Error reading file1:", error.message);
        return;
    }

    console.log("File 1 Content:");
    console.log(data1);

    readFileCallback("file2.txt", (error, data2) => {
        if (error) {
            console.error("Error reading file2:", error.message);
            return;
        }

        console.log("File 2 Content:");
        console.log(data2);

        readFileCallback("file3.txt", (error, data3) => {
            if (error) {
                console.error("Error reading file3:", error.message);
                return;
            }

            console.log("File 3 Content:");
            console.log(data3);

            console.log("All files read successfully using callbacks.");
        });
    });
});

console.log("Main program continues while files are being read.");
