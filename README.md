# Task Listing API - Pagination and Filtering

## Objective

Enhance the GET /tasks API to support pagination and status filtering using query parameters.

## API Endpoint

**Method:** GET

**URL:** `http://localhost:3000/tasks`

**Authorization Header:**

```text
Authorization: Bearer my-secret-token
```

## Query Parameters

| Parameter | Description | Default |
|---|---|---|
| page | Page number | 1 |
| limit | Number of tasks per page | 10 |
| status | Filter by pending or completed | All |

## Test Case 1: Pagination

**Request:**

```text
GET http://localhost:3000/tasks?page=1&limit=2
```

**Expected Status:** 200 OK

**Response:**

```json
{
    "success": true,
    "message": "Tasks fetched successfully.",
    "pagination": {
        "totalTasks": 5,
        "currentPage": 1,
        "limit": 2,
        "totalPages": 3
    },
    "filters": {
        "status": "all"
    },
    "tasks": [
        {
            "id": 1,
            "title": "Learn Express.js",
            "description": "Understand Express basics",
            "dueDate": "2026-11-15",
            "status": "pending",
            "completed": false
        },
        {
            "id": 2,
            "title": "Practice Node.js",
            "description": "Practice Node.js concepts",
            "dueDate": "2026-11-16",
            "status": "completed",
            "completed": true
        }
    ]
}
```

## Test Case 2: Filter Pending Tasks

**Request:**

```text
GET http://localhost:3000/tasks?status=pending
```

**Expected Status:** 200 OK

**Response:**

```json
{
    "success": true,
    "message": "Tasks fetched successfully.",
    "pagination": {
        "totalTasks": 3,
        "currentPage": 1,
        "limit": 10,
        "totalPages": 1
    },
    "filters": {
        "status": "pending"
    },
    "tasks": [
        {
            "id": 1,
            "title": "Learn Express.js",
            "description": "Understand Express basics",
            "dueDate": "2026-11-15",
            "status": "pending",
            "completed": false
        },
        {
            "id": 3,
            "title": "Complete Assignment",
            "description": "Finish Express assignment",
            "dueDate": "2026-11-17",
            "status": "pending",
            "completed": false
        },
        {
            "id": 5,
            "title": "Practice API",
            "description": "Test API endpoints",
            "dueDate": "2026-11-19",
            "status": "pending",
            "completed": false
        }
    ]
}
```

## Test Case 3: Pagination with Status Filtering

**Request:**

```text
GET http://localhost:3000/tasks?page=2&limit=1&status=pending
```

**Expected Status:** 200 OK

**Response:**

```json
{
    "success": true,
    "message": "Tasks fetched successfully.",
    "pagination": {
        "totalTasks": 3,
        "currentPage": 2,
        "limit": 1,
        "totalPages": 3
    },
    "filters": {
        "status": "pending"
    },
    "tasks": [
        {
            "id": 3,
            "title": "Complete Assignment",
            "description": "Finish Express assignment",
            "dueDate": "2026-11-17",
            "status": "pending",
            "completed": false
        }
    ]
}
```

## Test Case 4: Invalid Page Number

**Request:**

```text
GET http://localhost:3000/tasks?page=-1&limit=2
```

**Expected Status:** 400 Bad Request

**Response:**

```json
{
    "success": false,
    "message": "Page must be a positive integer."
}
```

## Pagination Logic

- Read page and limit from query parameters.
- Apply status filtering first.
- Calculate total matching tasks and total pages.
- Calculate the start and end indexes.
- Return only the requested subset of tasks.

## Conclusion

Successfully implemented pagination and filtering in the Express task listing API.

- Supports page and limit parameters.
- Supports pending and completed task filtering.
- Supports combined filtering and pagination.
- Uses default values when query parameters are omitted.
- Returns structured JSON responses.
- Handles invalid query parameters with HTTP 400.
