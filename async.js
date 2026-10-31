
/*
 * Asynchronous Execution Demonstration
 * Using setTimeout() and Callback Functions
 */

// Synchronous execution
console.log("Program Started");

// Asynchronous execution using setTimeout()
setTimeout(() => {
    console.log("This message executes after 2 seconds");
}, 2000);

// Callback function example
function greetUser(name, callback) {
    console.log("Hello, " + name);

    // Execute callback function
    callback();
}

// Calling function with callback
greetUser("Node.js Student", function () {
    console.log("Callback executed successfully");
});

console.log("Program Finished");
