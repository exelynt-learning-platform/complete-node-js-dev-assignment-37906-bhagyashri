
# Task Manager API

## Description

A modular RESTful Task Manager API built with Node.js and Express.js.

The project demonstrates Express Router, middleware chaining, authentication, request validation, file uploads, pagination, filtering, CORS and Swagger/OpenAPI documentation.

## Technologies

- Node.js
- Express.js
- express-validator
- Multer
- CORS
- dotenv
- Swagger UI Express
- Swagger JSDoc

## Project Structure

```text
task-manager-api/
├── config/
│   └── swagger.js
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
├── data/
│   └── store.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── loggerMiddleware.js
│   └── uploadMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── validators/
│   └── taskValidator.js
├── uploads/
│   └── .gitkeep
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

## Installation

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
API_TOKEN=my-secret-token
FRONTEND_ORIGIN=http://localhost:5173
```

## Run the Server

```bash
npm start
```

Server URL:

http://localhost:3000

## Swagger Documentation

Interactive documentation:

http://localhost:3000/api-docs

OpenAPI JSON:

http://localhost:3000/api-docs.json

## Authentication

First call:

POST /auth/login

Request:

```json
{
  "apiKey": "my-secret-token"
}
```

Copy the returned token.

For protected endpoints, send:

```text
Authorization: Bearer my-secret-token
```

In Swagger UI, click Authorize and enter the token.

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | /auth/login | Authenticate and obtain a token | Public |

### Tasks

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /tasks | Get tasks with pagination and filters | Protected |
| POST | /tasks | Create a task with optional attachment | Protected |
| PUT | /tasks/:id | Update a task | Protected |
| DELETE | /tasks/:id | Delete a task | Protected |

### Users

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /users | Get all users | Protected |

## Pagination and Filtering

Example:

```text
GET /tasks?page=1&limit=10&status=pending
```

Filter by user:

```text
GET /tasks?userId=1
```

Filter by due date:

```text
GET /tasks?fromDate=2026-11-01&toDate=2026-11-30
```

Combine filters:

```text
GET /tasks?page=1&limit=5&status=pending&userId=1
```

## Create Task Example

POST /tasks

Content-Type: multipart/form-data

Fields:

```text
title: Complete assignment
description: Build a Task Manager API
status: pending
userId: 1
dueDate: 2026-11-10
attachment: select a PDF or image
```

Example response:

```json
{
  "success": true,
  "message": "Task created successfully.",
  "task": {
    "id": 3,
    "title": "Complete assignment",
    "description": "Build a Task Manager API",
    "status": "pending",
    "userId": 1,
    "dueDate": "2026-11-10",
    "attachment": {
      "filename": "example-file.pdf",
      "originalName": "assignment.pdf",
      "mimetype": "application/pdf",
      "size": 1024,
      "url": "/uploads/example-file.pdf"
    }
  }
}
```

## Validation

The API validates:

- Task title length.
- Task description length.
- Allowed task statuses.
- Existing user ID.
- Valid due date.

Invalid requests return HTTP 400 with validation messages.

## File Upload

Allowed files:

- PDF
- JPG/JPEG
- PNG
- GIF
- WEBP

Maximum file size: 5 MB.

Uploaded files are available under:

http://localhost:3000/uploads/filename

## CORS

The API allows the configured frontend origin from FRONTEND_ORIGIN.

Default:

http://localhost:5173

## Middleware

- Logger middleware logs requests.
- Authentication middleware protects private routes.
- Multer middleware handles attachments.
- Express-validator checks request data.
- Error middleware handles application errors.
- 404 middleware handles unknown endpoints.

## Storage

This demonstration uses in-memory arrays for tasks and users. Records reset when the server restarts. Uploaded files are stored in the uploads directory.

## Security Note

The shared API key is for assignment demonstration only. Do not commit .env or expose the API key in frontend code. A production application should use proper user authentication and token management.

## MongoDB Setup and Connection

### Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

### Installation

Install Mongoose:

```bash
npm install mongoose
```

### Environment Configuration

Create a `.env` file in the project root:

```env
PORT=3000
API_TOKEN=your_api_token
FRONTEND_ORIGIN=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
```

Never commit the actual `.env` file.

Use `.env.example` as a template for environment configuration.

### Database Connection

The MongoDB connection is managed separately in `config/db.js` using Mongoose.

The application connects to MongoDB before starting the Express server.

### Run the Application

```bash
npm start
```

### Expected Terminal Output

Paste your actual successful terminal output here after running the application.

Example:

```text
◇ injected env (4) from .env
MongoDB connected successfully!
Database Name: task_manager
Server running at http://localhost:3000
Swagger UI: http://localhost:3000/api-docs
```

### Error Handling

- Connection failures are logged in the terminal.
- The application does not start if the initial database connection fails.
- Runtime database errors are logged.
- Database disconnection events are logged.
- The database connection is closed when the application receives SIGINT.