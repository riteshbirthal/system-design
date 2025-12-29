# Week 2 Project: Design a Real-Time Chat System

## Project Overview
**Duration:** Weekend (8-10 hours)
**Points:** 200
**Submission Deadline:** Before Week 3 starts

---

## Objective
Design a complete system architecture for a **Real-Time Chat Application** similar to Slack or Discord, demonstrating your understanding of networking concepts, protocols, and API design.

---

## Project Requirements

### Functional Requirements
1. Users can send and receive messages in real-time
2. Users can create and join chat rooms/channels
3. Users can see online/offline status of others
4. Users can send direct messages (1:1)
5. Message history is persisted and searchable
6. Users receive notifications for new messages
7. Support for file/image sharing
8. Typing indicators ("User is typing...")

### Non-Functional Requirements
1. Handle 1 million concurrent connections
2. Message delivery latency < 100ms
3. 99.9% availability
4. Messages stored for 1 year
5. Support for mobile and web clients
6. End-to-end encryption for direct messages

---

## Deliverables

### Part 1: Requirements & Estimation (30 points)

#### 1.1 Detailed Requirements (10 points)
Expand on the functional requirements with specific details:
- Message format and limitations
- Room types and permissions
- User presence states

#### 1.2 Clarifying Questions (5 points)
List 10 clarifying questions and your assumptions.

#### 1.3 Capacity Estimation (15 points)
Calculate:
- Messages per second
- Concurrent connections
- Storage requirements (daily, yearly)
- Bandwidth requirements

---

### Part 2: Protocol Selection (40 points)

#### 2.1 Protocol Analysis (20 points)
For each communication need, select and justify the protocol:

| Communication Type | Protocol Choice | Justification |
|-------------------|-----------------|---------------|
| Real-time messages | | |
| Message history API | | |
| File uploads | | |
| User authentication | | |
| Service-to-service | | |
| Push notifications | | |

#### 2.2 WebSocket Design (20 points)
Design the WebSocket message protocol:

1. **Connection Management:**
   - Authentication on connect
   - Heartbeat/ping-pong
   - Reconnection strategy

2. **Message Types:**
   Define JSON schemas for:
   - Chat message
   - Typing indicator
   - Presence update
   - Room events (join/leave)
   - Delivery receipt
   - Read receipt

```json
// Example message format
{
    "type": "message",
    "payload": {...},
    "metadata": {...}
}
```

---

### Part 3: System Architecture (60 points)

#### 3.1 High-Level Architecture (30 points)
Draw a comprehensive architecture diagram including:
- Client applications (web, mobile)
- Load balancers
- API Gateway
- WebSocket servers
- Message queue
- Database(s)
- Cache layer
- File storage
- Notification service

```
[Draw your architecture here or attach image]
```

#### 3.2 Component Deep Dive (30 points)
For each major component, explain:
- Purpose
- Technology choice
- Scaling strategy
- Failure handling

| Component | Technology | Scaling Strategy | Failure Handling |
|-----------|------------|------------------|------------------|
| WebSocket Server | | | |
| Message Queue | | | |
| Database | | | |
| Cache | | | |
| File Storage | | | |

---

### Part 4: API Design (40 points)

#### 4.1 REST API Endpoints (20 points)
Design REST APIs for:
- User management
- Room/channel management
- Message history
- File uploads
- Search

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| | | | |

#### 4.2 API Examples (20 points)
Provide request/response examples for:
1. Create a new channel
2. Get message history with pagination
3. Upload a file
4. Search messages

---

### Part 5: Scaling & Reliability (30 points)

#### 5.1 Scaling Strategy (15 points)
Explain how you would scale:
- WebSocket connections across servers
- Message routing between servers
- Database for message storage
- Search functionality

#### 5.2 Reliability & Failure Handling (15 points)
Address:
- What happens when a WebSocket server fails?
- How do you ensure message delivery?
- How do you handle network partitions?
- Disaster recovery strategy

---

## Submission Format

### Document Structure
```
week02_project_[yourname]/
├── README.md              # Project overview
├── requirements.md        # Part 1
├── protocols.md           # Part 2
├── architecture.md        # Part 3
├── api-design.md          # Part 4
├── scaling.md             # Part 5
└── diagrams/
    ├── architecture.png
    ├── data-flow.png
    └── websocket-flow.png
```

---

## Grading Rubric

| Section | Criteria | Points |
|---------|----------|--------|
| Part 1 | Requirements completeness | 30 |
| Part 2 | Protocol selection & justification | 40 |
| Part 3 | Architecture design quality | 60 |
| Part 4 | API design completeness | 40 |
| Part 5 | Scaling & reliability strategies | 30 |
| **Total** | | **200** |

### Quality Factors
- Clarity of diagrams (+/- 10%)
- Trade-off analysis (+/- 5%)
- Real-world considerations (+/- 5%)

---

## Bonus Challenges (Optional - Up to 50 extra points)

### Bonus 1: Message Ordering (15 points)
Design a system to ensure message ordering in a distributed environment:
- How do you handle messages arriving out of order?
- How do you handle clock skew between servers?
- Implement vector clocks or similar

### Bonus 2: End-to-End Encryption (15 points)
Design E2E encryption for direct messages:
- Key exchange protocol
- Message encryption/decryption flow
- Key rotation strategy
- How to handle new devices

### Bonus 3: Presence System Deep Dive (10 points)
Design an efficient presence system for showing online/offline status:
- How to detect offline users?
- How to fan out presence updates efficiently?
- How to handle millions of subscribers?

### Bonus 4: Cost Estimation (10 points)
Estimate monthly costs using AWS/GCP pricing:
- Compute (WebSocket servers)
- Database
- Message queue
- CDN/Storage
- Total monthly cost

---

## Tips for Success

1. **Start with requirements** - Understand the problem fully
2. **Consider scale from the start** - 1M connections is significant
3. **Draw diagrams first** - Visualize before writing
4. **Justify every decision** - Explain the "why"
5. **Consider failure modes** - What can go wrong?
6. **Think about operations** - How will you monitor/debug?
7. **Reference real systems** - Slack, Discord, WhatsApp architectures

---

## Reference Materials
- [Slack Architecture](https://slack.engineering/)
- [Discord Engineering Blog](https://discord.com/blog)
- [WhatsApp Architecture](https://highscalability.com/blog/2014/2/26/the-whatsapp-architecture-facebook-bought-for-19-billion.html)
- [Building a Chat Application (System Design)](https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers/design-of-a-chat-application)

Good luck!
