# complete-node-js-dev-assignment-37906-bhagyashri
Module &amp; Week Assignments - This repository contains module-wise and week-wise assignment submissions.
# Express Error Handling Application

## Description

This project demonstrates how to handle undefined routes (404 errors) and unexpected server errors (500 errors) using Express.js middleware.

## Technologies Used

- Node.js
- Express.js
- JavaScript

## Installation

Install Express.js:

```bash
npm install express
```

## How to Run

Start the application:

```bash
node server.js
```

Server URL:

`http://localhost:3000`

## Error Handling

### 1. 404 Not Found

The 404 middleware handles requests to routes that do not exist.

**Request:**

`GET http://localhost:3000/unknown`

**Response Status:** 404 Not Found

**Response Body:**

```json
{
  "success": false,
  "message": "Route not found: /unknown"
}
```

### 2. 500 Internal Server Error

The `/force-error` route intentionally generates an error to test the centralized error-handling middleware.

**Request:**

`GET http://localhost:3000/force-error`

**Response Status:** 500 Internal Server Error

**Response Body:**

```json
{
  "success": false,
  "message": "Internal Server Error. Something went wrong on the server."
}
```

### 3. Home Route

The home route verifies that the server continues running after errors.

**Request:**

`GET http://localhost:3000/`

**Response Status:** 200 OK

**Response Body:**

```json
{
  "success": true,
  "message": "Welcome to the Express Error Handling Application!"
}
```

## Conclusion

This project implements 404 Not Found middleware and centralized error-handling middleware with four parameters: `(err, req, res, next)`.

It handles unexpected errors without crashing the Express server.