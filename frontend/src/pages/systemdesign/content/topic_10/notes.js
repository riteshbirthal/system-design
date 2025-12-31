const notes = `
# API Gateways & Proxies

## Introduction to API Gateways

**Definition:** An API Gateway is a server that acts as a single entry point for a collection of microservices or backend services, handling routing, authentication, rate limiting, and more.

### Why API Gateways Matter
- **Single Entry Point**: Unified interface for all clients
- **Cross-Cutting Concerns**: Centralized auth, logging, rate limiting
- **Protocol Translation**: HTTP to gRPC, REST to GraphQL
- **Service Discovery**: Route to dynamic service instances
- **Client Simplification**: Hide internal service complexity

### Basic Architecture
\`\`\`
                    [API Gateway]
                   /      |      \\
            [Service A] [Service B] [Service C]
                   \\      |      /
                    [Database(s)]
\`\`\`

---

## Reverse Proxy Fundamentals

### Forward vs Reverse Proxy
\`\`\`
Forward Proxy (Client-Side):
[Client] → [Forward Proxy] → [Server]
Purpose: Client anonymity, filtering

Reverse Proxy (Server-Side):
[Client] → [Reverse Proxy] → [Server]
Purpose: Load balancing, security, caching
\`\`\`

### Reverse Proxy Capabilities
- Load balancing across servers
- SSL termination
- Caching static content
- Response compression
- Security (hide IPs, WAF, DDoS protection)
- Request buffering

---

## API Gateway vs Load Balancer vs Reverse Proxy

| Feature | Reverse Proxy | Load Balancer | API Gateway |
|---------|---------------|---------------|-------------|
| Primary Purpose | Request forwarding | Traffic distribution | API management |
| Authentication | Basic | No | Full (JWT, OAuth) |
| Rate Limiting | Basic | No | Advanced |
| Request Transform | Limited | No | Full |
| Service Discovery | No | Limited | Yes |
| API Versioning | No | No | Yes |

### When to Use Each
- **Reverse Proxy**: Simple web apps, SSL termination, caching
- **Load Balancer**: High availability, horizontal scaling
- **API Gateway**: Microservices, external APIs, complex auth

---

## Core API Gateway Features

### 1. Request Routing

**Path-Based:**
\`\`\`yaml
routes:
  - path: /api/v1/users/* → user-service
  - path: /api/v1/orders/* → order-service
\`\`\`

**Header-Based:**
\`\`\`yaml
routes:
  - headers: { X-API-Version: v2 } → service-v2
\`\`\`

### 2. Authentication & Authorization

**Methods:**
- API Keys: Simple key validation
- JWT: Token-based authentication
- OAuth 2.0: Third-party auth
- mTLS: Certificate-based

**JWT Validation Flow:**
\`\`\`
1. Extract token from Authorization header
2. Verify signature with public key
3. Check expiration (exp claim)
4. Validate issuer and audience
5. Forward to service with user context
\`\`\`

### 3. Rate Limiting

**Algorithms:**
- Fixed Window: Count per time window
- Sliding Window: Rolling count
- Token Bucket: Tokens replenished at fixed rate
- Leaky Bucket: Process at constant rate

**Response:**
\`\`\`http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
\`\`\`

### 4. Request/Response Transformation

- Add/remove/modify headers
- URL rewriting
- Body transformation
- Format conversion (XML to JSON)

### 5. Service Discovery

**Static:** Configured URLs
**Dynamic:** Query service registry (Consul, Kubernetes)

### 6. Circuit Breaker
\`\`\`
States:
CLOSED → Normal operation
OPEN → Requests fail fast
HALF-OPEN → Test requests for recovery
\`\`\`

### 7. Caching
\`\`\`yaml
cache:
  - path: /api/products/*
    ttl: 5m
    vary: [Authorization]
\`\`\`

---

## Popular API Gateway Solutions

| Solution | Type | Best For |
|----------|------|----------|
| Kong | Open Source | Plugin ecosystem, Kubernetes |
| AWS API Gateway | Managed | AWS workloads, Lambda |
| NGINX | High Performance | Custom logic, Lua |
| Envoy | Service Mesh | gRPC, maximum performance |
| Traefik | Cloud Native | Container environments |
| Apigee | Enterprise | Full API lifecycle |

### Kong
- Built on NGINX/OpenResty
- 100+ plugins
- Kong Ingress Controller for K8s

### AWS API Gateway
- REST, HTTP, WebSocket APIs
- Lambda integration
- Usage plans and API keys

### Envoy
- Service mesh data plane (Istio)
- gRPC native, dynamic config
- Advanced observability

---

## API Gateway Patterns

### 1. Edge Gateway Pattern
Single entry point at network edge for external security.

### 2. Gateway Aggregation Pattern
\`\`\`
Client: GET /api/user-dashboard

Gateway aggregates:
├── GET /users/123
├── GET /orders/user/123
└── GET /notifications/user/123

Returns: Combined response
\`\`\`
Reduces client roundtrips.

### 3. Gateway Offloading Pattern
Offload SSL, auth, rate limiting, CORS to gateway. Services focus on business logic.

### 4. Backends for Frontends (BFF)
\`\`\`
[Mobile] → [Mobile BFF Gateway]
[Web]    → [Web BFF Gateway]
[Partner]→ [Partner Gateway]
                    ↓
              [Services]
\`\`\`
Optimized responses per client type.

### 5. Sidecar Gateway Pattern
Per-service proxy (service mesh) for service-to-service communication with mTLS.

---

## Security Considerations

### Authentication Best Practices
- Use OAuth 2.0 / OIDC standards
- Short-lived tokens (15min access)
- Secure storage (HttpOnly cookies)
- Regular key rotation

### JWT Security
\`\`\`
DO:
- Validate signature, expiration, issuer
- Use strong algorithms (RS256, ES256)

DON'T:
- Use 'none' algorithm
- Store sensitive data in payload
- Trust client-provided algorithms
\`\`\`

### Input Validation
- Content-Type validation
- Request size limits
- JSON schema validation
- SQL injection / XSS pattern detection

### TLS Configuration
\`\`\`
- TLS 1.2+ only
- Strong cipher suites
- HSTS headers
- Certificate pinning (mobile)
\`\`\`

### CORS Configuration
\`\`\`yaml
cors:
  allowed_origins: [https://example.com]  # Not *
  allowed_methods: [GET, POST, PUT, DELETE]
  credentials: true
\`\`\`

---

## Performance Optimization

### Key Techniques
1. **Connection Pooling**: Reuse backend connections
2. **Caching**: Response and connection caching
3. **Compression**: gzip responses
4. **Request Collapsing**: Dedupe identical concurrent requests
5. **Async Processing**: 202 Accepted for long operations
6. **Timeout Configuration**: Per-route timeouts

### Load Balancing
\`\`\`yaml
load_balancing:
  algorithm: least_connections
  health_check:
    path: /health
    interval: 10s
\`\`\`

---

## Best Practices

### 1. Design for Failure
\`\`\`yaml
circuit_breaker: enabled
retry: 3 attempts, exponential backoff
fallback: default response on failure
\`\`\`

### 2. Version Your API
URL path versioning: /api/v1/users, /api/v2/users

### 3. Use Request IDs
Generate unique ID per request for distributed tracing.

### 4. Proper Logging
\`\`\`json
{
  "request_id": "abc-123",
  "method": "POST",
  "path": "/api/orders",
  "status": 201,
  "latency_ms": 45
}
\`\`\`

### 5. Health Endpoints
\`\`\`yaml
/health - Basic liveness
/ready - Full readiness with dependency checks
\`\`\`

### 6. Monitoring & Alerting
**Metrics:** Request rate, error rate, latency (p50/p95/p99)
**Alerts:** Error rate > 5%, P99 > 500ms, circuit breaker opened

---

## Quick Reference: Selection Guide

| Need | Solution |
|------|----------|
| Open source, plugins | Kong |
| AWS native/serverless | AWS API Gateway |
| Service mesh, gRPC | Envoy |
| High performance, Lua | NGINX |
| Container auto-discovery | Traefik |
| Enterprise lifecycle | Apigee |
`;

export default notes;
