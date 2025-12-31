const notes = `
# Data Storage: SQL vs NoSQL

## Introduction to Data Storage

Data storage in system design refers to how data is organized, stored, retrieved, and managed within an application's architecture.

### Why Data Storage Matters
- **Performance**: Storage choice directly impacts query speed
- **Scalability**: Determines how system handles growth
- **Consistency**: Affects data reliability and accuracy
- **Cost**: Different solutions have varying operational costs

### Storage Hierarchy
\`\`\`
[Client] --> [Cache Layer] --> [Primary Database] --> [Archive Storage]
                    |                   |
            [Read Replicas]    [Backup Storage]
\`\`\`

---

## Relational Databases (SQL)

Relational databases store data in structured tables with rows and columns, using SQL (Structured Query Language) for data manipulation.

### Core Concepts

**Tables (Relations):** Data organized in rows and columns with predefined schema

**Primary Keys:** Unique identifier for each row, cannot be NULL

**Foreign Keys:** References primary key in another table, establishes relationships

**Normalization:** Process of organizing data to reduce redundancy (1NF, 2NF, 3NF)

### Popular SQL Databases

| Database | Description |
|----------|-------------|
| PostgreSQL | Advanced open-source, JSONB support |
| MySQL | Most popular open-source |
| Oracle | Enterprise-grade, expensive |
| SQL Server | Microsoft, BI features |
| SQLite | Embedded, serverless |

### Strengths of SQL
- Strong data integrity (ACID)
- Complex queries and joins
- Mature ecosystem and tools
- Standardized query language

### Weaknesses of SQL
- Rigid schema requirements
- Vertical scaling limitations
- Complex sharding
- May be overkill for simple needs

---

## NoSQL Databases Overview

NoSQL (Not Only SQL) databases are non-relational databases designed for specific data models with flexible schemas.

### Why NoSQL Emerged
1. Web-scale data volumes
2. Need for horizontal scaling
3. Unstructured data handling
4. Faster development cycles
5. Distributed architecture requirements

### Key Characteristics
- **Flexible Schema**: Schema-less or dynamic
- **Horizontal Scaling**: Designed for distribution
- **High Availability**: Built for replication and failover
- **Specific Data Models**: Optimized for particular use cases

---

## Types of NoSQL Databases

### 1. Key-Value Stores
- Simplest NoSQL type: data as key-value pairs
- Fast lookups by key
- **Use Cases**: Sessions, caching, user preferences
- **Examples**: Redis, DynamoDB, Memcached

### 2. Document Stores
- Store semi-structured documents (JSON, BSON)
- Documents can have different structures
- **Use Cases**: Content management, user profiles, product catalogs
- **Examples**: MongoDB, Couchbase, CouchDB, Firestore

### 3. Column-Family Stores (Wide-Column)
- Data stored in columns, not rows
- Optimized for write-heavy and analytical workloads
- **Use Cases**: Time-series, analytics, large-scale data
- **Examples**: Cassandra, HBase, ScyllaDB, Bigtable

### 4. Graph Databases
- Data stored as nodes and edges
- Optimized for relationship traversal
- **Use Cases**: Social networks, recommendations, fraud detection
- **Examples**: Neo4j, Neptune, JanusGraph

---

## ACID vs BASE Properties

### ACID Properties (SQL)

**Atomicity:** Transactions are all-or-nothing

**Consistency:** Database moves from one valid state to another

**Isolation:** Concurrent transactions don't interfere
- READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE

**Durability:** Committed transactions survive failures

### BASE Properties (NoSQL)

**Basically Available:** System guarantees availability

**Soft State:** State may change over time

**Eventually Consistent:** System will become consistent given time

### When to Use
- **ACID**: Financial transactions, inventory, orders
- **BASE**: Social feeds, analytics, sessions, recommendations

---

## CAP Theorem and Databases

CAP theorem: A distributed system can only provide two of three guarantees:

- **C - Consistency**: All nodes see the same data at the same time
- **A - Availability**: Every request receives a response
- **P - Partition Tolerance**: System continues despite network partitions

### Practical Implications

**CP Systems** (Consistency + Partition Tolerance):
- Refuse requests during partition to maintain consistency
- Examples: MongoDB (with write concern), HBase

**AP Systems** (Availability + Partition Tolerance):
- Return possibly stale data during partition
- Examples: Cassandra, DynamoDB, CouchDB

**CA Systems**: Only possible without network partitions (single node RDBMS)

---

## Choosing Between SQL and NoSQL

### Decision Factors

| Factor | SQL Better | NoSQL Better |
|--------|------------|--------------|
| ACID transactions | ✓ | |
| Complex queries/joins | ✓ | |
| Schema flexibility | | ✓ |
| Horizontal scaling | | ✓ |
| High write volume | | ✓ |
| Unstructured data | | ✓ |
| Rapid development | | ✓ |

### Common Patterns by Domain

**E-Commerce:**
- Products: Document store (flexible attributes)
- Orders/Payments: SQL (ACID transactions)
- Sessions: Key-value (fast access)

**Social Network:**
- User profiles: Document store
- Relationships: Graph database
- Feed: Wide-column store

**Analytics Platform:**
- Raw events: Wide-column store
- Reports: SQL

### Polyglot Persistence
Using multiple database types for different needs:
\`\`\`
[Web App]
    +---> [PostgreSQL] - Users, Orders
    +---> [MongoDB] - Product catalog
    +---> [Redis] - Sessions, Cache
    +---> [Elasticsearch] - Search
    +---> [Neo4j] - Recommendations
\`\`\`

---

## Data Modeling Strategies

### SQL Data Modeling

**Normalization:** Organizing data to reduce redundancy
- 1NF: No repeating groups, atomic columns
- 2NF: No partial dependencies
- 3NF: No transitive dependencies

**Denormalization:** Intentionally add redundancy for read performance

### NoSQL Data Modeling

**Key Principles:**
1. Model for queries, not entities
2. Embrace denormalization
3. Design for access patterns
4. Accept data duplication

**Document Patterns:**
- **Embedding**: Nested documents for data accessed together
- **Referencing**: Separate documents with links for large/frequently updated data

---

## Database Scaling Patterns

### Replication

**Primary-Replica (Master-Slave):**
- Primary handles writes, replicas handle reads
- Benefits: Read scalability, high availability
- Challenges: Replication lag, write bottleneck

**Multi-Primary (Master-Master):**
- Multiple masters accept writes
- Benefits: Write scalability, no SPOF
- Challenges: Conflict resolution, complexity

### Sharding (Partitioning)

**Strategies:**
1. **Range-based**: Divide by key ranges (A-M, N-Z)
   - Easy range queries, may cause hotspots
2. **Hash-based**: hash(key) % num_shards
   - Even distribution, hard range queries
3. **Directory-based**: Lookup table maps to shard
   - Flexible, but lookup overhead
4. **Geographic**: Shard by region
   - Low latency, data locality

**Consistent Hashing:** Minimizes data movement when adding/removing nodes

---

## Modern Database Trends

### NewSQL Databases
Combining SQL's ACID with NoSQL's scalability
- CockroachDB, TiDB, YugabyteDB, Spanner

### Multi-Model Databases
Single database supporting multiple data models
- ArangoDB, CosmosDB, FaunaDB

### Time-Series Databases
Optimized for time-stamped data
- InfluxDB, TimescaleDB, Prometheus

### Vector Databases
Store high-dimensional vectors for AI/ML
- Pinecone, Milvus, Weaviate

### Serverless Databases
Auto-scaling, pay-per-use
- Aurora Serverless, PlanetScale, Neon

---

## Quick Reference: Database Selection

| Need | Recommendation |
|------|----------------|
| Strong consistency + complex queries | PostgreSQL, MySQL |
| Flexible schema + scalability | MongoDB, Couchbase |
| Extreme write performance | Cassandra, ScyllaDB |
| Fast caching/sessions | Redis, Memcached |
| Relationship traversal | Neo4j, Neptune |
| Time-series data | InfluxDB, TimescaleDB |
| Full-text search | Elasticsearch, Algolia |
| Global distribution + SQL | CockroachDB, Spanner |

**Best Practice:** Evaluate requirements carefully. Don't choose based on trends. Consider polyglot persistence for complex systems.
`;

export default notes;
