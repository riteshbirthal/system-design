# Day 2: NoSQL Databases

## Learning Objectives
- Understand NoSQL database types and use cases
- Learn Document stores (MongoDB)
- Learn Key-Value stores (Redis)
- Learn Column-family stores (Cassandra)
- Learn Graph databases (Neo4j)
- Know when to choose SQL vs NoSQL

---

## 1. Introduction to NoSQL

### What is NoSQL?
NoSQL (Not Only SQL) databases are non-relational databases designed for specific data models and access patterns. They provide flexible schemas, horizontal scalability, and high performance for certain workloads.

### NoSQL Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                       NoSQL Databases                           │
├────────────────┬────────────────┬────────────────┬──────────────┤
│   Document     │   Key-Value    │ Column-Family  │    Graph     │
├────────────────┼────────────────┼────────────────┼──────────────┤
│   MongoDB      │     Redis      │   Cassandra    │    Neo4j     │
│   CouchDB      │   DynamoDB     │     HBase      │   Neptune    │
│   Firestore    │   Memcached    │   ScyllaDB     │   ArangoDB   │
└────────────────┴────────────────┴────────────────┴──────────────┘
```

### SQL vs NoSQL Comparison

| Aspect | SQL | NoSQL |
|--------|-----|-------|
| Schema | Fixed, predefined | Flexible, dynamic |
| Scaling | Vertical (scale up) | Horizontal (scale out) |
| Transactions | ACID | BASE (eventual consistency) |
| Joins | Native support | Limited or none |
| Data Model | Tables with rows | Various (document, key-value, etc.) |
| Query Language | SQL | Database-specific |
| Best For | Complex queries, transactions | High volume, flexible schema |

---

## 2. Document Stores

### Overview
Document stores organize data as documents (usually JSON or BSON). Each document can have a different structure, enabling flexibility.

### MongoDB Example

```javascript
// Document structure
{
    "_id": ObjectId("507f1f77bcf86cd799439011"),
    "name": "John Doe",
    "email": "john@example.com",
    "orders": [
        {
            "orderId": "ORD001",
            "total": 99.99,
            "items": [
                { "product": "Laptop", "quantity": 1 }
            ]
        }
    ],
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
    },
    "tags": ["premium", "tech"]
}
```

### MongoDB CRUD Operations

```javascript
// CREATE
db.users.insertOne({
    name: "John Doe",
    email: "john@example.com",
    age: 30
});

// READ
db.users.findOne({ email: "john@example.com" });
db.users.find({ age: { $gte: 25 } });

// UPDATE
db.users.updateOne(
    { email: "john@example.com" },
    { $set: { age: 31 }, $push: { tags: "updated" } }
);

// DELETE
db.users.deleteOne({ email: "john@example.com" });
```

### MongoDB Aggregation Pipeline

```javascript
db.orders.aggregate([
    { $match: { status: "completed" } },
    { $group: {
        _id: "$customerId",
        totalSpent: { $sum: "$total" },
        orderCount: { $sum: 1 }
    }},
    { $sort: { totalSpent: -1 } },
    { $limit: 10 }
]);
```

### When to Use Document Stores
- ✅ Flexible, evolving schemas
- ✅ Nested/hierarchical data
- ✅ Content management systems
- ✅ User profiles, catalogs
- ❌ Complex transactions across documents
- ❌ Heavy JOIN requirements

---

## 3. Key-Value Stores

### Overview
Simplest NoSQL type - stores data as key-value pairs. Extremely fast for lookups by key.

### Redis Example

```bash
# String operations
SET user:1:name "John Doe"
GET user:1:name
# Result: "John Doe"

SET session:abc123 "user_data" EX 3600  # Expires in 1 hour
GET session:abc123

# Increment
INCR page:views:homepage
INCRBY user:1:points 10

# Hash operations (like mini-documents)
HSET user:1 name "John" email "john@example.com" age 30
HGET user:1 name
HGETALL user:1

# Lists
LPUSH notifications:user:1 "New message"
RPUSH queue:emails "email_data"
LPOP queue:emails

# Sets
SADD user:1:following 2 3 4 5
SISMEMBER user:1:following 3  # Check if following user 3
SINTER user:1:following user:2:following  # Common followings

# Sorted Sets (leaderboard)
ZADD leaderboard 1000 "player1" 850 "player2" 1200 "player3"
ZREVRANGE leaderboard 0 9 WITHSCORES  # Top 10

# Pub/Sub
PUBLISH channel:notifications "New event"
SUBSCRIBE channel:notifications
```

### Redis Use Cases

| Use Case | Data Structure | Example |
|----------|---------------|---------|
| Session Store | String/Hash | Store user sessions |
| Cache | String | Cache database queries |
| Rate Limiting | String + INCR | Track API calls |
| Leaderboard | Sorted Set | Gaming rankings |
| Message Queue | List | Job queues |
| Real-time Analytics | HyperLogLog | Unique visitors |
| Pub/Sub | Channels | Real-time notifications |

### When to Use Key-Value Stores
- ✅ Caching (extremely fast reads)
- ✅ Session management
- ✅ Real-time data (counters, leaderboards)
- ✅ Message queues
- ❌ Complex queries
- ❌ Relational data

---

## 4. Column-Family Stores

### Overview
Stores data in columns rather than rows. Optimized for queries over large datasets with many columns.

### Cassandra Data Model

```
Keyspace: ecommerce
  └── Table: orders
        ├── Partition Key: customer_id
        ├── Clustering Key: order_date
        └── Columns: order_id, total, status, items

┌─────────────────────────────────────────────────────────────┐
│ Partition (customer_id = 1001)                               │
├──────────────┬──────────┬────────┬─────────┬────────────────┤
│ order_date   │ order_id │ total  │ status  │ items          │
├──────────────┼──────────┼────────┼─────────┼────────────────┤
│ 2025-01-15   │ ORD001   │ 99.99  │ shipped │ [{...}]        │
│ 2025-01-10   │ ORD002   │ 149.99 │ complete│ [{...}]        │
│ 2025-01-05   │ ORD003   │ 49.99  │ complete│ [{...}]        │
└──────────────┴──────────┴────────┴─────────┴────────────────┘
```

### Cassandra CQL (Cassandra Query Language)

```sql
-- Create keyspace
CREATE KEYSPACE ecommerce
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

-- Create table
CREATE TABLE orders (
    customer_id UUID,
    order_date TIMESTAMP,
    order_id UUID,
    total DECIMAL,
    status TEXT,
    items LIST<FROZEN<item>>,
    PRIMARY KEY ((customer_id), order_date)
) WITH CLUSTERING ORDER BY (order_date DESC);

-- Insert
INSERT INTO orders (customer_id, order_date, order_id, total, status)
VALUES (uuid(), toTimestamp(now()), uuid(), 99.99, 'pending');

-- Query (must include partition key)
SELECT * FROM orders WHERE customer_id = ?;
SELECT * FROM orders WHERE customer_id = ? AND order_date > '2025-01-01';

-- ❌ This won't work well (full scan)
SELECT * FROM orders WHERE status = 'pending';
```

### Cassandra Key Design

```
Primary Key = (Partition Key, Clustering Columns)

Example: ((customer_id), order_date, order_id)
         └─────┬─────┘  └───────┬──────────┘
          Partition        Clustering
          (Distribution)    (Sorting within partition)

Good for: "Get all orders for customer X in date range Y"
Bad for:  "Get all orders with status pending"
```

### When to Use Column-Family Stores
- ✅ Time-series data
- ✅ Write-heavy workloads
- ✅ High availability requirements
- ✅ Large-scale data (IoT, logs, analytics)
- ❌ Ad-hoc queries
- ❌ Frequent updates to same row
- ❌ Need for JOINs

---

## 5. Graph Databases

### Overview
Graph databases store data as nodes (entities) and edges (relationships). Optimized for traversing relationships.

### Neo4j Data Model

```
       ┌──────────┐
       │  Alice   │ (Person)
       └────┬─────┘
            │ FOLLOWS
            ▼
       ┌──────────┐  WORKS_AT  ┌──────────┐
       │   Bob    │──────────▶ │  TechCo  │ (Company)
       └────┬─────┘            └──────────┘
            │ LIKES
            ▼
       ┌──────────┐
       │  Post 1  │ (Post)
       └──────────┘
```

### Cypher Query Language (Neo4j)

```cypher
// Create nodes
CREATE (alice:Person {name: 'Alice', age: 30})
CREATE (bob:Person {name: 'Bob', age: 28})
CREATE (techco:Company {name: 'TechCo'})

// Create relationships
MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
CREATE (a)-[:FOLLOWS]->(b)

MATCH (b:Person {name: 'Bob'}), (c:Company {name: 'TechCo'})
CREATE (b)-[:WORKS_AT {since: 2020}]->(c)

// Query: Find friends of friends
MATCH (alice:Person {name: 'Alice'})-[:FOLLOWS*2]->(fof:Person)
RETURN fof.name

// Query: Shortest path between two people
MATCH path = shortestPath(
    (a:Person {name: 'Alice'})-[*]-(b:Person {name: 'Charlie'})
)
RETURN path

// Query: Recommendation (people who like same things)
MATCH (me:Person {name: 'Alice'})-[:LIKES]->(thing)<-[:LIKES]-(other:Person)
WHERE me <> other
RETURN other.name, COUNT(thing) as commonLikes
ORDER BY commonLikes DESC
```

### When to Use Graph Databases
- ✅ Social networks
- ✅ Recommendation engines
- ✅ Fraud detection
- ✅ Knowledge graphs
- ✅ Network topology
- ❌ Simple CRUD operations
- ❌ Large-scale analytics
- ❌ High-write workloads

---

## 6. Choosing the Right Database

### Decision Matrix

| Use Case | Recommended | Reasoning |
|----------|-------------|-----------|
| E-commerce catalog | MongoDB | Flexible product schemas |
| Session/cache | Redis | Fast key-value access |
| Time-series logs | Cassandra | Write-heavy, time-based queries |
| Social network | Neo4j + MongoDB | Graph for relations, document for profiles |
| Financial transactions | PostgreSQL | ACID compliance |
| Real-time analytics | Cassandra/ClickHouse | High write throughput |
| Search | Elasticsearch | Full-text search |

### Hybrid Approaches

```
┌─────────────────────────────────────────────────────────┐
│                    Application                           │
├─────────┬───────────┬────────────┬───────────┬──────────┤
│  User   │  Product  │   Order    │  Session  │  Social  │
│  Data   │  Catalog  │   Data     │   Cache   │  Graph   │
├─────────┼───────────┼────────────┼───────────┼──────────┤
│PostgreSQL│ MongoDB  │ PostgreSQL │   Redis   │  Neo4j   │
└─────────┴───────────┴────────────┴───────────┴──────────┘
```

---

## 7. Summary

| Type | Examples | Best For | Not For |
|------|----------|----------|---------|
| Document | MongoDB, CouchDB | Flexible schemas, nested data | Complex transactions |
| Key-Value | Redis, DynamoDB | Caching, sessions, real-time | Complex queries |
| Column-Family | Cassandra, HBase | Time-series, write-heavy | Ad-hoc queries |
| Graph | Neo4j, Neptune | Relationships, recommendations | Simple CRUD |

### Key Takeaways
- NoSQL provides flexibility and scalability for specific use cases
- Choose based on data model and access patterns
- Polyglot persistence: use multiple databases for different needs
- NoSQL doesn't replace SQL - they complement each other

---

## Further Reading
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [Redis Documentation](https://redis.io/documentation)
- [Apache Cassandra Documentation](https://cassandra.apache.org/doc/latest/)
- [Neo4j Documentation](https://neo4j.com/docs/)
