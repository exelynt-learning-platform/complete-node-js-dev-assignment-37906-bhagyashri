
const fs = require("fs");
const path = require("path");

// This function returns a Promise to read the requested file.
function readFilePromise(filename) {
    // A Promise represents an operation that may complete in the future.
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, filename);

        fs.readFile(filePath, "utf8", (error, data) => {
            if (error) {
                // Reject the Promise if an error occurs.
                reject(error);
            } else {
                // Resolve the Promise with the file content.
                resolve(data);
            }
        });
    });
}

console.log("Starting Promise-based file reading...\n");

// Promise chaining: each .then() starts the next file read
// only after the previous file has been read successfully.

readFilePromise("file1.txt")
    .then((data1) => {
        console.log("Content of File 1:");
        console.log(data1);

        // Return the next Promise to continue the chain.
        return readFilePromise("file2.txt");
    })
    .then((data2) => {
        console.log("Content of File 2:");
        console.log(data2);

        // Return another Promise to read the third file.
        return readFilePromise("file3.txt");
    })
    .then((data3) => {
        console.log("Content of File 3:");
        console.log(data3);

        console.log("All files read successfully in sequence.");
    })
    .catch((error) => {
        // Catch handles errors from any Promise in the chain.
        console.error("Error reading file:", error.message);
    });
