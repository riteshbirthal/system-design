# Day 4: ACID Properties & Transactions

## Learning Objectives
- Understand ACID properties in databases
- Learn transaction management
- Master isolation levels and their trade-offs
- Understand common concurrency anomalies
- Learn distributed transaction patterns

---

## 1. What are Transactions?

A transaction is a sequence of database operations that are treated as a single logical unit of work.

```sql
-- Example: Bank transfer
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- Debit
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- Credit
COMMIT;
-- Both succeed OR both fail
```

---

## 2. ACID Properties

### Atomicity
**All or nothing** - Either all operations in a transaction complete, or none do.

```
Transaction:
1. Debit $100 from Account A  ✓
2. Credit $100 to Account B   ✗ (fails)

Result with Atomicity:
→ Rollback step 1
→ Account A unchanged
→ No money lost
```

### Consistency
**Valid state to valid state** - Database remains in a consistent state before and after transaction.

```
Constraints maintained:
- Foreign keys valid
- Unique constraints satisfied
- Check constraints pass
- Total money in system unchanged (for transfers)
```

### Isolation
**Transactions don't interfere** - Concurrent transactions appear to execute serially.

```
T1: Read balance → $100
T2:                        Read balance → $100
T1: Debit $50 → $50
T2:                        Debit $50 → $50  ← Problem without isolation!

With proper isolation:
T1: Read → Debit → Commit
T2:                         Read → Debit → Commit
Final: $0 (correct)
```

### Durability
**Permanent once committed** - Committed transactions survive system failures.

```
1. Transaction commits
2. "Commit successful" returned to client
3. Server crashes
4. Server restarts
→ Transaction data is still there (WAL/redo logs)
```

---

## 3. Transaction Isolation Levels

### Isolation Level Comparison

| Level | Dirty Read | Non-Repeatable Read | Phantom Read | Performance |
|-------|------------|---------------------|--------------|-------------|
| Read Uncommitted | Possible | Possible | Possible | Fastest |
| Read Committed | Prevented | Possible | Possible | Fast |
| Repeatable Read | Prevented | Prevented | Possible | Medium |
| Serializable | Prevented | Prevented | Prevented | Slowest |

### Concurrency Anomalies

#### Dirty Read
Reading uncommitted data from another transaction.
```
T1: UPDATE balance SET amount = 200   -- Not yet committed
T2:      SELECT amount  →  200        -- Reads dirty data
T1: ROLLBACK
T2:      Now has wrong value!
```

#### Non-Repeatable Read
Same query returns different results within a transaction.
```
T1: SELECT amount → 100
T2:                    UPDATE amount = 200; COMMIT
T1: SELECT amount → 200  -- Different!
```

#### Phantom Read
New rows appear in repeated queries.
```
T1: SELECT * WHERE status='pending' → 5 rows
T2:              INSERT new pending row; COMMIT
T1: SELECT * WHERE status='pending' → 6 rows  -- Phantom!
```

### Setting Isolation Level

```sql
-- PostgreSQL
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
    -- your operations
COMMIT;

-- MySQL
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
    -- your operations
COMMIT;
```

---

## 4. Locking Mechanisms

### Types of Locks

| Lock Type | Read | Write | Use Case |
|-----------|------|-------|----------|
| Shared (S) | ✓ | ✗ | Reading data |
| Exclusive (X) | ✗ | ✗ | Writing data |
| Update (U) | ✓ | Convert to X | Read-then-write |

### Lock Granularity

```
Table Lock:   [=============== Table ================]
              Coarse-grained, less concurrency

Page Lock:    [Page 1][Page 2][Page 3][Page 4][Page 5]
              Medium granularity

Row Lock:     [R1][R2][R3][R4][R5][R6][R7][R8][R9][R10]
              Fine-grained, high concurrency, more overhead
```

### Deadlocks

```
T1: Lock Row A  →  Want Lock Row B  (waiting for T2)
T2: Lock Row B  →  Want Lock Row A  (waiting for T1)
→ DEADLOCK!

Resolution:
1. Detection: Database detects cycle
2. Victim selection: One transaction is rolled back
3. Retry: Application retries failed transaction
```

### Deadlock Prevention

```sql
-- Always lock in consistent order
-- Instead of:
T1: Lock A, then B
T2: Lock B, then A

-- Do:
T1: Lock A, then B
T2: Lock A, then B  (same order)
```

---

## 5. MVCC (Multi-Version Concurrency Control)

Used by PostgreSQL, MySQL InnoDB, and others. Readers don't block writers, writers don't block readers.

```
Row versions:
┌──────────────────────────────────────────────────┐
│ Row ID: 1                                         │
├──────────────────────────────────────────────────┤
│ Version 1 (xmin=100, xmax=105): balance = 100    │
│ Version 2 (xmin=105, xmax=∞):   balance = 150    │
└──────────────────────────────────────────────────┘

T1 (started at 103): Sees Version 1 (balance = 100)
T2 (started at 107): Sees Version 2 (balance = 150)
```

### MVCC Benefits
- Readers never block writers
- Writers never block readers
- Better concurrency than locking
- Consistent snapshots for long queries

### MVCC Cleanup (Vacuum)
```sql
-- PostgreSQL: Remove old versions
VACUUM ANALYZE table_name;

-- Autovacuum runs automatically
-- But may need manual vacuum for busy tables
```

---

## 6. Distributed Transactions

### Two-Phase Commit (2PC)

```
          Coordinator
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
 Node A    Node B    Node C

Phase 1 (Prepare):
Coordinator: "Can you commit?"
Node A: "Yes, prepared"
Node B: "Yes, prepared"
Node C: "Yes, prepared"

Phase 2 (Commit):
Coordinator: "Commit!"
All nodes commit.
```

### 2PC Problems
- **Blocking**: Nodes wait during uncertainty
- **Coordinator failure**: Participants stuck in prepared state
- **Performance**: Multiple network round trips

### Saga Pattern (Alternative to 2PC)

```
Instead of distributed transaction:

Step 1: Order Service  → Create order
Step 2: Payment Service → Charge payment
Step 3: Inventory Service → Reserve items
Step 4: Shipping Service → Schedule shipping

If Step 3 fails:
Compensating transactions:
- Refund payment (undo Step 2)
- Cancel order (undo Step 1)
```

### Saga Implementation

```
Choreography (Event-driven):
Order Created → Payment Charged → Items Reserved → Shipped
      ↓               ↓                ↓
   On failure, each service listens and compensates

Orchestration (Central coordinator):
Saga Orchestrator manages all steps
└── Order Service → Payment Service → Inventory → Shipping
    Orchestrator calls each, handles failures
```

---

## 7. Practical Transaction Patterns

### Optimistic Locking

```sql
-- Add version column
ALTER TABLE products ADD version INT DEFAULT 0;

-- Read
SELECT id, name, price, version FROM products WHERE id = 1;
-- Returns: version = 5

-- Update with version check
UPDATE products 
SET price = 29.99, version = version + 1
WHERE id = 1 AND version = 5;

-- If affected_rows = 0, someone else modified it
-- Retry the operation
```

### Pessimistic Locking

```sql
-- Explicitly lock row for update
BEGIN;
SELECT * FROM products WHERE id = 1 FOR UPDATE;
-- Row is locked until commit

UPDATE products SET price = 29.99 WHERE id = 1;
COMMIT;
```

### Idempotent Operations

```sql
-- Idempotent: Can be retried safely
UPDATE users SET email = 'new@email.com' WHERE id = 1;
-- Running twice has same effect

-- NOT idempotent: Dangerous to retry
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
-- Running twice doubles the credit

-- Make it idempotent with transaction ID
INSERT INTO transactions (id, account_id, amount) 
VALUES ('txn-123', 1, 100)
ON CONFLICT (id) DO NOTHING;  -- Ignore if already exists
```

---

## 8. Summary

| Property | Ensures | Trade-off |
|----------|---------|-----------|
| Atomicity | All-or-nothing | Rollback overhead |
| Consistency | Valid states | Constraint checking |
| Isolation | No interference | Reduced concurrency |
| Durability | Data survives failures | Write overhead |

### Key Takeaways
- ACID ensures data integrity
- Isolation levels balance consistency vs performance
- MVCC enables high concurrency
- Distributed transactions are complex - consider Sagas
- Use optimistic locking for high-read, low-conflict scenarios
- Design for idempotency in distributed systems

---

## Further Reading
- [PostgreSQL: Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [Designing Data-Intensive Applications - Chapter 7](https://dataintensive.net/)
- [Saga Pattern - Microservices.io](https://microservices.io/patterns/data/saga.html)
