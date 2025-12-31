const notes = `
# Introduction to System Design

## What is System Design?

System Design is the process of defining the architecture, components, modules, interfaces, and data flow of a system to satisfy specified requirements. It is a crucial skill for software engineers, especially when building large-scale, distributed applications.

### Why System Design Matters

**Scalability**: Well-designed systems can handle growth in users, data, and traffic without significant rework.

**Reliability**: Proper design ensures systems remain available and functional even when components fail.

**Maintainability**: Good architecture makes it easier to update, debug, and extend the system over time.

**Cost Efficiency**: Thoughtful design optimizes resource usage and reduces operational costs.

## Key Components of System Design

### 1. Requirements Gathering

Before designing any system, you must understand:
- **Functional Requirements**: What the system should do (features, use cases)
- **Non-Functional Requirements**: How the system should perform (latency, availability, scalability)

### 2. High-Level Design (HLD)

High-level design focuses on the overall system architecture:
- Major components and their interactions
- Data flow between components
- External integrations and APIs
- Technology stack decisions

### 3. Low-Level Design (LLD)

Low-level design dives into implementation details:
- Class diagrams and object relationships
- Database schema design
- API contracts and specifications
- Algorithm selection and optimization

## System Design Interview Framework

### The RESHADED Approach

**R - Requirements**: Clarify functional and non-functional requirements
**E - Estimation**: Calculate scale (users, requests, storage)
**S - Storage Schema**: Design data models and database choices
**H - High-Level Design**: Draw the architecture diagram
**A - API Design**: Define endpoints and contracts
**D - Detailed Design**: Deep dive into critical components
**E - Evaluation**: Discuss trade-offs and bottlenecks
**D - Distinctive Features**: Highlight unique aspects of your design

## Core Concepts to Master

### Distributed Systems

A distributed system is a collection of independent computers that appears to users as a single coherent system. Key challenges include:
- **Network Partitions**: Handling communication failures
- **Consistency**: Ensuring all nodes see the same data
- **Coordination**: Managing shared resources without conflicts

### Client-Server Architecture

The fundamental model where:
- **Clients**: Request services or resources
- **Servers**: Provide services and manage resources
- **Protocol**: Rules for communication (HTTP, TCP, etc.)

### Horizontal vs Vertical Scaling

**Vertical Scaling (Scale Up)**:
- Add more power to existing machines
- Simpler to implement
- Has hardware limits
- Single point of failure

**Horizontal Scaling (Scale Out)**:
- Add more machines to the pool
- Better for high availability
- More complex to manage
- Virtually unlimited scaling

## Trade-offs in System Design

### CAP Theorem

In distributed systems, you can only guarantee two of three properties:
- **Consistency**: All nodes see the same data simultaneously
- **Availability**: System remains operational for every request
- **Partition Tolerance**: System continues despite network failures

### Latency vs Throughput

- **Latency**: Time to complete a single operation
- **Throughput**: Number of operations per unit time
- Often inversely related - optimizing one may hurt the other

### Consistency vs Availability

- Strong consistency ensures correctness but may reduce availability
- Eventual consistency improves availability but accepts temporary inconsistency

## Common System Design Patterns

### 1. Load Balancing
Distributing incoming requests across multiple servers to ensure no single server is overwhelmed.

### 2. Caching
Storing frequently accessed data in fast storage to reduce latency and database load.

### 3. Database Sharding
Splitting data across multiple databases to improve performance and scalability.

### 4. Message Queues
Decoupling components using asynchronous communication for better reliability.

### 5. Microservices
Breaking applications into small, independent services for flexibility and scalability.

## Next Steps

After understanding these fundamentals, you should explore:
1. Deep dive into scalability patterns
2. Database design and selection
3. Caching strategies
4. Load balancing techniques
5. Real-world system design case studies

Remember: Good system design is about making informed trade-offs based on specific requirements and constraints.
`;

export default notes;
