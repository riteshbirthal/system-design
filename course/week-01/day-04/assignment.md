# Day 4 Assignment: System Estimation Practice

## Assignment Overview
**Difficulty:** Intermediate
**Estimated Time:** 75-90 minutes
**Points:** 100

---

## Part 1: Quick Estimations (30 points)

### Task 1.1: Unit Conversions (10 points)
Complete the following conversions:

| Question | Your Answer |
|----------|-------------|
| 1 day = _____ seconds | |
| 1 year ≈ _____ million seconds | |
| 1 GB = _____ bytes (approximate) | |
| 2³⁰ ≈ _____ billion | |
| 500 million daily requests = _____ RPS | |

### Task 1.2: Quick Calculations (20 points)
Answer these estimation questions:

**Q1:** A mobile app has 50 million monthly active users. On average, each user makes 10 API calls per day. What's the average RPS?
```
Calculation:

Answer:
```

**Q2:** An image hosting service stores 100,000 new images daily. Average image size is 2 MB. How much storage is needed per year?
```
Calculation:

Answer:
```

**Q3:** A database can handle 10,000 QPS. Peak traffic is 80,000 QPS. How many database replicas are needed?
```
Calculation:

Answer:
```

**Q4:** A video platform has 20 million concurrent viewers. Streaming at 4 Mbps. What's the total bandwidth?
```
Calculation:

Answer:
```

---

## Part 2: Instagram-like Photo Sharing App (35 points)

### Scenario
Design capacity estimates for a photo-sharing application with:
- 1 billion total users
- 500 million daily active users (DAU)
- Each user uploads average 2 photos per day
- Each user views average 200 photos per day
- Photos stored in 3 sizes: thumbnail (10 KB), medium (200 KB), original (2 MB)
- User profile size: 2 KB
- Photo metadata: 500 bytes

### Task 2.1: Storage Estimation (15 points)

**Daily Photo Storage:**
```
Show your calculations:

Total daily storage needed:
```

**Annual Photo Storage (with 3x replication):**
```
Show your calculations:

Total annual storage:
```

**User Data Storage:**
```
Show your calculations:

Total user data storage:
```

### Task 2.2: Traffic Estimation (10 points)

**Write Traffic (Photo uploads):**
```
Photos per second:
Bandwidth (assuming original upload):
```

**Read Traffic (Photo views):**
```
Requests per second:
Bandwidth (assuming medium size views):
```

### Task 2.3: Infrastructure Estimation (10 points)

Given:
- Application server handles 10,000 RPS
- Database server handles 5,000 QPS
- CDN edge server handles 50,000 RPS

```
Application servers needed:
Database servers needed:
CDN edge servers needed:

(Include calculations for peak at 3x average)
```

---

## Part 3: Chat Application (35 points)

### Scenario
Estimate requirements for a WhatsApp-like chat application:
- 2 billion total users
- 1 billion daily active users
- Each user sends 50 messages per day
- Each user receives 50 messages per day
- Message size: 100 bytes (text) + 200 bytes (metadata)
- 5% of messages include images (500 KB average)
- Messages stored for 1 year
- 10% of users are online simultaneously at peak

### Task 3.1: Storage Calculations (15 points)

**Daily Message Storage:**
```
Text messages storage:
Image storage:
Total daily storage:
```

**Annual Storage (with replication):**
```
Calculation:

Annual storage with 3x replication:
```

### Task 3.2: Traffic Calculations (10 points)

**Message Send Rate:**
```
Messages per second (average):
Messages per second (peak):
```

**Bandwidth Requirements:**
```
Incoming bandwidth:
Outgoing bandwidth:
Total bandwidth at peak:
```

### Task 3.3: Connection Requirements (10 points)

**WebSocket Connections:**
```
Peak concurrent connections:
If each server handles 50,000 connections:
Servers needed:
```

---

## Submission Guidelines

1. Show all calculations
2. Round to reasonable precision
3. State any assumptions you make
4. Name your file: `day04_assignment_[yourname].md`

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Quick estimation accuracy | 30 |
| Instagram storage calculations | 15 |
| Instagram traffic calculations | 10 |
| Instagram infrastructure estimates | 10 |
| Chat storage calculations | 15 |
| Chat traffic calculations | 10 |
| Chat connection calculations | 10 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 20 extra points)

### Design a Cost Estimation

Using cloud pricing (approximate):
- Storage: $0.02 per GB per month
- Bandwidth: $0.05 per GB outbound
- Server: $100 per server per month
- Database: $500 per instance per month

**Calculate monthly infrastructure cost for the Instagram-like app.**

| Resource | Quantity | Monthly Cost |
|----------|----------|--------------|
| Storage | | |
| Bandwidth | | |
| Application Servers | | |
| Database Servers | | |
| CDN | | |
| **Total** | | |

Include any assumptions you make about data transfer patterns.
