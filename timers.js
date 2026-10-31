
const fs = require("fs");

console.log("1. Script started");

// setTimeout() executes a callback once after the specified delay.
setTimeout(() => {
    console.log("Timeout: Executed after approximately 2 seconds");
}, 2000);

// setInterval() executes repeatedly at the specified interval.
let count = 0;

const intervalId = setInterval(() => {
    count++;

    console.log("Interval execution:", count);

    // Stop the interval after exactly 3 executions.
    if (count === 3) {
        clearInterval(intervalId);
        console.log("Interval stopped after 3 executions.");
    }
}, 1000);

// Read the current file asynchronously.
fs.readFile(__filename, "utf8", (error) => {
    if (error) {
        console.error("File reading error:", error.message);
        return;
    }

    console.log("2. File reading callback executed");

    // setImmediate() schedules execution in the check phase.
    setImmediate(() => {
        console.log("3. setImmediate callback executed");
    });

    // setTimeout(..., 0) schedules a timer callback.
    // When both are scheduled inside this I/O callback,
    // setImmediate() runs before the zero-delay timeout in this example.
    setTimeout(() => {
        console.log("4. setTimeout with 0ms executed");
    }, 0);
});

console.log("5. Synchronous execution completed");
