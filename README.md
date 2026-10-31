# Node.js Core Modules – Weekly Assignment

## Project Overview

This project demonstrates the use of Node.js core modules through practical examples.

The modules covered are:
- fs – File system operations
- path – File path management
- os – Operating system information
- events – Event handling
- stream – Reading and writing large files
- buffer – Binary data handling
- timers – Asynchronous timer functions

No external npm packages are required.

## Project Structure

```text
node-core-modules-demo/
├── fs.js
├── os.js
├── events.js
├── stream.js
├── buffer.js
├── timers.js
├── README.md
└── data/
    ├── application.log
    ├── records.json
    ├── largeInput.txt
    └── largeOutput.txt
```

## 1. Filesystem and Path Modules

**File:** `fs.js`

Features:
- Creates a data directory.
- Writes, reads, and appends a log file.
- Writes, reads, and appends JSON records.
- Uses path.join(__dirname, ...) to create file paths.
- Includes error handling.

### Sample Output

```text
Log file created successfully.
Log content: Application started successfully.
Log file appended successfully.
Updated log:
Application started successfully.
New activity recorded.
JSON file created successfully.
JSON content: [{"id":1,"name":"John","email":"john@example.com"}]
New JSON record appended successfully.
Updated JSON: [{"id":1,"name":"John","email":"john@example.com"},{"id":2,"name":"Priya","email":"priya@example.com"}]
```

## 2. OS Module

**File:** `os.js`

Features:
- Displays operating system type.
- Displays platform and architecture.
- Displays CPU count.
- Displays free and total memory in MB.

### Sample Output

```text
========== SYSTEM REPORT ==========
Operating System: Darwin
Platform: darwin
Architecture: arm64
CPU Count: 8
Free Memory: 4096.00 MB
Total Memory: 16384.00 MB
===================================
```

Note: Actual system information and memory values depend on the computer.

## 3. Events Module

**File:** `events.js`

Features:
- Creates an EventEmitter.
- Registers two listeners for the fileSaved event.
- Emits the custom event.
- Both listeners respond to the event.

### Console Output

```text
Saving file...
Listener 1: File saved successfully: application.log
Listener 2: Notification sent for: application.log
Event processing completed.
```

## 4. Stream Module

**File:** `stream.js`

Features:
- Creates a large text file containing 10,000 lines.
- Uses a readable stream to read the file.
- Uses a writable stream to copy the file.
- Uses pipeline() for reliable stream handling.
- Verifies that the source and destination files are identical.

### Console Output

```text
Large input file created successfully.
File copied successfully using streams.
Verification successful: Both files are identical.
Total bytes copied: 520000
```

## 5. Buffer Module

**File:** `buffer.js`

Features:
- Creates a Buffer using Buffer.from().
- Converts Buffer data into a string using toString().
- Displays Buffer length.
- Extracts part of the Buffer using subarray().
- Demonstrates shared memory by modifying the subarray.

### Console Output

```text
========== BUFFER DEMO ==========
Original Buffer: <Buffer 48 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73>
Buffer as String: Hello Node.js
Buffer Length: 13
Subarray Buffer: <Buffer 48 65 6c 6c 6f>
Subarray as String: Hello
Modified Original Buffer: Yello Node.js
=================================
```

## 6. Timer Functions

**File:** `timers.js`

Features:
- setTimeout() executes a callback once after a delay.
- setInterval() executes a callback repeatedly.
- clearInterval() stops the interval after three executions.
- setImmediate() schedules a callback in the check phase.
- fs.readFile() demonstrates asynchronous I/O.

### Sample Console Output

```text
1. Script started
5. Synchronous execution completed
2. File reading callback executed
3. setImmediate callback executed
4. setTimeout with 0ms executed
Interval execution: 1
Interval execution: 2
Timeout: Executed after approximately 2 seconds
Interval execution: 3
Interval stopped after 3 executions.
```

Note: Timer messages may appear in a slightly different order depending on system scheduling.

## Asynchronous Execution Explanation

1. Synchronous statements execute first in their written order.
2. Node.js uses the Event Loop to manage asynchronous operations.
3. File operations execute asynchronously without blocking the main thread.
4. setTimeout() schedules a callback after a specified delay.
5. setImmediate() executes in the check phase and runs before the zero-delay timeout in this I/O callback example.
6. setInterval() repeats until clearInterval() stops it after three executions.

## How to Run the Project

Run each JavaScript file separately using the following commands:

```bash
node fs.js
node os.js
node events.js
node stream.js
node buffer.js
node timers.js
```

## Conclusion

This assignment demonstrates the practical use of Node.js core modules for file handling, system information, event management, streams, buffers, and asynchronous execution.

All examples use built-in Node.js modules without requiring additional npm packages.