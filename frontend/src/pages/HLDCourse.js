import React from 'react';
import { Link } from 'react-router-dom';
import { useHLDCourseState } from '../hooks/usePersistedState';
import './HLDCourse.css';

function HLDCourse() {
  const { expandedWeek, setExpandedWeek } = useHLDCourseState();

  const weeks = [
    { 
      week: 1, 
      title: 'Introduction to System Design & Requirements Engineering', 
      phase: 'Fundamentals',
      days: [
        { day: 1, topic: 'What is System Design?', type: 'content', concepts: 'HLD vs LLD, System components, Architecture overview' },
        { day: 2, topic: 'Functional & Non-Functional Requirements', type: 'content', concepts: 'Requirements gathering, MoSCoW, User stories' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on Days 1-2 concepts' },
        { day: 4, topic: 'Scalability Fundamentals', type: 'content', concepts: 'Vertical vs Horizontal scaling, Stateless design' },
        { day: 5, topic: 'Back-of-Envelope Estimation', type: 'content', concepts: 'Traffic estimation, Storage calculation, Bandwidth' },
        { day: 6, topic: 'System Design Framework', type: 'content', concepts: 'RESHADED framework, Interview approach' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Design a Pastebin' },
      ]
    },
    { 
      week: 2, 
      title: 'Networking Fundamentals & Communication Protocols', 
      phase: 'Fundamentals', 
      days: [
        { day: 1, topic: 'DNS & Domain Resolution', type: 'content', concepts: 'DNS hierarchy, Record types, GeoDNS, TTL' },
        { day: 2, topic: 'HTTP/HTTPS Protocols', type: 'content', concepts: 'HTTP methods, Status codes, TLS, HTTP/2' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on DNS and HTTP protocols' },
        { day: 4, topic: 'TCP vs UDP', type: 'content', concepts: 'Transport layer, 3-way handshake, QUIC protocol' },
        { day: 5, topic: 'REST API Design', type: 'content', concepts: 'REST principles, Versioning, Pagination' },
        { day: 6, topic: 'GraphQL, gRPC & WebSockets', type: 'content', concepts: 'Query language, Protocol buffers, Real-time' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Design a Chat System' },
      ]
    },
    { 
      week: 3, 
      title: 'Database Systems & Data Management', 
      phase: 'Core Components', 
      days: [
        { day: 1, topic: 'SQL vs NoSQL Databases', type: 'content', concepts: 'Relational vs Non-relational, ACID, Use cases' },
        { day: 2, topic: 'Database Indexing', type: 'content', concepts: 'B-Tree, Hash Index, Composite indexes, Query optimization' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Review SQL, NoSQL, Indexing concepts' },
        { day: 4, topic: 'Database Replication', type: 'content', concepts: 'Master-Slave, Master-Master, Sync vs Async' },
        { day: 5, topic: 'Database Sharding', type: 'content', concepts: 'Horizontal partitioning, Shard keys, Consistent hashing' },
        { day: 6, topic: 'CAP Theorem', type: 'content', concepts: 'Consistency, Availability, Partition Tolerance' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Final quiz + Project: Design a Database for Twitter' },
      ]
    },
    { 
      week: 4, 
      title: 'Caching Strategies & Performance Optimization', 
      phase: 'Core Components', 
      days: [
        { day: 1, topic: 'Caching Fundamentals', type: 'content', concepts: 'Cache types, Cache-aside, Read/Write-through' },
        { day: 2, topic: 'Cache Eviction Policies', type: 'content', concepts: 'LRU, LFU, FIFO, TTL strategies' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on caching basics and eviction' },
        { day: 4, topic: 'Distributed Caching', type: 'content', concepts: 'Redis, Memcached, Consistent hashing' },
        { day: 5, topic: 'CDN & Edge Caching', type: 'content', concepts: 'Content delivery, Edge locations, Cache headers' },
        { day: 6, topic: 'Performance Optimization', type: 'content', concepts: 'Profiling, Bottlenecks, N+1 queries' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Design a CDN' },
      ]
    },
    { 
      week: 5, 
      title: 'Load Balancing & Message Queues', 
      phase: 'Core Components', 
      days: [
        { day: 1, topic: 'Load Balancing Fundamentals', type: 'content', concepts: 'L4 vs L7, Algorithms, Health checks' },
        { day: 2, topic: 'Message Queues', type: 'content', concepts: 'Async processing, Pub/Sub, Kafka, RabbitMQ' },
        { day: 3, topic: 'Message Queue Basics', type: 'content', concepts: 'Pub/Sub, Queues, Producers, Consumers, Delivery Guarantees' },
        { day: 4, topic: 'Apache Kafka Deep Dive', type: 'content', concepts: 'Topics, Partitions, Consumer Groups, Offsets' },
        { day: 5, topic: 'Queue Patterns & Best Practices', type: 'content', concepts: 'DLQ, Retry, Idempotency, Circuit Breaker' },
      ]
    },
    { 
      week: 6, 
      title: 'CAP Theorem & Consistency Patterns', 
      phase: 'Distributed Systems', 
      days: [
        { day: 1, topic: 'CAP Theorem', type: 'content', concepts: 'Consistency, Availability, Partition Tolerance' },
        { day: 2, topic: 'Consistency Models', type: 'content', concepts: 'Strong, Eventual, Causal, Linearizability' },
        { day: 3, topic: 'ACID vs BASE', type: 'content', concepts: 'Transactions, Atomicity, Isolation, Eventual Consistency' },
        { day: 4, topic: 'Consensus Algorithms', type: 'content', concepts: 'Paxos, Raft, Leader Election, Quorum' },
        { day: 5, topic: 'Designing for Consistency', type: 'content', concepts: 'Conflict Resolution, CRDTs, Saga Pattern, 2PC' },
      ]
    },
    { 
      week: 7, 
      title: 'Data Partitioning & Replication Strategies', 
      phase: 'Distributed Systems', 
      days: [
        { day: 1, topic: 'Data Partitioning Basics', type: 'content', concepts: 'Horizontal vs Vertical, Sharding, Partition Keys' },
        { day: 2, topic: 'Sharding Techniques', type: 'content', concepts: 'Range, Hash, Directory-based, Geo Sharding' },
        { day: 3, topic: 'Consistent Hashing', type: 'content', concepts: 'Hash Ring, Virtual Nodes, Rebalancing' },
        { day: 4, topic: 'Replication Strategies', type: 'content', concepts: 'Master-Slave, Multi-Master, Sync vs Async' },
        { day: 5, topic: 'Handling Distributed Data', type: 'content', concepts: 'Cross-Shard Queries, Distributed Transactions, Global Indexes' },
      ]
    },
    { 
      week: 8, 
      title: 'Microservices Architecture & Service Mesh', 
      phase: 'Architecture Patterns', 
      days: [
        { day: 1, topic: 'Microservices vs Monoliths', type: 'content', concepts: 'Architectural differences, trade-offs, when to choose' },
        { day: 2, topic: 'Service Discovery & Communication', type: 'content', concepts: 'Service registry, client-side vs server-side discovery' },
        { day: 3, topic: 'API Gateway Pattern', type: 'content', concepts: 'Routing, authentication, rate limiting, aggregation' },
        { day: 4, topic: 'Service Mesh & Sidecars', type: 'content', concepts: 'Istio, Envoy, mTLS, traffic management' },
        { day: 5, topic: 'Resilience Patterns', type: 'content', concepts: 'Circuit breaker, bulkhead, retry, saga pattern' },
      ]
    },
    { 
      week: 9, 
      title: 'Security & Authentication', 
      phase: 'Architecture Patterns', 
      days: [
        { day: 1, topic: 'Authentication Fundamentals', type: 'content', concepts: 'AuthN vs AuthZ, MFA, passwordless, session management' },
        { day: 2, topic: 'OAuth 2.0 & JWT', type: 'content', concepts: 'OAuth flows, OpenID Connect, JWT structure, token management' },
        { day: 3, topic: 'Authorization & Access Control', type: 'content', concepts: 'RBAC, ABAC, policies, least privilege' },
        { day: 4, topic: 'API Security & OWASP', type: 'content', concepts: 'API vulnerabilities, OWASP Top 10, security headers, rate limiting' },
        { day: 5, topic: 'Zero Trust & Secrets Management', type: 'content', concepts: 'Zero trust principles, Vault, secrets rotation, mTLS' },
      ]
    },
    { 
      week: 10, 
      title: 'Monitoring, Logging & Observability', 
      phase: 'Operations', 
      days: [
        { day: 1, topic: 'Three Pillars of Observability', type: 'content', concepts: 'Metrics, Logs, Traces - understanding system behavior' },
        { day: 2, topic: 'Metrics & Monitoring Methods', type: 'content', concepts: 'Golden Signals, RED, USE methods, Prometheus, Grafana' },
        { day: 3, topic: 'Logging & Distributed Tracing', type: 'content', concepts: 'Structured logging, ELK stack, Jaeger, trace context propagation' },
        { day: 4, topic: 'Alerting & SLOs', type: 'content', concepts: 'SLIs, SLOs, SLAs, error budgets, alert fatigue' },
        { day: 5, topic: 'OpenTelemetry & Observability Tools', type: 'content', concepts: 'OTel, Prometheus, Grafana, unified observability' },
      ]
    },
    { 
      week: 11, 
      title: 'Load Balancing Deep Dive', 
      phase: 'Advanced Infrastructure', 
      days: [
        { day: 1, topic: 'Load Balancing Fundamentals', type: 'content', concepts: 'Types, algorithms, VIP, upstream servers' },
        { day: 2, topic: 'Layer 4 vs Layer 7 Load Balancing', type: 'content', concepts: 'Transport vs Application layer, protocol awareness' },
        { day: 3, topic: 'Health Checks & Session Persistence', type: 'content', concepts: 'Active/passive checks, sticky sessions, connection draining' },
        { day: 4, topic: 'SSL/TLS Termination & GSLB', type: 'content', concepts: 'SSL offloading, geo-routing, global load balancing' },
        { day: 5, topic: 'Load Balancer Implementations', type: 'content', concepts: 'NGINX, HAProxy, AWS ELB, Envoy, Traefik' },
      ]
    },
    { 
      week: 12, 
      title: 'Message Queues & Event-Driven Architecture', 
      phase: 'Advanced Infrastructure', 
      days: [
        { day: 1, topic: 'Message Queue Fundamentals', type: 'content', concepts: 'Pub/Sub, Point-to-point, delivery guarantees' },
        { day: 2, topic: 'Apache Kafka Deep Dive', type: 'content', concepts: 'Topics, partitions, consumers, exactly-once' },
        { day: 3, topic: 'RabbitMQ & Exchanges', type: 'content', concepts: 'AMQP, exchanges, bindings, routing' },
        { day: 4, topic: 'Event-Driven Patterns', type: 'content', concepts: 'Event sourcing, CQRS, Saga pattern, outbox' },
        { day: 5, topic: 'Choosing Message Queues', type: 'content', concepts: 'Kafka vs RabbitMQ vs SQS, selection guide' },
      ]
    },
    { 
      week: 13, 
      title: 'API Gateways & Proxies', 
      phase: 'Advanced Infrastructure', 
      days: [
        { day: 1, topic: 'API Gateway Fundamentals', type: 'content', concepts: 'Single entry point, routing, cross-cutting concerns' },
        { day: 2, topic: 'Gateway Features', type: 'content', concepts: 'Rate limiting, auth, transformation, circuit breaker' },
        { day: 3, topic: 'Gateway Patterns', type: 'content', concepts: 'BFF, aggregation, offloading, routing patterns' },
        { day: 4, topic: 'Gateway Security', type: 'content', concepts: 'OAuth at gateway, JWT validation, CORS, WAF' },
        { day: 5, topic: 'Gateway Implementations', type: 'content', concepts: 'Kong, AWS API Gateway, NGINX, Envoy' },
      ]
    },
    { 
      week: 14, 
      title: 'CDNs & Distributed Caching', 
      phase: 'Advanced Infrastructure', 
      days: [
        { day: 1, topic: 'CDN Fundamentals', type: 'content', concepts: 'Edge servers, PoPs, content distribution' },
        { day: 2, topic: 'CDN Caching Strategies', type: 'content', concepts: 'TTL, cache keys, invalidation, push vs pull' },
        { day: 3, topic: 'Distributed Cache Architecture', type: 'content', concepts: 'Redis, Memcached, cache topologies' },
        { day: 4, topic: 'Redis vs Memcached', type: 'content', concepts: 'Feature comparison, data types, persistence, clustering' },
        { day: 5, topic: 'Cache Patterns & Best Practices', type: 'content', concepts: 'Thundering herd, cache stampede, cache warming' },
      ]
    },
  ];

  const toggleWeek = (weekNum) => {
    setExpandedWeek(expandedWeek === weekNum ? null : weekNum);
  };

  const getPhaseColor = (phase) => {
    const colors = {
      'Fundamentals': '#2563eb',
      'Core Components': '#7c3aed',
      'Distributed Systems': '#dc2626',
      'Architecture Patterns': '#0891b2',
      'Operations': '#059669',
      'Advanced Infrastructure': '#d97706'
    };
    return colors[phase] || '#64748b';
  };

  return (
    <div className="hld-course">
      <div className="hld-header">
        <div className="hld-header-content">
          <span className="hld-icon">🏗️</span>
          <div>
            <h1>High-Level Design (HLD)</h1>
            <p>Learn to design scalable system architectures from fundamentals to advanced patterns</p>
          </div>
        </div>
        <div className="hld-stats">
          <div className="stat-item">
            <span className="stat-value">14</span>
            <span className="stat-label">Weeks</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">78</span>
            <span className="stat-label">Days</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">100+</span>
            <span className="stat-label">Hours</span>
          </div>
        </div>
      </div>

      <div className="hld-content">
        <div className="weeks-list">
          {weeks.map((week) => (
            <div key={week.week} className={`week-card ${expandedWeek === week.week ? 'expanded' : ''}`}>
              <div 
                className="week-header"
                onClick={() => toggleWeek(week.week)}
                style={{ borderLeftColor: getPhaseColor(week.phase) }}
              >
                <div className="week-info">
                  <span className="week-badge">Week {week.week}</span>
                  <h3>{week.title}</h3>
                  <span className="phase-tag" style={{ background: getPhaseColor(week.phase) }}>
                    {week.phase}
                  </span>
                </div>
                <span className={`expand-arrow ${expandedWeek === week.week ? 'rotated' : ''}`}>▼</span>
              </div>

              {expandedWeek === week.week && (
                <div className="week-content">
                  <div className="days-list">
                    {week.days.map((day) => {
                      const isPractice = day.type === 'practice';
                      const isHandsOn = day.type === 'hands-on';
                      
                      return (
                        <Link 
                          key={day.day} 
                          to={`/hld/week/${week.week}/day/${day.day}`}
                          className={`day-card-link ${day.type}`}
                        >
                          <div className="day-card-compact">
                            <span className={`day-badge ${day.type}`}>Day {day.day}</span>
                            <div className="day-info-compact">
                              <h4>{day.topic}</h4>
                              <p>{day.concepts}</p>
                            </div>
                            {isPractice && <span className="day-type-indicator practice">☕</span>}
                            {isHandsOn && <span className="day-type-indicator hands-on">🎯</span>}
                            <span className="day-arrow-link">&gt;&gt;</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HLDCourse;
