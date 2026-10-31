# Node.js Asynchronous Programming Project

## 1. Overview

This project demonstrates asynchronous programming concepts in Node.js using callbacks, Promises, async/await, asynchronous file operations, and the Event Loop.

The project also includes a practical application that reads multiple files, counts words and lines, combines their content, and writes the results into an output file.

## 2. Project Structure

```text
async-programming-project/
│
├── inputs/
│   ├── file1.txt
│   ├── file2.txt
│   └── file3.txt
│
├── callbacks.js
├── promises.js
├── asyncAwait.js
├── asyncFileOps.js
├── eventLoop.js
├── project.js
├── output.txt
└── README.md
```

## 3. Project Features

### Callbacks
- Uses fs.readFile().
- Reads three files sequentially.
- Handles errors using callback functions.
- Demonstrates nested callbacks.

### Promises
- Creates functions that return Promises.
- Uses .then() for Promise chaining.
- Uses Promise.all() for parallel file reading.
- Handles errors using .catch().

### Async/Await
- Uses async functions and await.
- Reads files sequentially.
- Demonstrates parallel reading using Promise.all().
- Handles errors using try/catch.

### Asynchronous File Operations
- Reads files using fs.readFile().
- Processes file content.
- Writes combined data using fs.writeFile().
- Avoids synchronous file operations.

### Event Loop
- Demonstrates process.nextTick().
- Demonstrates setTimeout().
- Demonstrates setImmediate().
- Shows execution inside an I/O callback.

### Practical Project
- Reads three input files.
- Counts lines and words.
- Combines file contents.
- Saves processed content in output.txt.

## 4. How to Run the Project

Make sure Node.js is installed.

Open the terminal in the project directory.

Run each script individually:

```bash
node callbacks.js
node promises.js
node asyncAwait.js
node asyncFileOps.js
node eventLoop.js
node project.js
```

## 5. Sample Console Outputs

### callbacks.js

```text
Starting callback-based file reading...

Main program continues while files are being read.
File 1 Content:
Node.js is a JavaScript runtime.
It is used for backend development.
We are learning asynchronous programming.

File 2 Content:
Promises help manage asynchronous operations.
Async and await make code easier to read.
Error handling is important in Node.js.

File 3 Content:
The Event Loop handles asynchronous tasks.
File operations can run without blocking.
Node.js supports multiple asynchronous APIs.

All files read successfully using callbacks.
```

### promises.js

```text
Starting Promise-based operations...

File 1 read successfully.
File 2 read successfully.
File 3 read successfully.

Sequential Promise reading completed.

Parallel reading completed.
File 1 word count: 16
File 2 word count: 19
File 3 word count: 17
```

Note: The parallel and sequential sections may appear in different positions because both operations run independently.

### asyncAwait.js

```text
Starting async/await operations...

File 1 Content:
[File 1 content]

File 2 Content:
[File 2 content]

File 3 Content:
[File 3 content]

Parallel reading completed.
Number of files processed: 3
Async/await operations completed.
```

### asyncFileOps.js

```text
Starting asynchronous file operations...

Main program continues without blocking.
file1.txt read and processed successfully.
file2.txt read and processed successfully.
file3.txt read and processed successfully.

All file contents combined successfully.
Processed content saved in output.txt.
```

### eventLoop.js

```text
1. Synchronous code started
2. Synchronous code completed
3. process.nextTick executed
4. setTimeout executed
5. setImmediate executed

Inside I/O callback
6. nextTick inside I/O callback
7. setImmediate inside I/O callback
8. setTimeout inside I/O callback

Event Loop demonstration completed.
```

Note: The order of setTimeout() and setImmediate() in the main module is not guaranteed.

### project.js

```text
Starting practical file processing...

--------------------------------
File: file1.txt
Total Lines: 3
Total Words: 16
--------------------------------

--------------------------------
File: file2.txt
Total Lines: 3
Total Words: 19
--------------------------------

--------------------------------
File: file3.txt
Total Lines: 3
Total Words: 17
--------------------------------

All files processed successfully.
Combined content saved in output.txt.
```

## 6. Important Concepts Explained

### 1. Callbacks
Callbacks are functions passed as arguments to other functions. They execute when an asynchronous operation completes.

### 2. Promises
Promises represent the eventual success or failure of asynchronous operations. They use .then() and .catch() for handling results and errors.

### 3. Async/Await
Async/await provides a cleaner way to work with Promises. The await keyword pauses execution inside an async function while a Promise settles, without blocking the Node.js event loop.

### 4. Asynchronous File Operations
Node.js provides asynchronous file methods such as fs.readFile() and fs.writeFile() to read and write files without blocking the main thread.

### 5. Event Loop
The Event Loop manages asynchronous callbacks. process.nextTick() runs before the Event Loop proceeds to its next phase. setTimeout() schedules timer callbacks, while setImmediate() schedules callbacks in the check phase.

## 7. Error Handling

- Callback errors are handled through error arguments.
- Promise errors are handled using .catch().
- Async/await errors are handled using try/catch.
- Meaningful error messages are displayed when file operations fail.

## 8. Conclusion

This project demonstrates practical asynchronous programming in Node.js using callbacks, Promises, async/await, file system operations, and Event Loop concepts.

It also demonstrates how multiple files can be read, processed, analyzed, and combined without using blocking synchronous methods.