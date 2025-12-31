const notes = `
# Architecture Patterns & Best Practices

## Common Architecture Patterns

### 1. Layered Architecture
\`\`\`
[Presentation Layer]  - UI, API
        ↓
[Business Logic Layer] - Services
        ↓
[Data Access Layer]   - Repositories
        ↓
[Database]
\`\`\`

**Pros**: Separation of concerns, testable
**Cons**: Can become monolithic, rigid

### 2. Event-Driven Architecture
\`\`\`
[Service A] → [Event Bus] → [Service B]
                        → [Service C]
\`\`\`

**Characteristics**:
- Loose coupling
- Asynchronous communication
- Event sourcing compatible

### 3. Microservices
Services organized by business capability, independently deployable.

### 4. Serverless
\`\`\`
[API Gateway] → [Lambda] → [DynamoDB]
                       → [S3]
\`\`\`

**Benefits**: No server management, auto-scaling, pay-per-use

---

## Data Patterns

### CQRS (Command Query Responsibility Segregation)
\`\`\`
Commands (Write) → [Write Model] → [Event Store]
                                        ↓
Queries (Read)  ← [Read Model]  ← [Projections]
\`\`\`

**Use when**: Different read/write patterns, need optimized read models

### Event Sourcing
Store events, not current state.
\`\`\`
Events:
1. OrderCreated {id: 1, items: [...]}
2. PaymentReceived {id: 1, amount: 100}
3. OrderShipped {id: 1, tracking: "XYZ"}

Current state = replay events
\`\`\`

### Saga Pattern
Manage distributed transactions.
\`\`\`
Order Saga:
1. Create Order
2. Reserve Inventory → If fail: Cancel Order
3. Process Payment → If fail: Release Inventory, Cancel Order
4. Confirm Order
\`\`\`

---

## Resilience Patterns

### Circuit Breaker
\`\`\`
States:
CLOSED → Normal, requests pass
OPEN → Failures exceeded, requests fail fast
HALF-OPEN → Test requests to check recovery
\`\`\`

### Retry with Backoff
\`\`\`
Attempt 1: Wait 1s
Attempt 2: Wait 2s
Attempt 3: Wait 4s
(Exponential backoff with jitter)
\`\`\`

### Bulkhead
Isolate failures by partitioning resources.
\`\`\`
[Service]
├── Thread Pool A (for payment calls)
└── Thread Pool B (for inventory calls)

Failure in A doesn't exhaust B's resources
\`\`\`

### Timeout
Always set timeouts on external calls.

---

## Scalability Patterns

### Horizontal Scaling
Add more servers behind load balancer.

### Vertical Scaling
Upgrade to bigger server (has limits).

### Database Scaling
\`\`\`
Read Replicas: Scale reads
Sharding: Scale writes
Caching: Reduce DB load
\`\`\`

### Caching Patterns
- Cache-Aside (Lazy Loading)
- Read-Through
- Write-Through
- Write-Behind

---

## Communication Patterns

### Synchronous
\`\`\`
REST: HTTP request/response
gRPC: Binary, efficient, streaming
\`\`\`

### Asynchronous
\`\`\`
Message Queue: Kafka, RabbitMQ
Event Bus: Pub/Sub
\`\`\`

### API Gateway
Single entry point for all clients.

### Service Mesh
Sidecar proxies handle service communication.

---

## Deployment Patterns

### Blue-Green Deployment
\`\`\`
[LB] → [Blue v1.0] (100%)
    → [Green v1.1] (0%)

Switch: Blue 0%, Green 100%
Rollback: Green 0%, Blue 100%
\`\`\`

### Canary Deployment
\`\`\`
[LB] → [v1.0] (95%)
    → [v1.1] (5%)

Gradually increase v1.1 percentage
\`\`\`

### Feature Flags
\`\`\`python
if feature_flag.is_enabled("new_checkout"):
    return new_checkout()
else:
    return old_checkout()
\`\`\`

---

## Data Management

### Database Selection

| Need | Database Type |
|------|---------------|
| Transactions, complex queries | PostgreSQL, MySQL |
| Flexible schema, documents | MongoDB |
| High write throughput | Cassandra |
| Caching, sessions | Redis |
| Search | Elasticsearch |
| Graph relationships | Neo4j |

### Consistency Patterns
- Strong consistency: All nodes see same data
- Eventual consistency: Will converge given time
- Causal consistency: Preserves cause-effect

---

## Security Patterns

### Defense in Depth
Multiple security layers.

### Zero Trust
Never trust, always verify.

### OAuth 2.0 / JWT
Token-based authentication.

### Rate Limiting
Prevent abuse.

---

## Observability

### Three Pillars
1. **Logs**: What happened
2. **Metrics**: How much/how fast
3. **Traces**: Where time spent

### Golden Signals
- Latency
- Traffic
- Errors
- Saturation

---

## Design Principles

### SOLID
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### CAP Theorem
Choose 2 of 3: Consistency, Availability, Partition Tolerance

### 12-Factor App
Best practices for cloud-native apps:
1. Codebase in version control
2. Explicit dependencies
3. Config in environment
4. Backing services as resources
5. Build, release, run stages
6. Stateless processes
7. Port binding
8. Concurrency via processes
9. Disposability
10. Dev/prod parity
11. Logs as event streams
12. Admin processes as one-offs

---

## Anti-Patterns to Avoid

### Distributed Monolith
Microservices that must be deployed together.

### Big Ball of Mud
No clear structure, everything depends on everything.

### God Service
One service doing too much.

### Chatty Communication
Too many small calls between services.

### Shared Database
Multiple services accessing same database.

---

## Quick Reference

### When to Use What

| Scenario | Pattern |
|----------|---------|
| Need reliability | Circuit breaker, retry |
| High read load | Caching, read replicas |
| Complex workflows | Saga pattern |
| Audit requirements | Event sourcing |
| Different read/write | CQRS |
| Gradual rollout | Canary, feature flags |
| External API exposure | API Gateway |
| Service communication | Service mesh |

### Key Questions for Design

1. What are the requirements?
2. What's the scale?
3. What's the read/write ratio?
4. What consistency is needed?
5. How critical is availability?
6. What's the latency requirement?
7. How do we handle failures?
`;

export default notes;
