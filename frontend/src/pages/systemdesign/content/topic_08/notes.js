const notes = `
# CAP Theorem & Consistency Models

## Introduction to CAP Theorem

**Definition:** The CAP theorem states that a distributed data store cannot simultaneously provide more than two of three guarantees: Consistency, Availability, and Partition Tolerance.

### Historical Context
- Proposed by Eric Brewer in 2000
- Formally proven by Gilbert and Lynch in 2002
- Foundational principle for distributed systems design

### Why CAP Matters
- Guides architectural decisions
- Helps understand database trade-offs
- Informs choices during network partitions
- Essential for system design interviews

### Key Insight
Network partitions are inevitable in distributed systems. When a partition occurs, you must choose between maintaining consistency or availability.

\`\`\`
During Normal Operation:
  All three properties (C, A, P) can be maintained

During Network Partition:
  Must choose between:
  - Consistency: Refuse requests to ensure data correctness
  - Availability: Respond to all requests, possibly with stale data
\`\`\`

---

## The Three Properties Explained

### 1. Consistency (C)

Every read receives the most recent write or an error. All nodes see the same data at the same time.

**Characteristics:**
- Linearizability: Operations appear instantaneous
- Single system image: All clients see identical data
- No stale reads

**Example:**
\`\`\`
Client A writes: balance = $100
Client B reads: must see $100 (not old value)
If cannot guarantee → return error rather than stale data
\`\`\`

**When Critical:** Financial transactions, inventory, booking systems, authentication

### 2. Availability (A)

Every request receives a non-error response, regardless of node state. System continues to operate.

**Characteristics:**
- No request goes unanswered
- May return stale data rather than no data
- System remains operational during failures

**Availability Levels:**
| Level | Downtime/Year |
|-------|---------------|
| 99% | 3.65 days |
| 99.9% | 8.77 hours |
| 99.99% | 52.6 minutes |
| 99.999% | 5.26 minutes |

**When Critical:** E-commerce, social media, content delivery, search engines

### 3. Partition Tolerance (P)

System continues to operate despite network failures between nodes.

**Characteristics:**
- Handles network splits
- Survives message loss
- Essential for distributed systems

**Reality:** Network partitions WILL occur. The real choice is usually between CP and AP.

---

## CAP Trade-offs and Combinations

### CP Systems (Consistency + Partition Tolerance)

Choose consistency over availability during partitions.

**Behavior:**
- Rejects requests that cannot be guaranteed consistent
- May timeout or return errors
- Waits for partition to heal

**Examples:** MongoDB, HBase, Redis, Zookeeper, Etcd, Spanner

**Use Cases:** Banking, inventory, booking systems, configuration management

\`\`\`
Bank transfer during partition:
CP System: "Transaction unavailable. Try again later."
(Rather than risk duplicate transfers)
\`\`\`

### AP Systems (Availability + Partition Tolerance)

Choose availability over consistency during partitions.

**Behavior:**
- Continues serving requests
- May return stale data
- Allows writes on both sides of partition
- Requires conflict resolution after healing

**Examples:** Cassandra, DynamoDB, CouchDB, Riak

**Use Cases:** Social media feeds, shopping carts, caching, analytics

\`\`\`
Social media likes during partition:
Server A: Receives +50 likes (shows 1050)
Server B: Receives +30 likes (shows 1030)
After healing: Merge → Total = 1080
\`\`\`

### CA Systems (Consistency + Availability)

No partition tolerance - requires perfect network.

**Reality:** CA systems are essentially single-node systems. Not practical for truly distributed environments.

**Examples:** Single-node PostgreSQL, MySQL, Oracle

---

## Consistency Models

### Consistency Spectrum
\`\`\`
Strong ←———————————————————————————→ Weak
Linearizable | Sequential | Causal | Eventual
\`\`\`

### 1. Linearizability (Strong Consistency)

Operations appear instantaneous in some global order. Once write completes, all reads return that value.

- Real-time ordering
- Highest consistency guarantee
- Significant latency overhead
- Implementation: Paxos, Raft, single-leader replication

### 2. Sequential Consistency

All processes see operations in same order, but may not match real-time order.

### 3. Causal Consistency

Causally related operations seen in same order by all. Concurrent operations may vary.

\`\`\`
Process A: Write X = 1
Process A: Write Y = 2 (causally dependent)
Process B: Must see X=1 before Y=2
\`\`\`

**Use Cases:** Comment threads, collaborative editing, messaging

### 4. Eventual Consistency

If no new updates, eventually all replicas converge. Temporary inconsistencies allowed.

- High availability, low latency
- Temporary divergence acceptable
- Convergence guaranteed given time

**Variations:**
- **Monotonic Read:** Won't see older values after reading newer
- **Read-Your-Writes:** Always see your own writes
- **Session Consistency:** Consistency within a session

---

## PACELC Extension

Addresses behavior during normal operation, not just during partitions.

\`\`\`
IF Partition (P):
  Choose Availability (A) or Consistency (C)
ELSE (E) - normal operation:
  Choose Latency (L) or Consistency (C)
\`\`\`

### System Classifications

| Type | Partition | Normal | Examples |
|------|-----------|--------|----------|
| PA/EL | Availability | Latency | Cassandra, DynamoDB |
| PC/EC | Consistency | Consistency | MongoDB, Spanner |
| PA/EC | Availability | Consistency | Yahoo PNUTS |

---

## Database Classifications by CAP

### CP Databases

| Database | Type | Notes |
|----------|------|-------|
| MongoDB | Document | Strong with majority write concern |
| HBase | Column-family | Built on HDFS |
| Spanner | Distributed SQL | TrueTime for global consistency |
| CockroachDB | Distributed SQL | Raft consensus |
| Zookeeper/Etcd | Config store | Consensus-based |

### AP Databases

| Database | Type | Notes |
|----------|------|-------|
| Cassandra | Wide-column | Tunable, eventual by default |
| DynamoDB | Managed NoSQL | Optional strong reads |
| CouchDB | Document | Multi-master, conflict resolution |
| Riak | Key-value | Vector clocks for conflicts |

---

## Consistency Patterns and Strategies

### 1. Quorum-Based Consistency

**Variables:**
- N = Total replicas
- W = Write quorum (nodes that must acknowledge)
- R = Read quorum (nodes that must respond)

**Strong Consistency Rule:** W + R > N

\`\`\`
N=3, W=2, R=2: Strong consistency (2+2 > 3)
N=3, W=1, R=1: Eventual consistency (1+1 ≤ 3)
\`\`\`

### 2. Read Repair

During reads, detect and repair inconsistencies between replicas.

\`\`\`
1. Read from multiple replicas
2. Compare values and timestamps
3. Update stale replicas with latest
4. Return latest to client
\`\`\`

### 3. Anti-Entropy (Merkle Trees)

Background process using Merkle trees to detect and sync divergent data between replicas.

### 4. Vector Clocks

Track causality and detect conflicts in distributed systems.

\`\`\`
VC1 = {A:2, B:1}
VC2 = {A:1, B:2}
Neither strictly greater → CONFLICT (concurrent events)
\`\`\`

### 5. Last-Write-Wins (LWW)

Simple conflict resolution using timestamps. Latest wins, older discarded.

**Issues:** Clock sync problems, may lose valid concurrent updates

### 6. MVCC (Multi-Version Concurrency Control)

Maintain multiple data versions. Readers see consistent snapshot without blocking writers.

**Used By:** PostgreSQL, MySQL InnoDB, CockroachDB, Spanner

---

## Practical Application Examples

### E-Commerce Shopping Cart
- **Choice:** AP with eventual consistency
- **Why:** Always available to add items, merge conflicts at checkout

### Banking Transactions
- **Choice:** CP with strong consistency
- **Why:** Balance accuracy critical, reject rather than risk errors

### Social Media Feed
- **Choice:** AP with eventual consistency
- **Why:** High throughput, staleness acceptable

### Configuration Management
- **Choice:** CP with linearizable consistency
- **Why:** Critical settings, wrong config worse than unavailability

### DNS System
- **Choice:** AP with eventual consistency
- **Why:** Extreme availability, TTL-based propagation

---

## Design Considerations

### Questions to Ask

1. **What happens if users see stale data?**
   - Minor inconvenience → AP
   - Significant problem → CP

2. **What happens if system is unavailable?**
   - Lost revenue → Consider AP
   - Better than wrong data → Accept CP

3. **Is the system truly distributed?**
   - Single DC → CA might work
   - Multi-region → Must choose CP or AP

### Hybrid Approaches

**Tiered Consistency:**
\`\`\`
Tier 1 (Critical): Strong - payments, auth, inventory
Tier 2 (Important): Session - preferences, cart
Tier 3 (Best Effort): Eventual - analytics, recommendations
\`\`\`

**Per-Operation:**
\`\`\`
Update password: Strong consistency
Read feed: Eventual consistency
Process payment: Strong + 2PC
\`\`\`

---

## Best Practices

1. **Understand requirements first** - Don't assume you need strong consistency

2. **Partition tolerance is not optional** - Networks fail; plan for it

3. **Use appropriate consistency per operation** - Critical path strong, best effort eventual

4. **Implement conflict resolution** - For AP systems, design resolution upfront

5. **Monitor replication lag** - Know how "eventual" your eventual is

6. **Test failure scenarios** - Chaos engineering, partition testing

7. **Use timeouts appropriately** - Tight = more unavailable; loose = possible staleness

8. **Design for idempotency** - Retries are common in distributed systems

9. **Document your consistency model** - Developers need to understand behavior

10. **Revisit decisions as requirements change** - Scale may require trade-offs

---

## Quick Reference

### Choose Strong Consistency When:
- Financial transactions
- Inventory (prevent overselling)
- Authentication/authorization
- Critical configuration
- Audit logging

### Choose Eventual Consistency When:
- Social media feeds
- Recommendations
- Search results
- Analytics/metrics
- Shopping cart (resolve at checkout)

### Choose Session Consistency When:
- User sees own updates
- Form submissions
- User preferences
- Multi-step workflows
`;

export default notes;
