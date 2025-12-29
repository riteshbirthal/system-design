# Day 1 Assignment: System Design Fundamentals

## Assignment Overview

| Detail | Value |
|--------|-------|
| **Difficulty** | Beginner |
| **Estimated Time** | 60-90 minutes |
| **Total Points** | 100 |
| **Learning Focus** | Core concepts, HLD vs LLD, System components |

---

## Part 1: Conceptual Understanding (35 points)

### Task 1.1: HLD vs LLD Comparison (15 points)

In your own words, explain the difference between High-Level Design (HLD) and Low-Level Design (LLD). For each, provide:
- A clear definition
- The target audience
- Two examples of decisions made at that level

**Your Answer:**

```markdown
## High-Level Design (HLD)
Definition: [Your answer]
Target Audience: [Your answer]
Example Decisions:
1. [Example 1]
2. [Example 2]

## Low-Level Design (LLD)
Definition: [Your answer]
Target Audience: [Your answer]
Example Decisions:
1. [Example 1]
2. [Example 2]
```

### Task 1.2: Core System Properties (10 points)

Complete the table by explaining each property and providing a real-world example:

| Property | Definition | Real-World Example |
|----------|------------|-------------------|
| **Scalability** | [Your definition] | [Example: How Netflix handles millions of concurrent viewers] |
| **Reliability** | [Your definition] | [Your example] |
| **Availability** | [Your definition] | [Your example] |
| **Maintainability** | [Your definition] | [Your example] |
| **Performance** | [Your definition] | [Your example] |

### Task 1.3: Component Matching (10 points)

Match each system component (1-8) with its primary function (A-H):

| # | Component | Function |
|---|-----------|----------|
| 1 | Load Balancer | A. Stores frequently accessed data in memory |
| 2 | Cache | B. Routes requests and handles cross-cutting concerns |
| 3 | Database | C. Distributes traffic across multiple servers |
| 4 | Message Queue | D. Stores persistent data |
| 5 | CDN | E. Enables asynchronous communication |
| 6 | API Gateway | F. Caches static content at edge locations |
| 7 | Application Server | G. User-facing interface |
| 8 | Client | H. Processes business logic |

**Your Answers:**
```
1 → [ ]
2 → [ ]
3 → [ ]
4 → [ ]
5 → [ ]
6 → [ ]
7 → [ ]
8 → [ ]
```

---

## Part 2: Architecture Diagram (30 points)

### Task 2.1: Design a Simple E-commerce System (30 points)

Create an architecture diagram for a basic e-commerce platform that includes the following requirements:

**Functional Requirements:**
- Users can browse products
- Users can add items to cart
- Users can place orders
- Users can view order history

**Your diagram must include:**
1. **Client Layer**: Web browser and mobile app
2. **Load Balancer**: To distribute traffic
3. **Application Servers**: At least 2 for redundancy
4. **Database**: For products and orders
5. **Cache**: For frequently accessed product data
6. **CDN**: For static assets (images, CSS, JS)

**Diagram Requirements:**
- [ ] Use boxes to represent each component
- [ ] Use arrows to show data flow direction
- [ ] Label each component clearly
- [ ] Include brief annotations (1-2 words) describing each component's role
- [ ] Show which components communicate with each other

**Tools You Can Use:**
- [Draw.io](https://app.diagrams.net/) (free, recommended)
- [Excalidraw](https://excalidraw.com/) (free)
- [Lucidchart](https://www.lucidchart.com/) (free tier)
- Paper and pencil (take a photo)

**Example Format** (for reference only, create your own):
```
┌─────────────┐     ┌─────────────┐
│   Client    │────▶│    CDN      │
└─────────────┘     └─────────────┘
       │
       ▼
┌─────────────────────────────────┐
│         Load Balancer           │
└─────────────────────────────────┘
       │
   ┌───┴───┐
   ▼       ▼
┌─────┐ ┌─────┐
│App 1│ │App 2│
└─────┘ └─────┘
   │       │
   └───┬───┘
       │
   ┌───┴───┐
   ▼       ▼
┌─────┐ ┌─────┐
│Cache│ │ DB  │
└─────┘ └─────┘
```

**Submit:** Upload your diagram as an image or provide a shareable link

---

## Part 3: Real-World Analysis (20 points)

### Task 3.1: Application Case Study (12 points)

Choose ONE of the following applications and research its architecture:
- **Option A**: Twitter/X
- **Option B**: Netflix
- **Option C**: Uber/Lyft
- **Option D**: WhatsApp

**Fill out the following:**

```markdown
## Application Analysis: [Application Name]

### 1. Functional Requirements (4 points)
List 4 core features this application must provide:
1. 
2. 
3. 
4. 

### 2. Non-Functional Requirements (4 points)
Identify 4 quality attributes this system must have:
1. 
2. 
3. 
4. 

### 3. Key Architecture Decisions (4 points)
Research and describe 2 interesting architectural decisions this company made:

**Decision 1:** [e.g., "Netflix uses a microservices architecture with 700+ services"]
- Why they made this decision:
- Trade-offs involved:

**Decision 2:** [Your research]
- Why they made this decision:
- Trade-offs involved:
```

### Task 3.2: Metrics Calculation (8 points)

A startup is planning their system and needs your help with availability calculations:

**Scenario:** They want to promise customers "99.9% availability" (three nines)

Calculate and answer:

1. **How much downtime per year is allowed?** (2 points)
   ```
   Your calculation and answer:
   ```

2. **How much downtime per month is allowed?** (2 points)
   ```
   Your calculation and answer:
   ```

3. **If they have 3 independent services, each with 99.9% availability, what is the overall system availability?** (2 points)
   
   *Hint: For services in series, multiply availabilities: A_total = A1 × A2 × A3*
   ```
   Your calculation and answer:
   ```

4. **What does this tell you about building reliable systems?** (2 points)
   ```
   Your explanation (2-3 sentences):
   ```

---

## Part 4: Reflection (15 points)

### Task 4.1: Personal Reflection (15 points)

Answer the following questions thoughtfully (3-5 sentences each):

**1. Why are system design skills important for software engineers?** (5 points)
```
[Your answer]
```

**2. What is one concept from today's lesson that you found most interesting or surprising? Why?** (5 points)
```
[Your answer]
```

**3. Think of an application you use daily. What system design challenges do you think its engineers face?** (5 points)
```
[Your answer]
```

---

## Submission Checklist

Before submitting, ensure you have:

- [ ] Completed all conceptual questions in Part 1
- [ ] Created and attached your architecture diagram for Part 2
- [ ] Completed the case study analysis in Part 3
- [ ] Calculated all metrics correctly in Part 3
- [ ] Written thoughtful reflections in Part 4
- [ ] Named your file: `day01_assignment_[yourname].md`
- [ ] Included your diagram as an image or link

---

## Grading Rubric

| Section | Criteria | Points |
|---------|----------|--------|
| **Part 1** | HLD vs LLD explanation accuracy | 15 |
| | Core properties definitions | 10 |
| | Component matching | 10 |
| **Part 2** | Diagram completeness (all components) | 15 |
| | Diagram clarity and data flow | 10 |
| | Proper labeling and annotations | 5 |
| **Part 3** | Case study depth and accuracy | 12 |
| | Metrics calculations | 8 |
| **Part 4** | Reflection thoughtfulness | 15 |
| **Total** | | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

### Challenge: Scale Comparison Analysis

Compare the scale of these pairs of systems. For each pair, estimate and explain the differences in:
- Number of users
- Requests per second
- Data storage requirements
- Geographic distribution

| Comparison | Metric | Smaller System | Larger System |
|------------|--------|----------------|---------------|
| **Personal blog vs Medium** | Users | [Your estimate] | [Your estimate] |
| | Requests/sec | [Your estimate] | [Your estimate] |
| | Storage | [Your estimate] | [Your estimate] |
| **Local restaurant app vs Uber Eats** | Users | [Your estimate] | [Your estimate] |
| | Requests/sec | [Your estimate] | [Your estimate] |
| | Geographic scope | [Your estimate] | [Your estimate] |
| **Personal email vs Gmail** | Users | [Your estimate] | [Your estimate] |
| | Emails/day | [Your estimate] | [Your estimate] |
| | Storage | [Your estimate] | [Your estimate] |

**Reflection:** What does this tell you about the importance of system design at scale? (3-4 sentences)

---

## Helpful Resources

- [System Design Primer](https://github.com/donnemartin/system-design-primer) - Comprehensive resource
- [ByteByteGo Newsletter](https://blog.bytebytego.com/) - Visual explanations
- [High Scalability Blog](http://highscalability.com/) - Real-world case studies
- [Draw.io](https://app.diagrams.net/) - Free diagramming tool

---

## Answer Key for Component Matching (Task 1.3)

<details>
<summary>Click to reveal answers after you've attempted the task</summary>

```
1 → C (Load Balancer distributes traffic)
2 → A (Cache stores frequently accessed data in memory)
3 → D (Database stores persistent data)
4 → E (Message Queue enables async communication)
5 → F (CDN caches static content at edge locations)
6 → B (API Gateway routes requests)
7 → H (Application Server processes business logic)
8 → G (Client is user-facing interface)
```
</details>
