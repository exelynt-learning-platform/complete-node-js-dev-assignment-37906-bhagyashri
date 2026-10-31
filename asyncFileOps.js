
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(__dirname, "inputs");
const outputPath = path.join(__dirname, "output.txt");

const inputFiles = ["file1.txt", "file2.txt", "file3.txt"];

console.log("Starting asynchronous file operations...\n");

let allContent = [];
let currentIndex = 0;

// Read each file asynchronously using callbacks.
function readNextFile() {
    if (currentIndex >= inputFiles.length) {
        writeOutput();
        return;
    }

    const filename = inputFiles[currentIndex];
    const filePath = path.join(inputFolder, filename);

    fs.readFile(filePath, "utf8", (error, data) => {
        if (error) {
            console.error(`Error reading ${filename}:`, error.message);
            return;
        }

        // Process the content by converting it to uppercase.
        allContent.push(data.toUpperCase());

        console.log(`${filename} read and processed successfully.`);

        currentIndex++;

        // Start the next read only after the current one completes.
        readNextFile();
    });
}

// Write the combined content asynchronously.
function writeOutput() {
    const combinedContent = allContent.join("\n\n");

    fs.writeFile(outputPath, combinedContent, "utf8", (error) => {
        if (error) {
            console.error("Error writing output.txt:", error.message);
            return;
        }

        console.log("\nAll file contents combined successfully.");
        console.log("Processed content saved in output.txt.");
    });
}

readNextFile();

console.log("Main program continues without blocking.");
