import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
from config import Config

async def seed_database():
    client = AsyncIOMotorClient(Config.MONGO_URI)
    db = client[Config.DATABASE_NAME]

    tutorials_data = [
        {
            "title": "Introduction to System Design",
            "description": "Learn the fundamentals of system design including scalability, reliability, and performance.",
            "video_url": "https://example.com/videos/intro-system-design",
            "thumbnail": "https://example.com/thumbnails/intro.jpg",
            "duration": "45:00",
            "category": "Fundamentals",
            "difficulty": "Beginner",
            "week": 1,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Load Balancing Strategies",
            "description": "Deep dive into different load balancing techniques and when to use them.",
            "video_url": "https://example.com/videos/load-balancing",
            "thumbnail": "https://example.com/thumbnails/lb.jpg",
            "duration": "35:00",
            "category": "Infrastructure",
            "difficulty": "Intermediate",
            "week": 5,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Database Sharding",
            "description": "Learn how to horizontally scale databases using sharding techniques.",
            "video_url": "https://example.com/videos/sharding",
            "thumbnail": "https://example.com/thumbnails/sharding.jpg",
            "duration": "50:00",
            "category": "Databases",
            "difficulty": "Advanced",
            "week": 7,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 1 Tutorials
        {
            "title": "Requirements Engineering",
            "description": "Learn to gather and analyze functional and non-functional requirements.",
            "video_url": "https://example.com/videos/requirements",
            "thumbnail": "https://example.com/thumbnails/requirements.jpg",
            "duration": "40:00",
            "category": "Fundamentals",
            "difficulty": "Beginner",
            "week": 1,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Scalability Fundamentals",
            "description": "Understand vertical vs horizontal scaling and stateless architecture.",
            "video_url": "https://example.com/videos/scalability",
            "thumbnail": "https://example.com/thumbnails/scalability.jpg",
            "duration": "50:00",
            "category": "Fundamentals",
            "difficulty": "Beginner",
            "week": 1,
            "day": 3,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Back-of-Envelope Estimation",
            "description": "Master capacity planning and traffic estimation techniques.",
            "video_url": "https://example.com/videos/estimation",
            "thumbnail": "https://example.com/thumbnails/estimation.jpg",
            "duration": "38:00",
            "category": "Fundamentals",
            "difficulty": "Beginner",
            "week": 1,
            "day": 4,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "System Design Framework",
            "description": "Learn the RESHADED framework for approaching system design problems.",
            "video_url": "https://example.com/videos/framework",
            "thumbnail": "https://example.com/thumbnails/framework.jpg",
            "duration": "45:00",
            "category": "Fundamentals",
            "difficulty": "Beginner",
            "week": 1,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 2 Tutorials
        {
            "title": "DNS & Domain Resolution",
            "description": "Deep dive into DNS hierarchy, resolution process, and record types.",
            "video_url": "https://example.com/videos/dns",
            "thumbnail": "https://example.com/thumbnails/dns.jpg",
            "duration": "42:00",
            "category": "Networking",
            "difficulty": "Intermediate",
            "week": 2,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "HTTP/HTTPS Protocols",
            "description": "Learn HTTP methods, status codes, headers, and TLS handshake.",
            "video_url": "https://example.com/videos/http",
            "thumbnail": "https://example.com/thumbnails/http.jpg",
            "duration": "48:00",
            "category": "Networking",
            "difficulty": "Intermediate",
            "week": 2,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "TCP vs UDP Deep Dive",
            "description": "Understanding transport layer protocols and when to use each.",
            "video_url": "https://example.com/videos/tcp-udp",
            "thumbnail": "https://example.com/thumbnails/tcp-udp.jpg",
            "duration": "40:00",
            "category": "Networking",
            "difficulty": "Intermediate",
            "week": 2,
            "day": 3,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "REST API Design Best Practices",
            "description": "Master RESTful API design principles and documentation.",
            "video_url": "https://example.com/videos/rest-api",
            "thumbnail": "https://example.com/thumbnails/rest-api.jpg",
            "duration": "55:00",
            "category": "Networking",
            "difficulty": "Intermediate",
            "week": 2,
            "day": 4,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "GraphQL, gRPC & WebSockets",
            "description": "Alternative APIs and real-time communication patterns.",
            "video_url": "https://example.com/videos/graphql-grpc",
            "thumbnail": "https://example.com/thumbnails/graphql-grpc.jpg",
            "duration": "52:00",
            "category": "Networking",
            "difficulty": "Intermediate",
            "week": 2,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 3 Tutorials
        {
            "title": "SQL Databases Deep Dive",
            "description": "Master SQL databases including normalization, joins, and query optimization.",
            "video_url": "https://example.com/videos/sql-databases",
            "thumbnail": "https://example.com/thumbnails/sql.jpg",
            "duration": "55:00",
            "category": "Databases",
            "difficulty": "Intermediate",
            "week": 3,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "NoSQL Databases Explained",
            "description": "Learn about Document, Key-Value, Column-family, and Graph databases.",
            "video_url": "https://example.com/videos/nosql-databases",
            "thumbnail": "https://example.com/thumbnails/nosql.jpg",
            "duration": "48:00",
            "category": "Databases",
            "difficulty": "Intermediate",
            "week": 3,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Database Indexing Masterclass",
            "description": "Deep dive into B-trees, hash indexes, and query optimization techniques.",
            "video_url": "https://example.com/videos/indexing",
            "thumbnail": "https://example.com/thumbnails/indexing.jpg",
            "duration": "42:00",
            "category": "Databases",
            "difficulty": "Intermediate",
            "week": 3,
            "day": 3,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "ACID Transactions & MVCC",
            "description": "Understanding ACID properties, isolation levels, and multi-version concurrency control.",
            "video_url": "https://example.com/videos/acid-transactions",
            "thumbnail": "https://example.com/thumbnails/acid.jpg",
            "duration": "52:00",
            "category": "Databases",
            "difficulty": "Advanced",
            "week": 3,
            "day": 4,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Database Replication Strategies",
            "description": "Master-slave, multi-master replication, sync vs async, and conflict resolution.",
            "video_url": "https://example.com/videos/replication",
            "thumbnail": "https://example.com/thumbnails/replication.jpg",
            "duration": "58:00",
            "category": "Databases",
            "difficulty": "Advanced",
            "week": 3,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
    ]

    content_data = [
        {
            "title": "CAP Theorem Explained",
            "body": """# CAP Theorem

The CAP theorem states that a distributed system can only guarantee two of the following three properties:

## Consistency
Every read receives the most recent write or an error.

## Availability
Every request receives a response, without guarantee that it contains the most recent write.

## Partition Tolerance
The system continues to operate despite network partitions.

## Practical Implications
In practice, since network partitions are inevitable, you must choose between consistency and availability.""",
            "category": "Distributed Systems",
            "tags": ["CAP", "distributed systems", "databases"],
            "author": "System Design Team",
            "read_time": 10,
            "week": 6,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Microservices Architecture",
            "body": """# Microservices Architecture

Microservices is an architectural style that structures an application as a collection of loosely coupled services.

## Benefits
- Independent deployment
- Technology diversity
- Scalability
- Fault isolation

## Challenges
- Distributed system complexity
- Data consistency
- Service discovery
- Monitoring and debugging""",
            "category": "Architecture",
            "tags": ["microservices", "architecture", "scalability"],
            "author": "System Design Team",
            "read_time": 15,
            "week": 8,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 1 Content
        {
            "title": "What is System Design?",
            "body": """# Day 1: What is System Design?

## Learning Objectives

By the end of this lesson, you will be able to:
- Define system design and articulate its importance in software engineering
- Distinguish between High-Level Design (HLD) and Low-Level Design (LLD)
- Identify and explain core system components and their roles
- Understand the evolution of software architecture
- Apply key terminology used in system design discussions

---

## 1. Introduction to System Design

### What is System Design?

System design is the process of defining the **architecture**, **components**, **modules**, **interfaces**, and **data flow** of a system to satisfy specified requirements. It's the bridge between a product idea and its technical implementation—the blueprint that guides how software will be built, deployed, and scaled.

Think of system design like architectural planning for a building. Before construction begins, architects create detailed plans showing the structure, electrical systems, plumbing, and how people will move through the space. Similarly, system design defines how data flows, how components interact, and how the system handles growth and failures.

### The Definition in Context

System design involves making critical decisions about:

| Decision Area | Description | Example |
|--------------|-------------|---------|
| **Architecture** | Overall structure and organization | Monolithic vs. Microservices |
| **Components** | Individual parts of the system | Database, Cache, Load Balancer |
| **Interfaces** | How components communicate | REST APIs, GraphQL, gRPC |
| **Data Flow** | How information moves through the system | Synchronous vs. Asynchronous |
| **Technology Stack** | Tools and frameworks to use | PostgreSQL vs. MongoDB |

### Why System Design Matters

System design is crucial because poor design decisions made early can be **extremely costly** to fix later:

#### 1. Scalability
Your system must handle growth—more users, more data, more requests. A well-designed system can scale from 100 users to 100 million users without complete restructuring.

**Real Example**: When Twitter was young, they used a simple "pull" model where every page load queried the database for recent tweets. As they grew to millions of users, this approach collapsed under load. They had to redesign their entire architecture to use a "push" model with fan-out on write.

#### 2. Reliability
Systems must work correctly even when things fail—and things *will* fail. Servers crash, networks partition, disks corrupt. Good system design anticipates failures and handles them gracefully.

**Real Example**: Netflix's famous "Chaos Monkey" randomly kills production servers to ensure their system can handle failures. This approach only works because their architecture was designed for resilience from the start.

#### 3. Maintainability
Software that's hard to modify becomes technical debt. Well-designed systems are modular, well-documented, and easy for new engineers to understand.

#### 4. Performance
Users expect fast responses. Studies show that even 100ms of added latency can reduce sales by 1%. Good design optimizes for the metrics that matter.

#### 5. Cost-Effectiveness
Poor design wastes resources—over-provisioned servers, inefficient queries, duplicated data. Good design optimizes resource utilization and reduces operational costs.

---

## 2. The Evolution of Software Architecture

Understanding where we came from helps us appreciate current approaches. Software architecture has evolved through several major paradigms:

### Monolithic Architecture

In the early days, applications were built as **monoliths**—single, unified codebases where all functionality lived together.

**Advantages**:
- Simple to develop and deploy initially
- Easy to test and debug
- All code in one place

**Disadvantages**:
- Difficult to scale specific components
- A bug in one module can crash the entire system
- Technology lock-in
- Large codebase becomes hard to maintain

### Microservices Architecture

Modern large-scale applications often use **microservices**—independent, loosely coupled services that each handle a specific business capability.

**Advantages**:
- Independent deployment and scaling
- Technology flexibility per service
- Fault isolation
- Easier for large teams to work in parallel

**Disadvantages**:
- Increased operational complexity
- Network latency between services
- Data consistency challenges
- Requires mature DevOps practices

---

## 3. High-Level Design (HLD) vs Low-Level Design (LLD)

System design is typically divided into two phases: High-Level Design and Low-Level Design. Understanding the distinction is crucial.

### High-Level Design (HLD)

HLD provides the **"bird's eye view"** of the system. It focuses on:

- Overall system architecture
- Major components and their interactions
- Data flow between components
- Technology choices at a macro level
- Non-functional requirements (scalability, reliability, etc.)

**HLD Artifacts Include**:
- System architecture diagrams
- Component diagrams
- Data flow diagrams
- Technology stack decisions
- API specifications (high-level)

### Low-Level Design (LLD)

LLD provides the **"implementation blueprint"**. It focuses on:

- Class diagrams and object models
- Database schemas and relationships
- Algorithm specifications
- API contracts (detailed)
- Error handling strategies

**LLD Artifacts Include**:
- Class diagrams (UML)
- Sequence diagrams
- Database schema designs
- Detailed API specifications
- Pseudocode or detailed algorithms

### HLD vs LLD Comparison

| Aspect | High-Level Design (HLD) | Low-Level Design (LLD) |
|--------|------------------------|------------------------|
| **Focus** | System architecture | Component implementation |
| **Scope** | Entire system | Individual modules |
| **Audience** | Architects, managers, stakeholders | Developers, QA engineers |
| **Abstraction** | High (what & why) | Low (how) |
| **Diagrams** | Architecture, component, data flow | Class, sequence, ER diagrams |
| **Decisions** | Technology stack, component interactions | Algorithms, data structures |
| **Timing** | Early in project | After HLD is approved |

---

## 4. Core System Components

Every modern distributed system is built from a set of fundamental building blocks. Understanding these components is essential for system design.

### 4.1 Client

The **client** is the user-facing interface—what users interact with directly.

- **Web Browsers**: HTML, CSS, JavaScript applications
- **Mobile Apps**: iOS (Swift), Android (Kotlin), Cross-platform (React Native, Flutter)
- **Desktop Apps**: Electron, native applications
- **IoT Devices**: Smart devices, sensors

**Responsibilities**:
- Render user interface
- Handle user input
- Make API requests to backend
- Cache data locally
- Validate input before sending

### 4.2 Load Balancer

A **load balancer** distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed.

**Types of Load Balancers**:
- **Layer 4 (Transport)**: Routes based on IP and TCP/UDP ports
- **Layer 7 (Application)**: Routes based on HTTP headers, URLs, cookies

**Common Algorithms**:
- Round Robin
- Least Connections
- IP Hash
- Weighted Round Robin

**Real-World Examples**: AWS ELB, Nginx, HAProxy

### 4.3 Application Server

The **application server** hosts the business logic—the code that processes requests and implements your features.

**Responsibilities**:
- Process business logic
- Authenticate and authorize requests
- Validate data
- Coordinate with databases and other services
- Return responses to clients

### 4.4 Database

The **database** stores and retrieves persistent data. Choosing the right database is one of the most important design decisions.

#### Relational Databases (SQL)
- **Structure**: Tables with rows and columns
- **Schema**: Predefined structure
- **Relationships**: Foreign keys, joins
- **ACID**: Atomicity, Consistency, Isolation, Durability
- **Examples**: PostgreSQL, MySQL, Oracle

**Best For**: Structured data, complex queries, transactions

#### Non-Relational Databases (NoSQL)
- **Document Stores**: JSON-like documents (MongoDB)
- **Key-Value Stores**: Simple key-value pairs (Redis, DynamoDB)
- **Column-Family**: Column-oriented storage (Cassandra, HBase)
- **Graph Databases**: Nodes and relationships (Neo4j)

**Best For**: Unstructured data, high scalability, flexible schemas

### 4.5 Cache

A **cache** stores frequently accessed data in memory for faster retrieval.

**Caching Strategies**:
- **Cache-Aside**: Application manages cache manually
- **Read-Through**: Cache sits between app and database
- **Write-Through**: Writes go to cache and database together
- **Write-Behind**: Writes go to cache, async to database

**Real-World Examples**: Redis, Memcached

### 4.6 Message Queue

A **message queue** enables asynchronous communication between services.

**Benefits**:
- Decouples services
- Handles traffic spikes
- Enables async processing
- Provides reliability through persistence

**Real-World Examples**: Apache Kafka, RabbitMQ, AWS SQS

### 4.7 Content Delivery Network (CDN)

A **CDN** caches static content at edge locations worldwide, reducing latency for global users.

**What CDNs Cache**:
- Static files (images, CSS, JS)
- Video content
- API responses (sometimes)
- HTML pages (for static sites)

**Real-World Examples**: CloudFront, Cloudflare, Akamai

### 4.8 API Gateway

An **API Gateway** is the single entry point for all client requests, handling cross-cutting concerns.

**Responsibilities**:
- Request routing
- Authentication/Authorization
- Rate limiting
- Request/Response transformation
- SSL termination
- Logging and monitoring

**Real-World Examples**: AWS API Gateway, Kong, Nginx

---

## 5. Key Terminology

Mastering system design requires fluency in its vocabulary. Here are essential terms:

### Performance Metrics

| Term | Definition | Example |
|------|------------|---------|
| **Latency** | Time to process a single request | 50ms response time |
| **Throughput** | Requests processed per unit time | 10,000 requests/second |
| **Bandwidth** | Data transfer capacity | 1 Gbps network link |
| **Response Time** | Total time from request to response | Includes latency + network time |

### Reliability Metrics

| Term | Definition | Calculation |
|------|------------|-------------|
| **Availability** | Percentage of uptime | (Uptime / Total Time) × 100 |
| **Reliability** | Probability of correct operation | Mean Time Between Failures (MTBF) |
| **Durability** | Data not lost over time | 99.999999999% (eleven 9s for S3) |

### Service Level Terms

| Term | Definition | Example |
|------|------------|---------|
| **SLA** (Service Level Agreement) | Contract with customers | "99.9% uptime guaranteed" |
| **SLO** (Service Level Objective) | Internal performance target | "95th percentile latency < 100ms" |
| **SLI** (Service Level Indicator) | Metric that measures SLO | "Request latency in milliseconds" |

### The "Nines" of Availability

| Availability | Downtime/Year | Downtime/Month | Downtime/Week |
|-------------|---------------|----------------|---------------|
| 99% ("two nines") | 3.65 days | 7.31 hours | 1.68 hours |
| 99.9% ("three nines") | 8.77 hours | 43.83 minutes | 10.08 minutes |
| 99.99% ("four nines") | 52.60 minutes | 4.38 minutes | 1.01 minutes |
| 99.999% ("five nines") | 5.26 minutes | 26.30 seconds | 6.05 seconds |

### Scalability Concepts

| Term | Definition |
|------|------------|
| **Vertical Scaling** | Adding more power to existing machines (scale up) |
| **Horizontal Scaling** | Adding more machines (scale out) |
| **Elasticity** | Automatic scaling based on demand |
| **Stateless** | Server doesn't store session data locally |

### Fault Tolerance Concepts

| Term | Definition |
|------|------------|
| **Redundancy** | Duplicate components for backup |
| **Replication** | Copying data across multiple nodes |
| **Failover** | Automatic switch to backup system |
| **Graceful Degradation** | Reduced functionality instead of complete failure |

---

## 6. Real-World System Design Examples

Let's examine how popular applications are architected:

### Netflix Architecture Overview

Netflix serves 200+ million subscribers streaming billions of hours of content monthly.

**Key Components**:
- **Open Connect CDN**: Proprietary CDN with servers in ISP data centers
- **AWS Cloud**: Backend services run on AWS
- **Microservices**: 700+ microservices
- **Data Layer**: Cassandra, MySQL, Redis

**Design Decisions**:
- Content is pre-positioned close to users via CDN
- Chaos engineering (Chaos Monkey) ensures resilience
- Personalization algorithms run on dedicated clusters

### Twitter/X Architecture Overview

Twitter handles 500+ million tweets per day with real-time delivery.

**Key Components**:
- **Fan-out Service**: Distributes tweets to followers' timelines
- **Timeline Cache**: Pre-computed timelines in Redis
- **Search Index**: Real-time tweet indexing

**Design Evolution**:
- Started with pull model (query on each request)
- Evolved to push model (fan-out on write)
- Hybrid approach for users with millions of followers

---

## 7. The RESHADED Framework

When approaching system design problems (especially in interviews), use the **RESHADED** framework:

| Letter | Step | Description |
|--------|------|-------------|
| **R** | Requirements | Clarify functional and non-functional requirements |
| **E** | Estimation | Estimate scale (users, storage, bandwidth) |
| **S** | Storage Schema | Design data model (optional but recommended) |
| **H** | High-Level Design | Draw the architecture diagram |
| **A** | APIs | Define the key API endpoints |
| **D** | Detailed Design | Deep dive into critical components |
| **E** | Evaluation | Discuss trade-offs and bottlenecks |
| **D** | Distinctive Features | Highlight unique aspects of your design |

---

## 8. Summary

### Key Takeaways

1. **System design** is the process of defining architecture, components, and data flow to meet requirements

2. **HLD** focuses on the big picture (architecture), while **LLD** focuses on implementation details (classes, algorithms)

3. **Core components** include:
   - Load Balancers (distribute traffic)
   - Databases (store data)
   - Caches (speed up access)
   - Message Queues (async communication)
   - CDN (content delivery)
   - API Gateway (single entry point)

4. **Key metrics** to understand:
   - Latency (request time)
   - Throughput (requests per second)
   - Availability (uptime percentage)

5. **Architecture has evolved** from monoliths to microservices, each with trade-offs

6. Use the **RESHADED framework** for systematic problem-solving

---

## 9. Further Reading

### Books
- "Designing Data-Intensive Applications" by Martin Kleppmann
- "System Design Interview" by Alex Xu
- "Building Microservices" by Sam Newman

### Online Resources
- System Design Primer (GitHub)
- ByteByteGo Newsletter
- High Scalability Blog

### Video Courses
- Grokking Modern System Design (Educative)
- System Design by Gaurav Sen (YouTube)
- System Design Course by Design Gurus""",
            "category": "Fundamentals",
            "tags": ["system design", "architecture", "HLD", "LLD", "scalability", "reliability", "components"],
            "author": "System Design Team",
            "read_time": 45,
            "week": 1,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Functional & Non-Functional Requirements",
            "body": """# Requirements Engineering

## Functional Requirements
What the system should DO - specific behaviors and features.

Examples:
- Users can create accounts
- Users can search products
- System sends notifications

## Non-Functional Requirements
How the system should PERFORM - quality attributes.

### Key NFRs:
1. **Scalability**: Handle 10K concurrent users
2. **Availability**: 99.9% uptime (3 nines)
3. **Latency**: Response time < 200ms (P95)
4. **Reliability**: No data loss
5. **Security**: Encrypted data, authentication

## MoSCoW Prioritization
- Must Have: Critical for launch
- Should Have: Important but not critical
- Could Have: Nice to have
- Won't Have: Out of scope""",
            "category": "Fundamentals",
            "tags": ["requirements", "functional", "non-functional", "MoSCoW"],
            "author": "System Design Team",
            "read_time": 18,
            "week": 1,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Scalability Fundamentals",
            "body": """# Scalability

## Vertical Scaling (Scale Up)
Adding more power to existing machine.
- Pros: Simple, no code changes
- Cons: Hardware limits, SPOF

## Horizontal Scaling (Scale Out)
Adding more machines.
- Pros: Near-infinite scaling, redundancy
- Cons: Complex, consistency challenges

## Stateless vs Stateful
- **Stateless**: No session on server, easy to scale
- **Stateful**: Session on server, needs sticky sessions

## Scaling Patterns
1. Load Balancing
2. Database Replication
3. Caching Layer
4. Database Sharding""",
            "category": "Fundamentals",
            "tags": ["scalability", "horizontal", "vertical", "stateless"],
            "author": "System Design Team",
            "read_time": 20,
            "week": 1,
            "day": 3,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Back-of-Envelope Estimation",
            "body": """# Capacity Planning

## Key Numbers to Know
- 1 day = 86,400 seconds ≈ 100K seconds
- 1 million requests/day ≈ 12 RPS
- 1 billion requests/day ≈ 12K RPS

## Storage Units
- 1 KB = 1,024 bytes
- 1 MB = 1,024 KB
- 1 GB = 1,024 MB
- 1 TB = 1,024 GB

## Powers of 2
- 2^10 = 1,024 ≈ 1 thousand
- 2^20 ≈ 1 million
- 2^30 ≈ 1 billion

## Estimation Formula
1. Traffic: DAU × actions/user × peak multiplier
2. Storage: Records × size × retention
3. Bandwidth: Traffic × response size""",
            "category": "Fundamentals",
            "tags": ["estimation", "capacity", "planning", "numbers"],
            "author": "System Design Team",
            "read_time": 15,
            "week": 1,
            "day": 4,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "System Design Framework - RESHADED",
            "body": """# RESHADED Framework

## R - Requirements
Gather functional and non-functional requirements

## E - Estimation
Calculate traffic, storage, bandwidth

## S - Storage Schema
Design data models and database schema

## H - High-level Design
Draw architecture diagram with components

## A - API Design
Define endpoints and data contracts

## D - Detailed Design
Deep dive into critical components

## E - Evaluate
Identify bottlenecks and trade-offs

## D - Discuss
Address edge cases and future improvements""",
            "category": "Fundamentals",
            "tags": ["framework", "RESHADED", "methodology", "interview"],
            "author": "System Design Team",
            "read_time": 12,
            "week": 1,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 2 Content
        {
            "title": "DNS & Domain Resolution",
            "body": """# DNS - Domain Name System

## What is DNS?
Translates domain names to IP addresses.

## DNS Hierarchy
1. Root Servers (.)
2. TLD Servers (.com, .org)
3. Authoritative Servers

## DNS Record Types
- A: Domain to IPv4
- AAAA: Domain to IPv6
- CNAME: Alias to another domain
- MX: Mail server
- TXT: Text records
- NS: Name servers

## DNS Resolution Steps
1. Browser cache
2. OS cache
3. Resolver cache
4. Root → TLD → Authoritative

## TTL (Time To Live)
How long to cache DNS records.""",
            "category": "Networking",
            "tags": ["DNS", "networking", "resolution", "TTL"],
            "author": "System Design Team",
            "read_time": 20,
            "week": 2,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "HTTP/HTTPS Protocols",
            "body": """# HTTP Protocol

## HTTP Methods
- GET: Retrieve data
- POST: Create resource
- PUT: Update resource
- PATCH: Partial update
- DELETE: Remove resource

## Status Codes
- 2xx: Success (200, 201, 204)
- 3xx: Redirect (301, 302, 304)
- 4xx: Client Error (400, 401, 403, 404)
- 5xx: Server Error (500, 502, 503)

## HTTP Versions
- HTTP/1.1: Persistent connections
- HTTP/2: Multiplexing, header compression
- HTTP/3: QUIC protocol, faster

## HTTPS
- TLS encryption
- Certificate-based authentication
- Data integrity""",
            "category": "Networking",
            "tags": ["HTTP", "HTTPS", "TLS", "protocols"],
            "author": "System Design Team",
            "read_time": 18,
            "week": 2,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "TCP vs UDP",
            "body": """# Transport Layer Protocols

## TCP (Transmission Control Protocol)
- Connection-oriented
- Reliable delivery
- Ordered packets
- Flow control
- Use: Web, email, file transfer

## UDP (User Datagram Protocol)
- Connectionless
- Best-effort delivery
- No ordering guarantee
- Low latency
- Use: Gaming, streaming, DNS

## TCP 3-Way Handshake
1. SYN (client → server)
2. SYN-ACK (server → client)
3. ACK (client → server)

## When to Use Which?
- TCP: Data integrity critical
- UDP: Speed critical, loss acceptable""",
            "category": "Networking",
            "tags": ["TCP", "UDP", "transport", "protocols"],
            "author": "System Design Team",
            "read_time": 16,
            "week": 2,
            "day": 3,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "REST API Design",
            "body": """# RESTful API Design

## REST Principles
1. Client-Server separation
2. Stateless
3. Cacheable
4. Uniform Interface
5. Layered System

## URL Design
- /users - Collection
- /users/{id} - Single resource
- /users/{id}/orders - Nested resource

## Best Practices
- Use nouns, not verbs
- Plural resource names
- Version your API (/v1/)
- Use proper status codes
- Paginate large responses

## Authentication
- API Keys
- OAuth 2.0
- JWT Tokens""",
            "category": "Networking",
            "tags": ["REST", "API", "design", "HTTP"],
            "author": "System Design Team",
            "read_time": 22,
            "week": 2,
            "day": 4,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "GraphQL, gRPC & WebSockets",
            "body": """# Alternative API Protocols

## GraphQL
- Query language for APIs
- Client specifies exact data needed
- Single endpoint
- Strongly typed schema

## gRPC
- Google's RPC framework
- Protocol Buffers (binary)
- Bi-directional streaming
- High performance

## WebSockets
- Full-duplex communication
- Persistent connection
- Real-time updates
- Use: Chat, live feeds, gaming

## Choosing the Right Protocol
- REST: Simple CRUD operations
- GraphQL: Complex queries, mobile apps
- gRPC: Microservices, internal APIs
- WebSocket: Real-time features""",
            "category": "Networking",
            "tags": ["GraphQL", "gRPC", "WebSockets", "APIs"],
            "author": "System Design Team",
            "read_time": 20,
            "week": 2,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 3 Content
        {
            "title": "SQL Databases - Relational Model & Normalization",
            "body": """# SQL Databases

## The Relational Model
The relational model organizes data into tables (relations) with rows (tuples) and columns (attributes).

## Normalization
Normalization is the process of organizing data to minimize redundancy.

### First Normal Form (1NF)
- Atomic values only
- No repeating groups

### Second Normal Form (2NF)
- Must be in 1NF
- No partial dependencies

### Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies

### Boyce-Codd Normal Form (BCNF)
- Must be in 3NF
- Every determinant is a candidate key

## SQL Joins
- INNER JOIN: Returns matching rows from both tables
- LEFT JOIN: Returns all rows from left table, matching from right
- RIGHT JOIN: Returns all rows from right table, matching from left
- FULL OUTER JOIN: Returns all rows from both tables

## Popular SQL Databases
- PostgreSQL: Feature-rich, ACID compliant
- MySQL: Popular, widely used
- SQL Server: Enterprise, Windows ecosystem""",
            "category": "Databases",
            "tags": ["SQL", "relational", "normalization", "PostgreSQL", "MySQL"],
            "author": "System Design Team",
            "read_time": 20,
            "week": 3,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "NoSQL Databases - Types and Use Cases",
            "body": """# NoSQL Databases

## Types of NoSQL Databases

### Document Stores
Store data as JSON-like documents. Examples: MongoDB, CouchDB.
Best for: Content management, catalogs, user profiles.

### Key-Value Stores
Simple key-value pairs. Examples: Redis, DynamoDB.
Best for: Caching, sessions, real-time data.

### Column-Family Stores
Data stored in columns instead of rows. Examples: Cassandra, HBase.
Best for: Time-series data, analytics, logging.

### Graph Databases
Store nodes and relationships. Examples: Neo4j, Amazon Neptune.
Best for: Social networks, recommendations, fraud detection.

## SQL vs NoSQL Decision Framework
Choose SQL when:
- Strong consistency is required
- Complex queries with joins
- ACID transactions are critical

Choose NoSQL when:
- Flexible schema needed
- Horizontal scalability is priority
- High write throughput required
- Geographic distribution needed""",
            "category": "Databases",
            "tags": ["NoSQL", "MongoDB", "Redis", "Cassandra", "Neo4j"],
            "author": "System Design Team",
            "read_time": 18,
            "week": 3,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Database Indexing & Query Optimization",
            "body": """# Database Indexing

## Why Indexes Matter
Indexes speed up data retrieval by creating optimized data structures.

## Index Types

### B-Tree Index
- Balanced tree structure
- Good for range queries and equality
- Default index type in most databases

### Hash Index
- Fast for exact matches
- Cannot be used for range queries
- O(1) lookup time

### Composite Index
- Multiple columns in one index
- Follows leftmost prefix rule
- Order of columns matters

### Covering Index
- Contains all columns needed by query
- Query can be satisfied from index alone

## Query Optimization

### Using EXPLAIN
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

### Optimization Tips
1. Index columns used in WHERE clauses
2. Avoid SELECT *
3. Use appropriate data types
4. Avoid functions on indexed columns
5. Consider query execution order""",
            "category": "Databases",
            "tags": ["indexing", "B-tree", "query optimization", "performance"],
            "author": "System Design Team",
            "read_time": 22,
            "week": 3,
            "day": 3,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "ACID Properties & Transactions",
            "body": """# ACID Properties

## Atomicity
All or nothing - either all operations in a transaction succeed, or none do.

## Consistency
Database moves from one valid state to another valid state.

## Isolation
Concurrent transactions don't interfere with each other.

### Isolation Levels
1. Read Uncommitted - Dirty reads possible
2. Read Committed - Only committed data visible
3. Repeatable Read - Same query returns same results
4. Serializable - Full isolation, slowest

## Durability
Committed transactions survive system failures.

## MVCC (Multi-Version Concurrency Control)
- Maintains multiple versions of data
- Readers don't block writers
- Writers don't block readers
- Used by PostgreSQL and MySQL InnoDB

## Distributed Transactions
- Two-Phase Commit (2PC): Prepare and commit phases
- Saga Pattern: Compensating transactions for failures""",
            "category": "Databases",
            "tags": ["ACID", "transactions", "isolation levels", "MVCC"],
            "author": "System Design Team",
            "read_time": 25,
            "week": 3,
            "day": 4,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Database Replication Strategies",
            "body": """# Database Replication

## Why Replication?
- High availability
- Disaster recovery
- Read scalability
- Geographic distribution

## Replication Topologies

### Master-Slave Replication
- One master handles writes
- Slaves handle reads
- Simple, widely used

### Multi-Master Replication
- Multiple nodes accept writes
- Higher availability
- Complex conflict resolution

## Sync vs Async Replication

### Synchronous
- Master waits for replica acknowledgment
- Zero data loss
- Higher latency

### Asynchronous
- Master doesn't wait
- Lower latency
- Potential data loss

## Handling Replication Lag
- Read-your-writes consistency
- Monotonic reads
- Version tracking

## Conflict Resolution
- Last-Write-Wins (LWW)
- CRDTs (Conflict-free Replicated Data Types)
- Application-level resolution""",
            "category": "Databases",
            "tags": ["replication", "master-slave", "multi-master", "CRDTs"],
            "author": "System Design Team",
            "read_time": 28,
            "week": 3,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
    ]

    assignments_data = [
        # Week 1 Assignments
        {
            "title": "System Design Fundamentals Assignment",
            "description": "Comprehensive assignment covering system design basics, HLD vs LLD, core components, and real-world analysis",
            "requirements": [
                "Part 1: Explain the difference between HLD and LLD with 2 examples each (15 points)",
                "Part 2: Define 5 core system properties (Scalability, Reliability, Availability, Maintainability, Performance) with real-world examples (10 points)",
                "Part 3: Match 8 system components to their functions (10 points)",
                "Part 4: Create an architecture diagram for a basic e-commerce system with Client, Load Balancer, App Servers, Database, Cache, and CDN (30 points)",
                "Part 5: Analyze a real-world application (Twitter/Netflix/Uber) - list 4 functional requirements, 4 non-functional requirements, and 2 key architecture decisions (12 points)",
                "Part 6: Calculate availability metrics for a system with 99.9% SLA (8 points)",
                "Part 7: Write reflections on why system design matters and concepts learned (15 points)",
                "Bonus: Compare scale of personal blog vs Medium, local app vs Uber Eats (15 extra points)"
            ],
            "difficulty": "Beginner",
            "category": "Fundamentals",
            "max_score": 100,
            "week": 1,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Requirements Document",
            "description": "Create a requirements document for a social media app",
            "requirements": [
                "List 10 functional requirements",
                "List 5 non-functional requirements with specific metrics",
                "Apply MoSCoW prioritization",
                "Create user stories for top 3 features"
            ],
            "difficulty": "Beginner",
            "category": "Fundamentals",
            "max_score": 50,
            "week": 1,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Scaling Strategy Analysis",
            "description": "Analyze scaling strategies for an e-commerce platform",
            "requirements": [
                "Compare vertical vs horizontal scaling for given scenario",
                "Identify which components should scale horizontally",
                "Design a stateless architecture",
                "Document trade-offs of each approach"
            ],
            "difficulty": "Intermediate",
            "category": "Fundamentals",
            "max_score": 75,
            "week": 1,
            "day": 3,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Capacity Estimation Exercise",
            "description": "Perform back-of-envelope calculations for Twitter-like service",
            "requirements": [
                "Estimate daily active users and tweets per day",
                "Calculate storage requirements for 5 years",
                "Estimate bandwidth for read/write operations",
                "Calculate required number of servers"
            ],
            "difficulty": "Intermediate",
            "category": "Fundamentals",
            "max_score": 75,
            "week": 1,
            "day": 4,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Design a URL Shortener",
            "description": "Design a URL shortening service like bit.ly",
            "requirements": [
                "Handle 100M URLs per day",
                "URLs should be as short as possible",
                "Support custom short URLs",
                "Analytics for clicks"
            ],
            "difficulty": "Intermediate",
            "category": "System Design",
            "max_score": 100,
            "week": 1,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Week 1 Project: Design a Pastebin Service",
            "description": "Complete system design for a Pastebin-like service applying all Week 1 concepts",
            "requirements": [
                "Gather and document functional/non-functional requirements",
                "Perform capacity estimation (storage, bandwidth, QPS)",
                "Design system architecture with all components",
                "Apply RESHADED framework for complete design",
                "Identify scaling strategies and trade-offs"
            ],
            "difficulty": "Intermediate",
            "category": "System Design",
            "max_score": 200,
            "week": 1,
            "is_weekly_project": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Design a Rate Limiter",
            "description": "Design a distributed rate limiting system",
            "requirements": [
                "Support multiple rate limiting algorithms",
                "Handle 10K requests per second",
                "Distributed across multiple servers",
                "Low latency"
            ],
            "difficulty": "Advanced",
            "category": "Infrastructure",
            "max_score": 100,
            "week": 5,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 3 Assignments
        {
            "title": "Design an E-commerce Database Schema",
            "description": "Design a normalized database schema for an e-commerce platform",
            "requirements": [
                "Design tables for users, products, orders, and reviews",
                "Normalize to 3NF",
                "Write SQL queries for common operations",
                "Include appropriate indexes"
            ],
            "difficulty": "Intermediate",
            "category": "Databases",
            "max_score": 100,
            "week": 3,
            "day": 1,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "MongoDB Data Model Design",
            "description": "Design a MongoDB schema for a blog platform",
            "requirements": [
                "Design document schemas for posts, users, and comments",
                "Decide on embedding vs referencing",
                "Optimize for common read patterns",
                "Handle relationships efficiently"
            ],
            "difficulty": "Intermediate",
            "category": "Databases",
            "max_score": 100,
            "week": 3,
            "day": 2,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Query Optimization Challenge",
            "description": "Optimize slow queries using indexing strategies",
            "requirements": [
                "Analyze query execution plans",
                "Create appropriate indexes",
                "Measure performance improvement",
                "Document trade-offs"
            ],
            "difficulty": "Advanced",
            "category": "Databases",
            "max_score": 100,
            "week": 3,
            "day": 3,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Transaction Design for Payment System",
            "description": "Design transactions for a payment processing system",
            "requirements": [
                "Handle concurrent payment requests",
                "Implement proper isolation levels",
                "Design distributed saga for cross-service operations",
                "Handle failure scenarios"
            ],
            "difficulty": "Advanced",
            "category": "Databases",
            "max_score": 100,
            "week": 3,
            "day": 4,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Database Replication Strategy Design",
            "description": "Design replication strategy for a global application",
            "requirements": [
                "Choose appropriate replication topology",
                "Handle replication lag in application code",
                "Implement conflict resolution strategy",
                "Design automatic failover"
            ],
            "difficulty": "Advanced",
            "category": "Databases",
            "max_score": 100,
            "week": 3,
            "day": 5,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Design a Social Media Database",
            "description": "Complete database design for a social media platform at scale",
            "requirements": [
                "Design schema for users, posts, comments, likes, follows",
                "Implement sharding strategy",
                "Design replication for global scale",
                "Handle feed generation efficiently"
            ],
            "difficulty": "Advanced",
            "category": "Databases",
            "max_score": 200,
            "week": 3,
            "is_weekly_project": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
    ]

    quizzes_data = [
        {
            "title": "Introduction to System Design Quiz",
            "description": "Test your understanding of system design fundamentals, HLD vs LLD, and core components",
            "category": "Fundamentals",
            "time_limit": 15,
            "passing_score": 70,
            "week": 1,
            "day": 1,
            "questions": [
                {
                    "id": 1,
                    "question": "What is the primary goal of system design?",
                    "options": [
                        "Writing efficient code with optimal algorithms",
                        "Creating visually appealing user interfaces",
                        "Defining architecture, components, and data flow to satisfy requirements",
                        "Testing software applications for bugs and errors"
                    ],
                    "correct_answer": "Defining architecture, components, and data flow to satisfy requirements",
                    "explanation": "System design is about creating the blueprint for how software will be built, deployed, and scaled."
                },
                {
                    "id": 2,
                    "question": "Which of the following is a characteristic of High-Level Design (HLD)?",
                    "options": [
                        "Detailed class diagrams and method signatures",
                        "Algorithm implementation and pseudocode",
                        "Overall system architecture and component interactions",
                        "Database schema design with specific column types"
                    ],
                    "correct_answer": "Overall system architecture and component interactions",
                    "explanation": "HLD provides a bird's eye view of the system, focusing on architecture and major components."
                },
                {
                    "id": 3,
                    "question": "What is the difference between latency and throughput?",
                    "options": [
                        "Latency is total requests; throughput is time per request",
                        "Latency is time per request; throughput is requests per unit time",
                        "They are the same metric measured differently",
                        "Latency measures storage; throughput measures network speed"
                    ],
                    "correct_answer": "Latency is time per request; throughput is requests per unit time",
                    "explanation": "Latency measures response time for a single request, while throughput measures how many requests can be processed."
                },
                {
                    "id": 4,
                    "question": "A system with 99.9% availability (three nines) can have approximately how much downtime per year?",
                    "options": [
                        "3.65 days",
                        "8.77 hours",
                        "52.60 minutes",
                        "5.26 minutes"
                    ],
                    "correct_answer": "8.77 hours",
                    "explanation": "99.9% availability allows for about 8.77 hours of downtime per year (0.1% of a year)."
                },
                {
                    "id": 5,
                    "question": "Which component is responsible for distributing incoming traffic across multiple servers?",
                    "options": [
                        "Cache",
                        "Database",
                        "Load Balancer",
                        "Message Queue"
                    ],
                    "correct_answer": "Load Balancer",
                    "explanation": "Load balancers distribute traffic to prevent any single server from being overwhelmed."
                },
                {
                    "id": 6,
                    "question": "What is the main advantage of microservices architecture over monolithic architecture?",
                    "options": [
                        "Simpler to develop and deploy initially",
                        "Lower operational complexity",
                        "Independent deployment and scaling of services",
                        "All code in one place for easier debugging"
                    ],
                    "correct_answer": "Independent deployment and scaling of services",
                    "explanation": "Microservices allow each service to be deployed, scaled, and updated independently."
                },
                {
                    "id": 7,
                    "question": "What is the primary purpose of a CDN (Content Delivery Network)?",
                    "options": [
                        "To permanently store user data",
                        "To process business logic",
                        "To cache static content at edge locations worldwide",
                        "To authenticate user requests"
                    ],
                    "correct_answer": "To cache static content at edge locations worldwide",
                    "explanation": "CDNs cache static content at edge locations to reduce latency for global users."
                },
                {
                    "id": 8,
                    "question": "In the context of service reliability, what do SLA, SLO, and SLI stand for?",
                    "options": [
                        "Service Level Architecture, Service Level Output, Service Level Input",
                        "Service Level Agreement, Service Level Objective, Service Level Indicator",
                        "System Load Average, System Load Optimization, System Load Index",
                        "Scalability Level Agreement, Scalability Level Objective, Scalability Level Indicator"
                    ],
                    "correct_answer": "Service Level Agreement, Service Level Objective, Service Level Indicator",
                    "explanation": "SLA is a contract, SLO is an internal target, and SLI is the metric that measures the SLO."
                },
                {
                    "id": 9,
                    "question": "Which caching strategy involves the application managing the cache manually?",
                    "options": [
                        "Read-Through",
                        "Write-Through",
                        "Cache-Aside (Lazy Loading)",
                        "Write-Behind"
                    ],
                    "correct_answer": "Cache-Aside (Lazy Loading)",
                    "explanation": "In Cache-Aside, the application checks cache first, reads from DB on miss, then updates cache."
                },
                {
                    "id": 10,
                    "question": "What is the 'R' in the RESHADED framework for system design?",
                    "options": [
                        "Replication",
                        "Requirements",
                        "Reliability",
                        "Routing"
                    ],
                    "correct_answer": "Requirements",
                    "explanation": "RESHADED starts with Requirements - clarifying functional and non-functional requirements."
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 1 Quizzes (Days 2-5)
        {
            "title": "Requirements Engineering Quiz",
            "description": "Test your knowledge of functional and non-functional requirements",
            "category": "Fundamentals",
            "time_limit": 15,
            "passing_score": 70,
            "week": 1,
            "day": 2,
            "questions": [
                {"id": 1, "question": "Which is a functional requirement?", "options": ["99.9% uptime", "User can login", "Response < 200ms", "Handle 10K users"], "correct_answer": "User can login"},
                {"id": 2, "question": "What does availability of 99.9% mean?", "options": ["~9 hours downtime/year", "~9 days downtime/year", "~9 minutes downtime/year", "~52 minutes downtime/year"], "correct_answer": "~9 hours downtime/year"},
                {"id": 3, "question": "In MoSCoW, what does M stand for?", "options": ["Maybe", "Must Have", "Might Have", "More"], "correct_answer": "Must Have"},
                {"id": 4, "question": "P95 latency means?", "options": ["95% uptime", "95th percentile response time", "95 ms response", "95% success rate"], "correct_answer": "95th percentile response time"},
                {"id": 5, "question": "Which is a non-functional requirement?", "options": ["User can post", "User can search", "System handles 1M users", "User can comment"], "correct_answer": "System handles 1M users"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Scalability Quiz",
            "description": "Test your knowledge of scaling concepts",
            "category": "Fundamentals",
            "time_limit": 15,
            "passing_score": 70,
            "week": 1,
            "day": 3,
            "questions": [
                {"id": 1, "question": "Vertical scaling means?", "options": ["Adding more machines", "Adding more power to machine", "Adding more regions", "Adding more users"], "correct_answer": "Adding more power to machine"},
                {"id": 2, "question": "Stateless architecture means?", "options": ["No database", "No session on server", "No caching", "No load balancer"], "correct_answer": "No session on server"},
                {"id": 3, "question": "Advantage of horizontal scaling?", "options": ["Simpler", "No code changes", "Near-infinite scaling", "Lower latency"], "correct_answer": "Near-infinite scaling"},
                {"id": 4, "question": "SPOF stands for?", "options": ["Single Point of Failure", "Server Point of Failure", "System Point of Failure", "Simple Point of Failure"], "correct_answer": "Single Point of Failure"},
                {"id": 5, "question": "What enables easy horizontal scaling?", "options": ["More RAM", "Stateless design", "Bigger database", "Faster network"], "correct_answer": "Stateless design"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Estimation Quiz",
            "description": "Test your back-of-envelope calculation skills",
            "category": "Fundamentals",
            "time_limit": 15,
            "passing_score": 70,
            "week": 1,
            "day": 4,
            "questions": [
                {"id": 1, "question": "Approximately how many seconds in a day?", "options": ["36,000", "86,400", "100,000", "3,600"], "correct_answer": "86,400"},
                {"id": 2, "question": "1 million requests/day is approximately?", "options": ["100 RPS", "12 RPS", "1000 RPS", "1 RPS"], "correct_answer": "12 RPS"},
                {"id": 3, "question": "2^30 is approximately?", "options": ["1 million", "1 billion", "1 trillion", "1 thousand"], "correct_answer": "1 billion"},
                {"id": 4, "question": "1 TB equals?", "options": ["1000 GB", "1024 GB", "100 GB", "10000 GB"], "correct_answer": "1024 GB"},
                {"id": 5, "question": "Peak traffic is typically?", "options": ["Same as average", "2-3x average", "10x average", "100x average"], "correct_answer": "2-3x average"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "System Design Framework Quiz",
            "description": "Test your knowledge of the RESHADED framework",
            "category": "Fundamentals",
            "time_limit": 15,
            "passing_score": 70,
            "week": 1,
            "day": 5,
            "questions": [
                {"id": 1, "question": "First step in RESHADED?", "options": ["Estimation", "Requirements", "Storage", "High-level Design"], "correct_answer": "Requirements"},
                {"id": 2, "question": "What does H in RESHADED stand for?", "options": ["Hardware", "High-level Design", "Hosting", "Hashing"], "correct_answer": "High-level Design"},
                {"id": 3, "question": "When do you discuss trade-offs?", "options": ["Beginning", "Middle", "Evaluate phase", "Never"], "correct_answer": "Evaluate phase"},
                {"id": 4, "question": "API Design comes after?", "options": ["Requirements", "High-level Design", "Detailed Design", "Estimation"], "correct_answer": "High-level Design"},
                {"id": 5, "question": "Last step in RESHADED?", "options": ["Evaluate", "Discuss", "Detailed Design", "API Design"], "correct_answer": "Discuss"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Week 1 Comprehensive Quiz",
            "description": "Comprehensive quiz covering all Week 1 topics",
            "category": "Fundamentals",
            "time_limit": 45,
            "passing_score": 70,
            "week": 1,
            "is_weekly_quiz": True,
            "questions": [
                {"id": 1, "question": "HLD focuses on?", "options": ["Code", "Architecture", "Testing", "Deployment"], "correct_answer": "Architecture"},
                {"id": 2, "question": "LLD focuses on?", "options": ["Architecture", "Implementation details", "Deployment", "Monitoring"], "correct_answer": "Implementation details"},
                {"id": 3, "question": "Functional requirement example?", "options": ["99.9% uptime", "User can post", "< 200ms latency", "10K concurrent users"], "correct_answer": "User can post"},
                {"id": 4, "question": "Vertical scaling disadvantage?", "options": ["Complex", "Hardware limits", "Requires code changes", "Network overhead"], "correct_answer": "Hardware limits"},
                {"id": 5, "question": "Horizontal scaling advantage?", "options": ["Simpler", "No limits", "Lower latency", "No code changes"], "correct_answer": "No limits"},
                {"id": 6, "question": "Seconds in a day?", "options": ["36,000", "86,400", "100,000", "3,600"], "correct_answer": "86,400"},
                {"id": 7, "question": "2^10 equals?", "options": ["100", "1000", "1024", "10000"], "correct_answer": "1024"},
                {"id": 8, "question": "MoSCoW S stands for?", "options": ["Sometimes", "Should Have", "Simple", "Soon"], "correct_answer": "Should Have"},
                {"id": 9, "question": "Stateless enables?", "options": ["More storage", "Easy scaling", "Better security", "Faster queries"], "correct_answer": "Easy scaling"},
                {"id": 10, "question": "Load balancer distributes?", "options": ["Data", "Traffic", "Storage", "Memory"], "correct_answer": "Traffic"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 2 Quizzes
        {
            "title": "DNS Quiz",
            "description": "Test your knowledge of DNS and domain resolution",
            "category": "Networking",
            "time_limit": 15,
            "passing_score": 70,
            "week": 2,
            "day": 1,
            "questions": [
                {"id": 1, "question": "DNS translates?", "options": ["IP to MAC", "Domain to IP", "Port to IP", "URL to domain"], "correct_answer": "Domain to IP"},
                {"id": 2, "question": "A record maps to?", "options": ["IPv6", "IPv4", "Mail server", "Alias"], "correct_answer": "IPv4"},
                {"id": 3, "question": "CNAME is for?", "options": ["IPv4", "IPv6", "Alias", "Mail"], "correct_answer": "Alias"},
                {"id": 4, "question": "TTL controls?", "options": ["Speed", "Cache duration", "Security", "Routing"], "correct_answer": "Cache duration"},
                {"id": 5, "question": "MX record is for?", "options": ["Main server", "Mail server", "Master server", "Mirror server"], "correct_answer": "Mail server"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "HTTP/HTTPS Quiz",
            "description": "Test your knowledge of HTTP protocols",
            "category": "Networking",
            "time_limit": 15,
            "passing_score": 70,
            "week": 2,
            "day": 2,
            "questions": [
                {"id": 1, "question": "GET is for?", "options": ["Create", "Read", "Update", "Delete"], "correct_answer": "Read"},
                {"id": 2, "question": "201 status means?", "options": ["OK", "Created", "Not Found", "Error"], "correct_answer": "Created"},
                {"id": 3, "question": "404 status means?", "options": ["OK", "Created", "Not Found", "Server Error"], "correct_answer": "Not Found"},
                {"id": 4, "question": "HTTPS uses?", "options": ["SSL only", "TLS", "SSH", "VPN"], "correct_answer": "TLS"},
                {"id": 5, "question": "HTTP/2 feature?", "options": ["Plain text", "Multiplexing", "No encryption", "Single request"], "correct_answer": "Multiplexing"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "TCP vs UDP Quiz",
            "description": "Test your knowledge of transport protocols",
            "category": "Networking",
            "time_limit": 15,
            "passing_score": 70,
            "week": 2,
            "day": 3,
            "questions": [
                {"id": 1, "question": "TCP is?", "options": ["Connectionless", "Connection-oriented", "Unreliable", "Fast"], "correct_answer": "Connection-oriented"},
                {"id": 2, "question": "UDP is best for?", "options": ["Email", "File transfer", "Gaming", "Banking"], "correct_answer": "Gaming"},
                {"id": 3, "question": "TCP 3-way handshake steps?", "options": ["2", "3", "4", "5"], "correct_answer": "3"},
                {"id": 4, "question": "UDP advantage?", "options": ["Reliability", "Ordering", "Low latency", "Error correction"], "correct_answer": "Low latency"},
                {"id": 5, "question": "Web browsing uses?", "options": ["UDP", "TCP", "Both equally", "Neither"], "correct_answer": "TCP"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "REST API Quiz",
            "description": "Test your knowledge of REST API design",
            "category": "Networking",
            "time_limit": 15,
            "passing_score": 70,
            "week": 2,
            "day": 4,
            "questions": [
                {"id": 1, "question": "REST uses?", "options": ["TCP only", "HTTP methods", "Binary protocol", "UDP"], "correct_answer": "HTTP methods"},
                {"id": 2, "question": "Resource naming should use?", "options": ["Verbs", "Nouns", "Numbers", "Symbols"], "correct_answer": "Nouns"},
                {"id": 3, "question": "DELETE is?", "options": ["Idempotent", "Not idempotent", "Sometimes", "Never used"], "correct_answer": "Idempotent"},
                {"id": 4, "question": "JWT is for?", "options": ["Encryption", "Authentication", "Compression", "Caching"], "correct_answer": "Authentication"},
                {"id": 5, "question": "API versioning goes in?", "options": ["Body", "Header or URL", "Cookie", "Session"], "correct_answer": "Header or URL"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "GraphQL & gRPC Quiz",
            "description": "Test your knowledge of alternative APIs",
            "category": "Networking",
            "time_limit": 15,
            "passing_score": 70,
            "week": 2,
            "day": 5,
            "questions": [
                {"id": 1, "question": "GraphQL uses?", "options": ["Multiple endpoints", "Single endpoint", "No endpoints", "Binary protocol"], "correct_answer": "Single endpoint"},
                {"id": 2, "question": "gRPC uses?", "options": ["JSON", "XML", "Protocol Buffers", "Plain text"], "correct_answer": "Protocol Buffers"},
                {"id": 3, "question": "WebSocket is?", "options": ["Half-duplex", "Full-duplex", "Simplex", "No duplex"], "correct_answer": "Full-duplex"},
                {"id": 4, "question": "Best for microservices?", "options": ["REST", "GraphQL", "gRPC", "WebSocket"], "correct_answer": "gRPC"},
                {"id": 5, "question": "Best for real-time chat?", "options": ["REST", "GraphQL", "gRPC", "WebSocket"], "correct_answer": "WebSocket"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Week 2 Comprehensive Quiz",
            "description": "Comprehensive quiz covering all Week 2 networking topics",
            "category": "Networking",
            "time_limit": 45,
            "passing_score": 70,
            "week": 2,
            "is_weekly_quiz": True,
            "questions": [
                {"id": 1, "question": "DNS translates domain to?", "options": ["MAC", "IP", "Port", "URL"], "correct_answer": "IP"},
                {"id": 2, "question": "A record is for?", "options": ["IPv4", "IPv6", "Alias", "Mail"], "correct_answer": "IPv4"},
                {"id": 3, "question": "HTTP GET is?", "options": ["Not safe", "Safe and idempotent", "Not idempotent", "Unsafe"], "correct_answer": "Safe and idempotent"},
                {"id": 4, "question": "500 status means?", "options": ["OK", "Client error", "Server error", "Redirect"], "correct_answer": "Server error"},
                {"id": 5, "question": "TCP provides?", "options": ["Speed", "Reliability", "Simplicity", "Broadcast"], "correct_answer": "Reliability"},
                {"id": 6, "question": "UDP is used for?", "options": ["Banking", "Streaming", "Email", "File transfer"], "correct_answer": "Streaming"},
                {"id": 7, "question": "REST is?", "options": ["Stateful", "Stateless", "Binary", "Encrypted"], "correct_answer": "Stateless"},
                {"id": 8, "question": "GraphQL advantage?", "options": ["Simplicity", "Query exactly needed data", "Binary format", "Multiple endpoints"], "correct_answer": "Query exactly needed data"},
                {"id": 9, "question": "gRPC is best for?", "options": ["Browser apps", "Internal microservices", "Public APIs", "Real-time"], "correct_answer": "Internal microservices"},
                {"id": 10, "question": "WebSocket use case?", "options": ["File download", "Static pages", "Live notifications", "Batch processing"], "correct_answer": "Live notifications"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        # Week 3 Quizzes
        {
            "title": "SQL Databases Quiz",
            "description": "Test your knowledge of SQL databases and normalization",
            "category": "Databases",
            "time_limit": 15,
            "passing_score": 70,
            "week": 3,
            "day": 1,
            "questions": [
                {
                    "id": 1,
                    "question": "Which normal form eliminates transitive dependencies?",
                    "options": ["1NF", "2NF", "3NF", "BCNF"],
                    "correct_answer": "3NF"
                },
                {
                    "id": 2,
                    "question": "What type of JOIN returns all rows from the left table?",
                    "options": ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
                    "correct_answer": "LEFT JOIN"
                },
                {
                    "id": 3,
                    "question": "When should you consider denormalization?",
                    "options": [
                        "When you have too many tables",
                        "When read performance is critical",
                        "When you want to reduce storage",
                        "When you have many insert operations"
                    ],
                    "correct_answer": "When read performance is critical"
                },
                {
                    "id": 4,
                    "question": "What is a foreign key?",
                    "options": [
                        "A unique identifier for a table",
                        "A reference to a primary key in another table",
                        "An encrypted column",
                        "A computed column"
                    ],
                    "correct_answer": "A reference to a primary key in another table"
                },
                {
                    "id": 5,
                    "question": "Which clause filters groups after GROUP BY?",
                    "options": ["WHERE", "HAVING", "FILTER", "LIMIT"],
                    "correct_answer": "HAVING"
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "NoSQL Databases Quiz",
            "description": "Test your knowledge of NoSQL database types and use cases",
            "category": "Databases",
            "time_limit": 15,
            "passing_score": 70,
            "week": 3,
            "day": 2,
            "questions": [
                {
                    "id": 1,
                    "question": "Which NoSQL type is best for social network relationships?",
                    "options": ["Document store", "Key-Value store", "Column-family", "Graph database"],
                    "correct_answer": "Graph database"
                },
                {
                    "id": 2,
                    "question": "What is the main advantage of document databases?",
                    "options": [
                        "Strong schema enforcement",
                        "Complex JOIN operations",
                        "Flexible schema and nested data",
                        "Better transaction support"
                    ],
                    "correct_answer": "Flexible schema and nested data"
                },
                {
                    "id": 3,
                    "question": "Which NoSQL type is best for caching with TTL?",
                    "options": ["MongoDB", "Redis", "Cassandra", "Neo4j"],
                    "correct_answer": "Redis"
                },
                {
                    "id": 4,
                    "question": "Cassandra is optimized for which workload?",
                    "options": [
                        "Complex JOIN queries",
                        "High write throughput",
                        "Small datasets with ACID",
                        "Graph traversals"
                    ],
                    "correct_answer": "High write throughput"
                },
                {
                    "id": 5,
                    "question": "In MongoDB, a collection is equivalent to what in SQL?",
                    "options": ["Database", "Table", "Row", "Column"],
                    "correct_answer": "Table"
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Database Indexing Quiz",
            "description": "Test your knowledge of database indexing and query optimization",
            "category": "Databases",
            "time_limit": 15,
            "passing_score": 70,
            "week": 3,
            "day": 3,
            "questions": [
                {
                    "id": 1,
                    "question": "What is a B-tree index best suited for?",
                    "options": [
                        "Exact match lookups only",
                        "Range queries and equality",
                        "Full-text search",
                        "Spatial queries"
                    ],
                    "correct_answer": "Range queries and equality"
                },
                {
                    "id": 2,
                    "question": "What is a covering index?",
                    "options": [
                        "An index that covers all tables",
                        "An index that includes all query columns",
                        "An index on NULL values",
                        "An encrypted index"
                    ],
                    "correct_answer": "An index that includes all query columns"
                },
                {
                    "id": 3,
                    "question": "For composite index (A, B, C), which query can use it?",
                    "options": [
                        "Query filtering on B only",
                        "Query filtering on C only",
                        "Query filtering on A and B",
                        "Query filtering on B and C"
                    ],
                    "correct_answer": "Query filtering on A and B"
                },
                {
                    "id": 4,
                    "question": "What is the main disadvantage of too many indexes?",
                    "options": [
                        "Queries become slower",
                        "Write operations become slower",
                        "Disk space is reduced",
                        "Read operations fail"
                    ],
                    "correct_answer": "Write operations become slower"
                },
                {
                    "id": 5,
                    "question": "What does EXPLAIN ANALYZE show?",
                    "options": [
                        "Index usage only",
                        "Actual execution time and row counts",
                        "Table structure",
                        "Query syntax errors"
                    ],
                    "correct_answer": "Actual execution time and row counts"
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "ACID & Transactions Quiz",
            "description": "Test your knowledge of ACID properties and transaction isolation",
            "category": "Databases",
            "time_limit": 15,
            "passing_score": 70,
            "week": 3,
            "day": 4,
            "questions": [
                {
                    "id": 1,
                    "question": "Which ACID property ensures all-or-nothing?",
                    "options": ["Atomicity", "Consistency", "Isolation", "Durability"],
                    "correct_answer": "Atomicity"
                },
                {
                    "id": 2,
                    "question": "Which isolation level prevents dirty reads but allows non-repeatable reads?",
                    "options": ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
                    "correct_answer": "Read Committed"
                },
                {
                    "id": 3,
                    "question": "What is MVCC?",
                    "options": [
                        "A locking mechanism",
                        "Multi-version concurrency control",
                        "A backup strategy",
                        "A type of index"
                    ],
                    "correct_answer": "Multi-version concurrency control"
                },
                {
                    "id": 4,
                    "question": "In Saga pattern, what happens when a step fails?",
                    "options": [
                        "System crashes",
                        "All steps are retried",
                        "Compensating transactions execute",
                        "Failure is ignored"
                    ],
                    "correct_answer": "Compensating transactions execute"
                },
                {
                    "id": 5,
                    "question": "What is a dirty read?",
                    "options": [
                        "Reading corrupted data",
                        "Reading uncommitted data",
                        "Reading old data",
                        "Reading from cache"
                    ],
                    "correct_answer": "Reading uncommitted data"
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Database Replication Quiz",
            "description": "Test your knowledge of database replication strategies",
            "category": "Databases",
            "time_limit": 15,
            "passing_score": 70,
            "week": 3,
            "day": 5,
            "questions": [
                {
                    "id": 1,
                    "question": "In master-slave replication, which node handles writes?",
                    "options": ["Any slave", "Master only", "Both", "Dedicated write node"],
                    "correct_answer": "Master only"
                },
                {
                    "id": 2,
                    "question": "What is the main advantage of synchronous replication?",
                    "options": [
                        "Lower latency",
                        "Higher availability",
                        "Zero data loss on failover",
                        "Simpler implementation"
                    ],
                    "correct_answer": "Zero data loss on failover"
                },
                {
                    "id": 3,
                    "question": "What is replication lag?",
                    "options": [
                        "Setup time",
                        "Delay between master write and replica visibility",
                        "Network bandwidth limit",
                        "Maximum replica count"
                    ],
                    "correct_answer": "Delay between master write and replica visibility"
                },
                {
                    "id": 4,
                    "question": "What does a CRDT guarantee?",
                    "options": [
                        "Synchronous updates",
                        "Conflict-free convergence",
                        "Single-master writes",
                        "Zero replication lag"
                    ],
                    "correct_answer": "Conflict-free convergence"
                },
                {
                    "id": 5,
                    "question": "What is split-brain in replication?",
                    "options": [
                        "Database out of memory",
                        "Multiple nodes believe they are master",
                        "Replication stopped",
                        "Query timeout"
                    ],
                    "correct_answer": "Multiple nodes believe they are master"
                }
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Week 3 Comprehensive Quiz: Database Systems",
            "description": "Comprehensive quiz covering all Week 3 database topics",
            "category": "Databases",
            "time_limit": 45,
            "passing_score": 70,
            "week": 3,
            "is_weekly_quiz": True,
            "questions": [
                {"id": 1, "question": "Which normal form eliminates transitive dependencies?", "options": ["1NF", "2NF", "3NF", "BCNF"], "correct_answer": "3NF"},
                {"id": 2, "question": "What type of JOIN returns all rows from the left table?", "options": ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"], "correct_answer": "LEFT JOIN"},
                {"id": 3, "question": "Which NoSQL type is best for social networks?", "options": ["Document", "Key-Value", "Column-family", "Graph"], "correct_answer": "Graph"},
                {"id": 4, "question": "Redis is best suited for?", "options": ["Complex queries", "Caching and sessions", "Analytics", "Graph traversal"], "correct_answer": "Caching and sessions"},
                {"id": 5, "question": "B-tree indexes are best for?", "options": ["Exact matches only", "Range queries", "Full-text search", "Spatial queries"], "correct_answer": "Range queries"},
                {"id": 6, "question": "Composite index (A,B,C) can be used for?", "options": ["Query on B", "Query on C", "Query on A,B", "Query on B,C"], "correct_answer": "Query on A,B"},
                {"id": 7, "question": "ACID: Atomicity means?", "options": ["Fast operations", "All or nothing", "No conflicts", "Data survives crashes"], "correct_answer": "All or nothing"},
                {"id": 8, "question": "Which isolation level is strongest?", "options": ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], "correct_answer": "Serializable"},
                {"id": 9, "question": "Master-slave replication main benefit?", "options": ["Write scaling", "Conflict resolution", "Read scaling", "Lower latency"], "correct_answer": "Read scaling"},
                {"id": 10, "question": "Synchronous replication ensures?", "options": ["Low latency", "High availability", "Zero data loss", "Simple setup"], "correct_answer": "Zero data loss"},
                {"id": 11, "question": "What causes replication lag?", "options": ["Too many indexes", "Network latency", "Too few tables", "Small data"], "correct_answer": "Network latency"},
                {"id": 12, "question": "CRDTs are used for?", "options": ["Indexing", "Conflict-free merging", "Query optimization", "Backup"], "correct_answer": "Conflict-free merging"},
                {"id": 13, "question": "MVCC allows?", "options": ["Faster writes", "Readers don't block writers", "More indexes", "Smaller databases"], "correct_answer": "Readers don't block writers"},
                {"id": 14, "question": "Saga pattern handles?", "options": ["Indexing", "Distributed transactions", "Caching", "Replication"], "correct_answer": "Distributed transactions"},
                {"id": 15, "question": "When to use denormalization?", "options": ["Write-heavy", "Read-heavy", "Small data", "Complex joins needed"], "correct_answer": "Read-heavy"},
                {"id": 16, "question": "MongoDB stores data as?", "options": ["Tables", "Documents", "Columns", "Graphs"], "correct_answer": "Documents"},
                {"id": 17, "question": "What is a covering index?", "options": ["Index on all tables", "Index with all query columns", "Encrypted index", "Partial index"], "correct_answer": "Index with all query columns"},
                {"id": 18, "question": "Dirty read occurs when?", "options": ["Reading corrupted data", "Reading uncommitted data", "Reading old backup", "Reading from cache"], "correct_answer": "Reading uncommitted data"},
                {"id": 19, "question": "Multi-master replication allows?", "options": ["Reads only", "Writes on multiple nodes", "Faster single writes", "No conflicts"], "correct_answer": "Writes on multiple nodes"},
                {"id": 20, "question": "What is split-brain?", "options": ["Memory issue", "Multiple masters", "Slow queries", "Index corruption"], "correct_answer": "Multiple masters"},
                {"id": 21, "question": "Cassandra is optimized for?", "options": ["ACID transactions", "High write throughput", "Complex joins", "Graph queries"], "correct_answer": "High write throughput"},
                {"id": 22, "question": "EXPLAIN ANALYZE shows?", "options": ["Schema only", "Actual execution stats", "Index list", "Table structure"], "correct_answer": "Actual execution stats"},
                {"id": 23, "question": "Foreign key ensures?", "options": ["Fast queries", "Referential integrity", "Unique values", "Auto increment"], "correct_answer": "Referential integrity"},
                {"id": 24, "question": "Asynchronous replication risk?", "options": ["High latency", "Data loss", "Low availability", "Complex setup"], "correct_answer": "Data loss"},
                {"id": 25, "question": "Read-your-writes consistency ensures?", "options": ["All users see same data", "User sees their own writes", "Fastest reads", "No replication lag"], "correct_answer": "User sees their own writes"}
            ],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
    ]

    # Clear existing data
    await db.tutorials.delete_many({})
    await db.content.delete_many({})
    await db.assignments.delete_many({})
    await db.quizzes.delete_many({})

    # Insert new data
    await db.tutorials.insert_many(tutorials_data)
    await db.content.insert_many(content_data)
    await db.assignments.insert_many(assignments_data)
    await db.quizzes.insert_many(quizzes_data)

    print("Database seeded successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
