# Week 2: Networking Fundamentals & Communication Protocols

## Week Overview
This week covers essential networking concepts that every system designer must understand, including DNS, HTTP/HTTPS, TCP/UDP, and API communication patterns.

**Learning Objectives:**
- Understand how DNS works and its role in distributed systems
- Learn HTTP/HTTPS protocols and their evolution
- Understand TCP vs UDP and when to use each
- Learn about different API architectural styles (REST, GraphQL, gRPC)
- Understand WebSockets for real-time communication

---

## Daily Schedule

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | DNS & Domain Resolution | DNS hierarchy, resolution process, DNS caching, GeoDNS |
| Day 2 | HTTP/HTTPS Protocols | HTTP methods, status codes, headers, HTTPS/TLS |
| Day 3 | TCP vs UDP | Connection protocols, reliability, streaming |
| Day 4 | REST API Design | REST principles, best practices, versioning |
| Day 5 | GraphQL, gRPC & WebSockets | Alternative APIs, real-time communication |

---

## Day 1: DNS & Domain Resolution

### Content Topics
- What is DNS?
- DNS hierarchy (Root, TLD, Authoritative)
- DNS resolution process
- DNS record types (A, AAAA, CNAME, MX, TXT, NS)
- DNS caching and TTL
- GeoDNS for global distribution
- DNS in system design

### Daily Quiz
- 10 questions on DNS concepts
- Understanding resolution flow
- Record type usage

### Daily Assignment
- Trace DNS resolution for popular websites
- Design DNS strategy for a global application

---

## Day 2: HTTP/HTTPS Protocols

### Content Topics
- HTTP protocol overview
- HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Status codes (1xx, 2xx, 3xx, 4xx, 5xx)
- HTTP headers (common headers, custom headers)
- HTTP/1.1 vs HTTP/2 vs HTTP/3
- HTTPS and TLS handshake
- Cookies and sessions

### Daily Quiz
- HTTP methods and their idempotency
- Status code meanings
- Security concepts

### Daily Assignment
- Design RESTful API with proper HTTP usage
- Analyze HTTP headers of real websites

---

## Day 3: TCP vs UDP

### Content Topics
- Transport layer overview
- TCP: Connection-oriented, reliable
- TCP 3-way handshake
- TCP flow control and congestion control
- UDP: Connectionless, unreliable
- When to use TCP vs UDP
- QUIC protocol (HTTP/3)

### Daily Quiz
- Protocol characteristics
- Use case matching
- Performance implications

### Daily Assignment
- Design protocol selection for different applications
- Compare latency and reliability trade-offs

---

## Day 4: REST API Design

### Content Topics
- REST principles and constraints
- Resource naming conventions
- API versioning strategies
- Pagination patterns
- Filtering and sorting
- Error handling
- Authentication (API keys, OAuth, JWT)
- API documentation (OpenAPI/Swagger)

### Daily Quiz
- REST best practices
- Endpoint design
- Status codes for operations

### Daily Assignment
- Design complete REST API for e-commerce platform
- Create OpenAPI specification

---

## Day 5: GraphQL, gRPC & WebSockets

### Content Topics
- GraphQL fundamentals
  - Schema definition
  - Queries and mutations
  - Pros and cons vs REST
- gRPC
  - Protocol buffers
  - Streaming types
  - Use cases
- WebSockets
  - Full-duplex communication
  - Connection lifecycle
  - Use cases (chat, real-time updates)
- Choosing the right protocol

### Daily Quiz
- Protocol comparison
- Use case matching
- Trade-off analysis

### Daily Assignment
- Design real-time notification system
- Compare protocol choices for different scenarios

---

## Weekly Resources

### Required Reading
- "High Performance Browser Networking" by Ilya Grigorik (Chapters 1-4)
- MDN Web Docs: HTTP
- GraphQL Official Documentation

### Video Resources
- Hussein Nasser: TCP vs UDP
- ByteByteGo: DNS Deep Dive
- Traversy Media: REST API Best Practices

### Tools to Explore
- Postman for API testing
- Wireshark for protocol analysis
- GraphQL Playground

---

## Weekly Quiz
- 25 questions covering all Week 2 topics
- Focus on practical application
- Protocol selection scenarios

## Weekly Project
**Design a Real-Time Chat System**
- Select appropriate protocols
- Design API endpoints
- Handle connection management
- Address scalability
