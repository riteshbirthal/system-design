# Day 5 Assignment: GraphQL, gRPC & WebSockets

## Assignment Overview
**Difficulty:** Intermediate to Advanced
**Estimated Time:** 90 minutes
**Points:** 100

---

## Part 1: GraphQL Schema Design (30 points)

### Task 1.1 (20 points)
Design a GraphQL schema for a **Social Media Platform** with the following features:
- Users can have profiles with bio and avatar
- Users can create posts with text and images
- Users can follow other users
- Users can like and comment on posts
- Posts can have hashtags

Provide:
1. Type definitions for all entities
2. Query type with operations
3. Mutation type with operations
4. At least one Subscription for real-time updates

```graphql
# Write your schema here
```

### Task 1.2 (10 points)
Write GraphQL queries for the following scenarios:

1. **Get a user's profile with their last 5 posts and follower count:**
```graphql
# Your query here
```

2. **Get a post with all comments and the comment authors:**
```graphql
# Your query here
```

3. **Create a mutation to follow a user:**
```graphql
# Your mutation here
```

---

## Part 2: gRPC Service Design (25 points)

### Task 2.1 (15 points)
Design a gRPC service for a **Food Delivery Application** with the following requirements:
- Restaurant service (list restaurants, get menu)
- Order service (create order, track order status)
- Delivery tracking with real-time updates

Write the `.proto` file:

```protobuf
// Write your proto definition here
syntax = "proto3";

package delivery;

// Define services and messages
```

### Task 2.2 (10 points)
For the delivery tracking feature, explain:

1. Which gRPC communication type would you use? (Unary, Server streaming, Client streaming, Bidirectional)
2. Why is this communication type appropriate?
3. How would the client handle connection drops?
4. How would you implement reconnection logic?

---

## Part 3: WebSocket Implementation Design (25 points)

### Task 3.1 (15 points)
Design a WebSocket-based **Live Chat System** with:
- Multiple chat rooms
- User presence (online/offline status)
- Typing indicators
- Message delivery confirmations

Document:

1. **Message Protocol** - Define the JSON message format for:
   - Joining a room
   - Sending a message
   - Typing indicator
   - Delivery confirmation
   - Presence update

```json
// Example message formats
```

2. **Connection Management:**
   - How will you handle reconnection?
   - How will you handle message ordering?
   - How will you sync missed messages?

### Task 3.2 (10 points)
Compare your WebSocket design with a potential REST polling implementation:

| Aspect | WebSocket | REST Polling |
|--------|-----------|--------------|
| Latency | | |
| Server resources | | |
| Battery usage (mobile) | | |
| Complexity | | |
| Scalability challenges | | |

---

## Part 4: Protocol Comparison & Selection (20 points)

### Task 4.1 (20 points)
For each scenario, select the most appropriate protocol(s) and justify your choice:

| Scenario | Protocol(s) | Justification |
|----------|-------------|---------------|
| E-commerce product catalog API | | |
| Real-time collaborative document editing | | |
| Internal microservices communication | | |
| Mobile app with offline support | | |
| Stock trading platform | | |
| IoT sensor data collection | | |
| Multi-player online game | | |
| Social media feed | | |
| Video streaming metadata | | |
| Customer support chat | | |

For TWO of the above scenarios, provide a detailed architecture diagram showing:
- Client connections
- Protocol used for each connection
- Backend services
- Data flow

---

## Submission Guidelines

1. Save your answers in a document named `day05_protocols_assignment_[yourname].md`
2. Include all code samples with proper formatting
3. Include architecture diagrams (ASCII or images)
4. Submit by the end of Day 5

## Grading Rubric

| Criteria | Points |
|----------|--------|
| GraphQL Schema Quality | 25 |
| gRPC Design | 20 |
| WebSocket Implementation | 20 |
| Protocol Selection Reasoning | 20 |
| Clarity & Formatting | 15 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 20 extra points)

### Bonus 1: Implement a Mini Chat (15 points)
Create a simple working WebSocket chat application:
- Node.js server with `ws` library
- HTML/JS client
- Support for multiple users
- Display messages in real-time

Submit the code and a brief explanation.

### Bonus 2: GraphQL vs gRPC Performance Analysis (5 points)
Research and compare:
- Payload sizes (GraphQL JSON vs gRPC protobuf)
- Serialization/deserialization speed
- Network overhead
- Provide citations for your data
