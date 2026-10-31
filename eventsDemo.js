
const EventEmitter = require("events");

const fileEvents = new EventEmitter();

// First listener.
fileEvents.on("fileSaved", (fileName) => {
    console.log("Listener 1: File saved successfully:", fileName);
});

// Second listener.
fileEvents.on("fileSaved", (fileName) => {
    console.log("Listener 2: Notification sent for:", fileName);
});

console.log("Saving file...");

// Emit the custom event.
fileEvents.emit("fileSaved", "application.log");

console.log("Event processing completed.");
