# Week 2 Comprehensive Quiz: Networking & Communication Protocols

## Instructions
- Total Questions: 25
- Time Limit: 45 minutes
- Passing Score: 70% (18 correct)
- This quiz covers all topics from Week 2

---

## Section A: DNS (5 questions)

### Question 1
**What is the correct order of DNS resolution (after local cache miss)?**

A) TLD → Root → Authoritative → Resolver
B) Root → TLD → Authoritative
C) Authoritative → TLD → Root
D) Resolver → Authoritative → TLD → Root

<details>
<summary>Answer</summary>
B) Root → TLD → Authoritative
</details>

---

### Question 2
**Which DNS record type creates an alias pointing to another domain?**

A) A
B) MX
C) CNAME
D) NS

<details>
<summary>Answer</summary>
C) CNAME
</details>

---

### Question 3
**What is the purpose of GeoDNS?**

A) Encrypt DNS queries
B) Return different IPs based on user location
C) Cache DNS records longer
D) Prevent DNS spoofing

<details>
<summary>Answer</summary>
B) Return different IPs based on user location
</details>

---

### Question 4
**What does TTL control in DNS?**

A) Maximum packet size
B) How long a record should be cached
C) Number of retries
D) Server response time

<details>
<summary>Answer</summary>
B) How long a record should be cached
</details>

---

### Question 5
**Which DNS security extension adds cryptographic signatures?**

A) DNS over HTTPS
B) DNSSEC
C) DNS over TLS
D) EDNS

<details>
<summary>Answer</summary>
B) DNSSEC
</details>

---

## Section B: HTTP/HTTPS (5 questions)

### Question 6
**Which HTTP method is idempotent but NOT safe?**

A) GET
B) POST
C) PUT
D) OPTIONS

<details>
<summary>Answer</summary>
C) PUT (idempotent but modifies data, so not "safe")
</details>

---

### Question 7
**What is the difference between HTTP 301 and 302 status codes?**

A) 301 is permanent redirect, 302 is temporary
B) 301 is client error, 302 is server error
C) 301 requires authentication, 302 doesn't
D) No difference

<details>
<summary>Answer</summary>
A) 301 is permanent redirect, 302 is temporary
</details>

---

### Question 8
**Which HTTP/2 feature solves head-of-line blocking at the HTTP level?**

A) Header compression
B) Server push
C) Multiplexing
D) Binary framing

<details>
<summary>Answer</summary>
C) Multiplexing
</details>

---

### Question 9
**What does the 'HttpOnly' cookie attribute prevent?**

A) Sending cookie over HTTP
B) JavaScript access to the cookie
C) Cookie expiration
D) Cross-domain cookies

<details>
<summary>Answer</summary>
B) JavaScript access to the cookie
</details>

---

### Question 10
**How many RTTs does a TCP + TLS 1.3 connection require?**

A) 1 RTT
B) 2 RTT
C) 3 RTT
D) 4 RTT

<details>
<summary>Answer</summary>
C) 3 RTT (1.5 for TCP handshake + 1.5 for TLS 1.3)
</details>

---

## Section C: TCP vs UDP (5 questions)

### Question 11
**Which characteristic describes TCP?**

A) Connectionless, unreliable
B) Connection-oriented, reliable
C) Connectionless, reliable
D) Connection-oriented, unreliable

<details>
<summary>Answer</summary>
B) Connection-oriented, reliable
</details>

---

### Question 12
**What is the size of a UDP header?**

A) 20 bytes
B) 8 bytes
C) 12 bytes
D) Variable

<details>
<summary>Answer</summary>
B) 8 bytes
</details>

---

### Question 13
**Which protocol would be best for a live video streaming application?**

A) TCP only
B) UDP
C) SMTP
D) FTP

<details>
<summary>Answer</summary>
B) UDP (low latency is more important than reliability for live streaming)
</details>

---

### Question 14
**What is "head-of-line blocking" in TCP?**

A) First connection blocks others
B) Lost packet blocks subsequent packets from processing
C) Server queue is full
D) DNS resolution delay

<details>
<summary>Answer</summary>
B) Lost packet blocks subsequent packets from processing
</details>

---

### Question 15
**What transport protocol does QUIC use?**

A) TCP
B) UDP
C) SCTP
D) Raw IP

<details>
<summary>Answer</summary>
B) UDP
</details>

---

## Section D: REST API Design (5 questions)

### Question 16
**Which URL follows REST best practices?**

A) GET /users/getAll
B) POST /users/create
C) GET /users
D) GET /fetchUsers

<details>
<summary>Answer</summary>
C) GET /users
</details>

---

### Question 17
**What status code should be returned when a resource is successfully created?**

A) 200 OK
B) 201 Created
C) 204 No Content
D) 202 Accepted

<details>
<summary>Answer</summary>
B) 201 Created
</details>

---

### Question 18
**What is the main advantage of cursor-based pagination?**

A) Simpler to implement
B) Can jump to any page
C) Consistent with real-time data changes
D) Faster database queries always

<details>
<summary>Answer</summary>
C) Consistent with real-time data changes
</details>

---

### Question 19
**Which HTTP header typically contains the JWT token?**

A) X-API-Key
B) Authorization
C) Cookie
D) Content-Type

<details>
<summary>Answer</summary>
B) Authorization (as "Bearer {token}")
</details>

---

### Question 20
**What does REST's "stateless" constraint mean?**

A) No database is used
B) Each request contains all information needed
C) Server doesn't process requests
D) No caching allowed

<details>
<summary>Answer</summary>
B) Each request contains all information needed
</details>

---

## Section E: GraphQL, gRPC & WebSockets (5 questions)

### Question 21
**What problem does GraphQL primarily solve?**

A) Security issues
B) Over-fetching and under-fetching
C) Server-side rendering
D) Database optimization

<details>
<summary>Answer</summary>
B) Over-fetching and under-fetching
</details>

---

### Question 22
**What serialization format does gRPC use?**

A) JSON
B) XML
C) Protocol Buffers
D) YAML

<details>
<summary>Answer</summary>
C) Protocol Buffers
</details>

---

### Question 23
**What type of communication does WebSocket provide?**

A) Request-response only
B) Server-to-client only
C) Full-duplex bidirectional
D) Broadcast only

<details>
<summary>Answer</summary>
C) Full-duplex bidirectional
</details>

---

### Question 24
**When would you choose gRPC over REST?**

A) Browser-first applications
B) Simple CRUD operations
C) High-performance microservices
D) Public APIs for third parties

<details>
<summary>Answer</summary>
C) High-performance microservices
</details>

---

### Question 25
**What HTTP status code indicates a successful WebSocket upgrade?**

A) 200 OK
B) 101 Switching Protocols
C) 201 Created
D) 204 No Content

<details>
<summary>Answer</summary>
B) 101 Switching Protocols
</details>

---

## Scoring

| Score | Grade | Feedback |
|-------|-------|----------|
| 23-25 | A | Excellent! You've mastered Week 2 concepts |
| 20-22 | B | Great job! Ready for Week 3 |
| 18-19 | C | Good work! Review weak areas |
| 15-17 | D | Review materials before Week 3 |
| Below 15 | F | Re-study Week 2 content |

---

## Answer Key

| Q | Answer | Q | Answer | Q | Answer | Q | Answer | Q | Answer |
|---|--------|---|--------|---|--------|---|--------|---|--------|
| 1 | B | 6 | C | 11 | B | 16 | C | 21 | B |
| 2 | C | 7 | A | 12 | B | 17 | B | 22 | C |
| 3 | B | 8 | C | 13 | B | 18 | C | 23 | C |
| 4 | B | 9 | B | 14 | B | 19 | B | 24 | C |
| 5 | B | 10 | C | 15 | B | 20 | B | 25 | B |
