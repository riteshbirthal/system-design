const notes = `
# Availability & Fault Tolerance

## Understanding Availability

**Definition:** Availability is the proportion of time a system is operational and accessible to users. It measures how often a system is "up" and functioning correctly.

### Formula
\`\`\`
Availability = Uptime / (Uptime + Downtime)
Availability = MTBF / (MTBF + MTTR)
\`\`\`

Where:
- **MTBF** = Mean Time Between Failures
- **MTTR** = Mean Time To Recovery

### Importance
- **User Experience**: Users expect systems to be always available
- **Business Revenue**: Downtime directly impacts revenue
- **Trust**: Reliability builds customer trust
- **Compliance**: Some industries require minimum availability

### Types of Downtime

**Planned Downtime:** Scheduled maintenance, software updates, hardware upgrades, database migrations

**Unplanned Downtime:** Hardware failures, software bugs, network issues, security incidents, human error, natural disasters

---

## Measuring Availability (The Nines)

| Level | Availability | Downtime/Year | Downtime/Month |
|-------|-------------|---------------|----------------|
| 1 Nine | 90% | 36.5 days | 72 hours |
| 2 Nines | 99% | 3.65 days | 7.2 hours |
| 3 Nines | 99.9% | 8.76 hours | 43.8 minutes |
| 4 Nines | 99.99% | 52.56 minutes | 4.38 minutes |
| 5 Nines | 99.999% | 5.26 minutes | 26.3 seconds |

### Typical Availability Targets
- Consumer web services: 99.9% (3 nines)
- Enterprise SaaS: 99.95% - 99.99%
- Financial systems: 99.99% (4 nines)
- Critical infrastructure: 99.999% (5 nines)

### Calculating Composite Availability

**Serial Systems (both must work):**
\`A_total = A1 × A2 × A3\`

Example: Service A (99.9%) × Service B (99.9%) = 99.8%

**Parallel Systems (redundancy):**
\`A_total = 1 - (1-A1) × (1-A2)\`

Example: Two servers at 99% = 1 - (0.01 × 0.01) = 99.99%

---

## Fault Tolerance Fundamentals

**Definition:** Fault tolerance is the ability of a system to continue operating properly when one or more of its components fail.

### Fault Tolerance vs High Availability

**High Availability:**
- Minimizes downtime
- May have brief interruptions
- Uses redundancy and failover
- Target: 99.9% to 99.999%

**Fault Tolerance:**
- Zero perceptible downtime
- Seamless operation during failures
- Uses synchronized redundancy
- More expensive and complex

### Fault Types

**1. Transient Faults:** Temporary, self-resolving (network glitches, timeouts)
- Handle with: Retry logic

**2. Intermittent Faults:** Occur sporadically, hard to reproduce
- Handle with: Circuit breakers

**3. Permanent Faults:** Persistent failures (hardware damage, bugs)
- Handle with: Redundancy, replacement

---

## Redundancy Strategies

**Definition:** Redundancy is duplication of critical components to increase reliability.

### Types of Redundancy

**1. Active-Active (N+N):**
- All components actively serving traffic
- Load distributed across all
- Immediate failover
- Higher cost, better utilization

**2. Active-Passive (N+M):**
- Primary handles traffic
- Standby ready to take over
- Some failover delay
- Lower utilization, lower cost

**3. N+1 Redundancy:** N components needed + 1 backup (cost-efficient)

**4. 2N Redundancy:** Full duplication (maximum protection, highest cost)

### Redundancy Layers
- **Hardware:** Dual power supplies, RAID, redundant NICs
- **Software:** Multiple app instances, replicated databases
- **Data:** Database replication, backups, geographic distribution
- **Network:** Multiple ISPs, redundant routers

---

## Failover Mechanisms

**Definition:** Failover is the process of switching to a redundant system when the primary system fails.

### Failover Types

**1. Automatic Failover:** System detects and switches without human intervention

**2. Manual Failover:** Human initiates switch (more control, slower)

**3. Graceful Failover:** Completes in-flight requests before switching

### Failover Process
1. **Detection:** Health checks, monitoring alerts
2. **Decision:** Verify failure, avoid split-brain
3. **Execution:** Switch traffic, update DNS/routing
4. **Verification:** Confirm new system operational

### Health Checks
- **Application-level:** HTTP endpoints, API validation
- **Infrastructure-level:** TCP checks, process status
- **Deep health checks:** Database connectivity, end-to-end functionality

### Split-Brain Problem
When network partitions cause multiple nodes to think they're the primary.

**Prevention:**
- Quorum-based decisions
- Fencing mechanisms
- STONITH (Shoot The Other Node In The Head)
- Leader election with consensus

---

## Disaster Recovery

### Key Metrics

**RTO (Recovery Time Objective):**
- Maximum acceptable downtime
- How long until service is restored

**RPO (Recovery Point Objective):**
- Maximum acceptable data loss
- How much data can we lose

### DR Strategies (by cost/speed)

**1. Backup and Restore:**
- Regular backups to different location
- RTO: Hours to days, RPO: Hours
- Cost: Lowest

**2. Pilot Light:**
- Minimal version always running
- RTO: Hours, RPO: Minutes to hours

**3. Warm Standby:**
- Scaled-down replica running
- RTO: Minutes to hours, RPO: Minutes

**4. Multi-Site Active-Active:**
- Full duplicate running
- RTO: Near zero, RPO: Near zero
- Cost: Highest

### Backup Strategies

**3-2-1 Rule:**
- 3 copies of data
- 2 different storage types
- 1 offsite location

---

## High Availability Patterns

### 1. Load Balancer Pattern
Distribute traffic across multiple servers - no single server failure causes outage.

### 2. Database Replication
- **Synchronous:** Strong consistency, higher latency
- **Asynchronous:** Lower latency, eventual consistency

### 3. Multi-Region Deployment
Deploy across geographic regions for regional failure survival and lower latency.

### 4. Circuit Breaker Pattern
**States:**
- **CLOSED:** Normal operation
- **OPEN:** Stop calling failed service, fail fast
- **HALF-OPEN:** Test if service recovered

### 5. Bulkhead Pattern
Isolate components with separate thread/connection pools to contain failures.

### 6. Retry with Exponential Backoff
Retry failed operations with increasing delays to handle transient failures.

---

## Designing for Failure

### Principles

1. **Assume Everything Fails:** Hardware, software, networks, people
2. **Design for Graceful Degradation:** Reduced functionality over total failure
3. **Eliminate Single Points of Failure:** Add redundancy everywhere
4. **Automate Recovery:** Auto-healing, automated failover
5. **Practice Failure:** Chaos engineering, DR drills

### Chaos Engineering

Deliberately introducing failures to test system resilience.

**Principles:**
1. Define steady state behavior
2. Hypothesize about failure impact
3. Introduce real-world events
4. Observe and learn

**Tools:** Chaos Monkey (Netflix), Gremlin, Litmus (Kubernetes)

### Failure Modes
- **Fail-Stop:** Component completely stops (easiest to detect)
- **Fail-Slow:** Component becomes very slow (causes cascading issues)
- **Fail-Partial:** Component works sometimes (intermittent)
- **Byzantine:** Component gives wrong results (hardest to handle)

---

## Best Practices

### Architecture
- Design stateless services where possible
- Use managed services with built-in HA
- Implement circuit breakers and bulkheads
- Deploy across multiple availability zones

### Monitoring
- Monitor all critical components
- Set up meaningful alerts
- Track availability metrics
- Log for troubleshooting

### Operations
- Document all procedures
- Practice incident response
- Regular DR drills
- Post-incident reviews (blameless)

### Data
- Replicate critical data
- Regular backups
- Test data recovery
- Geographic distribution

---

## Quick Reference: Availability Checklist

- [ ] Defined SLOs and SLAs
- [ ] Identified single points of failure
- [ ] Implemented redundancy at all layers
- [ ] Configured health checks
- [ ] Set up automated failover
- [ ] Created backup strategy (3-2-1)
- [ ] Defined RTO and RPO
- [ ] Tested failover mechanisms
- [ ] Implemented monitoring and alerting
- [ ] Established incident response process
`;

export default notes;
