# Day 1 Quiz: SQL Databases

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**What is the primary purpose of database normalization?**

A) Improve query performance
B) Reduce data redundancy and improve integrity
C) Add more tables to the database
D) Increase storage requirements

<details>
<summary>Answer</summary>
B) Reduce data redundancy and improve integrity
</details>

---

### Question 2
**Which normal form requires atomic (indivisible) values in each column?**

A) Second Normal Form (2NF)
B) Third Normal Form (3NF)
C) First Normal Form (1NF)
D) BCNF

<details>
<summary>Answer</summary>
C) First Normal Form (1NF)
</details>

---

### Question 3
**What does a Foreign Key do?**

A) Uniquely identifies each row in a table
B) References a primary key in another table
C) Encrypts sensitive data
D) Indexes the column for faster searches

<details>
<summary>Answer</summary>
B) References a primary key in another table
</details>

---

### Question 4
**Which JOIN returns all rows from the left table and matching rows from the right?**

A) INNER JOIN
B) RIGHT JOIN
C) LEFT JOIN
D) CROSS JOIN

<details>
<summary>Answer</summary>
C) LEFT JOIN
</details>

---

### Question 5
**What SQL clause is used to filter grouped results?**

A) WHERE
B) HAVING
C) GROUP BY
D) ORDER BY

<details>
<summary>Answer</summary>
B) HAVING (WHERE filters rows before grouping, HAVING filters after)
</details>

---

### Question 6
**Which of the following is a violation of Third Normal Form (3NF)?**

A) Multiple values in a single column
B) Partial dependency on primary key
C) Transitive dependency (non-key depends on non-key)
D) Duplicate rows

<details>
<summary>Answer</summary>
C) Transitive dependency (non-key depends on non-key)
</details>

---

### Question 7
**When should you consider denormalizing a database?**

A) When write performance is critical
B) When read performance is critical and data is read-heavy
C) When storage space is limited
D) When data integrity is the top priority

<details>
<summary>Answer</summary>
B) When read performance is critical and data is read-heavy
</details>

---

### Question 8
**What does the COUNT(*) function return for a table with some NULL values?**

A) Count of non-NULL values only
B) Count of all rows including those with NULL
C) Returns NULL
D) Throws an error

<details>
<summary>Answer</summary>
B) Count of all rows including those with NULL
</details>

---

### Question 9
**Which SQL database is known for excellent JSON/JSONB support and extensions?**

A) MySQL
B) SQLite
C) PostgreSQL
D) Oracle

<details>
<summary>Answer</summary>
C) PostgreSQL
</details>

---

### Question 10
**What is the result of an INNER JOIN when there are no matching rows?**

A) All rows from the left table
B) All rows from the right table
C) An empty result set
D) All rows from both tables

<details>
<summary>Answer</summary>
C) An empty result set
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! Ready for Day 2
- 7-8 correct: Good understanding, review weak areas
- 5-6 correct: Review the material before proceeding
- Below 5: Re-read Day 1 content thoroughly
