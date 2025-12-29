# Day 5 Quiz: Database Replication

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**In master-slave replication, which node handles all write operations?**

A) Any slave node
B) The master node only
C) Both master and slave nodes
D) A dedicated write node separate from master

<details>
<summary>Answer</summary>
B) The master node only

Explanation: In master-slave (primary-replica) replication, the master is the single source of truth for all write operations. Slaves only replicate data from the master and handle read operations.
</details>

---

### Question 2
**What is the main advantage of synchronous replication over asynchronous replication?**

A) Lower write latency
B) Higher availability
C) Zero data loss on failover
D) Simpler implementation

<details>
<summary>Answer</summary>
C) Zero data loss on failover

Explanation: Synchronous replication ensures that data is confirmed written to at least one replica before acknowledging the write to the client, guaranteeing no data loss if the master fails.
</details>

---

### Question 3
**What is replication lag?**

A) The time it takes to set up replication
B) The delay between a write on master and its visibility on replicas
C) The network latency between servers
D) The time to failover to a replica

<details>
<summary>Answer</summary>
B) The delay between a write on master and its visibility on replicas

Explanation: Replication lag is the time difference between when a write occurs on the master and when that change becomes visible on the replica servers.
</details>

---

### Question 4
**Which strategy ensures a user always sees their own writes immediately after making them?**

A) Eventual consistency
B) Read-your-writes consistency
C) Last-write-wins
D) Monotonic reads

<details>
<summary>Answer</summary>
B) Read-your-writes consistency

Explanation: Read-your-writes consistency (also called read-after-write consistency) ensures that after a user makes a write, they will always see that write in subsequent reads.
</details>

---

### Question 5
**What is a CRDT?**

A) A database replication protocol
B) A conflict-free replicated data type that automatically merges updates
C) A tool for monitoring replication lag
D) A type of database index

<details>
<summary>Answer</summary>
B) A conflict-free replicated data type that automatically merges updates

Explanation: CRDTs (Conflict-free Replicated Data Types) are data structures designed to be replicated across multiple nodes where updates can be applied independently and concurrently without coordination, and always converge to the same state.
</details>

---

### Question 6
**In the Last-Write-Wins (LWW) conflict resolution strategy, what determines which write survives?**

A) The write with more data
B) The write with the higher timestamp
C) The write from the primary master
D) Random selection

<details>
<summary>Answer</summary>
B) The write with the higher timestamp

Explanation: Last-Write-Wins uses timestamps to determine which concurrent write should take precedence. The write with the higher (most recent) timestamp is kept, and others are discarded.
</details>

---

### Question 7
**What is the primary risk of asynchronous replication?**

A) Higher write latency
B) Reduced availability
C) Potential data loss during failover
D) More complex setup

<details>
<summary>Answer</summary>
C) Potential data loss during failover

Explanation: With asynchronous replication, the master doesn't wait for replicas to confirm writes. If the master fails before replicas receive the latest changes, those changes can be lost.
</details>

---

### Question 8
**What is split-brain in database replication?**

A) When the database runs out of memory
B) When multiple nodes believe they are the master simultaneously
C) When replication lag exceeds a threshold
D) When a query is too complex to execute

<details>
<summary>Answer</summary>
B) When multiple nodes believe they are the master simultaneously

Explanation: Split-brain occurs during network partitions when nodes on different sides of the partition both think they are the master, potentially accepting conflicting writes.
</details>

---

### Question 9
**Which replication topology allows write operations on multiple nodes?**

A) Master-slave replication
B) Cascading replication
C) Multi-master replication
D) Single-node replication

<details>
<summary>Answer</summary>
C) Multi-master replication

Explanation: Multi-master (also called multi-primary or active-active) replication allows write operations on any node in the cluster, unlike master-slave where only one node accepts writes.
</details>

---

### Question 10
**What does a G-Counter CRDT support?**

A) Any increment or decrement operations
B) Only increment operations (grow-only)
C) Only decrement operations
D) String concatenation operations

<details>
<summary>Answer</summary>
B) Only increment operations (grow-only)

Explanation: A G-Counter (Grow-only Counter) is a CRDT that only supports increment operations. It maintains a counter per node and the total value is the sum of all node counters. This design allows conflict-free merging.
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! You've mastered database replication concepts
- 7-8 correct: Good understanding, review conflict resolution
- 5-6 correct: Review the material, focus on replication topologies
- Below 5: Re-read Day 5 content thoroughly before proceeding
