# Day 3: Indexing & Query Optimization

## Learning Objectives
- Understand how database indexes work
- Learn different index types (B-tree, Hash, etc.)
- Master query optimization techniques
- Learn to use EXPLAIN for query analysis
- Understand index trade-offs

---

## 1. What is an Index?

An index is a data structure that improves query speed by providing quick lookups without scanning the entire table.

```
Without Index (Full Table Scan):
┌────┬──────────┬─────────────────────┐
│ id │  name    │        email        │
├────┼──────────┼─────────────────────┤
│ 1  │ Alice    │ alice@example.com   │ ← Check
│ 2  │ Bob      │ bob@example.com     │ ← Check
│ 3  │ Charlie  │ charlie@example.com │ ← Check
│... │ ...      │ ...                 │ ← Check all rows
│ N  │ Zoe      │ zoe@example.com     │ ← Found!
└────┴──────────┴─────────────────────┘
Time: O(n)

With Index on email:
           ┌─────────────────────┐
           │  Index (B-tree)     │
           │   alice... → Row 1  │
           │   bob...   → Row 2  │
           │   zoe...   → Row N  │ ← Direct lookup
           └─────────────────────┘
Time: O(log n)
```

---

## 2. B-Tree Index (Default)

Most common index type. Balanced tree structure supporting equality and range queries.

```
                    [M]
                   /   \
              [D,H]     [R,W]
             /  |  \    / |  \
          [A-C][E-G][I-L][N-Q][S-V][X-Z]
              Leaf nodes contain row pointers
```

### Creating B-Tree Indexes

```sql
-- Simple index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- Unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_users ON users(email) WHERE active = true;
```

### B-Tree Query Support

| Query Type | Supported | Example |
|------------|-----------|---------|
| Equality | ✅ | `WHERE email = 'x'` |
| Range | ✅ | `WHERE age > 25` |
| Prefix | ✅ | `WHERE name LIKE 'John%'` |
| Suffix | ❌ | `WHERE name LIKE '%Smith'` |
| ORDER BY | ✅ | `ORDER BY created_at` |

---

## 3. Other Index Types

### Hash Index
```sql
CREATE INDEX idx_hash ON users USING HASH (email);
```
- O(1) lookups for equality only
- No range queries, no ordering
- Use for exact-match lookups

### GiST Index (Generalized Search Tree)
```sql
CREATE INDEX idx_location ON places USING GIST (coordinates);
```
- Geometric/spatial data
- Full-text search
- Nearest-neighbor queries

### GIN Index (Generalized Inverted Index)
```sql
CREATE INDEX idx_tags ON posts USING GIN (tags);
CREATE INDEX idx_document ON articles USING GIN (to_tsvector('english', content));
```
- Array elements
- Full-text search
- JSON fields

### BRIN Index (Block Range Index)
```sql
CREATE INDEX idx_created ON logs USING BRIN (created_at);
```
- Very compact (small)
- Best for naturally ordered data
- Time-series, append-only tables

---

## 4. Composite Indexes

Order matters! Index on `(A, B, C)` supports:

```
✅ WHERE A = ?
✅ WHERE A = ? AND B = ?
✅ WHERE A = ? AND B = ? AND C = ?
✅ WHERE A = ? AND B > ?
❌ WHERE B = ?              ← Leftmost column missing
❌ WHERE A = ? AND C = ?    ← Gap in columns
❌ WHERE B = ? AND C = ?    ← Missing A
```

### Index Column Order Strategy

```sql
-- Good: High selectivity first
CREATE INDEX idx_orders ON orders(status, user_id, created_at);
-- For: WHERE status = 'pending' AND user_id = 123

-- Consider query patterns:
-- If often filtering by user_id first:
CREATE INDEX idx_orders_user ON orders(user_id, status, created_at);
```

---

## 5. Covering Indexes

An index that contains all columns needed by a query (index-only scan).

```sql
-- Query
SELECT user_id, order_count 
FROM order_stats 
WHERE user_id = 123;

-- Covering index (includes all needed columns)
CREATE INDEX idx_covering ON order_stats(user_id) INCLUDE (order_count);

-- Result: No table access needed!
```

---

## 6. Query Execution Plans (EXPLAIN)

### PostgreSQL EXPLAIN

```sql
EXPLAIN ANALYZE
SELECT * FROM orders 
WHERE user_id = 123 AND created_at > '2025-01-01';

-- Output:
Index Scan using idx_orders_user on orders (cost=0.29..8.31 rows=1 width=64) (actual time=0.015..0.016 rows=1 loops=1)
  Index Cond: ((user_id = 123) AND (created_at > '2025-01-01'))
Planning Time: 0.092 ms
Execution Time: 0.031 ms
```

### Key Metrics

| Metric | Description |
|--------|-------------|
| **Seq Scan** | Full table scan (usually bad) |
| **Index Scan** | Uses index (good) |
| **Index Only Scan** | Uses covering index (best) |
| **cost** | Estimated cost (lower is better) |
| **rows** | Estimated rows returned |
| **actual time** | Real execution time |

### Scan Types (Best to Worst)

```
1. Index Only Scan   ← Best (no table access)
2. Index Scan        ← Good (index + table)
3. Bitmap Index Scan ← OK (multiple rows)
4. Seq Scan          ← Worst (full table)
```

---

## 7. Query Optimization Techniques

### 1. Use Appropriate Indexes

```sql
-- Before (Seq Scan)
SELECT * FROM users WHERE email = 'john@example.com';

-- Add index
CREATE INDEX idx_users_email ON users(email);

-- After (Index Scan) - Much faster
```

### 2. Avoid SELECT *

```sql
-- Bad
SELECT * FROM orders WHERE user_id = 123;

-- Good (only needed columns)
SELECT id, total, status FROM orders WHERE user_id = 123;
```

### 3. Use LIMIT

```sql
-- Bad (fetches all matching)
SELECT * FROM logs WHERE level = 'ERROR';

-- Good (fetches only what's needed)
SELECT * FROM logs WHERE level = 'ERROR' LIMIT 100;
```

### 4. Avoid Functions on Indexed Columns

```sql
-- Bad (can't use index)
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';
SELECT * FROM orders WHERE YEAR(created_at) = 2025;

-- Good (uses index)
SELECT * FROM users WHERE email = 'john@example.com';
SELECT * FROM orders WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01';
```

### 5. Optimize JOINs

```sql
-- Ensure foreign keys are indexed
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Use INNER JOIN when possible (more efficient than LEFT JOIN)
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

---

## 8. Index Trade-offs

### Storage Cost
```
Every index = Additional storage
Table: 1 GB
+ 3 indexes ≈ 1.5-3 GB extra

Monitor index sizes:
SELECT indexrelname, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes;
```

### Write Performance
```
INSERT/UPDATE/DELETE must update ALL indexes

Table with 0 indexes: INSERT = 1 write
Table with 5 indexes: INSERT = 6 writes

Impact: 
- More indexes = slower writes
- Index maintenance overhead
```

### When NOT to Index

| Scenario | Reason |
|----------|--------|
| Small tables (<1000 rows) | Full scan is fast enough |
| Low selectivity columns | boolean, status with few values |
| Frequently updated columns | Index maintenance overhead |
| Write-heavy tables | Slows down inserts |

---

## 9. Index Maintenance

### Monitor Index Usage

```sql
-- PostgreSQL: Find unused indexes
SELECT 
    schemaname, tablename, indexname,
    idx_scan, idx_tup_read
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

### Rebuild Fragmented Indexes

```sql
-- PostgreSQL
REINDEX INDEX idx_users_email;

-- MySQL
ALTER TABLE users ENGINE=InnoDB;  -- Rebuilds all indexes
```

---

## 10. Summary

| Index Type | Use Case |
|------------|----------|
| B-tree | Default, range queries, sorting |
| Hash | Equality lookups only |
| GiST | Spatial, full-text |
| GIN | Arrays, JSONB, full-text |
| BRIN | Large sorted tables |

### Best Practices
- Index columns used in WHERE, JOIN, ORDER BY
- Put high-selectivity columns first in composite indexes
- Use covering indexes for frequent queries
- Monitor and remove unused indexes
- Balance read vs write performance

---

## Further Reading
- [Use The Index, Luke](https://use-the-index-luke.com/)
- [PostgreSQL: Query Planning](https://www.postgresql.org/docs/current/using-explain.html)
- [MySQL: Index Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)
