const questions = [
  {
    question: "How would you design a URL shortener like TinyURL?",
    answer: "Requirements: Shorten URLs, redirect to original. Scale: ~100M URLs/month. Design: API servers generate short code (base62 of auto-increment ID or hash), store in key-value DB (URL→short, short→URL), cache hot URLs in Redis. 6-char code = 62^6 = 56B combinations. Handle collisions by appending counter. CDN for redirects. Consider: Custom aliases, analytics, expiration.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a rate limiter?",
    answer: "Algorithms: Token bucket (bucket fills at rate R, request takes token), Sliding window (count in rolling window), Fixed window (simpler but edge bursts). Distributed: Use Redis for shared state. Key: user_id:window, Value: count. Design: Rate limiter middleware checks Redis, rejects if over limit (429 Too Many Requests with Retry-After). Configure: Different limits per endpoint, user tier.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a chat application like WhatsApp?",
    answer: "Requirements: 1:1 and group chat, online status, delivery/read receipts. Design: WebSocket connections for real-time, message queue for reliability. Store: Messages in Cassandra (write-heavy), user data in MySQL, media in S3. Presence: Heartbeat to presence service, publish status changes. Groups: Fan-out messages to all members. Sync: Message IDs for ordering, last-seen for sync.",
    difficulty: "Hard"
  },
  {
    question: "How would you design Twitter's news feed?",
    answer: "Challenge: Show tweets from people you follow, sorted by time. Pull model: On read, query all followees' tweets, merge (slow read). Push model (fan-out on write): On tweet, push to all followers' timelines in cache (slow write, celebrity problem). Hybrid: Push for normal users, pull for celebrities. Store: Tweets in DB, timelines in Redis. Cache: Pre-computed feed per user.",
    difficulty: "Hard"
  },
  {
    question: "How would you design YouTube?",
    answer: "Upload flow: Upload → Message queue → Transcoder → Multiple resolutions → CDN/S3. Streaming: CDN edge delivery, adaptive bitrate (HLS/DASH), chunked video. Components: Video service (metadata), transcoding pipeline, CDN, recommendation engine. Scale: Shard by video ID, cache popular videos. Consider: Copyright detection, live streaming, comments/likes service.",
    difficulty: "Hard"
  },
  {
    question: "How would you design Uber?",
    answer: "Core: Match riders with nearby drivers in real-time. Location: Drivers send location updates (every few seconds), store in geospatial index (Geohash, Quadtree). Matching: Find nearby available drivers, consider ETA/rating, dispatch to best. Services: Location service, matching service, trip service, payment service. Real-time: WebSocket for tracking. ETA: Routing API integration.",
    difficulty: "Hard"
  },
  {
    question: "How would you design a notification system?",
    answer: "Channels: Push (FCM/APNs), SMS (Twilio), Email (SendGrid), In-app. Design: Services publish to notification queue, router sends to appropriate channel. Consider: Priority levels, rate limiting per user, deduplication, templates, user preferences (opt-out), retry with backoff. Store: Notification history, delivery status. Scale: Queue per channel, horizontal scaling.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a search autocomplete system?",
    answer: "Data: Collect search queries, aggregate by frequency. Index: Trie data structure (prefix tree) for fast prefix lookup. Design: User types → Query trie → Return top suggestions. Optimizations: Cache popular prefixes, shard trie by first char, rank by frequency/recency/personalization. Update: Periodic rebuild or real-time updates to trie. Consider: Spell correction, filtering inappropriate.",
    difficulty: "Medium"
  },
  {
    question: "What is the fan-out problem and how do you solve it?",
    answer: "Fan-out problem: When one action affects many (celebrity tweets to millions of followers). Push everywhere is slow/expensive. Solutions: Hybrid approach - push for normal users (fast read), pull for celebrities (fast write). Pre-compute most, fetch celebrity tweets on demand. Alternatives: Limit followers, async fan-out, prioritize active users. Twitter/Instagram use hybrid models.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle hot partitions in a large-scale system?",
    answer: "Problem: Uneven load on specific shards (celebrity data, viral content). Solutions: 1) Add randomness to partition key (scatter hot data). 2) Cache hot data heavily. 3) Dedicated shards for hot data. 4) Split hot partitions. 5) Rate limit hot keys. Detection: Monitor partition metrics, alert on imbalance. Prevention: Good partition key choice, avoid predictable patterns.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a distributed cache like Redis?",
    answer: "Features: Key-value store, data structures, persistence, replication. Design: Consistent hashing for distribution, master-replica for HA, cluster mode for scaling. Data structures: Strings, lists, sets, sorted sets, hashes. Persistence: RDB (snapshots), AOF (log). Eviction: LRU, LFU. Client: Connection pooling, pipelining. Consider: Memory limits, expiration, pub/sub.",
    difficulty: "Hard"
  },
  {
    question: "How would you design a file storage service like Dropbox?",
    answer: "Requirements: Upload/download files, sync across devices, sharing. Design: Break files into chunks (deduplication), store metadata separately, sync only changed chunks. Components: Metadata service (MySQL), Chunk storage (S3/GCS), Sync service. Sync: Track file versions, detect conflicts, client-server sync protocol. Scale: Shard by user, CDN for downloads.",
    difficulty: "Hard"
  },
  {
    question: "How would you design a web crawler?",
    answer: "Components: URL frontier (queue of URLs to visit), Fetcher (download pages), Parser (extract links/content), Storage (store pages). Design: Distributed crawlers, respect robots.txt, politeness (rate limit per domain), deduplication (URL seen?), priority queue (important pages first). Challenges: Infinite loops, spider traps, dynamic content. Scale: Partition by domain.",
    difficulty: "Hard"
  },
  {
    question: "How would you design Google Docs collaborative editing?",
    answer: "Challenge: Multiple users editing same document simultaneously. Solutions: OT (Operational Transformation) - transform operations to resolve conflicts. CRDT (Conflict-free Replicated Data Types) - mathematically guaranteed convergence. Design: WebSocket for real-time, operation log, conflict resolution. Each keystroke is operation sent to server, transformed, broadcast. Cursor positions, presence indicators.",
    difficulty: "Hard"
  },
  {
    question: "How would you design a payment system?",
    answer: "Requirements: Process payments, handle failures, prevent double-charging. Design: Idempotent operations (idempotency key), state machine (pending→processing→completed/failed), retry with backoff. Components: Payment gateway integration (Stripe), ledger (double-entry accounting), fraud detection. Consistency: Strong consistency for money, saga pattern for distributed transactions. Audit: Log everything.",
    difficulty: "Hard"
  },
  {
    question: "How would you design an API rate limiter for distributed systems?",
    answer: "Challenge: Consistent limiting across multiple servers. Design: Centralized counter in Redis (INCR with TTL). Algorithms: Token bucket for bursty traffic, sliding window for smooth limiting. Keys: user_id:endpoint:window. Considerations: Race conditions (use Lua script or MULTI), clock sync, local cache for performance. Return: 429 status, Retry-After header, X-RateLimit headers.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a leaderboard system?",
    answer: "Requirements: Rank players by score, get player rank, top N players. Design: Redis Sorted Set - ZADD for updates, ZREVRANK for rank, ZREVRANGE for top N. All O(log n). Scale: Shard by game/region. Large scale: Approximate ranks with sampling, periodic batch updates. Consider: Ties handling, historical leaderboards, anti-cheat. Real-time updates via pub/sub.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a distributed task scheduler?",
    answer: "Requirements: Schedule tasks for future, recurring tasks, at-least-once execution. Design: Task store (MySQL), scheduler picks due tasks, workers execute via queue. Considerations: Idempotent tasks, retry on failure, task prioritization, rate limiting. High availability: Multiple schedulers with locking (only one schedules). Alternatives: Celery, AWS Step Functions, Apache Airflow.",
    difficulty: "Medium"
  },
  {
    question: "What's the approach to designing any system in an interview?",
    answer: "Framework: 1) Requirements - functional and non-functional, clarify scope. 2) Estimation - users, requests/sec, storage. 3) High-level design - main components, data flow. 4) API design - key endpoints. 5) Data model - schema, database choice. 6) Deep dive - scale bottlenecks, handle failures. 7) Trade-offs - discuss alternatives. Ask questions, think aloud, iterate.",
    difficulty: "Easy"
  },
  {
    question: "How do you estimate scale in system design?",
    answer: "Key numbers: 1M users = ~10K concurrent (1% rule), 1 request/user/day for read-heavy. Calculate: DAU → requests/sec → storage/day. Example: 100M DAU, 10 requests/day = 1B requests/day = ~12K RPS. Storage: 1KB/request × 1B = 1TB/day. Know: 1 server handles ~10K simple requests/sec. Use powers of 10 for quick math.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a coupon/voucher system?",
    answer: "Requirements: Create coupons, validate/redeem, prevent double-use. Design: Coupon store with rules (discount, expiry, usage limit), redemption log (atomic check-and-use). Race condition: Use database transaction or Redis SETNX for claiming. Scale: Shard by coupon code. Consider: Fraud prevention (velocity checks), bulk generation, analytics. Idempotency: Track redemption attempts.",
    difficulty: "Medium"
  },
  {
    question: "How would you design an online ticket booking system?",
    answer: "Challenge: Prevent double-booking of same seat. Design: Show available seats (read), select seats (temporary lock), complete payment (confirm booking). Locking: Temporary hold with TTL (Redis), release if not confirmed. Database: Optimistic locking (version column) or SELECT FOR UPDATE. Scale: Shard by event/venue. Queue for high-demand events. Consider: Waiting room, fair queuing.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle idempotency in distributed systems?",
    answer: "Idempotency: Same request multiple times = same result. Implementation: Client sends idempotency key, server checks if key processed, returns cached result if yes. Storage: Redis with TTL or database. Use cases: Payments (prevent double-charge), order creation, API mutations. Key generation: Client-generated UUID or hash of request params. Critical for retry safety.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a stock trading system?",
    answer: "Requirements: Place orders, match buyers/sellers, real-time prices. Design: Order book (sorted bids/asks), matching engine (match crossing orders), trade execution. Matching: Price-time priority. Scale: Shard by stock symbol. Consistency: Strong consistency for orders/matches. Real-time: WebSocket for price updates. Consider: Market vs limit orders, partial fills, regulatory requirements.",
    difficulty: "Hard"
  },
  {
    question: "How would you design a food delivery service like DoorDash?",
    answer: "Components: Customer app, restaurant app, driver app, dispatch system. Flow: Customer orders → Restaurant accepts → Dispatch assigns driver → Driver picks up → Delivers. Key services: Order service, restaurant service, driver matching (location-based), real-time tracking. Challenges: ETA estimation, driver allocation optimization, surge pricing. Similar to Uber with restaurant as intermediate stop.",
    difficulty: "Hard"
  }
];

export default questions;
