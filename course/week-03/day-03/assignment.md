# Day 3 Assignment: Indexing & Query Optimization

## Assignment Overview
**Difficulty:** Intermediate to Advanced
**Estimated Time:** 60-75 minutes
**Points:** 100

---

## Part 1: Index Design (35 points)

### Task 1.1 (20 points)
Given the following table and common queries, design an optimal indexing strategy:

```sql
CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    merchant_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,  -- 'pending', 'completed', 'failed', 'refunded'
    category VARCHAR(50),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

Common queries:
1. Find all transactions for a user in the last 30 days
2. Find all pending transactions
3. Find transactions by merchant, ordered by date
4. Find high-value transactions (amount > 1000) for a user
5. Get daily transaction count by status

For each query:
- Write the index CREATE statement
- Explain why this index helps
- Estimate if it's worth creating (considering write overhead)

### Task 1.2 (15 points)
Analyze this poorly performing query and optimize it:

```sql
SELECT 
    u.name,
    COUNT(*) as order_count,
    SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE YEAR(o.created_at) = 2024
  AND o.status IN ('completed', 'shipped')
  AND UPPER(u.email) LIKE '%@GMAIL.COM'
GROUP BY u.id, u.name
HAVING SUM(o.total) > 500
ORDER BY total_spent DESC
LIMIT 100;
```

Provide:
1. List all issues with this query
2. Rewritten, optimized query
3. Recommended indexes
4. Expected improvement

---

## Part 2: EXPLAIN Analysis (30 points)

### Task 2.1 (15 points)
Analyze the following EXPLAIN output and answer questions:

```
Nested Loop Left Join  (cost=1.12..28394.38 rows=2156 width=82) (actual time=0.043..156.234 rows=1847 loops=1)
  ->  Index Scan using idx_users_country on users  (cost=0.42..98.42 rows=1000 width=36) (actual time=0.015..1.234 rows=987 loops=1)
        Index Cond: (country = 'USA')
  ->  Index Scan using idx_orders_user_id on orders  (cost=0.70..28.28 rows=3 width=46) (actual time=0.012..0.156 rows=2 loops=987)
        Index Cond: (user_id = users.id)
        Filter: (status = 'completed')
        Rows Removed by Filter: 5
Planning Time: 0.523 ms
Execution Time: 157.892 ms
```

Questions:
1. What type of join is being used?
2. Is the query using indexes effectively?
3. What is the "Rows Removed by Filter" telling us?
4. How could this query be improved further?
5. Calculate the average rows per user that were filtered out

### Task 2.2 (15 points)
Given this slow EXPLAIN output, propose optimizations:

```
Seq Scan on orders  (cost=0.00..25624.00 rows=10000 width=40) (actual time=0.012..234.567 rows=9876 loops=1)
  Filter: ((status = 'pending') AND (created_at > '2024-01-01'))
  Rows Removed by Filter: 990124
Planning Time: 0.156 ms
Execution Time: 235.123 ms
```

Provide:
1. Why is this scan slow?
2. What indexes would help?
3. Expected EXPLAIN output after optimization
4. Alternative approaches if this is a high-frequency query

---

## Part 3: Real-World Scenarios (35 points)

### Task 3.1 (20 points)
You're the DBA for an e-commerce platform. The `products` table has:
- 10 million rows
- Columns: id, name, category_id, price, stock_qty, rating, created_at, is_active
- Queries: 80% reads, 20% writes

Current indexes:
- Primary key on id
- Index on category_id
- Index on created_at

Users report slow performance on:
1. Product search with filters (category, price range, rating, active only)
2. Inventory reports (low stock items)
3. New arrivals page (recent + active + sorted by rating)

Design an improved indexing strategy:
- What indexes to add?
- What indexes to remove?
- Trade-offs considered
- Estimated impact on writes

### Task 3.2 (15 points)
Your monitoring shows these are the slowest queries (by total time):

| Query | Frequency | Avg Time | Total Time |
|-------|-----------|----------|------------|
| Q1: User dashboard | 10,000/day | 200ms | 2000s/day |
| Q2: Admin report | 50/day | 5000ms | 250s/day |
| Q3: Product search | 50,000/day | 50ms | 2500s/day |
| Q4: Order history | 5,000/day | 150ms | 750s/day |

Prioritize optimization efforts:
1. Which queries should be optimized first? Why?
2. What's the expected ROI of optimizing each?
3. For top 2 priorities, outline optimization approach

---

## Submission Guidelines

1. Save your answers in `day03_indexing_assignment_[yourname].md`
2. Include all SQL with proper formatting
3. Submit by the end of Day 3

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Index Design Quality | 30 |
| EXPLAIN Analysis | 25 |
| Optimization Reasoning | 25 |
| Real-World Application | 20 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Bonus: Full-Text Search Optimization
Design an indexing strategy for a search feature that needs to:
- Search across product name, description, and tags
- Support typo tolerance
- Return results in relevance order
- Handle 1000 searches/second

Include:
1. Index type and configuration
2. Query approach
3. Alternatives considered (Elasticsearch?)
