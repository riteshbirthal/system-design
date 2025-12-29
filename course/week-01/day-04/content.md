# Day 4: Back-of-Envelope Estimation

## Learning Objectives
- Learn to estimate system capacity and requirements
- Understand common numbers every engineer should know
- Practice quick calculations for system design
- Learn to identify resource requirements

---

## 1. Why Estimation Matters

### Purpose in System Design
- **Capacity Planning**: Determine infrastructure needs
- **Cost Estimation**: Calculate operational costs
- **Feasibility Check**: Verify if design can meet requirements
- **Interview Success**: Demonstrate analytical thinking

### When to Use
- At the start of system design discussions
- When evaluating architecture options
- During capacity planning meetings
- In system design interviews

---

## 2. Numbers Every Engineer Should Know

### Latency Numbers (2024)

| Operation | Time |
|-----------|------|
| L1 cache reference | 0.5 ns |
| L2 cache reference | 7 ns |
| Main memory reference | 100 ns |
| SSD random read | 16 μs |
| HDD random read | 2 ms |
| Round trip within data center | 0.5 ms |
| Round trip across regions | 150 ms |

### Time Units Conversion

| Unit | Equivalent |
|------|------------|
| 1 ns (nanosecond) | 10⁻⁹ seconds |
| 1 μs (microsecond) | 10⁻⁶ seconds = 1,000 ns |
| 1 ms (millisecond) | 10⁻³ seconds = 1,000 μs |
| 1 second | 1,000 ms |

### Data Size Units

| Unit | Bytes | Practical Example |
|------|-------|-------------------|
| 1 Byte | 1 | Single ASCII character |
| 1 KB (Kilobyte) | 1,024 | Small text file |
| 1 MB (Megabyte) | 1,024 KB | High-res photo |
| 1 GB (Gigabyte) | 1,024 MB | HD movie |
| 1 TB (Terabyte) | 1,024 GB | 250 HD movies |
| 1 PB (Petabyte) | 1,024 TB | 20 million filing cabinets |

### Power of 2 Reference

| Power | Value | Approximation |
|-------|-------|---------------|
| 2¹⁰ | 1,024 | ~1 thousand |
| 2²⁰ | 1,048,576 | ~1 million |
| 2³⁰ | 1,073,741,824 | ~1 billion |
| 2⁴⁰ | ~1.1 trillion | ~1 trillion |

---

## 3. Common Estimation Values

### Time Calculations

| Time Period | Seconds | Approximation |
|-------------|---------|---------------|
| 1 minute | 60 | ~100 |
| 1 hour | 3,600 | ~4,000 |
| 1 day | 86,400 | ~100,000 |
| 1 month | 2,592,000 | ~2.5 million |
| 1 year | 31,536,000 | ~30 million |

### Traffic Estimation Helpers

| Daily Active Users | Requests/Day (10 actions/user) | Requests/Second |
|-------------------|--------------------------------|-----------------|
| 1 million | 10 million | ~100/s |
| 10 million | 100 million | ~1,000/s |
| 100 million | 1 billion | ~10,000/s |
| 1 billion | 10 billion | ~100,000/s |

### Storage Estimation Helpers

| Data Type | Typical Size |
|-----------|--------------|
| User ID (UUID) | 16 bytes |
| Timestamp | 8 bytes |
| Short text (tweet) | 280 bytes |
| User profile | 1 KB |
| Image thumbnail | 10 KB |
| Standard image | 200 KB |
| High-res image | 2 MB |
| Video per minute | 50 MB |

---

## 4. Estimation Framework

### Step-by-Step Process

```
1. Clarify Requirements
   └─▶ What are we estimating? (Storage? Bandwidth? Servers?)

2. Estimate Scale
   └─▶ How many users? How active? What's the read/write ratio?

3. Calculate Storage
   └─▶ Data size × Number of items × Growth factor

4. Calculate Bandwidth
   └─▶ Storage × Access frequency / Time period

5. Calculate Compute
   └─▶ Requests per second × Processing time per request

6. Apply Safety Margin
   └─▶ Multiply by 2-3x for buffer
```

---

## 5. Worked Examples

### Example 1: URL Shortener (like TinyURL)

**Requirements:**
- 100 million new URLs per month
- Read:Write ratio = 100:1
- URLs stored for 5 years
- Each URL mapping ~500 bytes

**Storage Calculation:**
```
Monthly new URLs: 100 million
Yearly: 100M × 12 = 1.2 billion
5 years: 1.2B × 5 = 6 billion URLs

Storage per URL: 500 bytes
Total storage: 6B × 500 bytes = 3 TB

With replication (3x): 3 TB × 3 = 9 TB
```

**Traffic Calculation:**
```
Writes per month: 100 million
Writes per second: 100M / (30 days × 24 hours × 3600 sec)
                 = 100M / 2.6M
                 ≈ 40 writes/second

Reads per second: 40 × 100 = 4,000 reads/second
```

**Bandwidth Calculation:**
```
Incoming (writes): 40 req/s × 500 bytes = 20 KB/s
Outgoing (reads): 4,000 req/s × 500 bytes = 2 MB/s
```

---

### Example 2: Twitter-like System

**Requirements:**
- 500 million users
- 200 million daily active users (DAU)
- Average 5 tweets per user per day
- Average 100 tweet reads per user per day
- Tweet size: 300 bytes (text) + 1 KB (metadata)

**Storage Calculation:**
```
Daily tweets: 200M users × 5 tweets = 1 billion tweets/day
Yearly tweets: 1B × 365 = 365 billion tweets/year

Storage per tweet: 300 + 1,024 = ~1.3 KB
Daily storage: 1B × 1.3 KB = 1.3 TB/day
Yearly storage: 1.3 TB × 365 = 475 TB/year

With 20% for images (200 KB avg, 20% tweets have images):
Image storage: 1B × 0.2 × 200 KB = 40 TB/day
```

**Traffic Calculation:**
```
Write requests (tweets):
1B tweets/day = 1B / 86,400 ≈ 12,000 writes/second

Read requests (timeline):
200M users × 100 reads = 20B reads/day
20B / 86,400 ≈ 230,000 reads/second

Peak traffic (2x average): 
Writes: 24,000/s
Reads: 460,000/s
```

**Bandwidth Calculation:**
```
Write bandwidth: 12,000/s × 1.3 KB = 15.6 MB/s
Read bandwidth: 230,000/s × 1.3 KB = 300 MB/s

Peak (2x): 600 MB/s outgoing
```

---

### Example 3: Video Streaming Service

**Requirements:**
- 1 billion users
- 200 million daily active users
- Average watch time: 1 hour/day
- Video bitrate: 5 Mbps (HD)

**Bandwidth Calculation:**
```
Concurrent viewers (assume 10% at any time):
200M × 0.1 = 20 million concurrent

Bandwidth needed:
20M × 5 Mbps = 100 Pbps (petabits per second)
= 12.5 PB/s (petabytes per second)
```

**Storage Calculation:**
```
Assume 10 million videos, average 10 minutes each
Storage per minute: 50 MB (compressed)
Total: 10M × 10 min × 50 MB = 5 PB

Multiple quality levels (4x): 20 PB
With redundancy (3x): 60 PB
```

---

## 6. Quick Estimation Cheat Sheet

### Requests Per Second (RPS)

```
Daily requests → RPS formula:
RPS = Daily requests / 86,400 (seconds in day)
    ≈ Daily requests / 100,000 (for quick math)

Example: 100M daily requests
RPS ≈ 100M / 100K = 1,000 RPS
```

### Storage Growth

```
Daily growth × 365 × Years × Replication factor

Example: 1 TB/day for 3 years with 3x replication
= 1 TB × 365 × 3 × 3 = 3.3 PB
```

### Server Estimation

```
Servers needed = Peak RPS / RPS per server

Typical server handles:
- Simple API: 10,000-50,000 RPS
- Complex API: 1,000-5,000 RPS
- Database: 5,000-10,000 QPS

Example: 100,000 RPS for simple API
Servers = 100,000 / 20,000 = 5 servers
With buffer (2x): 10 servers
```

---

## 7. Common Mistakes to Avoid

| Mistake | How to Avoid |
|---------|--------------|
| Forgetting peak vs average | Always calculate peak (2-10x average) |
| Ignoring replication | Multiply storage by replication factor |
| Missing metadata overhead | Add 20-50% for indexes, logs, etc. |
| Not considering growth | Plan for 2-3 years of growth |
| Precision obsession | Round numbers; order of magnitude matters |

---

## 8. Summary

- Learn the common numbers (latency, sizes, time conversions)
- Use a systematic framework for estimation
- Practice with real-world examples
- Focus on order of magnitude, not exact numbers
- Always account for peak load and growth

---

## Further Reading
- [Latency Numbers Every Programmer Should Know](https://gist.github.com/jboner/2841832)
- [System Design Estimation Cheatsheet](https://bytebytego.com/)
- "Designing Data-Intensive Applications" - Chapter 1
