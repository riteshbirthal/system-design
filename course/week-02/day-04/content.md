# Day 4: REST API Design

## Learning Objectives
- Understand REST principles and constraints
- Learn REST API design best practices
- Master URL/endpoint design patterns
- Understand API versioning strategies
- Learn pagination, filtering, and error handling
- Understand authentication methods

---

## 1. What is REST?

### Definition
REST (Representational State Transfer) is an architectural style for designing networked applications. It was defined by Roy Fielding in his 2000 doctoral dissertation.

### REST Constraints

| Constraint | Description |
|------------|-------------|
| **Client-Server** | Separation of concerns between UI and data storage |
| **Stateless** | Each request contains all information needed |
| **Cacheable** | Responses must define themselves as cacheable or not |
| **Uniform Interface** | Standardized way to interact with resources |
| **Layered System** | Client cannot tell if connected directly to server |
| **Code on Demand** | Optional: Server can extend client functionality |

### RESTful vs REST-like

```
Truly RESTful:
- Follows all REST constraints
- Uses hypermedia (HATEOAS)
- Self-documenting responses

REST-like (Most APIs):
- Uses HTTP methods correctly
- Resource-based URLs
- JSON responses
- May not implement HATEOAS
```

---

## 2. Resource-Based URLs

### Principles

1. **Use nouns, not verbs** for endpoints
2. **Use plural nouns** for collections
3. **Use hierarchical structure** for relationships
4. **Keep URLs lowercase** with hyphens
5. **Don't expose implementation details**

### URL Design Examples

```
✅ Good URLs:
GET    /users              # Get all users
GET    /users/123          # Get user 123
POST   /users              # Create user
PUT    /users/123          # Update user 123
DELETE /users/123          # Delete user 123

GET    /users/123/orders   # Get orders for user 123
GET    /users/123/orders/456  # Get specific order

❌ Bad URLs:
GET    /getUsers           # Verb in URL
GET    /user               # Singular (inconsistent)
POST   /createUser         # Verb in URL
GET    /users/getById/123  # Unnecessary nesting
DELETE /users/delete/123   # Redundant verb
```

### Nested Resources

```
# User's orders
GET /users/123/orders

# Order's items
GET /orders/456/items

# But avoid deep nesting (max 2 levels)
❌ /users/123/orders/456/items/789/reviews

✅ Better: /items/789/reviews
```

---

## 3. HTTP Methods in REST

### CRUD Operations Mapping

| Operation | HTTP Method | Example | Success Code |
|-----------|-------------|---------|--------------|
| Create | POST | `POST /users` | 201 Created |
| Read | GET | `GET /users/123` | 200 OK |
| Update (full) | PUT | `PUT /users/123` | 200 OK |
| Update (partial) | PATCH | `PATCH /users/123` | 200 OK |
| Delete | DELETE | `DELETE /users/123` | 204 No Content |

### POST vs PUT vs PATCH

```http
# POST: Create new resource (server assigns ID)
POST /users
{"name": "John", "email": "john@example.com"}
Response: 201 Created, Location: /users/123

# PUT: Replace entire resource (client knows ID)
PUT /users/123
{"name": "John Updated", "email": "john@example.com", "age": 30}

# PATCH: Partial update (only changed fields)
PATCH /users/123
{"name": "John Updated"}
```

### Idempotency in REST

| Method | Idempotent | Safe |
|--------|------------|------|
| GET | Yes | Yes |
| POST | No | No |
| PUT | Yes | No |
| PATCH | No* | No |
| DELETE | Yes | No |

*PATCH can be idempotent depending on implementation

---

## 4. Request & Response Design

### Request Format

```http
POST /api/v1/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
}
```

### Successful Response

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/users/123

{
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2025-01-15T10:30:00Z",
    "links": {
        "self": "/api/v1/users/123",
        "orders": "/api/v1/users/123/orders"
    }
}
```

### Error Response

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Request validation failed",
        "details": [
            {
                "field": "email",
                "message": "Invalid email format"
            },
            {
                "field": "name",
                "message": "Name is required"
            }
        ]
    },
    "request_id": "req_abc123",
    "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 5. API Versioning

### Versioning Strategies

#### 1. URL Path Versioning (Most Common)
```
GET /api/v1/users
GET /api/v2/users
```
**Pros**: Clear, easy to understand
**Cons**: URL changes with version

#### 2. Query Parameter
```
GET /api/users?version=1
GET /api/users?version=2
```
**Pros**: Same URL structure
**Cons**: Easy to forget, less discoverable

#### 3. Header Versioning
```http
GET /api/users
Accept: application/vnd.api+json; version=1
```
**Pros**: Clean URLs
**Cons**: Hidden, harder to test

#### 4. Content Negotiation
```http
GET /api/users
Accept: application/vnd.company.v1+json
```

### Version Lifecycle

```
v1 (Deprecated)  →  v2 (Current)  →  v3 (Beta)
     │                  │                │
  Sunset in 6mo    Production        Testing
```

---

## 6. Pagination

### Types of Pagination

#### 1. Offset-Based (Page Number)
```http
GET /api/users?page=2&per_page=20

Response:
{
    "data": [...],
    "pagination": {
        "page": 2,
        "per_page": 20,
        "total_pages": 10,
        "total_items": 200
    }
}
```
**Pros**: Simple, allows jumping to pages
**Cons**: Inconsistent with real-time data, slow for large offsets

#### 2. Cursor-Based (Recommended for Large Datasets)
```http
GET /api/users?cursor=eyJpZCI6MTIzfQ&limit=20

Response:
{
    "data": [...],
    "pagination": {
        "next_cursor": "eyJpZCI6MTQzfQ",
        "prev_cursor": "eyJpZCI6MTAzfQ",
        "has_more": true
    }
}
```
**Pros**: Consistent, efficient for large datasets
**Cons**: Cannot jump to specific page

#### 3. Keyset Pagination
```http
GET /api/users?after_id=100&limit=20
```

### Pagination Best Practices

```json
{
    "data": [...],
    "meta": {
        "total": 1000,
        "count": 20,
        "per_page": 20,
        "current_page": 1,
        "total_pages": 50
    },
    "links": {
        "self": "/api/users?page=1",
        "first": "/api/users?page=1",
        "last": "/api/users?page=50",
        "prev": null,
        "next": "/api/users?page=2"
    }
}
```

---

## 7. Filtering, Sorting, and Search

### Filtering
```http
# Single filter
GET /api/users?status=active

# Multiple filters
GET /api/users?status=active&role=admin

# Range filters
GET /api/orders?created_after=2025-01-01&created_before=2025-01-31

# Array filter
GET /api/users?id=1,2,3,4,5
```

### Sorting
```http
# Single field sort
GET /api/users?sort=created_at

# Descending order
GET /api/users?sort=-created_at

# Multiple fields
GET /api/users?sort=-created_at,name
```

### Searching
```http
# Simple search
GET /api/users?q=john

# Field-specific search
GET /api/users?search[name]=john&search[email]=gmail
```

### Field Selection (Sparse Fieldsets)
```http
# Return only specific fields
GET /api/users?fields=id,name,email

# Nested field selection
GET /api/users?fields=id,name,address.city
```

---

## 8. Authentication & Authorization

### Authentication Methods

#### 1. API Keys
```http
GET /api/users
X-API-Key: your-api-key-here
```
Simple but less secure for user-specific data.

#### 2. Bearer Token (JWT)
```http
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```
Standard for modern APIs, includes user context.

#### 3. OAuth 2.0
```
┌────────┐     ┌───────────────┐     ┌──────────┐
│  User  │────▶│ Authorization │────▶│ Resource │
│        │     │    Server     │     │  Server  │
└────────┘     └───────────────┘     └──────────┘
                      │
              Access Token + Refresh Token
```

#### 4. Basic Authentication
```http
GET /api/users
Authorization: Basic base64(username:password)
```
Only use over HTTPS, not recommended for APIs.

### JWT Token Structure

```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header: {"alg": "HS256", "typ": "JWT"}
Payload: {"sub": "123", "name": "John", "exp": 1234567890}
Signature: HMAC-SHA256(header + payload, secret)
```

---

## 9. Rate Limiting

### Rate Limit Headers
```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200
```

### Rate Limit Exceeded Response
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
Content-Type: application/json

{
    "error": {
        "code": "RATE_LIMIT_EXCEEDED",
        "message": "Rate limit exceeded. Try again in 1 hour.",
        "retry_after": 3600
    }
}
```

### Rate Limiting Strategies

| Strategy | Description |
|----------|-------------|
| Fixed Window | X requests per time window |
| Sliding Window | Rolling time window |
| Token Bucket | Tokens replenish over time |
| Leaky Bucket | Constant outflow rate |

---

## 10. API Documentation

### OpenAPI (Swagger) Example

```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0

paths:
  /users:
    get:
      summary: List all users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      summary: Create a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
```

---

## 11. REST API Best Practices Summary

### Do's ✅
- Use nouns for resources
- Use HTTP methods correctly
- Return appropriate status codes
- Version your API
- Implement pagination for lists
- Use consistent naming conventions
- Document your API
- Implement rate limiting
- Use HTTPS always

### Don'ts ❌
- Don't use verbs in URLs
- Don't ignore HTTP status codes
- Don't expose internal errors
- Don't return HTML errors for API endpoints
- Don't use sessions (keep it stateless)
- Don't nest resources too deeply

---

## 12. Summary

- REST is an architectural style based on resources and HTTP methods
- URLs should be noun-based and hierarchical
- HTTP methods map to CRUD operations
- Proper status codes communicate request outcomes
- Version APIs from the start
- Implement pagination for large collections
- Use appropriate authentication methods
- Document APIs with OpenAPI/Swagger

---

## Further Reading
- [REST API Tutorial](https://restfulapi.net/)
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
- [Google API Design Guide](https://cloud.google.com/apis/design)
- [JSON:API Specification](https://jsonapi.org/)
