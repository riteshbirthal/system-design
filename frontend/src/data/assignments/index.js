// Assignments Index - Centralized export for all assignment data
// Maps weeks and days to their respective assignments

export const weekAssignments = {
  // Week 11: Load Balancing
  11: {
    1: {
      title: "Load Balancer Design Exercise",
      description: "Design a comprehensive load balancing architecture",
      requirements: [
        "Design load balancing architecture for a 3-tier web application",
        "Identify which type of load balancer (hardware/software/cloud) fits best",
        "Define health check strategy for your backend servers",
        "Document failover behavior when a server goes down"
      ],
      hints: [
        "Consider both internal (between tiers) and external (client-facing) load balancers",
        "Think about SSL termination location",
        "Plan for both planned maintenance and unexpected failures"
      ],
      deliverables: ["Architecture diagram", "Health check configuration", "Failover documentation"]
    },
    2: {
      title: "L4 vs L7 Analysis",
      description: "Compare Layer 4 and Layer 7 load balancing for different scenarios",
      requirements: [
        "List 3 use cases where L4 is preferred over L7",
        "List 3 use cases where L7 is preferred over L4",
        "Design a system using both L4 and L7 load balancers",
        "Calculate latency impact of L7 inspection"
      ],
      hints: [
        "Consider gaming, financial, and web application scenarios",
        "Think about content-based routing needs",
        "Consider SSL termination requirements"
      ],
      deliverables: ["Comparison document", "Hybrid architecture diagram"]
    },
    3: {
      title: "Health Check Implementation",
      description: "Design comprehensive health checking strategy",
      requirements: [
        "Define active health check endpoints for a microservices app",
        "Implement passive health checking logic",
        "Configure session persistence with health check integration",
        "Design graceful degradation when health checks fail"
      ],
      hints: [
        "Include deep health checks that test dependencies",
        "Consider the impact on downstream services",
        "Plan for partial failures"
      ],
      deliverables: ["Health check endpoint specifications", "Monitoring configuration"]
    },
    4: {
      title: "SSL and GSLB Setup",
      description: "Design SSL termination and global load balancing",
      requirements: [
        "Design SSL termination strategy (termination vs passthrough)",
        "Plan certificate management for multiple domains",
        "Design GSLB for multi-region deployment",
        "Configure GeoDNS routing policies"
      ],
      hints: [
        "Consider compliance requirements for end-to-end encryption",
        "Plan for certificate rotation",
        "Think about failover between regions"
      ],
      deliverables: ["SSL architecture", "GSLB configuration", "DNS routing rules"]
    },
    5: {
      title: "Load Balancer Selection",
      description: "Evaluate and select load balancer for production",
      requirements: [
        "Compare 3 load balancers (NGINX, HAProxy, cloud LB) for your use case",
        "Create cost analysis for each option",
        "Design implementation plan with rollback strategy",
        "Define monitoring and alerting requirements"
      ],
      hints: [
        "Consider operational overhead of self-managed vs managed",
        "Factor in team expertise",
        "Plan for future scaling needs"
      ],
      deliverables: ["Comparison matrix", "Cost analysis", "Implementation plan"]
    }
  },
  
  // Week 12: Message Queues
  12: {
    1: {
      title: "Message Queue Architecture",
      description: "Design message queue architecture for async processing",
      requirements: [
        "Identify 3 components in your system that benefit from async processing",
        "Design queue topology (queues vs topics)",
        "Define message schema and routing keys",
        "Plan for message persistence and durability"
      ],
      hints: [
        "Consider order processing, notifications, and analytics",
        "Think about message ordering requirements",
        "Plan for consumer scaling"
      ],
      deliverables: ["Queue topology diagram", "Message schemas", "Consumer design"]
    },
    2: {
      title: "Kafka Implementation",
      description: "Design Kafka-based event streaming platform",
      requirements: [
        "Design topic structure with partitioning strategy",
        "Define replication factor and ISR settings",
        "Plan consumer group allocation",
        "Design offset management strategy"
      ],
      hints: [
        "Consider message key design for partition distribution",
        "Plan for partition rebalancing",
        "Think about retention policies"
      ],
      deliverables: ["Kafka topology", "Topic configuration", "Consumer allocation"]
    },
    3: {
      title: "RabbitMQ Routing",
      description: "Implement complex routing with RabbitMQ",
      requirements: [
        "Design exchange topology (direct, fanout, topic)",
        "Implement routing key patterns for multi-tenant system",
        "Configure dead letter queues",
        "Set up message TTL and queue limits"
      ],
      hints: [
        "Use topic exchanges for flexible routing",
        "Plan for message replay from DLQ",
        "Consider priority queues"
      ],
      deliverables: ["Exchange topology", "Routing rules", "DLQ handling procedures"]
    },
    4: {
      title: "Event-Driven Patterns",
      description: "Implement event sourcing and CQRS",
      requirements: [
        "Design event store schema for order processing",
        "Implement CQRS with separate read/write models",
        "Design saga for distributed transaction",
        "Implement outbox pattern for reliable publishing"
      ],
      hints: [
        "Consider event versioning for schema evolution",
        "Plan for event replay and projection rebuilding",
        "Design compensation logic for saga rollback"
      ],
      deliverables: ["Event store design", "CQRS implementation", "Saga workflow"]
    },
    5: {
      title: "Queue Technology Selection",
      description: "Select and justify message queue technology",
      requirements: [
        "Compare Kafka, RabbitMQ, and SQS for your use case",
        "Analyze delivery guarantees needed",
        "Calculate throughput requirements",
        "Design migration plan if changing technologies"
      ],
      hints: [
        "Consider operational complexity",
        "Factor in cloud vs self-managed costs",
        "Think about team expertise"
      ],
      deliverables: ["Technology comparison", "Requirements analysis", "Migration plan"]
    }
  },
  
  // Week 13: API Gateways
  13: {
    1: {
      title: "API Gateway Design",
      description: "Design API Gateway for microservices",
      requirements: [
        "Design routing rules for 5+ microservices",
        "Plan authentication strategy (API key vs JWT)",
        "Design request transformation rules",
        "Configure logging and monitoring"
      ],
      hints: [
        "Consider versioning strategy",
        "Plan for service discovery integration",
        "Think about error handling"
      ],
      deliverables: ["Gateway configuration", "Routing rules", "Auth strategy"]
    },
    2: {
      title: "Gateway Features Configuration",
      description: "Configure advanced gateway features",
      requirements: [
        "Implement rate limiting (100 req/min free, 1000 premium)",
        "Configure circuit breaker with appropriate thresholds",
        "Design request/response transformation",
        "Set up caching policies"
      ],
      hints: [
        "Use token bucket for rate limiting",
        "Consider half-open state duration for circuit breaker",
        "Plan cache invalidation strategy"
      ],
      deliverables: ["Rate limit configuration", "Circuit breaker settings", "Cache policies"]
    },
    3: {
      title: "BFF Architecture",
      description: "Implement Backends for Frontends pattern",
      requirements: [
        "Design separate BFFs for mobile, web, and partner APIs",
        "Implement aggregation endpoint combining 3+ services",
        "Configure canary routing (5% → 25% → 100%)",
        "Document offloading strategy"
      ],
      hints: [
        "Optimize mobile BFF for bandwidth",
        "Consider parallel vs sequential aggregation",
        "Plan rollback procedures for canary"
      ],
      deliverables: ["BFF architecture", "Aggregation design", "Canary deployment plan"]
    },
    4: {
      title: "Gateway Security",
      description: "Implement comprehensive gateway security",
      requirements: [
        "Configure JWT validation with RS256 and JWKS",
        "Set up CORS for web application",
        "Add security headers (HSTS, CSP, X-Frame-Options)",
        "Design mTLS for service-to-service"
      ],
      hints: [
        "Cache JWKS for performance",
        "Whitelist specific origins for CORS",
        "Consider certificate rotation for mTLS"
      ],
      deliverables: ["JWT configuration", "CORS policy", "Security headers", "mTLS design"]
    },
    5: {
      title: "Gateway Implementation Selection",
      description: "Select and plan gateway implementation",
      requirements: [
        "Compare Kong vs AWS API Gateway for your needs",
        "Evaluate managed vs self-hosted cost",
        "Design high availability configuration",
        "Create migration plan from existing setup"
      ],
      hints: [
        "Consider plugin/extension needs",
        "Factor in team expertise",
        "Plan for multi-region deployment"
      ],
      deliverables: ["Comparison analysis", "Cost evaluation", "Migration plan"]
    }
  },
  
  // Week 14: CDN & Caching
  14: {
    1: {
      title: "CDN Analysis",
      description: "Analyze and plan CDN integration",
      requirements: [
        "Audit website assets and identify CDN candidates",
        "Calculate expected latency improvement",
        "Compare CloudFlare, Fastly, and CloudFront",
        "Design CDN integration architecture"
      ],
      hints: [
        "Prioritize largest/most requested assets",
        "Consider geographic user distribution",
        "Plan for origin protection"
      ],
      deliverables: ["Asset audit", "Latency analysis", "CDN comparison", "Architecture"]
    },
    2: {
      title: "Caching Strategy",
      description: "Design comprehensive caching strategy",
      requirements: [
        "Configure Cache-Control headers (HTML: 5min, CSS/JS: 1yr, images: 1mo)",
        "Implement cache busting with file hashes",
        "Design invalidation strategy for product catalog",
        "Set up cache tags for grouped purging"
      ],
      hints: [
        "Use content hashing in build process",
        "Plan for emergency purge procedures",
        "Consider stale-while-revalidate"
      ],
      deliverables: ["Cache header configuration", "Build process changes", "Purge procedures"]
    },
    3: {
      title: "Distributed Cache Architecture",
      description: "Design distributed cache for high-scale system",
      requirements: [
        "Design cache for 1M concurrent user sessions",
        "Implement cache-aside pattern with fallback",
        "Configure consistent hashing with virtual nodes",
        "Plan eviction strategy"
      ],
      hints: [
        "Calculate memory requirements",
        "Plan for cache warm-up",
        "Consider replication for availability"
      ],
      deliverables: ["Cache architecture", "Sizing calculations", "Implementation code"]
    },
    4: {
      title: "Redis Implementation",
      description: "Implement Redis for caching and more",
      requirements: [
        "Compare Redis vs Memcached for your use case",
        "Implement leaderboard using sorted sets",
        "Design session storage with Redis Hash",
        "Configure persistence (RDB + AOF)"
      ],
      hints: [
        "Use appropriate data structure for each use case",
        "Plan for Redis cluster vs sentinel",
        "Consider memory policies"
      ],
      deliverables: ["Technology selection", "Data model design", "Persistence configuration"]
    },
    5: {
      title: "Cache Best Practices",
      description: "Implement production-ready caching",
      requirements: [
        "Implement lock-based cache rebuild for thundering herd",
        "Create cache warming script",
        "Add TTL jitter to prevent avalanche",
        "Set up cache monitoring dashboard"
      ],
      hints: [
        "Use probabilistic early expiration",
        "Monitor hit ratio and evictions",
        "Plan for cache failures"
      ],
      deliverables: ["Cache rebuild logic", "Warming script", "Monitoring dashboard"]
    }
  }
};

// Get assignment for specific week and day
export const getAssignment = (week, day) => {
  const weekData = weekAssignments[week];
  if (!weekData) return null;
  return weekData[day] || null;
};

// Get all assignments for a week
export const getWeekAssignments = (week) => {
  return weekAssignments[week] || {};
};

export default weekAssignments;
