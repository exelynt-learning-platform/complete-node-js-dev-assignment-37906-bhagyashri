
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const { pipeline } = require("stream/promises");

const dataDir = path.join(__dirname, "data");
const inputPath = path.join(__dirname, "data", "largeInput.txt");
const outputPath = path.join(__dirname, "data", "largeOutput.txt");

async function copyLargeFile() {
    try {
        // Create data directory.
        await fsp.mkdir(dataDir, { recursive: true });

        // Generate a large text file with 10,000 lines.
        const line = "Node.js streams make large file handling efficient.\n";

        await fsp.writeFile(
            inputPath,
            line.repeat(10000),
            "utf8"
        );

        console.log("Large input file created successfully.");

        // Create readable and writable streams.
        const readableStream = fs.createReadStream(inputPath);
        const writableStream = fs.createWriteStream(outputPath);

        // pipeline() pipes data and handles stream errors.
        // It resolves only after the destination stream finishes.
        await pipeline(readableStream, writableStream);

        console.log("File copied successfully using streams.");

        // Verify both files are identical byte-for-byte.
        const sourceData = await fsp.readFile(inputPath);
        const destinationData = await fsp.readFile(outputPath);

        if (sourceData.equals(destinationData)) {
            console.log("Verification successful: Both files are identical.");
            console.log("Total bytes copied:", destinationData.length);
        } else {
            throw new Error("Source and destination files do not match.");
        }

    } catch (error) {
        console.error("Stream copying error:", error.message);
        process.exitCode = 1;
    }
}

copyLargeFile();
