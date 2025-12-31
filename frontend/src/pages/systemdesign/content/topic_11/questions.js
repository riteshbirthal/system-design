const questions = [
  {
    question: "What is a CDN and how does it work?",
    answer: "A CDN (Content Delivery Network) is a geographically distributed network of servers that cache and deliver content from locations close to users. When user requests content, DNS routes to nearest edge server. If cached (hit), content served immediately. If not (miss), edge fetches from origin, caches it, then serves. Benefits: reduced latency, improved performance, DDoS protection, bandwidth savings.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between cache hit and cache miss?",
    answer: "Cache Hit: Content found in cache, served immediately without contacting origin. Fast response. Cache Miss: Content not in cache, must be fetched from origin server, then cached for future requests. Slower initial response. Hit Rate = Hits / (Hits + Misses). Target hit rate: >90% for effective caching.",
    difficulty: "Easy"
  },
  {
    question: "What is TTL in caching and how do you set it appropriately?",
    answer: "TTL (Time To Live) is how long content stays cached before expiring. Set via Cache-Control header (max-age). Appropriate TTL: Static assets (images, CSS, JS) - long (days/years) with versioned URLs. HTML pages - short to medium (minutes). API responses - short (seconds) or no cache for dynamic data. Balance freshness vs performance.",
    difficulty: "Easy"
  },
  {
    question: "What is an Origin Shield and why is it used?",
    answer: "Origin Shield is a middle-tier cache layer between edge PoPs and origin server. Benefits: Reduces origin requests (edge servers check shield first), consolidates cache fills (one request to origin instead of many from different edges), reduces origin load during cache expiry. Recommended for high-traffic sites. Adds small latency but significantly reduces origin load.",
    difficulty: "Medium"
  },
  {
    question: "How does CDN cache invalidation work?",
    answer: "Methods: 1) TTL Expiration - natural expiry, simple but not immediate. 2) Purge - API call to CDN to remove content immediately. 3) Soft Purge/Stale-while-revalidate - mark stale, serve stale while refreshing. 4) Versioned URLs - never invalidate, use new URL (app.v1.js → app.v2.js). Versioned URLs most reliable for static assets.",
    difficulty: "Medium"
  },
  {
    question: "Compare Cloudflare, CloudFront, and Fastly.",
    answer: "Cloudflare: 300+ PoPs, free tier, security features (DDoS, WAF), Workers for edge compute. Best for all-round use. CloudFront: 450+ PoPs, AWS integration, Lambda@Edge, S3 origin support. Best for AWS users. Fastly: 80+ PoPs, real-time purging (~150ms), VCL for custom logic. Best for real-time content updates. Choose based on infrastructure and requirements.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between distributed cache and local cache?",
    answer: "Local Cache: In-process memory, no network hop, fastest access but inconsistent across servers, limited by server memory, lost on restart. Distributed Cache: Separate cache servers (Redis, Memcached), shared across all app servers, consistent data, network hop required, horizontally scalable. Use local for hot data, distributed for shared state.",
    difficulty: "Medium"
  },
  {
    question: "Explain the Cache-Aside (Lazy Loading) pattern.",
    answer: "Application manages cache: 1) Check cache for data. 2) If hit, return cached data. 3) If miss, query database. 4) Store result in cache with TTL. 5) Return data. Pros: Only caches what's needed, cache failure doesn't break app. Cons: First request always slow (cache miss), potential for stale data. Most common caching pattern.",
    difficulty: "Medium"
  },
  {
    question: "What is write-through vs write-behind caching?",
    answer: "Write-Through: Write to cache and database synchronously. Cache always has latest data. Pros: Strong consistency. Cons: Higher write latency. Write-Behind (Write-Back): Write to cache, asynchronously write to database later (batched). Pros: Fast writes, efficient batching. Cons: Risk of data loss if cache fails before DB write. Choose based on consistency requirements.",
    difficulty: "Medium"
  },
  {
    question: "What is cache stampede and how do you prevent it?",
    answer: "Cache Stampede: When cached item expires, many concurrent requests hit cache miss simultaneously, overwhelming database. Prevention: 1) Locking - one request fetches, others wait. 2) Probabilistic early refresh - randomly refresh before expiry. 3) Stale-while-revalidate - serve stale data, refresh asynchronously. 4) Request coalescing - combine identical concurrent requests.",
    difficulty: "Hard"
  },
  {
    question: "Compare Redis and Memcached. When would you use each?",
    answer: "Redis: Rich data types (lists, sets, sorted sets, hashes), persistence (RDB, AOF), built-in replication and clustering, pub/sub, Lua scripting. Use for: complex data structures, persistence needed, pub/sub, leaderboards. Memcached: Simple key-value only, no persistence, multi-threaded, simpler. Use for: simple caching, maximum performance, don't need persistence.",
    difficulty: "Medium"
  },
  {
    question: "What Redis data structures would you use for a leaderboard?",
    answer: "Sorted Sets (ZSET) - perfect for leaderboards. Commands: ZADD leaderboard score player (add/update score), ZINCRBY leaderboard increment player (increment score), ZREVRANGE leaderboard 0 9 WITHSCORES (top 10), ZRANK/ZREVRANK leaderboard player (get rank), ZSCORE leaderboard player (get score). O(log n) operations, automatically sorted.",
    difficulty: "Medium"
  },
  {
    question: "How does consistent hashing work in distributed caches?",
    answer: "Consistent hashing maps both servers and keys to a hash ring. Keys are assigned to the next server clockwise on the ring. Benefits: When server added/removed, only keys between affected servers move (minimal redistribution). Virtual nodes improve distribution. Used by: Redis Cluster, Memcached clients, DynamoDB. Solves traditional hashing problem of full redistribution.",
    difficulty: "Hard"
  },
  {
    question: "What is the Cache-Control header and what are its directives?",
    answer: "Cache-Control HTTP header controls caching behavior. Directives: public (cacheable by CDN/proxy), private (browser only), max-age=N (seconds until stale), s-maxage=N (CDN max-age), no-cache (must revalidate), no-store (never cache), immutable (never changes), stale-while-revalidate=N (serve stale while refreshing). Example: Cache-Control: public, max-age=86400, s-maxage=604800",
    difficulty: "Medium"
  },
  {
    question: "How would you implement session storage using Redis?",
    answer: "Design: Key: session:{session_id}, Value: serialized session data (JSON), TTL: session timeout (e.g., 30 minutes). Operations: Create - SETEX session:abc 1800 '{user_id:123}'. Read - GET session:abc. Update - SETEX (reset TTL) or EXPIRE to extend. Delete - DEL session:abc. Benefits: Shared across servers, fast, automatic expiry, survives server restarts.",
    difficulty: "Medium"
  },
  {
    question: "What is cache warming and why is it important?",
    answer: "Cache warming pre-populates cache with expected data before traffic hits. Important after: deployments (cache cleared), cache failures, new cache nodes. Implementation: Identify frequently accessed data, load into cache on startup/event. Benefits: Prevents initial cache miss storms, consistent performance. Methods: Background job, deployment scripts, replay access logs.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle cache failures gracefully?",
    answer: "Strategies: 1) Fallback to database on cache error (don't fail request). 2) Circuit breaker for cache (avoid repeated failures). 3) Local cache as backup. 4) Graceful degradation (reduced functionality). 5) Retry with backoff. Implementation: try/catch around cache calls, monitoring/alerts, cache cluster redundancy. Never let cache failure cause full outage.",
    difficulty: "Medium"
  },
  {
    question: "What is the Vary header and how does it affect CDN caching?",
    answer: "Vary header tells CDN to cache different versions based on request headers. Example: Vary: Accept-Language creates separate cache entries for each language. Vary: Accept-Encoding caches gzip and non-gzip separately. Caution: Vary: Cookie or Vary: * effectively disables caching. Use sparingly, only for headers that actually change response.",
    difficulty: "Medium"
  },
  {
    question: "How would you design caching for an e-commerce product catalog?",
    answer: "CDN: Product images (1 year TTL, versioned), category pages (5 min). Redis: Product details (1 hour), inventory (30s for real-time), search results (5 min), user cart (session-based). Invalidation: Product update triggers cache invalidation, inventory changes update Redis immediately. Cache key: product:{id}, inventory:{id}, search:{hash(query)}. Handle cache stampede for popular products.",
    difficulty: "Hard"
  },
  {
    question: "What is edge computing and how does it relate to CDNs?",
    answer: "Edge computing runs code at CDN edge locations, close to users. Examples: Cloudflare Workers, Lambda@Edge, Fastly Compute@Edge. Use cases: A/B testing, personalization, authentication, API responses, redirects. Benefits: Lower latency than origin, reduced origin load. Trade-offs: Limited compute/memory, stateless, different programming model. Extends CDN beyond caching to computation.",
    difficulty: "Hard"
  },
  {
    question: "How does Redis Cluster work?",
    answer: "Redis Cluster shards data across multiple master nodes using hash slots (16384 total). Each master owns a range of slots. Key's slot = CRC16(key) mod 16384. Each master has replicas for failover. Automatic resharding when adding/removing nodes. Client-side routing or MOVED redirects. Benefits: Horizontal scaling, high availability. Limitations: Multi-key operations only within same slot.",
    difficulty: "Hard"
  },
  {
    question: "What eviction policies does Redis support?",
    answer: "noeviction (return errors when full), allkeys-lru (LRU on all keys), volatile-lru (LRU on keys with TTL), allkeys-lfu (LFU on all keys), volatile-lfu (LFU on keys with TTL), allkeys-random (random eviction), volatile-random (random on TTL keys), volatile-ttl (shortest TTL first). Choose based on access patterns. LRU good for general use, LFU for frequency-based.",
    difficulty: "Medium"
  },
  {
    question: "How do you monitor cache performance?",
    answer: "Key metrics: Hit rate (target >90%), miss rate, eviction rate (if high, need more memory), memory usage, latency (p50, p95, p99), connections, throughput. Tools: Redis INFO command, Memcached stats, CloudWatch (ElastiCache), Prometheus + Grafana. Alerts: Low hit rate, high eviction, memory near limit, latency spikes.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between CDN pull and push?",
    answer: "Pull: CDN fetches content from origin on first request (cache miss). Most common, automatic, origin controls content. Suitable for dynamic origins. Push: You upload content to CDN storage directly. Faster first request (already cached), requires explicit uploads. Suitable for static assets, large files. Many CDNs support both. Pull simpler to manage.",
    difficulty: "Easy"
  },
  {
    question: "How would you implement rate limiting using Redis?",
    answer: "Fixed window: INCR key, EXPIRE on first request. Check count < limit. Sliding window: Use sorted set with timestamps, ZREMRANGEBYSCORE to remove old, ZCARD for count. Token bucket: Store last_refill and tokens, calculate current tokens. Redis best for distributed rate limiting (shared across servers). Return 429 with Retry-After header when exceeded.",
    difficulty: "Hard"
  },
  {
    question: "What is read-through caching?",
    answer: "Read-through: Cache sits between app and database, automatically fetches from DB on miss. App only talks to cache. Cache handles: check if cached, fetch from DB on miss, store result, return data. Vs Cache-aside: Cache-aside has app manage both cache and DB. Read-through simplifies app code but requires cache library support. Often combined with write-through.",
    difficulty: "Medium"
  },
  {
    question: "How do you secure cached data?",
    answer: "Strategies: 1) Don't cache sensitive data when possible. 2) Encrypt at rest (Redis encryption). 3) Encrypt in transit (TLS to cache). 4) Short TTL for sensitive data. 5) Cache key obfuscation (hash user ID). 6) Access control (Redis AUTH, VPC). 7) PII considerations (GDPR, HIPAA). 8) Audit logging. Never cache passwords, full credit cards. Consider compliance requirements.",
    difficulty: "Medium"
  },
  {
    question: "What is lazy expiration in Redis?",
    answer: "Redis doesn't immediately delete expired keys. Two mechanisms: 1) Passive expiration - key checked on access, deleted if expired. 2) Active expiration - background task randomly samples keys with TTL, deletes expired ones (runs 10 times/second). Benefits: Less CPU overhead than scanning all keys. Implication: Memory may contain expired keys temporarily. Use SCAN with TTL check if accurate count needed.",
    difficulty: "Hard"
  },
  {
    question: "How do you handle cache in a multi-region deployment?",
    answer: "Options: 1) Regional caches (each region has own cache, potential inconsistency). 2) Global cache with replication (Redis Enterprise, higher latency for writes). 3) Write to primary region, async replicate (eventual consistency). 4) CDN for static content (globally distributed). Considerations: Latency vs consistency, data residency requirements, failover strategy. Most use regional caches with eventual sync.",
    difficulty: "Hard"
  }
];

export default questions;
