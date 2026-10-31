# Express.js Server Setup

## Overview

This project demonstrates how to initialize a Node.js application, install Express.js, and create a basic Express server that listens on port 3000.

## Project Structure

```text
express-app/
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- npm

## Installation Steps

### 1. Initialize the project

```bash
npm init -y
```

### 2. Install Express

```bash
npm install express
```

### 3. Start the server

```bash
node server.js
```

## Server Code

The server is created using Express and listens on port 3000.

## Terminal Output

```text
Express server is running on port 3000
```

## Explanation

1. Express is imported using require().
2. An Express application is created using express().
3. Port 3000 is assigned to the server.
4. app.listen() starts the server.
5. A console message confirms that the server has started successfully.

## Git Ignore

The `.gitignore` file excludes node_modules and environment files from Git commits.

## Conclusion

The project successfully initializes a Node.js application, installs Express.js, and starts a basic server on port 3000.