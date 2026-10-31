
const fs = require("fs").promises;
const path = require("path");

const inputFolder = path.join(__dirname, "inputs");

// This function returns a Promise for reading a file.
function readFilePromise(filename) {
    const filePath = path.join(inputFolder, filename);

    return fs.readFile(filePath, "utf8");
}

console.log("Starting Promise-based operations...\n");

// Sequential Promise chaining.
readFilePromise("file1.txt")
    .then((data1) => {
        console.log("File 1 read successfully.");
        console.log(data1);

        // Return the next Promise to continue the chain.
        return readFilePromise("file2.txt");
    })
    .then((data2) => {
        console.log("\nFile 2 read successfully.");
        console.log(data2);

        return readFilePromise("file3.txt");
    })
    .then((data3) => {
        console.log("\nFile 3 read successfully.");
        console.log(data3);

        console.log("\nSequential Promise reading completed.");
    })
    .catch((error) => {
        // Handles errors from any Promise in this chain.
        console.error("Sequential Promise error:", error.message);
    });

// Parallel Promise execution using Promise.all().
Promise.all([
    readFilePromise("file1.txt"),
    readFilePromise("file2.txt"),
    readFilePromise("file3.txt")
])
    .then((results) => {
        console.log("\nParallel reading completed.");

        results.forEach((content, index) => {
            console.log(`File ${index + 1} word count:`,
                content.trim().split(/\s+/).length);
        });
    })
    .catch((error) => {
        console.error("Parallel Promise error:", error.message);
    });
