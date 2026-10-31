
console.log("Starting asynchronous error handling demo...\n");

// ------------------------------------------
// 1. Promise error handling using .catch()
// ------------------------------------------

// This Promise intentionally rejects with an error.
const promiseTask = new Promise((resolve, reject) => {
    console.log("Executing Promise operation...");

    // Intentionally trigger an error.
    reject(new Error("Something went wrong in the Promise operation."));
});

// The .catch() method handles the rejected Promise.
// The error is handled, so it does not become an unhandled rejection.
promiseTask
    .then((result) => {
        console.log("Promise result:", result);
    })
    .catch((error) => {
        console.error("Promise Error Handled:", error.message);
    })
    .finally(() => {
        console.log("Promise operation completed.\n");
    });

// ------------------------------------------
// 2. Async/await error handling using try/catch
// ------------------------------------------

async function asyncTask() {
    try {
        console.log("Executing async/await operation...");

        // Intentionally throw an error inside the async function.
        throw new Error("Something went wrong in the async operation.");

    } catch (error) {
        // The catch block handles the intentionally thrown error.
        console.error("Async/Await Error Handled:", error.message);
    }

    // This statement executes because the error was handled.
    console.log("Async/await operation completed.\n");
}

// ------------------------------------------
// 3. Continue program execution
// ------------------------------------------

asyncTask().then(() => {
    console.log("Program continues after handling both errors.");
    console.log("Demo completed successfully without crashing.");
});
