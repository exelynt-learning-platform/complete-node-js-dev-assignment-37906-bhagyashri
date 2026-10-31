
const fs = require("fs");
const path = require("path");

// Get the paths of the input and output files.
const input1Path = path.join(__dirname, "input1.txt");
const input2Path = path.join(__dirname, "input2.txt");
const outputPath = path.join(__dirname, "output.txt");

console.log("Starting asynchronous file operations...\n");

// --------------------------------------------------
// 1. Callback-based API: Read input1.txt and write
//    processed content to output.txt.
// --------------------------------------------------

fs.readFile(input1Path, "utf8", (readError, data1) => {
    if (readError) {
        console.error("Error reading input1.txt:", readError.message);
        return;
    }

    // Process the first file by converting its content to uppercase.
    const processedData1 = data1.toUpperCase();

    console.log("Successfully read and processed input1.txt.");

    // Write the processed content to output.txt.
    fs.writeFile(outputPath, processedData1, "utf8", async (writeError) => {
        if (writeError) {
            console.error("Error writing output.txt:", writeError.message);
            return;
        }

        console.log("Successfully wrote input1.txt content to output.txt.");

        // --------------------------------------------------
        // 2. Promise-based API: Start only after writeFile
        //    has completed successfully.
        // --------------------------------------------------

        try {
            // Read input2.txt using the Promise API.
            const data2 = await fs.promises.readFile(input2Path, "utf8");

            // Convert the second file's content to uppercase.
            const processedData2 = data2.toUpperCase();

            console.log("Successfully read and processed input2.txt.");

            // Append the second file's content.
            // appendFile adds content without overwriting the first file.
            await fs.promises.appendFile(
                outputPath,
                "\n\n" + processedData2,
                "utf8"
            );

            console.log("Successfully appended input2.txt content.");

            // --------------------------------------------------
            // 3. Append a final summary using fs.appendFile.
            // --------------------------------------------------

            const finalContent = await fs.promises.readFile(
                outputPath,
                "utf8"
            );

            const totalLines = finalContent
                .split(/\r?\n/)
                .filter((line) => line.trim() !== "").length;

            const summary =
                "\n\nSummary:\n" +
                "Total non-empty lines: " + totalLines + "\n" +
                "Completed at: " + new Date().toLocaleString() + "\n";

            // Callback-based fs.appendFile is also asynchronous.
            fs.appendFile(outputPath, summary, "utf8", (appendError) => {
                if (appendError) {
                    console.error(
                        "Error appending final summary:",
                        appendError.message
                    );
                    return;
                }

                console.log("Successfully appended the final summary.");
                console.log("\nAll asynchronous file operations completed.");
                console.log("Check output.txt for the final result.");
            });

        } catch (error) {
            // Handles errors from Promise-based read and append operations.
            console.error(
                "Error during Promise-based file operations:",
                error.message
            );
        }
    });
});
