const notes = `
# Load Balancing Techniques

## Introduction to Load Balancing

**Definition:** Load balancing distributes incoming network traffic across multiple servers to ensure no single server bears excessive demand, improving availability, responsiveness, and performance.

### Why Load Balancing Matters
- **Availability**: Eliminates single points of failure
- **Scalability**: Add/remove servers based on demand
- **Performance**: Faster responses through distributed load
- **Reliability**: Route traffic away from unhealthy servers
- **Flexibility**: Perform maintenance without downtime

### Basic Architecture
\`\`\`
                    [Load Balancer]
                    /      |      \\
                   /       |       \\
            [Server1] [Server2] [Server3]
                   \\       |       /
                    \\      |      /
                    [Database Pool]
\`\`\`

### Key Terminology

| Term | Description |
|------|-------------|
| Upstream/Backend | Servers receiving traffic from load balancer |
| Virtual IP (VIP) | IP address clients connect to, maps to multiple backends |
| Health Check | Periodic checks to verify server availability |
| Session Persistence | Routing same client to same server |
| Throughput | Data/requests processed per second |

---

## Types of Load Balancers

### 1. Hardware Load Balancers
Physical appliances dedicated to load balancing.

**Examples:** F5 BIG-IP, Citrix ADC, A10 Networks

**Characteristics:**
- Extremely high performance (millions of connections)
- Low latency, SSL acceleration, DDoS protection
- High cost ($10K-$100K+)
- Requires specialized expertise

### 2. Software Load Balancers
Applications running on standard servers or VMs.

**Examples:** NGINX, HAProxy, Traefik, Envoy

**Characteristics:**
- Flexible and configurable
- Cost-effective, runs anywhere
- Easier to automate
- Performance depends on hardware

### 3. Cloud Load Balancers
Managed services from cloud providers.

**Examples:**
- **AWS**: ALB (Layer 7), NLB (Layer 4)
- **GCP**: Cloud Load Balancing
- **Azure**: Azure Load Balancer, Application Gateway

**Characteristics:**
- Fully managed, auto-scaling
- Pay-per-use pricing
- Deep cloud integration

### 4. DNS Load Balancing
Distributes traffic by returning different IPs in DNS responses.

**Characteristics:**
- Simple implementation
- No single point of failure
- Limited control due to DNS caching

---

## Load Balancing Algorithms

### Static Algorithms

**1. Round Robin**
\`\`\`
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Request 4 → Server A (cycles back)
\`\`\`
- Simple and predictable
- Best for: equal-capacity stateless servers

**2. Weighted Round Robin**
\`\`\`
Weights: Server A=3, Server B=2, Server C=1
Distribution: A, A, A, B, B, C (repeats)
\`\`\`
- Accounts for server capacity differences

**3. IP Hash**
\`\`\`
hash(client_ip) % server_count = target server
\`\`\`
- Client always hits same server (implicit session persistence)
- Issues with NAT (many users → same server)

### Dynamic Algorithms

**4. Least Connections**
\`\`\`
Connections: Server A=50, B=30, C=45
Next request → Server B (lowest)
\`\`\`
- Adapts to real-time server load
- Better for varying request durations

**5. Weighted Least Connections**
\`\`\`
Calculation: connections / weight
Server A: 100/5 = 20, Server B: 50/2 = 25
Next request → Server A (lower ratio)
\`\`\`

**6. Least Response Time**
- Routes to server with fastest response
- Optimizes for user experience

**7. Random with Two Choices (Power of Two)**
- Pick two random servers
- Route to one with fewer connections
- Near-optimal load distribution with low overhead

### Algorithm Comparison

| Algorithm | Simplicity | Load-Aware | Session-Aware |
|-----------|------------|------------|---------------|
| Round Robin | High | No | No |
| Weighted Round Robin | High | Partial | No |
| Least Connections | Medium | Yes | No |
| IP Hash | High | No | Yes |
| Least Response Time | Low | Yes | No |
| Consistent Hashing | Low | No | Yes |

---

## Layer 4 vs Layer 7 Load Balancing

### Layer 4 (Transport Layer)

Routes based on network-level info (IP address, TCP/UDP port). Does not inspect packet content.

**Characteristics:**
- Very fast (minimal processing)
- Protocol agnostic
- Cannot make content-based decisions

**Use Cases:** Database load balancing, non-HTTP protocols, high-throughput needs

**Example:** AWS Network Load Balancer

### Layer 7 (Application Layer)

Routes based on request content (URLs, headers, cookies).

**Characteristics:**
- Content-aware routing
- SSL termination capability
- Request modification possible
- Higher latency than L4

**Use Cases:** Web apps, API routing, microservices, A/B testing

**Example:** AWS Application Load Balancer

### Comparison

| Feature | Layer 4 | Layer 7 |
|---------|---------|---------|
| Speed | Faster | Slower |
| Content Routing | No | Yes |
| SSL Termination | Passthrough | Yes |
| Protocol Support | Any TCP/UDP | HTTP/HTTPS/gRPC |
| Complexity | Lower | Higher |

---

## Health Checks and Monitoring

### Types of Health Checks

**1. TCP Health Check**
\`\`\`
Try TCP connection to server:port
Success = healthy, Failure = unhealthy
\`\`\`
Simple, low overhead, doesn't verify application health.

**2. HTTP Health Check**
\`\`\`
GET /health HTTP/1.1
Expected: HTTP 200 OK
\`\`\`
Verifies application is responding correctly.

**3. Deep Health Check**
\`\`\`
GET /health/deep
Returns: { "status": "healthy", "checks": {
    "database": true,
    "cache": true,
    "disk": true
}}
\`\`\`
Comprehensive but more expensive.

### Health Check Patterns

**Passive:** Monitor actual traffic responses
**Active:** Periodically probe servers with dedicated endpoint

### Configuration Example (HAProxy)
\`\`\`
backend http_back
    option httpchk GET /health
    http-check expect status 200
    server server1 192.168.1.1:80 check inter 5s fall 3 rise 2
\`\`\`

---

## Session Persistence (Sticky Sessions)

### Why Needed
- Stateful applications
- Shopping carts, authentication
- WebSocket connections
- In-memory session storage

### Methods

**1. Source IP Persistence**
- hash(client_ip) → server assignment
- Simple but NAT issues, mobile IP changes

**2. Cookie-Based Persistence**
\`\`\`
First request → Server A → Set-Cookie: SERVERID=srv-a
Subsequent → Cookie read → Route to Server A
\`\`\`

**3. URL Parameter Persistence**
- Session ID in URL: /page?sid=server-a

### Trade-offs

**Pros:** Enables stateful apps, simpler design, better per-server cache utilization

**Cons:** Uneven load, server failure loses session, scaling challenges

**Best Practice:** Design stateless applications. Store session state externally (Redis) when possible.

---

## SSL/TLS Termination

### Architectures

**1. SSL Termination (Offloading)**
\`\`\`
Client --[HTTPS]--> [LB] --[HTTP]--> Backend
                    ^decrypts
\`\`\`
- Reduces backend CPU load
- Centralized certificate management
- Traffic unencrypted internally

**2. SSL Passthrough**
\`\`\`
Client --[HTTPS]--> [LB] --[HTTPS]--> Backend
\`\`\`
- End-to-end encryption
- L4 only, no content inspection

**3. SSL Re-encryption**
\`\`\`
Client --[HTTPS]--> [LB] --[HTTPS]--> Backend
                    ^decrypt, inspect, re-encrypt
\`\`\`
- Full L7 capabilities with E2E encryption
- Most complex, double encryption overhead

---

## Global Server Load Balancing (GSLB)

Distributes traffic across multiple data centers or regions.

### Routing Strategies

**1. Geographic:** Route to nearest datacenter based on IP geolocation

**2. Latency-Based:** Route to datacenter with lowest latency

**3. Failover:** Primary → Secondary → Tertiary

**4. Weighted:** Distribute traffic by percentage (e.g., 70/30 split)

### Considerations
- DNS TTL affects failover time
- Health checks across regions
- Data replication between regions
- Active-active vs active-passive

---

## Popular Load Balancer Implementations

### NGINX
\`\`\`nginx
upstream backend {
    least_conn;
    server app1:8080 weight=3;
    server app2:8080 weight=2;
    server app3:8080 backup;
}
server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
\`\`\`

### HAProxy
\`\`\`
frontend http_front
    bind *:80
    default_backend http_back

backend http_back
    balance roundrobin
    server server1 192.168.1.1:80 check
    server server2 192.168.1.2:80 check
\`\`\`

### Others
- **Envoy:** Modern, cloud-native, service mesh ready
- **Traefik:** Kubernetes native, auto service discovery

---

## Best Practices

### 1. Design for Statelessness
Store session state externally (Redis) so any server can handle any request.

### 2. Implement Proper Health Checks
\`\`\`python
@app.get("/health")
def health_check():
    checks = {
        "database": check_db(),
        "cache": check_cache()
    }
    status = 200 if all(checks.values()) else 503
    return Response(status=status, body=checks)
\`\`\`

### 3. Graceful Shutdown
Allow in-flight requests to complete before removing server.

### 4. Connection Draining
\`\`\`
1. Stop sending new connections
2. Wait for existing to finish
3. Force close after timeout
4. Remove from pool
\`\`\`

### 5. Rate Limiting at Load Balancer
\`\`\`nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
location /api/ {
    limit_req zone=api burst=20 nodelay;
}
\`\`\`

### 6. Preserve Client IP
\`\`\`nginx
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
\`\`\`

### 7. Blue-Green Deployments
\`\`\`
[LB] → Blue (v1.0, 100%) 
     → Green (v1.1, 0%)
     
Deploy → Test Green → Shift traffic → Blue becomes standby
\`\`\`

### 8. Canary Deployments
\`\`\`nginx
upstream app {
    server app-v1:8080 weight=90;  # 90% old
    server app-v2:8080 weight=10;  # 10% new
}
\`\`\`

---

## Quick Reference: Algorithm Selection

| Scenario | Recommended Algorithm |
|----------|----------------------|
| Equal-capacity stateless servers | Round Robin |
| Varying request processing times | Least Connections |
| Need session persistence | IP Hash or Cookie |
| Different server capacities | Weighted algorithms |
| User experience critical | Least Response Time |
| Caching layer / minimal disruption | Consistent Hashing |
`;

export default notes;
