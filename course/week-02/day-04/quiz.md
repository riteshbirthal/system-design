# Day 4 Quiz: REST API Design

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**Which of the following is a REST constraint?**

A) Use only POST method
B) Stateless communication
C) Always return XML
D) Use sessions for authentication

<details>
<summary>Answer</summary>
B) Stateless communication
</details>

---

### Question 2
**Which URL follows REST best practices?**

A) GET /getUsers
B) GET /users
C) GET /user/list
D) GET /api/fetchAllUsers

<details>
<summary>Answer</summary>
B) GET /users (uses plural noun, no verbs)
</details>

---

### Question 3
**What HTTP method should be used to partially update a resource?**

A) PUT
B) POST
C) PATCH
D) UPDATE

<details>
<summary>Answer</summary>
C) PATCH
</details>

---

### Question 4
**What status code should be returned when a new resource is successfully created?**

A) 200 OK
B) 201 Created
C) 204 No Content
D) 202 Accepted

<details>
<summary>Answer</summary>
B) 201 Created
</details>

---

### Question 5
**Which API versioning strategy is most commonly used?**

A) Header versioning
B) Query parameter versioning
C) URL path versioning (/api/v1/)
D) Content negotiation

<details>
<summary>Answer</summary>
C) URL path versioning (/api/v1/)
</details>

---

### Question 6
**What is the main advantage of cursor-based pagination over offset-based?**

A) Simpler to implement
B) Allows jumping to any page
C) More consistent with real-time data changes
D) Returns more data per request

<details>
<summary>Answer</summary>
C) More consistent with real-time data changes
</details>

---

### Question 7
**Which authentication method includes user context and is stateless?**

A) Session cookies
B) Basic Authentication
C) JWT (JSON Web Tokens)
D) API Keys only

<details>
<summary>Answer</summary>
C) JWT (JSON Web Tokens)
</details>

---

### Question 8
**What status code indicates rate limiting has been exceeded?**

A) 401 Unauthorized
B) 403 Forbidden
C) 429 Too Many Requests
D) 503 Service Unavailable

<details>
<summary>Answer</summary>
C) 429 Too Many Requests
</details>

---

### Question 9
**According to REST principles, what should each request contain?**

A) Only the resource ID
B) A session reference
C) All information needed to process the request
D) Only headers

<details>
<summary>Answer</summary>
C) All information needed to process the request (stateless)
</details>

---

### Question 10
**Which HTTP method is NOT idempotent?**

A) GET
B) PUT
C) DELETE
D) POST

<details>
<summary>Answer</summary>
D) POST (multiple identical requests may create multiple resources)
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! Ready for Day 5
- 7-8 correct: Good understanding, review weak areas
- 5-6 correct: Review the material before proceeding
- Below 5: Re-read Day 4 content thoroughly
