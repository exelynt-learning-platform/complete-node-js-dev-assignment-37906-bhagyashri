
/*
 * Node.js Events Module Demonstration
 * Using EventEmitter to create and manage custom events.
 */

// Import the built-in events module
const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

console.log("===== Node.js EventEmitter Demo Started =====");

// ------------------------------------------
// 1. Custom Event with a Single Listener
// ------------------------------------------

// Register a listener for the "greet" event.
// This listener executes when the greet event is emitted.
eventEmitter.on('greet', () => {
    console.log("Hello! Welcome to Node.js EventEmitter.");
});

// ------------------------------------------
// 2. Custom Event with Multiple Listeners
// ------------------------------------------

// Register the first listener for the "userLogin" event.
eventEmitter.on('userLogin', (username) => {
    console.log(`Listener 1: ${username} has logged in.`);
});

// Register the second listener for the same event.
eventEmitter.on('userLogin', (username) => {
    console.log(`Listener 2: Login notification sent to ${username}.`);
});

// Register the third listener for the same event.
eventEmitter.on('userLogin', (username) => {
    console.log(`Listener 3: Welcome ${username}!`);
});

// ------------------------------------------
// 3. Emit Custom Events
// ------------------------------------------

// Emit the greet event to execute its listener.
console.log("\nEmitting greet event:");
eventEmitter.emit('greet');

// Emit the userLogin event with a username.
// All three registered listeners will execute.
console.log("\nEmitting userLogin event:");
eventEmitter.emit('userLogin', 'Bhagyashri');

console.log("\n===== EventEmitter Demo Completed =====");
