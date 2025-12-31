const questions = [
  {
    question: "What is an API Gateway and why is it needed?",
    answer: "An API Gateway is a server acting as single entry point for backend services. It handles: routing requests to appropriate services, authentication/authorization, rate limiting, protocol translation, request/response transformation, logging/monitoring. Needed in microservices to: provide unified interface, centralize cross-cutting concerns, hide internal complexity, enable service evolution without client changes.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between a forward proxy and reverse proxy?",
    answer: "Forward Proxy: Sits in front of clients, forwards requests to internet. Used for: client anonymity, content filtering, caching. Client aware of proxy. Reverse Proxy: Sits in front of servers, receives requests from internet. Used for: load balancing, SSL termination, caching, security. Clients unaware of backend servers. API Gateway is a specialized reverse proxy.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between an API Gateway and a Load Balancer?",
    answer: "Load Balancer: Distributes traffic across servers, L4/L7, basic health checks, no auth/transformation. API Gateway: Application-layer (L7), handles auth (JWT, OAuth), rate limiting, request transformation, API versioning, service discovery, caching. Use LB for simple distribution; Gateway for API-specific features. Often used together: Gateway → LB → Services.",
    difficulty: "Medium"
  },
  {
    question: "What authentication methods do API Gateways support?",
    answer: "Common methods: API Keys (simple header validation), JWT (token-based, self-contained claims), OAuth 2.0 (third-party auth, access tokens), mTLS (certificate-based, mutual auth), Basic Auth (username/password, not recommended). Gateway validates credentials before forwarding to backend, offloading auth from services.",
    difficulty: "Easy"
  },
  {
    question: "How does JWT validation work at the API Gateway?",
    answer: "Steps: 1) Extract token from Authorization header (Bearer token). 2) Verify signature using public key/secret. 3) Check expiration (exp claim). 4) Validate issuer (iss) and audience (aud). 5) Check required claims/scopes. 6) Forward request with user context to backend. Reject with 401 if any validation fails. Gateway caches public keys.",
    difficulty: "Medium"
  },
  {
    question: "What rate limiting algorithms are used in API Gateways?",
    answer: "Fixed Window: Count requests per time window (e.g., 1000/min), simple but allows bursts at window edges. Sliding Window: Rolling count, smoother limiting. Token Bucket: Tokens added at fixed rate, allows bursts up to bucket size. Leaky Bucket: Process at constant rate, excess queued/dropped. Choose based on burst tolerance needs.",
    difficulty: "Medium"
  },
  {
    question: "What is the Circuit Breaker pattern in API Gateways?",
    answer: "Circuit Breaker prevents cascade failures. States: CLOSED (normal, requests pass), OPEN (failures exceeded threshold, requests fail fast), HALF-OPEN (test requests to check recovery). Config: failure threshold, timeout duration, test request count. Benefits: Fast failure response, allows service recovery, prevents resource exhaustion.",
    difficulty: "Medium"
  },
  {
    question: "Explain the Backends for Frontends (BFF) pattern.",
    answer: "BFF creates separate gateway/API for each client type (Mobile BFF, Web BFF, Partner BFF). Each BFF: optimizes responses for client needs, different response formats/aggregation, tailored security policies. Benefits: Client-specific optimization, independent evolution, reduced payload for mobile. Trade-off: More code to maintain.",
    difficulty: "Medium"
  },
  {
    question: "What is the Gateway Aggregation pattern?",
    answer: "Gateway combines multiple backend calls into single response. Example: GET /dashboard aggregates user profile + orders + notifications. Benefits: Reduce client roundtrips, optimize for high-latency networks (mobile), simplify client code. Implementation: Parallel backend calls, combine responses, handle partial failures. Common for mobile/dashboard APIs.",
    difficulty: "Medium"
  },
  {
    question: "Compare Kong, AWS API Gateway, and Envoy.",
    answer: "Kong: Open source, NGINX-based, rich plugin ecosystem, Kubernetes native. Best for: customization, on-prem/cloud. AWS API Gateway: Managed service, Lambda integration, usage plans. Best for: AWS workloads, serverless. Envoy: High-performance C++ proxy, service mesh data plane (Istio), gRPC native. Best for: service mesh, maximum performance. Choose based on deployment environment and requirements.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle API versioning at the Gateway?",
    answer: "Strategies: URL path (/v1/users, /v2/users) - clearest, recommended. Header (X-API-Version: 2) - cleaner URLs. Query param (?version=2) - least recommended. Gateway routes to different service versions based on version indicator. Best practices: Maintain backward compatibility, deprecation notices, version sunset policy.",
    difficulty: "Medium"
  },
  {
    question: "What is request/response transformation in API Gateways?",
    answer: "Request transformation: Add/modify headers (X-Request-ID), rewrite URLs, manipulate query params, body transformation. Response transformation: Remove sensitive headers, filter response fields, format conversion (XML to JSON), error standardization. Use cases: Legacy system integration, client format requirements, security (hiding internal details).",
    difficulty: "Medium"
  },
  {
    question: "How does service discovery work with API Gateways?",
    answer: "Static: Hardcoded service URLs in config. Dynamic: Gateway queries service registry (Consul, etcd, Kubernetes DNS) for current instances. Benefits: Auto-discovery of new instances, automatic removal of failed instances, no gateway restart for service changes. Integration: Kubernetes uses Service/Ingress, Consul via DNS/HTTP API.",
    difficulty: "Medium"
  },
  {
    question: "What security considerations are important for API Gateways?",
    answer: "Authentication: JWT/OAuth validation, API key management. Authorization: RBAC, scope-based permissions. Transport: TLS 1.2+, strong ciphers, HSTS. Input: Size limits, content-type validation, injection protection. Rate limiting: Prevent brute force, DDoS protection. CORS: Restrict origins, methods. Logging: Audit trail, no sensitive data. Key rotation and revocation.",
    difficulty: "Medium"
  },
  {
    question: "How do you optimize API Gateway performance?",
    answer: "Connection pooling: Reuse backend connections. Caching: Response cache with appropriate TTL. Compression: gzip responses. Request collapsing: Dedupe identical concurrent requests. Timeouts: Appropriate per-route timeouts. Load balancing: Distribute across gateway instances. Async: 202 Accepted for long operations. Monitor: Latency percentiles, throughput.",
    difficulty: "Medium"
  },
  {
    question: "What is the Gateway Offloading pattern?",
    answer: "Offload common functionality from services to gateway: SSL termination, authentication, rate limiting, CORS, logging/metrics, compression. Benefits: Services focus on business logic, consistent policy enforcement, single point for cross-cutting concerns. Services become simpler and lighter.",
    difficulty: "Easy"
  },
  {
    question: "How do you handle errors at the API Gateway?",
    answer: "Standardize error format: {\"error\": {\"code\": \"...\", \"message\": \"...\"}}. Map backend errors to appropriate HTTP status codes. Hide internal error details from clients. Circuit breaker for failing services. Fallback responses for non-critical failures. Retry with backoff for transient errors. Log full error for debugging, sanitized response to client.",
    difficulty: "Medium"
  },
  {
    question: "What is the Sidecar Gateway pattern?",
    answer: "Sidecar pattern deploys proxy alongside each service (service mesh). Each service has its own sidecar (Envoy) handling: service-to-service communication, mTLS encryption, load balancing, retries, circuit breaking, observability. Used by Istio, Linkerd. Benefits: Language-agnostic, consistent policies. Trade-off: Resource overhead per service.",
    difficulty: "Hard"
  },
  {
    question: "How do you implement request throttling at the Gateway?",
    answer: "Configuration: Limits per client (IP, API key, user), per endpoint, per time window. Implementation: Distributed counter (Redis) for multi-gateway. Response: 429 Too Many Requests with Retry-After header, X-RateLimit-* headers. Strategies: Quota by tier (free: 100/min, premium: 10000/min). Consider: Graceful degradation vs hard rejection.",
    difficulty: "Medium"
  },
  {
    question: "What metrics should you monitor for an API Gateway?",
    answer: "Request metrics: Rate (RPS), error rate (4xx, 5xx), latency (p50, p95, p99). Resource metrics: CPU, memory, connections. Backend metrics: Response time per service, availability. Security: Auth failures, rate limit hits. Alerts: Error rate > 5%, P99 > 500ms, circuit breaker open. Use: Prometheus + Grafana, DataDog, CloudWatch.",
    difficulty: "Medium"
  },
  {
    question: "How does an API Gateway differ from a Service Mesh?",
    answer: "API Gateway: Edge component, external traffic management, client-facing APIs, authentication, rate limiting. Service Mesh: Internal service-to-service communication, sidecar proxies, mTLS, observability, traffic management between services. Can coexist: Gateway for external (north-south), Mesh for internal (east-west). Gateway is L7 edge; Mesh is distributed L7 inside.",
    difficulty: "Hard"
  },
  {
    question: "How do you handle long-running operations at the Gateway?",
    answer: "Async pattern: 1) POST /operations → 202 Accepted, Location: /operations/123. 2) Client polls GET /operations/123. 3) Returns status until complete. Alternative: Webhooks - client provides callback URL. Gateway considerations: Don't block on long operations, use appropriate timeouts, consider WebSocket for real-time updates. Backend queues work for processing.",
    difficulty: "Medium"
  },
  {
    question: "What is CORS and how do you configure it at the Gateway?",
    answer: "CORS (Cross-Origin Resource Sharing): Browser security mechanism for cross-domain requests. Gateway config: allowed_origins (specific domains, not *), allowed_methods (GET, POST, etc.), allowed_headers (Content-Type, Authorization), credentials (cookies), max_age (preflight cache). Preflight: OPTIONS request for complex requests. Security: Restrict origins to known domains.",
    difficulty: "Medium"
  },
  {
    question: "How do you implement caching at the API Gateway?",
    answer: "Configuration: Cache key (path + query + headers), TTL per endpoint, max size, vary headers (Authorization). Implementation: GET requests only, respect Cache-Control headers, ETag/If-None-Match for validation. Invalidation: TTL expiry, manual purge, event-based. Benefits: Reduce backend load, improve latency. Caution: Don't cache user-specific data globally.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between Edge Gateway and Internal Gateway?",
    answer: "Edge Gateway: Internet-facing, handles external traffic. Focus: Authentication, rate limiting, DDoS protection, SSL termination, public API management. Internal Gateway: Between services, handles internal traffic. Focus: Service discovery, load balancing, circuit breaking, mTLS. Often different requirements: Edge needs stronger security, internal needs lower latency.",
    difficulty: "Medium"
  },
  {
    question: "How do you deploy and scale an API Gateway?",
    answer: "Deployment: Stateless design for horizontal scaling. Behind load balancer for HA. Kubernetes: Deployment with HPA. Scaling: Based on CPU, memory, request rate. Config: Externalized (ConfigMap, Consul). Health checks: Liveness and readiness probes. Blue-green/canary for updates. Multi-region: Deploy per region, global load balancer.",
    difficulty: "Hard"
  },
  {
    question: "What is request collapsing in API Gateways?",
    answer: "Request collapsing deduplicates identical concurrent requests. Multiple clients request same resource simultaneously → Gateway sends ONE request to backend → Same response returned to all. Benefits: Reduce backend load, handle thundering herd. Implementation: Cache in-flight requests by key. Use for: Expensive/slow endpoints, popular resources. Caution: Request timeout handling.",
    difficulty: "Hard"
  },
  {
    question: "How do you handle WebSocket connections at the Gateway?",
    answer: "Challenges: Long-lived connections, bidirectional, stateful. Requirements: Upgrade header handling, connection persistence, proper timeouts. Config: proxy_http_version 1.1, Upgrade header pass-through, Connection upgrade. Load balancing: Sticky sessions or connection-aware routing. Health: WebSocket ping/pong. Consider: AWS API Gateway WebSocket, Kong WebSocket plugin.",
    difficulty: "Hard"
  },
  {
    question: "What is the role of API Gateway in a microservices architecture?",
    answer: "Central role: Single entry point (simplify client), cross-cutting concerns (auth, logging), service abstraction (hide internal structure), protocol translation (external REST to internal gRPC), aggregation (reduce roundtrips). Decouples clients from services. Enables: Independent service evolution, centralized security, monitoring. Essential for external API exposure.",
    difficulty: "Medium"
  },
  {
    question: "How do you migrate from monolith to microservices using an API Gateway?",
    answer: "Strangler pattern with Gateway: 1) Deploy Gateway in front of monolith. 2) Route all traffic through Gateway. 3) Extract services incrementally. 4) Update Gateway routes: /users → new User Service. 5) Keep monolith for remaining functionality. 6) Gradually migrate until monolith empty. Benefits: Incremental, low risk, clients unaffected. Gateway enables transparent migration.",
    difficulty: "Hard"
  }
];

export default questions;
