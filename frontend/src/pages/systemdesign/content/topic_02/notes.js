const notes = `
# High-Level Design (HLD) vs Low-Level Design (LLD)

## Overview: HLD vs LLD

System design is typically divided into two complementary phases that serve different purposes in the software development lifecycle.

### High-Level Design (HLD)
- Also known as: System Architecture, Macro Design
- Focus: Overall system structure
- Audience: All stakeholders, architects, senior developers
- Abstraction: High (conceptual)
- Output: Architecture diagrams, component interactions

### Low-Level Design (LLD)
- Also known as: Detailed Design, Micro Design, Object-Oriented Design
- Focus: Individual component implementation
- Audience: Developers, engineers
- Abstraction: Low (implementation details)
- Output: Class diagrams, method signatures, data schemas

## Key Differences

| Aspect | HLD | LLD |
|--------|-----|-----|
| Scope | Entire system | Individual components |
| Level | Abstract/Conceptual | Concrete/Implementation |
| Components | Services, databases | Classes, methods, APIs |
| Focus | What components exist | How components work |

## High-Level Design Deep Dive

### Key Elements of HLD

**1. System Architecture**
- Overall structure of the system
- Major layers (presentation, business, data)
- Deployment topology
- Architecture patterns (monolithic, microservices, serverless)

**2. Major Components/Services**
- User-facing components (web app, mobile app)
- Backend services (API servers, worker services)
- Data stores (databases, caches, file storage)
- External integrations

**3. Component Interactions**
- Communication patterns (sync vs async)
- Request/response patterns
- Event-driven communication

**4. Data Flow**
- How data moves through the system
- Input sources and output destinations
- Data transformation points

**5. Technology Stack**
- Programming languages and frameworks
- Database choices
- Message queues and caches
- Cloud services

**6. Scalability Considerations**
- Horizontal vs vertical scaling
- Load balancing approach
- Caching strategy
- Database scaling

## Low-Level Design Deep Dive

### Key Elements of LLD

**1. Class Design**
- Class definitions and responsibilities
- Attributes and their types
- Methods and signatures
- Access modifiers

**2. Object-Oriented Principles**
- Encapsulation
- Inheritance hierarchies
- Polymorphism
- Abstraction layers

**3. Design Patterns**
- Creational: Factory, Singleton, Builder
- Structural: Adapter, Decorator, Proxy
- Behavioral: Strategy, Observer, Command

**4. Data Structures & Algorithms**
- Appropriate structure selection
- Time and space complexity
- Optimization strategies

**5. Database Schema**
- Table definitions and relationships
- Indexes and constraints
- Normalization decisions

**6. API Specifications**
- Endpoint definitions
- Request/response formats
- Error handling

## HLD Interview Approach

### Step 1: Requirements Clarification (3-5 min)
- Understand functional requirements
- Define non-functional requirements
- Identify constraints

### Step 2: Capacity Estimation (3-5 min)
- Traffic estimates
- Storage requirements
- Bandwidth needs

### Step 3: High-Level Design (10-15 min)
- Draw system architecture
- Identify major components
- Define data flow

### Step 4: Deep Dive (10-15 min)
- Discuss critical components
- Address scalability
- Handle edge cases

## LLD Interview Approach

### Step 1: Understand Requirements
- Use cases and features
- Constraints and assumptions

### Step 2: Identify Classes/Objects
- Nouns become classes
- Verbs become methods

### Step 3: Define Relationships
- Inheritance, composition, aggregation
- Interface definitions

### Step 4: Apply Design Patterns
- Match patterns to problems
- Keep it simple

## Best Practices

### For HLD
- Start with requirements
- Think about scalability early
- Consider failure scenarios
- Document trade-offs

### For LLD
- Follow SOLID principles
- Use design patterns appropriately
- Keep classes focused
- Write testable code

## Common Design Patterns

### Creational Patterns
- **Singleton**: Single instance globally
- **Factory**: Object creation abstraction
- **Builder**: Complex object construction

### Structural Patterns
- **Adapter**: Interface compatibility
- **Decorator**: Dynamic behavior addition
- **Proxy**: Access control

### Behavioral Patterns
- **Strategy**: Interchangeable algorithms
- **Observer**: Event notification
- **Command**: Request encapsulation
`;

export default notes;
