
const os = require("os");

console.log("========== SYSTEM INFORMATION ==========");

console.log("OS Type:", os.type());
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Count:", os.cpus().length);

// Convert memory from bytes to megabytes.
const freeMemory = (os.freemem() / (1024 * 1024)).toFixed(2);
const totalMemory = (os.totalmem() / (1024 * 1024)).toFixed(2);

console.log("Free Memory:", freeMemory, "MB");
console.log("Total Memory:", totalMemory, "MB");

console.log("========================================");
