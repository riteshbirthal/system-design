# Day 5 Assignment: Apply the System Design Framework

## Assignment Overview
**Difficulty:** Intermediate
**Estimated Time:** 90-120 minutes
**Points:** 100

---

## Objective
Apply the complete system design framework (RESHADED) to design a **URL Shortening Service** (like bit.ly or TinyURL).

---

## Part 1: Requirements Clarification (15 points)

### Task 1.1: Functional Requirements (8 points)
List 5 functional requirements for the URL shortener:

| ID | Requirement |
|----|-------------|
| FR1 | |
| FR2 | |
| FR3 | |
| FR4 | |
| FR5 | |

### Task 1.2: Non-Functional Requirements (7 points)
Define non-functional requirements:

| Category | Requirement |
|----------|-------------|
| Scale | |
| Latency | |
| Availability | |
| Durability | |

---

## Part 2: Estimation (20 points)

### Task 2.1: Traffic Estimation (10 points)

**Given:**
- 500 million new URL shortenings per month
- Read:Write ratio = 100:1
- URLs stored for 5 years

**Calculate:**

| Metric | Calculation | Result |
|--------|-------------|--------|
| URLs created per second | | |
| URLs read per second | | |
| Peak URLs read per second (3x) | | |

### Task 2.2: Storage Estimation (10 points)

**Given:**
- Short URL: 7 characters
- Original URL: average 500 bytes
- Total record size: ~1 KB (including metadata)

**Calculate:**

| Metric | Calculation | Result |
|--------|-------------|--------|
| Storage per year | | |
| Storage for 5 years | | |
| Storage with 3x replication | | |

---

## Part 3: Data Model (15 points)

### Task 3.1: Database Schema (8 points)
Design the database schema:

```sql
-- Write your schema here




```

### Task 3.2: Database Choice (7 points)
Which database would you choose and why?

| Database Option | Pros | Cons |
|-----------------|------|------|
| PostgreSQL | | |
| MongoDB | | |
| DynamoDB | | |

**Your Choice:** 

**Justification:**
```
[Explain your reasoning]
```

---

## Part 4: High-Level Design (20 points)

### Task 4.1: Architecture Diagram (15 points)
Draw the complete system architecture including:
- Load Balancer
- Application Servers
- Cache
- Database
- Any other necessary components

```
[Draw your architecture diagram here using ASCII art or attach an image]










```

### Task 4.2: Data Flow (5 points)
Describe the data flow for:

**URL Creation (Write):**
```
1. 
2. 
3. 
4. 
5. 
```

**URL Redirect (Read):**
```
1. 
2. 
3. 
4. 
```

---

## Part 5: API Design (10 points)

### Task 5.1: Define APIs (10 points)

| Endpoint | Method | Request Body | Response | Description |
|----------|--------|--------------|----------|-------------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

---

## Part 6: Detailed Design (10 points)

### Task 6.1: Short URL Generation Algorithm (10 points)
Design the algorithm to generate short URLs:

**Approach 1: Base62 Encoding**
```
[Explain how this works]
```

**Approach 2: Hash-based**
```
[Explain how this works]
```

**Approach 3: Counter-based with ID Generator**
```
[Explain how this works]
```

**Your Choice and Justification:**
```
[Which approach would you use and why?]
```

---

## Part 7: Trade-offs & Discussion (10 points)

### Task 7.1: Trade-offs Analysis (5 points)

| Decision | Trade-off Made | Alternative Considered |
|----------|----------------|----------------------|
| | | |
| | | |
| | | |

### Task 7.2: Potential Issues (5 points)
Identify and address potential issues:

| Issue | Impact | Mitigation |
|-------|--------|------------|
| Single point of failure | | |
| Hot spots | | |
| Cache invalidation | | |

---

## Submission Guidelines

1. Complete all parts
2. Include your architecture diagram
3. Show all calculations in estimation
4. Name your file: `day05_assignment_[yourname].md`
5. Submit by end of Week 1

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Requirements completeness | 15 |
| Estimation accuracy | 20 |
| Data model design | 15 |
| Architecture diagram | 20 |
| API design | 10 |
| Algorithm selection | 10 |
| Trade-off analysis | 10 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 20 extra points)

### Analytics Feature Design
Add an analytics feature that tracks:
- Click counts per URL
- Geographic distribution of clicks
- Referrer information
- Click timestamps

**Design:**
1. How would you store analytics data?
2. How would you handle high write throughput?
3. How would you query aggregate statistics?
4. Draw the updated architecture

```
[Your design here]
```
