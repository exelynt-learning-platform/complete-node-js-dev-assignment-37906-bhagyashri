
# Task Manager API - Swagger Documentation

## Description

A RESTful Task Manager API built using Node.js and Express.js.

Swagger UI and OpenAPI 3.0 are integrated to provide interactive API documentation and allow users to test endpoints directly from the browser.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Swagger UI Express
- Swagger JSDoc
- OpenAPI 3.0
- CORS
- dotenv

## Project Structure

```text
task-manager-api/
├── routes/
│   ├── tasks.js
│   └── users.js
├── server.js
├── swagger.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

## Installation

Install project dependencies:

```bash
npm install
```

## Start the Server

```bash
npm start
```

The server runs at:

http://localhost:3000

## Swagger Documentation

Open:

http://localhost:3000/api-docs

OpenAPI JSON specification:

http://localhost:3000/api-docs.json

## Available Task Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /tasks | Get all tasks |
| POST | /tasks | Create a new task |
| PUT | /tasks/{id} | Update a task |
| DELETE | /tasks/{id} | Delete a task |

## User Endpoint

| Method | Endpoint | Description |
|---|---|---|
| GET | /users | Get all users |

## Example Task Request

POST /tasks

```json
{
  "title": "Learn Swagger",
  "description": "Create API documentation",
  "status": "pending"
}
```

## API Response Codes

| Status | Description |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 400 | Invalid request data |
| 404 | Resource not found |
| 500 | Internal server error |

## Swagger Configuration

- `swagger.js` contains the OpenAPI configuration.
- `routes/tasks.js` contains task endpoint implementations and JSDoc documentation.
- `routes/users.js` contains user endpoint implementation and JSDoc documentation.
- `server.js` registers Swagger UI at `/api-docs`.

## Storage

This demonstration uses in-memory arrays to store tasks and users. Data resets when the server restarts.

## Testing

All documented endpoints can be tested directly through Swagger UI using the Try it out and Execute buttons.
