# Day 4 Quiz: ACID Properties & Transactions

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**What does the "A" in ACID stand for?**

A) Availability
B) Atomicity
C) Accuracy
D) Authentication

<details>
<summary>Answer</summary>
B) Atomicity
</details>

---

### Question 2
**Which ACID property ensures that committed data survives system failures?**

A) Atomicity
B) Consistency
C) Isolation
D) Durability

<details>
<summary>Answer</summary>
D) Durability
</details>

---

### Question 3
**What is a "dirty read"?**

A) Reading corrupted data
B) Reading uncommitted data from another transaction
C) Reading outdated cached data
D) Reading encrypted data

<details>
<summary>Answer</summary>
B) Reading uncommitted data from another transaction
</details>

---

### Question 4
**Which isolation level prevents all concurrency anomalies?**

A) Read Uncommitted
B) Read Committed
C) Repeatable Read
D) Serializable

<details>
<summary>Answer</summary>
D) Serializable
</details>

---

### Question 5
**What happens in a deadlock?**

A) Database crashes
B) Two transactions wait for each other indefinitely
C) All transactions are rolled back
D) Data becomes corrupted

<details>
<summary>Answer</summary>
B) Two transactions wait for each other indefinitely
</details>

---

### Question 6
**What does MVCC stand for?**

A) Multi-Version Concurrency Control
B) Multiple Validation Consistency Check
C) Master-Version Copy Control
D) Memory Virtual Cache Control

<details>
<summary>Answer</summary>
A) Multi-Version Concurrency Control
</details>

---

### Question 7
**In Two-Phase Commit (2PC), what happens in the first phase?**

A) All nodes commit
B) Coordinator asks nodes if they can commit (prepare)
C) Failed nodes are identified
D) Transactions are rolled back

<details>
<summary>Answer</summary>
B) Coordinator asks nodes if they can commit (prepare)
</details>

---

### Question 8
**What is the Saga pattern used for?**

A) Data encryption
B) Managing distributed transactions without 2PC
C) Database backups
D) Query optimization

<details>
<summary>Answer</summary>
B) Managing distributed transactions without 2PC
</details>

---

### Question 9
**In optimistic locking, when is the conflict detected?**

A) Before reading data
B) During the transaction
C) At commit time (version check)
D) After commit

<details>
<summary>Answer</summary>
C) At commit time (version check)
</details>

---

### Question 10
**Why is idempotency important in distributed systems?**

A) It improves query performance
B) It allows safe retries without duplicate effects
C) It prevents data encryption
D) It reduces storage requirements

<details>
<summary>Answer</summary>
B) It allows safe retries without duplicate effects
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! Ready for Day 5
- 7-8 correct: Good understanding, review weak areas
- 5-6 correct: Review the material before proceeding
- Below 5: Re-read Day 4 content thoroughly
