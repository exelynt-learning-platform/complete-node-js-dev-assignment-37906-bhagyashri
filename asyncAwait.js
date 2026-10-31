
const fs = require("fs").promises;
const path = require("path");

const inputFolder = path.join(__dirname, "inputs");

// Async function that reads a file and returns its content.
async function readFileAsync(filename) {
    const filePath = path.join(inputFolder, filename);
    return await fs.readFile(filePath, "utf8");
}

async function readFiles() {
    try {
        console.log("Starting async/await operations...\n");

        // Sequential reading using await.
        const data1 = await readFileAsync("file1.txt");
        console.log("File 1 Content:");
        console.log(data1);

        const data2 = await readFileAsync("file2.txt");
        console.log("\nFile 2 Content:");
        console.log(data2);

        const data3 = await readFileAsync("file3.txt");
        console.log("\nFile 3 Content:");
        console.log(data3);

        // Parallel reading using Promise.all().
        const parallelResults = await Promise.all([
            readFileAsync("file1.txt"),
            readFileAsync("file2.txt"),
            readFileAsync("file3.txt")
        ]);

        console.log("\nParallel reading completed.");
        console.log("Number of files processed:", parallelResults.length);

        console.log("Async/await operations completed.");

    } catch (error) {
        // Handles errors from any awaited Promise.
        console.error("Async/await error:", error.message);
    }
}

readFiles();
