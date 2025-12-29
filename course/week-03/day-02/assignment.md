# Day 2 Assignment: NoSQL Databases

## Assignment Overview
**Difficulty:** Intermediate
**Estimated Time:** 60-75 minutes
**Points:** 100

---

## Part 1: Database Selection (25 points)

### Task 1.1 (25 points)
For each scenario, recommend the most appropriate database (SQL or specific NoSQL type) and justify:

| Scenario | Database Type | Specific Database | Justification |
|----------|--------------|-------------------|---------------|
| User sessions for a web app with millions of users | | | |
| Social media posts with comments and likes | | | |
| IoT sensor readings (1 million writes/second) | | | |
| E-commerce product catalog with varying attributes | | | |
| Friend recommendations ("people you may know") | | | |
| Banking transactions | | | |
| Gaming leaderboard with real-time updates | | | |
| Full-text search for articles | | | |

---

## Part 2: MongoDB Data Modeling (30 points)

### Task 2.1 (20 points)
Design a MongoDB schema for a **Blogging Platform** with:
- Users (authors and readers)
- Blog posts (with tags)
- Comments (nested under posts)
- Likes on posts and comments
- Categories

Decide between embedding vs referencing for each relationship. Provide:

1. **Document structures** for each collection
2. **Sample documents** with realistic data
3. **Justification** for embedding vs referencing decisions

```javascript
// Example format
// users collection
{
    "_id": ObjectId("..."),
    // Your design here
}

// posts collection
{
    "_id": ObjectId("..."),
    // Your design here
}
```

### Task 2.2 (10 points)
Write MongoDB queries for:

1. Find all posts by a specific author, sorted by date
2. Find posts with more than 100 likes
3. Find posts that have both "javascript" and "nodejs" tags
4. Get post with all comments and commenter details

---

## Part 3: Redis Implementation (25 points)

### Task 3.1 (15 points)
Design Redis data structures for a **Real-Time Analytics Dashboard** that tracks:
- Page views per page (last 24 hours)
- Unique visitors per page
- Currently online users
- Popular pages (top 10 by views)

For each feature:
1. Choose appropriate Redis data structure
2. Show Redis commands for reading/writing
3. Explain TTL strategy for time-windowed data

### Task 3.2 (10 points)
Design a **Rate Limiter** using Redis that:
- Limits users to 100 requests per minute
- Returns remaining requests and reset time

Provide:
1. Redis commands to implement
2. Pseudocode for the rate limiter logic
3. How to handle distributed rate limiting

---

## Part 4: Cassandra Data Modeling (20 points)

### Task 4.1 (20 points)
Design a Cassandra schema for a **Video Streaming Platform** that needs to support:
- Query 1: Get all videos uploaded by a user
- Query 2: Get user's watch history (most recent first)
- Query 3: Get trending videos for today
- Query 4: Get videos by category

For each query:
1. Design the table schema with appropriate keys
2. Explain partition key and clustering column choices
3. Write the CQL query

```sql
-- Example format
CREATE TABLE user_videos (
    -- Your design here
);
```

---

## Submission Guidelines

1. Save your answers in `day02_nosql_assignment_[yourname].md`
2. Include all code/queries with proper formatting
3. Submit by the end of Day 2

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Database Selection Reasoning | 20 |
| MongoDB Schema Design | 25 |
| MongoDB Queries | 10 |
| Redis Design | 25 |
| Cassandra Modeling | 20 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Bonus: Graph Database Design (15 points)
Design a Neo4j schema for a **Job Recommendation System**:
- People have skills
- Jobs require skills
- People work at companies
- Companies post jobs
- People can connect with each other

1. Draw the graph model (nodes and relationships)
2. Write Cypher queries for:
   - Find jobs that match a person's skills
   - Find people at companies that have open positions
   - Suggest connections (friends of friends)
