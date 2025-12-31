// CDN & Distributed Cache Questions - Week 14
// Source: system_design_content/11_cdns_distributed_cache/100_questions.txt

export const cdnCacheQuestions = [
  // Day 1: CDN Fundamentals
  {
    id: 'cdn-1',
    day: 1,
    difficulty: 'E',
    question: "What is a CDN?",
    options: [
      "Central Database Network",
      "Content Delivery Network - geographically distributed servers for content delivery",
      "Computer Data Node",
      "Cloud DNS Network"
    ],
    correct: 1,
    explanation: "A CDN (Content Delivery Network) is a geographically distributed network of servers that cache and deliver content to users from the nearest edge location, reducing latency."
  },
  {
    id: 'cdn-2',
    day: 1,
    difficulty: 'E',
    question: "What is a PoP in CDN context?",
    options: [
      "Post Office Protocol",
      "Point of Presence - physical location with CDN edge servers",
      "Packet Operation Point",
      "Protocol of Performance"
    ],
    correct: 1,
    explanation: "PoP (Point of Presence) is a physical location containing CDN edge servers. CDNs have hundreds of PoPs worldwide to serve users from nearby locations."
  },
  {
    id: 'cdn-3',
    day: 1,
    difficulty: 'E',
    question: "What is the origin server?",
    options: [
      "First CDN server",
      "Original source of content that CDN fetches from on cache miss",
      "Load balancer",
      "DNS server"
    ],
    correct: 1,
    explanation: "The origin server is your original server (web server or storage like S3) where the CDN fetches content when it's not in the edge cache (cache miss)."
  },
  {
    id: 'cdn-4',
    day: 1,
    difficulty: 'E',
    question: "What is cache hit vs cache miss?",
    options: [
      "Success vs failure",
      "Hit: content in cache, served fast; Miss: fetch from origin",
      "Request vs response",
      "Read vs write"
    ],
    correct: 1,
    explanation: "Cache Hit: content found in edge cache, served directly (fast). Cache Miss: content not in cache, must be fetched from origin (slower). Target hit rate >90% for effective CDN."
  },
  {
    id: 'cdn-5',
    day: 1,
    difficulty: 'E',
    question: "What content is best for CDN?",
    options: [
      "User sessions",
      "Static content like images, CSS, JS, videos",
      "Database queries",
      "Real-time data only"
    ],
    correct: 1,
    explanation: "CDNs are most effective for static content (images, CSS, JS, videos, fonts) that doesn't change frequently. Dynamic content can use short TTL or edge computing."
  },
  {
    id: 'cdn-6',
    day: 1,
    difficulty: 'E',
    question: "What are the main benefits of using a CDN?",
    options: [
      "Only cost savings",
      "Lower latency, reduced origin load, DDoS protection, high availability",
      "Only security",
      "Database optimization"
    ],
    correct: 1,
    explanation: "CDN benefits: reduced latency (serve from nearest edge), reduced origin load (80-99% served by CDN), DDoS protection (distributed network), high availability (redundant PoPs)."
  },
  {
    id: 'cdn-7',
    day: 1,
    difficulty: 'M',
    question: "How does CDN routing work?",
    options: [
      "Random selection",
      "DNS Anycast or DNS-based routing to direct users to nearest edge",
      "Manual configuration",
      "Round robin only"
    ],
    correct: 1,
    explanation: "CDN routing directs users to nearest edge: DNS Anycast (same IP from multiple PoPs, BGP routes to nearest) or DNS-based (resolve to different IPs based on user location)."
  },

  // Day 2: Caching Strategies
  {
    id: 'cdn-8',
    day: 2,
    difficulty: 'E',
    question: "What is TTL in CDN caching?",
    options: [
      "Total Transfer Load",
      "Time To Live - how long content remains cached before expiring",
      "Transfer Type Logic",
      "Time Table List"
    ],
    correct: 1,
    explanation: "TTL (Time To Live) determines how long content remains in CDN cache before considered stale. Controlled via Cache-Control headers. Balance between freshness and performance."
  },
  {
    id: 'cdn-9',
    day: 2,
    difficulty: 'M',
    question: "What is Pull CDN vs Push CDN?",
    options: [
      "Identical approaches",
      "Pull: CDN fetches on demand; Push: you upload content proactively",
      "Pull is always better",
      "Push is outdated"
    ],
    correct: 1,
    explanation: "Pull CDN: fetches content from origin on first request, then caches. Push CDN: you proactively upload content to edge servers. Pull is more common for web apps, Push for large media."
  },
  {
    id: 'cdn-10',
    day: 2,
    difficulty: 'M',
    question: "What header controls CDN caching?",
    options: [
      "X-CDN-Cache",
      "Cache-Control with directives like max-age, public, private",
      "CDN-TTL",
      "Content-Cache"
    ],
    correct: 1,
    explanation: "Cache-Control header controls caching: max-age (seconds to cache), public (CDN can cache), private (browser only), no-cache (revalidate), s-maxage (CDN-specific TTL)."
  },
  {
    id: 'cdn-11',
    day: 2,
    difficulty: 'M',
    question: "What is cache invalidation/purge?",
    options: [
      "Adding to cache",
      "Forcing CDN to remove cached content before TTL expires",
      "Blocking users",
      "DNS update"
    ],
    correct: 1,
    explanation: "Cache invalidation removes content from CDN cache before natural expiration. Methods: purge by URL, purge by tag, purge all. Used when content updates and stale cache is unacceptable."
  },
  {
    id: 'cdn-12',
    day: 2,
    difficulty: 'M',
    question: "What is the best practice for static asset caching?",
    options: [
      "Short TTL for everything",
      "Long TTL with versioned URLs for cache busting",
      "No caching",
      "Random TTL"
    ],
    correct: 1,
    explanation: "Use long TTL (1 year) for static assets with versioned URLs (/app.v1.2.3.js or /app.abc123.js). When content changes, URL changes, so no purge needed. Best performance with freshness."
  },
  {
    id: 'cdn-13',
    day: 2,
    difficulty: 'M',
    question: "What is stale-while-revalidate?",
    options: [
      "Error handling",
      "Serve stale content while refreshing in background",
      "Cache deletion",
      "Request retry"
    ],
    correct: 1,
    explanation: "stale-while-revalidate serves cached content immediately (even if stale) while fetching fresh content in background. Users never wait for refresh, always get fast response."
  },
  {
    id: 'cdn-14',
    day: 2,
    difficulty: 'M',
    question: "What is an origin shield?",
    options: [
      "Firewall for origin",
      "Middle-tier cache between edge servers and origin to reduce origin load",
      "DDoS protection",
      "SSL certificate"
    ],
    correct: 1,
    explanation: "Origin shield is a middle-tier cache layer between edge PoPs and origin. Consolidates cache fills from multiple edges, reduces origin requests during cache miss storms."
  },

  // Day 3: Distributed Cache
  {
    id: 'cdn-15',
    day: 3,
    difficulty: 'M',
    question: "What is a distributed cache?",
    options: [
      "Local memory cache",
      "Cache spread across multiple nodes for scalability and shared access",
      "CDN cache",
      "Browser cache"
    ],
    correct: 1,
    explanation: "A distributed cache spreads data across multiple nodes, providing shared caching for multiple app servers with high throughput and horizontal scalability."
  },
  {
    id: 'cdn-16',
    day: 3,
    difficulty: 'M',
    question: "What is consistent hashing?",
    options: [
      "Encryption",
      "Distributing keys across nodes with minimal redistribution on changes",
      "Data compression",
      "Authentication"
    ],
    correct: 1,
    explanation: "Consistent hashing distributes keys across cache nodes so that adding/removing nodes only affects a small portion of keys, minimizing cache invalidation during scaling."
  },
  {
    id: 'cdn-17',
    day: 3,
    difficulty: 'M',
    question: "What is cache-aside (lazy loading) pattern?",
    options: [
      "Write to cache only",
      "App checks cache, on miss reads from DB, then populates cache",
      "Cache handles everything",
      "Write-through only"
    ],
    correct: 1,
    explanation: "Cache-aside: application checks cache first, on miss reads from database, then writes result to cache. Most flexible pattern, app controls caching logic."
  },
  {
    id: 'cdn-18',
    day: 3,
    difficulty: 'M',
    question: "What is write-through cache?",
    options: [
      "Write to cache only",
      "Write to both cache and database synchronously",
      "Write to DB only",
      "Delayed writes"
    ],
    correct: 1,
    explanation: "Write-through writes to both cache and database together synchronously. Ensures consistency but adds write latency. Data always in sync between cache and DB."
  },
  {
    id: 'cdn-19',
    day: 3,
    difficulty: 'M',
    question: "What is write-behind (write-back) cache?",
    options: [
      "Write to DB immediately",
      "Write to cache immediately, async write to DB later",
      "No writes to cache",
      "Manual syncing"
    ],
    correct: 1,
    explanation: "Write-behind writes to cache immediately, then asynchronously writes to database. Fast writes but risk of data loss if cache fails before DB write. Good for write-heavy workloads."
  },
  {
    id: 'cdn-20',
    day: 3,
    difficulty: 'M',
    question: "What is LRU eviction?",
    options: [
      "Random removal",
      "Least Recently Used - remove items not accessed recently",
      "First in first out",
      "Most used removal"
    ],
    correct: 1,
    explanation: "LRU (Least Recently Used) eviction removes the items that haven't been accessed for the longest time when cache is full. Most common eviction policy."
  },
  {
    id: 'cdn-21',
    day: 3,
    difficulty: 'E',
    question: "Why use distributed cache over local cache?",
    options: [
      "Slower performance",
      "Shared across servers, survives restarts, scales horizontally",
      "Simpler setup",
      "No network needed"
    ],
    correct: 1,
    explanation: "Distributed cache: shared across all app servers (consistency), survives server restarts, scales horizontally by adding nodes. Local cache is faster but not shared."
  },

  // Day 4: Redis vs Memcached
  {
    id: 'cdn-22',
    day: 4,
    difficulty: 'M',
    question: "Which supports more data types: Redis or Memcached?",
    options: [
      "Memcached",
      "Redis - strings, lists, sets, hashes, sorted sets, streams",
      "Both same",
      "Neither has data types"
    ],
    correct: 1,
    explanation: "Redis supports rich data types: strings, lists, sets, sorted sets, hashes, streams, bitmaps. Memcached only supports simple strings (key-value)."
  },
  {
    id: 'cdn-23',
    day: 4,
    difficulty: 'M',
    question: "Which supports persistence?",
    options: [
      "Memcached",
      "Redis - with RDB snapshots and AOF logging",
      "Both",
      "Neither"
    ],
    correct: 1,
    explanation: "Redis supports persistence via RDB (point-in-time snapshots) and AOF (append-only file logging every write). Memcached is purely in-memory, no persistence."
  },
  {
    id: 'cdn-24',
    day: 4,
    difficulty: 'M',
    question: "Which supports pub/sub messaging?",
    options: [
      "Memcached",
      "Redis - has built-in pub/sub functionality",
      "Both",
      "Neither"
    ],
    correct: 1,
    explanation: "Redis has built-in Pub/Sub functionality for real-time messaging between publishers and subscribers. Memcached doesn't support pub/sub."
  },
  {
    id: 'cdn-25',
    day: 4,
    difficulty: 'M',
    question: "When to choose Memcached over Redis?",
    options: [
      "Need pub/sub",
      "Simple string caching with multi-threaded performance",
      "Need sorted sets",
      "Need persistence"
    ],
    correct: 1,
    explanation: "Choose Memcached for: simple key-value string caching, multi-threaded performance needs, minimal memory overhead, when you don't need Redis's advanced features."
  },
  {
    id: 'cdn-26',
    day: 4,
    difficulty: 'M',
    question: "What is Redis RDB persistence?",
    options: [
      "Relational database",
      "Point-in-time snapshots written to disk",
      "Real-time backup",
      "Remote database"
    ],
    correct: 1,
    explanation: "RDB (Redis Database) creates point-in-time snapshots of the dataset. Compact file format, fast restarts, but may lose data between snapshots."
  },
  {
    id: 'cdn-27',
    day: 4,
    difficulty: 'M',
    question: "What is Redis AOF persistence?",
    options: [
      "Always On Function",
      "Append Only File - logs every write operation",
      "Automatic Optimization",
      "Async Operation"
    ],
    correct: 1,
    explanation: "AOF (Append Only File) logs every write operation. More durable than RDB (less data loss), but larger files and slower restarts. Can combine with RDB."
  },
  {
    id: 'cdn-28',
    day: 4,
    difficulty: 'M',
    question: "What Redis data type is best for leaderboards?",
    options: [
      "Strings",
      "Sorted Sets - automatic ordering by score",
      "Lists",
      "Hashes"
    ],
    correct: 1,
    explanation: "Sorted Sets are perfect for leaderboards: store user:score pairs, automatically sorted by score. O(log n) add/update, O(log n + m) range queries for top N."
  },

  // Day 5: Best Practices
  {
    id: 'cdn-29',
    day: 5,
    difficulty: 'M',
    question: "What is the thundering herd problem?",
    options: [
      "Too many animals",
      "Many requests hit DB simultaneously when cache expires",
      "Cache overflow",
      "Network issue"
    ],
    correct: 1,
    explanation: "Thundering herd occurs when a popular cache entry expires and many simultaneous requests all hit the database at once, causing overload. Solved with locks or probabilistic refresh."
  },
  {
    id: 'cdn-30',
    day: 5,
    difficulty: 'M',
    question: "What is cache penetration?",
    options: [
      "Cache hack",
      "Requests for non-existent data bypassing cache to DB every time",
      "Cache overflow",
      "Data corruption"
    ],
    correct: 1,
    explanation: "Cache penetration: requests for data that doesn't exist always bypass cache and hit DB. Solutions: cache null values with short TTL, or use bloom filter to check existence."
  },
  {
    id: 'cdn-31',
    day: 5,
    difficulty: 'M',
    question: "What is cache warming?",
    options: [
      "Heating servers",
      "Pre-populating cache with expected data before traffic arrives",
      "Clearing cache",
      "Database backup"
    ],
    correct: 1,
    explanation: "Cache warming pre-populates the cache with expected hot data before traffic arrives. Avoids cold start issues where initial requests all hit the database."
  },
  {
    id: 'cdn-32',
    day: 5,
    difficulty: 'M',
    question: "How to prevent cache avalanche?",
    options: [
      "Disable caching",
      "Add jitter/randomization to TTLs so keys don't expire simultaneously",
      "Use shorter TTLs",
      "Remove all keys"
    ],
    correct: 1,
    explanation: "Cache avalanche: many keys expire simultaneously, overwhelming DB. Prevent by: adding random jitter to TTLs, staggered expiry times, circuit breakers, and cache warming."
  },
  {
    id: 'cdn-33',
    day: 5,
    difficulty: 'M',
    question: "What cache metrics should you monitor?",
    options: [
      "Only memory",
      "Hit ratio, miss ratio, evictions, memory usage, latency",
      "Only CPU",
      "Only network"
    ],
    correct: 1,
    explanation: "Monitor: hit ratio (>90% typical), miss ratio, eviction rate, memory usage, latency (should be sub-ms), connections, and operations per second."
  },
  {
    id: 'cdn-34',
    day: 5,
    difficulty: 'H',
    question: "How to handle hot keys in distributed cache?",
    options: [
      "Delete them",
      "Local caching, read replicas, key splitting, or separate hot key cache",
      "Ignore them",
      "Disable caching"
    ],
    correct: 1,
    explanation: "Hot keys (frequently accessed) can overload single cache node. Solutions: local cache layer, read replicas, split key across shards with suffixes, or dedicated hot key cache."
  },
  {
    id: 'cdn-35',
    day: 5,
    difficulty: 'M',
    question: "What is the lock stampede solution?",
    options: [
      "Remove all locks",
      "One request rebuilds cache while others wait or return stale",
      "Add more databases",
      "Disable caching"
    ],
    correct: 1,
    explanation: "Lock stampede solution: on cache miss, one request acquires lock to rebuild cache. Others either wait for result, return stale data, or fail fast. Prevents thundering herd."
  }
];

export default cdnCacheQuestions;
