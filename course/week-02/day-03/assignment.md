# Day 3 Assignment: TCP vs UDP

## Assignment Overview
**Difficulty:** Intermediate
**Estimated Time:** 60-75 minutes
**Points:** 100

---

## Part 1: Protocol Selection (30 points)

### Task 1.1 (20 points)
For each application scenario, choose TCP, UDP, or QUIC and justify your choice:

| Application | Protocol | Justification |
|-------------|----------|---------------|
| Banking transaction API | | |
| Live sports score updates | | |
| Video conference call | | |
| Email client (IMAP) | | |
| DNS lookup | | |
| Online FPS game | | |
| File synchronization (Dropbox) | | |
| IoT sensor sending temperature every second | | |
| Chat application messages | | |
| Live stock ticker | | |

### Task 1.2 (10 points)
A startup is building a video streaming platform. They're debating between:
- Option A: TCP for everything
- Option B: UDP for video, TCP for metadata
- Option C: QUIC for everything

Analyze each option's pros and cons and make a recommendation:

```
[Your analysis here]
```

---

## Part 2: TCP Deep Dive (25 points)

### Task 2.1 (10 points)
Draw the TCP state diagram for connection establishment and termination. Include:
- All states (LISTEN, SYN_SENT, SYN_RECEIVED, ESTABLISHED, FIN_WAIT, etc.)
- Transitions between states
- Events that trigger transitions

### Task 2.2 (10 points)
Explain how TCP handles the following scenarios:

1. **Packet loss**: How does TCP detect and handle a lost packet?

2. **Network congestion**: How does TCP's congestion control work?

3. **Out-of-order packets**: How does TCP ensure ordered delivery?

### Task 2.3 (5 points)
Calculate the minimum time to establish a TCP connection and send one request/response if:
- Round-trip time (RTT) = 100ms
- TLS 1.3 is required
- Show your calculation

---

## Part 3: UDP Use Case Analysis (20 points)

### Task 3.1 (10 points)
Design a simple reliable protocol on top of UDP for a gaming application that needs:
- Low latency (<50ms)
- Tolerance for up to 2% packet loss
- Ability to handle out-of-order packets

Describe:
1. What reliability features you would add
2. What features you would NOT add (to maintain low latency)
3. How you would handle packet loss

### Task 3.2 (10 points)
A VoIP application uses UDP. Explain:

1. Why UDP is preferred over TCP for voice calls
2. What happens when packets are lost (to the user experience)
3. What application-level mechanisms can improve call quality
4. Why jitter buffers are needed

---

## Part 4: QUIC Analysis (25 points)

### Task 4.1 (15 points)
Compare QUIC with TCP+TLS for the following metrics:

| Metric | TCP+TLS | QUIC | Winner |
|--------|---------|------|--------|
| Initial connection time | | | |
| Repeat connection time | | | |
| Mobile network switching | | | |
| Multiple data streams | | | |
| Encryption | | | |
| Head-of-line blocking | | | |

### Task 4.2 (10 points)
A social media company is considering migrating from HTTP/2 (TCP) to HTTP/3 (QUIC). Write a brief analysis covering:

1. **Benefits** of migration
2. **Challenges** they might face
3. **User segments** that would benefit most
4. **Your recommendation** (migrate or not, and why)

---

## Submission Guidelines

1. Save your answers in a document named `day03_tcp_udp_assignment_[yourname].md`
2. Include diagrams where requested (ASCII art or images)
3. Submit by the end of Day 3

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Protocol Selection Accuracy | 25 |
| TCP Understanding | 25 |
| UDP Analysis | 20 |
| QUIC Comparison | 20 |
| Clarity & Formatting | 10 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Bonus 1: Wireshark Analysis (10 points)
Use Wireshark (or similar tool) to capture:
1. A TCP three-way handshake
2. HTTP/2 multiplexing in action
3. Screenshot and annotate what you observe

### Bonus 2: QUIC Implementation Research (5 points)
Research and document which major platforms have adopted QUIC:
- Google services
- Facebook/Meta
- Cloudflare
- Other CDNs
What performance improvements have they reported?
