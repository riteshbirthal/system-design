# Day 2 Assignment: HTTP/HTTPS Protocols

## Assignment Overview
**Difficulty:** Beginner to Intermediate
**Estimated Time:** 60-75 minutes
**Points:** 100

---

## Part 1: HTTP Methods Deep Dive (35 points)

### Task 1.1 (15 points)
For each scenario, identify the correct HTTP method and explain why:

| Scenario | Method | Reasoning |
|----------|--------|-----------|
| Get a user's profile | | |
| Create a new blog post | | |
| Update a user's email address only | | |
| Replace entire user record | | |
| Delete a comment | | |
| Check if an API endpoint exists | | |
| Get available methods for an endpoint | | |

### Task 1.2 (10 points)
Explain the concept of idempotency with examples. For each method, state whether it's idempotent and provide a practical example:

| Method | Idempotent? | Example |
|--------|-------------|---------|
| GET | | |
| POST | | |
| PUT | | |
| PATCH | | |
| DELETE | | |

### Task 1.3 (10 points)
You're designing an API for a banking application. Explain why the following operations should or should not be idempotent:

1. Checking account balance
2. Transferring money between accounts
3. Updating user profile
4. Withdrawing cash

---

## Part 2: Status Codes Analysis (25 points)

### Task 2.1 (15 points)
For each scenario, choose the most appropriate HTTP status code and explain your choice:

1. User tries to access a resource that doesn't exist
2. User successfully logs in
3. User submits invalid JSON in request body
4. Server is temporarily overloaded
5. User tries to access without being logged in
6. User is logged in but doesn't have permission
7. Resource was moved to a new permanent URL
8. File upload successful, no response body needed
9. Request conflicts with current resource state
10. Upstream server didn't respond in time

### Task 2.2 (10 points)
Your API returns a 500 Internal Server Error for the following scenarios. Suggest better, more specific status codes:

1. Database connection failed: `500` → `?`
2. Invalid email format in request: `500` → `?`
3. User not found: `500` → `?`
4. Rate limit exceeded: `500` → `?`
5. Required field missing: `500` → `?`

---

## Part 3: HTTP Headers & Security (20 points)

### Task 3.1 (10 points)
Analyze the following HTTP request and response. Identify any security issues or best practices violations:

**Request:**
```http
GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=
Cookie: session=abc123
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: token=xyz789
Access-Control-Allow-Origin: *

{"id": 123, "email": "user@example.com", "ssn": "123-45-6789"}
```

List issues found:
```
[Your answer here]
```

### Task 3.2 (10 points)
Write the HTTP headers you would use for the following scenarios:

1. **Caching a static image for 1 year:**
```http
[Your headers]
```

2. **Preventing any caching of sensitive data:**
```http
[Your headers]
```

3. **Setting a secure session cookie:**
```http
[Your headers]
```

4. **Allowing CORS from specific origin:**
```http
[Your headers]
```

---

## Part 4: HTTPS & Performance (20 points)

### Task 4.1 (10 points)
Describe the TLS handshake process in your own words. Include:
1. The steps involved
2. What information is exchanged at each step
3. How the session key is established
4. Why this process ensures secure communication

### Task 4.2 (10 points)
Compare HTTP/1.1, HTTP/2, and HTTP/3 in a table format:

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---------|----------|--------|--------|
| Multiplexing | | | |
| Header Compression | | | |
| Transport Protocol | | | |
| Head-of-Line Blocking | | | |
| Connection Setup | | | |

Then explain: Why would a video streaming service benefit from HTTP/3?

---

## Submission Guidelines

1. Save your answers in a document named `day02_http_assignment_[yourname].md`
2. Show your reasoning for each answer
3. Submit by the end of Day 2

## Grading Rubric

| Criteria | Points |
|----------|--------|
| HTTP Methods Understanding | 30 |
| Status Codes Accuracy | 20 |
| Headers & Security | 20 |
| HTTPS & Performance | 20 |
| Clarity & Formatting | 10 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Bonus 1: API Analysis (10 points)
Use browser developer tools to analyze the HTTP requests/responses when you:
1. Visit a popular website (like GitHub or Twitter)
2. Document 5 interesting headers you find
3. Explain what HTTP/2 or HTTP/3 features you observe

### Bonus 2: Security Headers (5 points)
Research and explain the following security headers:
- Content-Security-Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-Content-Type-Options
- X-Frame-Options
