# Day 3 Quiz: Scalability Fundamentals

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**What is vertical scaling?**

A) Adding more servers to distribute load
B) Adding more resources (CPU, RAM) to an existing server
C) Splitting data across multiple databases
D) Using a CDN for content delivery

<details>
<summary>Answer</summary>
B) Adding more resources (CPU, RAM) to an existing server

Explanation: Vertical scaling (scale up) means making a single server more powerful.
</details>

---

### Question 2
**Which is a major disadvantage of vertical scaling?**

A) Requires code changes
B) Has hardware limits (can't scale indefinitely)
C) Requires load balancer
D) Increases network latency

<details>
<summary>Answer</summary>
B) Has hardware limits (can't scale indefinitely)

Explanation: There's a physical limit to how powerful a single machine can be.
</details>

---

### Question 3
**In horizontal scaling, what happens when you need more capacity?**

A) Upgrade the existing server's hardware
B) Add more servers
C) Increase database size
D) Add more memory to existing servers

<details>
<summary>Answer</summary>
B) Add more servers

Explanation: Horizontal scaling (scale out) adds more machines to handle load.
</details>

---

### Question 4
**What is a stateless architecture?**

A) Architecture where each server stores user session data
B) Architecture where no session information is stored on servers
C) Architecture without any database
D) Architecture with only one server

<details>
<summary>Answer</summary>
B) Architecture where no session information is stored on servers

Explanation: In stateless architecture, each request contains all necessary information and doesn't depend on server-stored state.
</details>

---

### Question 5
**Why is stateless architecture better for horizontal scaling?**

A) It requires less memory
B) Any server can handle any request
C) It doesn't need a database
D) It's more secure

<details>
<summary>Answer</summary>
B) Any server can handle any request

Explanation: Without server-stored state, requests can be routed to any available server.
</details>

---

### Question 6
**What is "sticky sessions" used for?**

A) To make sessions more secure
B) To ensure a client always connects to the same server
C) To speed up session creation
D) To share sessions between servers

<details>
<summary>Answer</summary>
B) To ensure a client always connects to the same server

Explanation: Sticky sessions route requests from the same client to the same server, needed when session state is stored on the server.
</details>

---

### Question 7
**Which scaling approach has a linear cost curve?**

A) Vertical scaling
B) Horizontal scaling
C) Both have linear cost curves
D) Neither has a linear cost curve

<details>
<summary>Answer</summary>
B) Horizontal scaling

Explanation: Adding commodity servers has roughly linear cost growth, while high-end hardware for vertical scaling gets exponentially expensive.
</details>

---

### Question 8
**Database replication is primarily used to:**

A) Store different data on different servers
B) Backup data and distribute read load
C) Reduce database size
D) Speed up write operations

<details>
<summary>Answer</summary>
B) Backup data and distribute read load

Explanation: Replication creates copies of data to provide redundancy and allow reads from multiple servers.
</details>

---

### Question 9
**What is database sharding?**

A) Making copies of the entire database
B) Splitting data across multiple databases based on a key
C) Compressing database data
D) Encrypting database entries

<details>
<summary>Answer</summary>
B) Splitting data across multiple databases based on a key

Explanation: Sharding partitions data horizontally so different ranges/types of data reside on different databases.
</details>

---

### Question 10
**Which storage option would you typically use to make a stateful app stateless?**

A) Local file system
B) Server memory
C) External cache like Redis
D) Local SQLite database

<details>
<summary>Answer</summary>
C) External cache like Redis

Explanation: External storage (Redis, Memcached) allows session data to be accessed by any server, enabling stateless application design.
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! Solid understanding of scalability
- 7-8 correct: Good, review areas you missed
- 5-6 correct: Review the material before moving on
- Below 5: Re-read Day 3 content thoroughly
