const notes = `
# Partitioning, Sharding & Replication

## Introduction to Data Partitioning

**Definition:** Partitioning divides a large dataset into smaller, manageable pieces called partitions, each stored and processed independently.

### Why Partition Data
- **Scalability**: Distribute data across multiple servers
- **Performance**: Reduce data scanned per query
- **Manageability**: Easier backup, restore, maintenance
- **Availability**: Failure affects only subset of data

### Partitioning vs Sharding
- **Partitioning**: Dividing data (general concept)
- **Sharding**: Horizontal partitioning across multiple servers
- Often used interchangeably in distributed systems

### Key Concepts
- **Partition Key**: Column(s) determining partition placement
- **Partition Function**: Logic determining which partition holds data

---

## Horizontal vs Vertical Partitioning

### Horizontal Partitioning (Sharding)
Divide rows across partitions based on partition key.

\`\`\`
Original Table:
| id | name  | city |
|----|-------|------|
| 1  | Alice | NYC  |
| 2  | Bob   | LA   |
| 3  | Carol | NYC  |

Sharded by city:
Shard NYC: Alice, Carol
Shard LA: Bob
\`\`\`

**Characteristics:**
- Same schema across all partitions
- Enables horizontal scaling
- Common in distributed databases

### Vertical Partitioning
Divide columns into different tables/partitions.

\`\`\`
Original: | id | name | email | avatar | bio |

Split into:
Core:    | id | name | email |
Profile: | id | avatar | bio |
\`\`\`

**Use Cases:**
- Separate frequently vs rarely accessed columns
- Move large BLOBs to separate storage
- Different access patterns for column groups

### Functional Partitioning
Partition by business function (microservices pattern).

---

## Sharding Strategies

### 1. Hash-Based Sharding
\`\`\`python
shard_id = hash(partition_key) % num_shards
\`\`\`

| Pros | Cons |
|------|------|
| Even distribution | Adding shards requires redistribution |
| Simple to implement | Range queries inefficient |
| Deterministic | No data locality |

### 2. Range-Based Sharding
\`\`\`
Shard 1: user_id 1-1,000,000
Shard 2: user_id 1,000,001-2,000,000
\`\`\`

| Pros | Cons |
|------|------|
| Efficient range queries | Hotspots (recent data) |
| Natural for time-series | Uneven distribution |
| Easy to understand | Manual rebalancing |

### 3. Directory-Based Sharding
Lookup table maps keys to shards.

| Pros | Cons |
|------|------|
| Flexible placement | Directory is SPOF |
| Easy to change mappings | Extra lookup latency |

### 4. Geographic Sharding
\`\`\`
Shard US: Users in USA
Shard EU: Users in Europe
Shard APAC: Users in Asia
\`\`\`
Data locality and compliance benefits.

### 5. Tenant-Based Sharding
Each tenant/customer on separate shard. Provides isolation.

---

## Consistent Hashing

### Problem with Simple Hashing
When nodes change: \`shard = hash(key) % N\`
Almost ALL keys rehash - massive data movement.

### Consistent Hashing Solution
\`\`\`
Hash Ring (0 to 2^32):
    Node A ─── Node B
      │           │
    Node D ─── Node C

Key placement: hash(key) → ring position
Key goes to first node clockwise
\`\`\`

**Benefits:**
- Adding node: Only keys between new and next node move
- Removing node: Only that node's keys move
- Average: K/N keys move (vs all keys in simple hash)

### Virtual Nodes
Each physical node → multiple virtual nodes spread around ring.
Better distribution, smoother rebalancing.

\`\`\`python
class ConsistentHash:
    def __init__(self, nodes, virtual_nodes=100):
        self.ring = {}
        for node in nodes:
            for i in range(virtual_nodes):
                key = hash(f"{node}:{i}")
                self.ring[key] = node
    
    def get_node(self, key):
        h = hash(key)
        # Find next node clockwise
        return self.ring[next_clockwise(h)]
\`\`\`

---

## Replication Fundamentals

### Why Replicate
- **Availability**: Data available if node fails
- **Durability**: Data not lost on failure
- **Read Scaling**: Distribute read load
- **Geographic**: Serve from nearest location

### Replication Factor
- RF=1: No redundancy
- RF=3: Three copies (can lose 2 nodes)
- Higher RF: More durability, more storage

### Replication Topologies

**Leader-Follower (Primary-Replica):**
\`\`\`
[Leader] ← Writes
    │
    ├── [Follower 1] ← Reads
    ├── [Follower 2] ← Reads
    └── [Follower 3] ← Reads
\`\`\`

**Multi-Leader:**
\`\`\`
[Leader 1] ←→ [Leader 2]
Leaders sync, conflict resolution needed
\`\`\`

**Leaderless:**
\`\`\`
[Node 1] ←→ [Node 2] ←→ [Node 3]
Any node accepts reads/writes, quorum-based
\`\`\`

---

## Replication Strategies

### 1. Synchronous Replication
Write confirmed only after replicas acknowledge.
\`\`\`
Client → Leader → Replicate → All ACK → Confirm
\`\`\`
**Pros:** Strong consistency, no data loss
**Cons:** Higher latency, availability affected by slow replica

### 2. Asynchronous Replication
Write confirmed immediately, replicate in background.
\`\`\`
Client → Leader → Confirm → (Async) Replicate
\`\`\`
**Pros:** Low latency, good for geo-distribution
**Cons:** Potential data loss, eventual consistency

### 3. Semi-Synchronous
Wait for at least one replica before confirming.

### 4. Quorum-Based
- N = Total replicas
- W = Write quorum
- R = Read quorum
- Strong consistency: W + R > N

\`\`\`
N=3, W=2, R=2: Strong consistency (2+2 > 3)
N=3, W=1, R=1: Eventual consistency
\`\`\`

---

## Partition Management

### Rebalancing
When nodes added/removed, data must redistribute.

**Strategies:**
1. **Fixed partitions**: Create more partitions than nodes, move whole partitions
2. **Dynamic partitions**: Split/merge as needed
3. **Consistent hashing**: Minimize redistribution

### Hotspot Handling
Problem: Some partitions receive disproportionate traffic.

**Solutions:**
1. Add random suffix to hot keys
2. Split hot partitions
3. Cache hot data
4. Application-level sharding

\`\`\`python
def get_shard_key(user_id):
    if is_celebrity(user_id):
        bucket = random.randint(0, 9)
        return f"{user_id}_{bucket}"
    return user_id
\`\`\`

### Cross-Shard Operations
Challenges: Joins, transactions, aggregations across shards.

**Solutions:**
- Denormalize to avoid joins
- Saga pattern for distributed transactions
- Scatter-gather for aggregations
- Application-level joins

---

## Database Implementations

| Database | Sharding | Replication |
|----------|----------|-------------|
| MongoDB | Built-in (chunks) | Replica sets |
| Cassandra | Consistent hash | Tunable RF |
| MySQL | Manual/Vitess | Master-slave |
| PostgreSQL | Citus extension | Streaming |
| DynamoDB | Auto (hash) | Multi-AZ |
| CockroachDB | Auto range | Raft consensus |

---

## Best Practices

### 1. Choose Partition Key Wisely
- High cardinality (many unique values)
- Even distribution
- Matches query patterns
- Avoid hotspots

### 2. Plan for Growth
- Start with more partitions than needed
- Use consistent hashing
- Automate rebalancing

### 3. Monitor Partition Health
- Data distribution per partition
- Query latency per partition
- Hot partition detection

### 4. Handle Failures
- Replication for availability
- Failover automation
- Data recovery procedures

### 5. Minimize Cross-Shard Operations
- Co-locate related data
- Denormalize when appropriate
- Design for partition key access

---

## Quick Reference

### Sharding Strategy Selection
| Scenario | Strategy |
|----------|----------|
| Even distribution needed | Hash-based |
| Range queries important | Range-based |
| Flexible placement | Directory-based |
| Global users, compliance | Geographic |
| Multi-tenant SaaS | Tenant-based |

### Replication Strategy Selection
| Need | Strategy |
|------|----------|
| Strong consistency | Synchronous |
| Low latency | Asynchronous |
| Balance | Semi-synchronous |
| Tunable | Quorum-based |
`;

export default notes;
