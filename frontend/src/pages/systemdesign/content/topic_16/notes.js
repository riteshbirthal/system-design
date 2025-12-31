const notes = `
# System Design Case Studies

## URL Shortener (TinyURL)

### Requirements
- Shorten long URLs to short codes
- Redirect short URL to original
- Custom aliases (optional)
- Analytics (click count)

### Estimation
- 100M URLs/month = ~40 URLs/sec
- Read:Write = 100:1
- 6-character code = 62^6 = 56B combinations

### Design
\`\`\`
[Client] → [Load Balancer] → [API Servers] → [Cache]
                                    ↓
                              [Database]
                              
Short URL: base62(auto_increment_id) or hash(url)
\`\`\`

### Key Decisions
- ID Generation: Auto-increment vs Random
- Storage: NoSQL (key-value) for simple lookups
- Cache: Redis for hot URLs
- Hash collision: Append counter, retry

---

## Rate Limiter

### Requirements
- Limit requests per user/IP
- Multiple time windows
- Distributed system support

### Algorithms
\`\`\`
Token Bucket:
- Bucket holds N tokens
- Refill at rate R
- Request consumes 1 token
- Reject if empty

Sliding Window:
- Count requests in rolling window
- More accurate than fixed window
\`\`\`

### Design
\`\`\`
[Client] → [Rate Limiter] → [API Server]
               ↓
           [Redis]
           
Key: user_id:timestamp
Value: count
\`\`\`

---

## Chat System (WhatsApp/Messenger)

### Requirements
- 1:1 and group messaging
- Online status
- Read receipts
- Media support

### Design
\`\`\`
[Client] ←WebSocket→ [Chat Servers] → [Message Queue]
                           ↓                ↓
                     [User Service]   [Message DB]
                     [Presence Service]
\`\`\`

### Key Components
- **WebSocket** for real-time
- **Message Queue** for reliability
- **Presence Service** for online status
- **Fanout** for group messages

### Storage
- Messages: Cassandra (write-heavy)
- User data: MySQL
- Media: Object storage (S3)

---

## Twitter/Social Feed

### Requirements
- Post tweets
- Follow users
- Home timeline
- Search

### Feed Generation
\`\`\`
Pull Model:
Read: Query all followees, merge, sort
Pro: Simple write
Con: Slow read for users with many followees

Push Model (Fan-out on Write):
Write: Push to all followers' timelines
Pro: Fast read
Con: Slow write, celebrity problem

Hybrid:
- Push for normal users
- Pull for celebrities
\`\`\`

### Design
\`\`\`
[Client] → [API Gateway]
               ↓
    [Tweet Service] ← [User Service]
         ↓
    [Timeline Service] → [Cache]
         ↓
    [Fan-out Service]
\`\`\`

---

## YouTube/Video Streaming

### Requirements
- Upload videos
- Stream videos
- Recommendations
- Comments, likes

### Video Processing
\`\`\`
[Upload] → [Message Queue] → [Transcoder]
                                  ↓
                         [Multiple Resolutions]
                                  ↓
                            [CDN Storage]
\`\`\`

### Streaming
\`\`\`
[Client] → [CDN] → [Origin]
           
Adaptive Bitrate:
- Multiple quality levels
- Switch based on bandwidth
- HLS/DASH protocols
\`\`\`

### Components
- **Transcoding**: Convert to multiple formats
- **CDN**: Edge delivery for low latency
- **Chunking**: Small segments for adaptive streaming
- **Metadata**: Separate service for video info

---

## Uber/Ride Sharing

### Requirements
- Match riders with drivers
- Real-time location tracking
- ETAs and routing
- Payments

### Location Tracking
\`\`\`
[Driver App] → [Location Service] → [Geospatial Index]
                                          ↓
                                    [Find nearby]
                                          ↓
[Rider App] ← [Matching Service] ← [Available drivers]
\`\`\`

### Geospatial Index
- **Geohash**: Divide world into grid cells
- **Quadtree**: Hierarchical spatial index
- **S2**: Google's spherical geometry

### Components
- Location updates: WebSocket/frequent polling
- Matching: Consider location, ratings, ETA
- ETA: Routing service (Google Maps API)

---

## Notification System

### Requirements
- Push notifications (mobile)
- SMS, Email
- In-app notifications
- Priority handling

### Design
\`\`\`
[Services] → [Notification Queue] → [Priority Router]
                                          ↓
                                  [Channel Services]
                                  ├── Push (FCM/APNs)
                                  ├── SMS (Twilio)
                                  ├── Email (SendGrid)
                                  └── In-app (WebSocket)
\`\`\`

### Key Considerations
- Rate limiting per user
- Deduplication
- Template management
- User preferences
- Retry with backoff

---

## Search Engine (Elasticsearch)

### Requirements
- Full-text search
- Autocomplete
- Relevance ranking
- Filtering

### Components
\`\`\`
[Document] → [Indexer] → [Inverted Index]
                              ↓
[Query] → [Query Processor] → [Ranking] → [Results]
\`\`\`

### Inverted Index
\`\`\`
Word → [doc1, doc3, doc5]
"system" → [doc1, doc2, doc4]
"design" → [doc2, doc4, doc7]

Query "system design" → intersection → [doc2, doc4]
\`\`\`

### Ranking Factors
- TF-IDF (term frequency, inverse document frequency)
- PageRank (link analysis)
- Recency
- User signals (clicks)

---

## Design Patterns Summary

| System | Key Pattern |
|--------|-------------|
| URL Shortener | ID encoding, caching |
| Rate Limiter | Token bucket, Redis |
| Chat | WebSocket, message queue |
| Feed | Fan-out, timeline cache |
| Video | Transcoding, CDN, chunking |
| Ride Share | Geospatial index |
| Notifications | Priority queue, channels |
| Search | Inverted index, ranking |

---

## Interview Approach

### Framework (RESHADED)
1. **R**equirements clarification
2. **E**stimation (scale)
3. **S**ystem interface (APIs)
4. **H**igh-level design
5. **A**PI design detailed
6. **D**ata model
7. **E**xpand/optimize
8. **D**iscuss trade-offs

### Common Questions to Ask
- What's the scale (DAU, requests/sec)?
- Read vs write ratio?
- What features are must-have?
- Consistency vs availability preference?
- Latency requirements?
`;

export default notes;
