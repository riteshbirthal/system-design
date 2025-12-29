# Day 2: HTTP/HTTPS Protocols

## Learning Objectives
- Understand the HTTP protocol and its evolution
- Learn HTTP methods and their proper usage
- Master HTTP status codes and their meanings
- Understand HTTP headers and their purposes
- Learn how HTTPS and TLS encryption work
- Understand HTTP/2 and HTTP/3 improvements

---

## 1. Introduction to HTTP

### What is HTTP?
HyperText Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents. It follows a client-server model where the client makes requests and the server responds.

### HTTP Characteristics
- **Stateless**: Each request is independent
- **Text-based**: Human-readable protocol (HTTP/1.x)
- **Flexible**: Supports various content types
- **Extensible**: Custom headers can be added

```
┌──────────┐         HTTP Request         ┌──────────┐
│  Client  │ ────────────────────────────▶│  Server  │
│ (Browser)│                              │  (Web)   │
│          │◀──────────────────────────── │          │
└──────────┘         HTTP Response        └──────────┘
```

---

## 2. HTTP Request Structure

An HTTP request consists of:

```
GET /api/users HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer token123
User-Agent: Mozilla/5.0
Content-Type: application/json

{"name": "John"}
```

### Request Components

| Component | Description | Example |
|-----------|-------------|---------|
| Method | Action to perform | GET, POST, PUT |
| Path | Resource location | /api/users |
| Version | HTTP version | HTTP/1.1 |
| Headers | Metadata | Host, Accept |
| Body | Request payload | JSON data |

---

## 3. HTTP Methods

### Standard HTTP Methods

| Method | Purpose | Idempotent | Safe | Has Body |
|--------|---------|------------|------|----------|
| **GET** | Retrieve resource | Yes | Yes | No |
| **POST** | Create resource | No | No | Yes |
| **PUT** | Replace resource | Yes | No | Yes |
| **PATCH** | Partial update | No | No | Yes |
| **DELETE** | Remove resource | Yes | No | No |
| **HEAD** | Get headers only | Yes | Yes | No |
| **OPTIONS** | Get allowed methods | Yes | Yes | No |

### Method Details

#### GET - Retrieve Data
```http
GET /api/users/123 HTTP/1.1
Host: api.example.com
```
- Used for reading data
- Should not modify server state
- Can be cached and bookmarked

#### POST - Create Resource
```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"name": "John", "email": "john@example.com"}
```
- Creates new resources
- Not idempotent (multiple calls create multiple resources)
- Request body contains data

#### PUT - Replace Resource
```http
PUT /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"name": "John Updated", "email": "john@example.com"}
```
- Replaces entire resource
- Idempotent (same result for same request)

#### PATCH - Partial Update
```http
PATCH /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"name": "John Updated"}
```
- Updates specific fields only
- Not idempotent by specification

#### DELETE - Remove Resource
```http
DELETE /api/users/123 HTTP/1.1
Host: api.example.com
```
- Removes the specified resource
- Idempotent (deleting twice has same effect)

### Idempotency Explained
**Idempotent**: Making multiple identical requests has the same effect as making a single request.

```
GET /users/123     → Returns user (always same)
PUT /users/123     → Replaces user (same data = same result)
DELETE /users/123  → Deletes user (already deleted = still deleted)

POST /users        → Creates user (each call creates new user) - NOT idempotent
```

---

## 4. HTTP Status Codes

### Status Code Categories

| Range | Category | Description |
|-------|----------|-------------|
| 1xx | Informational | Request received, continuing process |
| 2xx | Success | Request successfully received and processed |
| 3xx | Redirection | Further action needed |
| 4xx | Client Error | Request contains bad syntax or cannot be fulfilled |
| 5xx | Server Error | Server failed to fulfill valid request |

### Common Status Codes

#### 2xx Success
| Code | Name | Usage |
|------|------|-------|
| 200 | OK | Standard success response |
| 201 | Created | Resource successfully created |
| 204 | No Content | Success but no body to return |
| 206 | Partial Content | Range request (video streaming) |

#### 3xx Redirection
| Code | Name | Usage |
|------|------|-------|
| 301 | Moved Permanently | URL permanently changed |
| 302 | Found | Temporary redirect |
| 304 | Not Modified | Use cached version |
| 307 | Temporary Redirect | Preserve method on redirect |
| 308 | Permanent Redirect | Preserve method, permanent |

#### 4xx Client Errors
| Code | Name | Usage |
|------|------|-------|
| 400 | Bad Request | Malformed request syntax |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Authenticated but not permitted |
| 404 | Not Found | Resource doesn't exist |
| 405 | Method Not Allowed | HTTP method not supported |
| 409 | Conflict | Request conflicts with current state |
| 422 | Unprocessable Entity | Validation errors |
| 429 | Too Many Requests | Rate limit exceeded |

#### 5xx Server Errors
| Code | Name | Usage |
|------|------|-------|
| 500 | Internal Server Error | Generic server error |
| 502 | Bad Gateway | Invalid response from upstream |
| 503 | Service Unavailable | Server temporarily overloaded |
| 504 | Gateway Timeout | Upstream server timed out |

---

## 5. HTTP Headers

### Common Request Headers

```http
GET /api/users HTTP/1.1
Host: api.example.com
Accept: application/json
Accept-Language: en-US
Accept-Encoding: gzip, deflate
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
User-Agent: Mozilla/5.0 (Windows NT 10.0)
Cache-Control: no-cache
Cookie: session_id=abc123
```

| Header | Purpose |
|--------|---------|
| Host | Target server hostname |
| Accept | Acceptable response formats |
| Authorization | Authentication credentials |
| Content-Type | Request body format |
| User-Agent | Client application info |
| Cache-Control | Caching directives |
| Cookie | Client cookies |

### Common Response Headers

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 1234
Cache-Control: max-age=3600
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Set-Cookie: session_id=xyz789; HttpOnly; Secure
Access-Control-Allow-Origin: *
X-RateLimit-Remaining: 99
```

| Header | Purpose |
|--------|---------|
| Content-Type | Response body format |
| Content-Length | Size of response body |
| Cache-Control | Caching instructions |
| ETag | Resource version identifier |
| Set-Cookie | Set cookies in browser |
| CORS Headers | Cross-origin permissions |

---

## 6. HTTPS and TLS

### What is HTTPS?
HTTPS (HTTP Secure) is HTTP over TLS (Transport Layer Security). It provides:

1. **Encryption**: Data cannot be read in transit
2. **Authentication**: Verify server identity
3. **Integrity**: Data cannot be modified in transit

### TLS Handshake Process

```
Client                                  Server
   │                                      │
   │────── ClientHello ──────────────────▶│
   │       (Supported cipher suites)      │
   │                                      │
   │◀───── ServerHello ───────────────────│
   │       (Selected cipher, Certificate) │
   │                                      │
   │────── Key Exchange ─────────────────▶│
   │       (Pre-master secret)            │
   │                                      │
   │◀───── Finished ──────────────────────│
   │                                      │
   │══════ Encrypted Data ═══════════════▶│
   │◀═════ Encrypted Data ════════════════│
```

### TLS Handshake Steps

1. **ClientHello**: Client sends supported TLS versions and cipher suites
2. **ServerHello**: Server selects cipher suite and sends certificate
3. **Certificate Verification**: Client verifies server's certificate
4. **Key Exchange**: Both parties generate session keys
5. **Finished**: Encrypted communication begins

### Certificate Chain of Trust

```
Root CA (Trusted by browsers)
    │
    └── Intermediate CA
            │
            └── Server Certificate (your-domain.com)
```

---

## 7. HTTP Evolution

### HTTP/1.0 vs HTTP/1.1 vs HTTP/2 vs HTTP/3

| Feature | HTTP/1.0 | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---------|----------|----------|--------|--------|
| Year | 1996 | 1997 | 2015 | 2022 |
| Connections | One per request | Persistent | Multiplexed | Multiplexed |
| Header Compression | No | No | HPACK | QPACK |
| Protocol | Text | Text | Binary | Binary |
| Transport | TCP | TCP | TCP | QUIC/UDP |
| Server Push | No | No | Yes | Yes |

### HTTP/1.1 Improvements
- **Persistent Connections**: Keep-alive by default
- **Pipelining**: Send multiple requests without waiting
- **Chunked Transfer**: Stream responses

### HTTP/2 Improvements
```
HTTP/1.1                          HTTP/2
┌─────────────────┐               ┌─────────────────┐
│ Request 1       │               │ Stream 1 │ S2  │
├─────────────────┤               ├──────────┼─────┤
│ Response 1      │               │ S1 │ Stream 2  │
├─────────────────┤   vs          ├────┼───────────┤
│ Request 2       │               │ S2 │ S1 │ S3   │
├─────────────────┤               └────┴────┴──────┘
│ Response 2      │               Single TCP Connection
└─────────────────┘               Multiple Streams
Multiple TCP Connections
```

- **Multiplexing**: Multiple requests over single connection
- **Header Compression**: HPACK algorithm reduces overhead
- **Binary Protocol**: More efficient parsing
- **Server Push**: Proactively send resources

### HTTP/3 with QUIC
- Built on **UDP** instead of TCP
- **0-RTT**: Faster connection establishment
- **Better Mobile Performance**: Handles network changes
- **Improved Loss Recovery**: Per-stream loss handling

---

## 8. Cookies and Sessions

### Cookies
Cookies are small pieces of data stored in the browser and sent with every request.

```http
# Server sets cookie
Set-Cookie: session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Strict

# Client sends cookie
Cookie: session_id=abc123
```

### Cookie Attributes

| Attribute | Purpose |
|-----------|---------|
| HttpOnly | Not accessible via JavaScript |
| Secure | Only sent over HTTPS |
| SameSite | Prevent CSRF attacks |
| Path | URL path scope |
| Domain | Domain scope |
| Expires/Max-Age | Cookie lifetime |

### Stateless Authentication (JWT)
```
┌────────┐     POST /login      ┌────────┐
│ Client │─────────────────────▶│ Server │
│        │                      │        │
│        │◀─────────────────────│        │
│        │     JWT Token        │        │
│        │                      │        │
│        │  GET /api (+ JWT)    │        │
│        │─────────────────────▶│        │
└────────┘                      └────────┘
```

---

## 9. HTTP in System Design

### Important Considerations

1. **Connection Pooling**: Reuse TCP connections
2. **Keep-Alive**: Maintain persistent connections
3. **Compression**: Use gzip/brotli for responses
4. **Caching**: Leverage Cache-Control headers
5. **CDN**: Distribute content globally

### HTTP Caching Strategy

```
┌────────┐     ┌─────────┐     ┌────────┐     ┌────────┐
│ Client │────▶│ Browser │────▶│  CDN   │────▶│ Origin │
│        │     │  Cache  │     │ Cache  │     │ Server │
└────────┘     └─────────┘     └────────┘     └────────┘
```

Cache-Control Examples:
```http
# Public cache for 1 hour
Cache-Control: public, max-age=3600

# Private cache for 5 minutes
Cache-Control: private, max-age=300

# No caching
Cache-Control: no-store

# Must revalidate
Cache-Control: must-revalidate
```

---

## 10. Summary

- HTTP is a stateless request-response protocol
- HTTP methods have specific semantics (GET, POST, PUT, DELETE)
- Status codes indicate request outcomes (2xx success, 4xx client errors, 5xx server errors)
- Headers carry metadata for requests and responses
- HTTPS adds encryption via TLS
- HTTP/2 and HTTP/3 improve performance with multiplexing
- Proper use of HTTP is fundamental to API and system design

---

## Further Reading
- [MDN Web Docs: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [HTTP/2 Specification](https://http2.github.io/)
- [HTTP/3 Explained](https://http3-explained.haxx.se/)
- [High Performance Browser Networking](https://hpbn.co/)
