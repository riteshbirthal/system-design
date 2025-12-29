# Week 3 Project: Design a Social Media Database

## Project Overview
**Duration:** Weekend (6-8 hours)
**Points:** 200
**Submission Deadline:** Before Week 4 starts

---

## Objective
Design a complete database architecture for a **Social Media Platform** (similar to Twitter/Instagram) that handles users, posts, comments, likes, follows, and notifications at scale.

---

## Project Requirements

### Functional Requirements
1. Users can create accounts with profile information
2. Users can create posts with text, images, or videos
3. Users can comment on posts
4. Users can like posts and comments
5. Users can follow/unfollow other users
6. Users see a personalized feed of posts from followed users
7. Users receive notifications for likes, comments, and follows
8. Users can search for other users and posts
9. Posts can have hashtags and mentions

### Non-Functional Requirements
1. Support 100 million daily active users
2. 500 million posts per day
3. Average user follows 200 people
4. Read-heavy workload (read:write = 100:1)
5. Feed generation latency < 500ms
6. 99.9% availability
7. Data retained for 5 years
8. Support global users across multiple regions

---

## Deliverables

### Part 1: Data Modeling (40 points)

#### 1.1 Entity-Relationship Diagram (15 points)
Create a complete ER diagram showing:
- All entities (Users, Posts, Comments, Likes, Follows, etc.)
- Relationships with cardinality
- Primary keys and foreign keys

**Tools:** Draw.io, Lucidchart, or dbdiagram.io

#### 1.2 SQL Schema Design (15 points)
Design normalized tables for a relational database:

```sql
-- Users table
CREATE TABLE users (
    -- Define columns with appropriate data types
    -- Include constraints (PRIMARY KEY, UNIQUE, NOT NULL, etc.)
    -- Include indexes
);

-- Posts table
CREATE TABLE posts (
    -- Your schema here
);

-- Add all other tables:
-- comments, likes, follows, notifications, hashtags, mentions
```

**Requirements:**
- Proper normalization (at least 3NF)
- Appropriate data types
- Constraints for data integrity
- Consider which columns need indexing

#### 1.3 NoSQL Data Model (10 points)
Design alternative data models using:

**MongoDB (Document Store):**
```javascript
// User document schema
{
    _id: ObjectId,
    // Define your schema
}

// Post document schema
{
    _id: ObjectId,
    // Define your schema
}
```

**Redis (For caching and real-time features):**
```
// Define your key patterns and data structures
// e.g., user:123:followers -> Set
```

---

### Part 2: Capacity Estimation (30 points)

#### 2.1 Storage Estimation (15 points)

Calculate storage requirements for each data type:

| Data Type | Count/Day | Size/Item | Daily Storage | Annual Storage |
|-----------|-----------|-----------|---------------|----------------|
| Users | | | | |
| Posts | | | | |
| Comments | | | | |
| Likes | | | | |
| Follows | | | | |
| Media (images/videos) | | | | |
| **Total** | | | | |

**Show calculations:**
```
Example calculation:
Posts per day: 500 million
Average post size: ???
Daily post storage: ???
Annual post storage: ???
5-year storage with replication (3x): ???
```

#### 2.2 Query Traffic Estimation (15 points)

Calculate QPS for different operations:

| Operation | Daily Requests | Peak QPS | Average QPS |
|-----------|----------------|----------|-------------|
| View feed | | | |
| Create post | | | |
| Like post | | | |
| Comment | | | |
| Follow/unfollow | | | |
| Search | | | |

---

### Part 3: Indexing Strategy (30 points)

#### 3.1 Index Design (20 points)

For each major query pattern, design appropriate indexes:

| Query | Tables Involved | Index Definition | Index Type |
|-------|-----------------|------------------|------------|
| Get user's posts | posts | | |
| Get user's feed | posts, follows | | |
| Get post comments | comments | | |
| Get post likes count | likes | | |
| Search users by name | users | | |
| Get trending hashtags | hashtags, posts | | |

**For each index, explain:**
- Why this index is needed
- Expected query performance improvement
- Trade-offs (write performance impact)

#### 3.2 Query Optimization (10 points)

Write and optimize queries for:

**Query 1: Get user's feed (posts from followed users)**
```sql
-- Initial query
SELECT * FROM posts 
WHERE user_id IN (SELECT followed_id FROM follows WHERE follower_id = ?)
ORDER BY created_at DESC
LIMIT 20;

-- Optimized query (explain your optimizations)

-- EXPLAIN output analysis
```

**Query 2: Get trending posts in last 24 hours**
```sql
-- Write an optimized query for posts with most engagement

```

---

### Part 4: Replication & Scaling Strategy (50 points)

#### 4.1 Database Architecture Diagram (20 points)

Design the complete database architecture showing:
- Primary databases
- Read replicas
- Sharding strategy
- Caching layer
- Geographic distribution

```
[Draw or describe your architecture]

Include:
- Number of shards and sharding key
- Number of replicas per shard
- Replication topology (master-slave/multi-master)
- Cache placement (Redis cluster)
- Cross-region replication
```

#### 4.2 Sharding Strategy (15 points)

Design sharding for the posts table:

| Aspect | Decision | Reasoning |
|--------|----------|-----------|
| Sharding Key | | |
| Number of Shards | | |
| Shard Distribution | | |
| Cross-shard Query Handling | | |
| Rebalancing Strategy | | |

**Consider:**
- How to handle celebrity users with millions of followers
- How to handle time-range queries across shards
- Hot spot prevention

#### 4.3 Replication Configuration (15 points)

Design replication strategy:

| Aspect | Choice | Justification |
|--------|--------|---------------|
| Replication Type | Sync/Async/Semi-sync | |
| Number of Replicas | | |
| Replication Topology | | |
| Failover Strategy | | |
| Conflict Resolution | | |

**Provide configuration examples:**
```yaml
# PostgreSQL replication config
# or
# MySQL replication config
# or  
# MongoDB replica set config
```

---

### Part 5: Consistency & Transaction Handling (30 points)

#### 5.1 Transaction Design (15 points)

Design transactions for critical operations:

**Operation 1: Create a post with hashtags**
```sql
-- Design a transaction that:
-- 1. Inserts the post
-- 2. Extracts and links hashtags
-- 3. Updates hashtag counts
-- 4. Handles failures gracefully

BEGIN TRANSACTION;
-- Your implementation
COMMIT;
```

**Operation 2: Follow a user**
```sql
-- Design a transaction that:
-- 1. Creates follow relationship
-- 2. Updates follower/following counts
-- 3. Creates notification
-- 4. Handles duplicate follows

```

#### 5.2 Consistency Trade-offs (15 points)

Document your consistency decisions:

| Feature | Consistency Level | Justification |
|---------|-------------------|---------------|
| User profile updates | | |
| Like counts | | |
| Follower counts | | |
| Feed generation | | |
| Notifications | | |

**For each decision, explain:**
- Why this consistency level is appropriate
- What anomalies users might experience
- How to handle edge cases

---

### Part 6: Deep Dive - Feed Generation (20 points)

Design the newsfeed system in detail:

#### 6.1 Feed Generation Approach

Choose and justify your approach:

**Option A: Fan-out on Write (Push Model)**
```
When user posts → Push to all followers' feeds
Pros: Fast reads
Cons: Celebrity problem, storage cost
```

**Option B: Fan-out on Read (Pull Model)**
```
When user views feed → Fetch posts from followed users
Pros: Simple, storage efficient
Cons: Slow for users following many accounts
```

**Option C: Hybrid Approach**
```
Describe your hybrid strategy
```

#### 6.2 Implementation Design

```python
# Pseudocode for feed generation
class FeedService:
    def generate_feed(self, user_id, page_size=20, cursor=None):
        """
        Generate personalized feed for user
        """
        # Your implementation approach
        pass
    
    def handle_new_post(self, post_id, author_id):
        """
        Handle feed updates when a new post is created
        """
        # Your implementation approach
        pass
```

---

## Submission Format

### Document Structure
```
week03_project_[yourname]/
├── README.md                # Project overview
├── data-model/
│   ├── er-diagram.png       # ER diagram
│   ├── sql-schema.sql       # Complete SQL schema
│   └── nosql-models.md      # MongoDB/Redis schemas
├── capacity-estimation.md   # Part 2
├── indexing-strategy.md     # Part 3
├── replication-scaling.md   # Part 4
├── consistency.md           # Part 5
├── feed-design.md           # Part 6
└── diagrams/
    ├── architecture.png
    └── sharding.png
```

---

## Grading Rubric

| Section | Criteria | Points |
|---------|----------|--------|
| Part 1 | Data modeling completeness and correctness | 40 |
| Part 2 | Capacity estimation accuracy | 30 |
| Part 3 | Indexing strategy effectiveness | 30 |
| Part 4 | Replication and scaling design | 50 |
| Part 5 | Consistency handling | 30 |
| Part 6 | Feed generation design | 20 |
| **Total** | | **200** |

### Quality Factors
- Clear documentation (+/- 10%)
- Diagram quality (+/- 5%)
- Real-world considerations (+/- 5%)

---

## Bonus Challenges (Optional - Up to 50 extra points)

### Bonus 1: Analytics Database Design (15 points)
Design a separate analytics database for:
- User engagement metrics
- Post performance tracking
- Trending analysis
- A/B test results

### Bonus 2: Search Infrastructure (20 points)
Design the search system:
- Full-text search for posts
- User search with autocomplete
- Hashtag search
- Consider Elasticsearch integration

### Bonus 3: Real-time Features (15 points)
Design infrastructure for:
- Real-time notifications
- Live like counts
- Online presence indicators
- Consider WebSocket and Redis Pub/Sub

---

## Tips for Success

1. **Start with requirements** - Understand the scale before designing
2. **Think about access patterns** - Design data models around queries
3. **Consider trade-offs** - Document why you made each decision
4. **Plan for growth** - Design for 10x current scale
5. **Handle edge cases** - Celebrity accounts, viral posts, etc.
6. **Test your queries** - Use EXPLAIN to verify index usage
7. **Document assumptions** - State what you assumed and why

Good luck!
