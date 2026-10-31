
/*
 * Node.js Buffer Demonstration
 * Creating, manipulating and converting buffers.
 */

// ------------------------------------
// 1. Create a Buffer from a String
// ------------------------------------

// Buffer.from() converts a string into a buffer.
const stringBuffer = Buffer.from("Hello Node.js Buffers");

console.log("===== Node.js Buffer Demo Started =====");

console.log("\n1. Buffer Created from String:");
console.log(stringBuffer);

// ------------------------------------
// 2. Create a Buffer from an Array
// ------------------------------------

// Buffer.from() creates a buffer from an array of numbers.
const arrayBuffer = Buffer.from([65, 66, 67, 68, 69]);

console.log("\n2. Buffer Created from Array:");
console.log(arrayBuffer);

// ------------------------------------
// 3. Convert Buffer into String
// ------------------------------------

// toString() converts buffer data back into readable text.
const convertedString = stringBuffer.toString();

console.log("\n3. Buffer Converted into String:");
console.log(convertedString);

// Convert the array buffer into a string.
console.log("Array Buffer as String:", arrayBuffer.toString());

// ------------------------------------
// 4. Display Buffer Length
// ------------------------------------

// The length property returns the number of bytes in a buffer.
console.log("\n4. Buffer Length:");
console.log("String Buffer Length:", stringBuffer.length);
console.log("Array Buffer Length:", arrayBuffer.length);

// ------------------------------------
// 5. Demonstrate subarray()
// ------------------------------------

// subarray() extracts a portion of the original buffer.
// The returned sub-buffer shares memory with the original.
const originalBuffer = Buffer.from("HELLO");

console.log("\n5. Original Buffer:");
console.log(originalBuffer.toString());

// Extract a portion of the original buffer.
const subBuffer = originalBuffer.subarray(0, 2);

console.log("Subarray Buffer:");
console.log(subBuffer.toString());

// Modify the sub-buffer.
// This also changes the original buffer because memory is shared.
subBuffer[0] = 89; // ASCII value 89 represents Y

console.log("\n6. After Modifying Subarray:");

console.log("Modified Subarray:", subBuffer.toString());

console.log("Original Buffer After Modification:",
    originalBuffer.toString());

console.log("\n===== Buffer Demo Completed =====");
