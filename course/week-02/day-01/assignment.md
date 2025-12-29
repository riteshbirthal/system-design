# Day 1 Assignment: DNS & Domain Resolution

## Assignment Overview
**Difficulty:** Beginner
**Estimated Time:** 45-60 minutes
**Points:** 100

---

## Part 1: Conceptual Questions (40 points)

### Task 1.1 (15 points)
Explain the DNS resolution process when a user types `www.amazon.com` in their browser. List all the steps from the initial request to receiving the IP address.

**Your Answer:**
```
[Write your answer here with numbered steps]
```

### Task 1.2 (10 points)
Complete the table by matching DNS record types with their purposes:

| Record Type | Purpose |
|-------------|---------|
| A | |
| AAAA | |
| CNAME | |
| MX | |
| NS | |
| TXT | |

### Task 1.3 (15 points)
You are designing a global e-commerce platform. Answer the following:

1. Why would you use GeoDNS for this platform?
2. What TTL values would you set for the main domain and why?
3. How would DNS help during a disaster recovery scenario?

---

## Part 2: Practical Exercise (30 points)

### Task 2.1 (15 points)
Using the `dig` or `nslookup` command (or online tools like [dnschecker.org](https://dnschecker.org)), analyze the DNS configuration of `github.com`:

1. What are the A record IP addresses?
2. What are the name servers (NS records)?
3. What is the TTL for the A records?
4. Are there any CNAME records?

**Your Findings:**
```
[Document your findings here]
```

### Task 2.2 (15 points)
Design a DNS configuration for a startup with the following requirements:
- Main website: `www.startup.com`
- API server: `api.startup.com`
- Mail server: `mail.startup.com`
- User subdomains: `*.users.startup.com`

Write out the DNS records you would create:

```
[Write your DNS records here in the format:
domain.    TTL    IN    TYPE    VALUE]
```

---

## Part 3: System Design Application (30 points)

### Task 3.1 (20 points)
Your company operates in three regions: US, Europe, and Asia. Design a DNS strategy that:
- Routes users to the nearest data center
- Provides failover if one region goes down
- Allows for blue-green deployments

Include:
1. A diagram showing your DNS architecture
2. Explanation of record types used
3. TTL strategy for each scenario
4. Failover mechanism

### Task 3.2 (10 points)
Research and explain one real-world DNS outage (e.g., Dyn DNS attack 2016, or any recent incident). Answer:

1. What happened?
2. What systems were affected?
3. How could it have been prevented?
4. What lessons can be applied to system design?

---

## Submission Guidelines

1. Save your answers in a document named `day01_dns_assignment_[yourname].md`
2. Include screenshots of your `dig`/`nslookup` commands if applicable
3. Submit by the end of Day 1

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Conceptual accuracy | 30 |
| Practical exercise completion | 25 |
| DNS configuration correctness | 15 |
| System design quality | 20 |
| Proper formatting | 10 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 15 extra points)

Research and explain the following advanced DNS topics:
1. **DNS Anycast**: How does it work and why is it used for root servers?
2. **DNS-based Authentication**: How do SPF, DKIM, and DMARC records prevent email spoofing?
3. **EDNS Client Subnet**: How does it improve CDN performance?
