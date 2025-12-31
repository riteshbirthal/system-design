const notes = `
# Microservices vs Monoliths

## Introduction

### Monolithic Architecture
A single deployable unit containing all application functionality.

\`\`\`
[Monolith Application]
├── User Module
├── Order Module
├── Payment Module
├── Inventory Module
└── Notification Module
        ↓
   [Single Database]
\`\`\`

### Microservices Architecture
Application decomposed into small, independent services.

\`\`\`
[API Gateway]
    ├── [User Service] → [User DB]
    ├── [Order Service] → [Order DB]
    ├── [Payment Service] → [Payment DB]
    └── [Notification Service] → [Message Queue]
\`\`\`

---

## Monolith Characteristics

### Advantages
- **Simple Development**: Single codebase, easy to understand
- **Easy Deployment**: One artifact to deploy
- **Simple Testing**: End-to-end testing straightforward
- **Low Latency**: In-process calls, no network overhead
- **Simple Debugging**: Single process, easy stack traces

### Disadvantages
- **Scaling Limitations**: Must scale entire application
- **Technology Lock-in**: One stack for everything
- **Deployment Risk**: Any change redeploys everything
- **Team Coupling**: Teams step on each other's toes
- **Growing Complexity**: Becomes "big ball of mud"

---

## Microservices Characteristics

### Advantages
- **Independent Scaling**: Scale services individually
- **Technology Freedom**: Best tool per service
- **Independent Deployment**: Deploy services separately
- **Team Autonomy**: Teams own their services
- **Fault Isolation**: Failure in one service doesn't crash all
- **Easier to Understand**: Small, focused codebases

### Disadvantages
- **Distributed Complexity**: Network failures, latency
- **Data Consistency**: No ACID across services
- **Operational Overhead**: Many services to manage
- **Testing Complexity**: Integration testing harder
- **Network Latency**: Service-to-service calls

---

## Comparison

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| Deployment | Single unit | Independent services |
| Scaling | Vertical/whole app | Horizontal/per service |
| Technology | Single stack | Polyglot |
| Data | Single database | Database per service |
| Communication | In-process | Network (HTTP, gRPC) |
| Team Structure | Centralized | Decentralized |
| Complexity | Simple start, complex later | Complex start, manageable later |

---

## When to Use Each

### Choose Monolith When
- Early-stage startup (MVP)
- Small team (<10 developers)
- Simple domain
- Need to move fast
- Limited DevOps capability

### Choose Microservices When
- Large, complex domain
- Multiple teams
- Need independent scaling
- Different technology needs
- High availability requirements

---

## Microservices Design Principles

### 1. Single Responsibility
Each service does one thing well.

### 2. Domain-Driven Design
Services aligned with business domains (bounded contexts).

### 3. Database per Service
\`\`\`
[Order Service] → [Order DB]
[User Service] → [User DB]
No direct database access between services
\`\`\`

### 4. API-First
Well-defined contracts between services.

### 5. Decentralized Governance
Teams choose their own technology stack.

---

## Communication Patterns

### Synchronous
\`\`\`
[Service A] --HTTP/gRPC--> [Service B]
Wait for response
\`\`\`
- REST APIs
- gRPC
- Direct service calls

### Asynchronous
\`\`\`
[Service A] --> [Message Queue] --> [Service B]
Fire and forget
\`\`\`
- Message queues (Kafka, RabbitMQ)
- Event-driven architecture
- Pub/Sub patterns

---

## Service Discovery

### Client-Side Discovery
\`\`\`
[Client] --> [Service Registry] --> Get instances
[Client] --> [Service Instance]
\`\`\`

### Server-Side Discovery
\`\`\`
[Client] --> [Load Balancer] --> [Service Registry]
                             --> [Service Instance]
\`\`\`

### Tools
- Consul, etcd, ZooKeeper
- Kubernetes DNS
- AWS Service Discovery

---

## Data Management

### Saga Pattern
For distributed transactions across services.
\`\`\`
Order Saga:
1. Create Order → 2. Reserve Inventory → 3. Process Payment
If step 3 fails: Compensate 2, Compensate 1
\`\`\`

### Event Sourcing
Store events, not current state.

### CQRS
Separate read and write models.

---

## Decomposition Strategies

### By Business Capability
- User Management Service
- Order Management Service
- Inventory Service

### By Subdomain (DDD)
- Core domain (competitive advantage)
- Supporting domain
- Generic domain

### Strangler Pattern
Gradually replace monolith pieces.
\`\`\`
[Old Monolith] ←→ [API Gateway] ←→ [New Services]
Gradually route traffic to new services
\`\`\`

---

## Challenges and Solutions

### 1. Distributed Tracing
**Problem**: Hard to trace requests across services.
**Solution**: Correlation IDs, Jaeger, Zipkin

### 2. Configuration Management
**Problem**: Managing config across services.
**Solution**: Config servers (Spring Cloud Config), Consul

### 3. Service Mesh
**Problem**: Complex service-to-service communication.
**Solution**: Istio, Linkerd (sidecar proxies)

### 4. API Gateway
**Problem**: Client needs to know all services.
**Solution**: Single entry point (Kong, AWS API Gateway)

---

## Best Practices

1. **Start with Monolith** - Extract services as you learn domain
2. **Right-size Services** - Not too big, not too small
3. **Automate Everything** - CI/CD, testing, deployment
4. **Design for Failure** - Circuit breakers, retries, fallbacks
5. **Centralize Logging** - ELK stack, aggregated logs
6. **Monitor Everything** - Metrics, alerts, dashboards
7. **Document APIs** - OpenAPI/Swagger specs

---

## Quick Reference

| Scenario | Recommendation |
|----------|----------------|
| New startup, small team | Monolith |
| Proven domain, scaling needs | Microservices |
| Part of system needs different tech | Extract as service |
| Independent team ownership needed | Microservices |
| Simple CRUD application | Monolith |
`;

export default notes;
