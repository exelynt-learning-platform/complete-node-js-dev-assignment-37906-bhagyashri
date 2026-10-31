
const fs = require("fs");

console.log("1. Script started");

// setTimeout() executes a callback once after the specified delay.
setTimeout(() => {
    console.log("4. setTimeout: Executed after 2 seconds");
}, 2000);

// setInterval() repeatedly executes a callback after the specified interval.
let count = 0;

const intervalId = setInterval(() => {
    count++;
    console.log(`Interval message: ${count}`);

    // Stop the interval after 3 executions.
    if (count === 3) {
        clearInterval(intervalId);
        console.log("Interval stopped after 3 executions");
    }
}, 1000);

// fs.readFile() performs an asynchronous file operation.
// Its callback runs when the I/O operation completes.
fs.readFile(__filename, "utf8", (error, data) => {
    if (error) {
        console.error("File reading error:", error);
        return;
    }

    console.log("2. fs.readFile callback executed");

    // setImmediate() schedules execution in the check phase.
    setImmediate(() => {
        console.log("3. setImmediate: Executed after I/O callback");
    });

    // setTimeout(..., 0) schedules execution in the timers phase.
    setTimeout(() => {
        console.log("5. setTimeout with 0ms: Executed after I/O callback");
    }, 0);
});

console.log("6. Script execution completed");
