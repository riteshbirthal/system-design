# Day 5: Database Replication

## Learning Objectives
- Understand why database replication is essential
- Learn different replication topologies (Master-Slave, Multi-Master)
- Master synchronous vs asynchronous replication trade-offs
- Understand replication lag and how to handle it
- Learn conflict resolution strategies including CRDTs

---

## 1. Why Database Replication?

Database replication is the process of copying and maintaining database objects across multiple databases to ensure data availability, fault tolerance, and improved performance.

### Key Benefits

| Benefit | Description |
|---------|-------------|
| **High Availability** | If primary fails, replicas can take over |
| **Disaster Recovery** | Data survives regional outages |
| **Read Scalability** | Distribute read load across replicas |
| **Geographic Distribution** | Serve data closer to users |
| **Load Balancing** | Reduce load on primary database |
| **Backup** | Replicas serve as live backups |

### Real-World Use Cases

```
Netflix: Multiple replicas across AWS regions for global streaming
Twitter: Read replicas to handle 500M+ tweets/day reads
Instagram: Geo-distributed replicas for 2B+ users worldwide
```

---

## 2. Replication Topologies

### 2.1 Master-Slave (Primary-Replica) Replication

The most common replication setup where one master handles all writes and slaves replicate data for reads.

```
                    ┌─────────────┐
                    │   Client    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
            ┌───────│   Master    │───────┐
            │       │  (Writes)   │       │
            │       └──────┬──────┘       │
            │              │              │
            ▼              ▼              ▼
    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │  Slave 1  │  │  Slave 2  │  │  Slave 3  │
    │  (Reads)  │  │  (Reads)  │  │  (Reads)  │
    └───────────┘  └───────────┘  └───────────┘
```

**How It Works:**
1. All write operations go to the master
2. Master logs changes to binary log (MySQL) or WAL (PostgreSQL)
3. Slaves pull changes and apply them
4. Read queries can be distributed to slaves

**Advantages:**
- Simple to set up and understand
- Clear write path (no conflicts)
- Easy to scale reads
- Slaves can be used for backups/analytics

**Disadvantages:**
- Single point of failure for writes
- Write scalability limited to single node
- Replication lag can cause stale reads
- Failover requires manual or automated promotion

### 2.2 Multi-Master Replication

Multiple nodes can accept write operations, providing higher availability and write scalability.

```
    ┌─────────────┐           ┌─────────────┐
    │  Master 1   │◄─────────►│  Master 2   │
    │(Reads/Writes)           │(Reads/Writes)│
    └──────┬──────┘           └──────┬──────┘
           │                         │
           │    ┌─────────────┐     │
           └────►│  Master 3   │◄────┘
                │(Reads/Writes)│
                └─────────────┘
```

**Advantages:**
- No single point of failure
- Write operations on any node
- Better write availability
- Geographic distribution for low latency

**Disadvantages:**
- Conflict resolution is complex
- Data consistency challenges
- Higher operational complexity
- Network partition handling is harder

### 2.3 Cascading Replication

Slaves can act as masters for other slaves, reducing load on the primary.

```
    ┌─────────────┐
    │   Master    │
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │  Slave 1    │ (also acts as master for Slave 3, 4)
    └──────┬──────┘
      ┌────┴────┐
      ▼         ▼
┌─────────┐ ┌─────────┐
│ Slave 3 │ │ Slave 4 │
└─────────┘ └─────────┘
```

**Use Cases:**
- Large-scale deployments with many replicas
- Cross-datacenter replication
- Reducing network load on master

---

## 3. Synchronous vs Asynchronous Replication

### 3.1 Synchronous Replication

The master waits for acknowledgment from replica(s) before confirming the write to the client.

```
Client        Master        Replica
  │             │             │
  │──Write────►│             │
  │             │──Replicate─►│
  │             │             │
  │             │◄──ACK───────│
  │◄──Success───│             │
  │             │             │
```

**Characteristics:**
- Strong consistency guarantee
- Zero data loss on failover
- Higher write latency
- Reduced availability (if replica is down)

**PostgreSQL Synchronous Replication:**
```sql
-- postgresql.conf on master
synchronous_commit = on
synchronous_standby_names = 'replica1'

-- Check sync status
SELECT * FROM pg_stat_replication;
```

### 3.2 Asynchronous Replication

The master confirms the write immediately without waiting for replicas.

```
Client        Master        Replica
  │             │             │
  │──Write────►│             │
  │◄──Success───│             │
  │             │──Replicate─►│ (later)
  │             │             │
```

**Characteristics:**
- Lower write latency
- Higher availability
- Potential data loss on failover
- Eventual consistency

**MySQL Asynchronous Replication:**
```sql
-- On master, check binary log position
SHOW MASTER STATUS;

-- On slave
CHANGE MASTER TO
    MASTER_HOST='master_host',
    MASTER_USER='repl_user',
    MASTER_PASSWORD='password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=107;

START SLAVE;
```

### 3.3 Semi-Synchronous Replication

A hybrid approach - master waits for at least one replica to acknowledge.

```
Client        Master       Replica1      Replica2
  │             │             │             │
  │──Write────►│             │             │
  │             │──Replicate─►│             │
  │             │──Replicate──────────────►│
  │             │◄──ACK───────│             │
  │◄──Success───│             │             │ (ACK arrives later)
```

**MySQL Semi-Sync:**
```sql
-- Enable semi-sync on master
INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';
SET GLOBAL rpl_semi_sync_master_enabled = 1;

-- Enable on slave
INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';
SET GLOBAL rpl_semi_sync_slave_enabled = 1;
```

### Comparison Table

| Aspect | Synchronous | Asynchronous | Semi-Synchronous |
|--------|-------------|--------------|------------------|
| Consistency | Strong | Eventual | Strong (1 replica) |
| Write Latency | High | Low | Medium |
| Data Loss Risk | None | Possible | Minimal |
| Availability | Lower | Higher | Medium |
| Use Case | Financial | Social media | E-commerce |

---

## 4. Replication Lag

Replication lag is the delay between a write on the master and when that write is visible on replicas.

### Causes of Replication Lag

1. **Network Latency** - Distance between master and replica
2. **Heavy Write Load** - Replica can't keep up with master
3. **Long-Running Transactions** - Large transactions block replication
4. **Resource Constraints** - CPU, memory, or disk I/O limitations
5. **Lock Contention** - Concurrent queries on replica

### Measuring Replication Lag

**PostgreSQL:**
```sql
-- On replica
SELECT 
    pg_last_wal_receive_lsn() AS received,
    pg_last_wal_replay_lsn() AS replayed,
    pg_last_xact_replay_timestamp() AS last_replay_time,
    NOW() - pg_last_xact_replay_timestamp() AS replication_lag;
```

**MySQL:**
```sql
-- On slave
SHOW SLAVE STATUS\G
-- Look for: Seconds_Behind_Master
```

### Handling Replication Lag in Applications

#### Strategy 1: Read-Your-Writes Consistency

After a write, route subsequent reads from that user to the master.

```python
class DatabaseRouter:
    def __init__(self):
        self.user_write_timestamps = {}  # user_id -> timestamp
        self.lag_threshold = 5  # seconds
    
    def route_read(self, user_id, query):
        last_write = self.user_write_timestamps.get(user_id, 0)
        time_since_write = time.time() - last_write
        
        if time_since_write < self.lag_threshold:
            return self.master.execute(query)  # Read from master
        else:
            return self.replica.execute(query)  # Read from replica
    
    def route_write(self, user_id, query):
        result = self.master.execute(query)
        self.user_write_timestamps[user_id] = time.time()
        return result
```

#### Strategy 2: Monotonic Reads

Ensure a user always reads from the same replica to avoid going "back in time."

```python
class MonotonicReadRouter:
    def __init__(self, replicas):
        self.replicas = replicas
        self.user_replica_map = {}
    
    def get_replica_for_user(self, user_id):
        if user_id not in self.user_replica_map:
            # Consistent hashing to assign replica
            replica_index = hash(user_id) % len(self.replicas)
            self.user_replica_map[user_id] = self.replicas[replica_index]
        return self.user_replica_map[user_id]
```

#### Strategy 3: Version-Based Reads

Track logical timestamps and reject stale reads.

```python
class VersionedRead:
    def read_with_version(self, key, min_version=None):
        data = self.replica.get(key)
        
        if min_version and data.version < min_version:
            # Replica is behind, read from master
            data = self.master.get(key)
        
        return data, data.version
    
    def write_with_version(self, key, value):
        result = self.master.set(key, value)
        return result.version  # Return version to client
```

---

## 5. Conflict Resolution in Multi-Master

When multiple masters accept writes simultaneously, conflicts can occur.

### Common Conflict Types

1. **Write-Write Conflict**: Same row updated on different masters
2. **Insert-Insert Conflict**: Same primary key inserted on different masters  
3. **Delete-Update Conflict**: Row deleted on one master, updated on another

### Resolution Strategies

#### 5.1 Last-Write-Wins (LWW)

Use timestamps to determine which write survives.

```
Master A: UPDATE users SET name='Alice' WHERE id=1  [timestamp: 1000]
Master B: UPDATE users SET name='Bob' WHERE id=1    [timestamp: 1001]

Result: name = 'Bob' (higher timestamp wins)
```

**Pros:** Simple, deterministic
**Cons:** Can lose data, clock synchronization issues

#### 5.2 Application-Level Resolution

Let the application decide how to merge conflicts.

```python
def resolve_conflict(master_a_value, master_b_value):
    # Custom business logic
    if master_a_value['priority'] > master_b_value['priority']:
        return master_a_value
    return master_b_value
```

#### 5.3 CRDTs (Conflict-free Replicated Data Types)

Data structures designed to automatically merge without conflicts.

**G-Counter (Grow-only Counter):**
```python
class GCounter:
    def __init__(self, node_id, num_nodes):
        self.node_id = node_id
        self.counts = [0] * num_nodes
    
    def increment(self):
        self.counts[self.node_id] += 1
    
    def value(self):
        return sum(self.counts)
    
    def merge(self, other):
        # Take max of each node's count
        for i in range(len(self.counts)):
            self.counts[i] = max(self.counts[i], other.counts[i])

# Usage
node_a = GCounter(node_id=0, num_nodes=3)
node_b = GCounter(node_id=1, num_nodes=3)

node_a.increment()  # counts = [1, 0, 0]
node_b.increment()  # counts = [0, 1, 0]
node_b.increment()  # counts = [0, 2, 0]

node_a.merge(node_b)  # counts = [1, 2, 0], value = 3
```

**LWW-Register:**
```python
class LWWRegister:
    def __init__(self):
        self.value = None
        self.timestamp = 0
    
    def write(self, value, timestamp):
        if timestamp > self.timestamp:
            self.value = value
            self.timestamp = timestamp
    
    def merge(self, other):
        if other.timestamp > self.timestamp:
            self.value = other.value
            self.timestamp = other.timestamp
```

**OR-Set (Observed-Remove Set):**
```python
class ORSet:
    def __init__(self):
        self.elements = {}  # element -> set of unique tags
    
    def add(self, element):
        unique_tag = uuid.uuid4()
        if element not in self.elements:
            self.elements[element] = set()
        self.elements[element].add(unique_tag)
    
    def remove(self, element):
        if element in self.elements:
            self.elements[element] = set()  # Clear all tags
    
    def contains(self, element):
        return element in self.elements and len(self.elements[element]) > 0
    
    def merge(self, other):
        # Union of all elements and their tags
        for element, tags in other.elements.items():
            if element not in self.elements:
                self.elements[element] = set()
            self.elements[element] = self.elements[element].union(tags)
```

---

## 6. Failover Strategies

### Automatic Failover

```
       ┌─────────────────┐
       │  Health Monitor │
       │   (Sentinel/    │
       │    Patroni)     │
       └────────┬────────┘
                │ monitors
        ┌───────┴───────┐
        ▼               ▼
  ┌──────────┐    ┌──────────┐
  │  Master  │    │  Slave   │
  │  (Down)  │    │(Promoted)│
  └──────────┘    └──────────┘
```

**PostgreSQL with Patroni:**
```yaml
# patroni.yml
scope: postgres-cluster
name: node1

restapi:
  listen: 0.0.0.0:8008

bootstrap:
  dcs:
    ttl: 30
    loop_wait: 10
    retry_timeout: 10
    maximum_lag_on_failover: 1048576

postgresql:
  listen: 0.0.0.0:5432
  data_dir: /var/lib/postgresql/data
```

**Redis Sentinel:**
```bash
# sentinel.conf
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
sentinel parallel-syncs mymaster 1
```

### Split-Brain Prevention

When network partitions cause multiple masters to think they're the leader.

**Solution 1: Quorum-Based Decisions**
```
3-node cluster: Need 2 nodes to agree (majority)
5-node cluster: Need 3 nodes to agree (majority)
```

**Solution 2: Fencing (STONITH)**
```bash
# Power off the old master to prevent split-brain
ipmitool -H old_master_ip power off
```

---

## 7. Replication in Popular Databases

### PostgreSQL Streaming Replication
```sql
-- On master: postgresql.conf
wal_level = replica
max_wal_senders = 3
wal_keep_segments = 64

-- Create replication user
CREATE USER replicator REPLICATION LOGIN ENCRYPTED PASSWORD 'secret';

-- On slave: recovery.conf (PostgreSQL 11-)
-- or postgresql.conf (PostgreSQL 12+)
primary_conninfo = 'host=master_ip user=replicator password=secret'
```

### MySQL Group Replication
```sql
-- Enable group replication
SET GLOBAL group_replication_bootstrap_group=ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group=OFF;

-- Check status
SELECT * FROM performance_schema.replication_group_members;
```

### MongoDB Replica Set
```javascript
// Initialize replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongo1:27017", priority: 2 },
    { _id: 1, host: "mongo2:27017", priority: 1 },
    { _id: 2, host: "mongo3:27017", priority: 1, arbiterOnly: true }
  ]
});

// Check status
rs.status();
```

---

## 8. Summary

| Concept | Key Takeaway |
|---------|--------------|
| Master-Slave | Simple, good for read scaling, single write point |
| Multi-Master | High availability, complex conflict resolution |
| Sync Replication | Strong consistency, higher latency |
| Async Replication | Low latency, eventual consistency |
| Replication Lag | Handle with read-your-writes, version tracking |
| CRDTs | Automatic conflict resolution, no coordination |
| Failover | Automate with Patroni, Sentinel, or similar |

### Decision Framework

```
Need strong consistency? → Synchronous replication
Need low write latency? → Asynchronous replication
Need write scaling? → Multi-master with CRDTs
Need simple operations? → Master-slave with async
Need zero data loss? → Synchronous + quorum
```

---

## Further Reading

- [PostgreSQL High Availability Documentation](https://postgresql.org/docs/current/high-availability.html)
- [MySQL Replication Documentation](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [Designing Data-Intensive Applications - Chapter 5](https://dataintensive.net/)
- [CRDTs: The Hard Parts](https://martin.kleppmann.com/2020/07/06/crdt-hard-parts-hydra.html)
- [Jepsen: Distributed Systems Safety Research](https://jepsen.io/)
