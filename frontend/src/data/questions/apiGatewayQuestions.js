// API Gateway & Proxies Questions - Week 13
// Source: system_design_content/10_api_gateways/100_questions.txt

export const apiGatewayQuestions = [
  // Day 1: Fundamentals
  {
    id: 'ag-1',
    day: 1,
    difficulty: 'E',
    question: "What is an API Gateway?",
    options: [
      "A database server",
      "Single entry point for microservices handling routing, auth, and cross-cutting concerns",
      "A programming language",
      "A testing tool"
    ],
    correct: 1,
    explanation: "An API Gateway is a server that acts as a single entry point for a collection of microservices. It handles routing, authentication, rate limiting, and other cross-cutting concerns."
  },
  {
    id: 'ag-2',
    day: 1,
    difficulty: 'E',
    question: "What is a reverse proxy?",
    options: [
      "A client-side proxy",
      "A server-side proxy that forwards requests to backend servers",
      "A VPN service",
      "A firewall"
    ],
    correct: 1,
    explanation: "A reverse proxy sits between clients and backend servers, forwarding client requests to appropriate servers. It provides load balancing, SSL termination, caching, and security."
  },
  {
    id: 'ag-3',
    day: 1,
    difficulty: 'E',
    question: "Why use an API Gateway in microservices?",
    options: [
      "To make systems slower",
      "Single entry point, centralized auth, rate limiting, and simplified client",
      "To replace databases",
      "For data storage"
    ],
    correct: 1,
    explanation: "API Gateway provides: single entry point, centralized authentication/authorization, rate limiting, request transformation, service discovery, monitoring, and reduces client complexity."
  },
  {
    id: 'ag-4',
    day: 1,
    difficulty: 'E',
    question: "What is request routing in API Gateway?",
    options: [
      "Random distribution",
      "Directing requests to appropriate services based on URL, headers, or method",
      "Caching requests",
      "Encrypting requests"
    ],
    correct: 1,
    explanation: "Request routing directs incoming requests to appropriate backend services based on: URL path (/users → User Service), HTTP method, headers (API version), or query parameters."
  },
  {
    id: 'ag-5',
    day: 1,
    difficulty: 'E',
    question: "What is SSL termination?",
    options: [
      "Ending SSL support",
      "Decrypting HTTPS at gateway and forwarding HTTP to backends",
      "A security vulnerability",
      "Encrypting all traffic"
    ],
    correct: 1,
    explanation: "SSL termination decrypts HTTPS traffic at the gateway instead of backend servers. Benefits: reduced CPU load on backends, centralized certificate management, simpler server configuration."
  },
  {
    id: 'ag-6',
    day: 1,
    difficulty: 'M',
    question: "What is the difference between forward proxy and reverse proxy?",
    options: [
      "They are identical",
      "Forward: client-side, hides client; Reverse: server-side, hides servers",
      "Forward is faster",
      "Reverse is for clients only"
    ],
    correct: 1,
    explanation: "Forward proxy sits client-side, hiding client identity (e.g., corporate proxy). Reverse proxy sits server-side, hiding server identity and providing load balancing, SSL termination."
  },
  {
    id: 'ag-7',
    day: 1,
    difficulty: 'E',
    question: "What are the main responsibilities of an API Gateway?",
    options: [
      "Only routing",
      "Routing, auth, rate limiting, load balancing, caching, logging, transformation",
      "Database management",
      "File storage"
    ],
    correct: 1,
    explanation: "API Gateway responsibilities: request routing, authentication/authorization, rate limiting, load balancing, caching, logging/monitoring, protocol transformation, and request/response modification."
  },

  // Day 2: Features
  {
    id: 'ag-8',
    day: 2,
    difficulty: 'M',
    question: "What is rate limiting?",
    options: [
      "Limiting data size",
      "Restricting number of requests a client can make in a time window",
      "Limiting server count",
      "Limiting user accounts"
    ],
    correct: 1,
    explanation: "Rate limiting restricts how many requests a client can make within a time window. Purpose: prevent abuse, protect backends, ensure fair usage, enforce API quotas. Example: 1000 req/min per API key."
  },
  {
    id: 'ag-9',
    day: 2,
    difficulty: 'M',
    question: "What is the token bucket rate limiting algorithm?",
    options: [
      "Fixed counter per window",
      "Tokens refill at fixed rate, each request consumes a token",
      "No limiting",
      "Random rejection"
    ],
    correct: 1,
    explanation: "Token bucket: tokens are added at a fixed rate. Each request consumes a token. If no tokens available, request is rejected or queued. Allows controlled bursts while maintaining average rate."
  },
  {
    id: 'ag-10',
    day: 2,
    difficulty: 'M',
    question: "What is a circuit breaker?",
    options: [
      "Electrical protection",
      "Pattern that stops routing to failing service after threshold failures",
      "Network switch",
      "Authentication mechanism"
    ],
    correct: 1,
    explanation: "Circuit breaker monitors failures and stops sending requests to a failing service after a threshold. States: Closed (normal), Open (fail fast), Half-Open (test). Prevents cascading failures."
  },
  {
    id: 'ag-11',
    day: 2,
    difficulty: 'M',
    question: "What is request transformation?",
    options: [
      "Encryption",
      "Modifying request headers, body, or URL before forwarding",
      "Caching",
      "Authentication"
    ],
    correct: 1,
    explanation: "Request transformation modifies the incoming request before routing: add/remove headers, rewrite URLs, transform body format, add correlation IDs, or convert between protocols."
  },
  {
    id: 'ag-12',
    day: 2,
    difficulty: 'M',
    question: "What is protocol translation?",
    options: [
      "Language translation",
      "Converting between protocols like REST to gRPC or SOAP to JSON",
      "DNS resolution",
      "SSL encryption"
    ],
    correct: 1,
    explanation: "Protocol translation converts between different protocols at the gateway: REST to gRPC, SOAP to JSON, HTTP/1.1 to HTTP/2. Allows legacy and modern systems to communicate."
  },
  {
    id: 'ag-13',
    day: 2,
    difficulty: 'M',
    question: "What is service discovery in gateway context?",
    options: [
      "Finding bugs",
      "Dynamically finding available backend service instances",
      "DNS lookup only",
      "Port scanning"
    ],
    correct: 1,
    explanation: "Service discovery allows the gateway to dynamically find and route to available service instances. Methods: DNS-based, service registry (Consul, etcd), Kubernetes services, or cloud-native solutions."
  },
  {
    id: 'ag-14',
    day: 2,
    difficulty: 'E',
    question: "What should be cached at the gateway?",
    options: [
      "User passwords",
      "GET requests, static responses, frequently accessed data",
      "POST requests",
      "All database queries"
    ],
    correct: 1,
    explanation: "Cache at gateway: GET requests, static responses, frequently accessed data. Use appropriate cache keys (URL + headers) and TTL. Don't cache sensitive or user-specific data without proper controls."
  },

  // Day 3: Patterns
  {
    id: 'ag-15',
    day: 3,
    difficulty: 'M',
    question: "What is the BFF (Backends for Frontends) pattern?",
    options: [
      "Best Friends Forever",
      "Separate API gateways optimized for each frontend type",
      "Backend-only architecture",
      "Single gateway for all"
    ],
    correct: 1,
    explanation: "BFF creates separate API gateways for each frontend type (mobile, web, partner). Each BFF is tailored to its client's needs with optimized payloads, aggregation, and formatting."
  },
  {
    id: 'ag-16',
    day: 3,
    difficulty: 'M',
    question: "What is gateway aggregation?",
    options: [
      "Load balancing",
      "Combining multiple service responses into one client response",
      "Request splitting",
      "Caching"
    ],
    correct: 1,
    explanation: "Gateway aggregation combines responses from multiple backend services into a single response for the client. Reduces client roundtrips, especially important for mobile with slow connections."
  },
  {
    id: 'ag-17',
    day: 3,
    difficulty: 'M',
    question: "What is gateway offloading?",
    options: [
      "Removing the gateway",
      "Moving cross-cutting concerns from services to gateway",
      "Load distribution",
      "Data migration"
    ],
    correct: 1,
    explanation: "Gateway offloading moves responsibilities from backend services to the gateway: SSL termination, authentication, logging, compression, CORS handling. Simplifies services and centralizes concerns."
  },
  {
    id: 'ag-18',
    day: 3,
    difficulty: 'M',
    question: "What is canary routing?",
    options: [
      "Bird watching API",
      "Routing small percentage of traffic to new version for testing",
      "Error routing",
      "Round robin"
    ],
    correct: 1,
    explanation: "Canary routing sends a small percentage of traffic (e.g., 5%) to a new version while the rest goes to stable version. Allows testing in production with real traffic before full rollout."
  },
  {
    id: 'ag-19',
    day: 3,
    difficulty: 'M',
    question: "What is A/B testing at the gateway?",
    options: [
      "Alphabet testing",
      "Routing users to different versions based on user/session for experimentation",
      "Load testing",
      "Security testing"
    ],
    correct: 1,
    explanation: "A/B testing at gateway routes users to different backend versions based on user attributes or session. Used for feature experimentation, measuring user engagement with different implementations."
  },
  {
    id: 'ag-20',
    day: 3,
    difficulty: 'H',
    question: "When to use multiple gateways?",
    options: [
      "Never use multiple",
      "BFF pattern, different teams/requirements, internal vs external APIs",
      "Always use multiple",
      "Only for testing"
    ],
    correct: 1,
    explanation: "Use multiple gateways for: BFF pattern (per frontend type), different team ownership, vastly different requirements (internal vs external APIs), security isolation, or independent scaling needs."
  },
  {
    id: 'ag-21',
    day: 3,
    difficulty: 'M',
    question: "What is shadow traffic routing?",
    options: [
      "Dark web routing",
      "Copying live traffic to new version without returning its response",
      "Encrypted routing",
      "Background processing"
    ],
    correct: 1,
    explanation: "Shadow traffic routing copies real production traffic to a new version for testing without returning its response. Allows load testing and validation with real traffic patterns without user impact."
  },

  // Day 4: Security
  {
    id: 'ag-22',
    day: 4,
    difficulty: 'M',
    question: "Why validate JWT at the gateway?",
    options: [
      "Storage",
      "Early rejection of invalid requests, offload auth from services",
      "Improve latency",
      "Database access"
    ],
    correct: 1,
    explanation: "Validating JWT at gateway rejects unauthorized requests early, reducing load on backend services. Centralized authentication simplifies services and ensures consistent security."
  },
  {
    id: 'ag-23',
    day: 4,
    difficulty: 'M',
    question: "What is CORS?",
    options: [
      "Code Optimization",
      "Cross-Origin Resource Sharing - browser security for cross-origin requests",
      "Cache system",
      "Routing protocol"
    ],
    correct: 1,
    explanation: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism controlling cross-origin HTTP requests. Gateway can centrally handle CORS headers (Access-Control-Allow-Origin, etc.)."
  },
  {
    id: 'ag-24',
    day: 4,
    difficulty: 'M',
    question: "What does WAF stand for?",
    options: [
      "Web Application Firewall - protects against web attacks",
      "Wide Area Format",
      "Wireless Access Function",
      "Web API Framework"
    ],
    correct: 0,
    explanation: "WAF (Web Application Firewall) protects against common web attacks like SQL injection, XSS, and CSRF. Often integrated with API gateway for centralized security."
  },
  {
    id: 'ag-25',
    day: 4,
    difficulty: 'M',
    question: "What is mTLS?",
    options: [
      "Message TLS",
      "Mutual TLS - both client and server verify certificates",
      "Multiple TLS",
      "Master TLS"
    ],
    correct: 1,
    explanation: "mTLS (Mutual TLS) requires both client and server to present and verify certificates. Used for service-to-service authentication, ensuring both parties are who they claim to be."
  },
  {
    id: 'ag-26',
    day: 4,
    difficulty: 'M',
    question: "What should gateway do with internal headers?",
    options: [
      "Forward all",
      "Strip internal/sensitive headers before forwarding to client",
      "Add more",
      "Ignore"
    ],
    correct: 1,
    explanation: "Gateway should strip internal or sensitive headers from responses before sending to clients. Prevents leaking internal service information, debug data, or security-sensitive details."
  },
  {
    id: 'ag-27',
    day: 4,
    difficulty: 'M',
    question: "What security headers should gateway add?",
    options: [
      "None needed",
      "HSTS, CSP, X-Content-Type-Options, X-Frame-Options",
      "Only authentication headers",
      "Cache headers only"
    ],
    correct: 1,
    explanation: "Security headers: Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Content-Type-Options (prevent MIME sniffing), X-Frame-Options (prevent clickjacking)."
  },
  {
    id: 'ag-28',
    day: 4,
    difficulty: 'H',
    question: "What CORS configuration should be avoided?",
    options: [
      "Whitelisting specific origins",
      "Access-Control-Allow-Origin: * with credentials",
      "Limited methods",
      "Restricted headers"
    ],
    correct: 1,
    explanation: "Avoid: Access-Control-Allow-Origin: * (wildcard) especially with credentials:true. Always whitelist specific origins, limit allowed methods and headers, and set appropriate max-age."
  },

  // Day 5: Implementations
  {
    id: 'ag-29',
    day: 5,
    difficulty: 'M',
    question: "What is Kong API Gateway known for?",
    options: [
      "Database only",
      "Rich plugin ecosystem built on NGINX with extensive features",
      "Mobile development",
      "Testing tool"
    ],
    correct: 1,
    explanation: "Kong is an open-source API gateway built on NGINX/OpenResty with a rich plugin ecosystem for auth, rate limiting, transformations. Features Admin API, K8s native support, and enterprise edition."
  },
  {
    id: 'ag-30',
    day: 5,
    difficulty: 'M',
    question: "When is AWS API Gateway the best choice?",
    options: [
      "On-premise only",
      "AWS-native workloads with Lambda integration",
      "Linux desktop",
      "Gaming only"
    ],
    correct: 1,
    explanation: "AWS API Gateway is ideal for AWS-native workloads, especially with Lambda for serverless. Fully managed, integrates with AWS services, supports REST, HTTP, and WebSocket APIs."
  },
  {
    id: 'ag-31',
    day: 5,
    difficulty: 'M',
    question: "What makes Envoy unique?",
    options: [
      "Oldest gateway",
      "Designed for service mesh as data plane with native observability",
      "Only for databases",
      "Windows only"
    ],
    correct: 1,
    explanation: "Envoy is a modern proxy designed as a service mesh data plane. Features: dynamic configuration via xDS APIs, native gRPC support, advanced observability, automatic retries, circuit breaking."
  },
  {
    id: 'ag-32',
    day: 5,
    difficulty: 'M',
    question: "What feature does Traefik excel at?",
    options: [
      "Manual configuration",
      "Automatic service discovery for containers and Kubernetes",
      "Mainframe integration",
      "Desktop apps"
    ],
    correct: 1,
    explanation: "Traefik excels at automatic service discovery for Docker, Kubernetes, and other orchestrators. Configuration is dynamic - services are automatically detected and routes created."
  },
  {
    id: 'ag-33',
    day: 5,
    difficulty: 'M',
    question: "Compare Kong vs AWS API Gateway.",
    options: [
      "Identical features",
      "Kong: self-hosted, plugins; AWS: managed, serverless integration",
      "AWS is always better",
      "Kong is only for small apps"
    ],
    correct: 1,
    explanation: "Kong: open-source, self-hosted, rich plugin ecosystem, platform-agnostic. AWS API Gateway: fully managed, serverless integration (Lambda), AWS-native, pay-per-use. Choose based on infrastructure."
  },
  {
    id: 'ag-34',
    day: 5,
    difficulty: 'E',
    question: "What are the types of AWS API Gateway APIs?",
    options: [
      "Only REST",
      "REST API, HTTP API, and WebSocket API",
      "GraphQL only",
      "SOAP only"
    ],
    correct: 1,
    explanation: "AWS API Gateway supports: REST API (full features, caching, WAF), HTTP API (lightweight, lower cost, JWT auth), and WebSocket API (real-time bidirectional communication)."
  },
  {
    id: 'ag-35',
    day: 5,
    difficulty: 'M',
    question: "Key considerations when choosing an API Gateway?",
    options: [
      "Only cost matters",
      "Managed vs self-hosted, vendor lock-in, team expertise, integration needs",
      "Only performance",
      "Only features"
    ],
    correct: 1,
    explanation: "Consider: managed vs self-hosted operational cost, vendor lock-in concerns, team expertise, integration requirements with existing infrastructure, performance needs, and feature requirements."
  }
];

export default apiGatewayQuestions;
