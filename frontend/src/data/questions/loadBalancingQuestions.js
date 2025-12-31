// Load Balancing Questions - Week 11
// Source: system_design_content/07_load_balancing/100_questions.txt

export const loadBalancingQuestions = [
  // Day 1: Fundamentals
  {
    id: 'lb-1',
    day: 1,
    difficulty: 'E',
    question: "What is load balancing and why is it important?",
    options: [
      "A database replication technique",
      "Distributing traffic across multiple servers to prevent overload and improve availability",
      "A caching strategy for web applications",
      "A security protocol for network traffic"
    ],
    correct: 1,
    explanation: "Load balancing distributes incoming network traffic across multiple servers to prevent any single server from becoming overwhelmed. It improves availability, performance, scalability, and reliability."
  },
  {
    id: 'lb-2',
    day: 1,
    difficulty: 'E',
    question: "What is a Virtual IP (VIP) in load balancing?",
    options: [
      "A fake IP address used for testing",
      "A single IP that clients connect to, mapping to multiple backend servers",
      "An encrypted IP address",
      "A temporary IP assigned during failover"
    ],
    correct: 1,
    explanation: "A Virtual IP is a single IP address that clients connect to, which maps to multiple backend servers. The load balancer owns this VIP and routes traffic to appropriate backend servers."
  },
  {
    id: 'lb-3',
    day: 1,
    difficulty: 'E',
    question: "What are the main components in a load balancing setup?",
    options: [
      "Only a load balancer and one server",
      "Load Balancer, Backend Servers, VIP, Health Check Mechanism, Configuration",
      "DNS server and firewall only",
      "Database and cache servers"
    ],
    correct: 1,
    explanation: "A load balancing setup includes: Load Balancer (distributes traffic), Backend/Upstream Servers (process requests), Virtual IP (single entry point), Health Check Mechanism (monitors server status), and Configuration/Rules."
  },
  {
    id: 'lb-4',
    day: 1,
    difficulty: 'E',
    question: "What happens if you don't use a load balancer for a high-traffic site?",
    options: [
      "Nothing, single servers can handle any load",
      "Server overload, no redundancy, poor user experience during traffic spikes",
      "Automatic scaling occurs",
      "Traffic is automatically distributed"
    ],
    correct: 1,
    explanation: "Without load balancing: single server becomes a bottleneck, server overload leads to crashes, no redundancy means downtime if server fails, cannot scale horizontally, and poor user experience during traffic spikes."
  },
  {
    id: 'lb-5',
    day: 1,
    difficulty: 'E',
    question: "What is connection draining?",
    options: [
      "Removing all connections immediately",
      "Allowing existing connections to complete before removing a server from the pool",
      "Draining database connections",
      "Clearing the connection cache"
    ],
    correct: 1,
    explanation: "Connection draining allows existing connections to complete before removing a server from the pool. New requests go to other servers while in-flight requests finish, enabling graceful server removal."
  },
  {
    id: 'lb-6',
    day: 1,
    difficulty: 'E',
    question: "What is a server pool in load balancing?",
    options: [
      "A swimming pool for servers",
      "A group of servers configured to receive traffic from the load balancer",
      "A backup storage system",
      "A database cluster"
    ],
    correct: 1,
    explanation: "A server pool (or backend pool) is a group of servers configured to receive traffic from the load balancer. The pool can be dynamically modified by adding or removing servers."
  },
  {
    id: 'lb-7',
    day: 1,
    difficulty: 'E',
    question: "What is throughput in load balancing context?",
    options: [
      "The speed of a single server",
      "The amount of data or requests the load balancer can process per unit time",
      "The number of servers in the pool",
      "The network bandwidth"
    ],
    correct: 1,
    explanation: "Throughput refers to the amount of data or number of requests that the load balancer can process per unit time (e.g., requests per second, Mbps). It's a key performance metric."
  },

  // Day 2: Layer 4 vs Layer 7
  {
    id: 'lb-8',
    day: 2,
    difficulty: 'M',
    question: "What is Layer 4 (L4) load balancing?",
    options: [
      "Load balancing based on application content",
      "Load balancing based on transport layer info (IP, TCP/UDP ports)",
      "DNS-based load balancing",
      "Load balancing at physical layer"
    ],
    correct: 1,
    explanation: "Layer 4 load balancing operates at the transport layer, making routing decisions based on IP addresses and TCP/UDP ports without inspecting packet content. It's faster but less intelligent."
  },
  {
    id: 'lb-9',
    day: 2,
    difficulty: 'M',
    question: "What is Layer 7 (L7) load balancing?",
    options: [
      "Load balancing at network layer",
      "Load balancing based on application layer data (HTTP headers, URL, cookies)",
      "Hardware-only load balancing",
      "Load balancing using IP addresses only"
    ],
    correct: 1,
    explanation: "Layer 7 load balancing operates at the application layer, making decisions based on HTTP headers, URL paths, cookies, and request content. It enables intelligent routing but adds latency."
  },
  {
    id: 'lb-10',
    day: 2,
    difficulty: 'M',
    question: "When would you choose L4 over L7 load balancing?",
    options: [
      "When you need content-based routing",
      "When you need maximum performance and simple TCP/UDP distribution",
      "When you need SSL termination",
      "When you need cookie-based session affinity"
    ],
    correct: 1,
    explanation: "Choose L4 when you need maximum performance, simple TCP/UDP distribution, low latency, or protocol-agnostic load balancing (gaming, databases, IoT)."
  },
  {
    id: 'lb-11',
    day: 2,
    difficulty: 'M',
    question: "What is DSR (Direct Server Return)?",
    options: [
      "A type of database replication",
      "Server responds directly to client bypassing load balancer",
      "A DNS configuration",
      "A security protocol"
    ],
    correct: 1,
    explanation: "In DSR mode, the load balancer only handles incoming requests while servers respond directly to clients, bypassing the load balancer. This reduces load balancer bandwidth requirements."
  },
  {
    id: 'lb-12',
    day: 2,
    difficulty: 'M',
    question: "What is the main advantage of L7 load balancing?",
    options: [
      "Lower latency",
      "Content-based routing and intelligent traffic management",
      "Simpler configuration",
      "No SSL overhead"
    ],
    correct: 1,
    explanation: "L7 provides content-based routing, SSL termination, compression, caching, request manipulation, and intelligent decisions based on application data. It's more feature-rich but adds processing overhead."
  },
  {
    id: 'lb-13',
    day: 2,
    difficulty: 'H',
    question: "Can you do SSL termination at Layer 4?",
    options: [
      "Yes, it's the default",
      "No, L4 doesn't inspect packet content, SSL termination requires L7",
      "Only with special hardware",
      "Only for HTTP traffic"
    ],
    correct: 1,
    explanation: "SSL termination requires decrypting traffic which means inspecting application data. L4 doesn't inspect content, so SSL termination requires L7 load balancing or dedicated SSL hardware."
  },

  // Day 3: Health Checks & Session Persistence
  {
    id: 'lb-14',
    day: 3,
    difficulty: 'E',
    question: "What is health checking in load balancing?",
    options: [
      "Checking employee health records",
      "Periodically testing servers to verify they can handle requests",
      "Monitoring network bandwidth",
      "Checking disk space"
    ],
    correct: 1,
    explanation: "Health checking involves periodically testing backend servers to verify they can handle requests. Failed health checks remove servers from the pool until they recover."
  },
  {
    id: 'lb-15',
    day: 3,
    difficulty: 'M',
    question: "What is active vs passive health checking?",
    options: [
      "Checking during day vs night",
      "Active: LB sends probes; Passive: LB monitors live traffic for failures",
      "Manual vs automatic checks",
      "TCP vs HTTP checks"
    ],
    correct: 1,
    explanation: "Active health checking sends periodic probes to servers. Passive health checking monitors actual traffic for failures. Active catches issues proactively; passive has no probe overhead."
  },
  {
    id: 'lb-16',
    day: 3,
    difficulty: 'M',
    question: "What is session persistence (sticky sessions)?",
    options: [
      "Keeping sessions in memory forever",
      "Routing a user's requests to the same backend server",
      "Encrypting session data",
      "Storing sessions in a database"
    ],
    correct: 1,
    explanation: "Session persistence ensures all requests from a user go to the same server. Implemented via cookies, IP hash, or application-controlled routing. Necessary when servers maintain session state."
  },
  {
    id: 'lb-17',
    day: 3,
    difficulty: 'M',
    question: "What are the downsides of sticky sessions?",
    options: [
      "No downsides, always use them",
      "Uneven load distribution, failover loses session, limits scaling",
      "Increased security",
      "Better performance"
    ],
    correct: 1,
    explanation: "Sticky sessions can cause uneven load distribution, session loss on server failure, limited horizontal scaling, and complicated failover. Prefer stateless design when possible."
  },
  {
    id: 'lb-18',
    day: 3,
    difficulty: 'M',
    question: "What is a deep health check?",
    options: [
      "A physical server inspection",
      "Testing end-to-end functionality including database and dependencies",
      "Checking server memory",
      "A security scan"
    ],
    correct: 1,
    explanation: "Deep health checks test end-to-end functionality: database connectivity, downstream services, authentication, critical business logic. More thorough than simple port/HTTP checks."
  },
  {
    id: 'lb-19',
    day: 3,
    difficulty: 'E',
    question: "What happens when a health check fails?",
    options: [
      "Nothing, traffic continues normally",
      "Server is removed from pool, traffic redirected to healthy servers",
      "Load balancer shuts down",
      "All servers are removed"
    ],
    correct: 1,
    explanation: "When health checks fail, the load balancer removes the unhealthy server from the pool and redirects traffic to remaining healthy servers. The server is re-added when it passes health checks again."
  },

  // Day 4: SSL/TLS & GSLB
  {
    id: 'lb-20',
    day: 4,
    difficulty: 'M',
    question: "What is SSL termination at load balancer?",
    options: [
      "Ending SSL support",
      "Decrypting HTTPS at the load balancer, forwarding HTTP to backends",
      "A security vulnerability",
      "Encrypting all traffic"
    ],
    correct: 1,
    explanation: "SSL termination decrypts HTTPS traffic at the load balancer, forwarding plain HTTP to backend servers. Benefits: reduced backend CPU load, centralized certificate management, easier debugging."
  },
  {
    id: 'lb-21',
    day: 4,
    difficulty: 'M',
    question: "What is SSL passthrough?",
    options: [
      "No encryption used",
      "Load balancer passes encrypted traffic directly to backend without decrypting",
      "Automatic SSL certificate generation",
      "SSL only for admin traffic"
    ],
    correct: 1,
    explanation: "SSL passthrough forwards encrypted traffic to backend servers without decryption. The backend handles SSL. Preserves end-to-end encryption but limits L7 features like content-based routing."
  },
  {
    id: 'lb-22',
    day: 4,
    difficulty: 'M',
    question: "What is GSLB (Global Server Load Balancing)?",
    options: [
      "Load balancing on a single server",
      "Distributing traffic across geographically distributed data centers",
      "A type of DNS server",
      "Load balancing within one data center"
    ],
    correct: 1,
    explanation: "GSLB distributes traffic across multiple data centers worldwide based on user location, server health, and capacity. Uses DNS-based routing to direct users to optimal regional deployment."
  },
  {
    id: 'lb-23',
    day: 4,
    difficulty: 'H',
    question: "What is GeoDNS in GSLB?",
    options: [
      "A geographic mapping service",
      "DNS that returns different IPs based on user's geographic location",
      "A satellite positioning system",
      "DNS caching"
    ],
    correct: 1,
    explanation: "GeoDNS returns different IP addresses based on the geographic location of the DNS query source. Users are directed to the nearest data center, reducing latency and improving user experience."
  },
  {
    id: 'lb-24',
    day: 4,
    difficulty: 'M',
    question: "What is SSL re-encryption?",
    options: [
      "Encrypting twice for security",
      "Decrypting at LB then re-encrypting when forwarding to backends",
      "Using two different certificates",
      "Rotating SSL certificates"
    ],
    correct: 1,
    explanation: "SSL re-encryption (SSL bridging) decrypts traffic at the load balancer for inspection/modification, then re-encrypts when forwarding to backends. Provides L7 features while maintaining backend encryption."
  },

  // Day 5: Implementations
  {
    id: 'lb-25',
    day: 5,
    difficulty: 'E',
    question: "Name three popular software load balancers.",
    options: [
      "MySQL, PostgreSQL, MongoDB",
      "NGINX, HAProxy, Traefik",
      "Apache, Tomcat, Jetty",
      "Redis, Memcached, Kafka"
    ],
    correct: 1,
    explanation: "Popular software load balancers include: NGINX (high-performance web server/reverse proxy), HAProxy (dedicated high-performance load balancer), and Traefik (modern, cloud-native with auto-discovery)."
  },
  {
    id: 'lb-26',
    day: 5,
    difficulty: 'M',
    question: "Compare NGINX and HAProxy.",
    options: [
      "They are identical",
      "NGINX: web server + LB; HAProxy: dedicated LB with superior pure LB performance",
      "HAProxy serves static files better",
      "NGINX is only for TCP"
    ],
    correct: 1,
    explanation: "NGINX is a web server + load balancer + reverse proxy, better for static content. HAProxy is a dedicated load balancer with superior pure load balancing performance, better health checks and monitoring."
  },
  {
    id: 'lb-27',
    day: 5,
    difficulty: 'M',
    question: "What is AWS Application Load Balancer (ALB)?",
    options: [
      "Layer 4 load balancer",
      "Layer 7 load balancer with path-based routing and container integration",
      "DNS service",
      "Content delivery network"
    ],
    correct: 1,
    explanation: "ALB is AWS's Layer 7 load balancer that routes HTTP/HTTPS traffic with path-based routing, host-based routing, WebSocket support, and integration with containers (ECS, EKS)."
  },
  {
    id: 'lb-28',
    day: 5,
    difficulty: 'M',
    question: "What is AWS Network Load Balancer (NLB)?",
    options: [
      "Application layer load balancer",
      "Layer 4 load balancer for ultra-low latency TCP/UDP traffic",
      "A firewall service",
      "A VPN service"
    ],
    correct: 1,
    explanation: "NLB is AWS's Layer 4 load balancer for TCP/UDP traffic. Features: ultra-low latency, millions of requests per second, static IP support, preserves source IP. Best for gaming, IoT, financial applications."
  },
  {
    id: 'lb-29',
    day: 5,
    difficulty: 'M',
    question: "What is Envoy proxy and why is it popular in microservices?",
    options: [
      "A database proxy",
      "Modern proxy designed for service mesh with advanced observability",
      "A simple reverse proxy",
      "A load testing tool"
    ],
    correct: 1,
    explanation: "Envoy is a modern, high-performance proxy designed for cloud-native applications. Popular for service mesh architecture, advanced observability, dynamic configuration via xDS APIs, and native gRPC support."
  },
  {
    id: 'lb-30',
    day: 5,
    difficulty: 'E',
    question: "What are the main types of load balancers?",
    options: [
      "Only hardware load balancers exist",
      "Hardware, Software, Cloud (managed), and DNS load balancers",
      "TCP and UDP load balancers only",
      "Internal and external only"
    ],
    correct: 1,
    explanation: "Main types: Hardware LB (physical appliances like F5), Software LB (NGINX, HAProxy), Cloud LB (managed services like AWS ELB), and DNS LB (DNS-based distribution)."
  },

  // Additional questions for variety
  {
    id: 'lb-31',
    day: 1,
    difficulty: 'M',
    question: "What is the Round Robin algorithm?",
    options: [
      "Random server selection",
      "Distributing requests sequentially to each server in order",
      "Sending all traffic to one server",
      "Selecting the fastest server"
    ],
    correct: 1,
    explanation: "Round Robin distributes requests sequentially to each server in order: Request 1 → Server A, Request 2 → Server B, Request 3 → Server C, then cycles back. Simple but doesn't consider server capacity."
  },
  {
    id: 'lb-32',
    day: 2,
    difficulty: 'M',
    question: "What is Least Connections algorithm?",
    options: [
      "Always picks the first server",
      "Routes requests to the server with fewest active connections",
      "Removes servers with connections",
      "Limits maximum connections"
    ],
    correct: 1,
    explanation: "Least Connections routes new requests to the server with fewest active connections. It adapts to actual server load and is better for varying request durations."
  },
  {
    id: 'lb-33',
    day: 3,
    difficulty: 'E',
    question: "What is the purpose of a health check endpoint like /health?",
    options: [
      "Display server specifications",
      "Allow load balancer to verify server is healthy and ready for traffic",
      "Show debug information",
      "Download health reports"
    ],
    correct: 1,
    explanation: "A health check endpoint allows the load balancer to verify the server is healthy and ready to receive traffic. It should return 200 OK when healthy and check critical dependencies."
  },
  {
    id: 'lb-34',
    day: 4,
    difficulty: 'H',
    question: "What is Anycast in global load balancing?",
    options: [
      "Broadcasting to all servers",
      "Same IP advertised from multiple locations, BGP routes to nearest",
      "Unicast to one server",
      "Multicast streaming"
    ],
    correct: 1,
    explanation: "Anycast advertises the same IP address from multiple geographic locations. BGP routing automatically directs users to the nearest location, providing automatic failover and geographic load distribution."
  },
  {
    id: 'lb-35',
    day: 5,
    difficulty: 'M',
    question: "When would you choose a cloud load balancer over software LB?",
    options: [
      "Never, software is always better",
      "When using cloud infrastructure, need managed service, auto-scaling, and cloud integration",
      "Only for small applications",
      "When cost is not a concern"
    ],
    correct: 1,
    explanation: "Choose cloud LB when already using cloud infrastructure, need managed service (no maintenance), auto-scaling is important, need integration with cloud services, or prefer pay-per-use pricing."
  }
];

export default loadBalancingQuestions;
