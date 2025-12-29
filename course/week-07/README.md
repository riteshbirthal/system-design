# Week 7: Data Partitioning & Replication Strategies

## Week Overview
This week covers strategies for distributing data across multiple nodes for scalability and reliability, including sharding techniques, replication patterns, and handling data distribution challenges.

**Learning Objectives:**
- Understand data partitioning strategies
- Learn sharding patterns and their trade-offs
- Master replication strategies for high availability
- Handle cross-shard queries and transactions
- Design globally distributed data systems

---

## Daily Schedule

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | Data Partitioning Basics | Horizontal vs vertical, sharding strategies |
| Day 2 | Sharding Techniques | Range, hash, directory-based sharding |
| Day 3 | Consistent Hashing | Hash rings, virtual nodes, rebalancing |
| Day 4 | Replication Strategies | Master-slave, multi-master, chain replication |
| Day 5 | Handling Distributed Data | Cross-shard queries, distributed transactions |

---

## Day 1: Data Partitioning Basics

### Content Topics
- Why partition data?
- Horizontal vs vertical partitioning
- Partitioning criteria
- Partition key selection
- Hot spots and data skew
- Rebalancing partitions
- Partitioning and secondary indexes

### Partitioning Types
```
Vertical Partitioning (by columns):
┌─────────────────────┐    ┌──────────────┐   ┌──────────────┐
│ Users (all columns) │ → │ Users Basic  │ + │ Users Detail │
│ id,name,email,bio,  │    │ id,name,email│   │ id,bio,      │
│ preferences,settings│    └──────────────┘   │ preferences  │
└─────────────────────┘                       └──────────────┘

Horizontal Partitioning (by rows) - Sharding:
┌─────────────────────┐
│ Users (all rows)    │
│ 10 million records  │
└─────────────────────┘
           │
    ┌──────┴──────┬──────────┐
    ▼             ▼          ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Shard 1 │  │ Shard 2 │  │ Shard 3 │
│ A-H     │  │ I-P     │  │ Q-Z     │
└─────────┘  └─────────┘  └─────────┘
```

### Daily Assignment
- Design partition strategy for user data
- Identify and mitigate potential hot spots

---

## Day 2: Sharding Techniques

### Content Topics
- Range-based sharding
- Hash-based sharding
- Directory-based sharding
- Geo-based sharding
- Choosing partition keys
- Composite sharding keys
- Shard management

### Sharding Strategies Comparison
```
Range-based:
Key Range 1-1000 → Shard 1
Key Range 1001-2000 → Shard 2
✓ Range queries efficient
✗ Can lead to hot spots

Hash-based:
Hash(key) % N → Shard number
✓ Even distribution
✗ Range queries require all shards

Directory-based:
Lookup table maps key → Shard
✓ Flexible mapping
✗ Directory is single point of failure

Geo-based:
Location → Regional shard
✓ Data locality
✗ Uneven distribution possible
```

### Common Partition Keys
| Application | Partition Key | Reason |
|-------------|---------------|--------|
| Social media | User ID | User-centric queries |
| E-commerce | Order ID | Order isolation |
| Multi-tenant | Tenant ID | Tenant isolation |
| Time-series | Timestamp | Time-range queries |

### Daily Assignment
- Design sharding for multi-tenant SaaS
- Compare sharding strategies for different workloads

---

## Day 3: Consistent Hashing

### Content Topics
- Problems with simple hash partitioning
- Consistent hashing concept
- Hash ring visualization
- Virtual nodes (vnodes)
- Handling node additions/removals
- Load balancing with vnodes
- Implementations (Cassandra, DynamoDB)

### Consistent Hashing
```
Simple Hashing Problem:
Hash(key) % 3 servers
If server count changes to 4:
Hash(key) % 4 → Almost all keys remap!

Consistent Hashing Solution:
      ┌─────────────────────────┐
      │      Hash Ring (0-2^32) │
      │    ┌───┐                │
      │   N1   N2               │
      │  ┌─┘   └─┐              │
      │ ─┘       └─             │
      │ │    K1   │             │
      │ │         │             │
      │ ─┐       ┌─             │
      │  └─┐   ┌─┘              │
      │   N4   N3               │
      │    └───┘                │
      └─────────────────────────┘

Key K1 → walks clockwise → first node encountered (N2)

Add N5:
Only keys between N4 and N5 need to move!
```

### Virtual Nodes
```
Without vnodes: Uneven distribution
Node A: 40% data
Node B: 35% data
Node C: 25% data

With vnodes (100 per physical node):
Node A: A-1, A-2, A-3, ..., A-100
Spread across ring for even distribution
Each physical node: ~33% data
```

### Daily Assignment
- Implement consistent hashing with virtual nodes
- Simulate node addition/removal scenarios

---

## Day 4: Replication Strategies

### Content Topics
- Why replication?
- Single-leader (master-slave) replication
- Multi-leader replication
- Leaderless replication
- Synchronous vs asynchronous replication
- Handling replication lag
- Failover and leader election
- Read replicas and write scaling

### Replication Architectures
```
Single-Leader (Master-Slave):
┌────────┐     ┌─────────┐
│ Leader │────▶│Follower1│ (async)
│(writes)│     └─────────┘
└────────┘     ┌─────────┐
     │────────▶│Follower2│
               └─────────┘

Multi-Leader:
┌────────┐ ◀───────▶ ┌────────┐
│Leader 1│           │Leader 2│
│ (DC 1) │           │ (DC 2) │
└────────┘           └────────┘

Leaderless (Dynamo-style):
Client writes to multiple nodes
Quorum: W + R > N
     ┌───────┐
     │Node 1 │
     └───┬───┘
Client──┼──────┐
     ┌──▼──┐   │
     │Node 2│   │
     └─────┘   │
     ┌─────┐   │
     │Node 3│◀──┘
     └─────┘
```

### Replication Trade-offs
| Strategy | Consistency | Availability | Complexity |
|----------|-------------|--------------|------------|
| Single-leader sync | Strong | Lower | Low |
| Single-leader async | Eventual | Higher | Low |
| Multi-leader | Eventual | High | High |
| Leaderless | Tunable | High | Medium |

### Daily Assignment
- Design replication for global service
- Handle leader failover scenario

---

## Day 5: Handling Distributed Data

### Content Topics
- Cross-shard queries
- Scatter-gather pattern
- Distributed joins
- Global secondary indexes
- Distributed transactions
- Two-phase commit (2PC)
- Saga pattern
- Data locality optimization

### Cross-Shard Query Patterns
```
Scatter-Gather:
┌──────────┐
│  Query   │
│  Router  │
└────┬─────┘
     │ Scatter
┌────┴────┬────────┐
▼         ▼        ▼
Shard1  Shard2  Shard3
│         │        │
└────┬────┴────┬───┘
     │ Gather  │
     ▼         ▼
  ┌────────────┐
  │  Aggregate │
  │   Results  │
  └────────────┘
```

### Global Secondary Index
```
Local Index (per shard):
Each shard indexes its own data
✓ Fast writes
✗ Queries need all shards

Global Index (separate service):
Single index for all shards
✗ Slower writes (update index)
✓ Fast reads (single lookup)
```

### Daily Assignment
- Design cross-shard aggregation system
- Implement distributed transaction with saga

---

## Weekly Resources

### Required Reading
- "Designing Data-Intensive Applications" - Chapters 5, 6
- DynamoDB Paper
- Cassandra Architecture Guide

### Video Resources
- ByteByteGo: Consistent Hashing
- Martin Kleppmann: Replication
- AWS re:Invent: DynamoDB Deep Dive

### Tools to Explore
- Apache Cassandra
- CockroachDB
- Vitess (MySQL sharding)

---

## Weekly Quiz
- 25 questions on partitioning and replication
- Strategy selection scenarios
- Problem-solving for data distribution

## Weekly Project
**Design a Globally Distributed Database**
- Multi-region deployment
- Sharding strategy
- Replication approach
- Consistency model
- Cross-region queries
- Failover handling
