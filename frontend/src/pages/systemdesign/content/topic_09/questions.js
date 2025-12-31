const questions = [
  {
    question: "What is a message queue and why is it important?",
    answer: "A message queue is asynchronous service-to-service communication where messages are stored until processed. Benefits: Decoupling (services don't need direct knowledge of each other), Asynchronous processing (non-blocking), Load leveling (handle spikes), Resilience (messages persist if consumers down), Scalability (scale producers/consumers independently).",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between a queue and a topic?",
    answer: "Queue (Point-to-Point): One message consumed by exactly one consumer. Multiple consumers compete for messages. Message removed after acknowledgment. Use for task distribution. Topic (Publish-Subscribe): One message delivered to all subscribers. Each subscriber maintains independent offset. Use for event broadcasting. Kafka uses topics; RabbitMQ uses both queues and exchanges.",
    difficulty: "Easy"
  },
  {
    question: "Explain the difference between event and message.",
    answer: "Message: Generic data transfer between systems, can be commands or queries. Event: Notification that something happened (past tense), immutable, self-contained. Events describe what happened (OrderCreated), not what to do. Events have semantic meaning in the domain. Messages are the transport mechanism; events are a type of message with business meaning.",
    difficulty: "Easy"
  },
  {
    question: "What is a Dead Letter Queue (DLQ)?",
    answer: "DLQ is a separate queue for messages that fail processing after configured retry attempts. Prevents blocking main queue with poison messages. Allows investigation and manual retry. Setup: Main queue → Consumer (fails) → retry X times → move to DLQ → Alert/investigate. Best practice: Monitor DLQ size, set up alerts, investigate root cause.",
    difficulty: "Easy"
  },
  {
    question: "What are the message delivery guarantees?",
    answer: "At-Most-Once: Commit offset before processing. Fast, no duplicates, but may lose messages on crash. At-Least-Once: Commit after processing. May reprocess on crash, requires idempotent consumers. Most common. Exactly-Once: Transactional producers and consumers. Highest guarantee but complex, lower throughput. Kafka supports via transactions.",
    difficulty: "Medium"
  },
  {
    question: "What is Apache Kafka and what are its key concepts?",
    answer: "Kafka is a distributed event streaming platform. Key concepts: Topic (category for messages), Partition (ordered, immutable sequence - unit of parallelism), Offset (unique message ID in partition), Consumer Group (consumers sharing workload, each partition consumed by one consumer), Replication (leader handles reads/writes, followers replicate). High throughput, persistent storage, replay capability.",
    difficulty: "Medium"
  },
  {
    question: "How does Kafka achieve high throughput?",
    answer: "Sequential disk I/O (append-only log), zero-copy data transfer (OS-level), batching (messages grouped), compression (reduce network/storage), partitioning (parallel processing), consumer pull model (consumers control rate), no random seeks (sequential reads). Can handle millions of messages per second.",
    difficulty: "Medium"
  },
  {
    question: "What is a Kafka Consumer Group?",
    answer: "Consumer Group is a set of consumers sharing message consumption from a topic. Each partition is consumed by exactly one consumer in the group. If consumers > partitions, some consumers are idle. Adding consumers up to partition count increases parallelism. Consumer failures trigger rebalancing. Different groups can independently consume same messages.",
    difficulty: "Medium"
  },
  {
    question: "Explain RabbitMQ exchange types.",
    answer: "Direct: Route by exact routing key match. Topic: Pattern matching with wildcards (* = one word, # = zero or more). 'order.created' matches 'order.*' and '#.created'. Fanout: Broadcast to all bound queues, ignores routing key. Headers: Route based on message headers instead of routing key. Choose based on routing complexity needed.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between Kafka and RabbitMQ?",
    answer: "Kafka: Distributed log, pull model, retains messages (configurable), very high throughput, partition-based ordering, supports replay. Best for event streaming. RabbitMQ: Message broker, push model, messages deleted after consumption, complex routing via exchanges, per-queue ordering. Best for task queues, complex routing. Choose Kafka for high throughput/replay; RabbitMQ for routing/RPC.",
    difficulty: "Medium"
  },
  {
    question: "What is Event Sourcing?",
    answer: "Event Sourcing stores state changes as sequence of immutable events, not current state. Example: UserCreated, BalanceDeposited, BalanceWithdrawn. Current state = replay all events. Benefits: Complete audit trail, replay to any point, debugging, new projections. Challenges: Event schema evolution, storage growth, query complexity (need projections).",
    difficulty: "Medium"
  },
  {
    question: "What is CQRS and how does it relate to Event Sourcing?",
    answer: "CQRS (Command Query Responsibility Segregation) separates read and write models. Commands → Write Model → Event Store. Events → Projections → Read Model → Queries. Benefits: Optimized read models, scale independently, different storage per model. Works well with Event Sourcing: events are the write model, projections build read models. Not required together but complementary.",
    difficulty: "Hard"
  },
  {
    question: "What is the Saga pattern?",
    answer: "Saga manages distributed transactions without 2PC. Sequence of local transactions with compensating actions on failure. Example: Order → Reserve Inventory → Process Payment → Ship. If payment fails: Release Inventory, Cancel Order. Types: Choreography (services react to events) or Orchestration (central coordinator). Provides eventual consistency, better availability than 2PC.",
    difficulty: "Hard"
  },
  {
    question: "What is the Transactional Outbox pattern?",
    answer: "Solves dual-write problem (DB + message queue can be inconsistent). Solution: Write to database and outbox table in single transaction. Separate process reads outbox, publishes to queue, marks as published. Ensures atomicity: either both DB update and event happen, or neither. Used with CDC tools like Debezium for automatic publishing.",
    difficulty: "Hard"
  },
  {
    question: "How do you ensure idempotent message processing?",
    answer: "Idempotency means processing same message multiple times produces same result. Techniques: 1) Track processed message_ids (inbox pattern). 2) Use database unique constraints. 3) Make operations naturally idempotent (SET vs INCREMENT). 4) Version/timestamp checks. 5) Use deduplication window. Essential for at-least-once delivery where duplicates possible.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle message ordering in distributed systems?",
    answer: "Kafka: Use same partition key - messages with same key go to same partition, single consumer per partition maintains order. RabbitMQ: Single queue with single consumer. Trade-offs: Ordering limits parallelism. Solution: Order only where necessary (per-user, per-entity). Accept eventual consistency where strict ordering not critical.",
    difficulty: "Medium"
  },
  {
    question: "What is backpressure and how do you implement it?",
    answer: "Backpressure is mechanism to handle when consumers can't keep up with producers. Signs: increasing consumer lag, queue depth growth. Solutions: 1) Limit producer rate. 2) Scale consumers. 3) Add partitions (Kafka). 4) Prefetch count/QoS (RabbitMQ). 5) Drop non-critical messages. 6) Alert on lag thresholds. Monitor: consumer lag, queue depth.",
    difficulty: "Medium"
  },
  {
    question: "What is Change Data Capture (CDC)?",
    answer: "CDC captures database changes (insert, update, delete) and publishes as events. Reads from database WAL/binlog, no application changes needed. Tools: Debezium (Kafka Connect), Maxwell, AWS DMS. Benefits: Real-time data streaming, database as event source, sync to other systems. Use cases: Cache invalidation, search index updates, analytics pipelines.",
    difficulty: "Medium"
  },
  {
    question: "How would you design a notification system using message queues?",
    answer: "Architecture: API → Kafka 'notifications' topic → Consumer Group (Email Worker, SMS Worker, Push Worker). Design: Partition by user_id for per-user ordering. Each notification type as consumer in group. DLQ for failures. Retry with exponential backoff. Idempotent delivery (track notification_id). Rate limiting per user. Priority queues for urgent notifications.",
    difficulty: "Medium"
  },
  {
    question: "What metrics should you monitor for message queues?",
    answer: "Producer: Send rate, latency, error rate, batch size. Consumer: Lag (messages behind), processing rate, processing latency, error rate. Queue/Topic: Depth, oldest message age, partition count. Broker: CPU, memory, disk, network. DLQ: Size, growth rate. Alerts: High lag, DLQ growth, error rate spikes, broker resource exhaustion.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between choreography and orchestration?",
    answer: "Choreography: Decentralized, services react to events independently. No central coordinator. Pros: Loose coupling, resilient. Cons: Hard to understand flow, distributed logic. Orchestration: Centralized coordinator directs services. Clear workflow definition. Pros: Easy to understand, centralized logic. Cons: Single point of failure, coupling to orchestrator. Choose based on complexity and coupling requirements.",
    difficulty: "Medium"
  },
  {
    question: "How does Kafka replication work?",
    answer: "Each partition has one leader and multiple followers (replicas). Leader handles all reads/writes. Followers replicate from leader. ISR (In-Sync Replicas): Replicas caught up with leader. acks=all waits for all ISR to acknowledge. If leader fails, ISR member becomes new leader. Replication factor (typically 3) determines fault tolerance. min.insync.replicas ensures durability.",
    difficulty: "Hard"
  },
  {
    question: "What is Kafka Streams?",
    answer: "Kafka Streams is a client library for stream processing. Features: Stateful processing with local state stores, exactly-once semantics, windowed aggregations, joins between streams/tables. No separate cluster needed (runs in application). Use cases: Real-time analytics, ETL, event-driven microservices. Alternative to Flink/Spark Streaming with simpler deployment.",
    difficulty: "Hard"
  },
  {
    question: "When would you use Amazon SQS vs SNS?",
    answer: "SQS (Queue): Point-to-point, polling-based, message retention up to 14 days, FIFO available, for decoupling services. SNS (Topic): Pub-sub, push-based, fan-out to multiple endpoints (SQS, Lambda, HTTP, email), for notifications and broadcasting. Often combined: SNS → multiple SQS queues for fan-out with buffering. Use SQS for task queues, SNS for event notifications.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle poison messages?",
    answer: "Poison messages are messages that consistently fail processing. Solution: 1) Set max retry count. 2) Exponential backoff between retries. 3) After max retries, move to DLQ. 4) Log error details for investigation. 5) Alert on DLQ growth. 6) Manual investigation and fix or discard. Prevention: Schema validation, input sanitization, robust error handling.",
    difficulty: "Medium"
  },
  {
    question: "What is consumer rebalancing in Kafka?",
    answer: "Rebalancing redistributes partitions among consumers when group membership changes (consumer joins/leaves/crashes). Process: All consumers stop, coordinator assigns partitions, consumers resume. Causes latency spike during rebalance. Strategies: Eager (stop-the-world) vs Cooperative/Incremental (gradual). Minimize: Use stable consumer instances, session/heartbeat timeouts, sticky assignor.",
    difficulty: "Hard"
  },
  {
    question: "How would you migrate from monolith to event-driven microservices?",
    answer: "Strangler pattern approach: 1) Identify bounded contexts. 2) Add event bus (Kafka). 3) Publish events from monolith. 4) Build new services consuming events. 5) Gradually move functionality to services. 6) Replace monolith database calls with events. CDC (Debezium) can help publish events from legacy database without code changes. Maintain backward compatibility during transition.",
    difficulty: "Hard"
  },
  {
    question: "What is the inbox pattern?",
    answer: "Inbox pattern ensures idempotent message processing. Consumer stores message_id in inbox table before processing. On duplicate, check if message_id exists, skip if already processed. Implementation: Receive message → Check inbox → If new: Process, save message_id → Acknowledge. If exists: Skip, acknowledge. Clean up old entries periodically. Essential for at-least-once delivery.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle schema evolution in event-driven systems?",
    answer: "Challenges: Producers and consumers evolve independently. Solutions: 1) Version events (include version field). 2) Schema registry (Confluent, AWS Glue). 3) Backward/forward compatible changes (add optional fields, don't remove/rename). 4) Consumer handles multiple versions. 5) Avro/Protobuf with schema evolution support. Avoid breaking changes; deprecate old versions gradually.",
    difficulty: "Hard"
  },
  {
    question: "Compare Kafka, Pulsar, and RabbitMQ for a new project.",
    answer: "Kafka: Best for high throughput (millions/sec), event streaming, replay, log aggregation. Operational complexity, needs ZooKeeper/KRaft. Pulsar: Multi-tenant, tiered storage, geo-replication built-in. Good for cloud-native, multiple teams. More features than Kafka, less mature. RabbitMQ: Best for complex routing, RPC patterns, lower latency. Easier to operate, lower throughput. Choose based on throughput needs, routing complexity, operational capacity.",
    difficulty: "Hard"
  }
];

export default questions;
