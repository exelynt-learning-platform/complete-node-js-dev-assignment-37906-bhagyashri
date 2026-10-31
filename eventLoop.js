
const fs = require("fs");

console.log("1. Synchronous code started");

// Schedule a nextTick callback.
process.nextTick(() => {
    console.log("3. process.nextTick executed");
});

// Schedule a zero-delay timer.
setTimeout(() => {
    console.log("4. setTimeout executed");
}, 0);

// Schedule an immediate callback.
setImmediate(() => {
    console.log("5. setImmediate executed");
});

console.log("2. Synchronous code completed");

// Demonstrate execution inside an I/O callback.
fs.readFile(__filename, "utf8", (error) => {
    if (error) {
        console.error("I/O error:", error.message);
        return;
    }

    console.log("\nInside I/O callback");

    process.nextTick(() => {
        console.log("6. nextTick inside I/O callback");
    });

    setImmediate(() => {
        console.log("7. setImmediate inside I/O callback");
    });

    setTimeout(() => {
        console.log("8. setTimeout inside I/O callback");
        console.log("\nEvent Loop demonstration completed.");
    }, 0);
});
