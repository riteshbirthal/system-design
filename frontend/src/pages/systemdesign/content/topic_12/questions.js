const questions = [
  {
    question: "What is database sharding?",
    answer: "Sharding is horizontal partitioning of data across multiple database servers (shards). Each shard contains a subset of the total data. Benefits: horizontal scaling, distribute load, handle large datasets. Data is distributed based on a shard key. Example: User data sharded by user_id - different users on different shards.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between horizontal and vertical partitioning?",
    answer: "Horizontal (Sharding): Divide rows across partitions based on key. Same schema everywhere, different rows per shard. Example: Users 1-1M on Shard1, 1M-2M on Shard2. Vertical: Divide columns into different tables. Example: Separate frequently accessed columns from rarely accessed (core user data vs profile bio). Use horizontal for scale, vertical for access patterns.",
    difficulty: "Easy"
  },
  {
    question: "What is a partition key and how do you choose one?",
    answer: "Partition key determines which shard stores the data. hash(key) or range determines placement. Good key characteristics: High cardinality (many unique values), even distribution (avoid hotspots), matches query patterns (queries include key), stable (doesn't change). Bad examples: status (low cardinality), timestamp (hotspot on recent), boolean fields.",
    difficulty: "Medium"
  },
  {
    question: "Explain hash-based sharding and its pros/cons.",
    answer: "Hash-based: shard_id = hash(key) % num_shards. Pros: Even distribution with good hash function, simple to implement, deterministic placement. Cons: Adding/removing shards requires massive redistribution (all data rehashes), range queries inefficient (must query all shards), no data locality. Best for: Even distribution priority, point queries.",
    difficulty: "Medium"
  },
  {
    question: "Explain range-based sharding and its pros/cons.",
    answer: "Range-based: Assign key ranges to shards. Example: A-M on Shard1, N-Z on Shard2. Pros: Efficient range queries (know which shards to query), natural for time-series, easy to understand. Cons: Hotspots (recent data accessed more), uneven distribution possible, manual rebalancing. Best for: Time-series data, range queries important.",
    difficulty: "Medium"
  },
  {
    question: "What is consistent hashing and why is it important?",
    answer: "Consistent hashing places nodes and keys on a virtual ring. Keys go to next node clockwise. Importance: When adding/removing nodes, only K/N keys move (vs all keys in simple hash). Solves redistribution problem. Virtual nodes (multiple points per server) improve distribution. Used by: Cassandra, DynamoDB, distributed caches. Essential for dynamic scaling.",
    difficulty: "Hard"
  },
  {
    question: "What are virtual nodes in consistent hashing?",
    answer: "Virtual nodes create multiple positions on hash ring per physical node. Instead of 1 position, node gets 100-200 virtual positions. Benefits: Better load distribution (avoids clustering), smoother rebalancing (smaller chunks move), handles heterogeneous hardware (more vnodes for powerful nodes). Trade-off: More metadata to track.",
    difficulty: "Hard"
  },
  {
    question: "What is database replication and what are its benefits?",
    answer: "Replication copies data across multiple nodes. Benefits: Availability (data accessible if node fails), Durability (data not lost), Read scaling (distribute reads across replicas), Geographic (serve from nearest location), Backup (built-in redundancy). Replication factor (RF) = number of copies. RF=3 common (survives 2 node failures).",
    difficulty: "Easy"
  },
  {
    question: "Explain leader-follower replication.",
    answer: "Leader-Follower (Primary-Replica): One leader accepts all writes, replicates to followers. Followers handle reads. Leader failure triggers failover (follower promoted). Pros: Clear write path, read scaling, simple. Cons: Write bottleneck, failover complexity. Synchronous: Strong consistency, higher latency. Asynchronous: Lower latency, possible data loss. Most common replication topology.",
    difficulty: "Medium"
  },
  {
    question: "What is synchronous vs asynchronous replication?",
    answer: "Synchronous: Write confirmed only after all (or quorum) replicas acknowledge. Strong consistency, no data loss, but higher latency. Asynchronous: Write confirmed immediately, replication happens in background. Lower latency, but potential data loss if leader fails before replication. Semi-sync: Wait for at least one replica. Choose based on consistency vs latency requirements.",
    difficulty: "Medium"
  },
  {
    question: "What is quorum-based replication?",
    answer: "Quorum uses configurable read (R) and write (W) requirements. N = total replicas. Strong consistency if W + R > N. Example: N=3, W=2, R=2 (majority quorum). Write succeeds if 2/3 acknowledge. Read queries 2/3 and takes latest. Tunable: W=1,R=3 for fast writes; W=3,R=1 for fast reads. Used by Cassandra, DynamoDB.",
    difficulty: "Medium"
  },
  {
    question: "What is a hotspot in sharding and how do you handle it?",
    answer: "Hotspot: One shard receives disproportionate traffic (celebrity user, trending topic, recent timestamp). Solutions: 1) Add random suffix to hot keys (scatter across shards). 2) Split hot partitions. 3) Cache hot data. 4) Application-level sharding. 5) Dedicated shard for hot data. Prevention: Good partition key choice, monitor shard distribution.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle cross-shard queries?",
    answer: "Cross-shard queries are expensive (must query multiple shards, combine results). Solutions: 1) Denormalize data to avoid joins. 2) Co-locate related data (same shard key). 3) Scatter-gather pattern (query all, merge). 4) Application-level joins. 5) Avoid cross-shard transactions (use Saga pattern). Design queries around partition key to minimize cross-shard operations.",
    difficulty: "Hard"
  },
  {
    question: "What is partition rebalancing?",
    answer: "Rebalancing redistributes data when nodes added/removed. Strategies: 1) Fixed partitions - create many partitions upfront, move whole partitions. 2) Dynamic partitions - split/merge based on size. 3) Consistent hashing - minimize movement. Challenges: Data movement takes time/bandwidth, queries during rebalancing. Best practice: Automate, throttle movement, maintain service during rebalance.",
    difficulty: "Medium"
  },
  {
    question: "How does MongoDB handle sharding?",
    answer: "MongoDB sharding: Data divided into chunks (default 64MB). Chunks distributed across shards. Shard key determines placement. Config servers store metadata. Mongos routers direct queries. Automatic chunk splitting and balancing. Supports hash and range shard keys. Replica sets per shard for HA. Zones for geographic/tenant sharding.",
    difficulty: "Medium"
  },
  {
    question: "How does Cassandra handle partitioning?",
    answer: "Cassandra uses consistent hashing with virtual nodes. Partition key hashed to token, token determines node. Replication factor configurable. Tunable consistency (ONE, QUORUM, ALL). No leader - all nodes accept writes. Data automatically distributed and replicated. Good for: Write-heavy, multi-datacenter. Partition key critical for performance.",
    difficulty: "Medium"
  },
  {
    question: "What is the CAP theorem's relevance to partitioning?",
    answer: "CAP: Can only have 2 of Consistency, Availability, Partition tolerance. Partitioned systems must be partition tolerant. Choice is C vs A during partition. Sharding increases partition risk (more network hops). Replication strategy determines consistency model. CP (strong consistency): May be unavailable. AP (availability): Eventual consistency. Choose based on requirements.",
    difficulty: "Medium"
  },
  {
    question: "What is replication lag and how do you handle it?",
    answer: "Replication lag: Delay between write on leader and visibility on replica. Causes stale reads from replicas. Solutions: 1) Read from leader for critical reads. 2) Read-your-writes consistency (track user's latest write). 3) Monotonic reads (same replica per session). 4) Causal consistency (track dependencies). 5) Synchronous replication (eliminates lag, adds latency).",
    difficulty: "Medium"
  },
  {
    question: "How do you handle distributed transactions across shards?",
    answer: "Options: 1) Two-Phase Commit (2PC) - coordinator manages, blocking, slow. 2) Saga pattern - sequence of local transactions with compensating actions. 3) Avoid - design to not need cross-shard transactions. 4) Global transaction managers (Vitess). Best practice: Minimize cross-shard transactions through data modeling. Saga preferred for availability.",
    difficulty: "Hard"
  },
  {
    question: "What is geographic sharding?",
    answer: "Geographic sharding places data in region based on user location. Benefits: Low latency (data near users), data residency compliance (GDPR), disaster recovery. Challenges: User migration between regions, cross-region queries, data synchronization. Implementation: Shard by country/region, use multi-region database (Spanner, CockroachDB), or regional deployments.",
    difficulty: "Medium"
  },
  {
    question: "How does failover work in replicated systems?",
    answer: "Failover promotes replica to leader when leader fails. Steps: 1) Detect failure (heartbeat timeout). 2) Select new leader (most up-to-date replica). 3) Reconfigure system (update routing). 4) Sync other replicas. Challenges: Split-brain (two leaders), data loss (async replication), failover time. Solutions: Consensus protocols (Raft, Paxos), fencing tokens, leader lease.",
    difficulty: "Hard"
  },
  {
    question: "What is split-brain in distributed systems?",
    answer: "Split-brain: Network partition causes nodes to believe others failed, multiple nodes act as leader. Results in conflicting writes, data corruption. Prevention: 1) Quorum (majority needed to operate). 2) Fencing tokens (unique increasing ID for leader). 3) STONITH (Shoot The Other Node In The Head). 4) Consensus protocols. Detection and recovery critical for data integrity.",
    difficulty: "Hard"
  },
  {
    question: "How do you design a sharding strategy for a social media application?",
    answer: "Considerations: Users (shard by user_id), Posts (shard by user_id or post_id), Followers (challenge - crosses users), Feed (fan-out). Strategy: User data and posts by user_id. Followers: Store both directions, accept duplication. Feed: Pre-compute (fan-out on write) or compute on read. Celebrities: Special handling (dedicated shards, async fan-out). Cache heavily.",
    difficulty: "Hard"
  },
  {
    question: "What is multi-leader replication and when is it used?",
    answer: "Multi-leader: Multiple nodes accept writes, sync with each other. Use cases: Multi-datacenter (leader per DC reduces latency), offline operation (each device is leader). Challenges: Conflict resolution (same data modified differently). Conflict strategies: Last-write-wins, merge, custom resolution. More complex than single-leader. Used when geographic distribution or offline support needed.",
    difficulty: "Hard"
  },
  {
    question: "How does Amazon DynamoDB handle partitioning and replication?",
    answer: "DynamoDB: Automatic partitioning based on partition key (hash-based). Auto-scaling based on traffic. Replication: 3 copies across AZs by default. Global tables for multi-region. Consistency: Eventually consistent reads (default) or strongly consistent. Adaptive capacity handles hotspots. No manual sharding - fully managed. Choose partition key for even distribution.",
    difficulty: "Medium"
  },
  {
    question: "What is chain replication?",
    answer: "Chain replication: Nodes arranged in chain (Head → Node1 → Node2 → Tail). Writes go to head, propagate down chain. Reads from tail (guaranteed latest). Benefits: Strong consistency, high throughput, simple failover (remove node, reconnect chain). Used by: HDFS, some distributed storage. Trade-off: Write latency proportional to chain length.",
    difficulty: "Hard"
  },
  {
    question: "How do you monitor a sharded database?",
    answer: "Key metrics per shard: Data size/distribution, query latency, throughput, connection count. Watch for: Uneven distribution (hotspots), slow shards, replication lag. System-wide: Cross-shard query frequency, rebalancing status. Tools: Database metrics, APM (New Relic, DataDog), custom dashboards. Alerts: Shard imbalance >20%, high replication lag, cross-shard query increase.",
    difficulty: "Medium"
  },
  {
    question: "What is directory-based sharding?",
    answer: "Directory-based: Lookup service maps keys to shards. Unlike hash/range, mapping is explicit and flexible. Pros: Can optimize placement, easy to change mappings, supports any distribution logic. Cons: Directory is single point of failure (must be highly available), extra lookup latency, more complex. Use when: Need flexible placement, migration support, or complex routing logic.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle schema changes in a sharded database?",
    answer: "Challenges: Must update all shards, maintain compatibility during rollout. Strategies: 1) Rolling update (one shard at a time). 2) Online schema change tools (pt-online-schema-change, gh-ost). 3) Dual-write during transition. 4) Schema versioning in application. 5) NoSQL flexible schemas help. Best practice: Backward compatible changes, test on one shard first, automate rollout.",
    difficulty: "Hard"
  },
  {
    question: "What is the difference between sharding and partitioning?",
    answer: "Technically: Partitioning is general term for dividing data. Sharding specifically means horizontal partitioning across multiple servers. In practice: Often used interchangeably. Sharding implies distribution across machines. Partitioning can be within single database (table partitions). Both address scale, but sharding adds network/distributed system complexity.",
    difficulty: "Easy"
  }
];

export default questions;
