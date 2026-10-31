
const fs = require("fs");

console.log("1. Script started");

// setTimeout() executes once after the specified delay.
setTimeout(() => {
    console.log("Timeout: Executed after 2 seconds");
}, 2000);

// setInterval() repeats the callback at the specified interval.
let count = 0;

const intervalId = setInterval(() => {
    count++;
    console.log("Interval execution:", count);

    // Stop the interval after 3 executions.
    if (count === 3) {
        clearInterval(intervalId);
        console.log("Interval stopped.");
    }
}, 1000);

// Read this script asynchronously to demonstrate I/O callback timing.
fs.readFile(__filename, "utf8", (error, data) => {
    if (error) {
        console.error("File reading error:", error.message);
        return;
    }

    console.log("2. File reading callback executed");

    // setImmediate() runs in the check phase after the I/O callback.
    setImmediate(() => {
        console.log("3. setImmediate callback executed");
    });

    // A zero-delay timeout is scheduled for the timers phase.
    // When both are scheduled inside this I/O callback,
    // setImmediate() runs before this setTimeout() in this example.
    setTimeout(() => {
        console.log("4. setTimeout with 0ms executed");
    }, 0);
});

console.log("5. Synchronous execution completed");
