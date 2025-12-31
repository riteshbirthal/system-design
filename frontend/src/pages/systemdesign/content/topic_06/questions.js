const questions = [
  {
    question: "What is caching and why is it important?",
    answer: "Caching stores frequently accessed data in a fast storage layer (cache) to reduce retrieval time and decrease load on primary data sources like databases. Benefits: dramatically faster response times, reduced database load, improved scalability, cost savings (fewer queries), better user experience, and can serve data during backend failures.",
    difficulty: "Easy"
  },
  {
    question: "What is cache hit and cache miss?",
    answer: "Cache Hit: When requested data is found in the cache, returning immediately (fast response). Cache Miss: When data is not in cache, requiring fetch from the source, storing in cache, then returning (slower response). Cache hit ratio = Hits / (Hits + Misses). Target 90%+ for effective caching.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between Redis and Memcached?",
    answer: "Redis: Rich data structures (strings, hashes, lists, sets, sorted sets), persistence (RDB/AOF), built-in replication and clustering, pub/sub, transactions, single-threaded. Memcached: Simple key-value only, no persistence, client-side sharding, multi-threaded, better memory efficiency. Choose Redis for complex features; Memcached for simple, fast caching.",
    difficulty: "Easy"
  },
  {
    question: "What is the cache-aside pattern?",
    answer: "Cache-aside (lazy loading): Application manages both cache and database separately. Read: Check cache first, if miss fetch from DB and store in cache. Write: Update database, then invalidate/delete cache entry. Pros: only caches what's needed, cache failure doesn't break system. Cons: first request always slow, potential inconsistency.",
    difficulty: "Easy"
  },
  {
    question: "What is TTL in caching?",
    answer: "TTL (Time To Live) is the duration a cached entry remains valid before expiring. After TTL expires, the entry is removed or refreshed. It helps prevent serving stale data indefinitely. Too short: low hit ratio, more DB load. Too long: stale data served.",
    difficulty: "Easy"
  },
  {
    question: "What is LRU eviction policy?",
    answer: "LRU (Least Recently Used) removes items that haven't been accessed recently when cache is full. It assumes recently accessed items are more likely to be accessed again. Most commonly used eviction policy. Good general-purpose choice but doesn't consider access frequency.",
    difficulty: "Easy"
  },
  {
    question: "What data structures does Redis support?",
    answer: "Redis supports: Strings (simple values, counters), Hashes (objects/maps), Lists (queues, timelines), Sets (unique items), Sorted Sets (leaderboards, rankings), Streams (event logs), Bitmaps (feature flags), HyperLogLog (approximate counting). This versatility makes Redis useful beyond simple caching.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between write-through and write-behind caching?",
    answer: "Write-Through: Data written to both cache AND database synchronously. Pros: cache always fresh, no stale reads. Cons: higher write latency. Use for strong consistency. Write-Behind: Data written to cache first, asynchronously persisted to DB (often batched). Pros: fast writes. Cons: risk of data loss if cache fails. Use for write-heavy, eventual consistency OK.",
    difficulty: "Medium"
  },
  {
    question: "What is cache invalidation and why is it hard?",
    answer: "Cache invalidation removes/updates cached data when source data changes to prevent stale data. It's hard because: determining when to invalidate, ensuring all caches are updated in distributed systems, handling race conditions between reads and writes. Strategies: TTL-based, event-based, version-based, pub/sub broadcasting.",
    difficulty: "Medium"
  },
  {
    question: "What is the cache stampede (thundering herd) problem?",
    answer: "Cache stampede: When a popular cache entry expires, many concurrent requests miss cache and hit database simultaneously, potentially overwhelming it. Solutions: 1) Locking - one request fetches, others wait, 2) Probabilistic early expiration - refresh before actual expiry, 3) Background refresh - separate process refreshes hot keys.",
    difficulty: "Medium"
  },
  {
    question: "Explain Redis persistence options (RDB vs AOF).",
    answer: "RDB (Snapshotting): Point-in-time snapshots at intervals, compact binary format, fast recovery, may lose data between snapshots. AOF (Append Only File): Logs every write operation, more durable (configurable sync), larger files, slower recovery. Hybrid: Use both for best durability and recovery speed.",
    difficulty: "Medium"
  },
  {
    question: "How does Redis Cluster work?",
    answer: "Redis Cluster provides automatic sharding: 16384 hash slots distributed across nodes, keys mapped via CRC16(key) mod 16384, each node handles a subset of slots, automatic failover with replica promotion, no single point of failure, linear scalability. Use when data exceeds single node capacity.",
    difficulty: "Medium"
  },
  {
    question: "What is consistent hashing and why is it used for distributed caches?",
    answer: "Consistent hashing places cache servers on a hash ring. Keys are hashed and assigned to the nearest server clockwise. Benefits: adding/removing servers only affects neighboring keys (minimal redistribution), better than modulo hashing which remaps all keys. Virtual nodes improve load distribution.",
    difficulty: "Medium"
  },
  {
    question: "How do you implement rate limiting with Redis?",
    answer: "Common approaches: 1) Fixed Window - INCR key with EXPIRE, allow if count <= limit. 2) Sliding Window - sorted sets with timestamps as scores, count entries in window. 3) Token Bucket - track tokens and last refill time in hash. Redis atomic operations ensure correctness under concurrency.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between in-process and distributed cache?",
    answer: "In-process cache: Stored in application memory, fastest access (no network), not shared across instances, limited by application memory, lost on restart. Distributed cache: Separate servers (Redis/Memcached), network latency added, shared across all instances, horizontally scalable, survives app restarts.",
    difficulty: "Easy"
  },
  {
    question: "What is cache warming?",
    answer: "Cache warming is pre-populating cache with data before traffic arrives. Done during: application startup, deployments, before events/sales. Prevents initial cache misses and database overload when traffic spikes. Identify popular/critical data and load it proactively.",
    difficulty: "Easy"
  },
  {
    question: "What is a CDN and how does it relate to caching?",
    answer: "CDN (Content Delivery Network) is geographically distributed edge servers that cache content closer to users. Reduces latency by serving static/dynamic content from nearest edge server. Acts as a global cache layer. Examples: CloudFlare, Akamai, AWS CloudFront. Best for static assets, video, API responses.",
    difficulty: "Easy"
  },
  {
    question: "What is cache penetration and how do you prevent it?",
    answer: "Cache penetration: Requests for non-existent data bypass cache and always hit database (null results not cached). Solutions: 1) Cache null results with short TTL, 2) Bloom filter to check if key might exist before querying, 3) Input validation to reject invalid requests early.",
    difficulty: "Medium"
  },
  {
    question: "What is Redis Sentinel?",
    answer: "Redis Sentinel provides high availability without sharding: multiple sentinel processes monitor primary/replicas, automatic failover if primary fails, sentinels agree on failure via quorum, promotes replica to primary, notifies clients of new primary. Use when: need HA but data fits on single node.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle cache invalidation in a distributed system?",
    answer: "Strategies: 1) Pub/Sub - broadcast invalidation messages to all nodes, 2) Time-based (TTL) - accept temporary staleness, 3) Version-based - change cache key version on updates, 4) Event-driven - use message queues to trigger invalidation. Key: accept eventual consistency or use distributed locks.",
    difficulty: "Hard"
  },
  {
    question: "Compare cache-aside, read-through, and write-through patterns.",
    answer: "Cache-aside: Application manages cache and DB separately, loads on demand, writes to DB then invalidates cache. Read-through: Cache fetches from DB on miss automatically, simplifies app code. Write-through: Writes go to cache AND DB synchronously, cache always fresh. Choose based on consistency needs and complexity tolerance.",
    difficulty: "Medium"
  },
  {
    question: "What eviction policies does Redis support?",
    answer: "Redis eviction policies: volatile-lru (LRU on keys with TTL), allkeys-lru (LRU on all keys), volatile-lfu (LFU on keys with TTL), allkeys-lfu (LFU on all keys), volatile-random, allkeys-random, volatile-ttl (shortest TTL first), noeviction (return errors when full). Choose based on data importance.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between LRU and LFU eviction?",
    answer: "LRU (Least Recently Used): Evicts items not accessed recently, good general-purpose, can evict frequently-used items if not accessed recently. LFU (Least Frequently Used): Evicts items with lowest access count, keeps popular items longer, but new items may be evicted quickly and old popular items stay forever.",
    difficulty: "Medium"
  },
  {
    question: "How would you design caching for an e-commerce product catalog?",
    answer: "Architecture: 1) CDN for product images, 2) Redis for product details with moderate TTL, 3) Cache-aside pattern for flexibility, 4) Invalidate on product updates via pub/sub, 5) Cache popular products with longer TTL, 6) Warm cache with trending products, 7) Handle cache stampede for flash sales with locking.",
    difficulty: "Hard"
  },
  {
    question: "What is HTTP caching and what headers are involved?",
    answer: "HTTP caching uses headers to control browser/CDN caching. Key headers: Cache-Control (max-age, public/private, no-cache, no-store), ETag (version tag for validation), Last-Modified (timestamp), Expires (absolute expiry time). ETag allows conditional requests (304 Not Modified).",
    difficulty: "Medium"
  },
  {
    question: "How do you implement distributed locking with Redis?",
    answer: "Use SET with NX (only if not exists) and EX (expiry): SET lock:resource value NX EX 30. Check return value for success. Release with DEL. For robustness: use Redlock algorithm with multiple Redis instances, include unique identifier in value, use Lua script for atomic check-and-delete.",
    difficulty: "Hard"
  },
  {
    question: "What best practices should you follow for cache keys?",
    answer: "Best practices: 1) Use namespacing (service:module:entity:id), 2) Be specific and descriptive (user:123:profile not just data:123), 3) Include version for cache busting (product:456:v2), 4) Avoid special characters that might cause issues, 5) Keep keys reasonably short but readable.",
    difficulty: "Easy"
  },
  {
    question: "What metrics should you monitor for caching systems?",
    answer: "Key metrics: Hit/miss ratio (target 90%+), Memory usage and eviction rate, Latency percentiles (p50, p95, p99), Connection pool usage, Keys count and expiring keys, Network bandwidth, CPU usage. Set alerts for low hit ratio, high memory, latency spikes.",
    difficulty: "Medium"
  },
  {
    question: "When should you NOT use caching?",
    answer: "Avoid caching: 1) Frequently changing data (unless write-through), 2) Large objects causing memory pressure, 3) Data requiring strict consistency, 4) One-time access data, 5) Security-sensitive data that shouldn't be duplicated, 6) When cache hit ratio would be very low, 7) Simple queries that are already fast.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle cache race conditions?",
    answer: "Race condition: concurrent read/write causes stale data. Solutions: 1) Use database timestamps to validate freshness, 2) Implement optimistic locking, 3) Use short TTL as safety net, 4) Lock during cache population (prevents stampede), 5) Version-based keys, 6) Read-your-writes consistency for critical paths.",
    difficulty: "Hard"
  }
];

export default questions;
