import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HLDCourse.css';

function HLDCourse() {
  const [expandedWeek, setExpandedWeek] = useState(1);

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
        { day: 1, topic: 'SQL Databases', type: 'content', concepts: 'Relational model, Normalization, Joins' },
        { day: 2, topic: 'NoSQL Databases', type: 'content', concepts: 'Document, Key-Value, Column-family, Graph' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on SQL and NoSQL databases' },
        { day: 4, topic: 'Indexing & Query Optimization', type: 'content', concepts: 'B-trees, Hash indexes, EXPLAIN plans' },
        { day: 5, topic: 'ACID & Transactions', type: 'content', concepts: 'Atomicity, Isolation levels, MVCC' },
        { day: 6, topic: 'Database Replication', type: 'content', concepts: 'Master-slave, Multi-master, CRDTs' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Design Social Media DB' },
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
        { day: 1, topic: 'Load Balancing Fundamentals', type: 'content', concepts: 'Layer 4 vs Layer 7, Health checks' },
        { day: 2, topic: 'Load Balancing Algorithms', type: 'content', concepts: 'Round robin, Weighted, Least connections' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on load balancing concepts' },
        { day: 4, topic: 'Message Queue Fundamentals', type: 'content', concepts: 'Pub/Sub, Point-to-point, At-least-once' },
        { day: 5, topic: 'Message Queue Technologies', type: 'content', concepts: 'Kafka, RabbitMQ, SQS, Event streaming' },
        { day: 6, topic: 'Event-Driven Architecture', type: 'content', concepts: 'Event sourcing, CQRS, Saga pattern' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Notification System' },
      ]
    },
    { 
      week: 6, 
      title: 'CAP Theorem & Consistency Patterns', 
      phase: 'Distributed Systems', 
      days: [
        { day: 1, topic: 'CAP Theorem', type: 'content', concepts: 'Consistency, Availability, Partition tolerance' },
        { day: 2, topic: 'Consistency Models', type: 'content', concepts: 'Strong, Eventual, Causal consistency' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on CAP and consistency models' },
        { day: 4, topic: 'Distributed Consensus', type: 'content', concepts: 'Paxos, Raft, Leader election' },
        { day: 5, topic: 'Distributed Transactions', type: 'content', concepts: '2PC, 3PC, Saga pattern' },
        { day: 6, topic: 'Conflict Resolution', type: 'content', concepts: 'Vector clocks, CRDTs, Last-write-wins' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Key-Value Store' },
      ]
    },
    { 
      week: 7, 
      title: 'Data Partitioning & Replication Strategies', 
      phase: 'Distributed Systems', 
      days: [
        { day: 1, topic: 'Data Partitioning Basics', type: 'content', concepts: 'Horizontal vs Vertical partitioning' },
        { day: 2, topic: 'Sharding Strategies', type: 'content', concepts: 'Hash-based, Range-based, Directory-based' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on partitioning and sharding' },
        { day: 4, topic: 'Partition Management', type: 'content', concepts: 'Rebalancing, Hot spots, Cross-shard queries' },
        { day: 5, topic: 'Global Data Distribution', type: 'content', concepts: 'Geo-replication, Data locality, Latency' },
        { day: 6, topic: 'Data Migration Strategies', type: 'content', concepts: 'Zero-downtime migration, Dual-write' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: Global User DB' },
      ]
    },
    { 
      week: 8, 
      title: 'Microservices Architecture & Service Mesh', 
      phase: 'Architecture Patterns', 
      days: [
        { day: 1, topic: 'Microservices Fundamentals', type: 'content', concepts: 'Monolith vs Microservices, Bounded contexts' },
        { day: 2, topic: 'Service Discovery', type: 'content', concepts: 'Client-side, Server-side, Service registry' },
        { day: 3, topic: '☕ Mid-Week Practice', type: 'practice', concepts: 'Practice quiz on microservices basics' },
        { day: 4, topic: 'API Gateway', type: 'content', concepts: 'Routing, Rate limiting, Authentication' },
        { day: 5, topic: 'Service Mesh', type: 'content', concepts: 'Sidecar pattern, Istio, Envoy' },
        { day: 6, topic: 'Microservices Patterns', type: 'content', concepts: 'Circuit breaker, Bulkhead, Retry patterns' },
        { day: 7, topic: '🎯 Weekly Hands-On', type: 'hands-on', concepts: 'Comprehensive quiz + Project: E-commerce System' },
      ]
    },
    { 
      week: 9, 
      title: 'Security & Authentication', 
      phase: 'Architecture Patterns', 
      days: [
        { day: 1, topic: 'Authentication Fundamentals', type: 'content', concepts: 'AuthN vs AuthZ, MFA, passwordless, session management' },
        { day: 2, topic: 'OAuth 2.0 & OpenID Connect', type: 'content', concepts: 'Grant types, PKCE, tokens, scopes' },
        { day: 3, topic: 'JSON Web Tokens (JWT)', type: 'content', concepts: 'JWT structure, signing, validation, best practices' },
        { day: 4, topic: 'API Security', type: 'content', concepts: 'Rate limiting, input validation, CORS, security headers' },
        { day: 5, topic: 'Zero Trust Architecture', type: 'content', concepts: 'Defense in depth, mTLS, secrets management' },
      ]
    },
    { 
      week: 10, 
      title: 'Monitoring, Logging & Observability', 
      phase: 'Operations', 
      days: [
        { day: 1, topic: 'Three Pillars of Observability', type: 'content', concepts: 'Metrics, Logs, Traces - understanding system behavior' },
        { day: 2, topic: 'Metrics Deep Dive', type: 'content', concepts: 'Counter, Gauge, Histogram, Prometheus, Grafana' },
        { day: 3, topic: 'Logging Best Practices', type: 'content', concepts: 'Structured logging, log levels, correlation IDs' },
        { day: 4, topic: 'Distributed Tracing', type: 'content', concepts: 'Spans, traces, Jaeger, OpenTelemetry' },
        { day: 5, topic: 'Alerting & SRE Practices', type: 'content', concepts: 'Golden signals, SLOs, error budgets, on-call' },
      ]
    },
    { 
      week: 11, 
      title: 'Load Balancing Deep Dive', 
      phase: 'Advanced Infrastructure', 
      days: [
        { day: 1, topic: 'Load Balancing Fundamentals', type: 'content', concepts: 'Types, algorithms, VIP, upstream servers' },
        { day: 2, topic: 'Layer 4 vs Layer 7', type: 'content', concepts: 'Transport vs Application, protocol awareness' },
        { day: 3, topic: 'Health Checks & Session Persistence', type: 'content', concepts: 'Active/passive checks, sticky sessions' },
        { day: 4, topic: 'SSL/TLS Termination & GSLB', type: 'content', concepts: 'SSL offloading, geo-routing, CDN integration' },
        { day: 5, topic: 'Load Balancer Implementations', type: 'content', concepts: 'NGINX, HAProxy, AWS ELB, Envoy' },
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
        { day: 1, topic: 'CDN Fundamentals', type: 'content', concepts: 'Edge servers, PoPs, cache hierarchy' },
        { day: 2, topic: 'CDN Caching Strategies', type: 'content', concepts: 'Cache-Control, TTL, invalidation, versioning' },
        { day: 3, topic: 'Distributed Cache Architecture', type: 'content', concepts: 'Cache-aside, read/write-through, consistent hashing' },
        { day: 4, topic: 'Redis vs Memcached', type: 'content', concepts: 'Data structures, persistence, clustering, use cases' },
        { day: 5, topic: 'Cache Patterns & Best Practices', type: 'content', concepts: 'Stampede prevention, warming, monitoring' },
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
            <span className="stat-value">72</span>
            <span className="stat-label">Days</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">150+</span>
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
