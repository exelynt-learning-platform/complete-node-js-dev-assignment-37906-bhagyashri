
const fs = require("fs").promises;
const path = require("path");

// This function reads a file asynchronously and processes its content.
async function processFile(filename) {
    const filePath = path.join(__dirname, filename);

    // await waits for the file-reading Promise to complete.
    // It does not block the Node.js event loop.
    const content = await fs.readFile(filePath, "utf8");

    // Split the content into lines.
    // An empty file will have zero lines.
    const lines = content.trim() === ""
        ? []
        : content.trim().split(/\r?\n/);

    // Count words by splitting the content using whitespace.
    const words = content.trim() === ""
        ? []
        : content.trim().split(/\s+/);

    // Return the filename and its calculated results.
    return {
        filename,
        lineCount: lines.length,
        wordCount: words.length
    };
}

// This async function processes all three files sequentially.
async function readMultipleFiles() {
    try {
        console.log("Starting asynchronous file reading...\n");

        const files = ["file1.txt", "file2.txt", "file3.txt"];

        // Process each file in order using await.
        for (const filename of files) {
            const result = await processFile(filename);

            console.log("--------------------------------");
            console.log("File Name:", result.filename);
            console.log("Total Lines:", result.lineCount);
            console.log("Total Words:", result.wordCount);
            console.log("--------------------------------\n");
        }

        console.log("All files processed successfully.");

    } catch (error) {
        // Handles errors such as missing files or permission problems.
        console.error("Error processing files:", error.message);
    }
}

// Start the asynchronous operation.
readMultipleFiles();
