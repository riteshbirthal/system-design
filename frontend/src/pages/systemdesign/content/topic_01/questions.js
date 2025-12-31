const questions = [
  {
    question: "What is System Design?",
    answer: "System Design is the process of defining the architecture, components, modules, interfaces, and data flow of a system to satisfy specified requirements. It involves making decisions about how different parts of a system will work together to meet both functional and non-functional requirements.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between functional and non-functional requirements?",
    answer: "Functional requirements define WHAT the system should do - the features, use cases, and behaviors. Non-functional requirements define HOW the system should perform - including performance, scalability, availability, security, and maintainability. For example, 'users can upload images' is functional, while 'images should upload within 2 seconds' is non-functional.",
    difficulty: "Easy"
  },
  {
    question: "Explain the difference between High-Level Design (HLD) and Low-Level Design (LLD).",
    answer: "HLD focuses on the overall system architecture - major components, their interactions, data flow, and technology choices. It's like a blueprint. LLD dives into implementation details - class diagrams, database schemas, API specifications, and algorithms. HLD answers 'what components do we need?' while LLD answers 'how do we build each component?'",
    difficulty: "Easy"
  },
  {
    question: "What is the CAP theorem?",
    answer: "CAP theorem states that a distributed system can only guarantee two of three properties: Consistency (all nodes see same data), Availability (system responds to every request), and Partition Tolerance (system works despite network failures). Since network partitions are unavoidable, you must choose between CP (consistent but may be unavailable) or AP (available but may be inconsistent).",
    difficulty: "Medium"
  },
  {
    question: "Explain horizontal vs vertical scaling with examples.",
    answer: "Vertical scaling (scale up) means adding more resources to a single machine - more CPU, RAM, or storage. Example: upgrading from 8GB to 32GB RAM. Horizontal scaling (scale out) means adding more machines to distribute load. Example: going from 1 server to 10 servers behind a load balancer. Vertical has hardware limits; horizontal is more complex but offers better availability and virtually unlimited scaling.",
    difficulty: "Easy"
  },
  {
    question: "What is a distributed system and what are its key challenges?",
    answer: "A distributed system is a collection of independent computers that appears as a single system to users. Key challenges include: 1) Network partitions - handling communication failures, 2) Consistency - ensuring all nodes have the same data, 3) Coordination - managing shared resources, 4) Fault tolerance - continuing operation when nodes fail, 5) Latency - dealing with network delays between components.",
    difficulty: "Medium"
  },
  {
    question: "What is the RESHADED framework for system design interviews?",
    answer: "RESHADED is a structured approach: R-Requirements (clarify functional/non-functional), E-Estimation (calculate scale), S-Storage Schema (design data models), H-High-level Design (draw architecture), A-API Design (define endpoints), D-Detailed Design (deep dive components), E-Evaluation (discuss trade-offs), D-Distinctive Features (highlight unique aspects). It ensures systematic coverage of all important aspects.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between latency and throughput?",
    answer: "Latency is the time to complete a single operation (e.g., 50ms to process one request). Throughput is the number of operations per unit time (e.g., 1000 requests per second). They're often inversely related - batching can improve throughput but increase individual latency. A system might have low latency but low throughput, or high throughput with higher latency.",
    difficulty: "Easy"
  },
  {
    question: "Why is system design important for building large-scale applications?",
    answer: "System design is crucial because: 1) Scalability - well-designed systems handle growth without major rewrites, 2) Reliability - proper architecture ensures availability despite failures, 3) Maintainability - good design makes updates and debugging easier, 4) Cost efficiency - thoughtful design optimizes resource usage, 5) Team productivity - clear architecture enables parallel development.",
    difficulty: "Easy"
  },
  {
    question: "What is client-server architecture?",
    answer: "Client-server architecture is a model where clients (browsers, mobile apps) request services from servers which process requests and return responses. Key components: clients initiate requests, servers provide resources/services, and protocols (HTTP, TCP) define communication rules. Benefits include centralized data management, easier security, and separation of concerns.",
    difficulty: "Easy"
  },
  {
    question: "Explain load balancing and why it's important.",
    answer: "Load balancing distributes incoming traffic across multiple servers to prevent any single server from being overwhelmed. It's important because: 1) Improves availability - if one server fails, others handle traffic, 2) Increases throughput - parallel processing of requests, 3) Reduces latency - routes to least loaded server, 4) Enables horizontal scaling. Common algorithms: round-robin, least connections, IP hash.",
    difficulty: "Medium"
  },
  {
    question: "What is caching and when should you use it?",
    answer: "Caching stores frequently accessed data in fast storage (memory) to reduce latency and database load. Use caching when: 1) Data is read frequently but written rarely, 2) Computation is expensive, 3) Data can tolerate some staleness, 4) Same data requested by many users. Types include client-side, CDN, application-level, and database caching.",
    difficulty: "Medium"
  },
  {
    question: "What is database sharding?",
    answer: "Sharding splits data across multiple databases based on a shard key. For example, users A-M in DB1, N-Z in DB2. Benefits: improved performance (queries hit smaller datasets), better scalability (add more shards), increased storage capacity. Challenges: complex queries across shards, rebalancing when adding shards, choosing the right shard key, maintaining data consistency.",
    difficulty: "Medium"
  },
  {
    question: "What are message queues and when should you use them?",
    answer: "Message queues enable asynchronous communication between services by storing messages until consumed. Use cases: 1) Decoupling services - producer doesn't wait for consumer, 2) Handling traffic spikes - queue absorbs bursts, 3) Ensuring delivery - messages persist if consumer is down, 4) Work distribution - multiple consumers process in parallel. Examples: RabbitMQ, Kafka, SQS.",
    difficulty: "Medium"
  },
  {
    question: "Explain microservices architecture and its trade-offs.",
    answer: "Microservices break applications into small, independent services that communicate via APIs. Benefits: independent deployment, technology flexibility, team autonomy, better fault isolation, easier scaling. Trade-offs: increased operational complexity, network latency between services, distributed system challenges, data consistency issues, testing complexity. Best for large teams with complex, evolving applications.",
    difficulty: "Hard"
  },
  {
    question: "How do you estimate system capacity requirements?",
    answer: "Capacity estimation involves: 1) Traffic - estimate DAU, peak concurrent users, requests/second, 2) Storage - calculate data per user, growth rate, retention period, 3) Bandwidth - request/response sizes × requests/second, 4) Memory - working set size, cache requirements. Example: 100M DAU, 10% concurrent = 10M users, each making 10 req/day = 100M req/day = 1.2K req/sec average, 5x for peak.",
    difficulty: "Medium"
  },
  {
    question: "What is eventual consistency?",
    answer: "Eventual consistency guarantees that if no new updates are made, all replicas will eventually converge to the same value. Unlike strong consistency (all reads return latest write), eventual consistency allows temporary inconsistencies for better availability and performance. Used in DNS, social media feeds, shopping carts. Trade-off: simpler scaling but applications must handle stale reads.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle single points of failure in system design?",
    answer: "Strategies to eliminate SPOFs: 1) Redundancy - multiple instances of critical components, 2) Load balancing - distribute traffic, detect failures, 3) Database replication - master-slave or multi-master setups, 4) Geographic distribution - deploy across regions, 5) Failover mechanisms - automatic switching to standby, 6) Health checks - detect and isolate failed components quickly.",
    difficulty: "Hard"
  },
  {
    question: "What factors do you consider when choosing a database?",
    answer: "Consider: 1) Data model - relational (structured), document (flexible), key-value (simple), graph (relationships), 2) Query patterns - OLTP vs OLAP, 3) Scalability needs - vertical vs horizontal, 4) Consistency requirements - ACID vs eventual, 5) Performance - read/write ratio, latency requirements, 6) Operational complexity - managed vs self-hosted, 7) Team expertise.",
    difficulty: "Hard"
  },
  {
    question: "Explain the concept of idempotency in API design.",
    answer: "Idempotency means multiple identical requests produce the same result as a single request. Important for handling retries safely. GET is naturally idempotent (same resource returned). PUT should be idempotent (same update applied). POST typically isn't (creates new resources). Implementations: use idempotency keys, check-then-act patterns, or database constraints to prevent duplicate operations.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between synchronous and asynchronous communication?",
    answer: "Synchronous: caller waits for response before proceeding. Simple but creates tight coupling and can cause cascading failures. Asynchronous: caller doesn't wait, continues processing. Uses message queues or callbacks. Better for: decoupling services, handling failures gracefully, managing load spikes, long-running operations. Trade-off: more complex error handling and debugging.",
    difficulty: "Easy"
  },
  {
    question: "How do you approach a system design interview?",
    answer: "1) Clarify requirements (5 min) - ask about features, scale, constraints, 2) Estimate scale (5 min) - users, storage, bandwidth, 3) Define API (5 min) - key endpoints, 4) Draw high-level design (10 min) - components, data flow, 5) Deep dive (10 min) - critical components, algorithms, 6) Discuss trade-offs (5 min) - alternatives, bottlenecks. Focus on communication, reasoning, and trade-offs over perfect solutions.",
    difficulty: "Medium"
  },
  {
    question: "What is data replication and what are its benefits?",
    answer: "Data replication copies data across multiple nodes/locations. Benefits: 1) Availability - data accessible if primary fails, 2) Durability - data survives hardware failures, 3) Performance - read from nearest replica, 4) Disaster recovery - geographic redundancy. Types: synchronous (consistent but slower), asynchronous (faster but may lose recent writes). Common setups: master-slave, multi-master, quorum-based.",
    difficulty: "Medium"
  },
  {
    question: "What is a CDN and how does it improve performance?",
    answer: "A Content Delivery Network is a distributed network of servers that cache content closer to users. Benefits: 1) Reduced latency - serve from nearest edge server, 2) Lower origin load - most requests handled by CDN, 3) Better availability - multiple points of presence, 4) DDoS protection - distributed infrastructure absorbs attacks. Best for static content (images, CSS, JS) and increasingly used for dynamic content.",
    difficulty: "Medium"
  },
  {
    question: "How do you design for high availability?",
    answer: "High availability strategies: 1) Eliminate SPOFs - redundancy at every layer, 2) Geographic distribution - multi-region deployment, 3) Load balancing - distribute traffic, health checks, 4) Database replication - synchronous for critical data, 5) Graceful degradation - serve partial functionality, 6) Circuit breakers - isolate failing services, 7) Auto-scaling - handle load variations, 8) Regular testing - chaos engineering.",
    difficulty: "Hard"
  },
  {
    question: "What is API rate limiting and why is it important?",
    answer: "Rate limiting controls the number of requests a client can make in a time window. Important for: 1) Preventing abuse - stop malicious or buggy clients, 2) Fair resource sharing - ensure no single client monopolizes, 3) Cost control - limit expensive operations, 4) Stability - protect against traffic spikes. Implementations: token bucket, sliding window, fixed window. Return 429 Too Many Requests when exceeded.",
    difficulty: "Medium"
  },
  {
    question: "Explain the concept of data partitioning strategies.",
    answer: "Data partitioning divides data across multiple databases. Strategies: 1) Horizontal (sharding) - rows split by shard key (user_id mod N), 2) Vertical - columns split by table (user_profiles vs user_activity), 3) Hash-based - consistent hashing for even distribution, 4) Range-based - data ranges on different partitions. Considerations: query patterns, data distribution, rebalancing complexity, cross-partition queries.",
    difficulty: "Hard"
  },
  {
    question: "What is the difference between stateless and stateful services?",
    answer: "Stateless services don't store client state between requests - each request contains all needed information. Benefits: easy scaling (any server handles any request), simple failover, better caching. Stateful services maintain client state - like WebSocket connections or shopping sessions. Trade-offs: stateful offers better performance for some use cases but is harder to scale and recover from failures.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle data consistency in distributed systems?",
    answer: "Approaches: 1) Strong consistency - use distributed transactions, consensus protocols (Paxos, Raft), but impacts availability, 2) Eventual consistency - accept temporary inconsistency for availability, 3) Saga pattern - sequence of local transactions with compensating actions, 4) CQRS - separate read/write models, 5) Conflict resolution - last-write-wins, merge strategies. Choice depends on business requirements.",
    difficulty: "Hard"
  },
  {
    question: "What metrics would you monitor in a production system?",
    answer: "Key metrics: 1) Latency - p50, p95, p99 response times, 2) Throughput - requests per second, 3) Error rate - 4xx, 5xx percentages, 4) Availability - uptime percentage, 5) Resource utilization - CPU, memory, disk, network, 6) Queue depths - for async systems, 7) Database metrics - query times, connection pool, 8) Business metrics - conversions, active users. Use dashboards and alerts.",
    difficulty: "Medium"
  },
  {
    question: "What is consistent hashing and why is it useful?",
    answer: "Consistent hashing maps both keys and servers to a ring. Keys are assigned to the first server clockwise. Benefits: when servers are added/removed, only K/N keys need remapping (K=keys, N=servers) vs traditional hashing where all keys move. Used in distributed caches, databases, and load balancing. Virtual nodes improve distribution uniformity.",
    difficulty: "Hard"
  },
  {
    question: "How do you design a system to handle traffic spikes?",
    answer: "Strategies: 1) Auto-scaling - automatically add/remove capacity based on metrics, 2) Load shedding - reject excess requests gracefully, 3) Queue buffering - absorb spikes with message queues, 4) Caching - reduce backend load, 5) CDN - offload static content, 6) Rate limiting - protect from abuse, 7) Graceful degradation - disable non-essential features, 8) Pre-scaling - anticipate known events (sales, launches).",
    difficulty: "Hard"
  },
  {
    question: "What is the difference between SQL and NoSQL databases?",
    answer: "SQL (relational): structured schema, ACID transactions, powerful queries with JOINs, vertical scaling typical, good for complex relationships. NoSQL: flexible schema, eventual consistency options, horizontal scaling, various types (document, key-value, columnar, graph). Choose SQL for complex queries and transactions; NoSQL for scale, flexibility, and specific access patterns.",
    difficulty: "Easy"
  },
  {
    question: "What is a reverse proxy and how does it differ from a forward proxy?",
    answer: "Forward proxy: client-side intermediary, hides client identity, used for access control and caching. Reverse proxy: server-side intermediary, hides server identity, used for load balancing, SSL termination, caching, and security. Examples: Nginx, HAProxy as reverse proxies. The key difference is who the proxy represents - clients or servers.",
    difficulty: "Medium"
  },
  {
    question: "Explain the concept of database indexing.",
    answer: "Indexes are data structures that speed up data retrieval by avoiding full table scans. Like a book index - find topics quickly without reading every page. Types: B-tree (range queries), hash (exact matches), full-text (search), composite (multiple columns). Trade-offs: faster reads but slower writes (index updates), additional storage. Create indexes on frequently queried columns.",
    difficulty: "Medium"
  }
];

export default questions;
