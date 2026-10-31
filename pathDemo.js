
/*
 * Node.js Path Module Demonstration
 * Using join(), resolve(), basename(), and normalize()
 */

// Import the built-in path module
const path = require('path');

console.log("===== Node.js Path Module Demo =====");

// ------------------------------------
// 1. path.join()
// ------------------------------------

// Combines multiple folder names into a single path
const joinedPath = path.join('users', 'admin', 'documents', 'project');

console.log("\n1. Using path.join():");
console.log("Generated Path:", joinedPath);

// ------------------------------------
// 2. path.resolve()
// ------------------------------------

// Converts a relative path into an absolute path
const absolutePath = path.resolve('documents', 'project', 'index.js');

console.log("\n2. Using path.resolve():");
console.log("Absolute Path:", absolutePath);

// ------------------------------------
// 3. path.basename()
// ------------------------------------

// Extracts the file name from a full path
const fullPath = '/users/admin/documents/project/index.js';

const fileName = path.basename(fullPath);

console.log("\n3. Using path.basename():");
console.log("File Name:", fileName);

// ------------------------------------
// 4. path.normalize()
// ------------------------------------

// Corrects unnecessary separators and dot segments
const incorrectPath = '/users//admin/documents/../project/./index.js';

const normalizedPath = path.normalize(incorrectPath);

console.log("\n4. Using path.normalize():");
console.log("Original Path:", incorrectPath);
console.log("Normalized Path:", normalizedPath);

console.log("\n===== Path Module Demo Completed =====");
