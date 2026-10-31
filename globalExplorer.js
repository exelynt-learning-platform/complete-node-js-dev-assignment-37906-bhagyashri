
// 1. Display the current directory
console.log("Current Directory:", __dirname);

// 2. Display the current file name
console.log("Current File Name:", __filename);

// 3. Display Node.js version
console.log("Node.js Version:", process.version);

// 4. Display operating system platform
console.log("Operating System Platform:", process.platform);

// 5. Display current process ID
console.log("Process ID:", process.pid);

// 6. Access and display an environment variable
// Using USERNAME on Windows and USER on macOS/Linux
const username = process.env.USERNAME || process.env.USER || "Not Available";
console.log("Username:", username);

// 7. Declare a variable using the global object
global.myMessage = "Welcome to Node.js Global Objects!";

// Access and display the global variable
console.log("Global Variable:", myMessage);
