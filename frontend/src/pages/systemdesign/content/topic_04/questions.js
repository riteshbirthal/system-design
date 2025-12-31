const questions = [
  {
    question: "What is system availability?",
    answer: "Availability is the proportion of time a system is operational and accessible to users. It is calculated as: Availability = Uptime / (Uptime + Downtime), or Availability = MTBF / (MTBF + MTTR), where MTBF is Mean Time Between Failures and MTTR is Mean Time To Recovery. A system with 99.9% availability is expected to be operational 99.9% of the time.",
    difficulty: "Easy"
  },
  {
    question: "What does 'five nines' availability mean?",
    answer: "'Five nines' refers to 99.999% availability. This translates to approximately 5.26 minutes of downtime per year or 26.3 seconds per month. This is an extremely high availability target typically required for critical infrastructure like payment systems, emergency services, or core cloud platform services. Achieving this requires significant investment in redundancy, automation, and operational excellence.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between availability and reliability?",
    answer: "AVAILABILITY measures how often a system is operational and accessible. A system can be available even if it occasionally fails, as long as it recovers quickly. RELIABILITY measures how consistently a system performs without failures. A reliable system fails less frequently. Example: System A fails once per month, recovers in 1 minute = High availability. System B never fails for 11 months, then fails for 1 day = High reliability but lower availability when it does fail.",
    difficulty: "Easy"
  },
  {
    question: "What is MTBF and MTTR?",
    answer: "MTBF (Mean Time Between Failures): Average time a system operates before experiencing a failure. Higher MTBF indicates better reliability. MTTR (Mean Time To Recovery/Repair): Average time needed to restore service after a failure, including detection, diagnosis, and repair. Lower MTTR indicates faster recovery. These metrics directly impact availability: Availability = MTBF / (MTBF + MTTR). To improve availability, either increase MTBF or decrease MTTR.",
    difficulty: "Easy"
  },
  {
    question: "What is fault tolerance?",
    answer: "Fault tolerance is the ability of a system to continue operating correctly even when one or more components fail. A fault-tolerant system: 1) Detects failures automatically, 2) Isolates failed components, 3) Continues operating without user-visible impact, 4) May operate in degraded mode if necessary. Unlike high availability which allows brief interruptions, fault tolerance aims for zero perceptible downtime during failures, requiring synchronized redundancy.",
    difficulty: "Easy"
  },
  {
    question: "What is a Single Point of Failure (SPOF)?",
    answer: "A Single Point of Failure is any component whose failure causes the entire system to fail. Common SPOFs: single database server, single load balancer, single network link, single power supply, single authentication service. Solutions: add redundancy (multiple instances), use clustering, implement failover mechanisms, distribute across availability zones.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between active-active and active-passive?",
    answer: "ACTIVE-ACTIVE: All instances serve traffic simultaneously, load distributed across all, immediate failover, better resource utilization, higher cost and complexity. ACTIVE-PASSIVE: Primary instance serves traffic, standby instances wait for failover, some failover delay, lower resource utilization, simpler to manage. Example: Active-active is multiple web servers behind a load balancer; Active-passive is a primary database with hot standby.",
    difficulty: "Easy"
  },
  {
    question: "What is RTO and RPO?",
    answer: "RTO (Recovery Time Objective): Maximum acceptable time to restore service after failure. Answers 'How long can we be down?' Example: RTO of 4 hours means service must be back within 4 hours. RPO (Recovery Point Objective): Maximum acceptable data loss measured in time. Answers 'How much data can we lose?' Example: RPO of 1 hour means we can lose up to 1 hour of data. Lower RTO requires faster recovery; lower RPO requires more frequent backups.",
    difficulty: "Easy"
  },
  {
    question: "What is an SLA, SLO, and SLI?",
    answer: "SLI (Service Level Indicator): Actual measurement of service behavior (e.g., request latency, error rate). SLO (Service Level Objective): Target value for an SLI, internal goal for the team (e.g., '99.9% of requests complete in under 200ms'). SLA (Service Level Agreement): Contractual commitment to customers with consequences for violations (refunds, credits). Usually less stringent than SLO as a safety buffer.",
    difficulty: "Medium"
  },
  {
    question: "How do you calculate composite availability for systems in series?",
    answer: "For systems in series (all must work): A_total = A1 × A2 × A3. Example with 3 services each at 99.9%: A_total = 0.999 × 0.999 × 0.999 = 0.997 (99.7%). Key insight: Adding more components in series DECREASES availability. This is why microservices must handle partial failures gracefully. Solutions: reduce dependencies, add redundancy, use circuit breakers.",
    difficulty: "Medium"
  },
  {
    question: "How do you calculate composite availability for parallel systems?",
    answer: "For parallel systems (any one working is sufficient): A_total = 1 - (1-A1) × (1-A2). Example with 2 servers each at 99%: A_total = 1 - (0.01 × 0.01) = 1 - 0.0001 = 99.99%. Key insight: Adding redundant components INCREASES availability significantly. Two 99% servers give 99.99% combined availability. This is why redundancy is so powerful.",
    difficulty: "Medium"
  },
  {
    question: "What are the different types of faults?",
    answer: "1) TRANSIENT FAULTS: Temporary, self-resolving (network timeout, temporary overload). Solution: retry with backoff. 2) INTERMITTENT FAULTS: Occur sporadically, hard to reproduce (memory leaks, race conditions). Solution: circuit breakers, enhanced monitoring. 3) PERMANENT FAULTS: Persistent until fixed (hardware failure, bugs). Solution: replacement, redundancy. 4) BYZANTINE FAULTS: Component produces incorrect results. Solution: consensus protocols, validation.",
    difficulty: "Medium"
  },
  {
    question: "What is the split-brain problem?",
    answer: "Split-brain occurs when network partitions cause multiple nodes to believe they are the primary, leading to data inconsistency, resource conflicts, and corruption. Prevention strategies: 1) Quorum-based decisions (majority must agree), 2) Fencing (prevent old primary from accepting writes), 3) STONITH (Shoot The Other Node In The Head - kill uncertain nodes), 4) Leader election with consensus (Raft, Paxos).",
    difficulty: "Medium"
  },
  {
    question: "What is graceful degradation?",
    answer: "Graceful degradation is designing systems to maintain partial functionality when components fail, rather than complete failure. Examples: E-commerce shows cached product data when DB is slow, streaming service reduces video quality instead of buffering, search returns cached results when real-time fails. Implementation: 1) Identify critical vs non-critical features, 2) Provide fallback behaviors, 3) Communicate degraded state to users.",
    difficulty: "Medium"
  },
  {
    question: "What is the circuit breaker pattern?",
    answer: "Circuit breaker prevents cascade failures by stopping calls to failing services. States: CLOSED (normal operation), OPEN (service failing, requests fail immediately), HALF-OPEN (testing if service recovered). Transitions: CLOSED→OPEN after threshold of failures, OPEN→HALF-OPEN after timeout, HALF-OPEN→CLOSED if test requests succeed. Benefits: fail fast, allow recovery time, prevent resource exhaustion.",
    difficulty: "Medium"
  },
  {
    question: "What is the bulkhead pattern?",
    answer: "The bulkhead pattern isolates components to contain failures, like bulkheads in a ship prevent the entire vessel from flooding. Implementation: separate thread pools per service, connection pool per dependency, resource quotas. Benefits: failure in one component doesn't affect others, resource isolation, predictable behavior under partial failure. Example: If Service A's thread pool is exhausted, Service B can still operate normally.",
    difficulty: "Medium"
  },
  {
    question: "What are the different disaster recovery strategies?",
    answer: "1) BACKUP AND RESTORE: Regular backups, restore when needed. RTO: hours-days, RPO: hours. Lowest cost. 2) PILOT LIGHT: Minimal version always running, scale up during disaster. RTO: hours, RPO: minutes-hours. 3) WARM STANDBY: Scaled-down replica running. RTO: minutes-hours, RPO: minutes. 4) MULTI-SITE ACTIVE-ACTIVE: Full duplicate, traffic split between sites. RTO: near zero, RPO: near zero. Highest cost.",
    difficulty: "Medium"
  },
  {
    question: "What is the 3-2-1 backup rule?",
    answer: "The 3-2-1 rule is a backup strategy: 3 copies of data, 2 different storage types (e.g., disk and cloud), 1 offsite location (geographically separate). This protects against: single device failure (3 copies), storage media failure (2 types), site disaster (1 offsite). Additional modern considerations: at least 1 copy offline/air-gapped (ransomware protection), test restores regularly.",
    difficulty: "Easy"
  },
  {
    question: "What is chaos engineering?",
    answer: "Chaos engineering deliberately introduces failures to test system resilience. Principles: 1) Define steady state behavior, 2) Hypothesize about failure impact, 3) Introduce real-world events (kill instances, inject latency, fill disks), 4) Observe and learn. Tools: Chaos Monkey (Netflix), Gremlin, Litmus (Kubernetes), AWS Fault Injection Simulator. Benefits: discover weaknesses before real incidents, build confidence in system resilience.",
    difficulty: "Hard"
  },
  {
    question: "What are the different failure modes?",
    answer: "1) FAIL-STOP: Component completely stops. Easiest to detect and handle. 2) FAIL-SLOW: Component becomes very slow. Hard to detect, causes cascading issues like timeouts and resource exhaustion. 3) FAIL-PARTIAL: Component works sometimes (intermittent). 4) BYZANTINE: Component gives wrong results. Hardest to handle, requires consensus protocols. Fail-slow is often most dangerous because it's subtle.",
    difficulty: "Hard"
  },
  {
    question: "How do you design for high availability in a database system?",
    answer: "Strategies: 1) Replication - synchronous (strong consistency, higher latency) or asynchronous (lower latency, eventual consistency). 2) Automatic failover with health checks. 3) Multi-AZ deployment for zone failure resilience. 4) Read replicas for read scaling. 5) Connection pooling to handle primary failure gracefully. 6) Regular backup testing. 7) Use managed services (RDS Multi-AZ, Cloud SQL HA) which handle much of this automatically.",
    difficulty: "Hard"
  },
  {
    question: "How do you achieve high availability in a multi-region setup?",
    answer: "Architecture: Deploy in multiple geographic regions with global load balancing. Data strategy: Active-passive (writes to one region, replicate to others) or active-active (writes anywhere with conflict resolution). Use GeoDNS for routing users to nearest region. Challenges: data synchronization latency, cross-region consistency, compliance (data residency). Costs are higher but provides: regional failure survival, lower latency, disaster recovery.",
    difficulty: "Hard"
  },
  {
    question: "What is the retry with exponential backoff pattern?",
    answer: "Retry with exponential backoff handles transient failures by retrying with increasing delays: Attempt 1 fails → wait 1s → Attempt 2 fails → wait 2s → Attempt 3 fails → wait 4s. Add jitter (random variation) to prevent thundering herd. Benefits: handles temporary failures, doesn't overwhelm recovering services. Configuration: max retries, initial delay, max delay, jitter factor. Stop retrying for permanent failures (4xx errors).",
    difficulty: "Medium"
  },
  {
    question: "What metrics should you monitor for availability?",
    answer: "Key metrics: 1) Uptime/downtime percentage, 2) Error rates (4xx, 5xx), 3) Latency percentiles (p50, p95, p99), 4) Request success rate, 5) Health check status. Infrastructure: CPU, memory, disk, network utilization. Business metrics: Failed transactions, customer-impacting errors. Set alerts on: error rate spikes, latency increases, health check failures. Track composite availability across dependent services.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle database failover without data loss?",
    answer: "Use synchronous replication so standby has all committed transactions before failover. Trade-off: higher latency on writes. For async replication, accept potential data loss (RPO > 0). Implement write-ahead logging (WAL). Use consensus-based systems (Raft, Paxos) for leader election. Ensure fencing to prevent old primary from accepting writes. Test failover regularly to measure actual RTO/RPO.",
    difficulty: "Hard"
  },
  {
    question: "What is the difference between high availability and disaster recovery?",
    answer: "HIGH AVAILABILITY: Prevents downtime from component failures within a region. Uses redundancy, automatic failover, typically within same data center or availability zone. Focus: minimize MTTR, handle routine failures. DISASTER RECOVERY: Recovers from catastrophic events affecting entire sites/regions. Uses backup sites, may be manual. Focus: business continuity after major incidents. HA handles daily failures; DR handles rare catastrophes.",
    difficulty: "Medium"
  },
  {
    question: "How do you implement health checks effectively?",
    answer: "Levels: 1) Liveness - is process running (TCP check), 2) Readiness - can accept traffic (dependencies ready), 3) Deep health - full functionality (database connected, cache working). Best practices: separate endpoints for each type, include dependency status, timeout appropriately, don't cache results, consider startup time. Load balancers use readiness to route traffic; orchestrators use liveness to restart containers.",
    difficulty: "Medium"
  },
  {
    question: "What is the role of load balancers in high availability?",
    answer: "Load balancers improve availability by: 1) Distributing traffic across healthy servers, 2) Detecting failed servers via health checks, 3) Removing unhealthy servers from rotation, 4) Re-adding recovered servers. For HA, use redundant load balancers (active-active or active-passive). Layer 4 (TCP) is faster but less intelligent; Layer 7 (HTTP) enables content-based routing. Cloud providers offer managed HA load balancers.",
    difficulty: "Medium"
  },
  {
    question: "What causes cascade failures and how do you prevent them?",
    answer: "Causes: One failing service overwhelms others with retries, resource exhaustion spreads, timeout storms, dependency chains. Prevention: 1) Circuit breakers stop calling failing services, 2) Bulkheads isolate failures, 3) Timeouts prevent indefinite waiting, 4) Rate limiting protects services, 5) Graceful degradation maintains core functionality, 6) Backpressure signals upstream to slow down. Monitor for slow responses (fail-slow is dangerous).",
    difficulty: "Hard"
  },
  {
    question: "How do you test availability and fault tolerance?",
    answer: "Testing methods: 1) Failover testing - manually trigger failover, measure RTO, 2) Chaos engineering - inject random failures in production, 3) Load testing - verify behavior under stress, 4) Backup restoration - regularly test restoring from backups, 5) Game days - simulated incident response exercises, 6) DR drills - full disaster recovery scenario testing. Automate where possible, document findings, improve based on results.",
    difficulty: "Hard"
  }
];

export default questions;
