# Task Attachment Upload API

## Overview

This assignment enhances the Express task creation API with file upload functionality using Multer.

## Dependencies

```bash
npm install express express-validator multer
```

## API Endpoint

**Method:** POST

**URL:** `http://localhost:3000/tasks`

**Authorization:**

```text
Bearer my-secret-token
```

**Body type:** form-data

| Key | Type | Required |
|---|---|---|
| title | Text | Yes |
| description | Text | Yes |
| dueDate | Text | Yes |
| attachment | File | No |

## File Upload Configuration

- Storage directory: `uploads/`
- Maximum file size: 5 MB
- Allowed formats: PDF, JPG, JPEG, PNG, GIF and WEBP
- Upload field: `attachment`
- File names: Unique timestamp and random number

## Test 1: Successful File Upload

**Request:** POST `/tasks`

**Body (form-data):**

| Key | Value | Type |
|---|---|---|
| title | Complete Node.js Assignment | Text |
| description | Complete the Multer upload assignment. | Text |
| dueDate | 2026-11-15 | Text |
| attachment | Select a PDF file | File |

**Expected status:** 201 Created

**Example JSON response:**

```json
{
    "success": true,
    "message": "Task created successfully.",
    "task": {
        "id": 1,
        "title": "Complete Node.js Assignment",
        "description": "Complete the Multer upload assignment.",
        "dueDate": "2026-11-15",
        "attachment": {
            "fileName": "1793456789000-123456789.pdf",
            "filePath": "/uploads/1793456789000-123456789.pdf"
        }
    }
}
```

Replace this example with the actual Postman response.

## Test 2: Rejected File Type

**Request:** POST `/tasks`

**Body (form-data):**

| Key | Value | Type |
|---|---|---|
| title | Test Invalid File | Text |
| description | Testing invalid attachment. | Text |
| dueDate | 2026-11-15 | Text |
| attachment | Select a TXT file | File |

**Expected status:** 400 Bad Request

**JSON response:**

```json
{
    "success": false,
    "message": "Invalid file type. Only PDF, JPG, JPEG, PNG, GIF and WEBP files are allowed."
}
```

## Uploaded File Access

Uploaded files are stored in the `uploads/` folder.

They can be accessed through:

`http://localhost:3000/uploads/filename.pdf`

## Git Configuration

The `.gitignore` file excludes uploaded files while retaining `uploads/.gitkeep`.

## Conclusion

Successfully implemented Multer file upload functionality, file type validation, unique file naming, upload storage, and attachment details in the task creation response.