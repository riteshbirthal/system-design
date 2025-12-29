# Day 2: Functional & Non-Functional Requirements

## Learning Objectives
- Understand functional requirements (what the system does)
- Understand non-functional requirements (how the system performs)
- Learn to gather and document requirements effectively
- Practice requirement analysis techniques

---

## 1. Introduction to Requirements

### What are Requirements?
Requirements are the conditions or capabilities needed by a user to solve a problem or achieve an objective. They form the foundation of any system design.

### Types of Requirements

```
                    ┌─────────────────────┐
                    │    Requirements     │
                    └─────────┬───────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
    │  Functional   │ │Non-Functional │ │   Constraints │
    │  Requirements │ │  Requirements │ │               │
    └───────────────┘ └───────────────┘ └───────────────┘
```

---

## 2. Functional Requirements (FR)

### Definition
Functional requirements describe **what** the system should do. They define specific behaviors, functions, and features.

### Characteristics
- Specific and measurable
- User-centric
- Feature-focused
- Testable

### Examples

#### E-commerce Application
| Requirement ID | Description |
|----------------|-------------|
| FR-001 | Users shall be able to create accounts with email and password |
| FR-002 | Users shall be able to search for products by name, category, or price |
| FR-003 | Users shall be able to add items to shopping cart |
| FR-004 | Users shall be able to complete checkout with multiple payment options |
| FR-005 | System shall send order confirmation email after purchase |

#### Social Media Application
| Requirement ID | Description |
|----------------|-------------|
| FR-001 | Users shall be able to create posts with text, images, or videos |
| FR-002 | Users shall be able to follow/unfollow other users |
| FR-003 | Users shall see a personalized feed of posts |
| FR-004 | Users shall be able to like, comment, and share posts |
| FR-005 | Users shall receive notifications for interactions |

---

## 3. Non-Functional Requirements (NFR)

### Definition
Non-functional requirements describe **how** the system should perform. They define quality attributes and constraints.

### Categories of NFRs

#### 3.1 Scalability
- **Definition**: Ability to handle increasing load
- **Metrics**: Requests per second, concurrent users
- **Example**: "System shall handle 10,000 concurrent users"

#### 3.2 Availability
- **Definition**: Percentage of time system is operational
- **Metrics**: Uptime percentage, SLA
- **Example**: "System shall maintain 99.9% uptime (3 nines)"

| Availability | Downtime per Year | Downtime per Month |
|--------------|-------------------|-------------------|
| 99% (2 nines) | 3.65 days | 7.2 hours |
| 99.9% (3 nines) | 8.76 hours | 43.2 minutes |
| 99.99% (4 nines) | 52.6 minutes | 4.32 minutes |
| 99.999% (5 nines) | 5.26 minutes | 25.9 seconds |

#### 3.3 Performance/Latency
- **Definition**: Response time for requests
- **Metrics**: P50, P95, P99 latency
- **Example**: "Page load time shall be under 2 seconds for 95% of requests"

#### 3.4 Reliability
- **Definition**: Consistency of correct operation
- **Metrics**: Mean Time Between Failures (MTBF)
- **Example**: "System shall not lose any user data"

#### 3.5 Security
- **Definition**: Protection against threats
- **Metrics**: Encryption standards, compliance
- **Example**: "All data in transit shall be encrypted using TLS 1.3"

#### 3.6 Maintainability
- **Definition**: Ease of modification and updates
- **Metrics**: Code coverage, documentation
- **Example**: "System shall support zero-downtime deployments"

#### 3.7 Cost-Effectiveness
- **Definition**: Optimal resource utilization
- **Metrics**: Cost per user, infrastructure cost
- **Example**: "Infrastructure cost shall not exceed $0.001 per request"

---

## 4. Requirement Gathering Techniques

### 4.1 Ask Clarifying Questions
Always start by asking questions to understand the scope:

**For a Twitter-like system:**
- How many users do we expect? (Scale)
- What's the read vs write ratio? (Access patterns)
- Do we need real-time updates? (Latency requirements)
- What's the expected storage? (Capacity planning)
- What features are must-have vs nice-to-have? (Prioritization)

### 4.2 Define User Stories
Format: "As a [user], I want to [action] so that [benefit]"

**Examples:**
- As a user, I want to post tweets so that I can share my thoughts
- As a user, I want to follow people so that I can see their updates
- As a user, I want to search tweets so that I can find relevant content

### 4.3 Create Use Cases
Document interactions between users and the system:

```
Use Case: Create Post
Actor: Registered User
Preconditions: User is logged in
Main Flow:
  1. User clicks "Create Post"
  2. User enters content (text, image, video)
  3. User clicks "Publish"
  4. System validates content
  5. System saves post
  6. System shows success message
Alternative Flow:
  4a. Content validation fails
      - System shows error message
      - User corrects content
```

---

## 5. Prioritization Framework

### MoSCoW Method

| Priority | Description | Example |
|----------|-------------|---------|
| **Must Have** | Critical for launch | User authentication |
| **Should Have** | Important but not critical | Search functionality |
| **Could Have** | Nice to have | Dark mode |
| **Won't Have** | Out of scope for now | AI recommendations |

---

## 6. Trade-offs in Requirements

### Common Trade-offs

| Trade-off | Example |
|-----------|---------|
| Consistency vs Availability | Banking (consistency) vs Social Media (availability) |
| Latency vs Throughput | Real-time gaming vs Batch processing |
| Cost vs Performance | Startup vs Enterprise |
| Features vs Time-to-Market | MVP vs Full product |

---

## 7. Documentation Template

### System Requirements Document

```markdown
# [System Name] Requirements Document

## 1. Introduction
- Purpose
- Scope
- Target Users

## 2. Functional Requirements
### 2.1 User Management
- FR-001: ...
- FR-002: ...

### 2.2 Core Features
- FR-003: ...

## 3. Non-Functional Requirements
### 3.1 Performance
- NFR-001: Response time < 200ms (P95)

### 3.2 Scalability
- NFR-002: Support 1M daily active users

### 3.3 Availability
- NFR-003: 99.9% uptime

## 4. Constraints
- Budget: $X/month
- Technology: Must use existing stack
- Timeline: 6 months to MVP

## 5. Assumptions
- Users have internet connectivity
- Peak traffic at specific hours
```

---

## 8. Summary

- Functional requirements define **what** the system does
- Non-functional requirements define **how well** it performs
- Always gather requirements before designing
- Prioritize using frameworks like MoSCoW
- Document trade-offs and assumptions

---

## Further Reading
- IEEE Software Requirements Specification (SRS) Standard
- "Software Requirements" by Karl Wiegers
- [Requirements Engineering Process](https://www.geeksforgeeks.org/software-engineering-requirements-engineering-process/)
