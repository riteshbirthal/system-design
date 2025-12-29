# System Design Course Architecture

## Course Overview

A comprehensive 12-week System Design course covering High-Level Design (HLD) and Low-Level Design (LLD) concepts for building scalable, reliable, and maintainable systems.

**Duration:** 12 Weeks (5 days/week)
**Daily Commitment:** 2-3 hours
**Total Hours:** 120-180 hours

---

## Course Structure by Week

### Phase 1: Fundamentals (Weeks 1-2)

#### Week 1: Introduction to System Design & Requirements Engineering
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | What is System Design? | HLD vs LLD, System components, Architecture overview |
| Day 2 | Functional & Non-Functional Requirements | Requirements gathering, MoSCoW prioritization, User stories |
| Day 3 | Scalability Fundamentals | Vertical vs Horizontal scaling, Stateless design |
| Day 4 | Back-of-Envelope Estimation | Traffic estimation, Storage calculation, Bandwidth |
| Day 5 | System Design Process & Framework | RESHADED framework, Design interview approach |

**Weekly Project:** Design a Pastebin Service
**Weekly Quiz:** 25 questions covering all Week 1 topics

---

#### Week 2: Networking Fundamentals & Communication Protocols
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | DNS & Domain Resolution | DNS hierarchy, Record types, GeoDNS, TTL |
| Day 2 | HTTP/HTTPS Protocols | HTTP methods, Status codes, TLS, HTTP/2, HTTP/3 |
| Day 3 | TCP vs UDP | Transport layer, 3-way handshake, QUIC protocol |
| Day 4 | REST API Design | REST principles, Versioning, Pagination, Error handling |
| Day 5 | GraphQL, gRPC & WebSockets | Query language, Protocol buffers, Real-time communication |

**Weekly Project:** Design a Real-Time Chat System
**Weekly Quiz:** 25 questions covering all Week 2 topics

---

### Phase 2: Core Components (Weeks 3-5)

#### Week 3: Database Systems & Data Management
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | SQL Databases | Relational model, Normalization (1NF-BCNF), Joins, Aggregations |
| Day 2 | NoSQL Databases | Document, Key-Value, Column-family, Graph databases |
| Day 3 | Indexing & Query Optimization | B-trees, Hash indexes, EXPLAIN plans, Query optimization |
| Day 4 | ACID & Transactions | Atomicity, Consistency, Isolation levels, Durability, MVCC |
| Day 5 | Database Replication | Master-slave, Multi-master, Sync/Async replication, CRDTs |

**Weekly Project:** Design a Social Media Database
**Weekly Quiz:** 25 questions covering all Week 3 topics

---

#### Week 4: Caching Strategies & Performance Optimization
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | Caching Fundamentals | Cache types, Cache-aside, Read-through, Write-through |
| Day 2 | Cache Eviction Policies | LRU, LFU, FIFO, TTL, Cache invalidation strategies |
| Day 3 | Distributed Caching | Redis, Memcached, Consistent hashing |
| Day 4 | CDN & Edge Caching | Content delivery, Edge locations, Cache headers |
| Day 5 | Performance Optimization | Profiling, Bottleneck identification, N+1 queries |

**Weekly Project:** Design a Content Delivery System
**Weekly Quiz:** 25 questions covering all Week 4 topics

---

#### Week 5: Load Balancing & Message Queues
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | Load Balancing Fundamentals | Layer 4 vs Layer 7, Health checks, Session persistence |
| Day 2 | Load Balancing Algorithms | Round robin, Weighted, Least connections, IP hash |
| Day 3 | Message Queue Fundamentals | Pub/Sub, Point-to-point, At-least-once delivery |
| Day 4 | Message Queue Technologies | Kafka, RabbitMQ, SQS, Event streaming |
| Day 5 | Event-Driven Architecture | Event sourcing, CQRS, Saga pattern |

**Weekly Project:** Design a Notification System
**Weekly Quiz:** 25 questions covering all Week 5 topics

---

### Phase 3: Distributed Systems (Weeks 6-7)

#### Week 6: CAP Theorem & Consistency Patterns
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | CAP Theorem | Consistency, Availability, Partition tolerance |
| Day 2 | Consistency Models | Strong, Eventual, Causal consistency |
| Day 3 | Distributed Consensus | Paxos, Raft, Leader election |
| Day 4 | Distributed Transactions | 2PC, 3PC, Saga pattern |
| Day 5 | Conflict Resolution | Vector clocks, CRDTs, Last-write-wins |

**Weekly Project:** Design a Distributed Key-Value Store
**Weekly Quiz:** 25 questions covering all Week 6 topics

---

#### Week 7: Data Partitioning & Replication Strategies
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | Data Partitioning Basics | Horizontal vs Vertical partitioning |
| Day 2 | Sharding Strategies | Hash-based, Range-based, Directory-based |
| Day 3 | Partition Management | Rebalancing, Hot spots, Cross-shard queries |
| Day 4 | Global Data Distribution | Geo-replication, Data locality, Latency optimization |
| Day 5 | Data Migration Strategies | Zero-downtime migration, Dual-write, Shadow reads |

**Weekly Project:** Design a Global User Database
**Weekly Quiz:** 25 questions covering all Week 7 topics

---

### Phase 4: Architecture Patterns (Weeks 8-9)

#### Week 8: Microservices Architecture & Service Mesh
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | Microservices Fundamentals | Monolith vs Microservices, Bounded contexts |
| Day 2 | Service Discovery | Client-side, Server-side, Service registry |
| Day 3 | API Gateway | Routing, Rate limiting, Authentication |
| Day 4 | Service Mesh | Sidecar pattern, Istio, Envoy |
| Day 5 | Microservices Patterns | Circuit breaker, Bulkhead, Retry patterns |

**Weekly Project:** Design an E-commerce Microservices System
**Weekly Quiz:** 25 questions covering all Week 8 topics

---

#### Week 9: API Design & Communication Patterns
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | API Design Best Practices | Idempotency, Backward compatibility |
| Day 2 | API Security | OAuth 2.0, JWT, API keys, Rate limiting |
| Day 3 | Inter-Service Communication | Sync vs Async, RPC, Message passing |
| Day 4 | API Versioning & Documentation | Semantic versioning, OpenAPI, Swagger |
| Day 5 | API Performance | Pagination, Compression, Caching |

**Weekly Project:** Design a Public API Platform
**Weekly Quiz:** 25 questions covering all Week 9 topics

---

### Phase 5: Low-Level Design (Weeks 10-11)

#### Week 10: Object-Oriented Design & SOLID Principles
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | OOP Fundamentals | Encapsulation, Inheritance, Polymorphism, Abstraction |
| Day 2 | SOLID Principles - Part 1 | Single Responsibility, Open/Closed |
| Day 3 | SOLID Principles - Part 2 | Liskov Substitution, Interface Segregation |
| Day 4 | SOLID Principles - Part 3 | Dependency Inversion, DI containers |
| Day 5 | Clean Code & Refactoring | Code smells, Refactoring patterns |

**Weekly Project:** Design a Parking Lot System
**Weekly Quiz:** 25 questions covering all Week 10 topics

---

#### Week 11: Design Patterns & UML Diagrams
| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | Creational Patterns | Singleton, Factory, Builder, Prototype |
| Day 2 | Structural Patterns | Adapter, Decorator, Facade, Proxy |
| Day 3 | Behavioral Patterns | Observer, Strategy, Command, State |
| Day 4 | UML Diagrams | Class diagrams, Sequence diagrams, Use case diagrams |
| Day 5 | Architecture Documentation | C4 model, ADRs, Technical specifications |

**Weekly Project:** Design an Elevator System
**Weekly Quiz:** 25 questions covering all Week 11 topics

---

### Phase 6: Case Studies & Interview Preparation (Week 12)

#### Week 12: Real-World System Design Problems
| Day | Topic | Case Study |
|-----|-------|------------|
| Day 1 | Social Media | Design Twitter/X |
| Day 2 | Video Streaming | Design YouTube/Netflix |
| Day 3 | Ride Sharing | Design Uber/Lyft |
| Day 4 | Messaging | Design WhatsApp |
| Day 5 | Search Engine | Design Google Search |

**Final Capstone Project:** Design a complete system of your choice
**Final Assessment:** Comprehensive exam covering all 12 weeks

---

## Assessment Structure

| Assessment Type | Frequency | Weight | Description |
|-----------------|-----------|--------|-------------|
| Daily Quizzes | Daily (60 total) | 20% | 10 MCQ per day, immediate feedback |
| Daily Assignments | Daily (60 total) | 25% | Hands-on exercises, 45-60 min each |
| Weekly Projects | Weekly (12 total) | 35% | Full system design, 6-8 hours each |
| Final Capstone | End of Course | 20% | Complete system design project |

---

## Daily Content Structure

Each day follows a consistent format:
1. **content.md** - Main learning material (2000-4000 words)
2. **quiz.md** - 10 multiple choice questions
3. **assignment.md** - Hands-on exercise with rubric

## Weekly Content Structure

Each week includes:
1. **README.md** - Week overview and learning objectives
2. **day-01/ to day-05/** - Daily content folders
3. **weekly-quiz.md** - 25 comprehensive questions
4. **weekly-project.md** - Full project specification

---

## Learning Path

```
Week 1-2: Foundations
    ↓
Week 3-5: Core Components
    ↓
Week 6-7: Distributed Systems
    ↓
Week 8-9: Architecture
    ↓
Week 10-11: Low-Level Design
    ↓
Week 12: Case Studies
    ↓
Capstone Project
```

---

## Technology Stack Covered

### Databases
- SQL: PostgreSQL, MySQL
- NoSQL: MongoDB, Redis, Cassandra, Neo4j

### Message Queues
- Apache Kafka, RabbitMQ, AWS SQS

### Caching
- Redis, Memcached, CDN (CloudFront, Akamai)

### Load Balancers
- Nginx, HAProxy, AWS ALB/NLB

### Monitoring
- Prometheus, Grafana, ELK Stack

---

## Prerequisites

- Basic programming knowledge (any language)
- Understanding of data structures and algorithms
- Familiarity with HTTP and basic networking
- No prior system design experience required

---

## Course Outcomes

Upon completion, students will be able to:

1. Analyze and gather system requirements
2. Design scalable architectures for millions of users
3. Make informed trade-off decisions
4. Apply appropriate design patterns
5. Conduct system design interviews confidently
6. Build production-ready systems
7. Document architectural decisions
8. Optimize system performance
