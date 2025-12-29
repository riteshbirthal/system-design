# Day 3 Quiz: Indexing & Query Optimization

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**What is the time complexity of a B-tree index lookup?**

A) O(1)
B) O(log n)
C) O(n)
D) O(n²)

<details>
<summary>Answer</summary>
B) O(log n)
</details>

---

### Question 2
**Given a composite index on (A, B, C), which query can use this index?**

A) WHERE B = 1
B) WHERE B = 1 AND C = 2
C) WHERE A = 1 AND C = 2
D) WHERE A = 1 AND B = 2

<details>
<summary>Answer</summary>
D) WHERE A = 1 AND B = 2 (follows leftmost prefix rule)
</details>

---

### Question 3
**Which index type is best for exact equality lookups only?**

A) B-tree
B) Hash
C) GiST
D) BRIN

<details>
<summary>Answer</summary>
B) Hash
</details>

---

### Question 4
**What is a "covering index"?**

A) An index that covers all tables in a database
B) An index that contains all columns needed by a query
C) An index that covers the primary key
D) An encrypted index

<details>
<summary>Answer</summary>
B) An index that contains all columns needed by a query
</details>

---

### Question 5
**Which scan type in EXPLAIN output indicates the best performance?**

A) Seq Scan
B) Index Scan
C) Index Only Scan
D) Bitmap Index Scan

<details>
<summary>Answer</summary>
C) Index Only Scan (no table access needed)
</details>

---

### Question 6
**Why might this query not use an index on the email column?**
```sql
SELECT * FROM users WHERE LOWER(email) = 'john@example.com'
```

A) Index is corrupted
B) Function on column prevents index usage
C) Query is too complex
D) email column doesn't exist

<details>
<summary>Answer</summary>
B) Function on column prevents index usage
</details>

---

### Question 7
**What is a disadvantage of having many indexes on a table?**

A) Slower read queries
B) Slower write operations
C) Increased security risk
D) Reduced query flexibility

<details>
<summary>Answer</summary>
B) Slower write operations (each index must be updated)
</details>

---

### Question 8
**Which index type is best for JSONB array columns in PostgreSQL?**

A) B-tree
B) Hash
C) GIN
D) BRIN

<details>
<summary>Answer</summary>
C) GIN (Generalized Inverted Index)
</details>

---

### Question 9
**When should you NOT create an index?**

A) On primary key columns
B) On columns frequently used in WHERE clauses
C) On columns with very low cardinality (few distinct values)
D) On foreign key columns

<details>
<summary>Answer</summary>
C) On columns with very low cardinality (low selectivity = index not effective)
</details>

---

### Question 10
**What does the "cost" value in EXPLAIN output represent?**

A) Actual execution time
B) Estimated execution cost (lower is better)
C) Memory usage
D) Number of rows scanned

<details>
<summary>Answer</summary>
B) Estimated execution cost (lower is better)
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! Ready for Day 4
- 7-8 correct: Good understanding, review weak areas
- 5-6 correct: Review the material before proceeding
- Below 5: Re-read Day 3 content thoroughly
