# Day 4 Assignment: ACID Properties & Transactions

## Assignment Overview
**Difficulty:** Intermediate to Advanced
**Estimated Time:** 60-75 minutes
**Points:** 100

---

## Part 1: ACID Analysis (25 points)

### Task 1.1 (15 points)
For each scenario, identify which ACID property is at risk and how to protect it:

| Scenario | Property at Risk | Solution |
|----------|-----------------|----------|
| Server crashes mid-transaction | | |
| Two users update same row simultaneously | | |
| Foreign key references deleted row | | |
| Bank transfer debits but credit fails | | |
| Long report reads stale data during updates | | |

### Task 1.2 (10 points)
A banking application has this transaction:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
INSERT INTO audit_log (action, amount, from_id, to_id) VALUES ('transfer', 500, 1, 2);
COMMIT;
```

Explain:
1. What happens if the server crashes after the first UPDATE but before COMMIT?
2. What happens if account 2 doesn't exist (constraint violation)?
3. How does Atomicity protect this transaction?

---

## Part 2: Isolation Levels (30 points)

### Task 2.1 (20 points)
Given these two concurrent transactions, show what happens at each isolation level:

```
Timeline:
T1: BEGIN
T1: SELECT balance FROM accounts WHERE id=1  -- Returns 1000
T2:                BEGIN
T2:                UPDATE accounts SET balance=500 WHERE id=1
T2:                COMMIT
T1: SELECT balance FROM accounts WHERE id=1  -- What does this return?
T1: COMMIT
```

Complete the table:

| Isolation Level | Second SELECT Returns | Anomaly Present? |
|-----------------|----------------------|------------------|
| Read Uncommitted | | |
| Read Committed | | |
| Repeatable Read | | |
| Serializable | | |

### Task 2.2 (10 points)
For each application type, recommend an isolation level and justify:

1. **Banking transactions** (money transfers)
2. **Social media feed** (reading posts)
3. **Inventory management** (stock updates)
4. **Reporting/Analytics** (generating reports)

---

## Part 3: Distributed Transactions (30 points)

### Task 3.1 (15 points)
Design a Saga for an **Order Processing System** that involves:
- Order Service (create order)
- Payment Service (charge credit card)
- Inventory Service (reserve items)
- Shipping Service (schedule delivery)
- Notification Service (send confirmation)

Provide:
1. The sequence of steps
2. Compensating transaction for each step
3. What happens if Inventory Service fails after Payment succeeds

### Task 3.2 (15 points)
Compare Choreography vs Orchestration for your Saga:

| Aspect | Choreography | Orchestration |
|--------|--------------|---------------|
| Coupling | | |
| Complexity | | |
| Debugging | | |
| Single Point of Failure | | |
| Recommended When | | |

Which approach would you choose for this order system? Why?

---

## Part 4: Practical Implementation (15 points)

### Task 4.1 (15 points)
Implement optimistic locking for a **Product Inventory Update**:

1. Write the table schema (including version column)
2. Write the SELECT query to read current state
3. Write the UPDATE query with version check
4. Write application pseudocode handling:
   - Successful update
   - Version conflict (retry logic)
   - Maximum retries exceeded

```sql
-- Your SQL here
```

```python
# Your pseudocode here
def update_inventory(product_id, new_quantity, max_retries=3):
    pass
```

---

## Submission Guidelines

1. Save your answers in `day04_acid_assignment_[yourname].md`
2. Include all SQL and pseudocode
3. Submit by the end of Day 4

## Grading Rubric

| Criteria | Points |
|----------|--------|
| ACID Analysis | 20 |
| Isolation Level Understanding | 25 |
| Distributed Transaction Design | 30 |
| Practical Implementation | 25 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Bonus: Deadlock Analysis
Given this scenario with two tables and two transactions:

```sql
-- Transaction 1
BEGIN;
UPDATE products SET stock = stock - 1 WHERE id = 100;  -- Step A
UPDATE orders SET status = 'processing' WHERE id = 200; -- Step B
COMMIT;

-- Transaction 2
BEGIN;
UPDATE orders SET status = 'processing' WHERE id = 200; -- Step C
UPDATE products SET stock = stock - 1 WHERE id = 100;   -- Step D
COMMIT;
```

1. Draw a diagram showing how deadlock can occur
2. How would the database detect this deadlock?
3. Propose three different solutions to prevent this deadlock
