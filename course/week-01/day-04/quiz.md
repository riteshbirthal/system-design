# Day 4 Quiz: Back-of-Envelope Estimation

## Instructions
- Total Questions: 10
- Time Limit: 20 minutes
- Passing Score: 70%
- Calculator allowed

---

## Questions

### Question 1
**Approximately how many seconds are in a day?**

A) 8,640
B) 86,400
C) 864,000
D) 8,640,000

<details>
<summary>Answer</summary>
B) 86,400

Calculation: 24 hours × 60 minutes × 60 seconds = 86,400
</details>

---

### Question 2
**If a system has 10 million daily requests, approximately how many requests per second is that?**

A) ~10 RPS
B) ~100 RPS
C) ~1,000 RPS
D) ~10,000 RPS

<details>
<summary>Answer</summary>
B) ~100 RPS

Calculation: 10,000,000 / 86,400 ≈ 116 ≈ ~100 RPS
</details>

---

### Question 3
**How many bytes are in 1 Gigabyte?**

A) 1 million bytes
B) 1 billion bytes
C) 1 trillion bytes
D) 10 million bytes

<details>
<summary>Answer</summary>
B) 1 billion bytes (approximately)

1 GB = 1024³ bytes ≈ 1,073,741,824 ≈ 1 billion bytes
</details>

---

### Question 4
**A system stores 1 TB of new data daily. How much storage is needed for 1 year (without replication)?**

A) 36.5 TB
B) 365 TB
C) 3.65 PB
D) 36.5 PB

<details>
<summary>Answer</summary>
B) 365 TB

Calculation: 1 TB × 365 days = 365 TB
</details>

---

### Question 5
**What is the typical round-trip latency within a data center?**

A) 0.5 nanoseconds
B) 0.5 microseconds
C) 0.5 milliseconds
D) 5 milliseconds

<details>
<summary>Answer</summary>
C) 0.5 milliseconds

Data center network round trips are typically around 0.5ms.
</details>

---

### Question 6
**If a tweet is 280 characters and uses UTF-8 encoding, what's a reasonable estimate for tweet text size?**

A) 28 bytes
B) 280 bytes
C) 2.8 KB
D) 28 KB

<details>
<summary>Answer</summary>
B) 280 bytes

In UTF-8, ASCII characters are 1 byte each, so 280 characters ≈ 280 bytes (up to 4 bytes for special characters)
</details>

---

### Question 7
**A video streaming service has 50 million concurrent viewers watching at 5 Mbps. What's the total bandwidth needed?**

A) 250 Tbps
B) 25 Tbps
C) 2.5 Tbps
D) 250 Gbps

<details>
<summary>Answer</summary>
A) 250 Tbps

Calculation: 50,000,000 × 5 Mbps = 250,000,000 Mbps = 250 Tbps
</details>

---

### Question 8
**2²⁰ is approximately equal to:**

A) 100 thousand
B) 1 million
C) 10 million
D) 100 million

<details>
<summary>Answer</summary>
B) 1 million

2²⁰ = 1,048,576 ≈ 1 million
</details>

---

### Question 9
**If a database handles 5,000 queries per second and you need to support 50,000 QPS, how many database servers do you need (minimum)?**

A) 5 servers
B) 10 servers
C) 15 servers
D) 20 servers

<details>
<summary>Answer</summary>
B) 10 servers

Calculation: 50,000 / 5,000 = 10 servers minimum
(In practice, you'd add 50-100% buffer)
</details>

---

### Question 10
**A URL shortener creates 100 million URLs per month. Each URL mapping is 500 bytes. How much storage is needed per year (without replication)?**

A) 60 GB
B) 600 GB
C) 6 TB
D) 60 TB

<details>
<summary>Answer</summary>
B) 600 GB

Calculation:
- Monthly URLs: 100 million
- Yearly URLs: 100M × 12 = 1.2 billion
- Storage: 1.2B × 500 bytes = 600 GB
</details>

---

## Bonus Questions (Optional)

### Bonus Question 1
**A chat application has 100 million DAU. Each user sends an average of 20 messages per day. Each message is 100 bytes. What's the daily storage requirement?**

<details>
<summary>Answer</summary>
200 GB per day

Calculation:
- Daily messages: 100M × 20 = 2 billion messages
- Storage: 2B × 100 bytes = 200 GB
</details>

---

### Bonus Question 2
**If peak traffic is 3x the average, and average is 10,000 RPS, how many servers do you need if each server handles 5,000 RPS at peak?**

<details>
<summary>Answer</summary>
6 servers (minimum)

Calculation:
- Peak RPS: 10,000 × 3 = 30,000 RPS
- Servers: 30,000 / 5,000 = 6 servers
- With buffer: 9-12 servers recommended
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! You've mastered estimation
- 7-8 correct: Good understanding, practice more
- 5-6 correct: Review the formulas and examples
- Below 5: Re-read Day 4 content and practice calculations
