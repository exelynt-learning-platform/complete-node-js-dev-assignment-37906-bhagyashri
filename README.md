# Async/Await File Reading in Node.js

## Overview
This project demonstrates how to read multiple text files asynchronously using async/await syntax in Node.js.

## Project Files
- `asyncAwaitDemo.js` – Main JavaScript file containing the async/await implementation.
- `file1.txt` – First text file.
- `file2.txt` – Second text file.
- `file3.txt` – Third text file.

## Features
- Uses an async function to read files.
- Uses await to wait for each file-reading operation.
- Reads files sequentially.
- Uses try/catch for error handling.
- Displays meaningful error messages.

## How to Run

Make sure Node.js is installed.

Run the following command in the project directory:

```bash
node asyncAwaitDemo.js
```

## Sample Console Output

```text
Starting async/await file reading...

Content of File 1:
Hello! This is the content of File 1.
I am learning Node.js callbacks.

Content of File 2:
Hello! This is the content of File 2.
This file is read after File 1.

Content of File 3:
Hello! This is the content of File 3.
This file is read after File 2.

All files read successfully in sequence.
```

## Concepts Explained

### 1. Async
The async keyword declares an asynchronous function that returns a Promise.

### 2. Await
The await keyword pauses execution inside the async function until the file-reading Promise settles.

### 3. Sequential File Reading
Each file is read after the previous file-reading operation completes.

### 4. Error Handling
The try/catch block catches errors, such as missing files or file-reading failures, and displays an error message.

## Conclusion
This project demonstrates readable asynchronous file handling using async/await, sequential execution, and proper error handling in Node.js.