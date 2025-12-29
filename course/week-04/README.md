# Week 4: Caching Strategies & Performance Optimization

## Week Overview
This week focuses on caching - one of the most powerful tools for improving system performance. Learn different caching strategies, cache invalidation patterns, and how to implement caching effectively.

**Learning Objectives:**
- Understand different types of caches and their use cases
- Learn cache invalidation strategies
- Master distributed caching with Redis
- Understand CDN and edge caching
- Learn cache design patterns and best practices

---

## Daily Schedule

| Day | Topic | Key Concepts |
|-----|-------|--------------|
| Day 1 | Caching Fundamentals | Why cache, cache types, cache hit/miss |
| Day 2 | Cache Invalidation | Write-through, write-back, write-around |
| Day 3 | Redis Deep Dive | Data structures, persistence, clustering |
| Day 4 | CDN & Edge Caching | Content distribution, cache headers |
| Day 5 | Cache Design Patterns | Cache-aside, read-through, distributed caching |

---

## Day 1: Caching Fundamentals

### Content Topics
- What is caching and why use it?
- Cache levels (L1, L2, L3 CPU cache)
- Application-level caching
- Database query caching
- Cache hit ratio and metrics
- Cache eviction policies (LRU, LFU, FIFO, TTL)
- Caching trade-offs

### Cache Locations
```
┌──────────┐   ┌─────────┐   ┌───────────┐   ┌──────────┐   ┌──────────┐
│  Client  │──▶│   CDN   │──▶│  API GW   │──▶│  App     │──▶│ Database │
│  Cache   │   │  Cache  │   │  Cache    │   │  Cache   │   │  Cache   │
└──────────┘   └─────────┘   └───────────┘   └──────────┘   └──────────┘
   Browser      Edge          Gateway        Redis/MC        Query Cache
```

### Eviction Policies
| Policy | Description | Use Case |
|--------|-------------|----------|
| LRU | Least Recently Used | General purpose |
| LFU | Least Frequently Used | Frequency-based access |
| FIFO | First In First Out | Time-based data |
| TTL | Time To Live | Expiring data |

### Daily Assignment
- Implement LRU cache from scratch
- Calculate cache hit ratios for different workloads

---

## Day 2: Cache Invalidation

### Content Topics
- Cache invalidation challenges
- Write-through cache
- Write-back (write-behind) cache
- Write-around cache
- Cache invalidation strategies
- Handling stale data
- Event-driven invalidation

### Caching Patterns Comparison
```
Write-Through:
App → Cache → DB (synchronous)
✓ Data consistency
✗ Higher write latency

Write-Back:
App → Cache → (async) → DB
✓ Lower write latency
✗ Risk of data loss

Write-Around:
App → DB (Cache updated on read)
✓ Prevents cache pollution
✗ Cache miss on first read
```

### Daily Assignment
- Design cache invalidation for product catalog
- Implement pub/sub based cache invalidation

---

## Day 3: Redis Deep Dive

### Content Topics
- Redis overview and architecture
- Data structures (Strings, Lists, Sets, Hashes, Sorted Sets)
- Redis persistence (RDB, AOF)
- Redis cluster and sharding
- Redis pub/sub
- Redis transactions
- Redis Lua scripting
- Common use cases

### Redis Data Structures
```
Strings: SET key value, GET key
Lists: LPUSH, RPUSH, LPOP, RPOP
Sets: SADD, SMEMBERS, SINTER
Hashes: HSET, HGET, HGETALL
Sorted Sets: ZADD, ZRANGE, ZRANK
```

### Use Cases
| Data Structure | Use Case |
|----------------|----------|
| Strings | Session storage, counters |
| Lists | Message queues, activity feeds |
| Sets | Tags, unique visitors |
| Hashes | Object storage, user profiles |
| Sorted Sets | Leaderboards, rate limiting |

### Daily Assignment
- Build rate limiter using Redis
- Implement session management with Redis

---

## Day 4: CDN & Edge Caching

### Content Topics
- What is a CDN?
- CDN architecture
- Edge locations and PoPs
- Cache-Control headers
- CDN cache strategies
- Dynamic content caching
- CDN providers comparison
- CDN in system design

### Cache-Control Headers
```http
Cache-Control: max-age=3600        # Cache for 1 hour
Cache-Control: no-cache            # Validate before use
Cache-Control: no-store            # Never cache
Cache-Control: private             # Only browser cache
Cache-Control: public              # Can be cached anywhere
ETag: "abc123"                     # Validation token
```

### CDN Architecture
```
                    ┌─────────────────┐
                    │  Origin Server  │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Edge (US-West)│   │ Edge (EU-West)│   │ Edge (AP-East)│
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        ▼                   ▼                   ▼
   Users (US)          Users (EU)          Users (Asia)
```

### Daily Assignment
- Configure CDN for static assets
- Design cache strategy for news website

---

## Day 5: Cache Design Patterns

### Content Topics
- Cache-aside pattern
- Read-through pattern
- Write-through pattern
- Refresh-ahead pattern
- Distributed caching challenges
- Cache stampede prevention
- Consistent hashing for cache distribution
- Multi-tier caching

### Cache-Aside Pattern
```
Read:
1. Check cache
2. If miss, read from DB
3. Store in cache
4. Return data

Write:
1. Write to DB
2. Invalidate cache
```

### Distributed Cache Architecture
```
┌───────────────────────────────────────────┐
│            Consistent Hashing             │
└───────────────────────────────────────────┘
        │              │              │
        ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Cache Node 1│ │ Cache Node 2│ │ Cache Node 3│
│  Keys A-G   │ │  Keys H-P   │ │  Keys Q-Z   │
└─────────────┘ └─────────────┘ └─────────────┘
```

### Daily Assignment
- Design multi-tier caching for e-commerce
- Implement cache stampede protection

---

## Weekly Resources

### Required Reading
- Redis Documentation
- "Designing Data-Intensive Applications" - Chapter 5
- Cloudflare Learning: CDN

### Video Resources
- Hussein Nasser: Caching Strategies
- ByteByteGo: Redis Crash Course
- AWS re:Invent: Caching Best Practices

### Tools to Explore
- Redis CLI / Redis Insight
- Varnish Cache
- Cloudflare / AWS CloudFront

---

## Weekly Quiz
- 25 questions on caching concepts
- Cache pattern selection
- Performance optimization scenarios

## Weekly Project
**Design Caching Layer for Twitter**
- Timeline caching strategy
- User profile caching
- Trending topics caching
- Cache invalidation design
- Capacity estimation
