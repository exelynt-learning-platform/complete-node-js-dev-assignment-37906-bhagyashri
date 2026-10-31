
// First message
console.log("1. Program started");

// setTimeout() executes its callback after the specified delay.
// It does not block the execution of the remaining code.
setTimeout(function () {
    console.log("4. First timeout completed (2 seconds)");
}, 2000);

// Another setTimeout with a different delay
setTimeout(function () {
    console.log("3. Second timeout completed (1 second)");
}, 1000);

// Callback function
function greetUser(callback) {
    console.log("2. Greeting user...");
    callback();
}

// Passing a function as a callback
greetUser(function () {
    console.log("Callback executed successfully!");
});

// This message executes without waiting for the timers.
console.log("5. Program continues without waiting");

// Another timer with a 3-second delay
setTimeout(function () {
    console.log("6. Third timeout completed (3 seconds)");
}, 3000);

// Program completion message
console.log("7. Synchronous code completed");

/*
Explanation:
1. Synchronous console.log() statements execute immediately, in order.
2. setTimeout() schedules callback functions to run after their delays.
3. JavaScript does not wait for a timer to finish before executing
   the next synchronous statement.
4. When a timer becomes ready, its callback is queued for execution.
5. The Event Loop checks whether the call stack is empty and then
   allows queued callbacks to execute.
6. Therefore, the 1-second timer runs before the 2-second timer,
   followed by the 3-second timer.
*/
