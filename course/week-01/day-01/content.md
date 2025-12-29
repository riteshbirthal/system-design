# Day 1: What is System Design?

## Learning Objectives

By the end of this lesson, you will be able to:
- Define system design and articulate its importance in software engineering
- Distinguish between High-Level Design (HLD) and Low-Level Design (LLD)
- Identify and explain core system components and their roles
- Understand the evolution of software architecture
- Apply key terminology used in system design discussions
- Recognize real-world examples of system design in action

---

## 1. Introduction to System Design

### What is System Design?

System design is the process of defining the **architecture**, **components**, **modules**, **interfaces**, and **data flow** of a system to satisfy specified requirements. It's the bridge between a product idea and its technical implementation—the blueprint that guides how software will be built, deployed, and scaled.

Think of system design like architectural planning for a building. Before construction begins, architects create detailed plans showing the structure, electrical systems, plumbing, and how people will move through the space. Similarly, system design defines how data flows, how components interact, and how the system handles growth and failures.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SYSTEM DESIGN PROCESS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Requirements  ──▶  Architecture  ──▶  Components  ──▶  Implementation    │
│                                                                             │
│   "What do we      "How will it      "What parts      "How do we          │
│    need?"           be structured?"   do we need?"     build it?"          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

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

System design is crucial because poor design decisions made early can be **extremely costly** to fix later. Here's why it matters:

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

### Timeline of Architectural Evolution

```
1960s-1970s          1980s-1990s          2000s-2010s          2010s-Present
     │                    │                    │                    │
     ▼                    ▼                    ▼                    ▼
┌─────────┐         ┌─────────┐         ┌─────────┐         ┌─────────────┐
│Mainframe│   ──▶   │ Client- │   ──▶   │ N-Tier  │   ──▶   │Microservices│
│ Systems │         │ Server  │         │  Apps   │         │   & Cloud   │
└─────────┘         └─────────┘         └─────────┘         └─────────────┘
                                                                    │
                                                                    ▼
                                                            ┌─────────────┐
                                                            │ Serverless  │
                                                            │  & Edge     │
                                                            └─────────────┘
```

### Monolithic Architecture

In the early days, applications were built as **monoliths**—single, unified codebases where all functionality lived together.

```
┌─────────────────────────────────────────┐
│           MONOLITHIC APPLICATION         │
├─────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │   UI    │ │ Business│ │  Data   │   │
│  │  Layer  │ │  Logic  │ │  Layer  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│              Single Database            │
└─────────────────────────────────────────┘
```

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

```
┌──────────────────────────────────────────────────────────────────┐
│                    MICROSERVICES ARCHITECTURE                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    │
│    │  User   │    │ Product │    │  Order  │    │ Payment │    │
│    │ Service │    │ Service │    │ Service │    │ Service │    │
│    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘    │
│         │              │              │              │          │
│    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐    │
│    │  User   │    │ Product │    │  Order  │    │ Payment │    │
│    │   DB    │    │   DB    │    │   DB    │    │   DB    │    │
│    └─────────┘    └─────────┘    └─────────┘    └─────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

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

**Example HLD Diagram for a Social Media Platform**:

```
                                   ┌─────────────┐
                                   │     CDN     │
                                   │ (CloudFront)│
                                   └──────┬──────┘
                                          │
┌─────────────┐                    ┌──────┴──────┐
│   Mobile    │────────────────────│             │
│    App      │                    │    API      │
└─────────────┘                    │   Gateway   │
                                   │             │
┌─────────────┐                    │             │
│    Web      │────────────────────│             │
│   Client    │                    └──────┬──────┘
└─────────────┘                           │
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
             ┌──────┴──────┐       ┌──────┴──────┐       ┌──────┴──────┐
             │    User     │       │    Post     │       │Notification │
             │   Service   │       │   Service   │       │   Service   │
             └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
                    │                     │                     │
             ┌──────┴──────┐       ┌──────┴──────┐       ┌──────┴──────┐
             │   User DB   │       │  Post DB    │       │   Redis     │
             │  (PostgreSQL)│      │  (MongoDB)  │       │   Pub/Sub   │
             └─────────────┘       └─────────────┘       └─────────────┘
```

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

**Example LLD Class Diagram for User Service**:

```
┌─────────────────────────────────────┐
│              User                    │
├─────────────────────────────────────┤
│ - id: UUID                          │
│ - username: String                  │
│ - email: String                     │
│ - passwordHash: String              │
│ - createdAt: DateTime               │
│ - updatedAt: DateTime               │
├─────────────────────────────────────┤
│ + register(email, password): User   │
│ + authenticate(email, pass): Token  │
│ + updateProfile(data): User         │
│ + deactivate(): void                │
└─────────────────────────────────────┘
              △
              │ extends
              │
┌─────────────┴───────────────────────┐
│           PremiumUser                │
├─────────────────────────────────────┤
│ - subscriptionTier: Enum            │
│ - subscriptionExpiry: DateTime      │
├─────────────────────────────────────┤
│ + upgradeTier(tier): void           │
│ + checkFeatureAccess(feature): bool │
└─────────────────────────────────────┘
```

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

```
                         ┌─────────────┐
                         │    Load     │
        Requests ───────▶│  Balancer   │
                         └──────┬──────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
        ┌──────────┐      ┌──────────┐      ┌──────────┐
        │ Server 1 │      │ Server 2 │      │ Server 3 │
        └──────────┘      └──────────┘      └──────────┘
```

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

```
┌─────────┐    Cache Hit    ┌─────────┐
│ Client  │◀───────────────│  Cache  │
│         │                 │ (Redis) │
└────┬────┘                 └────┬────┘
     │                           │
     │ Cache Miss                │ Update Cache
     │                           │
     ▼                           ▼
┌─────────────────────────────────────┐
│              Database                │
└─────────────────────────────────────┘
```

**Caching Strategies**:
- **Cache-Aside**: Application manages cache manually
- **Read-Through**: Cache sits between app and database
- **Write-Through**: Writes go to cache and database together
- **Write-Behind**: Writes go to cache, async to database

**Real-World Examples**: Redis, Memcached

### 4.6 Message Queue

A **message queue** enables asynchronous communication between services.

```
┌──────────┐     ┌─────────────┐     ┌──────────┐
│ Producer │────▶│   Message   │────▶│ Consumer │
│ Service  │     │    Queue    │     │ Service  │
└──────────┘     └─────────────┘     └──────────┘
```

**Benefits**:
- Decouples services
- Handles traffic spikes
- Enables async processing
- Provides reliability through persistence

**Real-World Examples**: Apache Kafka, RabbitMQ, AWS SQS

### 4.7 Content Delivery Network (CDN)

A **CDN** caches static content at edge locations worldwide, reducing latency for global users.

```
                    ┌─────────────┐
                    │   Origin    │
                    │   Server    │
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────┴────┐       ┌────┴────┐       ┌────┴────┐
    │  Edge   │       │  Edge   │       │  Edge   │
    │ (USA)   │       │ (Europe)│       │ (Asia)  │
    └────┬────┘       └────┬────┘       └────┬────┘
         │                 │                 │
    ┌────┴────┐       ┌────┴────┐       ┌────┴────┐
    │  Users  │       │  Users  │       │  Users  │
    └─────────┘       └─────────┘       └─────────┘
```

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
- [System Design Primer (GitHub)](https://github.com/donnemartin/system-design-primer)
- [ByteByteGo Newsletter](https://blog.bytebytego.com/)
- [High Scalability Blog](http://highscalability.com/)

### Video Courses
- [Grokking Modern System Design (Educative)](https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers)
- [System Design by Gaurav Sen (YouTube)](https://www.youtube.com/c/GauravSensei)
- [System Design Course by Design Gurus](https://www.designgurus.io/)

### Practice Platforms
- [LeetCode System Design](https://leetcode.com/discuss/interview-question/system-design)
- [Pramp (Mock Interviews)](https://www.pramp.com/)

---

## 10. What's Next?

In **Day 2**, we'll dive into **Functional and Non-Functional Requirements**—learning how to gather, analyze, and prioritize requirements using techniques like MoSCoW prioritization and user stories.
