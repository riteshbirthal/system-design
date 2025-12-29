# Day 5: System Design Process & Framework

## Learning Objectives
- Learn a structured approach to system design problems
- Understand the system design interview framework
- Practice breaking down problems systematically
- Learn to communicate design decisions effectively

---

## 1. The System Design Process

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    SYSTEM DESIGN PROCESS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1          Step 2          Step 3          Step 4        │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ Clarify  │───▶│ Estimate │───▶│ High-Level│───▶│ Deep     │  │
│  │ Require- │    │ Scale    │    │ Design   │    │ Dive     │  │
│  │ ments    │    │          │    │          │    │          │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │              │               │               │          │
│       ▼              ▼               ▼               ▼          │
│    5 min          5 min          15 min          15 min        │
│                                                                 │
│                         Step 5                                  │
│                    ┌──────────────┐                            │
│                    │ Wrap Up &    │                            │
│                    │ Trade-offs   │                            │
│                    └──────────────┘                            │
│                          │                                      │
│                          ▼                                      │
│                       5 min                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Step 1: Clarify Requirements (5 minutes)

### Why It Matters
- Avoids designing the wrong system
- Shows communication skills
- Narrows scope appropriately

### Questions to Ask

#### Functional Requirements
```
- What are the core features?
- Who are the users?
- What are the main use cases?
- What operations should the system support?
- Are there any features explicitly out of scope?
```

#### Non-Functional Requirements
```
- What is the expected scale? (users, data, traffic)
- What are latency requirements?
- What is the availability target?
- Is consistency critical or can we have eventual consistency?
- What is the read:write ratio?
```

#### Constraints
```
- Are there technology constraints?
- What is the budget?
- What is the timeline?
- Are there regulatory requirements?
```

### Example: Design Twitter

**Questions to Ask:**
1. What features should we support? (Post tweets, follow users, timeline)
2. How many users? (500M total, 200M DAU)
3. How many tweets per day? (500M)
4. Should tweets support media? (Yes, images and videos)
5. What's the read:write ratio? (1000:1)
6. What's the latency requirement? (<200ms for timeline)
7. Is availability or consistency more important? (Availability)

### Output of Step 1
Document:
- Core functional requirements (3-5 main features)
- Key non-functional requirements (scale, latency, availability)
- Scope boundaries (what's in/out)

---

## 3. Step 2: Estimate Scale (5 minutes)

### Back-of-Envelope Calculations

#### Traffic Estimation
```
Daily Active Users × Actions per User = Daily Requests
Daily Requests ÷ 86,400 = Requests per Second (RPS)
Peak RPS = Average RPS × 2-3
```

#### Storage Estimation
```
Items per Day × Item Size = Daily Storage
Daily Storage × 365 × Years = Total Storage
Apply replication factor (typically 3x)
```

#### Bandwidth Estimation
```
RPS × Request Size = Incoming Bandwidth
RPS × Response Size = Outgoing Bandwidth
```

### Example: Twitter Estimation
```
Users: 500M total, 200M DAU
Tweets/day: 500M (avg 2.5 per user)
Tweet reads/day: 500B (avg 1000 reads per tweet)

Write RPS: 500M / 86400 ≈ 6,000 RPS
Read RPS: 500B / 86400 ≈ 6M RPS

Storage/year: 500M tweets × 1KB × 365 = 180 TB/year
With media: 180 TB × 10 = 1.8 PB/year
```

---

## 4. Step 3: High-Level Design (15 minutes)

### Process
1. Identify main components
2. Define how components interact
3. Draw architecture diagram
4. Explain data flow

### Common Components

| Component | Purpose |
|-----------|---------|
| Load Balancer | Distribute traffic |
| API Gateway | Route requests, rate limiting |
| Application Servers | Business logic |
| Cache | Fast data access |
| Database | Persistent storage |
| Message Queue | Async processing |
| CDN | Static content delivery |
| Search Service | Full-text search |
| Notification Service | Push/email notifications |

### Architecture Template

```
                            ┌─────────┐
                            │   CDN   │
                            └────┬────┘
                                 │
    ┌────────────────────────────┼────────────────────────────┐
    │                            │                            │
    ▼                            ▼                            ▼
┌────────┐                 ┌──────────┐                 ┌──────────┐
│ Mobile │                 │   Web    │                 │   API    │
│  App   │                 │ Browser  │                 │ Clients  │
└───┬────┘                 └────┬─────┘                 └────┬─────┘
    │                           │                            │
    └───────────────────────────┼────────────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    Load Balancer      │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │     API Gateway       │
                    │  (Auth, Rate Limit)   │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ User Service  │       │ Tweet Service │       │ Feed Service  │
└───────┬───────┘       └───────┬───────┘       └───────┬───────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│   User DB     │       │  Tweet DB     │       │   Cache       │
│  (PostgreSQL) │       │  (Cassandra)  │       │   (Redis)     │
└───────────────┘       └───────────────┘       └───────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    Message Queue      │
                    │      (Kafka)          │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ Notification  │       │    Search     │       │   Analytics   │
│   Service     │       │   Service     │       │   Service     │
└───────────────┘       └───────────────┘       └───────────────┘
```

### Design Principles to Apply
1. **Single Responsibility**: Each service does one thing well
2. **Loose Coupling**: Services can be deployed independently
3. **Stateless Services**: Easy to scale horizontally
4. **Data Locality**: Keep related data together

---

## 5. Step 4: Deep Dive (15 minutes)

### Areas to Explore

#### Data Model
- Define database schema
- Choose appropriate database types
- Design indexes for query patterns

#### API Design
- Define main endpoints
- Request/response formats
- Authentication/authorization

#### Algorithms & Logic
- Core algorithms (feed generation, ranking)
- Business logic handling
- Data processing pipelines

#### Scaling Strategies
- Database sharding strategy
- Caching strategy
- Load balancing approach

### Example: Twitter Deep Dive

#### Database Schema
```sql
-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100),
    created_at TIMESTAMP,
    follower_count INT,
    following_count INT
);

-- Tweets table
CREATE TABLE tweets (
    tweet_id UUID PRIMARY KEY,
    user_id UUID,
    content TEXT,
    created_at TIMESTAMP,
    like_count INT,
    retweet_count INT
);

-- Followers table
CREATE TABLE followers (
    follower_id UUID,
    followee_id UUID,
    created_at TIMESTAMP,
    PRIMARY KEY (followee_id, follower_id)
);
```

#### API Endpoints
```
POST /api/tweets              - Create tweet
GET  /api/tweets/{id}         - Get tweet
GET  /api/users/{id}/timeline - Get user timeline
GET  /api/users/{id}/feed     - Get home feed
POST /api/users/{id}/follow   - Follow user
```

#### Feed Generation Algorithm
```
Two approaches:

1. Pull Model (Fan-out on read):
   - Query all followed users
   - Get recent tweets from each
   - Merge and sort
   - Pros: Simple, fresh data
   - Cons: Slow for users with many followees

2. Push Model (Fan-out on write):
   - Pre-compute feeds in cache
   - Update followers' feeds on new tweet
   - Pros: Fast reads
   - Cons: Expensive for celebrities (many followers)

3. Hybrid Approach (Recommended):
   - Push for normal users
   - Pull for celebrities (>1M followers)
```

---

## 6. Step 5: Wrap Up & Trade-offs (5 minutes)

### Discuss Trade-offs

| Decision | Trade-off |
|----------|-----------|
| SQL vs NoSQL | Consistency vs Scalability |
| Push vs Pull feed | Write cost vs Read latency |
| Caching | Memory cost vs Response time |
| Replication | Storage cost vs Availability |

### Address Potential Issues

#### Single Points of Failure
- Identify and add redundancy

#### Bottlenecks
- Identify potential bottlenecks
- Propose solutions (caching, sharding, async)

#### Monitoring & Observability
- Key metrics to track
- Alerting strategy

### Future Improvements
- Suggest enhancements given more time
- Discuss what could be optimized

---

## 7. Framework Summary

### The RESHADED Framework

| Letter | Step | Time |
|--------|------|------|
| R | Requirements | 5 min |
| E | Estimation | 5 min |
| S | Storage Schema | 5 min |
| H | High-level Design | 10 min |
| A | APIs | 5 min |
| D | Detailed Design | 10 min |
| E | Evaluate (Trade-offs) | 5 min |
| D | Discuss Bottlenecks | 5 min |

---

## 8. Communication Tips

### Do's
- Think out loud
- Ask clarifying questions
- Justify your decisions
- Consider trade-offs
- Be open to feedback

### Don'ts
- Don't jump to solutions
- Don't over-engineer
- Don't ignore scale
- Don't forget about failures
- Don't monopolize the conversation

### Phrases to Use
```
"Let me start by clarifying the requirements..."
"Based on the scale, we'll need approximately..."
"I'm choosing X because..."
"The trade-off here is..."
"One potential bottleneck is..."
"If we had more time, we could..."
```

---

## 9. Summary

1. **Clarify** requirements before designing
2. **Estimate** scale to guide architecture decisions
3. **Design** high-level architecture with key components
4. **Deep dive** into critical areas
5. **Evaluate** trade-offs and address concerns

---

## Further Reading
- "System Design Interview" by Alex Xu
- [Grokking System Design](https://www.educative.io/courses/grokking-the-system-design-interview)
- [Hello Interview System Design](https://www.hellointerview.com/learn/system-design)
