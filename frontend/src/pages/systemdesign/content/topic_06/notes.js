const notes = `
# Caching Strategies

## Introduction to Caching

**Definition:** Caching stores copies of frequently accessed data in a high-speed storage layer to reduce retrieval time and decrease load on primary data sources.

### Why Caching Matters
- **Performance**: Dramatically reduces response times
- **Scalability**: Offloads traffic from databases
- **Cost**: Reduces expensive database operations
- **User Experience**: Faster load times
- **Reliability**: Can serve data during backend failures

### Cache Hit and Miss
\`\`\`
Cache Hit: Data found in cache → Return immediately (fast)
Cache Miss: Data not in cache → Fetch from source → Store in cache → Return
\`\`\`

**Cache Hit Ratio** = Cache Hits / (Cache Hits + Cache Misses)
- Target: 90%+ for most applications

### Latency Comparison
| Layer | Latency |
|-------|---------|
| L1 Cache | ~0.5 ns |
| L2 Cache | ~7 ns |
| RAM | ~100 ns |
| Redis/Memcached | ~500 μs - 1 ms |
| SSD | ~100 μs |
| Database Query | ~10-100 ms |

---

## Types of Caches

### 1. Client-Side Caching

**Browser Cache:**
- HTTP headers control caching (Cache-Control, ETag, Expires)
- Stores static assets (images, CSS, JavaScript)
\`\`\`
Cache-Control: max-age=3600, public
ETag: "abc123"
\`\`\`

### 2. CDN Caching
- Geographically distributed edge servers
- Reduces latency for global users
- Examples: CloudFlare, Akamai, AWS CloudFront

### 3. Server-Side Caching

**In-Process Cache:**
- Stored in application memory
- Fastest access (no network)
- Not shared across instances

**Distributed Cache:**
- Separate caching servers
- Shared across application instances
- Examples: Redis, Memcached

### 4. Database Caching
- Query result caching
- Buffer pool / shared buffers
- Materialized views

---

## Caching Patterns and Strategies

### 1. Cache-Aside (Lazy Loading)
Application manages both cache and database.

\`\`\`
READ:
1. Check cache for data
2. If HIT: return cached data
3. If MISS: query database → store in cache → return

WRITE:
1. Write to database
2. Invalidate/delete cache entry
\`\`\`

**Pros:** Only requested data cached, cache failure doesn't break system
**Cons:** First request always hits database, potential inconsistency
**Use Cases:** General purpose, read-heavy workloads

### 2. Read-Through Cache
Cache sits between application and database; handles fetching from DB on miss.

**Pros:** Simplifies application code
**Cons:** First request latency, requires cache library support

### 3. Write-Through Cache
Data written to cache and database simultaneously.

**Pros:** Cache always has latest data, no stale reads
**Cons:** Higher write latency
**Use Cases:** Strong consistency requirements

### 4. Write-Behind (Write-Back) Cache
Data written to cache first, asynchronously persisted to database.

**Pros:** Very fast writes, batched database operations
**Cons:** Risk of data loss if cache fails
**Use Cases:** Write-heavy, eventual consistency acceptable

### 5. Write-Around Cache
Data written directly to database, bypassing cache.

**Use Cases:** Write-once, read-rarely scenarios (logs)

### 6. Refresh-Ahead Cache
Proactively refresh cache entries before they expire.

**Pros:** Reduces cache miss latency for hot data
**Use Cases:** Popular data with predictable access patterns

---

## Cache Eviction Policies

When cache is full, which entries to remove?

### 1. LRU (Least Recently Used)
- Remove items not accessed recently
- Most commonly used policy
- Good general-purpose choice

### 2. LFU (Least Frequently Used)
- Remove items with lowest access count
- Keeps frequently accessed items
- May keep stale popular items too long

### 3. FIFO (First In, First Out)
- Remove oldest entries first
- Simple but doesn't consider access patterns

### 4. TTL (Time To Live)
- Entries expire after fixed time
- Used alongside other policies
- Too short: low hit ratio; Too long: stale data

### 5. Redis Eviction Policies
- **allkeys-lru**: Apply LRU to all keys
- **volatile-lru**: Apply LRU only to keys with TTL
- **volatile-ttl**: Evict keys with shortest TTL
- **noeviction**: Return errors when memory full

---

## Cache Invalidation

> "There are only two hard things in Computer Science: cache invalidation and naming things."

### Strategies

**1. Time-Based Expiration (TTL)**
\`cache.set("product:123", data, ttl=300)\`
Simple but may serve stale data within TTL

**2. Event-Based Invalidation**
Invalidate cache when data changes
\`\`\`
def update_product(id, data):
    database.update_product(id, data)
    cache.delete(f"product:{id}")
\`\`\`

**3. Version-Based Invalidation**
Include version in cache key
\`cache_key = f"product:{id}:v{version}"\`

**4. Publish-Subscribe Invalidation**
Broadcast invalidation messages across all nodes

### Race Conditions
Problem: Concurrent read and write can cause stale data in cache.
Solutions: Database timestamps, optimistic locking, short TTL as safety net

---

## Redis Deep Dive

Redis is an in-memory data structure store used as database, cache, and message broker.

### Data Structures

| Structure | Use Case |
|-----------|----------|
| Strings | Simple values, counters |
| Hashes | Objects/maps |
| Lists | Queues, timelines |
| Sets | Unique items, tags |
| Sorted Sets | Leaderboards, rankings |
| Streams | Event logs |
| Bitmaps | Feature flags, activity tracking |
| HyperLogLog | Approximate counting |

### Persistence Options

**RDB (Snapshotting):** Point-in-time snapshots, compact, may lose data between snapshots

**AOF (Append Only File):** Logs every write, more durable, larger files

**Hybrid:** Best of both worlds

### High Availability

**Replication:** Primary-Replica setup for read scaling and failover

**Redis Cluster:** Automatic sharding across 16384 hash slots

**Redis Sentinel:** Monitoring, automatic failover, configuration provider

### Common Patterns
- Session storage
- Rate limiting
- Distributed locking
- Pub/Sub messaging

---

## Redis vs Memcached

| Feature | Redis | Memcached |
|---------|-------|-----------|
| Data Structures | Rich (many types) | Key-value only |
| Persistence | RDB, AOF | None |
| Replication | Built-in | Not built-in |
| Clustering | Redis Cluster | Client-side |
| Threading | Single-threaded | Multi-threaded |
| Pub/Sub | Yes | No |
| Transactions | Yes | No |

**Use Redis:** Rich data structures, persistence, pub/sub, built-in HA
**Use Memcached:** Simple caching, memory efficiency critical, multi-threaded

---

## Distributed Caching Challenges

### Cache Stampede (Thundering Herd)
Popular entry expires → many requests hit database simultaneously

**Solutions:**
1. **Locking:** One request fetches, others wait
2. **Probabilistic early expiration:** Refresh before actual expiry
3. **Background refresh:** Separate process refreshes hot keys

### Consistent Hashing
- Arranges servers on a hash ring
- Keys map to nearest server clockwise
- Adding/removing server only affects neighbors
- Virtual nodes improve load distribution

### Cache Warming
Pre-populate cache before traffic arrives during startups, deployments, or before events.

---

## Best Practices

### 1. Choose Good Cache Keys
\`user:123:profile\`, \`product:456:details:v2\`

### 2. Set Appropriate TTL
- Frequently updated: short TTL (seconds-minutes)
- Static config: long TTL (hours-days)
- Session data: match session timeout

### 3. Handle Cache Failures Gracefully
Fall back to database if cache is down

### 4. Use Namespacing
\`service:module:entity:id:attribute\`

### 5. Monitor Cache Metrics
- Hit/miss ratio
- Memory usage
- Eviction rate
- Latency percentiles

### 6. Avoid Caching
- Frequently changing data (unless write-through)
- Large objects causing memory pressure
- Data with strict consistency requirements
- One-time access data

### 7. Use Compression for Large Values
Reduce memory usage and network transfer
`;

export default notes;
