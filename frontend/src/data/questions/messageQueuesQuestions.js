// Message Queues & Event-Driven Questions - Week 12
// Source: system_design_content/09_message_queues/100_questions.txt

export const messageQueuesQuestions = [
  // Day 1: Fundamentals
  {
    id: 'mq-1',
    day: 1,
    difficulty: 'E',
    question: "What is a message queue?",
    options: [
      "A database table",
      "Asynchronous communication where messages are stored until consumed",
      "A synchronous API",
      "A caching system"
    ],
    correct: 1,
    explanation: "A message queue is asynchronous communication between services where messages are stored in a queue until the receiving service retrieves and processes them. It decouples producers from consumers."
  },
  {
    id: 'mq-2',
    day: 1,
    difficulty: 'E',
    question: "What is the difference between a queue and a topic?",
    options: [
      "They are the same thing",
      "Queue: point-to-point (one consumer); Topic: pub-sub (multiple subscribers)",
      "Topic is faster than queue",
      "Queue is for files, topic is for messages"
    ],
    correct: 1,
    explanation: "Queue (Point-to-Point): each message consumed by exactly one consumer. Topic (Publish-Subscribe): each message delivered to all subscribers, fan-out model."
  },
  {
    id: 'mq-3',
    day: 1,
    difficulty: 'E',
    question: "Why use message queues in distributed systems?",
    options: [
      "To make systems slower",
      "Decoupling, async processing, load leveling, resilience, scalability",
      "To replace databases",
      "For user interface design"
    ],
    correct: 1,
    explanation: "Message queues provide: Decoupling (services independent), Async processing (non-blocking), Load Leveling (handle spikes), Resilience (messages persist), Scalability (scale independently)."
  },
  {
    id: 'mq-4',
    day: 1,
    difficulty: 'E',
    question: "What is message acknowledgment?",
    options: [
      "Thanking the sender",
      "Confirmation from consumer that message was successfully processed",
      "Encrypting messages",
      "Logging messages"
    ],
    correct: 1,
    explanation: "Acknowledgment (ack) is confirmation from a consumer that a message was successfully processed. After ack, the broker removes the message or advances the offset. Without ack, message may be redelivered."
  },
  {
    id: 'mq-5',
    day: 1,
    difficulty: 'E',
    question: "What is a dead letter queue (DLQ)?",
    options: [
      "A queue for encrypted messages",
      "A queue where failed/unprocessable messages are moved after retry attempts",
      "A queue for urgent messages",
      "A backup queue"
    ],
    correct: 1,
    explanation: "A DLQ is a special queue where messages that cannot be processed successfully are moved after retry attempts. It isolates problematic messages, allows investigation, and prevents infinite retry loops."
  },
  {
    id: 'mq-6',
    day: 1,
    difficulty: 'M',
    question: "What is the difference between push and pull messaging?",
    options: [
      "Push is faster",
      "Push: broker sends to consumer; Pull: consumer fetches from broker",
      "They are identical",
      "Pull requires more servers"
    ],
    correct: 1,
    explanation: "Push (RabbitMQ): broker pushes messages to consumers, lower latency. Pull (Kafka): consumer polls/pulls messages, better for batch processing and natural backpressure."
  },
  {
    id: 'mq-7',
    day: 1,
    difficulty: 'E',
    question: "What is a consumer group?",
    options: [
      "A group of message producers",
      "Set of consumers sharing workload of consuming from a topic",
      "A database cluster",
      "A security group"
    ],
    correct: 1,
    explanation: "A consumer group is a set of consumers that share the workload of consuming messages from a topic/queue. Each partition is assigned to one consumer in the group, enabling horizontal scaling."
  },

  // Day 2: Apache Kafka
  {
    id: 'mq-8',
    day: 2,
    difficulty: 'M',
    question: "What is Apache Kafka?",
    options: [
      "A web server",
      "A distributed event streaming platform for high-throughput, fault-tolerant messaging",
      "A database",
      "A load balancer"
    ],
    correct: 1,
    explanation: "Apache Kafka is a distributed event streaming platform designed for high-throughput, fault-tolerant, publish-subscribe messaging. It uses a distributed commit log architecture."
  },
  {
    id: 'mq-9',
    day: 2,
    difficulty: 'M',
    question: "What is a Kafka partition?",
    options: [
      "A database table",
      "An ordered, immutable sequence of messages within a topic",
      "A server node",
      "A configuration file"
    ],
    correct: 1,
    explanation: "A partition is an ordered, immutable sequence of messages. Topics are split into partitions for parallelism. Each partition is replicated across brokers for fault tolerance."
  },
  {
    id: 'mq-10',
    day: 2,
    difficulty: 'M',
    question: "What is a Kafka offset?",
    options: [
      "Time delay",
      "Sequential ID for each message in a partition, tracking consumer position",
      "Server address",
      "Message priority"
    ],
    correct: 1,
    explanation: "An offset is a sequential, unique ID assigned to each message within a partition. Consumers track their position by storing the offset of the last consumed message."
  },
  {
    id: 'mq-11',
    day: 2,
    difficulty: 'M',
    question: "What is Kafka's replication factor?",
    options: [
      "Message duplication count",
      "Number of copies of each partition across different brokers",
      "Consumer count",
      "Topic count"
    ],
    correct: 1,
    explanation: "Replication factor determines how many copies of each partition exist across different brokers. RF=3 means 3 copies: 1 leader + 2 followers. Higher RF = better durability but more storage."
  },
  {
    id: 'mq-12',
    day: 2,
    difficulty: 'H',
    question: "What is ISR in Kafka?",
    options: [
      "Initial Server Request",
      "In-Sync Replicas - replicas caught up with leader",
      "Internal Service Registry",
      "Instant Stream Replication"
    ],
    correct: 1,
    explanation: "ISR (In-Sync Replicas) is the set of replicas that are fully caught up with the leader. Messages are only considered committed when written to all ISR members. Replicas falling behind are removed from ISR."
  },
  {
    id: 'mq-13',
    day: 2,
    difficulty: 'M',
    question: "What is the role of ZooKeeper in Kafka?",
    options: [
      "Message storage",
      "Cluster coordination, leader election, configuration management",
      "Load balancing",
      "Message encryption"
    ],
    correct: 1,
    explanation: "ZooKeeper manages Kafka cluster metadata, broker registration, leader election for partitions, topic configuration, and consumer group coordination. Note: Kafka is moving to KRaft to remove ZooKeeper dependency."
  },
  {
    id: 'mq-14',
    day: 2,
    difficulty: 'M',
    question: "What is Kafka's log compaction?",
    options: [
      "Compressing log files",
      "Retaining only the latest value for each key, removing older duplicates",
      "Deleting all logs",
      "Encrypting logs"
    ],
    correct: 1,
    explanation: "Log compaction retains only the latest value for each message key, removing older records with same key. Useful for maintaining state snapshots where only latest value matters (e.g., user profiles)."
  },

  // Day 3: RabbitMQ
  {
    id: 'mq-15',
    day: 3,
    difficulty: 'M',
    question: "What is RabbitMQ?",
    options: [
      "A database",
      "A message broker implementing AMQP with flexible routing",
      "A web framework",
      "A load balancer"
    ],
    correct: 1,
    explanation: "RabbitMQ is an open-source message broker implementing AMQP protocol. It supports complex routing patterns through exchanges, queues, and bindings with features like acknowledgments and persistence."
  },
  {
    id: 'mq-16',
    day: 3,
    difficulty: 'M',
    question: "What is an exchange in RabbitMQ?",
    options: [
      "Currency converter",
      "Component that routes messages to queues based on routing rules",
      "A backup queue",
      "A consumer type"
    ],
    correct: 1,
    explanation: "An exchange receives messages from producers and routes them to queues based on exchange type and routing rules (bindings). Types: Direct, Fanout, Topic, Headers."
  },
  {
    id: 'mq-17',
    day: 3,
    difficulty: 'M',
    question: "What are the RabbitMQ exchange types?",
    options: [
      "HTTP, TCP, UDP",
      "Direct, Fanout, Topic, Headers",
      "Push, Pull, Stream",
      "Sync, Async, Batch"
    ],
    correct: 1,
    explanation: "Direct: routes by exact routing key match. Fanout: broadcasts to all bound queues. Topic: routes by pattern matching on routing key. Headers: routes based on message headers."
  },
  {
    id: 'mq-18',
    day: 3,
    difficulty: 'M',
    question: "What is a fanout exchange?",
    options: [
      "Routes to one queue",
      "Broadcasts messages to ALL bound queues, ignoring routing key",
      "Routes by pattern",
      "Routes by headers"
    ],
    correct: 1,
    explanation: "A fanout exchange broadcasts every message to all queues bound to it, ignoring the routing key. Used for broadcast scenarios like notifications, logging, or pub-sub patterns."
  },
  {
    id: 'mq-19',
    day: 3,
    difficulty: 'M',
    question: "What is a topic exchange routing key pattern?",
    options: [
      "Simple strings only",
      "Dot-separated words with * (one word) and # (zero or more words) wildcards",
      "Regular expressions",
      "JSON patterns"
    ],
    correct: 1,
    explanation: "Topic exchange uses dot-separated routing keys like 'order.created.us'. Bindings use patterns: * matches one word, # matches zero or more words. Example: 'order.*.us' matches 'order.created.us'."
  },
  {
    id: 'mq-20',
    day: 3,
    difficulty: 'E',
    question: "What is message durability in RabbitMQ?",
    options: [
      "Message encryption",
      "Messages survive broker restart when queue and messages are marked durable",
      "Message compression",
      "Message routing"
    ],
    correct: 1,
    explanation: "Durability ensures messages survive broker restart. Requires: durable queue declaration and persistent message delivery mode. Messages are written to disk before acknowledgment."
  },

  // Day 4: Event-Driven Patterns
  {
    id: 'mq-21',
    day: 4,
    difficulty: 'M',
    question: "What is Event Sourcing?",
    options: [
      "Finding event vendors",
      "Storing state changes as sequence of events rather than current state",
      "Event logging",
      "Event scheduling"
    ],
    correct: 1,
    explanation: "Event Sourcing stores all changes as a sequence of events rather than just current state. Current state is derived by replaying events. Provides complete audit trail and temporal queries."
  },
  {
    id: 'mq-22',
    day: 4,
    difficulty: 'M',
    question: "What is CQRS?",
    options: [
      "A database type",
      "Command Query Responsibility Segregation - separate read and write models",
      "A messaging protocol",
      "A caching strategy"
    ],
    correct: 1,
    explanation: "CQRS (Command Query Responsibility Segregation) separates read and write operations into different models. Commands modify data, queries read data. Enables independent optimization and scaling."
  },
  {
    id: 'mq-23',
    day: 4,
    difficulty: 'H',
    question: "What is the Saga pattern?",
    options: [
      "A storytelling pattern",
      "Managing distributed transactions through sequence of local transactions with compensations",
      "A caching pattern",
      "A routing pattern"
    ],
    correct: 1,
    explanation: "Saga manages distributed transactions as a sequence of local transactions. Each step has a compensating action for rollback. Types: Choreography (events) and Orchestration (central coordinator)."
  },
  {
    id: 'mq-24',
    day: 4,
    difficulty: 'H',
    question: "What is the Outbox pattern?",
    options: [
      "Email outbox",
      "Reliably publishing events by writing to outbox table in same DB transaction",
      "Message queue configuration",
      "Logging pattern"
    ],
    correct: 1,
    explanation: "Outbox pattern ensures reliable event publishing: write to business table and outbox table in same DB transaction. Separate process reads outbox and publishes to message broker, ensuring atomicity."
  },
  {
    id: 'mq-25',
    day: 4,
    difficulty: 'M',
    question: "What is choreography vs orchestration in Sagas?",
    options: [
      "Dance vs music",
      "Choreography: services react to events; Orchestration: central coordinator directs",
      "They are identical",
      "Sync vs async"
    ],
    correct: 1,
    explanation: "Choreography: services independently react to events, no central controller, more decoupled but harder to track. Orchestration: central coordinator explicitly directs saga steps, easier to understand but single point."
  },
  {
    id: 'mq-26',
    day: 4,
    difficulty: 'M',
    question: "What is event-driven architecture?",
    options: [
      "UI event handling",
      "System design where components communicate through events asynchronously",
      "Database triggers",
      "Polling for changes"
    ],
    correct: 1,
    explanation: "Event-driven architecture is a design pattern where components communicate by producing and consuming events asynchronously. Enables loose coupling, scalability, and real-time responsiveness."
  },
  {
    id: 'mq-27',
    day: 4,
    difficulty: 'M',
    question: "What is the difference between event notification and event-carried state transfer?",
    options: [
      "Same thing",
      "Notification: minimal data, query for details; State transfer: full data in event",
      "Notification is faster",
      "State transfer is smaller"
    ],
    correct: 1,
    explanation: "Event notification contains minimal data (ID, type), receiver queries for details. Event-carried state transfer includes full data in the event, reducing coupling but larger messages."
  },

  // Day 5: Selection Guide
  {
    id: 'mq-28',
    day: 5,
    difficulty: 'M',
    question: "When would you choose Kafka over RabbitMQ?",
    options: [
      "For simple task queues",
      "For high-throughput streaming, event sourcing, log aggregation",
      "For complex routing patterns",
      "For small messages only"
    ],
    correct: 1,
    explanation: "Choose Kafka for: high-throughput streaming, event sourcing, log aggregation, replay capability needed, large scale data pipelines. Kafka excels at ordered, persistent event streams."
  },
  {
    id: 'mq-29',
    day: 5,
    difficulty: 'M',
    question: "When would you choose RabbitMQ over Kafka?",
    options: [
      "For log aggregation",
      "For complex routing, traditional messaging patterns, flexible acknowledgments",
      "For event streaming",
      "For replay capability"
    ],
    correct: 1,
    explanation: "Choose RabbitMQ for: complex routing requirements, traditional messaging patterns, flexible acknowledgments, priority queues, smaller scale with rich features. RabbitMQ excels at flexible message routing."
  },
  {
    id: 'mq-30',
    day: 5,
    difficulty: 'M',
    question: "What is AWS SQS?",
    options: [
      "A database service",
      "Fully managed message queue service with automatic scaling",
      "A compute service",
      "A storage service"
    ],
    correct: 1,
    explanation: "Amazon SQS (Simple Queue Service) is a fully managed message queue service. Standard queues offer high throughput with at-least-once delivery. FIFO queues guarantee exactly-once, ordered processing."
  },
  {
    id: 'mq-31',
    day: 5,
    difficulty: 'M',
    question: "What are the delivery guarantee options?",
    options: [
      "Fast, medium, slow",
      "At-most-once, at-least-once, exactly-once",
      "Sync, async, batch",
      "Push, pull, stream"
    ],
    correct: 1,
    explanation: "At-most-once: may lose messages, no duplicates. At-least-once: no loss, possible duplicates. Exactly-once: no loss, no duplicates (hardest to achieve, requires idempotent consumers or transactions)."
  },
  {
    id: 'mq-32',
    day: 5,
    difficulty: 'M',
    question: "What is message ordering and when is it important?",
    options: [
      "Alphabetical sorting",
      "Processing messages in the order they were sent, important for state consistency",
      "Message prioritization",
      "Message grouping"
    ],
    correct: 1,
    explanation: "Message ordering ensures messages are processed in the order sent. Important for: financial transactions, event sourcing, state machines, user action sequences. Kafka guarantees order within a partition."
  },
  {
    id: 'mq-33',
    day: 5,
    difficulty: 'E',
    question: "What is idempotency in message processing?",
    options: [
      "Processing messages in parallel",
      "Processing the same message multiple times produces the same result",
      "Processing messages once only",
      "Rejecting duplicate messages"
    ],
    correct: 1,
    explanation: "Idempotency means processing the same message multiple times produces the same result. Essential for at-least-once delivery where duplicates are possible. Achieved through deduplication or idempotent operations."
  },
  {
    id: 'mq-34',
    day: 5,
    difficulty: 'H',
    question: "How do you handle poison messages?",
    options: [
      "Delete immediately",
      "Retry with backoff, then move to DLQ for investigation after max retries",
      "Ignore them",
      "Block the queue"
    ],
    correct: 1,
    explanation: "Handle poison messages by: implementing retry with exponential backoff, setting max retry count, moving to Dead Letter Queue after max retries, alerting and investigating, potentially fixing and replaying."
  },
  {
    id: 'mq-35',
    day: 1,
    difficulty: 'M',
    question: "What is backpressure in message systems?",
    options: [
      "Physical pressure on servers",
      "Mechanism to slow producers when consumers can't keep up",
      "Message compression",
      "Queue prioritization"
    ],
    correct: 1,
    explanation: "Backpressure is a mechanism to handle situations when consumers can't process messages fast enough. Solutions include: slowing producers, scaling consumers, buffering with limits, or shedding load."
  }
];

export default messageQueuesQuestions;
