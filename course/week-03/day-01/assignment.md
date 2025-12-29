# Day 1 Assignment: SQL Databases

## Assignment Overview
**Difficulty:** Intermediate
**Estimated Time:** 60-75 minutes
**Points:** 100

---

## Part 1: Normalization (30 points)

### Task 1.1 (20 points)
Given the following unnormalized table, normalize it to 3NF:

**Original Table: StudentCourses**
| StudentID | StudentName | StudentEmail | CourseID | CourseName | InstructorID | InstructorName | Grade |
|-----------|-------------|--------------|----------|------------|--------------|----------------|-------|
| 1 | John | john@u.edu | CS101 | Intro to CS | 10 | Dr. Smith | A |
| 1 | John | john@u.edu | CS102 | Data Structures | 10 | Dr. Smith | B |
| 2 | Jane | jane@u.edu | CS101 | Intro to CS | 10 | Dr. Smith | A |
| 2 | Jane | jane@u.edu | CS103 | Algorithms | 20 | Dr. Jones | A |

Provide:
1. Identify all functional dependencies
2. Show the table in 1NF (if not already)
3. Convert to 2NF with explanations
4. Convert to 3NF with explanations
5. Final schema with CREATE TABLE statements

### Task 1.2 (10 points)
Explain a scenario where you would intentionally denormalize a database. Include:
- The business context
- What you would denormalize
- The trade-offs you accept
- How you would handle data consistency

---

## Part 2: SQL Queries (40 points)

### Task 2.1 (25 points)
Given the following schema:

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255),
    country VARCHAR(50),
    created_at TIMESTAMP
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    total DECIMAL(10,2),
    status VARCHAR(20),
    created_at TIMESTAMP
);

CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT,
    unit_price DECIMAL(10,2)
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2)
);
```

Write SQL queries for:

1. **Find all customers who have never placed an order**
```sql
-- Your query here
```

2. **Find the top 5 customers by total spending**
```sql
-- Your query here
```

3. **Find the most popular product in each category (by quantity sold)**
```sql
-- Your query here
```

4. **Find customers who have ordered every product in the 'Electronics' category**
```sql
-- Your query here
```

5. **Calculate month-over-month revenue growth**
```sql
-- Your query here
```

### Task 2.2 (15 points)
Explain the difference between these queries and when you would use each:

```sql
-- Query A
SELECT * FROM orders WHERE customer_id IN 
    (SELECT id FROM customers WHERE country = 'USA');

-- Query B
SELECT o.* FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE c.country = 'USA';

-- Query C
SELECT * FROM orders WHERE EXISTS 
    (SELECT 1 FROM customers WHERE customers.id = orders.customer_id AND country = 'USA');
```

---

## Part 3: Schema Design (30 points)

### Task 3.1 (30 points)
Design a database schema for an **Online Learning Platform** with:
- Users (students and instructors)
- Courses (with categories)
- Lessons (within courses)
- Enrollments
- Progress tracking
- Quizzes and quiz attempts
- Certificates

Provide:
1. **Entity Relationship Diagram (ERD)** - Show all entities and relationships
2. **CREATE TABLE statements** for all tables
3. **Sample data** - INSERT statements for at least 2-3 rows per table
4. **Justification** for your design decisions (normalization level, data types chosen)

---

## Submission Guidelines

1. Save your answers in `day01_sql_assignment_[yourname].md`
2. Include SQL queries with proper formatting
3. Include ERD diagram (can be ASCII art or image)
4. Submit by the end of Day 1

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Normalization Correctness | 25 |
| SQL Query Accuracy | 35 |
| Schema Design Quality | 30 |
| Documentation & Formatting | 10 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Bonus: Query Optimization
Given this slow query:

```sql
SELECT c.name, COUNT(*) as order_count, SUM(o.total) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.created_at > '2024-01-01'
GROUP BY c.id, c.name
HAVING SUM(o.total) > 1000
ORDER BY total_spent DESC;
```

1. Identify potential performance issues
2. Suggest indexes to create
3. Rewrite the query for better performance
4. Explain your optimizations
