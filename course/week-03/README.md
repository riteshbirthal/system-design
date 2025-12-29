# Week 3: Database Systems & Data Management

## Week Overview
This week provides comprehensive coverage of database systems, including SQL vs NoSQL databases, data modeling, indexing, and database optimization techniques.

**Learning Objectives:**
- Understand different types of databases and their use cases
- Learn database design and normalization
- Master indexing strategies for performance
- Understand ACID properties and transactions
- Learn about database replication strategies

---

## Daily Schedule

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | SQL Databases | Relational model, normalization, SQL queries |
| Day 2 | NoSQL Databases | Types (Document, Key-Value, Column, Graph) |
| Day 3 | Indexing & Query Optimization | B-trees, hash indexes, query planning |
| Day 4 | ACID & Transactions | Atomicity, Consistency, Isolation, Durability |
| Day 5 | Database Replication | Master-slave, multi-master, conflict resolution |

---

## Day 1: SQL Databases

### Content Topics
- Relational database model
- Database normalization (1NF, 2NF, 3NF, BCNF)
- Denormalization for performance
- SQL query fundamentals
- Joins (INNER, LEFT, RIGHT, FULL)
- Aggregate functions and GROUP BY
- Popular SQL databases (PostgreSQL, MySQL, SQL Server)

### Key Concepts
```sql
-- Normalization example
-- 1NF: Atomic values, no repeating groups
-- 2NF: No partial dependencies
-- 3NF: No transitive dependencies

-- Join example
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';
```

### Daily Assignment
- Design normalized schema for e-commerce database
- Write complex queries with joins and aggregations

---

## Day 2: NoSQL Databases

### Content Topics
- NoSQL categories and use cases
- Document stores (MongoDB, CouchDB)
- Key-Value stores (Redis, DynamoDB)
- Column-family stores (Cassandra, HBase)
- Graph databases (Neo4j, Amazon Neptune)
- SQL vs NoSQL decision framework

### Comparison Table
| Type | Use Case | Examples |
|------|----------|----------|
| Document | Flexible schemas, JSON data | MongoDB, CouchDB |
| Key-Value | Caching, sessions | Redis, DynamoDB |
| Column-family | Time-series, analytics | Cassandra, HBase |
| Graph | Social networks, recommendations | Neo4j, Neptune |

### Daily Assignment
- Design data model using MongoDB
- Implement Redis caching strategy

---

## Day 3: Indexing & Query Optimization

### Content Topics
- Why indexing matters
- B-tree indexes
- Hash indexes
- Composite indexes
- Covering indexes
- Index selection strategy
- Query execution plans (EXPLAIN)
- Query optimization techniques

### Key Concepts
```sql
-- Create index
CREATE INDEX idx_user_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_date 
ON orders(user_id, created_at DESC);

-- Analyze query plan
EXPLAIN ANALYZE 
SELECT * FROM users WHERE email = 'test@example.com';
```

### Daily Assignment
- Optimize slow queries using indexes
- Analyze and improve query execution plans

---

## Day 4: ACID & Transactions

### Content Topics
- ACID properties explained
  - Atomicity
  - Consistency
  - Isolation
  - Durability
- Transaction isolation levels
  - Read Uncommitted
  - Read Committed
  - Repeatable Read
  - Serializable
- Common anomalies (dirty reads, phantom reads)
- Distributed transactions (2PC, Saga)

### Key Concepts
```sql
-- Transaction example
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- or ROLLBACK on error
```

### Daily Assignment
- Design transaction handling for payment system
- Implement distributed saga pattern

---

## Day 5: Database Replication

### Content Topics
- Why replication?
- Master-slave replication
- Multi-master replication
- Synchronous vs asynchronous replication
- Replication lag
- Conflict resolution strategies
- Read replicas for scaling

### Architecture
```
Write-heavy: Master-Slave
┌────────┐     ┌─────────┐
│ Master │────▶│ Slave 1 │ (Reads)
│(Writes)│     └─────────┘
└────────┘     ┌─────────┐
     │────────▶│ Slave 2 │ (Reads)
               └─────────┘

Read-heavy with HA: Multi-Master
┌──────────┐   ┌──────────┐
│ Master 1 │◀─▶│ Master 2 │
└──────────┘   └──────────┘
```

### Daily Assignment
- Design replication strategy for global application
- Handle replication lag in application code

---

## Weekly Resources

### Required Reading
- "Designing Data-Intensive Applications" - Chapters 2-3, 5-7
- PostgreSQL Documentation: Indexes
- MongoDB Manual: Data Modeling

### Video Resources
- CMU Database Systems Course
- Hussein Nasser: Database Indexing
- ByteByteGo: SQL vs NoSQL

### Tools to Explore
- pgAdmin for PostgreSQL
- MongoDB Compass
- Redis CLI

---

## Weekly Quiz
- 25 questions on database concepts
- Schema design scenarios
- Query optimization problems

## Weekly Project
**Design a Social Media Database**
- Schema design for users, posts, comments, likes
- Indexing strategy
- Read/write optimization
- Replication plan for global scale
