# Day 3 Assignment: Scalability Analysis

## Assignment Overview
**Difficulty:** Beginner-Intermediate
**Estimated Time:** 60-75 minutes
**Points:** 100

---

## Scenario
You are a system architect at a startup called "QuickPost" - a social media platform similar to Twitter. The platform has grown from 10,000 users to 1 million users in 6 months, and is experiencing performance issues. Your task is to analyze the current architecture and propose scaling solutions.

### Current Architecture
```
┌─────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Users     │────▶│  Single Server  │────▶│ Single Database │
│ (1M users)  │     │   (16 CPU,      │     │   (PostgreSQL)  │
└─────────────┘     │    64GB RAM)    │     │    (500GB SSD)  │
                    └─────────────────┘     └─────────────────┘
```

### Current Metrics
- Average response time: 3 seconds (target: <500ms)
- Peak concurrent users: 50,000
- Database CPU: 90% during peak
- Server CPU: 85% during peak
- Daily posts created: 500,000
- Daily reads: 50,000,000

---

## Part 1: Problem Analysis (25 points)

### Task 1.1: Identify Bottlenecks (15 points)
Based on the current architecture and metrics, identify at least 3 bottlenecks and explain why each is a problem:

| Bottleneck | Component | Why It's a Problem |
|------------|-----------|-------------------|
| 1. | | |
| 2. | | |
| 3. | | |

### Task 1.2: Risk Assessment (10 points)
What are the risks of the current single-server architecture? List at least 4 risks:

1. 
2. 
3. 
4. 

---

## Part 2: Scaling Strategy (35 points)

### Task 2.1: Vertical vs Horizontal Analysis (15 points)
Complete the table comparing scaling options for QuickPost:

| Criteria | Vertical Scaling | Horizontal Scaling |
|----------|------------------|-------------------|
| Short-term cost | | |
| Long-term cost | | |
| Implementation complexity | | |
| Maximum capacity | | |
| Downtime required | | |
| Recommended for QuickPost? (Yes/No + Why) | | |

### Task 2.2: Proposed Architecture (20 points)
Design a scaled architecture for QuickPost that can handle:
- 10 million users
- 100,000 concurrent users
- 5 million daily posts
- 500 million daily reads

**Requirements:**
1. Draw an architecture diagram showing all components
2. Label each component
3. Explain the purpose of each new component added

**Your Architecture Diagram:**
```
[Draw your architecture here using ASCII art or submit an image]




```

**Component Explanations:**

| Component | Purpose |
|-----------|---------|
| | |
| | |
| | |
| | |
| | |

---

## Part 3: Stateless Design (20 points)

### Task 3.1: Session Management (10 points)
The current QuickPost stores user sessions in server memory. Explain:

1. Why is this a problem for horizontal scaling?
   ```
   [Your answer]
   ```

2. How would you redesign session management to be stateless?
   ```
   [Your answer]
   ```

### Task 3.2: Implementation Steps (10 points)
List the steps to convert QuickPost from stateful to stateless:

1. 
2. 
3. 
4. 
5. 

---

## Part 4: Scaling Patterns Application (20 points)

### Task 4.1: Pattern Selection (20 points)
For each scenario, select the most appropriate scaling pattern and explain why:

**Scenario A:** QuickPost's database is overloaded with read requests
- Pattern: 
- Implementation:
- Why this pattern:

**Scenario B:** Some users are more active and generate more posts than others
- Pattern:
- Implementation:
- Why this pattern:

**Scenario C:** User profile images are loaded millions of times per day
- Pattern:
- Implementation:
- Why this pattern:

**Scenario D:** Push notifications need to be sent to millions of users
- Pattern:
- Implementation:
- Why this pattern:

---

## Submission Guidelines

1. Complete all sections
2. Include your architecture diagram (ASCII or image)
3. Name your file: `day03_assignment_[yourname].md`
4. Submit by end of Day 3

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Bottleneck identification accuracy | 15 |
| Risk assessment completeness | 10 |
| Scaling comparison analysis | 15 |
| Architecture diagram quality | 20 |
| Stateless design explanation | 20 |
| Pattern application correctness | 20 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Auto-Scaling Strategy (15 points)
Design an auto-scaling strategy for QuickPost that:
1. Scales up during peak hours (8 PM - 12 AM)
2. Scales down during low traffic (3 AM - 6 AM)
3. Handles unexpected traffic spikes

Include:
- Metrics to monitor
- Thresholds for scaling decisions
- Minimum and maximum server counts
- Cool-down periods
- Cost optimization considerations
