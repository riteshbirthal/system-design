const questions = [
  {
    question: "What is observability and what are its three pillars?",
    answer: "Observability is the ability to understand a system's internal state from its external outputs. Three pillars: 1) Logs - discrete events with details (what happened). 2) Metrics - numeric measurements over time (how much/how fast). 3) Traces - request flow across services (where time spent). Together they provide complete visibility into distributed systems.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between monitoring and observability?",
    answer: "Monitoring: Watching predefined metrics, alerting when thresholds crossed. Answers known questions (Is CPU high?). Observability: Ability to ask arbitrary questions about system state. Answers unknown questions (Why is this user's request slow?). Monitoring is subset of observability. Observability enables debugging novel issues without adding new instrumentation.",
    difficulty: "Medium"
  },
  {
    question: "What is structured logging and why is it important?",
    answer: "Structured logging outputs logs in machine-parseable format (JSON) instead of plain text. Example: {timestamp, level, service, trace_id, message, user_id}. Benefits: Easy to search/filter, enables aggregation, consistent format, queryable fields. Essential for log analysis at scale. Use logging libraries that support structured output.",
    difficulty: "Easy"
  },
  {
    question: "What are the different log levels and when should you use each?",
    answer: "DEBUG: Detailed info for debugging (not in production). INFO: Normal operations, business events. WARN: Potential issues, recoverable errors. ERROR: Actual errors requiring attention. FATAL: Critical failures causing shutdown. Best practice: Use INFO as default production level, ERROR for actionable issues, avoid excessive DEBUG in production.",
    difficulty: "Easy"
  },
  {
    question: "What is the difference between Counter, Gauge, and Histogram metrics?",
    answer: "Counter: Cumulative, only increases (requests_total, errors_total). Gauge: Point-in-time value, can go up/down (cpu_usage, active_connections). Histogram: Distribution of values in buckets, calculates percentiles (request_duration). Use counter for events, gauge for current state, histogram for latency/sizes. Prometheus uses these types.",
    difficulty: "Medium"
  },
  {
    question: "What is the RED method for monitoring?",
    answer: "RED method for request-driven services: Rate (requests per second), Errors (failed requests per second), Duration (latency distribution). Golden signals for user-facing services. Example metrics: http_requests_total (rate), http_errors_total (errors), http_request_duration_seconds (duration). Complementary to USE method for resources.",
    difficulty: "Medium"
  },
  {
    question: "What is the USE method for monitoring?",
    answer: "USE method for resources: Utilization (% time busy), Saturation (work queued/waiting), Errors (error events). Apply to CPU, memory, disk, network. Example: CPU utilization 80%, saturation (load average), errors (hardware errors). Helps identify resource bottlenecks. Complementary to RED method for services.",
    difficulty: "Medium"
  },
  {
    question: "What is distributed tracing and why is it needed?",
    answer: "Distributed tracing tracks requests across multiple services. Each request gets unique trace_id propagated through all services. Trace contains spans (individual operations). Needed because: Can't use single stack trace in distributed systems, need to understand latency across services, identify bottlenecks. Tools: Jaeger, Zipkin, X-Ray.",
    difficulty: "Medium"
  },
  {
    question: "What is a trace vs a span?",
    answer: "Trace: Complete journey of a request through system (one trace_id). Span: Single operation within trace (has span_id, parent_span_id). Spans can be nested. Example trace: API Gateway span → Auth Service span → Order Service span (contains DB query span + Cache span). Trace duration = sum of sequential spans, identifies parallel vs sequential operations.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between SLI, SLO, and SLA?",
    answer: "SLI (Service Level Indicator): Metric measuring service (e.g., latency, availability). SLO (Service Level Objective): Target for SLI (e.g., p99 latency < 200ms, 99.9% availability). SLA (Service Level Agreement): Contract with consequences for missing SLO (e.g., credits/refunds). SLI measures, SLO sets target, SLA is business commitment.",
    difficulty: "Medium"
  },
  {
    question: "What is an error budget and how is it used?",
    answer: "Error budget: Allowed unreliability based on SLO. 99.9% SLO = 0.1% error budget = 43 minutes/month downtime. Usage: Track budget consumption. If budget remaining: ship features fast. If budget exhausted: focus on reliability, freeze risky changes. Balances velocity vs reliability. Enables data-driven conversations between dev and ops.",
    difficulty: "Medium"
  },
  {
    question: "What makes a good alert?",
    answer: "Good alert is: Actionable (someone can do something), Relevant (indicates real problem), Timely (not too early/late), Prioritized (clear severity). Anti-patterns: Too sensitive (alert fatigue), too vague (no context), no runbook. Include: What's wrong, impact, likely cause, remediation steps. Page only for user-impacting issues.",
    difficulty: "Medium"
  },
  {
    question: "How do you avoid alert fatigue?",
    answer: "Set appropriate thresholds (use percentiles, not averages). Implement alert grouping/deduplication. Define clear severity levels (page vs email). Regular alert review (delete noisy alerts). On-call rotation and escalation. Auto-remediation for known issues. Focus on symptoms (user impact) not causes. Test alerts work when needed.",
    difficulty: "Medium"
  },
  {
    question: "What is a postmortem and what should it include?",
    answer: "Postmortem: Document analyzing incident to prevent recurrence. Blameless culture essential. Include: Incident summary, timeline (what happened when), impact (duration, users affected), root cause analysis (5 whys), what went well, what went wrong, action items with owners/deadlines. Share learnings. Schedule follow-up on action items.",
    difficulty: "Medium"
  },
  {
    question: "What is Prometheus and how does it work?",
    answer: "Prometheus: Open-source time-series database for metrics. Pull model: Scrapes metrics from endpoints (/metrics). Features: PromQL query language, alerting rules, service discovery. Architecture: Prometheus server scrapes targets, stores time-series, AlertManager handles alerts, Grafana visualizes. Good for: Kubernetes, cloud-native monitoring.",
    difficulty: "Medium"
  },
  {
    question: "What is Grafana used for?",
    answer: "Grafana: Open-source visualization platform. Creates dashboards from multiple data sources (Prometheus, Elasticsearch, CloudWatch). Features: Rich visualizations, alerting, annotations, variables for dynamic dashboards. Use cases: Service health dashboards, infrastructure monitoring, business metrics. Often paired with Prometheus or Loki.",
    difficulty: "Easy"
  },
  {
    question: "What is the ELK stack?",
    answer: "ELK: Elasticsearch (search/analytics engine), Logstash (log processor/pipeline), Kibana (visualization). Elasticsearch stores logs, Logstash parses and transforms, Kibana queries and visualizes. Modern variant: EFK (Filebeat instead of Logstash) or ELK + Beats. Common for centralized logging. Alternatives: Loki + Grafana, Splunk.",
    difficulty: "Medium"
  },
  {
    question: "What is OpenTelemetry?",
    answer: "OpenTelemetry: Vendor-neutral standard for telemetry data (traces, metrics, logs). Provides APIs, SDKs, and collectors. Benefits: Instrument once, send to any backend (Jaeger, DataDog, etc.). Merges OpenTracing and OpenCensus. Future-proofs instrumentation. Widely adopted as industry standard for observability.",
    difficulty: "Medium"
  },
  {
    question: "How do you design a good monitoring dashboard?",
    answer: "Principles: Clear purpose (who/what for), golden signals prominently displayed (rate, errors, latency), drill-down capability, appropriate time ranges, consistent across services. Layout: Overview at top, details below. Avoid: Too many metrics (focus on important), no context, vanity metrics. Create different dashboards for different audiences (ops vs business).",
    difficulty: "Medium"
  },
  {
    question: "What should you log and what should you NOT log?",
    answer: "DO log: Errors with stack traces, authentication attempts, business events, API requests (sanitized), system state changes. DON'T log: Passwords, tokens, credit cards, PII (or encrypt/mask), excessive debug in production, high-frequency events without sampling. Balance: Enough for debugging, not overwhelming or insecure.",
    difficulty: "Medium"
  },
  {
    question: "What is a correlation ID and why is it important?",
    answer: "Correlation ID: Unique identifier for request propagated across all services. Generated at entry point, passed in headers (X-Request-ID). Include in all logs, metrics, traces for that request. Importance: Enables searching all telemetry for single request, connects logs to traces, essential for debugging in distributed systems.",
    difficulty: "Easy"
  },
  {
    question: "What is APM (Application Performance Monitoring)?",
    answer: "APM: Tools monitoring application performance and user experience. Features: Transaction tracing, code-level visibility, error tracking, real-user monitoring (RUM), dependency mapping. Examples: New Relic, Dynatrace, DataDog APM. Goes beyond infrastructure metrics to application behavior. Helps find slow code, N+1 queries, error patterns.",
    difficulty: "Easy"
  },
  {
    question: "How do you implement tracing in microservices?",
    answer: "Steps: 1) Choose tracing library (OpenTelemetry). 2) Instrument entry points (HTTP, gRPC handlers). 3) Propagate context in headers (traceparent). 4) Create spans for significant operations. 5) Send traces to collector (Jaeger). Best practices: Sample in production (1-10%), include relevant attributes, set appropriate span names. Auto-instrumentation where possible.",
    difficulty: "Hard"
  },
  {
    question: "What is sampling in distributed tracing?",
    answer: "Sampling: Collecting subset of traces (not 100%). Needed because: Storage costs, performance overhead, high traffic volume. Types: Head-based (decide at start, simple), Tail-based (decide after trace complete, can sample errors/slow). Rates: 1-10% typical, 100% for errors. Balance: Enough for insights, not overwhelming. Configure per-service or globally.",
    difficulty: "Medium"
  },
  {
    question: "What are golden signals in monitoring?",
    answer: "Golden signals (Google SRE book): Latency (time to serve request), Traffic (demand on system), Errors (failed requests), Saturation (how full is system). Similar to RED+USE combined. For services: Focus on latency, traffic, errors. For resources: Focus on saturation. Baseline for any monitoring setup.",
    difficulty: "Easy"
  },
  {
    question: "How do you set up monitoring for a new service?",
    answer: "Steps: 1) Instrument code (logs, metrics, traces). 2) Export metrics endpoint (/metrics for Prometheus). 3) Configure scraping/collection. 4) Create dashboard (golden signals). 5) Set up alerts (error rate, latency SLO). 6) Document runbooks. 7) Add to on-call rotation. Start simple, iterate based on incidents. Use service template for consistency.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between blackbox and whitebox monitoring?",
    answer: "Blackbox: Monitor externally, like user would (ping, HTTP checks, synthetic transactions). Tests: Is service responding? Whitebox: Monitor internals (logs, metrics from inside system). Tests: How is service performing? Both needed: Blackbox catches what users experience, whitebox provides details for debugging. Example: Blackbox catches outage, whitebox explains why.",
    difficulty: "Medium"
  },
  {
    question: "What are percentiles and why use them over averages?",
    answer: "Percentiles show distribution: p50 (median), p95 (95% of requests faster than this), p99 (99% faster). Why not averages: Averages hide outliers. If 99% requests are 10ms and 1% are 10 seconds, average is 100ms but p99 is 10s. p99 shows worst case most users experience. Use p50 for typical, p99 for tail latency SLOs.",
    difficulty: "Medium"
  },
  {
    question: "What is anomaly detection in monitoring?",
    answer: "Anomaly detection: Automatically identify unusual patterns without predefined thresholds. Uses ML/statistical methods to learn normal behavior, alert on deviations. Benefits: Catches issues without knowing exact thresholds, adapts to changing baselines. Challenges: False positives, complex to tune. Examples: Sudden traffic spike, unusual error patterns. Tools: DataDog, Elastic ML.",
    difficulty: "Hard"
  },
  {
    question: "What is a runbook and why is it important?",
    answer: "Runbook: Documentation with procedures for handling alerts/incidents. Contains: Alert meaning, potential causes, diagnostic steps, remediation actions, escalation path. Importance: Enables faster incident response, reduces knowledge dependency on individuals, consistent handling. Best practice: Link runbook in alert, update after incidents, version control.",
    difficulty: "Easy"
  }
];

export default questions;
