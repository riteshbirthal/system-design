# Day 1: SQL Databases

## Learning Objectives
- Understand relational database fundamentals
- Learn database normalization (1NF, 2NF, 3NF, BCNF)
- Master SQL query fundamentals
- Understand joins and their types
- Learn when to use SQL databases

---

## 1. Introduction to Relational Databases

### What is a Relational Database?
A relational database organizes data into tables (relations) with rows and columns. Tables can be related to each other through keys, enabling complex data relationships.

### Key Concepts

| Concept | Description | Example |
|---------|-------------|---------|
| **Table/Relation** | Collection of related data | `users`, `orders` |
| **Row/Tuple** | Single record | One user's data |
| **Column/Attribute** | Data field | `name`, `email` |
| **Primary Key** | Unique identifier | `user_id` |
| **Foreign Key** | Reference to another table | `order.user_id` |
| **Schema** | Database structure definition | Table definitions |

### Example Table Structure

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. Database Normalization

### Why Normalize?
- **Reduce data redundancy**: Avoid storing same data multiple times
- **Improve data integrity**: Single source of truth
- **Simplify updates**: Change data in one place
- **Optimize storage**: Less wasted space

### First Normal Form (1NF)
**Rule**: Each column must contain atomic (indivisible) values.

```
❌ Not in 1NF:
┌────┬──────────────────────┐
│ id │ phone_numbers        │
├────┼──────────────────────┤
│ 1  │ 555-1234, 555-5678   │  ← Multiple values in one cell
└────┴──────────────────────┘

✅ In 1NF:
┌────┬──────────┐
│ id │ phone    │
├────┼──────────┤
│ 1  │ 555-1234 │
│ 1  │ 555-5678 │
└────┴──────────┘
```

### Second Normal Form (2NF)
**Rule**: Must be in 1NF + no partial dependencies (all non-key columns depend on the ENTIRE primary key).

```
❌ Not in 2NF (composite key):
┌───────────┬────────────┬─────────────┬───────────────┐
│ order_id  │ product_id │ product_name│ quantity      │
├───────────┼────────────┼─────────────┼───────────────┤
│ 1         │ 100        │ Laptop      │ 2             │
└───────────┴────────────┴─────────────┴───────────────┘
             ↑ product_name depends only on product_id, not full key

✅ In 2NF (split tables):
Orders: (order_id, product_id, quantity)
Products: (product_id, product_name)
```

### Third Normal Form (3NF)
**Rule**: Must be in 2NF + no transitive dependencies (non-key columns shouldn't depend on other non-key columns).

```
❌ Not in 3NF:
┌────┬─────────┬────────────────┬──────────────┐
│ id │ dept_id │ dept_name      │ employee_name│
├────┼─────────┼────────────────┼──────────────┤
│ 1  │ 10      │ Engineering    │ John         │
└────┴─────────┴────────────────┴──────────────┘
              ↑ dept_name depends on dept_id, not on primary key

✅ In 3NF (split tables):
Employees: (id, dept_id, employee_name)
Departments: (dept_id, dept_name)
```

### Boyce-Codd Normal Form (BCNF)
**Rule**: Every determinant must be a candidate key.

### Normalization Summary

| Form | Rule | Eliminates |
|------|------|------------|
| 1NF | Atomic values | Repeating groups |
| 2NF | No partial dependencies | Partial dependencies |
| 3NF | No transitive dependencies | Transitive dependencies |
| BCNF | Every determinant is candidate key | Remaining anomalies |

---

## 3. Denormalization

### When to Denormalize
Sometimes, denormalization improves performance for read-heavy workloads.

```
Normalized (3 queries):
SELECT * FROM orders WHERE id = 1;
SELECT * FROM users WHERE id = orders.user_id;
SELECT * FROM products WHERE id IN (...);

Denormalized (1 query):
SELECT * FROM orders_denormalized WHERE id = 1;
-- Contains user_name, product_names directly
```

### Trade-offs

| Normalization | Denormalization |
|--------------|-----------------|
| Less storage | More storage |
| Slower reads (joins) | Faster reads |
| Faster writes | Slower writes |
| Data integrity | Potential inconsistency |
| Flexible queries | Optimized for specific queries |

---

## 4. SQL Query Fundamentals

### Basic CRUD Operations

```sql
-- CREATE (Insert)
INSERT INTO users (name, email)
VALUES ('John Doe', 'john@example.com');

-- READ (Select)
SELECT id, name, email FROM users WHERE id = 1;

-- UPDATE
UPDATE users SET name = 'John Smith' WHERE id = 1;

-- DELETE
DELETE FROM users WHERE id = 1;
```

### SELECT with Filtering and Sorting

```sql
-- WHERE clause
SELECT * FROM users WHERE created_at > '2025-01-01';

-- Multiple conditions
SELECT * FROM orders
WHERE status = 'completed'
  AND total > 100
  AND created_at BETWEEN '2025-01-01' AND '2025-12-31';

-- Pattern matching
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Sorting
SELECT * FROM products ORDER BY price DESC, name ASC;

-- Limiting results
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
```

### Aggregate Functions

```sql
-- COUNT
SELECT COUNT(*) FROM orders WHERE status = 'completed';

-- SUM, AVG, MIN, MAX
SELECT 
    SUM(total) as total_revenue,
    AVG(total) as avg_order_value,
    MIN(total) as min_order,
    MAX(total) as max_order
FROM orders;

-- GROUP BY
SELECT 
    status,
    COUNT(*) as count,
    SUM(total) as total
FROM orders
GROUP BY status;

-- HAVING (filter groups)
SELECT user_id, COUNT(*) as order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
```

---

## 5. SQL Joins

### Types of Joins

```
Table A: users          Table B: orders
┌────┬───────┐          ┌────┬─────────┐
│ id │ name  │          │ id │ user_id │
├────┼───────┤          ├────┼─────────┤
│ 1  │ Alice │          │ 1  │ 1       │
│ 2  │ Bob   │          │ 2  │ 1       │
│ 3  │ Carol │          │ 3  │ 3       │
└────┴───────┘          │ 4  │ NULL    │
                        └────┴─────────┘
```

### INNER JOIN
Returns only matching rows from both tables.

```sql
SELECT users.name, orders.id as order_id
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Result:
-- Alice | 1
-- Alice | 2
-- Carol | 3
```

### LEFT JOIN (LEFT OUTER JOIN)
Returns all rows from left table, matching rows from right.

```sql
SELECT users.name, orders.id as order_id
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Result:
-- Alice | 1
-- Alice | 2
-- Bob   | NULL
-- Carol | 3
```

### RIGHT JOIN (RIGHT OUTER JOIN)
Returns all rows from right table, matching rows from left.

```sql
SELECT users.name, orders.id as order_id
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;

-- Result:
-- Alice | 1
-- Alice | 2
-- Carol | 3
-- NULL  | 4
```

### FULL OUTER JOIN
Returns all rows from both tables.

```sql
SELECT users.name, orders.id as order_id
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;

-- Result:
-- Alice | 1
-- Alice | 2
-- Bob   | NULL
-- Carol | 3
-- NULL  | 4
```

### Join Visualization

```
INNER JOIN:          LEFT JOIN:           RIGHT JOIN:
   ┌───┐                ┌───┐                ┌───┐
 ┌─┤ A ├─┐            ┌─┤ A ├─┐            ┌─┤ A ├─┐
 │ └───┘ │            │ └───┘ │            │ └───┘ │
 │  ███  │            │██████ │            │  ██████│
 │ ┌───┐ │            │ ┌───┐ │            │ ┌───┐ │
 └─┤ B ├─┘            └─┤ B ├─┘            └─┤ B ├─┘
   └───┘                └───┘                └───┘
 Only overlap        All A + matching B   All B + matching A
```

### Self Join
Join a table to itself.

```sql
-- Find employees and their managers
SELECT e.name as employee, m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

---

## 6. Advanced SQL

### Subqueries

```sql
-- Subquery in WHERE
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 1000);

-- Subquery in SELECT
SELECT name,
    (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as order_count
FROM users;

-- Subquery in FROM (derived table)
SELECT avg_total FROM (
    SELECT user_id, AVG(total) as avg_total
    FROM orders
    GROUP BY user_id
) as user_averages;
```

### Common Table Expressions (CTE)

```sql
WITH high_value_customers AS (
    SELECT user_id, SUM(total) as total_spent
    FROM orders
    GROUP BY user_id
    HAVING SUM(total) > 10000
)
SELECT u.name, hvc.total_spent
FROM users u
JOIN high_value_customers hvc ON u.id = hvc.user_id;
```

### Window Functions

```sql
-- ROW_NUMBER
SELECT name, total,
    ROW_NUMBER() OVER (ORDER BY total DESC) as rank
FROM orders;

-- Running total
SELECT date, amount,
    SUM(amount) OVER (ORDER BY date) as running_total
FROM transactions;

-- Partition by category
SELECT category, product, sales,
    RANK() OVER (PARTITION BY category ORDER BY sales DESC) as category_rank
FROM products;
```

---

## 7. Popular SQL Databases

| Database | Best For | Key Features |
|----------|----------|--------------|
| **PostgreSQL** | Complex queries, JSON | Advanced features, extensions |
| **MySQL** | Web applications | Fast reads, replication |
| **SQL Server** | Enterprise | Integration with Microsoft |
| **Oracle** | Large enterprises | Scalability, support |
| **SQLite** | Embedded, mobile | Zero configuration, file-based |

### PostgreSQL vs MySQL

| Feature | PostgreSQL | MySQL |
|---------|------------|-------|
| ACID Compliance | Full | Full (InnoDB) |
| JSON Support | Excellent (JSONB) | Good |
| Full-text Search | Built-in | Built-in |
| Replication | Logical, streaming | Master-slave |
| Extensions | Rich ecosystem | Limited |
| Use Case | Complex queries | Simple, fast reads |

---

## 8. Summary

- Relational databases organize data in tables with relationships
- Normalization reduces redundancy (1NF → 2NF → 3NF → BCNF)
- Denormalization trades write performance for read performance
- JOINs combine data from multiple tables
- SQL provides powerful querying capabilities
- Choose the right SQL database for your use case

---

## Further Reading
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MySQL Reference Manual](https://dev.mysql.com/doc/)
- [SQL Tutorial - W3Schools](https://www.w3schools.com/sql/)
- [Use The Index, Luke](https://use-the-index-luke.com/)
