
const fs = require("fs");

console.log("1. Synchronous: Program started");

// ------------------------------------------
// CASE 1: Event Loop from the main module
// ------------------------------------------

console.log("\n--- Main Module Execution ---");

process.nextTick(() => {
    console.log("3. process.nextTick(): Executes before timer and immediate callbacks");
});

setTimeout(() => {
    console.log("4. setTimeout(): Timer callback executed");
}, 0);

setImmediate(() => {
    console.log("5. setImmediate(): Immediate callback executed");
});

console.log("2. Synchronous: Main module code continues");

// ------------------------------------------
// CASE 2: Event Loop inside an I/O callback
// ------------------------------------------

fs.readFile(__filename, "utf8", (error, data) => {
    if (error) {
        console.error("File reading error:", error.message);
        return;
    }

    console.log("\n--- Inside I/O Callback ---");
    console.log("6. I/O callback: File reading completed");

    // process.nextTick() runs before the next event-loop phase.
    process.nextTick(() => {
        console.log("7. process.nextTick(): Inside I/O callback");
    });

    // setImmediate() runs in the check phase.
    setImmediate(() => {
        console.log("8. setImmediate(): Inside I/O callback");
    });

    // setTimeout() runs in the timer phase.
    setTimeout(() => {
        console.log("9. setTimeout(): Inside I/O callback");
        console.log("\nEvent Loop demonstration completed.");
    }, 0);
});
