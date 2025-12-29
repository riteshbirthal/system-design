# Day 2 Quiz: Functional & Non-Functional Requirements

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**Which of the following is a functional requirement?**

A) The system shall respond within 200ms
B) The system shall have 99.9% uptime
C) Users shall be able to reset their password
D) The system shall handle 10,000 concurrent users

<details>
<summary>Answer</summary>
C) Users shall be able to reset their password

Explanation: Functional requirements describe what the system does (features/behaviors). Password reset is a specific function.
</details>

---

### Question 2
**What does "99.9% availability" mean in terms of maximum downtime per year?**

A) 3.65 days
B) 8.76 hours
C) 52.6 minutes
D) 5.26 minutes

<details>
<summary>Answer</summary>
B) 8.76 hours

Explanation: 99.9% (3 nines) allows for 0.1% downtime = 365 * 24 * 0.001 = 8.76 hours/year
</details>

---

### Question 3
**Which NFR category does "System shall encrypt all data using AES-256" belong to?**

A) Scalability
B) Performance
C) Security
D) Maintainability

<details>
<summary>Answer</summary>
C) Security
</details>

---

### Question 4
**In the MoSCoW prioritization method, what does the "S" stand for?**

A) Sometimes Have
B) Should Have
C) Shall Have
D) Soon Have

<details>
<summary>Answer</summary>
B) Should Have

Explanation: MoSCoW = Must have, Should have, Could have, Won't have
</details>

---

### Question 5
**Which metric is commonly used to measure latency?**

A) Requests per second
B) P95 response time
C) Uptime percentage
D) Lines of code

<details>
<summary>Answer</summary>
B) P95 response time

Explanation: P95 (95th percentile) indicates that 95% of requests complete within this time.
</details>

---

### Question 6
**What is the correct format for a user story?**

A) The system shall [action] for [user]
B) As a [user], I want to [action] so that [benefit]
C) When [user] does [action], then [result]
D) [User] requires [feature] by [date]

<details>
<summary>Answer</summary>
B) As a [user], I want to [action] so that [benefit]
</details>

---

### Question 7
**For a banking application, which trade-off would you prioritize?**

A) Availability over Consistency
B) Consistency over Availability
C) Speed over Security
D) Features over Reliability

<details>
<summary>Answer</summary>
B) Consistency over Availability

Explanation: Banking requires data consistency to ensure accurate account balances.
</details>

---

### Question 8
**Which of the following is NOT a non-functional requirement?**

A) The system shall support 1 million daily users
B) Users shall be able to upload profile pictures
C) Response time shall be under 500ms
D) The system shall have 99.99% uptime

<details>
<summary>Answer</summary>
B) Users shall be able to upload profile pictures

Explanation: This describes a feature (functional requirement), not a quality attribute.
</details>

---

### Question 9
**What does MTBF stand for?**

A) Maximum Time Before Failure
B) Mean Time Between Failures
C) Minimum Time Before Fix
D) Mean Time to Basic Functionality

<details>
<summary>Answer</summary>
B) Mean Time Between Failures

Explanation: MTBF is a reliability metric measuring average time between system failures.
</details>

---

### Question 10
**When gathering requirements for a social media app, which question is MOST important to ask first?**

A) What color scheme should we use?
B) How many users do we expect to support?
C) Which database should we use?
D) What programming language to use?

<details>
<summary>Answer</summary>
B) How many users do we expect to support?

Explanation: Scale determines many architectural decisions. Technology choices come after understanding requirements.
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! Strong understanding of requirements
- 7-8 correct: Good, review the concepts you missed
- 5-6 correct: Review the material, especially NFR categories
- Below 5: Re-read Day 2 content before proceeding
