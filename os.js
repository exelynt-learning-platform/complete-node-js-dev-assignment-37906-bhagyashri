
const os = require("os");

// Convert bytes into megabytes.
function convertToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
}

console.log("========== SYSTEM REPORT ==========");

console.log("Operating System:", os.type());
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Count:", os.cpus().length);

console.log("Free Memory:", convertToMB(os.freemem()), "MB");
console.log("Total Memory:", convertToMB(os.totalmem()), "MB");

console.log("===================================");
