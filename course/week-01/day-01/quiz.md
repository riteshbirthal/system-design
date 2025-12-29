# Day 1 Quiz: Introduction to System Design

## Instructions
- **Total Questions**: 10
- **Time Limit**: 15 minutes
- **Passing Score**: 70%
- **Format**: Multiple Choice (single correct answer)

---

## Questions

### Question 1
**What is the primary goal of system design?**

A) Writing efficient code with optimal algorithms  
B) Creating visually appealing user interfaces  
C) Defining architecture, components, and data flow to satisfy requirements  
D) Testing software applications for bugs and errors

<details>
<summary>Answer</summary>

**C) Defining architecture, components, and data flow to satisfy requirements**

**Explanation**: System design is the process of defining the architecture, components, modules, interfaces, and data flow of a system to satisfy specified requirements. It's about creating the blueprint for how software will be built, deployed, and scaled.
</details>

---

### Question 2
**Which of the following is a characteristic of High-Level Design (HLD)?**

A) Detailed class diagrams and method signatures  
B) Algorithm implementation and pseudocode  
C) Overall system architecture and component interactions  
D) Database schema design with specific column types

<details>
<summary>Answer</summary>

**C) Overall system architecture and component interactions**

**Explanation**: HLD provides a "bird's eye view" of the system, focusing on overall architecture, major components, their interactions, and technology choices at a macro level. Class diagrams, algorithms, and detailed database schemas belong to Low-Level Design (LLD).
</details>

---

### Question 3
**What is the difference between latency and throughput?**

A) Latency is total requests; throughput is time per request  
B) Latency is time per request; throughput is requests per unit time  
C) They are the same metric measured differently  
D) Latency measures storage; throughput measures network speed

<details>
<summary>Answer</summary>

**B) Latency is time per request; throughput is requests per unit time**

**Explanation**: Latency measures the time taken to process a single request (e.g., 50ms response time). Throughput measures the number of requests processed per unit time (e.g., 10,000 requests/second). A system can have low latency but also low throughput if it can only handle one request at a time.
</details>

---

### Question 4
**A system with "99.9% availability" (three nines) can have approximately how much downtime per year?**

A) 3.65 days  
B) 8.77 hours  
C) 52.60 minutes  
D) 5.26 minutes

<details>
<summary>Answer</summary>

**B) 8.77 hours**

**Explanation**: The "nines" of availability correspond to allowed downtime:
- 99% (two nines) = 3.65 days/year
- 99.9% (three nines) = 8.77 hours/year
- 99.99% (four nines) = 52.60 minutes/year
- 99.999% (five nines) = 5.26 minutes/year
</details>

---

### Question 5
**Which component is responsible for distributing incoming traffic across multiple servers?**

A) Cache  
B) Database  
C) Load Balancer  
D) Message Queue

<details>
<summary>Answer</summary>

**C) Load Balancer**

**Explanation**: A load balancer distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. It helps achieve high availability, improves response times, and prevents server overload. Common load balancers include AWS ELB, Nginx, and HAProxy.
</details>

---

### Question 6
**What is the main advantage of microservices architecture over monolithic architecture?**

A) Simpler to develop and deploy initially  
B) Lower operational complexity  
C) Independent deployment and scaling of services  
D) All code in one place for easier debugging

<details>
<summary>Answer</summary>

**C) Independent deployment and scaling of services**

**Explanation**: Microservices architecture allows each service to be deployed, scaled, and updated independently. This provides technology flexibility, fault isolation, and enables large teams to work in parallel. However, it comes with increased operational complexity compared to monoliths.
</details>

---

### Question 7
**What is the primary purpose of a CDN (Content Delivery Network)?**

A) To permanently store user data  
B) To process business logic  
C) To cache static content at edge locations worldwide  
D) To authenticate user requests

<details>
<summary>Answer</summary>

**C) To cache static content at edge locations worldwide**

**Explanation**: A CDN caches static content (images, CSS, JS, videos) at edge locations around the world, reducing latency for global users by serving content from geographically closer servers. Examples include CloudFront, Cloudflare, and Akamai.
</details>

---

### Question 8
**In the context of service reliability, what do SLA, SLO, and SLI stand for?**

A) Service Level Architecture, Service Level Output, Service Level Input  
B) Service Level Agreement, Service Level Objective, Service Level Indicator  
C) System Load Average, System Load Optimization, System Load Index  
D) Scalability Level Agreement, Scalability Level Objective, Scalability Level Indicator

<details>
<summary>Answer</summary>

**B) Service Level Agreement, Service Level Objective, Service Level Indicator**

**Explanation**: 
- **SLA** (Service Level Agreement): Contract with customers (e.g., "99.9% uptime guaranteed")
- **SLO** (Service Level Objective): Internal performance target (e.g., "p95 latency < 100ms")
- **SLI** (Service Level Indicator): The metric that measures the SLO (e.g., "request latency in milliseconds")
</details>

---

### Question 9
**Which caching strategy involves the application managing the cache manually, checking cache first and updating it after database reads?**

A) Read-Through  
B) Write-Through  
C) Cache-Aside (Lazy Loading)  
D) Write-Behind

<details>
<summary>Answer</summary>

**C) Cache-Aside (Lazy Loading)**

**Explanation**: In Cache-Aside (also called Lazy Loading), the application is responsible for managing the cache:
1. Check cache first
2. If miss, read from database
3. Store result in cache
4. Return to client

Read-Through and Write-Through involve the cache layer automatically handling database interactions.
</details>

---

### Question 10
**What is the "R" in the RESHADED framework for system design?**

A) Replication  
B) Requirements  
C) Reliability  
D) Routing

<details>
<summary>Answer</summary>

**B) Requirements**

**Explanation**: RESHADED is an 8-step framework for approaching system design problems:
- **R**equirements: Clarify functional and non-functional requirements
- **E**stimation: Estimate scale (users, storage, bandwidth)
- **S**torage Schema: Design data model
- **H**igh-Level Design: Draw the architecture diagram
- **A**PIs: Define key API endpoints
- **D**etailed Design: Deep dive into critical components
- **E**valuation: Discuss trade-offs and bottlenecks
- **D**istinctive Features: Highlight unique aspects
</details>

---

## Scoring Guide

| Score | Assessment | Recommendation |
|-------|------------|----------------|
| 9-10 | Excellent! | Ready for Day 2 |
| 7-8 | Good understanding | Review weak areas before proceeding |
| 5-6 | Needs improvement | Review the content material |
| Below 5 | Insufficient | Re-read Day 1 content thoroughly |

---

## Key Concepts to Review If You Scored Below 70%

1. **System Design Definition**: Architecture, components, interfaces, data flow
2. **HLD vs LLD**: High-level (architecture) vs Low-level (implementation)
3. **Core Components**: Load Balancer, Cache, Database, Message Queue, CDN, API Gateway
4. **Key Metrics**: Latency, Throughput, Availability (the "nines")
5. **Service Levels**: SLA, SLO, SLI
6. **Architecture Evolution**: Monolith vs Microservices trade-offs
7. **RESHADED Framework**: 8-step approach to system design
