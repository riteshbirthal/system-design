# Day 3 Quiz: TCP vs UDP

## Instructions
- Total Questions: 10
- Time Limit: 15 minutes
- Passing Score: 70%

---

## Questions

### Question 1
**Which protocol guarantees that data packets arrive in the correct order?**

A) UDP
B) TCP
C) Both TCP and UDP
D) Neither

<details>
<summary>Answer</summary>
B) TCP
</details>

---

### Question 2
**What is the purpose of the TCP three-way handshake?**

A) To encrypt data
B) To establish a reliable connection before data transfer
C) To compress data packets
D) To determine packet routing

<details>
<summary>Answer</summary>
B) To establish a reliable connection before data transfer
</details>

---

### Question 3
**What is the size of a UDP header?**

A) 20 bytes
B) 8 bytes
C) 12 bytes
D) Variable

<details>
<summary>Answer</summary>
B) 8 bytes
</details>

---

### Question 4
**Which protocol would be most appropriate for a real-time multiplayer game?**

A) TCP only
B) UDP
C) HTTP
D) SMTP

<details>
<summary>Answer</summary>
B) UDP (low latency is more important than guaranteed delivery)
</details>

---

### Question 5
**What is "head-of-line blocking" in TCP?**

A) When the first packet blocks network traffic
B) When a lost packet prevents subsequent packets from being processed
C) When too many connections are open
D) When the server is overloaded

<details>
<summary>Answer</summary>
B) When a lost packet prevents subsequent packets from being processed
</details>

---

### Question 6
**Which TCP mechanism prevents a sender from overwhelming a slower receiver?**

A) Congestion control
B) Flow control (sliding window)
C) Error detection
D) Packet sequencing

<details>
<summary>Answer</summary>
B) Flow control (sliding window)
</details>

---

### Question 7
**Which protocol does QUIC (HTTP/3) run on top of?**

A) TCP
B) UDP
C) IP directly
D) Ethernet

<details>
<summary>Answer</summary>
B) UDP
</details>

---

### Question 8
**How many round trips (RTT) are needed for TCP + TLS 1.3 connection establishment?**

A) 1 RTT
B) 2 RTT
C) 3 RTT
D) 0 RTT

<details>
<summary>Answer</summary>
C) 3 RTT (1.5 for TCP handshake + 1.5 for TLS handshake)
</details>

---

### Question 9
**Which of the following is NOT a characteristic of UDP?**

A) Connectionless
B) Best-effort delivery
C) Guaranteed packet ordering
D) Low latency

<details>
<summary>Answer</summary>
C) Guaranteed packet ordering (UDP does not guarantee ordering)
</details>

---

### Question 10
**What unique feature does QUIC provide that TCP does not?**

A) Encryption
B) Connection migration (survives network changes)
C) Packet sequencing
D) Error detection

<details>
<summary>Answer</summary>
B) Connection migration (survives network changes like WiFi to cellular)
</details>

---

## Scoring Guide
- 9-10 correct: Excellent! Ready for Day 4
- 7-8 correct: Good understanding, review weak areas
- 5-6 correct: Review the material before proceeding
- Below 5: Re-read Day 3 content thoroughly
