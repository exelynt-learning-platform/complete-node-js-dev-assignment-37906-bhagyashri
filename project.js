
const fs = require("fs").promises;
const path = require("path");

const inputFolder = path.join(__dirname, "inputs");
const outputPath = path.join(__dirname, "output.txt");

async function processFiles() {
    try {
        console.log("Starting practical file processing...\n");

        const filenames = ["file1.txt", "file2.txt", "file3.txt"];
        const combinedContent = [];

        // Process each file sequentially.
        for (const filename of filenames) {
            const filePath = path.join(inputFolder, filename);

            // Read file asynchronously.
            const content = await fs.readFile(filePath, "utf8");

            // Calculate line and word counts.
            const lines = content.trim() === ""
                ? []
                : content.trim().split(/\r?\n/);

            const words = content.trim() === ""
                ? []
                : content.trim().split(/\s+/);

            console.log("--------------------------------");
            console.log("File:", filename);
            console.log("Total Lines:", lines.length);
            console.log("Total Words:", words.length);
            console.log("--------------------------------\n");

            combinedContent.push(
                `File: ${filename}\n${content}`
            );
        }

        // Combine all file contents.
        const finalContent = combinedContent.join("\n\n");

        // Write the combined result asynchronously.
        await fs.writeFile(outputPath, finalContent, "utf8");

        console.log("All files processed successfully.");
        console.log("Combined content saved in output.txt.");

    } catch (error) {
        // Handles file reading and writing errors.
        console.error("Project error:", error.message);
    }
}

processFiles();
