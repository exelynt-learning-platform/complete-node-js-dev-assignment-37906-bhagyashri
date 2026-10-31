
const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "data", "largeInput.txt");
const outputFile = path.join(__dirname, "data", "largeOutput.txt");
const dataDirectory = path.join(__dirname, "data");

// Create the data directory if needed.
fs.mkdirSync(dataDirectory, { recursive: true });

// Generate sample large text content.
const largeText = "Node.js streams make file handling efficient.\n".repeat(10000);

// Create the input file.
fs.writeFileSync(inputFile, largeText);

console.log("Large input file created successfully.");

// Create readable and writable streams.
const readableStream = fs.createReadStream(inputFile);
const writableStream = fs.createWriteStream(outputFile);

// Copy data using pipe().
readableStream.pipe(writableStream);

writableStream.on("finish", () => {
    console.log("File copied successfully using streams.");
    console.log("Output file:", outputFile);
});

readableStream.on("error", (error) => {
    console.error("Reading stream error:", error.message);
});

writableStream.on("error", (error) => {
    console.error("Writing stream error:", error.message);
});

// Buffer demonstration.
const myBuffer = Buffer.from("Hello Node.js");

console.log("\n========== BUFFER DEMO ==========");
console.log("Original Buffer:", myBuffer);
console.log("Buffer as String:", myBuffer.toString());
console.log("Buffer Length:", myBuffer.length);

// Extract a portion of the buffer.
const subBuffer = myBuffer.subarray(0, 5);

console.log("Subarray Buffer:", subBuffer);
console.log("Subarray as String:", subBuffer.toString());
console.log("=================================");
