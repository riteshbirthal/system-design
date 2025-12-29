# Week 5: Load Balancing & Message Queues

## Week Overview
This week covers load balancing techniques for distributing traffic and message queues for asynchronous communication - two essential components for building scalable distributed systems.

**Learning Objectives:**
- Understand load balancing algorithms and strategies
- Learn about different load balancer types (L4 vs L7)
- Master message queue concepts and patterns
- Understand when to use synchronous vs asynchronous communication
- Learn popular message queue systems (Kafka, RabbitMQ)

---

## Daily Schedule

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | Load Balancing Fundamentals | Algorithms, health checks, sticky sessions |
| Day 2 | Advanced Load Balancing | L4 vs L7, global load balancing |
| Day 3 | Message Queue Basics | Pub/Sub, queues, producers, consumers |
| Day 4 | Apache Kafka Deep Dive | Topics, partitions, consumer groups |
| Day 5 | Queue Patterns & Best Practices | Dead letter queues, idempotency |

---

## Day 1: Load Balancing Fundamentals

### Content Topics
- Why load balancing?
- Load balancing algorithms
  - Round Robin
  - Weighted Round Robin
  - Least Connections
  - IP Hash
  - Random
- Health checks and failover
- Sticky sessions (session affinity)
- Connection draining

### Load Balancing Algorithms
```
Round Robin:
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Request 4 → Server A (repeat)

Weighted Round Robin:
Server A (weight: 3) → 60% traffic
Server B (weight: 2) → 40% traffic

Least Connections:
Route to server with fewest active connections

IP Hash:
Hash(client_ip) % num_servers → consistent server
```

### Daily Assignment
- Implement round-robin load balancer
- Design health check strategy for microservices

---

## Day 2: Advanced Load Balancing

### Content Topics
- Layer 4 (Transport) vs Layer 7 (Application) load balancing
- SSL/TLS termination
- Global server load balancing (GSLB)
- DNS-based load balancing
- Service mesh and sidecar proxies
- Load balancer hardware vs software
- Popular solutions (HAProxy, NGINX, AWS ALB/NLB)

### L4 vs L7 Comparison
| Feature | Layer 4 | Layer 7 |
|---------|---------|---------|
| Protocol | TCP/UDP | HTTP/HTTPS |
| Routing | IP + Port | URL, Headers, Cookies |
| Speed | Faster | Slower |
| SSL Termination | No | Yes |
| Content-based | No | Yes |

### Global Load Balancing
```
                    ┌──────────────┐
                    │     DNS      │
                    │ (GeoDNS/GSLB)│
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  US Region    │  │  EU Region    │  │ Asia Region   │
│  Load Balancer│  │  Load Balancer│  │  Load Balancer│
└───────┬───────┘  └───────┬───────┘  └───────┬───────┘
        │                  │                  │
   US Servers         EU Servers        Asia Servers
```

### Daily Assignment
- Design multi-region load balancing strategy
- Compare HAProxy vs NGINX configurations

---

## Day 3: Message Queue Basics

### Content Topics
- Synchronous vs asynchronous communication
- Message queue fundamentals
- Point-to-point vs Pub/Sub models
- Message persistence and durability
- At-least-once vs at-most-once vs exactly-once delivery
- Message ordering guarantees
- Queue vs Topic
- Backpressure handling

### Communication Patterns
```
Point-to-Point (Queue):
Producer → [Queue] → Single Consumer

Pub/Sub (Topic):
Publisher → [Topic] → Multiple Subscribers

Fan-out:
Producer → [Exchange] → Multiple Queues → Multiple Consumers
```

### Delivery Guarantees
| Guarantee | Description | Use Case |
|-----------|-------------|----------|
| At-most-once | May lose messages | Logs, metrics |
| At-least-once | May duplicate messages | Orders (with idempotency) |
| Exactly-once | No loss, no duplicates | Financial transactions |

### Daily Assignment
- Design notification system using message queues
- Implement pub/sub pattern for event broadcasting

---

## Day 4: Apache Kafka Deep Dive

### Content Topics
- Kafka architecture
- Topics and partitions
- Producers and consumers
- Consumer groups
- Kafka offset management
- Kafka replication
- Kafka vs RabbitMQ
- Kafka Connect and Kafka Streams

### Kafka Architecture
```
┌─────────────────────────────────────────────────────┐
│                    Kafka Cluster                     │
│  ┌─────────────────────────────────────────────┐    │
│  │              Topic: orders                   │    │
│  │  ┌────────┐ ┌────────┐ ┌────────┐           │    │
│  │  │  P0    │ │  P1    │ │  P2    │           │    │
│  │  │ R:3    │ │ R:3    │ │ R:3    │           │    │
│  │  └────────┘ └────────┘ └────────┘           │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  Broker 1        Broker 2        Broker 3           │
└─────────────────────────────────────────────────────┘

Consumer Group:
┌──────────────────┐
│ Consumer Group A │
│ ┌──────┐ ┌──────┐│
│ │ C1   │ │ C2   ││
│ │ P0,P1│ │ P2   ││
│ └──────┘ └──────┘│
└──────────────────┘
```

### Kafka vs RabbitMQ
| Feature | Kafka | RabbitMQ |
|---------|-------|----------|
| Model | Distributed log | Traditional queue |
| Throughput | Very high | High |
| Ordering | Per partition | Per queue |
| Replay | Yes | No |
| Use case | Event streaming | Task queues |

### Daily Assignment
- Design event sourcing system with Kafka
- Implement Kafka consumer with offset management

---

## Day 5: Queue Patterns & Best Practices

### Content Topics
- Dead letter queues (DLQ)
- Message retry strategies
- Idempotent consumers
- Circuit breaker pattern
- Message deduplication
- Message TTL and expiration
- Monitoring and alerting
- Capacity planning for message queues

### Dead Letter Queue Pattern
```
Producer → Main Queue → Consumer
                │ (failed)
                ▼
         Dead Letter Queue → Manual Review/Retry
```

### Retry Strategies
```
Immediate Retry:
Fail → Retry immediately (max N times)

Exponential Backoff:
Fail → Wait 1s → Retry → Wait 2s → Retry → Wait 4s → ...

Circuit Breaker:
After N failures → Open circuit → Skip retries → Half-open → Test → Close
```

### Best Practices
1. Make consumers idempotent
2. Use message acknowledgments
3. Implement dead letter queues
4. Monitor queue depth
5. Set appropriate message TTL
6. Use correlation IDs for tracing

### Daily Assignment
- Implement dead letter queue handler
- Design fault-tolerant order processing pipeline

---

## Weekly Resources

### Required Reading
- "Designing Data-Intensive Applications" - Chapter 11
- Apache Kafka Documentation
- RabbitMQ Tutorials

### Video Resources
- Confluent: Apache Kafka 101
- ByteByteGo: Load Balancing Algorithms
- Hussein Nasser: Message Queues Explained

### Tools to Explore
- HAProxy / NGINX
- Apache Kafka
- RabbitMQ
- AWS SQS/SNS

---

## Weekly Quiz
- 25 questions on load balancing and message queues
- Algorithm selection scenarios
- Queue pattern design

## Weekly Project
**Design an E-commerce Order Processing System**
- Order placement API with load balancing
- Order processing queue
- Payment processing with retry logic
- Notification system with pub/sub
- Dead letter queue for failed orders
