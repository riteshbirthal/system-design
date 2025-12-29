# Day 5 Assignment: Database Replication

## Assignment Overview
**Difficulty:** Intermediate
**Estimated Time:** 60-90 minutes
**Points:** 100

---

## Part 1: Conceptual Questions (30 points)

### Task 1.1: Replication Topology Selection (15 points)

For each of the following scenarios, recommend the most appropriate replication topology (Master-Slave, Multi-Master, or Cascading) and explain your reasoning:

| Scenario | Topology | Reasoning |
|----------|----------|-----------|
| E-commerce website with 90% reads, 10% writes | | |
| Global collaborative document editing (like Google Docs) | | |
| Banking system requiring strong consistency | | |
| Social media platform with users in 50+ countries | | |
| Log aggregation system with high write throughput | | |

### Task 1.2: Sync vs Async Trade-offs (15 points)

Create a comparison table for a financial trading platform considering:

| Factor | Synchronous Replication | Asynchronous Replication |
|--------|------------------------|--------------------------|
| Write Latency | | |
| Data Loss Risk | | |
| Availability During Network Issues | | |
| Suitable for This Use Case? (Yes/No + Why) | | |

Based on your analysis, which replication mode would you recommend for the trading platform and why?

```
Your recommendation:
[Write 3-4 sentences explaining your choice]
```

---

## Part 2: Replication Lag Handling (35 points)

### Task 2.1: Design Read-Your-Writes Implementation (20 points)

Design a solution for an e-commerce application where users should immediately see their order after placing it, even though order reads typically go to replicas.

**Requirements:**
- Users place orders (writes go to master)
- Order history is read from replicas for performance
- Users should see their new order immediately after placing it

**Your Design:**

```python
# Implement the OrderService class
class OrderService:
    def __init__(self, master_db, replica_db):
        self.master = master_db
        self.replica = replica_db
        # Add any additional data structures you need
        
    def place_order(self, user_id, order_data):
        """
        Place a new order
        Returns: order_id
        """
        # Your implementation here
        pass
    
    def get_user_orders(self, user_id):
        """
        Get all orders for a user
        Should handle read-your-writes consistency
        Returns: list of orders
        """
        # Your implementation here
        pass
    
    def _should_read_from_master(self, user_id):
        """
        Determine if we should read from master for this user
        Returns: boolean
        """
        # Your implementation here
        pass
```

### Task 2.2: Replication Lag Monitoring Query (15 points)

Write SQL queries to monitor replication lag for both PostgreSQL and MySQL:

**PostgreSQL Query:**
```sql
-- Write a query to check replication lag on a PostgreSQL replica
-- Should return: current lag in seconds, bytes behind, last replay timestamp

```

**MySQL Query:**
```sql
-- Write a query to check replication lag on a MySQL slave
-- Should return: seconds behind master, slave status

```

---

## Part 3: Conflict Resolution Design (35 points)

### Task 3.1: Multi-Master Conflict Scenario (15 points)

Consider an inventory management system using multi-master replication across two data centers (DC-A and DC-B). Both receive simultaneous updates to the same product's quantity.

**Scenario:**
```
Initial state: Product X quantity = 100

DC-A receives: "Decrement quantity by 30" (customer purchase)
DC-B receives: "Decrement quantity by 50" (customer purchase)

Both happen at nearly the same time (network partition)
```

**Questions:**

1. What is the correct final quantity? Explain why.
```
Your answer:
```

2. If using Last-Write-Wins, what could go wrong?
```
Your answer:
```

3. Design a better conflict resolution strategy for inventory:
```
Your strategy:
```

### Task 3.2: Implement a CRDT Counter (20 points)

Implement a PN-Counter (Positive-Negative Counter) CRDT that supports both increment and decrement operations.

```python
class PNCounter:
    """
    A CRDT counter that supports both increment and decrement.
    Uses two G-Counters internally: one for increments (P), one for decrements (N).
    Value = sum(P) - sum(N)
    """
    
    def __init__(self, node_id, num_nodes):
        """
        Initialize the PN-Counter for a specific node.
        
        Args:
            node_id: The ID of this node (0 to num_nodes-1)
            num_nodes: Total number of nodes in the cluster
        """
        self.node_id = node_id
        self.num_nodes = num_nodes
        # Initialize P and N counters
        # Your code here
    
    def increment(self, amount=1):
        """Increment the counter by the given amount."""
        # Your code here
        pass
    
    def decrement(self, amount=1):
        """Decrement the counter by the given amount."""
        # Your code here
        pass
    
    def value(self):
        """Return the current value of the counter."""
        # Your code here
        pass
    
    def merge(self, other):
        """
        Merge another PNCounter's state into this one.
        After merging, both counters should converge to the same value.
        """
        # Your code here
        pass
    
    def get_state(self):
        """Return the internal state for debugging."""
        # Your code here
        pass


# Test your implementation
def test_pn_counter():
    # Create two counters for a 2-node cluster
    counter_a = PNCounter(node_id=0, num_nodes=2)
    counter_b = PNCounter(node_id=1, num_nodes=2)
    
    # Node A increments twice
    counter_a.increment()
    counter_a.increment()
    
    # Node B increments once, decrements once
    counter_b.increment()
    counter_b.decrement()
    
    print(f"Counter A value before merge: {counter_a.value()}")  # Should be 2
    print(f"Counter B value before merge: {counter_b.value()}")  # Should be 0
    
    # Merge states
    counter_a.merge(counter_b)
    counter_b.merge(counter_a)
    
    print(f"Counter A value after merge: {counter_a.value()}")  # Should be 2
    print(f"Counter B value after merge: {counter_b.value()}")  # Should be 2
    
    # Both should have the same value
    assert counter_a.value() == counter_b.value(), "Counters should converge!"
    print("Test passed!")

# Run the test
test_pn_counter()
```

---

## Submission Guidelines

1. Save your answers in a document named `day05_assignment_[yourname].md`
2. Include all code implementations
3. Test your code and include the output
4. Submit by the end of Day 5

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Part 1: Topology selection correctness | 15 |
| Part 1: Trade-off analysis quality | 15 |
| Part 2: Read-your-writes implementation | 20 |
| Part 2: Monitoring queries accuracy | 15 |
| Part 3: Conflict scenario analysis | 15 |
| Part 3: CRDT implementation correctness | 20 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Design a Failover System

Design an automatic failover system for a PostgreSQL master-slave setup that:
1. Monitors master health every 5 seconds
2. Promotes a slave to master if the master is unresponsive for 15 seconds
3. Prevents split-brain using a quorum-based approach
4. Updates application connection strings automatically

Provide:
- Architecture diagram
- Pseudocode for the health monitoring and failover logic
- Explanation of how you prevent split-brain

```
Your design:

```
