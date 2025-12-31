const questions = [
  {
    question: "What is scalability in system design?",
    answer: "Scalability is the capability of a system to handle a growing amount of work by adding resources. A scalable system can accommodate increased load (more users, requests, or data) without significant changes to the architecture or degradation in performance. Key aspects include handling increased traffic, processing more data, serving more users, and maintaining performance under load.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between horizontal and vertical scaling?",
    answer: "VERTICAL SCALING (Scale Up): Adding more power to existing machine - more CPU, RAM, storage. Single machine gets more powerful, has physical limits, may require downtime. HORIZONTAL SCALING (Scale Out): Adding more machines to the pool, distributing load across servers. Theoretically unlimited scaling, requires load balancing, more complex architecture.",
    difficulty: "Easy"
  },
  {
    question: "What are the advantages of horizontal scaling?",
    answer: "Horizontal scaling advantages: 1) Near-infinite scalability - add as many servers as needed, 2) No single point of failure - redundancy built-in, 3) Cost-effective - use commodity hardware, 4) No downtime for scaling, 5) Better fault tolerance - one server failure doesn't crash system, 6) Geographic distribution possible, 7) Linear cost scaling.",
    difficulty: "Easy"
  },
  {
    question: "What are the advantages of vertical scaling?",
    answer: "Vertical scaling advantages: 1) Simple implementation - no architecture changes, 2) No code changes required, 3) No distributed system complexity, 4) Data consistency easier to maintain, 5) Lower operational overhead, 6) Immediate performance improvement, 7) Better for single-threaded applications, 8) No inter-server communication overhead.",
    difficulty: "Easy"
  },
  {
    question: "What is throughput?",
    answer: "Throughput is the number of requests or transactions a system can process per unit of time. It measures the system's capacity to handle work. Measured as: Requests per second (RPS), Transactions per second (TPS), Queries per second (QPS). Higher throughput = more work completed in same time.",
    difficulty: "Easy"
  },
  {
    question: "What is latency?",
    answer: "Latency is the time taken to process a single request from start to finish. It measures how long a user waits for a response. Types include: Network latency (time for data to travel), Processing latency (time to execute logic), Queue latency (time waiting to be processed). Measured in milliseconds (ms). Lower is better.",
    difficulty: "Easy"
  },
  {
    question: "What is a bottleneck in system design?",
    answer: "A bottleneck is a component or resource that limits the overall system performance. Like the narrowest part of a bottle that limits flow. Common bottlenecks include: CPU (computation), Memory (data size), Disk I/O (read/write), Network (data transfer), Database (queries). Identifying and resolving bottlenecks is key to scaling.",
    difficulty: "Easy"
  },
  {
    question: "What is the relationship between latency and throughput?",
    answer: "Latency and throughput are related but different. Low latency doesn't always mean high throughput, and high throughput doesn't guarantee low latency. Relationship: Throughput = Concurrent Requests / Average Latency. Example: 100ms latency with 10 concurrent requests = 100 RPS. Trade-offs exist: batching improves throughput but increases latency.",
    difficulty: "Medium"
  },
  {
    question: "What is load balancing and what are the common algorithms?",
    answer: "Load balancing distributes incoming traffic across multiple servers. Common algorithms: 1) Round Robin - sequential distribution, 2) Weighted Round Robin - based on server capacity, 3) Least Connections - send to least busy server, 4) IP Hash - same client always goes to same server, 5) Least Response Time - routes to fastest server, 6) Random - simple distribution.",
    difficulty: "Medium"
  },
  {
    question: "What is auto-scaling and what metrics would you use?",
    answer: "Auto-scaling automatically adjusts compute resources based on demand. Types: Reactive (based on current metrics), Predictive (based on forecasted demand), Scheduled (based on known patterns). Metrics: CPU utilization, Memory utilization, Request count per second, Active connections, Queue depth, Response time/latency. Best practice: combine multiple metrics.",
    difficulty: "Medium"
  },
  {
    question: "What is a stateless architecture and why is it important for scaling?",
    answer: "Stateless architecture means servers don't store client session data between requests. Each request contains all information needed to process it. Important for scaling because: 1) Any server can handle any request, 2) Easy to add/remove servers, 3) No session affinity required, 4) Better fault tolerance, 5) Simple load balancing. Implementation: external session store (Redis), JWT tokens.",
    difficulty: "Medium"
  },
  {
    question: "What is connection pooling and why is it important?",
    answer: "Connection pooling maintains a pool of reusable connections to resources like databases, reducing overhead of creating new connections. Benefits: 1) Reduced connection overhead, 2) Better resource utilization, 3) Faster response times, 4) Protection against connection exhaustion. Parameters: min/max pool size, connection timeout, idle timeout.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between scaling reads and scaling writes?",
    answer: "SCALING READS: Easier - add read replicas, implement caching, use CDN, eventual consistency acceptable. SCALING WRITES: More challenging - requires data partitioning (sharding), write-ahead logging, batch writes, consider eventual consistency. Reads are typically 80-90% of traffic, so read scaling gives big wins. Write scaling often requires architectural changes.",
    difficulty: "Medium"
  },
  {
    question: "Explain database sharding and its challenges.",
    answer: "Sharding horizontally partitions data across multiple database servers. Strategies: Hash-based (Hash(key) % num_shards), Range-based (A-M shard 1, N-Z shard 2), Geographic, Directory lookup. Challenges: 1) Cross-shard queries expensive, 2) Joins across shards complex, 3) Resharding difficult, 4) Referential integrity, 5) Uneven distribution (hot spots), 6) Transaction management.",
    difficulty: "Hard"
  },
  {
    question: "What is consistent hashing and why is it used?",
    answer: "Consistent hashing minimizes remapping when nodes are added/removed from a distributed system. Keys and nodes are hashed to same circular space; keys assigned to next node clockwise. Benefits: minimal key redistribution (K/n keys move), even load with virtual nodes. Use cases: distributed caches (Redis Cluster), load balancers, database sharding, CDNs.",
    difficulty: "Hard"
  },
  {
    question: "How do you handle database scaling in a write-heavy application?",
    answer: "Strategies: 1) SHARDING - partition data across databases, 2) WRITE-OPTIMIZED DATABASES - LSM-tree based (Cassandra, RocksDB), 3) WRITE BUFFERING - buffer in memory, batch flush, 4) ASYNC WRITES - queue for background processing, 5) CQRS - separate write model, 6) EVENT SOURCING - append-only event log for fast sequential writes.",
    difficulty: "Hard"
  },
  {
    question: "What is the thundering herd problem and how do you solve it?",
    answer: "Thundering herd occurs when many clients simultaneously request the same resource after cache expiration. Solutions: 1) CACHE LOCKING - first request acquires lock, others wait, 2) REQUEST COALESCING - combine duplicate requests, 3) STAGGERED EXPIRATION - random TTL variation, 4) EARLY EXPIRATION - refresh before actual expiry with background refresh.",
    difficulty: "Hard"
  },
  {
    question: "How do you scale a system to handle 1 million concurrent users?",
    answer: "Architecture: stateless servers, horizontal scaling, microservices. Database: read replicas, sharding, connection pooling. Caching: CDN for static content, distributed cache (Redis Cluster), 90%+ hit ratio. Async processing: message queues, event-driven architecture. Infrastructure: auto-scaling, multi-region, global load balancing. Back-of-envelope: 1M users at 10 req/min = ~167K RPS, need ~100+ servers at 2K RPS each.",
    difficulty: "Hard"
  },
  {
    question: "What is the CAP theorem and how does it relate to scaling?",
    answer: "CAP theorem: distributed systems can have at most 2 of 3 - Consistency (all nodes see same data), Availability (every request gets response), Partition Tolerance (system works despite network failures). Since partitions happen, real choice is CP or AP. Scaling implications: horizontal scaling introduces distribution, must choose consistency model, eventual consistency enables better scaling.",
    difficulty: "Hard"
  },
  {
    question: "What is back-pressure and why is it important?",
    answer: "Back-pressure is a mechanism where downstream components signal upstream to slow down when they can't keep up. Important because: 1) Prevents system overload, 2) Maintains stability under high load, 3) Prevents out-of-memory conditions, 4) Provides feedback loop. Implementation: bounded queues that block, rate limiting, HTTP 429 responses, flow control in streaming.",
    difficulty: "Hard"
  },
  {
    question: "What is caching and what are the common strategies?",
    answer: "Caching stores copies of data in faster storage. Strategies: 1) CACHE-ASIDE - app checks cache first, loads from DB on miss, 2) READ-THROUGH - cache fetches from DB on miss, 3) WRITE-THROUGH - writes to cache and DB synchronously, 4) WRITE-BEHIND - writes to cache, async to DB, 5) REFRESH-AHEAD - proactively refresh before expiry. Target >90% hit ratio.",
    difficulty: "Medium"
  },
  {
    question: "What is cache invalidation and why is it considered hard?",
    answer: "Cache invalidation removes or updates cached data when source data changes to prevent serving stale data. Strategies: TIME-BASED (TTL) - data expires after set time, EVENT-BASED - invalidate on data change, VERSION-BASED - version number in cache key. It's hard because: distributed systems make coordination complex, race conditions, ensuring consistency, choosing right TTL.",
    difficulty: "Medium"
  },
  {
    question: "What is a CDN and how does it improve performance?",
    answer: "A CDN is a geographically distributed network of servers delivering content from locations close to users. Improvements: 1) Reduced latency (content from nearby edge), 2) Faster load times, 3) Reduced origin server load, 4) Handles traffic spikes, 5) DDoS protection, 6) SSL termination at edge. Best for: static content, video streaming, software downloads, API caching.",
    difficulty: "Easy"
  },
  {
    question: "What are percentiles and why are they important for performance?",
    answer: "Percentiles show what percentage of requests complete below a certain time. P50 (median) - 50% faster, P95 - 95% faster, P99 - 99% faster. Important because: averages hide outliers, P99 shows worst user experience, critical for SLAs. Example: P99 of 200ms means 99% of requests complete within 200ms. Always monitor P95/P99, not just averages.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a system that scales globally?",
    answer: "Multi-region deployment (reduce latency, disaster recovery), GeoDNS for region routing, CDN for static content, edge functions for dynamic content. Data strategy: geo-replication for reads, regional writes with async sync, or global database (Spanner). Must consider: eventual consistency trade-offs, data residency compliance (GDPR), cross-region latency, failover configuration.",
    difficulty: "Hard"
  },
  {
    question: "What is the difference between elasticity and scalability?",
    answer: "SCALABILITY: Ability to handle increased load, can be manual or automatic, focus on handling growth. ELASTICITY: Ability to scale UP and DOWN dynamically, always automatic, matches resources to current demand, optimizes cost. Elasticity implies scalability, but scalability doesn't require elasticity. Cloud platforms enable elasticity through auto-scaling.",
    difficulty: "Medium"
  },
  {
    question: "What challenges arise from horizontal scaling?",
    answer: "1) DATA CONSISTENCY - keeping data in sync, CAP trade-offs, 2) STATE MANAGEMENT - session state across servers needs centralized store, 3) LOAD BALANCING - even distribution, health checking, 4) NETWORK COMPLEXITY - inter-server communication, latency, 5) DEBUGGING - distributed tracing needed, complex log aggregation, 6) DEPLOYMENT - coordinated deployments, version compatibility.",
    difficulty: "Medium"
  },
  {
    question: "What is Little's Law and how is it used in system design?",
    answer: "Little's Law: L = λW, where L = average items in system, λ = average arrival rate, W = average time in system. Used to: calculate required capacity, understand queuing behavior, plan for scaling. Example: if 100 requests arrive per second (λ) and each takes 0.5 seconds (W), average 50 requests in system (L). Helps determine server capacity and queue sizes.",
    difficulty: "Hard"
  },
  {
    question: "What are the scalability patterns like Bulkhead and Circuit Breaker?",
    answer: "BULKHEAD: Isolate components to prevent cascade failures - separate thread pools, connection pools per service, resource quotas. CIRCUIT BREAKER: Prevent cascade failures in distributed systems - monitor failure rate, open circuit on threshold, allow recovery time. Both patterns improve resilience and allow independent scaling of components.",
    difficulty: "Hard"
  },
  {
    question: "What anti-patterns should be avoided when designing for scalability?",
    answer: "1) Premature Optimization - optimize without data, 2) Monolithic Database - single DB for everything limits scaling, 3) Synchronous Everything - blocking calls limit throughput, 4) Ignoring Caching - missing easy performance wins, 5) Tight Coupling - components too dependent, hard to scale independently. Start simple, measure, then optimize based on actual bottlenecks.",
    difficulty: "Medium"
  }
];

export default questions;
