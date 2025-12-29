# Week 3 Comprehensive Quiz: Database Systems & Data Management

## Instructions
- Total Questions: 25
- Time Limit: 45 minutes
- Passing Score: 70% (18 correct)
- This quiz covers all topics from Week 3

---

## Section A: SQL Databases (5 questions)

### Question 1
**Which normal form eliminates transitive dependencies?**

A) First Normal Form (1NF)
B) Second Normal Form (2NF)
C) Third Normal Form (3NF)
D) Boyce-Codd Normal Form (BCNF)

<details>
<summary>Answer</summary>
C) Third Normal Form (3NF)

Explanation: 3NF eliminates transitive dependencies where a non-key attribute depends on another non-key attribute.
</details>

---

### Question 2
**What type of JOIN returns all records from the left table and matched records from the right table?**

A) INNER JOIN
B) LEFT JOIN
C) RIGHT JOIN
D) FULL OUTER JOIN

<details>
<summary>Answer</summary>
B) LEFT JOIN

Explanation: LEFT JOIN returns all records from the left table regardless of matches, and matching records from the right table (NULL for non-matches).
</details>

---

### Question 3
**When should you consider denormalization?**

A) When you have too many tables
B) When read performance is critical and data is read-heavy
C) When you want to reduce storage costs
D) When you have many insert operations

<details>
<summary>Answer</summary>
B) When read performance is critical and data is read-heavy

Explanation: Denormalization trades storage space and write complexity for improved read performance by reducing the need for joins.
</details>

---

### Question 4
**What is the purpose of a foreign key constraint?**

A) To speed up queries
B) To ensure referential integrity between tables
C) To create indexes automatically
D) To allow NULL values

<details>
<summary>Answer</summary>
B) To ensure referential integrity between tables

Explanation: Foreign key constraints ensure that relationships between tables remain valid by preventing orphaned records.
</details>

---

### Question 5
**Which SQL clause is used to filter groups after GROUP BY?**

A) WHERE
B) HAVING
C) FILTER
D) GROUP FILTER

<details>
<summary>Answer</summary>
B) HAVING

Explanation: HAVING filters groups after aggregation, while WHERE filters rows before grouping.
</details>

---

## Section B: NoSQL Databases (5 questions)

### Question 6
**Which NoSQL database type is best suited for storing social network relationships?**

A) Document store (MongoDB)
B) Key-Value store (Redis)
C) Column-family store (Cassandra)
D) Graph database (Neo4j)

<details>
<summary>Answer</summary>
D) Graph database (Neo4j)

Explanation: Graph databases excel at storing and querying relationships between entities, making them ideal for social networks, recommendation engines, and fraud detection.
</details>

---

### Question 7
**What is the primary advantage of document databases like MongoDB?**

A) Strong schema enforcement
B) Complex JOIN operations
C) Flexible schema and nested data support
D) Better transaction support than SQL

<details>
<summary>Answer</summary>
C) Flexible schema and nested data support

Explanation: Document databases allow flexible schemas where each document can have different fields, and support nested/hierarchical data structures naturally.
</details>

---

### Question 8
**Which NoSQL type would you choose for a session cache with TTL support?**

A) MongoDB
B) Redis
C) Cassandra
D) Neo4j

<details>
<summary>Answer</summary>
B) Redis

Explanation: Redis is a key-value store with built-in TTL (Time-To-Live) support, making it ideal for session management and caching.
</details>

---

### Question 9
**Cassandra is optimized for which type of workload?**

A) Complex JOIN queries
B) High write throughput with time-series data
C) Small datasets with ACID transactions
D) Graph traversals

<details>
<summary>Answer</summary>
B) High write throughput with time-series data

Explanation: Cassandra is a column-family store designed for high write throughput, making it excellent for time-series data, logs, and IoT applications.
</details>

---

### Question 10
**In MongoDB, what is a "collection" equivalent to in SQL?**

A) Database
B) Table
C) Row
D) Column

<details>
<summary>Answer</summary>
B) Table

Explanation: In MongoDB, a collection is analogous to a table in SQL, while a document is like a row.
</details>

---

## Section C: Indexing & Query Optimization (5 questions)

### Question 11
**What is a B-tree index best suited for?**

A) Exact match lookups only
B) Range queries and equality comparisons
C) Full-text search
D) Spatial queries

<details>
<summary>Answer</summary>
B) Range queries and equality comparisons

Explanation: B-tree indexes maintain sorted data, making them efficient for both equality (=) and range (<, >, BETWEEN) operations.
</details>

---

### Question 12
**What is a covering index?**

A) An index that covers all tables in a database
B) An index that includes all columns needed by a query
C) An index that covers NULL values
D) An encrypted index for security

<details>
<summary>Answer</summary>
B) An index that includes all columns needed by a query

Explanation: A covering index contains all the columns required by a query, allowing the query to be satisfied entirely from the index without accessing the table.
</details>

---

### Question 13
**What does EXPLAIN ANALYZE show that EXPLAIN alone does not?**

A) Index usage
B) Actual execution time and row counts
C) Table structure
D) Query syntax errors

<details>
<summary>Answer</summary>
B) Actual execution time and row counts

Explanation: EXPLAIN shows the query plan, while EXPLAIN ANALYZE actually executes the query and shows real timing and row count statistics.
</details>

---

### Question 14
**When creating a composite index on (A, B, C), which queries can efficiently use this index?**

A) Queries filtering on B only
B) Queries filtering on C only
C) Queries filtering on A, or A and B, or A, B, and C
D) Any query filtering on any of A, B, or C

<details>
<summary>Answer</summary>
C) Queries filtering on A, or A and B, or A, B, and C

Explanation: Composite indexes follow the leftmost prefix rule - they can be used for queries that filter on the leftmost columns in order.
</details>

---

### Question 15
**What is the main disadvantage of having too many indexes?**

A) Queries become slower
B) Write operations become slower
C) Disk space is reduced
D) Read operations fail

<details>
<summary>Answer</summary>
B) Write operations become slower

Explanation: Each index must be updated when data is inserted, updated, or deleted, adding overhead to write operations.
</details>

---

## Section D: ACID & Transactions (5 questions)

### Question 16
**Which ACID property ensures that a transaction either fully completes or has no effect?**

A) Atomicity
B) Consistency
C) Isolation
D) Durability

<details>
<summary>Answer</summary>
A) Atomicity

Explanation: Atomicity ensures "all or nothing" - either all operations in a transaction succeed, or none of them do (rollback).
</details>

---

### Question 17
**What isolation level prevents dirty reads but allows non-repeatable reads?**

A) Read Uncommitted
B) Read Committed
C) Repeatable Read
D) Serializable

<details>
<summary>Answer</summary>
B) Read Committed

Explanation: Read Committed only reads committed data (preventing dirty reads) but allows the same query to return different results within a transaction (non-repeatable reads).
</details>

---

### Question 18
**What is MVCC (Multi-Version Concurrency Control)?**

A) A locking mechanism
B) A technique that maintains multiple versions of data for concurrent access
C) A backup strategy
D) A type of database index

<details>
<summary>Answer</summary>
B) A technique that maintains multiple versions of data for concurrent access

Explanation: MVCC keeps multiple versions of rows, allowing readers and writers to operate concurrently without blocking each other.
</details>

---

### Question 19
**In the Saga pattern for distributed transactions, what happens when a step fails?**

A) The entire system crashes
B) All previous steps are retried
C) Compensating transactions are executed to undo previous steps
D) The failure is ignored

<details>
<summary>Answer</summary>
C) Compensating transactions are executed to undo previous steps

Explanation: The Saga pattern handles failures by executing compensating transactions that logically undo the effects of completed steps.
</details>

---

### Question 20
**What type of anomaly occurs when a transaction reads data written by an uncommitted transaction?**

A) Phantom read
B) Non-repeatable read
C) Dirty read
D) Lost update

<details>
<summary>Answer</summary>
C) Dirty read

Explanation: A dirty read occurs when a transaction reads data that has been modified by another transaction but not yet committed.
</details>

---

## Section E: Database Replication (5 questions)

### Question 21
**What is the main advantage of master-slave replication?**

A) Write scalability
B) Automatic conflict resolution
C) Read scalability and redundancy
D) Lower latency for writes

<details>
<summary>Answer</summary>
C) Read scalability and redundancy

Explanation: Master-slave replication allows read queries to be distributed across multiple slaves, scaling read capacity while providing redundancy.
</details>

---

### Question 22
**In synchronous replication, when does the master acknowledge a write to the client?**

A) Immediately after writing to local disk
B) After at least one replica confirms the write
C) After all replicas confirm the write
D) Before writing to any disk

<details>
<summary>Answer</summary>
B) After at least one replica confirms the write

Explanation: In synchronous replication, the master waits for acknowledgment from replica(s) before confirming the write, ensuring data durability.
</details>

---

### Question 23
**What is replication lag?**

A) The time to set up replication
B) The delay between master write and replica visibility
C) The network bandwidth limit
D) The maximum number of replicas

<details>
<summary>Answer</summary>
B) The delay between master write and replica visibility

Explanation: Replication lag is the time difference between when a change occurs on the master and when it becomes visible on replicas.
</details>

---

### Question 24
**What does a CRDT guarantee?**

A) Synchronous updates
B) Conflict-free convergence without coordination
C) Single-master writes
D) Zero replication lag

<details>
<summary>Answer</summary>
B) Conflict-free convergence without coordination

Explanation: CRDTs (Conflict-free Replicated Data Types) are data structures that can be updated independently on any replica and automatically converge to the same state.
</details>

---

### Question 25
**What is split-brain in database replication?**

A) When the database runs out of memory
B) When multiple nodes believe they are the master
C) When replication stops working
D) When queries take too long

<details>
<summary>Answer</summary>
B) When multiple nodes believe they are the master

Explanation: Split-brain occurs during network partitions when nodes on different sides both think they are the master, potentially leading to conflicting writes.
</details>

---

## Scoring

| Score | Grade | Feedback |
|-------|-------|----------|
| 23-25 | A | Excellent! You've mastered Week 3 database concepts |
| 20-22 | B | Great job! Ready for Week 4 |
| 18-19 | C | Good work! Review weak areas |
| 15-17 | D | Review materials before Week 4 |
| Below 15 | F | Re-study Week 3 content |

---

## Answer Key

| Q | Answer | Q | Answer | Q | Answer | Q | Answer | Q | Answer |
|---|--------|---|--------|---|--------|---|--------|---|--------|
| 1 | C | 6 | D | 11 | B | 16 | A | 21 | C |
| 2 | B | 7 | C | 12 | B | 17 | B | 22 | B |
| 3 | B | 8 | B | 13 | B | 18 | B | 23 | B |
| 4 | B | 9 | B | 14 | C | 19 | C | 24 | B |
| 5 | B | 10 | B | 15 | B | 20 | C | 25 | B |
