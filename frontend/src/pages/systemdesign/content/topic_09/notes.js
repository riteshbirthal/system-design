const notes = `
# Message Queues & Event-Driven Architecture

## Introduction to Message Queues

**Definition:** A message queue is a form of asynchronous service-to-service communication. Messages are stored in a queue until processed and deleted, decoupling producers from consumers.

### Why Message Queues Matter
- **Decoupling**: Services don't need to know about each other
- **Asynchronous Processing**: Non-blocking operations
- **Load Leveling**: Handle traffic spikes gracefully
- **Resilience**: Messages persist even if consumers are down
- **Scalability**: Scale producers and consumers independently

### Basic Architecture
\`\`\`
[Producer] → [Message Queue] → [Consumer]
     ↓              ↓               ↓
  Creates       Stores/Routes    Processes
  messages       messages        messages
\`\`\`

### Key Terminology

| Term | Description |
|------|-------------|
| Producer/Publisher | Sends messages to the queue |
| Consumer/Subscriber | Receives and processes messages |
| Broker | Server hosting queues, routes messages |
| Queue | Point-to-point, one consumer per message |
| Topic | Pub-sub, multiple consumers per message |
| Acknowledgment | Confirms message was processed |

---

## Event-Driven Architecture (EDA)

### Event vs Message
- **Message**: Generic data transfer between systems
- **Event**: Notification that something happened (past tense, immutable)

### Event Types
1. **Domain Events**: Business occurrences (OrderPlaced, PaymentReceived)
2. **Integration Events**: Cross-service communication
3. **Notification Events**: Alert other services
4. **Event-Carried State Transfer**: Full state in event

### EDA Benefits
- Loose coupling, scalability, resilience
- Real-time reactions, flexibility
- Natural audit trail

### EDA Challenges
- Harder to trace flows
- Eventual consistency
- Event ordering issues
- Must handle duplicates

### Choreography vs Orchestration

**Choreography (Decentralized):**
\`\`\`
[Service A] --event--> [Service B] --event--> [Service C]
Each service knows what to do when receiving events
\`\`\`

**Orchestration (Centralized):**
\`\`\`
        [Orchestrator]
       /      |       \\
  [Svc A]  [Svc B]  [Svc C]
Central coordinator manages workflow
\`\`\`

---

## Message Queue Patterns

### 1. Point-to-Point (Queue)
\`\`\`
[Producer] → [Queue] → [Consumer 1] (competing)
                    → [Consumer 2]
\`\`\`
One message consumed by exactly one consumer. Good for task distribution.

### 2. Publish-Subscribe (Topic)
\`\`\`
[Publisher] → [Topic] → [Subscriber 1]
                     → [Subscriber 2]
\`\`\`
One message delivered to all subscribers. Good for event broadcasting.

### 3. Request-Reply
Synchronous-style over async with correlation ID. Good for RPC patterns.

### 4. Competing Consumers
Multiple consumers share workload for horizontal scaling.

### 5. Dead Letter Queue (DLQ)
\`\`\`
[Producer] → [Main Queue] → [Consumer]
                  ↓ (failure)
            [Dead Letter Queue] → [Error Handler]
\`\`\`
Failed messages moved to separate queue for investigation.

### 6. Priority Queue
Messages processed by priority level. For VIP requests, critical alerts.

---

## Popular Message Queue Systems

| System | Model | Throughput | Best For |
|--------|-------|------------|----------|
| Kafka | Log | Very High | Event Streaming |
| RabbitMQ | Broker | Medium | Task Queues |
| Amazon SQS | Queue | High | AWS Integration |
| Redis | In-Memory | Very High | Simple/Fast |
| Pulsar | Log | Very High | Multi-Tenant |
| NATS | Messaging | Very High | Microservices |

---

## Apache Kafka Deep Dive

### Architecture
\`\`\`
              [Kafka Cluster]
             /       |       \\
      [Broker 1] [Broker 2] [Broker 3]
             \\       |       /
         [ZooKeeper / KRaft]
\`\`\`

### Key Concepts

**Topic**: Category for messages (like a table)

**Partition**: Ordered, immutable sequence. Unit of parallelism.
\`\`\`
Topic: orders
├── Partition 0: [msg0, msg1, msg2...]
├── Partition 1: [msg0, msg1, msg2...]
└── Partition 2: [msg0, msg1, msg2...]
\`\`\`

**Offset**: Unique message ID within partition

**Consumer Group**: Consumers sharing workload
\`\`\`
Consumer Group "order-processors":
├── Consumer 1 ← Partition 0
├── Consumer 2 ← Partition 1
└── Consumer 3 ← Partition 2
\`\`\`

**Replication**: Leader handles reads/writes, followers replicate

### Delivery Guarantees

| Mode | Description | Trade-off |
|------|-------------|-----------|
| At-Most-Once | Commit before processing | May lose messages |
| At-Least-Once | Commit after processing | May duplicate |
| Exactly-Once | Transactional | Highest guarantee |

### Kafka Use Cases
- Event sourcing and CQRS
- Log aggregation
- Stream processing
- Activity tracking
- Metrics collection

---

## RabbitMQ Deep Dive

### Architecture
\`\`\`
[Producer] → [Exchange] → [Queue] → [Consumer]
                 ↓
           Routing Rules
\`\`\`

### Exchange Types

**Direct**: Route by exact routing key match
**Topic**: Route by pattern matching (wildcards: *, #)
**Fanout**: Broadcast to all bound queues
**Headers**: Route by message headers

### Example Routing
\`\`\`
Topic Exchange:
"order.created" → matches "order.*" and "#.created"
"user.profile.updated" → matches "user.#"
\`\`\`

### Message Acknowledgment
- **Auto-Ack**: Fast but unreliable
- **Manual-Ack**: Consumer explicitly acknowledges, reliable

### Durability
- **Durable Queue**: Survives broker restart
- **Persistent Message**: Written to disk (delivery_mode=2)

---

## Kafka vs RabbitMQ

| Aspect | Kafka | RabbitMQ |
|--------|-------|----------|
| Architecture | Distributed log | Message broker |
| Model | Pull (consumer pulls) | Push (broker pushes) |
| Retention | Configurable (time/size) | Until consumed |
| Throughput | Very high (millions/s) | High (thousands/s) |
| Routing | Topic/partition | Complex exchanges |
| Replay | Yes (offset reset) | No |
| Best For | Event streaming | Task queues, routing |

### When to Use Kafka
- High throughput (>100K msg/sec)
- Event sourcing, log aggregation
- Need to replay events
- Multiple consumers need same events

### When to Use RabbitMQ
- Complex routing requirements
- Request-response patterns
- Task queues with acknowledgment
- Lower latency critical

---

## Advanced Patterns

### 1. Event Sourcing
Store state changes as events, not current state.
\`\`\`
Event 1: UserCreated { id: 1, name: "John" }
Event 2: BalanceDeposited { id: 1, amount: 150 }
Event 3: BalanceWithdrawn { id: 1, amount: 50 }
Current state = replay events = balance 100
\`\`\`

### 2. CQRS (Command Query Responsibility Segregation)
Separate read and write models.
\`\`\`
Commands → [Write Model] → [Event Store]
                                ↓
Queries ← [Read Model] ← [Projections]
\`\`\`

### 3. Saga Pattern
Manage distributed transactions without 2PC.
\`\`\`
Order → Reserve Inventory → Process Payment → Ship
On failure: Compensating actions (rollback)
\`\`\`

### 4. Transactional Outbox
Solve dual-write problem (DB + queue).
\`\`\`
BEGIN TRANSACTION
  INSERT INTO orders (...)
  INSERT INTO outbox (event, payload)
COMMIT

Separate process: Read outbox → Publish to Kafka
\`\`\`

### 5. Change Data Capture (CDC)
Capture database changes as events.
\`\`\`
[Database] → [CDC Tool] → [Kafka] → [Consumers]
   WAL/      (Debezium)
  binlog
\`\`\`

### 6. Inbox Pattern
Ensure idempotent processing with message_id tracking.

---

## Best Practices

### 1. Design for Idempotency
\`\`\`python
def process_order(order_id, message_id):
    if db.exists(f"processed:{message_id}"):
        return  # Skip duplicate
    create_order(order_id)
    db.set(f"processed:{message_id}", 1)
\`\`\`

### 2. Use Dead Letter Queues
Configure max retries, then move to DLQ for investigation.

### 3. Implement Backpressure
Slow consumption when approaching capacity. Monitor consumer lag.

### 4. Handle Message Ordering
\`\`\`python
# Same partition key = same partition = ordered
producer.send(topic='orders', key=user_id, value=data)
\`\`\`

### 5. Monitor Key Metrics
- Producer: send rate, latency, errors
- Consumer: lag, processing rate, errors
- Queue: depth, oldest message age, DLQ size

### 6. Version Your Events
\`\`\`json
{
  "event_type": "OrderCreated",
  "version": "1.2",
  "data": { "order_id": "123" }
}
\`\`\`

### 7. Use Correlation IDs
Track requests across services with correlation_id.

### 8. Graceful Shutdown
Pause consumption, wait for in-flight, commit offsets, close.

### 9. Test Failure Scenarios
- Consumer crashes mid-processing
- Broker unavailable
- Duplicate messages
- Poison messages

---

## Selection Decision Tree

\`\`\`
Need event replay?
├── Yes → Kafka or Pulsar
└── No
    └── Complex routing?
        ├── Yes → RabbitMQ
        └── No
            └── AWS native?
                ├── Yes → SQS/SNS
                └── No
                    └── Ultra-low latency?
                        ├── Yes → Redis Streams
                        └── No → Kafka or RabbitMQ
\`\`\`

---

## Quick Reference

| Need | Solution |
|------|----------|
| Event replay/sourcing | Kafka |
| Complex routing | RabbitMQ |
| AWS native/serverless | SQS/SNS |
| Ultra-low latency | Redis Streams |
| Multi-tenant/geo-replicated | Pulsar |
| Simple, lightweight | NATS |
`;

export default notes;
