const notes = `
# Monitoring, Logging & Observability

## Introduction to Observability

### Definition
Observability is the ability to understand a system's internal state from its external outputs.

### Three Pillars
1. **Logs**: Discrete events with details
2. **Metrics**: Numeric measurements over time
3. **Traces**: Request flow across services

### Why Observability Matters
- Understand system behavior
- Detect and diagnose issues
- Optimize performance
- Support incident response
- Enable data-driven decisions

---

## Logging

### Log Levels
| Level | Use Case |
|-------|----------|
| DEBUG | Detailed debugging info |
| INFO | General operational messages |
| WARN | Potential issues |
| ERROR | Error conditions |
| FATAL | Critical failures |

### Structured Logging
\`\`\`json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "order-service",
  "trace_id": "abc123",
  "message": "Payment failed",
  "user_id": "user_456",
  "order_id": "order_789",
  "error_code": "INSUFFICIENT_FUNDS"
}
\`\`\`

### Best Practices
- Use structured logging (JSON)
- Include correlation/trace IDs
- Log at appropriate levels
- Don't log sensitive data
- Centralize logs

### Log Aggregation Tools
- **ELK Stack**: Elasticsearch, Logstash, Kibana
- **Loki**: Prometheus for logs
- **Splunk**: Enterprise logging
- **CloudWatch Logs**: AWS

---

## Metrics

### Types of Metrics

**Counter**: Always increases
\`\`\`
http_requests_total{method="GET", status="200"} 1234
\`\`\`

**Gauge**: Can go up or down
\`\`\`
cpu_usage_percent{host="server1"} 75.5
\`\`\`

**Histogram**: Distribution of values
\`\`\`
http_request_duration_seconds_bucket{le="0.1"} 50
http_request_duration_seconds_bucket{le="0.5"} 100
\`\`\`

### Key Metrics to Track

**RED Method (Request-driven)**
- **R**ate: Requests per second
- **E**rrors: Failed requests
- **D**uration: Latency

**USE Method (Resource-driven)**
- **U**tilization: % time busy
- **S**aturation: Work queued
- **E**rrors: Error count

### Common Metrics
\`\`\`
Application:
- Request rate (RPS)
- Error rate (4xx, 5xx)
- Latency (p50, p95, p99)
- Active connections

Infrastructure:
- CPU, Memory, Disk usage
- Network I/O
- Container restarts
\`\`\`

### Tools
- **Prometheus**: Time-series database
- **Grafana**: Visualization
- **DataDog**: Full platform
- **CloudWatch**: AWS metrics

---

## Distributed Tracing

### How It Works
\`\`\`
[Client] → [API Gateway] → [Service A] → [Service B] → [Database]
    └─────────────────────────────────────────────────────────────┘
                        Trace ID: abc-123
\`\`\`

### Components
- **Trace**: Full request journey
- **Span**: Single operation
- **Context**: Propagated metadata

### Example Trace
\`\`\`
Trace: abc-123
├── Span: API Gateway (5ms)
├── Span: Auth Service (10ms)
├── Span: Order Service (50ms)
│   ├── Span: Database query (20ms)
│   └── Span: Cache lookup (2ms)
└── Total: 87ms
\`\`\`

### Tools
- **Jaeger**: Uber's tracing
- **Zipkin**: Twitter's tracing
- **AWS X-Ray**: AWS tracing
- **OpenTelemetry**: Standard

### Best Practices
- Instrument all services
- Sample in production (not 100%)
- Include business context
- Set appropriate retention

---

## Alerting

### Alert Design Principles
- **Actionable**: Someone can do something
- **Relevant**: Indicates real problem
- **Timely**: Not too early/late
- **Prioritized**: Severity levels

### Alert Categories
\`\`\`
Critical (Page immediately):
- Service down
- Error rate > 10%
- Data loss risk

Warning (Review soon):
- High latency
- Disk > 80%
- Unusual patterns

Info (FYI):
- Deployment complete
- Auto-scaling event
\`\`\`

### Avoiding Alert Fatigue
- Set appropriate thresholds
- Use percentiles (p99 > threshold)
- Implement alert grouping
- Regular alert review
- On-call rotation

---

## Dashboards

### Dashboard Design
\`\`\`
┌────────────────────────────────────────────┐
│  Service Health Overview                    │
├─────────────┬─────────────┬────────────────┤
│  Request    │  Error      │  Latency       │
│  Rate       │  Rate       │  (p99)         │
│  [graph]    │  [graph]    │  [graph]       │
├─────────────┴─────────────┴────────────────┤
│  Recent Errors / Incidents                  │
│  [list]                                     │
└────────────────────────────────────────────┘
\`\`\`

### Key Dashboards
- Service overview (golden signals)
- Infrastructure health
- Business metrics
- SLO tracking

---

## Service Level Objectives (SLOs)

### Definitions
- **SLI** (Indicator): Metric (e.g., latency)
- **SLO** (Objective): Target (e.g., p99 < 200ms)
- **SLA** (Agreement): Contract with consequences

### Example SLOs
\`\`\`
Availability: 99.9% uptime
Latency: p99 < 200ms
Error Rate: < 0.1%
\`\`\`

### Error Budgets
\`\`\`
99.9% SLO = 0.1% error budget
Monthly: 43.2 minutes of downtime allowed

If budget exhausted:
- Freeze new features
- Focus on reliability
\`\`\`

---

## Incident Response

### Process
\`\`\`
1. Detection (alert/user report)
2. Triage (severity assessment)
3. Response (page on-call)
4. Investigation (root cause)
5. Mitigation (restore service)
6. Resolution (permanent fix)
7. Postmortem (learn/improve)
\`\`\`

### Incident Severity
| Level | Description | Response |
|-------|-------------|----------|
| P1 | Service down | Immediate |
| P2 | Major degradation | < 30 min |
| P3 | Minor issue | Business hours |

### Postmortems
- Blameless culture
- Document timeline
- Identify root cause
- Action items to prevent recurrence

---

## Tools Summary

| Category | Tools |
|----------|-------|
| Logs | ELK, Loki, Splunk |
| Metrics | Prometheus, DataDog |
| Tracing | Jaeger, Zipkin, X-Ray |
| Visualization | Grafana, Kibana |
| Alerting | PagerDuty, OpsGenie |
| APM | New Relic, Dynatrace |

---

## Best Practices

1. **Implement all three pillars** (logs, metrics, traces)
2. **Use correlation IDs** across all telemetry
3. **Set meaningful SLOs** based on user experience
4. **Create actionable alerts** (not just noise)
5. **Build useful dashboards** for different audiences
6. **Practice incident response** regularly
7. **Conduct blameless postmortems**
8. **Automate where possible** (auto-remediation)
9. **Monitor business metrics** not just technical
10. **Review and iterate** on observability regularly
`;

export default notes;
