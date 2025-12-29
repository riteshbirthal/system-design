# Day 1: DNS & Domain Resolution

## Learning Objectives
- Understand what DNS is and why it's essential for the internet
- Learn the DNS hierarchy and its components
- Understand the DNS resolution process step by step
- Learn about different DNS record types
- Understand DNS caching and TTL
- Learn about GeoDNS and its use in system design

---

## 1. Introduction to DNS

### What is DNS?
The Domain Name System (DNS) is often called the "phonebook of the internet." It translates human-readable domain names (like `www.google.com`) into machine-readable IP addresses (like `142.250.190.78`) that computers use to identify each other on the network.

### Why DNS Matters
Without DNS, you would need to memorize IP addresses for every website you want to visit. DNS provides:

1. **Human-Friendly Naming**: Easy-to-remember domain names
2. **Flexibility**: IP addresses can change without affecting users
3. **Load Distribution**: Multiple IPs can be associated with one domain
4. **Geographic Routing**: Direct users to nearest servers
5. **Redundancy**: Multiple DNS servers ensure availability

---

## 2. DNS Hierarchy

DNS follows a hierarchical tree structure, organized from the most general to the most specific.

```
                    . (Root)
                    │
        ┌───────────┼───────────┐
        │           │           │
       .com        .org        .net       (TLD - Top Level Domain)
        │           │           │
    ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
  google  amazon  wikipedia  example    (Second Level Domain)
    │
  ┌─┴──┐
www   mail                              (Subdomain)
```

### Hierarchy Components

| Level | Name | Example | Management |
|-------|------|---------|------------|
| Root | Root Domain | `.` (dot) | ICANN/IANA |
| TLD | Top-Level Domain | `.com`, `.org`, `.uk` | Registry Operators |
| SLD | Second-Level Domain | `google`, `amazon` | Domain Registrars |
| Subdomain | Third-Level+ | `www`, `mail`, `api` | Domain Owner |

---

## 3. DNS Components

### Root DNS Servers
- 13 logical root server clusters (A through M)
- Distributed globally using Anycast
- Know the authoritative name servers for all TLDs
- Critical infrastructure of the internet

### TLD Name Servers
- Responsible for specific top-level domains
- Generic TLDs: `.com`, `.net`, `.org`
- Country-code TLDs: `.uk`, `.de`, `.jp`
- New TLDs: `.app`, `.dev`, `.cloud`

### Authoritative Name Servers
- Hold the actual DNS records for a domain
- Provide definitive answers for domain queries
- Managed by domain owners or DNS hosting providers

### Recursive Resolvers (DNS Resolvers)
- Typically provided by ISPs or services like Google (8.8.8.8)
- Act as intermediaries between clients and DNS hierarchy
- Cache responses to improve performance
- Handle the full resolution process

---

## 4. DNS Record Types

| Record Type | Purpose | Example |
|-------------|---------|---------|
| **A** | Maps domain to IPv4 address | `example.com → 93.184.216.34` |
| **AAAA** | Maps domain to IPv6 address | `example.com → 2606:2800:220:1:248:...` |
| **CNAME** | Alias pointing to another domain | `www.example.com → example.com` |
| **MX** | Mail server for the domain | `example.com → mail.example.com` |
| **TXT** | Text information (SPF, DKIM, verification) | `example.com → "v=spf1 include:..."` |
| **NS** | Authoritative name servers | `example.com → ns1.example.com` |
| **SOA** | Start of Authority - zone information | Contains zone admin details |
| **PTR** | Reverse DNS lookup (IP to domain) | `34.216.184.93 → example.com` |
| **SRV** | Service location records | Used for service discovery |

### A Record Example
```
example.com.    IN    A    93.184.216.34
```

### CNAME Record Example
```
www.example.com.    IN    CNAME    example.com.
```

---

## 5. DNS Resolution Process

When you type `www.google.com` in your browser, here's what happens:

```
┌──────────┐     ┌──────────────┐     ┌─────────────┐
│  Client  │────▶│  Recursive   │────▶│ Root Server │
│ (Browser)│     │   Resolver   │     │      .      │
└──────────┘     └──────────────┘     └─────────────┘
                        │                    │
                        │         "Ask .com TLD"
                        ▼                    
                 ┌─────────────┐     ┌─────────────┐
                 │   .com TLD  │────▶│   google    │
                 │   Server    │     │ Auth Server │
                 └─────────────┘     └─────────────┘
                                            │
                                    "IP: 142.250.x.x"
```

### Step-by-Step Resolution

1. **Browser Cache Check**: Browser checks its local DNS cache
2. **OS Cache Check**: Operating system DNS cache is checked
3. **Resolver Query**: Request sent to recursive resolver (ISP or configured DNS)
4. **Root Server Query**: Resolver asks root server for TLD location
5. **TLD Server Query**: Resolver asks TLD server for authoritative NS
6. **Authoritative Query**: Resolver gets IP from authoritative server
7. **Response Caching**: Resolver caches the response
8. **Return to Client**: IP address returned to browser

### Practical Example with `dig`
```bash
# Full DNS trace
dig +trace www.google.com

# Query specific record type
dig google.com A
dig google.com MX
dig google.com TXT

# Query specific DNS server
dig @8.8.8.8 google.com
```

---

## 6. DNS Caching and TTL

### What is TTL?
Time To Live (TTL) specifies how long a DNS record should be cached before being refreshed.

```
example.com.    300    IN    A    93.184.216.34
                 │
                 └── TTL: 300 seconds (5 minutes)
```

### TTL Strategy Guidelines

| Use Case | Recommended TTL | Reason |
|----------|-----------------|--------|
| Static content | 86400 (24 hours) | Rarely changes |
| Dynamic services | 300-3600 (5min-1hr) | Balance freshness/performance |
| During migration | 60-300 (1-5 min) | Quick propagation needed |
| Failover scenarios | 30-60 (30-60 sec) | Fast recovery required |

### Caching Layers
1. **Browser Cache**: Shortest TTL, typically minutes
2. **OS Cache**: Hours to days
3. **Resolver Cache**: Based on TTL from authoritative server
4. **CDN/Edge Cache**: Often have their own DNS caching

---

## 7. GeoDNS for Global Distribution

GeoDNS returns different IP addresses based on the geographic location of the requesting user.

```
┌─────────────────────────────────────────────────────────┐
│                    GeoDNS Server                         │
├─────────────────────────────────────────────────────────┤
│  User Location     │    Response IP                      │
├────────────────────┼────────────────────────────────────┤
│  North America     │    → US Data Center (192.0.2.1)    │
│  Europe            │    → EU Data Center (198.51.100.1) │
│  Asia              │    → Asia Data Center (203.0.113.1)│
└────────────────────┴────────────────────────────────────┘
```

### Benefits of GeoDNS
- **Reduced Latency**: Users connect to nearest server
- **Load Distribution**: Traffic spread across regions
- **Compliance**: Data residency requirements
- **Disaster Recovery**: Route around failed regions

### GeoDNS Providers
- AWS Route 53 (Geolocation Routing)
- Cloudflare
- NS1
- Google Cloud DNS

---

## 8. DNS in System Design

### Common DNS Patterns

#### 1. DNS-Based Load Balancing
```
app.example.com.    A    192.0.2.1
app.example.com.    A    192.0.2.2
app.example.com.    A    192.0.2.3
```
Multiple A records enable round-robin distribution.

#### 2. Service Discovery
```
_http._tcp.example.com.    SRV    10 5 80 server1.example.com.
_http._tcp.example.com.    SRV    10 5 80 server2.example.com.
```

#### 3. Blue-Green Deployments
- Point DNS to blue environment
- Deploy to green environment
- Switch DNS to green when ready
- Keep blue as rollback option

### DNS Considerations for System Design

| Consideration | Impact | Solution |
|--------------|--------|----------|
| Propagation Delay | Changes take time | Use low TTL during migrations |
| Single Point of Failure | DNS outage = total outage | Multiple NS servers, Anycast |
| DDoS Vulnerability | DNS can be attacked | Use CDN/managed DNS services |
| Privacy | DNS queries are visible | DNS over HTTPS (DoH), DNS over TLS (DoT) |

---

## 9. DNS Security

### Common Threats

1. **DNS Cache Poisoning**: Injecting false DNS records into cache
2. **DNS Amplification Attack**: Using DNS for DDoS attacks
3. **DNS Hijacking**: Redirecting DNS queries to malicious servers
4. **DNS Tunneling**: Using DNS for data exfiltration

### Security Measures

#### DNSSEC (DNS Security Extensions)
- Adds cryptographic signatures to DNS records
- Validates authenticity of DNS responses
- Chain of trust from root to domain

#### DNS over HTTPS (DoH)
- Encrypts DNS queries using HTTPS
- Prevents eavesdropping and manipulation
- Supported by major browsers

#### DNS over TLS (DoT)
- Encrypts DNS using TLS
- Port 853 instead of 53
- More visibility for network administrators

---

## 10. Summary

- DNS translates human-readable domain names to IP addresses
- DNS follows a hierarchical structure: Root → TLD → Authoritative
- Different record types serve different purposes (A, AAAA, CNAME, MX, etc.)
- DNS resolution involves multiple steps and caching layers
- TTL controls how long DNS records are cached
- GeoDNS enables geographic routing for global applications
- DNS security (DNSSEC, DoH, DoT) protects against attacks

---

## Further Reading
- [Cloudflare: What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [How DNS Works - Comic](https://howdns.works/)
- [RFC 1035 - DNS Specification](https://tools.ietf.org/html/rfc1035)
- [Google Public DNS Documentation](https://developers.google.com/speed/public-dns)
