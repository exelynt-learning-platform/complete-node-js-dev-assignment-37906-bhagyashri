
/*
 * Node.js OS Module Demonstration
 * Retrieve system information using the built-in os module.
 */

// Import the built-in OS module
const os = require('os');

console.log("======================================");
console.log("       NODE.JS SYSTEM INFORMATION     ");
console.log("======================================");

// 1. Display OS Type
// os.type() returns the operating system name.
console.log("\n1. Operating System Type:");
console.log(os.type());

// 2. Display Platform
// os.platform() returns the operating system platform.
console.log("\n2. System Platform:");
console.log(os.platform());

// 3. Display System Architecture
// os.arch() returns the CPU architecture.
console.log("\n3. System Architecture:");
console.log(os.arch());

// 4. Display Free Memory
// os.freemem() returns available system memory in bytes.
const freeMemory = os.freemem();

console.log("\n4. Free Memory:");
console.log((freeMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB");

// 5. Display Total Memory
// os.totalmem() returns total system memory in bytes.
const totalMemory = os.totalmem();

console.log("\n5. Total Memory:");
console.log((totalMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB");

// 6. Display CPU Information
// os.cpus() returns an array containing CPU core information.
const cpuInfo = os.cpus();

console.log("\n6. CPU Information:");
console.log("CPU Model:", cpuInfo[0].model);
console.log("Number of CPU Cores:", cpuInfo.length);

console.log("\nComplete CPU Details:");

cpuInfo.forEach((cpu, index) => {
    console.log(`CPU Core ${index + 1}:`);
    console.log("Model:", cpu.model);
    console.log("Speed:", cpu.speed + " MHz");
});

console.log("\n======================================");
console.log("    SYSTEM INFORMATION COMPLETED     ");
console.log("======================================");
