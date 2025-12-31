const questions = [
  {
    question: "What is load balancing and why is it important?",
    answer: "Load balancing distributes incoming network traffic across multiple servers to prevent any single server from being overwhelmed. It's important for: Availability (no single point of failure), Scalability (add/remove servers based on demand), Performance (faster responses through distributed load), Reliability (route traffic away from unhealthy servers), and Flexibility (perform maintenance without downtime).",
    difficulty: "Easy"
  },
  {
    question: "What are the different types of load balancers?",
    answer: "Four main types: 1) Hardware Load Balancers - physical appliances (F5, Citrix), very high performance but expensive. 2) Software Load Balancers - applications like NGINX, HAProxy; flexible and cost-effective. 3) Cloud Load Balancers - managed services (AWS ALB/NLB, GCP, Azure); auto-scaling, pay-per-use. 4) DNS Load Balancing - returns different IPs in DNS responses; simple but limited control due to caching.",
    difficulty: "Easy"
  },
  {
    question: "Explain the Round Robin load balancing algorithm.",
    answer: "Round Robin distributes requests sequentially across servers in order: Request 1 → Server A, Request 2 → Server B, Request 3 → Server C, then cycles back to A. Pros: Simple, predictable, even distribution for equal servers. Cons: Ignores server capacity and current load. Best for stateless applications with servers of equal capacity.",
    difficulty: "Easy"
  },
  {
    question: "What is the Least Connections algorithm?",
    answer: "Least Connections routes new requests to the server with the fewest active connections. Example: If Server A has 50 connections, B has 30, C has 45, the next request goes to B. Pros: Adapts to real-time load, better for varying request durations. Cons: Requires connection tracking overhead. Best for long-lived connections or when processing time varies significantly.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between Layer 4 and Layer 7 load balancing?",
    answer: "Layer 4 (Transport): Routes based on IP/port, doesn't inspect content, very fast, protocol agnostic. Example: AWS NLB. Layer 7 (Application): Routes based on request content (URLs, headers, cookies), can terminate SSL, modify requests, slower but more intelligent. Example: AWS ALB. Use L4 for databases/non-HTTP; L7 for web apps, API routing, A/B testing.",
    difficulty: "Medium"
  },
  {
    question: "What is IP Hash load balancing and when would you use it?",
    answer: "IP Hash computes hash(client_ip) % server_count to determine target server. Same client IP always goes to same server. Use cases: Session persistence without cookies, caching servers. Problems: NAT causes many users to hit same server, mobile clients with changing IPs get routed to different servers. Alternative: Cookie-based persistence for more reliable session affinity.",
    difficulty: "Medium"
  },
  {
    question: "What is Consistent Hashing and why is it useful for load balancing?",
    answer: "Consistent Hashing arranges servers on a hash ring; keys map to nearest server clockwise. When adding/removing servers, only neighboring keys are affected (minimal redistribution). Use cases: Distributed caches (Redis Cluster), database sharding proxies. Benefits: Minimizes cache invalidation on scale events, predictable routing. Often uses virtual nodes for better load distribution.",
    difficulty: "Hard"
  },
  {
    question: "What are health checks and what types exist?",
    answer: "Health checks verify server availability. Types: 1) TCP - try TCP connection, simple but doesn't verify app health. 2) HTTP - GET /health expecting 200 OK, verifies app responds. 3) Deep - checks DB, cache, disk; comprehensive but expensive. Patterns: Passive (monitor actual traffic) vs Active (periodic probes). Configure interval, fall threshold (failures before marking down), rise threshold (successes to mark up).",
    difficulty: "Medium"
  },
  {
    question: "What is session persistence (sticky sessions) and what are its trade-offs?",
    answer: "Session persistence routes all requests from a client to the same server. Methods: Source IP (hash-based), Cookie-based (server ID in cookie), URL parameter. Pros: Enables stateful apps, simpler design, better per-server cache. Cons: Uneven load distribution, server failure loses sessions, scaling challenges. Best practice: Design stateless apps with external session storage (Redis) instead.",
    difficulty: "Medium"
  },
  {
    question: "Explain SSL termination vs SSL passthrough.",
    answer: "SSL Termination: Load balancer decrypts HTTPS, sends HTTP to backends. Pros: Reduces backend CPU, centralized cert management, enables L7 features. Cons: Internal traffic unencrypted. SSL Passthrough: Encrypted traffic passes through unchanged to backend. Pros: End-to-end encryption. Cons: L4 only, no content inspection, certs on each backend. SSL Re-encryption: Decrypt at LB, re-encrypt to backend - best of both but double overhead.",
    difficulty: "Medium"
  },
  {
    question: "What is Global Server Load Balancing (GSLB)?",
    answer: "GSLB distributes traffic across multiple data centers/regions. Usually DNS-based. Routing strategies: Geographic (nearest DC by IP geolocation), Latency-based (fastest DC), Failover (primary → secondary), Weighted (percentage split for rollouts). Considerations: DNS TTL affects failover speed, need cross-region health checks, data replication between regions. Examples: AWS Route 53, Cloudflare.",
    difficulty: "Medium"
  },
  {
    question: "How do you implement a health check endpoint?",
    answer: "Basic: Return 200 OK if app running. Better approach: Check dependencies (DB, cache, external services) and return aggregated status. Return 200 if all healthy, 503 if any critical check fails. Include details in response body. Don't make health checks too expensive (avoid heavy queries). Consider separate liveness (is app running) vs readiness (can app serve traffic) endpoints for Kubernetes.",
    difficulty: "Medium"
  },
  {
    question: "What is connection draining and why is it important?",
    answer: "Connection draining gracefully removes servers from the pool: 1) Stop sending new connections, 2) Wait for existing connections to complete, 3) Force close remaining after timeout, 4) Remove from pool. Important for: Zero-downtime deployments, maintenance windows, auto-scaling down. Without it, active requests would fail when server is removed. Configure appropriate drain timeout based on typical request duration.",
    difficulty: "Medium"
  },
  {
    question: "Compare NGINX vs HAProxy for load balancing.",
    answer: "NGINX: Web server + reverse proxy + LB. Good for: Static content, SSL termination, caching. Config in server blocks. HAProxy: Dedicated high-performance LB. Good for: Pure load balancing, detailed stats, advanced health checks. More LB algorithms, better for TCP. Both support L4 and L7, active health checks, WebSockets. HAProxy often preferred for complex LB; NGINX when also serving static content.",
    difficulty: "Medium"
  },
  {
    question: "How would you implement blue-green deployments with a load balancer?",
    answer: "Setup: Two identical environments (Blue=current, Green=new). Process: 1) Deploy new version to Green, 2) Test Green thoroughly, 3) Switch LB to route traffic from Blue to Green, 4) Blue becomes standby for rollback. Implementation: Update upstream config or use weighted routing (100/0 to 0/100). Benefits: Instant rollback, zero-downtime deploys, full testing before production traffic.",
    difficulty: "Medium"
  },
  {
    question: "What is canary deployment and how does a load balancer support it?",
    answer: "Canary deployment gradually rolls out changes to a small subset of users first. Load balancer implementation: Use weighted routing (e.g., 95% to v1, 5% to v2). Monitor error rates and latency. Gradually increase new version weight. Rollback by setting new version weight to 0. Benefits: Reduces blast radius of bugs, validates changes with real traffic, enables A/B testing.",
    difficulty: "Medium"
  },
  {
    question: "How do you preserve client IP when using a load balancer?",
    answer: "Problem: Backend sees LB's IP, not client's IP. Solutions: 1) X-Forwarded-For header - LB adds client IP to header, backend reads it. 2) X-Real-IP header - single IP value. 3) PROXY protocol - for L4/TCP, prepends connection info. Configuration: proxy_set_header X-Real-IP $remote_addr; Backend must trust and parse these headers. Security: Only trust from known LBs to prevent spoofing.",
    difficulty: "Medium"
  },
  {
    question: "What is the 'thundering herd' problem in load balancing?",
    answer: "When a server comes back online or cache expires, many requests simultaneously hit it, potentially overwhelming it. Solutions: 1) Gradual traffic increase - slowly add server back to pool. 2) Circuit breaker - limit concurrent requests. 3) Request coalescing - batch identical requests. 4) Jitter - randomize retry/refresh times. 5) Health check before adding to pool. Related to cache stampede problem.",
    difficulty: "Hard"
  },
  {
    question: "How would you configure rate limiting at the load balancer level?",
    answer: "Purpose: Protect backends from abuse, ensure fair usage. NGINX example: limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s; location /api { limit_req zone=api burst=20 nodelay; }. Parameters: Rate (requests/second), Burst (allow temporary spikes), Zone (shared memory for tracking). Key selection: By IP, API key, user ID. Return 429 Too Many Requests when exceeded.",
    difficulty: "Medium"
  },
  {
    question: "What factors should you consider when choosing a load balancing algorithm?",
    answer: "Consider: 1) Server homogeneity - equal capacity → Round Robin; different → Weighted. 2) Request duration - varies → Least Connections. 3) Session requirements - sticky sessions → IP Hash or Cookie. 4) Protocol - HTTP → L7 algorithms; TCP → L4. 5) Performance priority - fastest response → Least Response Time. 6) Caching - Consistent Hashing minimizes cache invalidation. 7) Simplicity vs optimization trade-off.",
    difficulty: "Medium"
  },
  {
    question: "How do load balancers handle WebSocket connections?",
    answer: "WebSocket challenges: Long-lived connections, stateful, upgrade from HTTP. Requirements: 1) L7 LB must support connection upgrade (HTTP → WebSocket). 2) Sticky sessions often needed for reconnection. 3) Longer timeouts configured. 4) Health checks shouldn't close WS connections. NGINX config: proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'. Consider using L4 for simpler passthrough.",
    difficulty: "Hard"
  },
  {
    question: "What is the difference between active-active and active-passive load balancing?",
    answer: "Active-Active: All nodes handle traffic simultaneously. Benefits: Full resource utilization, better performance. Challenges: Data synchronization, conflict resolution. Active-Passive: Only primary handles traffic; secondary is standby. Benefits: Simpler, no sync issues. Challenges: Resource waste, failover delay. Use active-active for high availability and performance; active-passive for disaster recovery with simpler consistency requirements.",
    difficulty: "Medium"
  },
  {
    question: "How would you design load balancing for a microservices architecture?",
    answer: "Approaches: 1) API Gateway - single entry point, routes to services. 2) Service Mesh (Istio/Envoy) - sidecar proxies handle LB, circuit breaking, retries. 3) Client-side LB - service discovery + client makes routing decision. Patterns: L7 for HTTP services, L4 for databases. Health checks per service. Consider: Service discovery integration, retry policies, circuit breakers, distributed tracing. Kubernetes uses kube-proxy + Ingress.",
    difficulty: "Hard"
  },
  {
    question: "What is a service mesh and how does it relate to load balancing?",
    answer: "Service mesh is infrastructure layer for service-to-service communication. Components: Data plane (Envoy sidecars) + Control plane (Istio, Linkerd). Load balancing features: Client-side LB with multiple algorithms, automatic retries, circuit breaking, traffic splitting for canary. Additional features: mTLS, distributed tracing, observability. Benefits: Offloads networking concerns from application code. Used in Kubernetes microservices environments.",
    difficulty: "Hard"
  },
  {
    question: "How do you handle load balancer failover and high availability?",
    answer: "Strategies: 1) Active-passive pair - VRRP/keepalived for IP failover, heartbeat monitoring. 2) DNS failover - multiple IPs, remove unhealthy. 3) Cloud managed - built-in HA (AWS ALB spans AZs). 4) Anycast - same IP announced from multiple locations. Considerations: Shared state (session data, config), failover time, split-brain prevention, health monitoring of LB itself. Test failover regularly.",
    difficulty: "Hard"
  },
  {
    question: "Explain the Weighted Least Connections algorithm.",
    answer: "Combines server weights with current connections. Formula: score = active_connections / weight. Server with lowest score gets next request. Example: Server A (100 connections, weight 5) = 20, Server B (50 connections, weight 2) = 25. Next request → A. Benefits: Accounts for both server capacity and current load. Use when: Heterogeneous servers with varying request durations. More accurate than either Weighted Round Robin or plain Least Connections alone.",
    difficulty: "Medium"
  },
  {
    question: "What is an API Gateway and how does it differ from a load balancer?",
    answer: "API Gateway: Application-layer entry point for APIs. Features beyond LB: Authentication/authorization, rate limiting, request transformation, API versioning, caching, analytics. Load Balancer: Distributes traffic across servers, health checks, basic routing. API Gateway often sits in front of LB or includes LB functionality. Examples: Kong, AWS API Gateway, Apigee. Use API Gateway for API management; LB for traffic distribution.",
    difficulty: "Medium"
  },
  {
    question: "How would you monitor and troubleshoot load balancer issues?",
    answer: "Key metrics: Request rate (RPS), Error rate (4xx/5xx), Latency (p50/p95/p99), Active connections, Backend health status, Connection queue length. Tools: Built-in stats (HAProxy stats page), Prometheus + Grafana, cloud provider metrics. Common issues: Uneven distribution (check algorithm), High latency (backend slow, connection limits), 502/503 errors (backend unhealthy). Access logs for debugging specific requests.",
    difficulty: "Medium"
  },
  {
    question: "What is the 'Power of Two Random Choices' algorithm?",
    answer: "Algorithm: Pick two servers randomly, route to the one with fewer connections. Research shows this significantly outperforms single random selection and approaches optimal load distribution. Benefits: Low overhead (no global state needed), good distribution, simple to implement. Used in: Modern load balancers, service meshes. Variants: Can consider other metrics like response time instead of connections.",
    difficulty: "Hard"
  },
  {
    question: "How do you handle database load balancing differently from web server load balancing?",
    answer: "Differences: 1) Protocol - TCP/L4 vs HTTP/L7. 2) Consistency - read replicas for reads, primary for writes (read-write splitting). 3) Connection pooling - databases have connection limits. 4) Sticky connections - transactions may need same connection. 5) Health checks - query-based (SELECT 1) vs HTTP. Tools: ProxySQL (MySQL), PgBouncer (PostgreSQL), or app-level routing. Consider: Replication lag for read replicas, failover handling.",
    difficulty: "Hard"
  }
];

export default questions;
