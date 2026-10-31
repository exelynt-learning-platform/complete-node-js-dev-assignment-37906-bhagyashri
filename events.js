
const EventEmitter = require("events");

// Create EventEmitter object.
const fileEmitter = new EventEmitter();

// First listener.
fileEmitter.on("fileSaved", (fileName) => {
    console.log("Listener 1: File saved successfully:", fileName);
});

// Second listener.
fileEmitter.on("fileSaved", (fileName) => {
    console.log("Listener 2: Notification sent for:", fileName);
});

console.log("Saving file...");

// Emit the custom event.
fileEmitter.emit("fileSaved", "application.log");

console.log("Event processing completed.");
