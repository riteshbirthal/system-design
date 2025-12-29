# Week 1 Project: Design a Pastebin Service

## Project Overview
**Duration:** Weekend (6-8 hours)
**Points:** 200
**Submission Deadline:** Before Week 2 starts

---

## Objective
Design a complete system architecture for a **Pastebin** service (similar to pastebin.com) where users can store and share plain text or code snippets.

---

## Project Requirements

### Functional Requirements
1. Users can create a paste with text content
2. Users get a unique short URL for each paste
3. Users can optionally set an expiration time
4. Users can optionally set a password for private pastes
5. Users can view a paste given the URL
6. Users can see syntax-highlighted code
7. API access for programmatic paste creation

### Non-Functional Requirements
1. Handle 10 million pastes per month
2. Read-heavy workload (read:write = 10:1)
3. Average paste size: 10 KB
4. Maximum paste size: 10 MB
5. Pastes stored for 10 years by default
6. 99.9% availability
7. Low latency reads (<100ms P95)

---

## Deliverables

### Part 1: Requirements Document (30 points)

Create a requirements document that includes:

#### 1.1 Detailed Functional Requirements (10 points)
- List all user operations
- Define input/output for each operation
- Include edge cases

#### 1.2 Detailed Non-Functional Requirements (10 points)
- Availability targets with justification
- Latency requirements with justification
- Scalability requirements

#### 1.3 Clarifying Questions (10 points)
- List 10 clarifying questions you would ask
- Provide reasonable assumptions for each

---

### Part 2: Capacity Estimation (40 points)

#### 2.1 Traffic Estimation (15 points)
Calculate:
- Write requests per second
- Read requests per second
- Peak traffic (assume 3x average)

#### 2.2 Storage Estimation (15 points)
Calculate:
- Daily storage requirement
- Annual storage requirement
- 10-year storage with replication

#### 2.3 Bandwidth Estimation (10 points)
Calculate:
- Incoming bandwidth
- Outgoing bandwidth

**Show all calculations with clear reasoning.**

---

### Part 3: System Design (70 points)

#### 3.1 High-Level Architecture Diagram (25 points)
Draw a complete architecture showing:
- Client interfaces (Web, API)
- Load balancers
- Application servers
- Caching layer
- Database(s)
- Object storage (for large pastes)
- Any other necessary components

Requirements:
- Use proper system design notation
- Show data flow with arrows
- Label all components clearly

#### 3.2 Component Description (15 points)
For each component, explain:
- Purpose
- Technology choice (with justification)
- How it scales

| Component | Purpose | Technology | Scaling Strategy |
|-----------|---------|------------|------------------|
| | | | |

#### 3.3 Database Design (15 points)

**Schema Design:**
```sql
-- Provide complete SQL schema with:
-- - Tables
-- - Columns with data types
-- - Primary keys
-- - Indexes
-- - Foreign keys (if any)
```

**Database Choice:**
- SQL vs NoSQL decision with reasoning
- Specific database recommendation

#### 3.4 URL Generation Algorithm (15 points)
Design the short URL generation:
- Algorithm explanation
- Collision handling
- URL format (length, characters)
- Encoding scheme

```
Pseudocode for URL generation:

```

---

### Part 4: API Design (30 points)

#### 4.1 REST API Specification (20 points)

| Endpoint | Method | Request | Response | Description |
|----------|--------|---------|----------|-------------|
| | | | | |

Provide full details for each endpoint:
- URL path
- HTTP method
- Request headers
- Request body (JSON schema)
- Response body (JSON schema)
- Status codes
- Error responses

#### 4.2 Rate Limiting (10 points)
- Design rate limiting strategy
- Define limits per user type
- Explain implementation approach

---

### Part 5: Deep Dive (20 points)

Choose ONE of the following to deep dive:

#### Option A: Caching Strategy
- What to cache
- Cache invalidation approach
- Cache eviction policy
- Cache hit/miss handling
- CDN usage

#### Option B: Content Delivery
- How to handle large pastes (near 10 MB limit)
- Compression strategy
- Geographic distribution
- Download optimization

#### Option C: Security
- Password-protected pastes implementation
- Data encryption (at rest and in transit)
- SQL injection prevention
- XSS prevention
- Rate limiting for abuse prevention

---

### Part 6: Trade-offs & Discussion (10 points)

#### 6.1 Trade-off Analysis (5 points)
Document 3 major trade-offs in your design:

| Trade-off | Options Considered | Decision | Reasoning |
|-----------|-------------------|----------|-----------|
| | | | |

#### 6.2 Potential Bottlenecks (5 points)
Identify potential bottlenecks and solutions:

| Bottleneck | Impact | Solution |
|------------|--------|----------|
| | | |

---

## Submission Format

### Document Structure
```
week01_project_[yourname]/
├── README.md           # Project overview
├── requirements.md     # Part 1
├── estimation.md       # Part 2
├── design.md          # Part 3
├── api.md             # Part 4
├── deep-dive.md       # Part 5
├── tradeoffs.md       # Part 6
└── diagrams/
    ├── architecture.png
    └── data-flow.png
```

### Submission Guidelines
1. Create all documents in Markdown format
2. Include architecture diagrams as images
3. Show all calculations
4. Justify all decisions
5. Submit before Week 2 begins

---

## Grading Rubric

| Section | Criteria | Points |
|---------|----------|--------|
| Part 1 | Requirements completeness and clarity | 30 |
| Part 2 | Estimation accuracy and methodology | 40 |
| Part 3 | Architecture design quality | 70 |
| Part 4 | API design completeness | 30 |
| Part 5 | Deep dive depth and accuracy | 20 |
| Part 6 | Trade-off analysis quality | 10 |
| **Total** | | **200** |

### Quality Factors
- Clarity of explanation (+/- 10%)
- Diagram quality (+/- 5%)
- Professional presentation (+/- 5%)

---

## Bonus Challenges (Optional - Up to 50 extra points)

### Bonus 1: Analytics Dashboard (15 points)
Design an analytics feature showing:
- View counts per paste
- Geographic distribution
- Popular pastes
- User statistics

### Bonus 2: Comparison with Competitors (15 points)
Research and compare your design with:
- Pastebin.com
- GitHub Gist
- Hastebin
Document differences and improvements.

### Bonus 3: Cost Estimation (20 points)
Estimate monthly cloud infrastructure cost using AWS/GCP/Azure pricing for:
- Compute
- Storage
- Bandwidth
- Database
- CDN
- Total monthly/annual cost

---

## Tips for Success

1. **Start with requirements** - Don't jump to design
2. **Use a framework** - Apply RESHADED
3. **Show your work** - Document calculations
4. **Justify decisions** - Explain why, not just what
5. **Consider scale** - Design for millions of users
6. **Think about failures** - How does the system recover?
7. **Keep it simple** - Don't over-engineer
8. **Review and iterate** - Read through your design critically

Good luck!
