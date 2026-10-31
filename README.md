# CORS Configuration in Express.js

## 1. Objective

Configured Cross-Origin Resource Sharing (CORS) in an Express.js application to allow API requests from an authorized frontend origin and block browser access from unauthorized origins.

## 2. Installation

```bash
npm install cors
```

## 3. CORS Configuration

Allowed origin:

`http://localhost:5173`

Unauthorized origin used for testing:

`http://localhost:5174`

CORS middleware is applied globally using:

```javascript
app.use(cors(corsOptions));
```

## 4. Allowed Origin Test

**Frontend URL:** `http://localhost:5173`

**API URL:** `http://localhost:3000/api/cors-test`

**Result:** Successful API response.

**Response:**

```json
{
    "success": true,
    "message": "CORS request successful!",
    "data": "Your frontend can access this API."
}
```

### Allowed Origin Response Headers

Command:

```bash
curl -i -H "Origin: http://localhost:5173" http://localhost:3000/api/cors-test
```

Paste your actual terminal output here:

```text
PASTE ACTUAL ALLOWED ORIGIN RESPONSE HEADERS HERE
```

## 5. Blocked Origin Test

**Frontend URL:** `http://localhost:5174`

**API URL:** `http://localhost:3000/api/cors-test`

**Result:** Browser blocks frontend JavaScript from accessing the response because the origin is not allowed.

### Blocked Origin Response Headers

Command:

```bash
curl -i -H "Origin: http://localhost:5174" http://localhost:3000/api/cors-test
```

Paste your actual terminal output here:

```text
PASTE ACTUAL BLOCKED ORIGIN RESPONSE HEADERS HERE
```

The blocked response does not contain the `Access-Control-Allow-Origin` header.

### Browser Console Error

Paste the actual Chrome browser console error here:

```text
PASTE ACTUAL CORS ERROR FROM CHROME CONSOLE HERE
```

## 6. Security Configuration

- Only the configured frontend origin is allowed.
- Unauthorized browser origins do not receive the CORS allow-origin header.
- Allowed HTTP methods and request headers are configured.
- CORS middleware is applied before API routes.
- Credentials are disabled.

## 7. Conclusion

Successfully configured and tested CORS in the Express.js application. Verified that the authorized frontend can access the API and unauthorized browser origins are blocked by the browser's CORS policy.