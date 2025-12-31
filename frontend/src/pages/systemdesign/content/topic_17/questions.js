const questions = [
  {
    question: "What is the Circuit Breaker pattern?",
    answer: "Circuit Breaker prevents cascade failures when a service is down. States: CLOSED (normal, requests pass), OPEN (failures exceeded threshold, requests fail fast), HALF-OPEN (test requests to check recovery). After timeout in OPEN, moves to HALF-OPEN. If tests succeed, closes; if fail, reopens. Benefits: Fail fast, allow recovery, prevent resource exhaustion.",
    difficulty: "Medium"
  },
  {
    question: "What is the Saga pattern?",
    answer: "Saga manages distributed transactions without 2PC. Sequence of local transactions with compensating actions for rollback. Example: Order saga - create order, reserve inventory, process payment. If payment fails: release inventory (compensate), cancel order (compensate). Types: Choreography (events trigger next step) or Orchestration (central coordinator). Provides eventual consistency.",
    difficulty: "Hard"
  },
  {
    question: "What is CQRS and when would you use it?",
    answer: "CQRS (Command Query Responsibility Segregation): Separate read and write models. Commands go to write model (optimized for writes), queries go to read model (optimized for reads). Use when: Different read/write patterns, need highly optimized reads (denormalized), complex domain with event sourcing. Trade-off: Complexity, eventual consistency between models.",
    difficulty: "Hard"
  },
  {
    question: "What is Event Sourcing?",
    answer: "Event Sourcing stores state changes as sequence of immutable events instead of current state. Current state = replay all events. Benefits: Complete audit trail, can rebuild state at any point, enables event-driven architecture. Challenges: Event schema evolution, storage growth, query complexity (need projections). Often combined with CQRS.",
    difficulty: "Hard"
  },
  {
    question: "What is the Bulkhead pattern?",
    answer: "Bulkhead isolates failures by partitioning resources (like ship compartments). Implementation: Separate thread pools, connection pools, or service instances per dependency. Example: Separate thread pool for payment vs inventory calls. If payment pool exhausted, inventory calls unaffected. Prevents one slow dependency from exhausting all resources.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between Blue-Green and Canary deployments?",
    answer: "Blue-Green: Two identical environments, instant switch 0/100%. Easy rollback by switching back. No gradual rollout. Canary: Gradual rollout (1% → 10% → 50% → 100%). Monitor metrics at each stage. Smaller blast radius. Rollback by reducing percentage. Use Blue-Green for full testing before switch, Canary for gradual validation with production traffic.",
    difficulty: "Medium"
  },
  {
    question: "What are feature flags and why use them?",
    answer: "Feature flags toggle features on/off without deployment. Code checks flag before executing feature. Benefits: Decouple deployment from release, A/B testing, gradual rollout, kill switch for problems, user-specific features. Example: if (featureFlag.isEnabled('new_checkout', user)) { newCheckout() }. Tools: LaunchDarkly, Split, or custom implementation.",
    difficulty: "Easy"
  },
  {
    question: "What is the 12-Factor App methodology?",
    answer: "12 best practices for cloud-native apps: 1) One codebase, 2) Explicit dependencies, 3) Config in environment, 4) Backing services as resources, 5) Separate build/release/run, 6) Stateless processes, 7) Port binding, 8) Concurrency via processes, 9) Disposability, 10) Dev/prod parity, 11) Logs as streams, 12) Admin as one-offs. Enables scalability, portability, continuous deployment.",
    difficulty: "Medium"
  },
  {
    question: "What is a distributed monolith and why is it an anti-pattern?",
    answer: "Distributed monolith: System with microservices architecture but monolithic behaviors - services tightly coupled, must deploy together, shared database, synchronous dependencies. Has distributed system complexity without microservices benefits. Cause: Poor service boundaries, shared data. Fix: Proper domain modeling, async communication, database per service.",
    difficulty: "Medium"
  },
  {
    question: "What is the Retry pattern and how should you implement it?",
    answer: "Retry: Automatically retry failed operations (network issues, transient failures). Implementation: Exponential backoff (1s, 2s, 4s) with jitter (randomness to prevent thundering herd). Max retries limit. Only retry idempotent operations or transient errors. Circuit breaker to stop retries when service down. Consider: Timeout per attempt, total timeout.",
    difficulty: "Medium"
  },
  {
    question: "When would you use synchronous vs asynchronous communication?",
    answer: "Synchronous (REST, gRPC): When you need immediate response, simple request-reply, strong consistency. Cons: Coupling, cascading failures. Asynchronous (Message Queue): When response not needed immediately, event notification, background processing. Pros: Decoupling, resilience, scale independently. Use sync for queries, async for commands/events where possible.",
    difficulty: "Medium"
  },
  {
    question: "What is an API Gateway and what problems does it solve?",
    answer: "API Gateway: Single entry point for all clients. Solves: Clients knowing multiple services (routing), cross-cutting concerns (auth, rate limiting), protocol translation, request aggregation. Features: Authentication, rate limiting, caching, load balancing, monitoring. Examples: Kong, AWS API Gateway. Essential for microservices external exposure.",
    difficulty: "Easy"
  },
  {
    question: "What is a Service Mesh?",
    answer: "Service Mesh: Infrastructure layer for service-to-service communication. Sidecar proxy (Envoy) with each service handles: load balancing, retries, timeouts, circuit breaking, mTLS, observability. Control plane (Istio, Linkerd) manages configuration. Benefits: Offload networking from application code, consistent policies. Trade-off: Complexity, resource overhead.",
    difficulty: "Hard"
  },
  {
    question: "What is the Strangler Fig pattern?",
    answer: "Strangler Fig: Gradually replace legacy system with new system. Named after strangler fig tree that grows around host tree. Steps: 1) Put facade in front of legacy, 2) Build new features in new system, 3) Route new features to new system, 4) Incrementally migrate old features, 5) Retire legacy. Low risk, continuous delivery during migration.",
    difficulty: "Medium"
  },
  {
    question: "What is the Sidecar pattern?",
    answer: "Sidecar: Deploy helper container alongside main application container. Handles cross-cutting concerns: logging, monitoring, security, networking. Example: Envoy proxy sidecar in service mesh. Benefits: Separation of concerns, consistent behavior, language-agnostic (sidecar handles infra regardless of app language). Used in Kubernetes pod with multiple containers.",
    difficulty: "Medium"
  },
  {
    question: "How do you choose between SQL and NoSQL databases?",
    answer: "SQL (PostgreSQL, MySQL): Complex queries, transactions, relationships, structured data, ACID needed. NoSQL: MongoDB (flexible schema, documents), Cassandra (high write throughput, time-series), Redis (caching, sessions), Elasticsearch (search). Consider: Query patterns, consistency needs, scale requirements, schema flexibility. Often use multiple (polyglot persistence).",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between strong and eventual consistency?",
    answer: "Strong consistency: All nodes see same data immediately after write. Reads always return latest write. Higher latency, may reduce availability. Eventual consistency: Nodes will converge to same data given time. Reads may return stale data temporarily. Lower latency, higher availability. Choose based on requirements: Financial = strong, social feed = eventual acceptable.",
    difficulty: "Medium"
  },
  {
    question: "What are the golden signals in monitoring?",
    answer: "Golden signals (Google SRE): Latency (time to serve request - distinguish success vs error latency), Traffic (demand on system - requests/sec), Errors (rate of failed requests), Saturation (how full is system - resource utilization). Cover these first in any monitoring setup. Similar to RED method (Rate, Errors, Duration).",
    difficulty: "Easy"
  },
  {
    question: "What is the Cache-Aside pattern?",
    answer: "Cache-Aside (Lazy Loading): Application manages cache. Read: Check cache, if miss → query DB → store in cache. Write: Update DB, invalidate cache. Pros: Only caches requested data, resilient to cache failure. Cons: Initial miss is slow, cache can become stale. Most common caching pattern. Use TTL or event-based invalidation.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between Read-Through and Write-Through caching?",
    answer: "Read-Through: Cache sits in front of DB, automatically fetches on miss. Application only talks to cache. Write-Through: Writes go to cache and DB synchronously. Cache always has latest data. Often used together. Pros: Simpler app code, consistency. Cons: Write latency (write-through), cold start (read-through). Alternative: Write-Behind (async DB writes).",
    difficulty: "Medium"
  },
  {
    question: "What is the Outbox pattern?",
    answer: "Outbox pattern solves dual-write problem (update DB and send message atomically). Solution: Write to DB and outbox table in single transaction. Separate process reads outbox, publishes messages, marks as sent. Ensures exactly-once publishing. Used with event sourcing and CDC (Change Data Capture). Tools: Debezium can automate outbox publishing.",
    difficulty: "Hard"
  },
  {
    question: "What is the Ambassador pattern?",
    answer: "Ambassador: Helper service handling network-related tasks on behalf of main service. Similar to sidecar but specifically for network concerns. Examples: Connection pooling, load balancing, logging, monitoring external calls. Deployed alongside main container. Offloads connectivity concerns. Example: Ambassador container handling retry logic to external service.",
    difficulty: "Medium"
  },
  {
    question: "What is the Anti-Corruption Layer pattern?",
    answer: "Anti-Corruption Layer (ACL): Translation layer between your system and external/legacy system. Prevents external system's model from corrupting your domain model. Translates between different models, vocabularies, protocols. Use when: Integrating with legacy, third-party APIs, different bounded contexts. Part of Domain-Driven Design.",
    difficulty: "Medium"
  },
  {
    question: "What is the Backend for Frontend (BFF) pattern?",
    answer: "BFF: Separate backend for each frontend type (web, mobile, partner). Each BFF optimized for specific client: Aggregates from microservices, transforms data for client needs, handles client-specific logic. Benefits: Optimized per client, independent evolution. Trade-off: Code duplication across BFFs. Use when clients have significantly different needs.",
    difficulty: "Medium"
  },
  {
    question: "What is the Throttling pattern?",
    answer: "Throttling: Limit resource consumption to prevent overload. Implementation: Rate limiting (requests/second), queuing excess requests, degraded service mode. Strategies: Reject excess (429 Too Many Requests), queue and process later, reduce quality. Apply at: API Gateway, service level, database. Protect against: DDoS, runaway clients, noisy neighbors.",
    difficulty: "Easy"
  },
  {
    question: "What is the Competing Consumers pattern?",
    answer: "Competing Consumers: Multiple consumers read from same queue, each message processed by one consumer. Provides: Parallel processing, load distribution, scalability (add consumers). Implementation: Message queue (RabbitMQ, SQS), consumers compete for messages. Considerations: Message ordering (may be lost), idempotency (for retries), visibility timeout.",
    difficulty: "Medium"
  },
  {
    question: "What is the Priority Queue pattern?",
    answer: "Priority Queue: Messages processed based on priority, not FIFO. High-priority messages processed first. Implementation: Multiple queues per priority level, consumers check higher priority first. Or single queue with priority field, sorted by priority. Use cases: VIP customer requests, critical alerts, SLA-based processing. Consider: Starvation of low priority items.",
    difficulty: "Easy"
  },
  {
    question: "What is the Sharding pattern?",
    answer: "Sharding: Horizontal partitioning of data across multiple databases. Each shard contains subset of data. Strategies: Hash-based (even distribution), range-based (efficient range queries), directory-based (flexible mapping). Benefits: Scale writes, distribute load. Challenges: Cross-shard queries, rebalancing, choosing shard key. Used when single database can't handle load.",
    difficulty: "Medium"
  },
  {
    question: "What is the Health Endpoint Monitoring pattern?",
    answer: "Health Endpoint Monitoring: Expose endpoint (/health) reporting service health. Load balancers and orchestrators use it for routing. Levels: Liveness (is it running?), Readiness (can it serve traffic?). Include: Dependency checks (DB, cache), resource status. Return: HTTP 200 (healthy), 503 (unhealthy). Kubernetes uses for pod management.",
    difficulty: "Easy"
  },
  {
    question: "What is the Leader Election pattern?",
    answer: "Leader Election: One instance designated as leader for coordination tasks. Other instances are followers. If leader fails, new leader elected. Implementation: Consensus algorithms (Raft, Paxos), distributed locks (ZooKeeper, etcd, Redis). Use cases: Single writer, coordination tasks, cron jobs. Leader handles unique responsibilities, followers standby for failover.",
    difficulty: "Hard"
  }
];

export default questions;
