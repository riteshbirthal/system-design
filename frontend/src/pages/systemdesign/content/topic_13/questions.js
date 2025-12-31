const questions = [
  {
    question: "What is the difference between monolithic and microservices architecture?",
    answer: "Monolith: Single deployable unit, all functionality in one codebase, single database, simple but hard to scale. Microservices: Application split into small independent services, each with own database, communicate via APIs/messages. Microservices offer independent scaling, deployment, and technology choice but add distributed system complexity.",
    difficulty: "Easy"
  },
  {
    question: "What are the advantages of microservices?",
    answer: "Independent scaling (scale only what needs it), technology freedom (best tool per service), independent deployment (deploy without affecting others), team autonomy (teams own services end-to-end), fault isolation (one service failure doesn't crash all), easier to understand (small focused codebases), faster development for large teams.",
    difficulty: "Easy"
  },
  {
    question: "What are the disadvantages of microservices?",
    answer: "Distributed complexity (network failures, latency), no ACID transactions across services, operational overhead (many services to deploy/monitor), testing complexity (integration testing harder), network latency, data consistency challenges (eventual consistency), debugging across services is harder, requires mature DevOps practices.",
    difficulty: "Easy"
  },
  {
    question: "When should you use monolith vs microservices?",
    answer: "Monolith: Early-stage startup, small team (<10 devs), simple domain, need to move fast, limited DevOps. Microservices: Large complex domain, multiple autonomous teams, need independent scaling, different technology needs per component, high availability requirements. Many recommend: Start monolith, extract services when needed.",
    difficulty: "Medium"
  },
  {
    question: "What is the Strangler Pattern?",
    answer: "Strangler Pattern gradually replaces monolith with microservices. Steps: 1) Put API gateway/facade in front of monolith. 2) Build new functionality as services. 3) Route new features to new services. 4) Gradually extract and migrate existing features. 5) Eventually retire monolith. Benefits: Low risk, incremental migration, continuous delivery throughout.",
    difficulty: "Medium"
  },
  {
    question: "What is service discovery and why is it needed?",
    answer: "Service discovery helps services find each other in dynamic environments where instances come and go. Types: Client-side (client queries registry, chooses instance) and Server-side (load balancer queries registry). Tools: Consul, etcd, ZooKeeper, Kubernetes DNS. Needed because IPs change with scaling, deployments, failures.",
    difficulty: "Medium"
  },
  {
    question: "How do microservices communicate?",
    answer: "Synchronous: REST APIs (HTTP), gRPC (binary, efficient), direct service calls. Asynchronous: Message queues (Kafka, RabbitMQ), event-driven. Sync: Simple, immediate response, but couples services. Async: Decoupled, resilient, but complex. Choose based on: Need immediate response (sync), fire-and-forget (async), event notification (async).",
    difficulty: "Medium"
  },
  {
    question: "What is the database per service pattern?",
    answer: "Each microservice owns its data and database. No direct database access between services. Benefits: Independent schema evolution, technology choice per service, loose coupling. Challenges: Data consistency (no joins across services), distributed transactions. Solutions: Saga pattern for transactions, API calls or events for data sharing.",
    difficulty: "Medium"
  },
  {
    question: "What is the Saga pattern?",
    answer: "Saga manages distributed transactions across services without 2PC. Sequence of local transactions where each publishes events/triggers next. If step fails, compensating transactions undo previous steps. Types: Choreography (events between services) and Orchestration (central coordinator). Example: Order saga - create order, reserve inventory, charge payment, with compensations if any fail.",
    difficulty: "Hard"
  },
  {
    question: "What is a service mesh?",
    answer: "Service mesh handles service-to-service communication infrastructure. Sidecar proxy (Envoy) deployed with each service handles: load balancing, service discovery, encryption (mTLS), retries, circuit breaking, observability. Control plane (Istio, Linkerd) manages configuration. Benefits: Offloads networking from app code, consistent policies. Trade-off: Complexity, resource overhead.",
    difficulty: "Hard"
  },
  {
    question: "How do you handle distributed tracing in microservices?",
    answer: "Distributed tracing tracks requests across services. Implementation: Generate correlation/trace ID at entry, propagate in headers through all service calls, each service logs with trace ID. Tools: Jaeger, Zipkin, AWS X-Ray. Benefits: Debug latency issues, understand call flows, identify bottlenecks. Essential for troubleshooting in microservices.",
    difficulty: "Medium"
  },
  {
    question: "What is Domain-Driven Design (DDD) and how does it relate to microservices?",
    answer: "DDD models software around business domains. Key concepts: Bounded Context (clear boundary around domain model), Ubiquitous Language (shared vocabulary), Aggregates (consistency boundaries). Microservices align with bounded contexts - each service owns a bounded context. DDD helps identify service boundaries. Not all microservices need DDD, but it helps for complex domains.",
    difficulty: "Hard"
  },
  {
    question: "What is an API Gateway and why use it with microservices?",
    answer: "API Gateway is single entry point for all clients. Handles: Routing to services, authentication, rate limiting, request transformation, aggregation. Benefits: Clients don't need to know all services, cross-cutting concerns centralized, simplifies clients. Examples: Kong, AWS API Gateway, Zuul. Essential for external API exposure in microservices.",
    difficulty: "Medium"
  },
  {
    question: "How do you decompose a monolith into microservices?",
    answer: "Strategies: 1) By business capability (user mgmt, orders, payments). 2) By subdomain (DDD bounded contexts). 3) By team structure (Conway's Law). Process: Identify seams in monolith, extract service behind API, migrate data, switch traffic. Use Strangler pattern for gradual migration. Start with loosely coupled, well-understood parts.",
    difficulty: "Hard"
  },
  {
    question: "What is the Circuit Breaker pattern?",
    answer: "Circuit Breaker prevents cascade failures when a service is down. States: Closed (normal, requests pass), Open (failures exceeded threshold, requests fail fast), Half-Open (test requests to check recovery). Benefits: Fail fast, allow service recovery, prevent resource exhaustion. Implementation: Resilience4j, Hystrix. Essential for resilient microservices.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle configuration in microservices?",
    answer: "Challenges: Many services, many environments, secrets management. Solutions: 1) Environment variables. 2) Config files in deployment. 3) Config server (Spring Cloud Config, Consul). 4) Secret management (Vault, AWS Secrets Manager). Best practices: Externalize config, use config server for centralization, encrypt secrets, support runtime updates.",
    difficulty: "Medium"
  },
  {
    question: "What is eventual consistency and how do you handle it in microservices?",
    answer: "Eventual consistency: Data will be consistent eventually, not immediately. Occurs because services have separate databases, async communication. Handling: Design for it (accept temporary inconsistency), use Saga pattern, implement compensating transactions, idempotent operations. User experience: Show pending states, async notifications. Not all operations need strong consistency.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle data queries across microservices?",
    answer: "Challenge: No joins across service databases. Solutions: 1) API composition (gateway aggregates from multiple services). 2) CQRS (separate read model combining data). 3) Data replication (events sync data to read service). 4) Denormalization (duplicate needed data). Choose based on query patterns, consistency needs, complexity tolerance.",
    difficulty: "Hard"
  },
  {
    question: "What is the Backends for Frontends (BFF) pattern?",
    answer: "BFF creates separate backend for each frontend type (web BFF, mobile BFF, partner BFF). Each BFF: Aggregates data from microservices, transforms for specific client needs, handles client-specific logic. Benefits: Optimized per client, independent evolution, security per client type. Trade-off: More code to maintain. Use when clients have significantly different needs.",
    difficulty: "Medium"
  },
  {
    question: "How do you test microservices?",
    answer: "Testing pyramid: Unit tests (per service, fast), Integration tests (service + dependencies), Contract tests (verify API contracts between services - Pact), End-to-end tests (full flow, expensive). Challenges: Many services, environment setup. Solutions: Consumer-driven contracts, service virtualization, test containers. Shift left: More unit/contract tests, fewer E2E.",
    difficulty: "Medium"
  },
  {
    question: "What is observability in microservices?",
    answer: "Observability = understanding system state from external outputs. Three pillars: Logs (events, structured logging), Metrics (numbers over time - latency, error rate, throughput), Traces (request flow across services). Tools: ELK/Loki for logs, Prometheus/Grafana for metrics, Jaeger/Zipkin for traces. Essential for debugging distributed systems.",
    difficulty: "Medium"
  },
  {
    question: "What are the challenges of microservices deployment?",
    answer: "Challenges: Many services to deploy, dependency management, environment consistency, rollback complexity. Solutions: CI/CD automation, containerization (Docker), orchestration (Kubernetes), infrastructure as code, blue-green/canary deployments, feature flags. Need mature DevOps: Automated testing, deployment pipelines, monitoring. Complexity requires investment.",
    difficulty: "Medium"
  },
  {
    question: "What is Conway's Law and how does it apply to microservices?",
    answer: "Conway's Law: Organizations design systems that mirror their communication structure. Application: Team structure should match desired architecture. Microservices work best with autonomous teams owning services end-to-end. Inverse Conway: Structure teams to get desired architecture. Cross-functional teams (dev, ops, QA) per service for true ownership.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle versioning in microservices?",
    answer: "API versioning strategies: URL path (/v1/users), header (Accept-Version), query param. Service versioning: Semantic versioning, backward compatibility. Deployment: Run multiple versions, traffic shifting. Best practices: Maintain backward compatibility, deprecation policy, contract tests. Avoid breaking changes; add new endpoints instead of modifying.",
    difficulty: "Medium"
  },
  {
    question: "What is gRPC and when would you use it over REST?",
    answer: "gRPC: Binary protocol using Protocol Buffers, HTTP/2 based, supports streaming. Advantages over REST: Higher performance (binary, smaller payload), strong typing (schema), bidirectional streaming, code generation. Use gRPC for: Internal service communication, high performance needs, streaming. Use REST for: External APIs, browser clients, simpler tooling needs.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle security in microservices?",
    answer: "Challenges: Many services, many attack surfaces. Solutions: API Gateway authentication, service-to-service auth (mTLS in service mesh), JWT token propagation, OAuth2/OIDC for users. Defense in depth: Network policies, secrets management (Vault), input validation per service, security scanning. Zero trust: Verify every request, encrypt in transit.",
    difficulty: "Hard"
  },
  {
    question: "What is the Sidecar pattern?",
    answer: "Sidecar deploys helper container alongside main service container. Handles cross-cutting concerns: Logging, monitoring, networking, security. Example: Envoy proxy sidecar in service mesh. Benefits: Separation of concerns, consistent behavior, language-agnostic. Used in: Service mesh, log collection, config management. Trade-off: Resource overhead per service.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle database migrations in microservices?",
    answer: "Each service owns its schema, migrates independently. Tools: Flyway, Liquibase per service. Process: Migration scripts in service repo, run during deployment. Backward compatibility: Support old and new schema temporarily (expand-contract pattern). Challenges: Coordinating related changes across services. Solution: Feature flags, gradual rollout.",
    difficulty: "Medium"
  },
  {
    question: "What is the Bulkhead pattern?",
    answer: "Bulkhead isolates failures by partitioning resources. Like ship compartments prevent full flooding. Implementation: Separate thread pools per dependency, connection pool limits, separate service instances for critical paths. Benefits: Failure in one component doesn't exhaust resources for others. Example: Separate thread pool for payment calls vs inventory calls.",
    difficulty: "Medium"
  },
  {
    question: "How do you decide the size of a microservice?",
    answer: "Guidelines: Single responsibility (one business capability), can be developed by small team (2 pizza rule), can be rewritten in 2 weeks, independent deployment and scaling. Too small (nanoservices): Excessive overhead, complex dependencies. Too large: Loses microservices benefits. Right size varies - focus on business boundaries, team ownership, deployment independence.",
    difficulty: "Medium"
  }
];

export default questions;
