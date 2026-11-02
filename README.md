# complete-node-js-dev-assignment-37906-bhagyashri
Module &amp; Week Assignments - This repository contains module-wise and week-wise assignment submissions.


## Advanced Student Querying

The Student API supports filtering, field projection, and sorting using query parameters.

### GET /students

Base URL:
http://localhost:3000/students

### Query Parameters

| Parameter | Description | Example |
|---|---|---|
| grade | Filter students by grade | grade=A |
| sort | Sort students by age | sort=asc or sort=desc |

### Features

1. Filtering: Returns students matching the requested grade.
2. Projection: Returns only name and email fields.
3. Sorting: Sorts students by age in ascending or descending order.
4. Combined queries: Supports filtering and sorting together.
5. Error handling: Invalid query parameters return HTTP 400.
6. Empty results: Returns HTTP 200 with an empty data array.

### Postman Test 1: Filter by Grade

Method: GET

URL:
http://localhost:3000/students?grade=A

Expected status: 200 OK

Example response:

{
  "success": true,
  "count": 2,
  "message": "Students retrieved successfully",
  "data": [
    {
      "name": "Rahul Sharma",
      "email": "rahul@example.com"
    },
    {
      "name": "Priya Patil",
      "email": "priya@example.com"
    }
  ]
}

### Postman Test 2: Sort by Age Ascending

Method: GET

URL:
http://localhost:3000/students?sort=asc

Expected status: 200 OK

Returns all students sorted from youngest to oldest.
Only name and email are included in the response.

### Postman Test 3: Filter by Grade and Sort Descending

Method: GET

URL:
http://localhost:3000/students?grade=A&sort=desc

Expected status: 200 OK

Returns grade A students sorted from oldest to youngest.

### Postman Test 4: Invalid Sort Parameter

Method: GET

URL:
http://localhost:3000/students?sort=random

Expected status: 400 Bad Request

Example response:

{
  "success": false,
  "message": "Invalid sort parameter. Use asc or desc."
}

### Postman Test 5: No Matching Students

Method: GET

URL:
http://localhost:3000/students?grade=Z

Expected status: 200 OK

Example response:

{
  "success": true,
  "count": 0,
  "message": "No students found matching the given filter",
  "data": []
}

Note: Replace example responses with your actual Postman responses before submission.
