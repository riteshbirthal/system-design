const questions = [
  {
    question: "What is High-Level Design (HLD)?",
    answer: "High-Level Design is the architectural overview of a system that shows major components, their relationships, data flow, and technology choices without going into implementation details. It answers 'what components exist' and 'how they interact' rather than 'how they are built.'",
    difficulty: "Easy"
  },
  {
    question: "What is the purpose of HLD?",
    answer: "The purpose of HLD is to: 1) Provide a clear system overview for all stakeholders, 2) Make major architectural and technology decisions, 3) Identify components and their responsibilities, 4) Plan for scalability and reliability, 5) Serve as a blueprint for detailed design, 6) Enable parallel development by defining interfaces.",
    difficulty: "Easy"
  },
  {
    question: "What is Low-Level Design (LLD)?",
    answer: "Low-Level Design translates high-level architecture into detailed implementation specifications. It defines how each component will be built, including class structures, methods, data models, and algorithms. LLD focuses on the 'how' of implementation.",
    difficulty: "Easy"
  },
  {
    question: "What are the main components typically shown in HLD?",
    answer: "Main HLD components include: Clients (web, mobile), Load Balancers, API Gateway, Application Servers/Services, Databases (SQL/NoSQL), Caches (Redis, Memcached), Message Queues (Kafka, RabbitMQ), CDN for static content, External third-party services, and Monitoring infrastructure.",
    difficulty: "Easy"
  },
  {
    question: "What is the C4 model for system architecture?",
    answer: "C4 model is a hierarchical approach to software architecture diagrams with 4 levels: Level 1 (Context) - System in relation to users and external systems, Level 2 (Container) - High-level technical building blocks, Level 3 (Component) - Components within each container, Level 4 (Code) - Actual code elements like classes and interfaces.",
    difficulty: "Medium"
  },
  {
    question: "What factors influence technology stack decisions in HLD?",
    answer: "Technology stack decisions depend on: 1) Requirements (performance, scalability), 2) Team expertise, 3) Ecosystem and community support, 4) Cost considerations, 5) Integration capabilities, 6) Maintainability, 7) Time to market, 8) Security requirements.",
    difficulty: "Medium"
  },
  {
    question: "Explain the SOLID principles in LLD.",
    answer: "SOLID principles: S - Single Responsibility (one reason to change), O - Open/Closed (open for extension, closed for modification), L - Liskov Substitution (subtypes must be substitutable), I - Interface Segregation (specific interfaces over general), D - Dependency Inversion (depend on abstractions, not concretions).",
    difficulty: "Medium"
  },
  {
    question: "What are the key differences between HLD and LLD?",
    answer: "HLD focuses on system architecture, major components, and their interactions (the 'what'). LLD focuses on implementation details, class design, and algorithms (the 'how'). HLD is for architects and stakeholders; LLD is for developers. HLD uses architecture diagrams; LLD uses class and sequence diagrams.",
    difficulty: "Easy"
  },
  {
    question: "What is the Singleton pattern and when should you use it?",
    answer: "Singleton ensures a class has only one instance and provides global access to it. Use when: 1) Exactly one instance is needed (database connection, configuration), 2) Controlled access to shared resource is required, 3) Global state management. Be cautious as it can introduce tight coupling and testing difficulties.",
    difficulty: "Medium"
  },
  {
    question: "What is the Factory pattern?",
    answer: "Factory pattern provides an interface for creating objects without specifying their concrete classes. Benefits: 1) Decouples object creation from usage, 2) Makes code more maintainable and extensible, 3) Supports multiple product variants. Types include Simple Factory, Factory Method, and Abstract Factory.",
    difficulty: "Medium"
  },
  {
    question: "Explain the Strategy pattern.",
    answer: "Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. The algorithm can vary independently from clients that use it. Example: Different sorting algorithms or payment methods that can be swapped at runtime without changing the client code.",
    difficulty: "Medium"
  },
  {
    question: "What is the Observer pattern?",
    answer: "Observer pattern defines a one-to-many dependency where when one object (subject) changes state, all dependents (observers) are notified automatically. Use cases: Event handling systems, pub/sub mechanisms, UI components reacting to model changes. Promotes loose coupling between components.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle trade-offs in HLD decisions?",
    answer: "Handle trade-offs by: 1) Clearly stating the alternatives considered, 2) Explaining pros and cons of each, 3) Relating decisions to requirements, 4) Considering future scalability, 5) Documenting rationale for chosen approach, 6) Being prepared to pivot based on feedback.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between composition and inheritance?",
    answer: "Inheritance creates 'is-a' relationships where child classes inherit from parent classes. Composition creates 'has-a' relationships where classes contain instances of other classes. Favor composition over inheritance because: it's more flexible, avoids deep hierarchies, and allows runtime behavior changes.",
    difficulty: "Medium"
  },
  {
    question: "What are microservices and how do they affect HLD?",
    answer: "Microservices are an architectural style where an application is composed of small, independent services. Impact on HLD: 1) More components to manage, 2) Need for service discovery, 3) Inter-service communication patterns, 4) Distributed data management, 5) Independent scaling and deployment, 6) Increased operational complexity.",
    difficulty: "Hard"
  },
  {
    question: "How do you design APIs in LLD?",
    answer: "API design involves: 1) Define clear endpoints with RESTful conventions, 2) Use proper HTTP methods (GET, POST, PUT, DELETE), 3) Design request/response schemas, 4) Handle errors consistently, 5) Version your APIs, 6) Implement authentication/authorization, 7) Document with OpenAPI/Swagger, 8) Consider pagination for lists.",
    difficulty: "Medium"
  },
  {
    question: "What is the Decorator pattern?",
    answer: "Decorator pattern attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality. Example: Adding scrollbars or borders to UI components, or adding compression/encryption to I/O streams without changing the original class.",
    difficulty: "Medium"
  },
  {
    question: "How do you approach database schema design in LLD?",
    answer: "Database schema design: 1) Identify entities from requirements, 2) Define attributes and data types, 3) Establish relationships (1:1, 1:N, N:M), 4) Apply normalization (usually 3NF), 5) Add indexes for query optimization, 6) Define constraints (PK, FK, unique), 7) Consider denormalization for performance.",
    difficulty: "Hard"
  },
  {
    question: "What is the Adapter pattern?",
    answer: "Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces. Example: Wrapping a legacy system's API to work with modern code, or converting data formats between different systems.",
    difficulty: "Medium"
  },
  {
    question: "What are the key considerations for scalability in HLD?",
    answer: "Scalability considerations: 1) Stateless services for horizontal scaling, 2) Load balancing strategies, 3) Database scaling (replicas, sharding), 4) Caching at multiple layers, 5) Async processing with message queues, 6) CDN for static content, 7) Auto-scaling policies, 8) Microservices for independent scaling.",
    difficulty: "Hard"
  },
  {
    question: "Explain the Builder pattern.",
    answer: "Builder pattern separates the construction of a complex object from its representation. It allows the same construction process to create different representations. Useful when: 1) Object has many optional parameters, 2) Construction requires multiple steps, 3) You want immutable objects with many fields.",
    difficulty: "Medium"
  },
  {
    question: "What is the Command pattern?",
    answer: "Command pattern encapsulates a request as an object, letting you parameterize clients with different requests, queue or log requests, and support undoable operations. Components: Command (interface), ConcreteCommand (implementation), Invoker (triggers command), Receiver (performs action). Useful for undo/redo, queuing, and logging.",
    difficulty: "Medium"
  },
  {
    question: "How do you ensure code maintainability in LLD?",
    answer: "Ensure maintainability by: 1) Following SOLID principles, 2) Using meaningful names, 3) Keeping functions/classes small and focused, 4) Writing clean, readable code, 5) Adding appropriate comments, 6) Using design patterns where applicable, 7) Writing unit tests, 8) Managing dependencies carefully.",
    difficulty: "Medium"
  },
  {
    question: "What is the Proxy pattern?",
    answer: "Proxy pattern provides a surrogate or placeholder for another object to control access to it. Types: Virtual Proxy (lazy loading), Protection Proxy (access control), Remote Proxy (local representative of remote object), Smart Proxy (additional actions on access). Common in ORM lazy loading and RPC systems.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle security in HLD?",
    answer: "Security in HLD: 1) Authentication and authorization mechanisms, 2) API security (rate limiting, input validation), 3) Data encryption (in transit with TLS, at rest), 4) Network security (firewalls, VPCs), 5) Secret management, 6) Audit logging, 7) Security boundaries between components, 8) Regular security assessments.",
    difficulty: "Hard"
  },
  {
    question: "What is Interface Segregation Principle?",
    answer: "Interface Segregation Principle states that clients should not be forced to depend on interfaces they don't use. Instead of one large interface, create smaller, specific interfaces. This reduces coupling, improves maintainability, and makes the system more flexible to changes.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between abstract class and interface?",
    answer: "Abstract class: Can have implementation and state, single inheritance, can have constructors, represents 'is-a' relationship. Interface: Only method signatures (pre-Java 8), multiple inheritance, no constructors, represents 'can-do' capability. Use abstract class for shared code; interface for defining contracts.",
    difficulty: "Medium"
  },
  {
    question: "How do you approach HLD for a distributed system?",
    answer: "Distributed system HLD: 1) Handle network partitions and failures, 2) Choose consistency model (strong vs eventual), 3) Implement service discovery, 4) Design for partial failures, 5) Use distributed tracing, 6) Handle distributed transactions, 7) Implement circuit breakers, 8) Consider CAP theorem trade-offs.",
    difficulty: "Hard"
  },
  {
    question: "What is Dependency Injection and why use it?",
    answer: "Dependency Injection is providing dependencies to a class rather than having it create them. Benefits: 1) Loose coupling, 2) Easier testing with mocks, 3) Better separation of concerns, 4) More flexible configuration, 5) Supports Open/Closed principle. Types: Constructor injection, Setter injection, Interface injection.",
    difficulty: "Medium"
  },
  {
    question: "What is the Repository pattern?",
    answer: "Repository pattern mediates between domain and data mapping layers, acting like an in-memory collection of domain objects. Benefits: 1) Decouples business logic from data access, 2) Centralizes data access logic, 3) Makes testing easier, 4) Supports different data sources. Works well with Unit of Work pattern.",
    difficulty: "Medium"
  },
  {
    question: "How do you document HLD effectively?",
    answer: "Effective HLD documentation: 1) Architecture diagrams with clear notation, 2) Component descriptions and responsibilities, 3) Technology choices with rationale, 4) Data flow diagrams, 5) API contracts, 6) Non-functional requirements addressed, 7) Trade-off decisions documented, 8) Keep it updated as system evolves.",
    difficulty: "Medium"
  },
  {
    question: "What is the State pattern?",
    answer: "State pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class. Useful for: 1) Objects with state-dependent behavior, 2) Replacing complex conditionals, 3) State machines. Example: TCP connection states (listen, established, closed).",
    difficulty: "Hard"
  },
  {
    question: "How do you handle data consistency in HLD?",
    answer: "Data consistency approaches: 1) Strong consistency with ACID transactions, 2) Eventual consistency for distributed systems, 3) Saga pattern for distributed transactions, 4) Two-phase commit (with trade-offs), 5) Event sourcing for audit trails, 6) CQRS for read/write separation, 7) Idempotent operations for retries.",
    difficulty: "Hard"
  },
  {
    question: "What is the Template Method pattern?",
    answer: "Template Method defines the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the algorithm's structure. Useful for: 1) Enforcing algorithm structure, 2) Code reuse with variation points, 3) Framework extension points. Follows the Hollywood Principle ('Don't call us, we'll call you').",
    difficulty: "Medium"
  },
  {
    question: "What is cohesion and coupling in software design?",
    answer: "Cohesion measures how related elements within a module are (high is good). Coupling measures dependencies between modules (low is good). Goal: High cohesion, low coupling. Achieved through: Single responsibility, clear interfaces, dependency injection, proper encapsulation, and using design patterns appropriately.",
    difficulty: "Medium"
  }
];

export default questions;
