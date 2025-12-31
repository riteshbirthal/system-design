const questions = [
  {
    question: "What is the difference between SQL and NoSQL databases?",
    answer: "SQL databases are relational, store data in structured tables with predefined schemas, use SQL for queries, provide ACID transactions, and scale vertically. NoSQL databases are non-relational, have flexible/no schemas, use various query methods, often provide eventual consistency (BASE), and scale horizontally. SQL is better for complex queries and relationships; NoSQL is better for flexible data and high scalability.",
    difficulty: "Easy"
  },
  {
    question: "What are the four types of NoSQL databases?",
    answer: "1) Key-Value Stores (Redis, DynamoDB) - simple key-value pairs, fast lookups. 2) Document Stores (MongoDB, CouchDB) - semi-structured documents like JSON, flexible schema. 3) Column-Family/Wide-Column Stores (Cassandra, HBase) - data in columns, high write throughput. 4) Graph Databases (Neo4j, Neptune) - nodes and edges, relationship traversal.",
    difficulty: "Easy"
  },
  {
    question: "What is ACID in database terms?",
    answer: "ACID describes transaction properties: Atomicity (transactions are all-or-nothing), Consistency (database remains in valid state after transaction), Isolation (concurrent transactions don't interfere - isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE), Durability (committed transactions survive failures). ACID is guaranteed by SQL databases.",
    difficulty: "Easy"
  },
  {
    question: "What is BASE in database terms?",
    answer: "BASE describes NoSQL database properties: Basically Available (system always responds), Soft State (data may change over time even without input due to eventual consistency), Eventually Consistent (system becomes consistent over time given no new updates). BASE prioritizes availability over immediate consistency.",
    difficulty: "Easy"
  },
  {
    question: "What is a primary key vs foreign key?",
    answer: "Primary Key: Column(s) that uniquely identifies each row in a table; cannot be NULL; ensures entity integrity. Foreign Key: Column(s) that references a primary key in another table; establishes relationships between tables; enforces referential integrity. Example: orders.user_id (FK) references users.id (PK).",
    difficulty: "Easy"
  },
  {
    question: "What is the CAP theorem?",
    answer: "CAP theorem states distributed databases can only guarantee 2 of 3 properties: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network failures). Since network partitions happen, real choice is CP (consistent but may be unavailable) or AP (available but may serve stale data).",
    difficulty: "Medium"
  },
  {
    question: "Explain CP vs AP systems with examples.",
    answer: "CP Systems (Consistency + Partition Tolerance): Prioritize data consistency, may refuse requests during partition. Examples: HBase, MongoDB (with write concern). AP Systems (Availability + Partition Tolerance): Prioritize availability, return possibly stale data during partition. Examples: Cassandra, DynamoDB, CouchDB. Choose based on whether you can tolerate stale reads (AP) or unavailability (CP).",
    difficulty: "Medium"
  },
  {
    question: "What is normalization and what are the normal forms?",
    answer: "Normalization organizes database tables to reduce redundancy and improve integrity. Normal forms: 1NF - no repeating groups, atomic columns, unique rows. 2NF - in 1NF + no partial dependencies (non-key columns depend on entire primary key). 3NF - in 2NF + no transitive dependencies (non-key columns depend only on primary key). BCNF - stricter 3NF for complex keys.",
    difficulty: "Medium"
  },
  {
    question: "What is denormalization and when would you use it?",
    answer: "Denormalization intentionally adds redundancy to improve read performance by reducing JOINs. Use when: read performance is critical, data is read frequently but written rarely, reporting/analytics workloads, NoSQL databases where JOINs aren't available. Trade-offs: faster reads, but harder updates (multiple locations), risk of inconsistency, more storage.",
    difficulty: "Medium"
  },
  {
    question: "What is database sharding?",
    answer: "Sharding horizontally partitions data across multiple database servers. Each shard contains a subset of total data. Strategies: Range-based (A-M, N-Z), Hash-based (hash(key) % shards), Directory-based (lookup table), Geographic (by region). Benefits: horizontal scaling, distributed load. Challenges: cross-shard queries, resharding complexity, choosing shard key.",
    difficulty: "Medium"
  },
  {
    question: "What is database replication and its types?",
    answer: "Replication copies data across multiple servers for high availability, read scaling, and disaster recovery. Types: Primary-Replica (master handles writes, replicas handle reads - async or sync replication), Multi-Primary (multiple masters accept writes - needs conflict resolution). Trade-offs: sync replication has higher latency but no data loss; async has lower latency but potential data loss.",
    difficulty: "Medium"
  },
  {
    question: "What is replication lag and how does it affect applications?",
    answer: "Replication lag is the delay between writes on primary appearing on replicas. Effects: user writes data but doesn't see it when reading from replica, stale data in reports, race conditions. Solutions: read from primary after writes, use synchronous replication (higher latency), implement read-your-writes consistency, use database that supports linearizable reads.",
    difficulty: "Medium"
  },
  {
    question: "When would you choose PostgreSQL over MySQL?",
    answer: "Choose PostgreSQL for: advanced data types (JSONB, arrays, hstore), complex queries and full SQL compliance, better concurrent write handling, advanced indexing (partial, expression indexes), geospatial data (PostGIS), strong data integrity requirements. Choose MySQL for: simpler use cases, better read performance in some scenarios, wider hosting support, larger community.",
    difficulty: "Medium"
  },
  {
    question: "What is MongoDB best suited for?",
    answer: "MongoDB excels at: flexible/evolving schemas (no rigid structure needed), storing semi-structured data (JSON-like documents), rapid development and prototyping, content management systems, user profiles with varying attributes, product catalogs with different fields, real-time analytics. Supports ACID transactions since v4.0 and horizontal scaling via sharding.",
    difficulty: "Medium"
  },
  {
    question: "What is Redis and when would you use it?",
    answer: "Redis is an in-memory key-value store used for: caching (session data, query results), real-time analytics and counters, message queues and pub/sub, leaderboards and ranking, rate limiting, distributed locks. Extremely fast (sub-millisecond latency) because data is in memory. Supports persistence (RDB snapshots, AOF logs) and replication.",
    difficulty: "Easy"
  },
  {
    question: "What is Cassandra designed for?",
    answer: "Cassandra is designed for: high write throughput (append-only, LSM trees), massive scalability (petabytes of data), no single point of failure (peer-to-peer architecture), multi-datacenter replication, time-series data (logs, metrics, IoT). Used by Netflix, Instagram, Apple. Trade-offs: eventual consistency, limited query flexibility, complex data modeling.",
    difficulty: "Medium"
  },
  {
    question: "When should you use a graph database?",
    answer: "Use graph databases when: data has many relationships (social networks), need efficient relationship traversal (friend-of-friend queries), building recommendation engines, fraud detection (pattern matching), knowledge graphs, organizational hierarchies. Examples: Neo4j, Amazon Neptune. Not suitable for simple key-value or document storage.",
    difficulty: "Medium"
  },
  {
    question: "What is the N+1 query problem and how do you solve it?",
    answer: "N+1 problem: fetching a list (1 query) then fetching related data for each item individually (N queries). Example: get 100 users, then 100 separate queries for their orders. Solutions: use JOIN to fetch all in one query, batch fetching with IN clause, ORM eager loading, denormalize data. Critical for performance at scale.",
    difficulty: "Medium"
  },
  {
    question: "Explain embedding vs referencing in document databases.",
    answer: "Embedding: store related data within the same document (nested). Use for: one-to-one, one-to-few, data accessed together, rarely changing data. Referencing: store in separate documents with links (like foreign keys). Use for: one-to-many (large), many-to-many, independently accessed data, frequently updated data. Embedding is faster to read; referencing is easier to update.",
    difficulty: "Medium"
  },
  {
    question: "What is polyglot persistence?",
    answer: "Polyglot persistence uses multiple database types in one application, choosing the best for each use case: SQL for transactions, Redis for caching, MongoDB for flexible documents, Elasticsearch for search, Neo4j for graphs. Benefits: optimized performance for each workload. Challenges: increased operational complexity, data synchronization, more technologies to maintain.",
    difficulty: "Medium"
  },
  {
    question: "What are NewSQL databases?",
    answer: "NewSQL databases combine SQL's ACID properties with NoSQL's horizontal scalability. Examples: CockroachDB (distributed, survives failures), TiDB (MySQL compatible), YugabyteDB (PostgreSQL compatible), Google Spanner (globally distributed). Features: SQL compatibility, automatic sharding, distributed transactions, strong consistency. Good for applications needing both ACID and scale.",
    difficulty: "Hard"
  },
  {
    question: "What is consistent hashing and why is it used in databases?",
    answer: "Consistent hashing maps data and nodes to a circular hash space; keys are assigned to the next node clockwise. Benefits: adding/removing nodes only affects neighboring keys (minimal redistribution), even distribution with virtual nodes. Used in: distributed caches (Redis Cluster), database sharding, CDNs. Solves the problem of traditional hashing where adding nodes requires remapping most keys.",
    difficulty: "Hard"
  },
  {
    question: "How do you choose between SQL and NoSQL for a new project?",
    answer: "Consider: 1) Data structure - structured/relational → SQL; flexible/varied → NoSQL. 2) Query patterns - complex joins → SQL; simple lookups → NoSQL. 3) Consistency needs - strong → SQL; eventual OK → NoSQL. 4) Scale - moderate → SQL; massive → NoSQL. 5) Development speed - rapid iteration → NoSQL; stable schema → SQL. Often use both (polyglot) for different parts of the system.",
    difficulty: "Medium"
  },
  {
    question: "What isolation levels exist in SQL databases?",
    answer: "Four isolation levels (lowest to highest): 1) READ UNCOMMITTED - can see uncommitted changes (dirty reads). 2) READ COMMITTED - only sees committed data. 3) REPEATABLE READ - same data throughout transaction. 4) SERIALIZABLE - full isolation, transactions appear sequential. Higher isolation = more consistency but lower performance/throughput. Most databases default to READ COMMITTED.",
    difficulty: "Hard"
  },
  {
    question: "What is eventual consistency and when is it acceptable?",
    answer: "Eventual consistency: if no new updates are made, all replicas will eventually converge to the same value. Temporary inconsistencies are possible. Acceptable for: social media feeds, view counts, recommendations, shopping cart (before checkout), analytics data, notifications. Not acceptable for: financial transactions, inventory (overselling), authentication/authorization, order processing.",
    difficulty: "Medium"
  },
  {
    question: "How does MongoDB handle transactions?",
    answer: "MongoDB supports multi-document ACID transactions since v4.0: can span multiple documents and collections, all-or-nothing semantics, supports read and write concerns. Single-document operations are always atomic. Trade-offs: transactions have performance overhead, not as efficient as SQL for highly transactional workloads. Best practice: design data model to minimize need for multi-document transactions.",
    difficulty: "Hard"
  },
  {
    question: "What is a time-series database and when would you use it?",
    answer: "Time-series databases are optimized for time-stamped data with high write throughput and time-based queries. Examples: InfluxDB, TimescaleDB, Prometheus. Use for: IoT sensor data, application metrics, financial tick data, log analysis, monitoring systems. Features: efficient time-range queries, automatic downsampling, retention policies, specialized aggregation functions.",
    difficulty: "Medium"
  },
  {
    question: "What factors affect database performance?",
    answer: "Key factors: 1) Indexing - proper indexes for query patterns. 2) Query optimization - efficient queries, avoiding N+1. 3) Connection pooling - reuse connections. 4) Caching - reduce database load. 5) Schema design - normalization vs denormalization trade-offs. 6) Hardware - SSD, RAM, CPU. 7) Replication - read replicas for scaling reads. 8) Sharding - for massive scale. 9) Query analysis - use EXPLAIN to optimize.",
    difficulty: "Medium"
  },
  {
    question: "What is a compound index and when should you use it?",
    answer: "Compound index includes multiple columns in specific order. Use when: queries filter on multiple columns together, need to optimize sorting on multiple columns, queries use prefix of index columns. Example: index on (city, last_name) helps queries filtering by city alone, or city+last_name, but not last_name alone. Order matters - put most selective column first for equality, range columns last.",
    difficulty: "Medium"
  },
  {
    question: "How would you design data storage for an e-commerce platform?",
    answer: "Polyglot approach: PostgreSQL for users, orders, payments (ACID transactions, relational data). MongoDB for product catalog (flexible attributes per category). Redis for sessions, cart, caching. Elasticsearch for product search. Consider: read replicas for product reads, sharding for order history, CDN for product images. Key patterns: denormalize product info in orders, cache popular products.",
    difficulty: "Hard"
  }
];

export default questions;
