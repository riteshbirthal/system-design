# Week 6: CAP Theorem & Consistency Patterns

## Week Overview
This week explores the fundamental trade-offs in distributed systems, focusing on the CAP theorem, consistency models, and how to design systems that balance these concerns.

**Learning Objectives:**
- Understand the CAP theorem and its implications
- Learn different consistency models
- Understand the PACELC theorem
- Learn about consensus algorithms
- Design systems with appropriate consistency guarantees

---

## Daily Schedule

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | CAP Theorem | Consistency, Availability, Partition Tolerance |
| Day 2 | Consistency Models | Strong, Eventual, Causal consistency |
| Day 3 | ACID vs BASE | Transaction models comparison |
| Day 4 | Consensus Algorithms | Paxos, Raft, leader election |
| Day 5 | Designing for Consistency | Practical patterns and trade-offs |

---

## Day 1: CAP Theorem

### Content Topics
- What is the CAP theorem?
- Consistency in distributed systems
- Availability definition
- Partition tolerance
- Why you can only pick 2
- CA, CP, AP systems
- CAP theorem misconceptions

### CAP Triangle
```
                    Consistency
                        /\
                       /  \
                      /    \
                     /  CA  \
                    /   ↑    \
                   /  Cannot  \
                  /   exist    \
                 /    in DS     \
                /________________\
         Availability ←──→ Partition Tolerance
              AP              CP
```

### System Classification
| Type | Description | Examples |
|------|-------------|----------|
| CP | Consistent + Partition Tolerant | HBase, MongoDB (strong), Redis Cluster |
| AP | Available + Partition Tolerant | Cassandra, DynamoDB, CouchDB |
| CA | Consistent + Available | Single-node RDBMS (not distributed) |

### Daily Assignment
- Classify popular databases by CAP properties
- Design system with explicit CAP trade-off decisions

---

## Day 2: Consistency Models

### Content Topics
- What is consistency?
- Strong consistency
- Eventual consistency
- Causal consistency
- Read-your-writes consistency
- Monotonic reads
- Linearizability
- Sequential consistency

### Consistency Spectrum
```
Strongest ←─────────────────────────────→ Weakest

Linearizable → Sequential → Causal → Eventual
   │              │            │          │
   │              │            │          └─ Eventually same
   │              │            └─ Causally related ops ordered
   │              └─ Total order across all operations
   └─ Real-time ordering

Performance: Low ←───────────────────────→ High
```

### Consistency Models Comparison
| Model | Guarantee | Latency | Use Case |
|-------|-----------|---------|----------|
| Strong | Latest data always | High | Banking |
| Eventual | Will converge | Low | Social media |
| Causal | Cause-effect preserved | Medium | Collaborative apps |
| Read-your-writes | See own writes | Medium | User sessions |

### Daily Assignment
- Design system with different consistency for different data
- Implement read-your-writes consistency pattern

---

## Day 3: ACID vs BASE

### Content Topics
- ACID properties deep dive
  - Atomicity
  - Consistency (different from CAP)
  - Isolation
  - Durability
- BASE properties
  - Basically Available
  - Soft state
  - Eventual consistency
- When to use ACID vs BASE
- Hybrid approaches

### ACID vs BASE Comparison
```
ACID                          BASE
┌─────────────────────┐      ┌─────────────────────┐
│ Strong consistency  │      │ Weak consistency    │
│ Isolation guaranteed│      │ Soft state          │
│ Focus on commit     │      │ Focus on availability│
│ Pessimistic         │      │ Optimistic          │
│ Complex transactions│      │ Simple operations   │
└─────────────────────┘      └─────────────────────┘

Use Cases:
ACID: Banking, inventory, reservations
BASE: Social feeds, analytics, caching
```

### Transaction Isolation Levels
| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|-------|------------|---------------------|--------------|
| Read Uncommitted | Yes | Yes | Yes |
| Read Committed | No | Yes | Yes |
| Repeatable Read | No | No | Yes |
| Serializable | No | No | No |

### Daily Assignment
- Compare ACID vs BASE for different scenarios
- Design transaction isolation for multi-tenant system

---

## Day 4: Consensus Algorithms

### Content Topics
- What is consensus?
- The need for consensus in distributed systems
- Paxos algorithm overview
- Raft algorithm (easier to understand)
- Leader election
- Log replication
- Split-brain problem
- Quorum-based systems

### Raft Algorithm Overview
```
States: Follower → Candidate → Leader

Leader Election:
1. Follower timeout
2. Become candidate, request votes
3. If majority votes, become leader
4. Send heartbeats to maintain leadership

Log Replication:
1. Client sends command to leader
2. Leader appends to log
3. Leader replicates to followers
4. Once majority confirms, commit
5. Apply to state machine
```

### Quorum Systems
```
Write Quorum + Read Quorum > Total Nodes

Example: 5 nodes
- Write to 3 nodes (W=3)
- Read from 3 nodes (R=3)
- W + R > N ensures overlap
- At least one node has latest value
```

### Daily Assignment
- Implement simple leader election
- Design quorum-based data store

---

## Day 5: Designing for Consistency

### Content Topics
- Choosing the right consistency model
- Conflict resolution strategies
  - Last-write-wins (LWW)
  - Vector clocks
  - CRDTs
- Multi-region consistency
- Consistency in microservices
- Saga pattern for distributed transactions
- Two-phase commit (2PC)

### Conflict Resolution Strategies
```
Last-Write-Wins:
Node A: Write X=1 at t=10
Node B: Write X=2 at t=11
Result: X=2 (latest timestamp wins)

Vector Clocks:
Node A: {A:1} X=1
Node B: {B:1} X=2
Conflict detected! Need resolution

CRDTs (Conflict-free Replicated Data Types):
Designed to merge automatically
Example: G-Counter (grow-only counter)
Node A: {A:5, B:0}
Node B: {A:0, B:3}
Merge: {A:5, B:3} = Total: 8
```

### Saga Pattern
```
Order Saga:
1. Create Order ────────────────────────▶ Order Service
2. Reserve Inventory ──────────────────▶ Inventory Service
3. Process Payment ────────────────────▶ Payment Service
4. Ship Order ─────────────────────────▶ Shipping Service

Compensation (rollback):
4. Cancel Shipping
3. Refund Payment
2. Release Inventory
1. Cancel Order
```

### Daily Assignment
- Implement saga pattern for order processing
- Design multi-region consistent data store

---

## Weekly Resources

### Required Reading
- "Designing Data-Intensive Applications" - Chapters 5, 7, 9
- Raft Paper: "In Search of an Understandable Consensus Algorithm"
- Martin Kleppmann: CAP Theorem articles

### Video Resources
- Martin Kleppmann: Distributed Systems lectures
- ByteByteGo: CAP Theorem Explained
- Raft Visualization: http://thesecretlivesofdata.com/raft/

### Tools to Explore
- etcd (uses Raft)
- Apache ZooKeeper
- Consul

---

## Weekly Quiz
- 25 questions on CAP and consistency
- Trade-off analysis scenarios
- Algorithm understanding

## Weekly Project
**Design a Distributed Key-Value Store**
- Support for multiple consistency levels
- Leader election with Raft
- Conflict resolution strategy
- Multi-region deployment
- Partition handling
