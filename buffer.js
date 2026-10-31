
console.log("========== BUFFER DEMO ==========");

// Create a Buffer from a string.
const myBuffer = Buffer.from("Hello Node.js");

console.log("Original Buffer:", myBuffer);

// Convert Buffer into a string.
console.log("Buffer as String:", myBuffer.toString());

// Display Buffer length.
console.log("Buffer Length:", myBuffer.length);

// Extract the first five bytes using subarray().
const subBuffer = myBuffer.subarray(0, 5);

console.log("Subarray Buffer:", subBuffer);
console.log("Subarray as String:", subBuffer.toString());

// Demonstrate that subarray shares memory with the original Buffer.
subBuffer[0] = 89; // ASCII 89 represents Y.

console.log("Modified Original Buffer:", myBuffer.toString());

console.log("=================================");
