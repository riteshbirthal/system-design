# Day 5 Quiz: System Design Process & Framework

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**What should be the FIRST step in a system design discussion?**

A) Draw the architecture diagram
B) Clarify requirements
C) Choose the database
D) Estimate the scale

<details>
<summary>Answer</summary>
B) Clarify requirements

Explanation: Always understand what you're building before designing it. Requirements clarification helps narrow scope and avoid designing the wrong system.
</details>

---

### Question 2
**In the RESHADED framework, what does the 'E' in the middle stand for?**

A) Engineering
B) Estimation
C) Evaluate
D) Endpoints

<details>
<summary>Answer</summary>
B) Estimation

Explanation: RESHADED = Requirements, Estimation, Storage Schema, High-level Design, APIs, Detailed Design, Evaluate, Discuss Bottlenecks
</details>

---

### Question 3
**Which question is MOST important to ask when clarifying requirements for a social media app?**

A) What font should we use?
B) What programming language should we use?
C) What is the expected number of daily active users?
D) What color scheme do you prefer?

<details>
<summary>Answer</summary>
C) What is the expected number of daily active users?

Explanation: Scale determines architecture. Technical choices like fonts and colors are not system design concerns.
</details>

---

### Question 4
**How much time should typically be spent on high-level design in a 45-minute system design interview?**

A) 5 minutes
B) 10-15 minutes
C) 25 minutes
D) 40 minutes

<details>
<summary>Answer</summary>
B) 10-15 minutes

Explanation: A balanced approach dedicates about 15 minutes to high-level design, leaving time for requirements, estimation, deep dive, and discussion.
</details>

---

### Question 5
**What is a "deep dive" in system design?**

A) Writing complete code for the system
B) Detailed exploration of specific components or algorithms
C) Diving into the company's codebase
D) Testing the system thoroughly

<details>
<summary>Answer</summary>
B) Detailed exploration of specific components or algorithms

Explanation: Deep dive involves going into details of critical components like data model, specific algorithms, or scaling strategies.
</details>

---

### Question 6
**Which is an example of a functional requirement?**

A) The system should have 99.9% availability
B) Response time should be under 200ms
C) Users should be able to post and delete tweets
D) The system should handle 1 million concurrent users

<details>
<summary>Answer</summary>
C) Users should be able to post and delete tweets

Explanation: Functional requirements describe WHAT the system does (features). The others are non-functional requirements describing HOW WELL it performs.
</details>

---

### Question 7
**In the hybrid feed generation approach for Twitter, how are celebrity tweets handled?**

A) Push to all followers immediately
B) Pull on demand when followers view their feed
C) Ignore celebrity tweets
D) Cache for 24 hours only

<details>
<summary>Answer</summary>
B) Pull on demand when followers view their feed

Explanation: Pushing celebrity tweets to millions of followers is expensive (fan-out on write). Pull model is more efficient for high-follower accounts.
</details>

---

### Question 8
**What should you discuss in the "Wrap Up" phase?**

A) Only the positive aspects of your design
B) Trade-offs, potential bottlenecks, and future improvements
C) The code implementation details
D) Marketing strategy for the product

<details>
<summary>Answer</summary>
B) Trade-offs, potential bottlenecks, and future improvements

Explanation: Wrap up should address trade-offs made, identify potential issues, and suggest future enhancements.
</details>

---

### Question 9
**Which communication practice should you AVOID during a system design interview?**

A) Thinking out loud
B) Asking clarifying questions
C) Jumping directly to solutions without understanding requirements
D) Justifying your design decisions

<details>
<summary>Answer</summary>
C) Jumping directly to solutions without understanding requirements

Explanation: Never jump to solutions. Always clarify requirements first to ensure you're solving the right problem.
</details>

---

### Question 10
**When choosing between SQL and NoSQL databases, what is the primary trade-off?**

A) Cost vs Performance
B) Consistency vs Scalability
C) Speed vs Security
D) Size vs Complexity

<details>
<summary>Answer</summary>
B) Consistency vs Scalability

Explanation: SQL databases provide strong consistency but are harder to scale horizontally. NoSQL databases scale better but often sacrifice consistency.
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! Ready for the weekly assessment
- 7-8 correct: Good understanding, review missed concepts
- 5-6 correct: Review the framework before the weekly assessment
- Below 5: Re-read Day 5 content and practice with examples
