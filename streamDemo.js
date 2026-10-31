
/*
 * Node.js Streams Demonstration
 * Reading data from input.txt and writing it to output.txt.
 */

// Import the built-in File System module
const fs = require('fs');

console.log("===== Node.js Stream Demo Started =====");

// Create a readable stream for input.txt
const readableStream = fs.createReadStream('input.txt', {
    encoding: 'utf8'
});

// Create a writable stream for output.txt
const writableStream = fs.createWriteStream('output.txt');

// ------------------------------------
// 1. Handle data event
// ------------------------------------

// This event executes whenever a data chunk is received.
readableStream.on('data', (chunk) => {
    console.log("Data chunk received:");
    console.log(chunk);
});

// ------------------------------------
// 2. Handle end event
// ------------------------------------

// This event executes when all input data has been read.
readableStream.on('end', () => {
    console.log("Reading completed successfully.");
});

// ------------------------------------
// 3. Handle error events
// ------------------------------------

// Handle errors while reading the input file.
readableStream.on('error', (err) => {
    console.error("Readable Stream Error:", err.message);
});

// Handle errors while writing the output file.
writableStream.on('error', (err) => {
    console.error("Writable Stream Error:", err.message);
});

// ------------------------------------
// 4. Handle finish event
// ------------------------------------

// This event executes when all data has been written.
writableStream.on('finish', () => {
    console.log("Writing completed successfully.");
    console.log("Data copied from input.txt to output.txt.");
    console.log("===== Stream Demo Completed =====");
});

// ------------------------------------
// 5. Pipe method
// ------------------------------------

// pipe() transfers data from the readable stream
// to the writable stream.
readableStream.pipe(writableStream);
