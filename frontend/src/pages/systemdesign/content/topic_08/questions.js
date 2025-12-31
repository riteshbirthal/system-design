const questions = [
  {
    question: "What is the CAP theorem?",
    answer: "CAP theorem states that a distributed system can only provide two of three guarantees simultaneously: Consistency (all nodes see same data), Availability (every request gets a response), and Partition Tolerance (system works despite network failures). Since network partitions are inevitable, the practical choice is between CP (consistency during partition) or AP (availability during partition).",
    difficulty: "Easy"
  },
  {
    question: "What does Consistency mean in CAP theorem?",
    answer: "Consistency in CAP means every read receives the most recent write or an error. All nodes see the same data at the same time (linearizability). If a system cannot guarantee the latest data, it returns an error rather than stale data. This is different from ACID consistency which refers to database constraints. CAP consistency is about distributed data synchronization.",
    difficulty: "Easy"
  },
  {
    question: "What does Availability mean in CAP theorem?",
    answer: "Availability means every request receives a non-error response, regardless of any node's state. The system continues operating and serving requests even during failures. It may return stale data rather than no data. Key point: it doesn't guarantee 'correct' response, just 'a' response. High availability is measured in 'nines' (99.9%, 99.99%, etc.).",
    difficulty: "Easy"
  },
  {
    question: "What is Partition Tolerance in CAP theorem?",
    answer: "Partition Tolerance means the system continues operating despite network failures, message loss, or delays between nodes. It handles network splits where some nodes can't communicate with others. In distributed systems, partitions are inevitable (network is unreliable), so P is usually required. The real CAP choice is typically between CP and AP.",
    difficulty: "Easy"
  },
  {
    question: "What is a CP system? Give examples.",
    answer: "CP (Consistency + Partition Tolerance) systems choose consistency over availability during partitions. They reject requests that cannot be guaranteed consistent, may timeout or return errors, and wait for partition to heal. Examples: MongoDB (with majority write concern), HBase, Zookeeper, Etcd, Google Spanner, CockroachDB. Use for: banking, inventory, booking systems.",
    difficulty: "Medium"
  },
  {
    question: "What is an AP system? Give examples.",
    answer: "AP (Availability + Partition Tolerance) systems choose availability over consistency during partitions. They continue serving requests with possibly stale data, allow writes on both sides of partition, and require conflict resolution after healing. Examples: Cassandra, DynamoDB, CouchDB, Riak. Use for: social media feeds, shopping carts, content caching, analytics.",
    difficulty: "Medium"
  },
  {
    question: "Why is CA (Consistency + Availability) not practical for distributed systems?",
    answer: "CA requires no partition tolerance, meaning all nodes must always communicate perfectly. In distributed systems, network partitions are inevitable - hardware fails, networks split, messages are lost. A CA system is essentially a single-node or tightly-coupled system. Traditional single-instance RDBMS (PostgreSQL, MySQL) are CA but aren't truly distributed.",
    difficulty: "Medium"
  },
  {
    question: "What is eventual consistency?",
    answer: "Eventual consistency means if no new updates are made, eventually all replicas will converge to the same value. Temporary inconsistencies are allowed. Properties: high availability, low latency, temporary divergence acceptable, convergence guaranteed given time. Use for: social feeds, recommendations, analytics. Not suitable for financial transactions where accuracy is critical.",
    difficulty: "Easy"
  },
  {
    question: "What is strong consistency (linearizability)?",
    answer: "Strong consistency (linearizability) means operations appear instantaneous in some global order. Once a write completes, all subsequent reads return that value. Properties: real-time ordering, total ordering, single-copy semantics. Implementation: consensus protocols (Paxos, Raft), single-leader replication. Trade-offs: highest guarantee but significant latency overhead and reduced availability.",
    difficulty: "Medium"
  },
  {
    question: "Explain the difference between sequential and causal consistency.",
    answer: "Sequential consistency: All processes see operations in same order, but order may not match real-time. Causal consistency: Only causally related operations must be seen in same order; concurrent operations may be seen differently. Causal is weaker but sufficient for many use cases. Example: In messaging, A's reply to B must be seen after B's message (causal), but unrelated messages can appear in any order.",
    difficulty: "Hard"
  },
  {
    question: "What is the PACELC theorem?",
    answer: "PACELC extends CAP to address normal operation, not just partitions. IF Partition: choose Availability or Consistency. ELSE (no partition): choose Latency or Consistency. Classifications: PA/EL (Cassandra, DynamoDB) - fast, eventual. PC/EC (MongoDB, Spanner) - always consistent. PA/EC - available during partition, consistent normally. This better captures real-world database behavior.",
    difficulty: "Hard"
  },
  {
    question: "What is quorum-based consistency?",
    answer: "Quorum defines minimum nodes that must agree for operations to succeed. Variables: N (total replicas), W (write quorum), R (read quorum). Rule for strong consistency: W + R > N. Examples: N=3, W=2, R=2 is strongly consistent (2+2>3). N=3, W=1, R=1 is eventually consistent (1+1≤3). Allows tuning consistency vs availability trade-off.",
    difficulty: "Medium"
  },
  {
    question: "What is read repair in distributed systems?",
    answer: "Read repair detects and fixes inconsistencies during read operations. Process: 1) Read from multiple replicas, 2) Compare values and timestamps, 3) Update stale replicas with latest value, 4) Return latest to client. Benefits: gradual consistency repair during normal operations, no separate repair process. Used in: Cassandra, DynamoDB for anti-entropy.",
    difficulty: "Medium"
  },
  {
    question: "What are vector clocks and why are they used?",
    answer: "Vector clocks track causality and detect conflicts in distributed systems. Structure: {node1: count1, node2: count2, ...}. Each node increments its counter on events. To compare: if VC1's all counters >= VC2's, VC1 happened after. If neither is strictly greater, events are concurrent (conflict detected). Used for conflict resolution in AP systems like Riak, DynamoDB.",
    difficulty: "Hard"
  },
  {
    question: "What is last-write-wins (LWW) conflict resolution?",
    answer: "LWW resolves conflicts by using timestamps - latest timestamp wins, older writes discarded. Simple but has issues: clock synchronization problems across nodes, may lose valid concurrent updates, data loss possible. Use when: data loss acceptable, simplicity preferred, operations are idempotent. Better alternatives: vector clocks, CRDTs for automatic merge.",
    difficulty: "Medium"
  },
  {
    question: "How would you design consistency for a banking application?",
    answer: "Use CP with strong consistency. Requirements: accurate balances, prevent double-spending, regulatory compliance. Implementation: serializable transactions, synchronous replication, reject transactions during partition rather than risk errors. Database choice: Spanner, CockroachDB, PostgreSQL with synchronous replication. Include audit logging, use 2PC for distributed transactions if needed.",
    difficulty: "Medium"
  },
  {
    question: "How would you design consistency for a social media feed?",
    answer: "Use AP with eventual consistency. Requirements: high throughput, global scale, some staleness acceptable. Implementation: timeline fanout on write, eventual sync between regions, read from nearest replica. Users might see likes count vary slightly - acceptable trade-off. Database choice: Cassandra, DynamoDB. Separate critical operations (auth) with stronger consistency.",
    difficulty: "Medium"
  },
  {
    question: "What is MVCC (Multi-Version Concurrency Control)?",
    answer: "MVCC maintains multiple versions of data so readers see consistent snapshots without blocking writers. Benefits: readers don't block writers, writers don't block readers, consistent reads without locks. Implementation: each write creates new version with timestamp, reads select appropriate version, garbage collection removes old versions. Used by: PostgreSQL, MySQL InnoDB, CockroachDB, Spanner.",
    difficulty: "Medium"
  },
  {
    question: "What is a Merkle tree and how is it used for consistency?",
    answer: "Merkle tree is a hash tree where each leaf is data hash, and each non-leaf is hash of its children. Used for anti-entropy: replicas maintain Merkle trees of their data, compare root hashes to detect differences, traverse tree to find divergent branches, sync only differing data. Benefits: efficient detection of inconsistencies, minimal data transfer for repair. Used in Cassandra, DynamoDB.",
    difficulty: "Hard"
  },
  {
    question: "What is the difference between read-your-writes and monotonic reads consistency?",
    answer: "Read-your-writes: A user always sees their own writes, regardless of which replica they connect to. Useful for profile updates, form submissions. Monotonic reads: Once you read a value, subsequent reads never return older values. Prevents seeing balance go backwards. Both are weaker than strong consistency but provide useful guarantees for specific use cases.",
    difficulty: "Medium"
  },
  {
    question: "How does DynamoDB handle CAP trade-offs?",
    answer: "DynamoDB is AP by default with tunable consistency. Default: eventually consistent reads (high availability, low latency). Optional: strongly consistent reads (reads from leader, higher latency). Write consistency: configurable via DynamoDB Transactions for ACID. PACELC: PA/EL. Conflict resolution: last-writer-wins or application-level. Good for: variable consistency needs within same application.",
    difficulty: "Medium"
  },
  {
    question: "How does Cassandra handle CAP trade-offs?",
    answer: "Cassandra is AP with tunable consistency via quorum settings. Consistency levels: ONE (fast, eventual), QUORUM (W+R>N, strong), ALL (all replicas). No single leader - peer-to-peer architecture. Handles conflicts via timestamps (LWW) or lightweight transactions. PACELC: PA/EL. Write path: commit log + memtable, async replication. Good for: write-heavy, multi-datacenter deployments.",
    difficulty: "Hard"
  },
  {
    question: "How does Google Spanner achieve global strong consistency?",
    answer: "Spanner uses TrueTime API (GPS + atomic clocks) to assign globally meaningful timestamps, enabling external consistency without traditional consensus overhead. Uses Paxos for replication within regions. Commit wait: transactions wait for TrueTime uncertainty to pass before commit. Result: globally distributed, strongly consistent, SQL database. Trade-off: higher latency than AP systems.",
    difficulty: "Hard"
  },
  {
    question: "What is a split-brain problem and how do you handle it?",
    answer: "Split-brain occurs when network partition causes multiple nodes to think they're the leader, potentially causing conflicting writes. Solutions: 1) Quorum-based leader election (majority needed). 2) Fencing tokens - monotonically increasing IDs prevent stale leaders. 3) STONITH (Shoot The Other Node In The Head) - force shutdown of suspected duplicate leader. 4) Use consensus protocols (Raft, Paxos).",
    difficulty: "Hard"
  },
  {
    question: "What is the difference between CP and strong consistency?",
    answer: "CP describes CAP trade-off choice (consistency over availability during partition). Strong consistency describes the level/model of consistency (linearizability). A CP system provides strong consistency during partitions by refusing requests. AP systems can't provide strong consistency during partitions but may offer it during normal operation. CP is about trade-off; strong consistency is about guarantee level.",
    difficulty: "Medium"
  },
  {
    question: "How do you implement session consistency?",
    answer: "Session consistency ensures consistency within a user session. Implementation options: 1) Sticky sessions - route user to same replica. 2) Read-your-writes - track user's latest write timestamp, read from replica with that version. 3) Session tokens - include last-seen version in requests. 4) Write to primary, read from primary for session. Trade-off: simpler than strong consistency, better UX than pure eventual.",
    difficulty: "Medium"
  },
  {
    question: "What is CRDTs and how do they help with consistency?",
    answer: "CRDTs (Conflict-free Replicated Data Types) are data structures that can be replicated across nodes and always converge to consistent state without coordination. Types: counters, sets, registers, sequences. Operations are commutative, associative, idempotent. No conflicts to resolve - mathematically guaranteed convergence. Examples: G-Counter, LWW-Register, OR-Set. Used in: Riak, Redis CRDB.",
    difficulty: "Hard"
  },
  {
    question: "How would you design consistency for an e-commerce shopping cart?",
    answer: "Use AP with eventual consistency for cart operations, CP for checkout. Cart: always available, merge conflicts by union of items, tolerate temporary inconsistencies. Implementation: store cart in session/cookie locally, async sync to backend. Checkout: switch to strong consistency, verify inventory (CP), process payment (strong + distributed transaction). Hybrid approach balances UX with correctness.",
    difficulty: "Medium"
  },
  {
    question: "What questions should you ask when choosing consistency model?",
    answer: "Key questions: 1) What happens if users see stale data? (Minor → AP, Significant → CP). 2) What happens if unavailable? (Lost revenue → AP, Wrong data worse → CP). 3) Is it truly distributed? (Single DC → CA possible, Multi-region → CP or AP). 4) Read/write ratio? 5) Can different data have different consistency? Consider tiered approach: critical data strong, others eventual.",
    difficulty: "Medium"
  },
  {
    question: "What is the Saga pattern and how does it relate to consistency?",
    answer: "Saga is a pattern for distributed transactions without distributed locks. Instead of 2PC: execute local transactions in sequence, publish events, other services react, compensating transactions on failure. Provides eventual consistency across services. Types: Choreography (events) or Orchestration (central coordinator). Trade-off: no strong consistency but better availability and scalability than 2PC.",
    difficulty: "Hard"
  }
];

export default questions;
