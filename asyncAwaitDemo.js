
const fs = require("fs").promises;
const path = require("path");

// This async function reads files one by one.
async function readFiles() {
    try {
        console.log("Starting async/await file reading...\n");

        // await pauses this function until file1.txt is read.
        // It does not block Node.js from handling other operations.
        const file1Path = path.join(__dirname, "file1.txt");
        const data1 = await fs.readFile(file1Path, "utf8");

        console.log("Content of File 1:");
        console.log(data1);

        // The next file is read after the first read completes.
        const file2Path = path.join(__dirname, "file2.txt");
        const data2 = await fs.readFile(file2Path, "utf8");

        console.log("Content of File 2:");
        console.log(data2);

        // The third file is read after the second read completes.
        const file3Path = path.join(__dirname, "file3.txt");
        const data3 = await fs.readFile(file3Path, "utf8");

        console.log("Content of File 3:");
        console.log(data3);

        console.log("All files read successfully in sequence.");

    } catch (error) {
        // If any read fails, execution moves directly to this catch block.
        console.error("Error reading files:", error.message);
    }
}

// Calling the async function starts the file reading process.
readFiles();
