# Week 1 Comprehensive Quiz: System Design Fundamentals

## Instructions
- Total Questions: 25
- Time Limit: 45 minutes
- Passing Score: 70% (18 correct)
- This quiz covers all topics from Week 1

---

## Section A: Concepts (10 questions)

### Question 1
**What is the main difference between High-Level Design (HLD) and Low-Level Design (LLD)?**

A) HLD is for frontend, LLD is for backend
B) HLD focuses on architecture, LLD focuses on implementation details
C) HLD uses diagrams, LLD uses code
D) There is no difference

<details>
<summary>Answer</summary>
B) HLD focuses on architecture, LLD focuses on implementation details
</details>

---

### Question 2
**Which metric measures the number of requests a system can process per unit time?**

A) Latency
B) Throughput
C) Availability
D) Reliability

<details>
<summary>Answer</summary>
B) Throughput
</details>

---

### Question 3
**What does "99.99% availability" mean in terms of annual downtime?**

A) About 9 hours
B) About 53 minutes
C) About 5 minutes
D) About 9 days

<details>
<summary>Answer</summary>
B) About 53 minutes (52.56 minutes to be exact)
</details>

---

### Question 4
**Which is NOT a characteristic of a well-designed system?**

A) Scalability
B) Complexity
C) Reliability
D) Maintainability

<details>
<summary>Answer</summary>
B) Complexity - Good systems should be as simple as possible while meeting requirements
</details>

---

### Question 5
**In the MoSCoW prioritization method, what does "S" stand for?**

A) Sometimes Have
B) Should Have
C) Shall Have
D) Soon Have

<details>
<summary>Answer</summary>
B) Should Have
</details>

---

### Question 6
**What is the primary advantage of horizontal scaling over vertical scaling?**

A) It's simpler to implement
B) It requires no code changes
C) It has virtually unlimited scaling potential
D) It has lower latency

<details>
<summary>Answer</summary>
C) It has virtually unlimited scaling potential
</details>

---

### Question 7
**What makes an application "stateless"?**

A) It doesn't use a database
B) It doesn't store session data on the server
C) It doesn't have any state
D) It uses microservices

<details>
<summary>Answer</summary>
B) It doesn't store session data on the server
</details>

---

### Question 8
**Approximately how many seconds are in a day?**

A) 3,600
B) 36,000
C) 86,400
D) 864,000

<details>
<summary>Answer</summary>
C) 86,400 (24 × 60 × 60)
</details>

---

### Question 9
**In the RESHADED framework, what is the first step?**

A) Estimation
B) High-level Design
C) Requirements
D) Storage Schema

<details>
<summary>Answer</summary>
C) Requirements
</details>

---

### Question 10
**What is the purpose of a load balancer?**

A) Store data permanently
B) Distribute traffic across multiple servers
C) Cache frequently accessed data
D) Manage database transactions

<details>
<summary>Answer</summary>
B) Distribute traffic across multiple servers
</details>

---

## Section B: Requirements (5 questions)

### Question 11
**Which of the following is a functional requirement for an email service?**

A) The system should handle 1 million users
B) Emails should be delivered within 5 seconds
C) Users should be able to compose and send emails
D) The system should have 99.9% uptime

<details>
<summary>Answer</summary>
C) Users should be able to compose and send emails
</details>

---

### Question 12
**For a banking application, which trade-off would you prioritize?**

A) Availability over Consistency
B) Consistency over Availability
C) Speed over Accuracy
D) Features over Security

<details>
<summary>Answer</summary>
B) Consistency over Availability - Financial transactions require data accuracy
</details>

---

### Question 13
**What is the correct format for a user story?**

A) The system shall [action] for [user]
B) As a [user], I want to [action] so that [benefit]
C) [User] needs [feature] because [reason]
D) Implement [feature] for [user]

<details>
<summary>Answer</summary>
B) As a [user], I want to [action] so that [benefit]
</details>

---

### Question 14
**Which non-functional requirement category does "response time under 200ms" belong to?**

A) Scalability
B) Availability
C) Performance/Latency
D) Security

<details>
<summary>Answer</summary>
C) Performance/Latency
</details>

---

### Question 15
**What is P95 latency?**

A) 95th percentile of response times
B) 95% of requests are successful
C) System is up 95% of the time
D) 95% of data is accurate

<details>
<summary>Answer</summary>
A) 95th percentile of response times - 95% of requests complete within this time
</details>

---

## Section C: Scalability (5 questions)

### Question 16
**What is database sharding?**

A) Making copies of the entire database
B) Splitting data across multiple databases based on a key
C) Encrypting database data
D) Compressing database tables

<details>
<summary>Answer</summary>
B) Splitting data across multiple databases based on a key
</details>

---

### Question 17
**Which component would you use to make session management stateless?**

A) Local file system
B) Server memory
C) External cache like Redis
D) Local SQLite database

<details>
<summary>Answer</summary>
C) External cache like Redis
</details>

---

### Question 18
**What is the main purpose of database replication?**

A) Split data into smaller pieces
B) Provide redundancy and distribute read load
C) Encrypt data at rest
D) Speed up write operations

<details>
<summary>Answer</summary>
B) Provide redundancy and distribute read load
</details>

---

### Question 19
**Which scaling approach requires the least code changes?**

A) Horizontal scaling
B) Vertical scaling
C) Database sharding
D) Microservices migration

<details>
<summary>Answer</summary>
B) Vertical scaling - just upgrade hardware, no application changes needed
</details>

---

### Question 20
**What problem does "sticky sessions" solve?**

A) Slow session creation
B) Session data stored on specific servers
C) Session security issues
D) Too many sessions

<details>
<summary>Answer</summary>
B) Session data stored on specific servers - routes same user to same server
</details>

---

## Section D: Estimation (5 questions)

### Question 21
**If a system has 100 million daily requests, what is the approximate RPS?**

A) ~100 RPS
B) ~1,000 RPS
C) ~10,000 RPS
D) ~100,000 RPS

<details>
<summary>Answer</summary>
B) ~1,000 RPS (100M / 86,400 ≈ 1,157 ≈ 1,000 RPS)
</details>

---

### Question 22
**How much storage is needed for 1 billion records of 1 KB each?**

A) 1 GB
B) 10 GB
C) 100 GB
D) 1 TB

<details>
<summary>Answer</summary>
D) 1 TB (1 billion × 1 KB = 1 TB)
</details>

---

### Question 23
**2³⁰ is approximately equal to:**

A) 1 million
B) 1 billion
C) 10 billion
D) 100 billion

<details>
<summary>Answer</summary>
B) 1 billion (2³⁰ ≈ 1,073,741,824)
</details>

---

### Question 24
**If a server handles 5,000 QPS and you need to support 50,000 QPS at peak, how many servers are needed (minimum)?**

A) 5
B) 10
C) 15
D) 20

<details>
<summary>Answer</summary>
B) 10 (50,000 / 5,000 = 10)
</details>

---

### Question 25
**What is the typical round-trip latency within a data center?**

A) 0.5 nanoseconds
B) 0.5 microseconds
C) 0.5 milliseconds
D) 5 milliseconds

<details>
<summary>Answer</summary>
C) 0.5 milliseconds
</details>

---

## Scoring

| Score | Grade | Feedback |
|-------|-------|----------|
| 23-25 | A | Excellent! You've mastered Week 1 concepts |
| 20-22 | B | Great job! Ready for Week 2 |
| 18-19 | C | Good work! Review weak areas |
| 15-17 | D | Review materials before Week 2 |
| Below 15 | F | Re-study Week 1 content |

---

## Answer Key

| Q | Answer | Q | Answer | Q | Answer | Q | Answer | Q | Answer |
|---|--------|---|--------|---|--------|---|--------|---|--------|
| 1 | B | 6 | C | 11 | C | 16 | B | 21 | B |
| 2 | B | 7 | B | 12 | B | 17 | C | 22 | D |
| 3 | B | 8 | C | 13 | B | 18 | B | 23 | B |
| 4 | B | 9 | C | 14 | C | 19 | B | 24 | B |
| 5 | B | 10 | B | 15 | A | 20 | B | 25 | C |
