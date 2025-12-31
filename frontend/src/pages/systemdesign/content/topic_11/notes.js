const notes = `
# CDNs & Distributed Caches

## Introduction to CDNs

**Definition:** A Content Delivery Network (CDN) is a geographically distributed network of proxy servers that deliver web content to users based on their location, reducing latency and improving performance.

### Why CDNs Matter
- **Reduced Latency**: Content served from nearby edge locations
- **Improved Performance**: Faster page load times
- **High Availability**: Multiple redundant servers
- **Scalability**: Handle traffic spikes
- **DDoS Protection**: Absorb attacks at edge
- **Bandwidth Savings**: Reduce origin server load

### How CDN Works
\`\`\`
Without CDN:
[User in Tokyo] ──────────> [Origin in US]
                High latency (~200ms)

With CDN:
[User in Tokyo] ──> [Edge in Tokyo] ──> [Origin]
                Low latency (~20ms)
\`\`\`

### Key Terminology

| Term | Description |
|------|-------------|
| Edge Server/PoP | Server close to users, caches content |
| Origin Server | Original source of content |
| Cache Hit | Content found in edge cache |
| Cache Miss | Content fetched from origin |
| TTL | How long content stays cached |
| Purge | Force removal of cached content |

---

## CDN Architecture

\`\`\`
                    [Origin Server]
                          ↑
                    [Origin Shield]
                          ↑
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
  [Regional PoP]   [Regional PoP]   [Regional PoP]
     (US-WEST)       (EUROPE)         (ASIA)
        ↓                 ↓                 ↓
    [Users]           [Users]          [Users]
\`\`\`

### Content Types
- **Static**: Images, videos, CSS, JS (highly cacheable, long TTL)
- **Dynamic**: API responses, personalized content (short/no TTL)

---

## CDN Caching Strategies

### Cache Control Headers
\`\`\`http
Cache-Control: public, max-age=86400
# Cacheable by CDN for 1 day

Cache-Control: private, no-cache
# Not cacheable by CDN

Cache-Control: s-maxage=3600, max-age=60
# CDN: 1 hour, Browser: 1 minute
\`\`\`

### Common Configurations

**Static Assets:**
\`\`\`http
Cache-Control: public, max-age=31536000, immutable
# 1 year, use versioned URLs
\`\`\`

**HTML Pages:**
\`\`\`http
Cache-Control: public, max-age=60, stale-while-revalidate=30
\`\`\`

### Cache Invalidation Methods
1. **TTL Expiration**: Natural expiry
2. **Purge**: API call to remove content
3. **Versioned URLs**: /app.v1.js → /app.v2.js (most reliable)

---

## Popular CDN Providers

| Provider | PoPs | Best For |
|----------|------|----------|
| Cloudflare | 300+ | All-round, security, free tier |
| CloudFront | 450+ | AWS integration |
| Akamai | 4000+ | Enterprise, media |
| Fastly | 80+ | Real-time purging (~150ms) |
| Google CDN | 200+ | GCP users |

---

## Distributed Caching Fundamentals

### Why Distributed Cache
- Reduce database load
- Faster response times (microseconds vs milliseconds)
- Handle high traffic
- Share state across servers
- Session storage

### Cache vs Database

| Aspect | Cache | Database |
|--------|-------|----------|
| Speed | Microseconds | Milliseconds |
| Storage | In-memory | Disk-based |
| Durability | Volatile | Persistent |
| Cost | Expensive/GB | Cheaper/GB |

### Key Metrics
- **Hit Rate**: Target >90% (Hits / Total Requests)
- **Eviction Rate**: Items removed when full
- **Latency**: Response time

---

## Distributed Cache Architectures

### 1. Cache-Aside (Lazy Loading)
\`\`\`python
def get_user(user_id):
    user = cache.get(f"user:{user_id}")
    if user is None:
        user = database.get(user_id)
        cache.set(f"user:{user_id}", user, ttl=3600)
    return user
\`\`\`
Application manages cache. Pros: Only caches what's needed.

### 2. Read-Through
Cache handles database reads automatically. Transparent to app.

### 3. Write-Through
\`\`\`
[App] → [Cache] → [Database]
Cache writes to DB synchronously
\`\`\`
Strong consistency, higher write latency.

### 4. Write-Behind (Write-Back)
\`\`\`
[App] → [Cache] → (async) → [Database]
\`\`\`
Fast writes, risk of data loss.

### 5. Distributed Cluster
\`\`\`
[App Servers]
      ↓
[Cache Cluster]
[Node1] [Node2] [Node3]
      ↓
[Database]
\`\`\`
Data distributed via consistent hashing.

---

## Redis vs Memcached

| Feature | Redis | Memcached |
|---------|-------|-----------|
| Data Types | Rich (lists, sets, hashes) | Key-value only |
| Persistence | Yes (RDB, AOF) | No |
| Replication | Built-in | No |
| Clustering | Built-in | Client-side |
| Pub/Sub | Yes | No |
| Use Case | Complex caching | Simple, fast caching |

### Redis Data Structures
\`\`\`redis
# String
SET user:123 "John"

# Hash
HSET user:123 name "John" email "john@example.com"

# List
LPUSH notifications:123 "New message"

# Sorted Set (leaderboards)
ZADD leaderboard 100 "player1"

# Expiration
SETEX session:abc 3600 "data"
\`\`\`

---

## Cache Patterns

### 1. Cache Stampede Prevention
Problem: Many requests hit expired cache simultaneously.

**Solutions:**
- **Locking**: One request fetches, others wait
- **Probabilistic early refresh**: Randomly refresh before expiry
- **Stale-while-revalidate**: Serve stale, refresh async

### 2. Cache Invalidation Strategies
\`\`\`python
# TTL-based
cache.set(key, value, ttl=3600)

# Event-based
def update_user(user_id, data):
    database.update(user_id, data)
    cache.delete(f"user:{user_id}")

# Version-based
cache_key = f"user:{user_id}:v{version}"
\`\`\`

---

## Best Practices

### 1. Set Appropriate TTLs
- Static content: Hours/days
- Dynamic content: Seconds/minutes
- Real-time: Very short or no cache

### 2. Use Cache Hierarchies
\`\`\`
[Browser] → [CDN] → [App Cache] → [DB Cache] → [DB]
\`\`\`

### 3. Monitor Metrics
- Hit rate (>90%)
- Eviction rate
- Memory usage
- Latency

### 4. Handle Failures Gracefully
\`\`\`python
def get_data(key):
    try:
        return cache.get(key)
    except CacheException:
        return database.get(key)  # Fallback
\`\`\`

### 5. Consistent Hashing
Distribute keys across nodes, minimize redistribution.

### 6. Cache Warming
Pre-load popular data on startup.

### 7. Use Namespacing
\`\`\`
user:123, session:abc, product:456
\`\`\`

### 8. Avoid Caching Sensitive Data
Consider encryption and compliance.

---

## Quick Reference

### When to Use CDN vs Cache
- **CDN**: Static content to users (images, JS, CSS)
- **Distributed Cache**: App data (sessions, DB results)

### Selection Guide
| Need | Solution |
|------|----------|
| Global static delivery | CDN (Cloudflare, CloudFront) |
| Complex data structures | Redis |
| Simple key-value | Memcached |
| AWS managed | ElastiCache |
| Session storage | Redis |
| Leaderboards | Redis Sorted Sets |
`;

export default notes;
