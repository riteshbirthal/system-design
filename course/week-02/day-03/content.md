# Day 3: TCP vs UDP

## Learning Objectives
- Understand the Transport Layer and its role
- Learn TCP: connection-oriented, reliable protocol
- Learn UDP: connectionless, fast protocol
- Understand when to use TCP vs UDP
- Learn about QUIC protocol (HTTP/3)

---

## 1. Transport Layer Overview

The Transport Layer (Layer 4 in OSI model) is responsible for end-to-end communication between applications running on different hosts.

```
Application Layer (HTTP, FTP, SMTP)
         │
         ▼
Transport Layer (TCP/UDP)  ◀── We're here
         │
         ▼
Network Layer (IP)
         │
         ▼
Data Link Layer (Ethernet)
```

### Transport Layer Responsibilities
- **Segmentation**: Breaking data into segments
- **Port Addressing**: Directing data to correct application
- **Flow Control**: Managing data transmission rate
- **Error Handling**: Detecting and handling errors
- **Reliability**: Ensuring data delivery (TCP only)

---

## 2. TCP (Transmission Control Protocol)

### Characteristics
- **Connection-oriented**: Establishes connection before data transfer
- **Reliable**: Guarantees delivery of all packets
- **Ordered**: Maintains packet sequence
- **Error-checked**: Detects and retransmits lost packets
- **Flow-controlled**: Prevents overwhelming receiver

### TCP Header Structure (20-60 bytes)

```
┌─────────────────────────────────────────────────────────────┐
│         Source Port (16 bits)    │  Destination Port (16)  │
├─────────────────────────────────────────────────────────────┤
│                   Sequence Number (32 bits)                  │
├─────────────────────────────────────────────────────────────┤
│                Acknowledgment Number (32 bits)               │
├──────┬──────┬──────────────────────────────────────────────┤
│Offset│Reserv│Flags (URG,ACK,PSH,RST,SYN,FIN)│ Window (16) │
├──────┴──────┴──────────────────────────────────────────────┤
│      Checksum (16 bits)      │    Urgent Pointer (16)      │
├─────────────────────────────────────────────────────────────┤
│                     Options (variable)                       │
└─────────────────────────────────────────────────────────────┘
```

### TCP Three-Way Handshake

Connection establishment requires three steps:

```
    Client                                Server
       │                                    │
       │────── SYN (seq=x) ────────────────▶│
       │                                    │
       │◀───── SYN-ACK (seq=y, ack=x+1) ────│
       │                                    │
       │────── ACK (ack=y+1) ──────────────▶│
       │                                    │
       │═══════ Connection Established ═════│
       │                                    │
```

**Step 1**: Client sends SYN with initial sequence number (x)
**Step 2**: Server responds with SYN-ACK, acknowledging client's SYN
**Step 3**: Client sends ACK, connection is established

### TCP Connection Termination (Four-Way Handshake)

```
    Client                                Server
       │                                    │
       │────── FIN ────────────────────────▶│  Client wants to close
       │                                    │
       │◀───── ACK ─────────────────────────│  Server acknowledges
       │                                    │
       │◀───── FIN ─────────────────────────│  Server wants to close
       │                                    │
       │────── ACK ────────────────────────▶│  Client acknowledges
       │                                    │
       │═══════ Connection Closed ══════════│
```

### TCP Flow Control

**Sliding Window Protocol**:
- Receiver advertises how much data it can accept
- Sender limits outstanding data to window size
- Prevents overwhelming slower receivers

```
Window Size = 4 segments

Sent and ACKed │  Sent, awaiting ACK  │  Can send  │  Cannot send
      1,2,3    │       4,5,6,7        │    8,9     │    10,11,12...
               │      [Window]        │            │
               └─────────┬────────────┘
                    Sliding Window
```

### TCP Congestion Control

Algorithms to prevent network congestion:

1. **Slow Start**: Begin with small window, increase exponentially
2. **Congestion Avoidance**: Linear increase after threshold
3. **Fast Retransmit**: Retransmit on 3 duplicate ACKs
4. **Fast Recovery**: Don't reset to slow start after fast retransmit

```
Congestion Window Size
        ▲
        │           ╱──────
        │         ╱   Congestion Avoidance
        │       ╱     (Linear increase)
        │     ╱
        │   ╱
        │ ╱  Slow Start
        │╱   (Exponential)
        └──────────────────────▶ Time
```

---

## 3. UDP (User Datagram Protocol)

### Characteristics
- **Connectionless**: No handshake required
- **Unreliable**: No delivery guarantee
- **Unordered**: Packets may arrive out of order
- **No flow control**: Sender can overwhelm receiver
- **Fast**: Minimal overhead

### UDP Header Structure (8 bytes)

```
┌─────────────────────────────────────────────────┐
│   Source Port (16 bits)  │ Dest Port (16 bits) │
├─────────────────────────────────────────────────┤
│     Length (16 bits)     │ Checksum (16 bits)  │
└─────────────────────────────────────────────────┘
```

### UDP Communication

```
    Client                                Server
       │                                    │
       │────── Data Packet 1 ──────────────▶│
       │                                    │
       │────── Data Packet 2 ──────────────▶│
       │                                    │
       │────── Data Packet 3 ──────────────▶│
       │                                    │
       No handshake, no acknowledgment
       Packets may be lost or reordered
```

---

## 4. TCP vs UDP Comparison

### Feature Comparison

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | Best effort |
| Ordering | Maintains order | No ordering |
| Error Checking | Yes + retransmission | Checksum only |
| Flow Control | Yes (sliding window) | No |
| Congestion Control | Yes | No |
| Header Size | 20-60 bytes | 8 bytes |
| Speed | Slower | Faster |
| Overhead | Higher | Lower |
| Broadcast/Multicast | No | Yes |

### Performance Comparison

| Metric | TCP | UDP |
|--------|-----|-----|
| Latency | Higher (handshake) | Lower (no handshake) |
| Throughput | Variable (congestion control) | Maximum available |
| Packet Loss | Handled (retransmission) | Not handled |
| Connection Setup | ~1.5 RTT | 0 RTT |

### Head-of-Line Blocking

**TCP Problem**: If packet 2 is lost, packets 3,4,5 must wait even if received.

```
TCP: Lost packet blocks all subsequent packets
     Packet 1 ✓ → Packet 2 ✗ → [Blocked: 3,4,5 waiting]
                    ↓
              Retransmit 2
                    ↓
     Now process 3,4,5
```

**UDP Advantage**: Each packet independent, no blocking.

```
UDP: Packets processed independently
     Packet 1 ✓
     Packet 2 ✗ (lost, not retransmitted)
     Packet 3 ✓ (processed immediately)
     Packet 4 ✓
```

---

## 5. When to Use TCP vs UDP

### Use TCP When:
- **Data integrity is critical** (financial transactions, file transfers)
- **Order matters** (database replication)
- **Reliability required** (email, web pages)
- **Connection state needed** (authenticated sessions)

### TCP Use Cases:
- HTTP/HTTPS (web browsing)
- FTP (file transfer)
- SMTP/IMAP (email)
- SSH (secure shell)
- Database connections (MySQL, PostgreSQL)

### Use UDP When:
- **Speed > reliability** (real-time applications)
- **Occasional packet loss acceptable** (video streaming)
- **Low latency critical** (gaming, VoIP)
- **Broadcast/multicast needed** (service discovery)
- **Application handles reliability** (custom protocol)

### UDP Use Cases:
- DNS queries
- Video streaming (Netflix, YouTube)
- Voice/Video calls (Zoom, Skype)
- Online gaming
- IoT sensors
- DHCP (IP address assignment)

### Decision Matrix

```
                    Low Latency Required?
                    /                    \
                  Yes                     No
                   │                       │
           Loss Acceptable?        Data Critical?
              /        \              /        \
            Yes        No           Yes        No
             │          │             │          │
           UDP      TCP/QUIC        TCP        Either
```

---

## 6. QUIC Protocol (HTTP/3)

### What is QUIC?
QUIC (Quick UDP Internet Connections) is a transport protocol developed by Google, now standardized for HTTP/3. It runs over UDP but provides TCP-like reliability.

### QUIC Features

```
┌─────────────────────────────────────────────────┐
│                   HTTP/3                         │
├─────────────────────────────────────────────────┤
│              QUIC (Reliability +                 │
│        Multiplexing + Encryption)                │
├─────────────────────────────────────────────────┤
│                    UDP                           │
├─────────────────────────────────────────────────┤
│                    IP                            │
└─────────────────────────────────────────────────┘
```

### QUIC vs TCP+TLS

| Feature | TCP + TLS | QUIC |
|---------|-----------|------|
| Connection Setup | 3 RTT (TCP + TLS 1.3) | 1 RTT (0-RTT possible) |
| Head-of-Line Blocking | Yes (per connection) | No (per stream) |
| Connection Migration | No | Yes |
| Built-in Encryption | No (requires TLS) | Yes (TLS 1.3 built-in) |
| Multiplexing | HTTP/2 only | Native |

### QUIC Connection Establishment

```
TCP + TLS 1.3:                    QUIC:
                                  
Client ──SYN──▶ Server           Client ──Initial──▶ Server
Client ◀SYN+ACK── Server                (Contains crypto)
Client ──ACK──▶ Server           Client ◀──Handshake── Server
Client ──ClientHello──▶ Server   
Client ◀──ServerHello── Server   Ready to send data!
Client ──Finished──▶ Server      
                                  
    3 RTT                            1 RTT (0 RTT for repeat)
```

### Stream Multiplexing in QUIC

```
TCP/HTTP/2: One blocked stream blocks all
┌─────────────────────────────────────┐
│ Stream 1: ████████░░░░ (waiting)    │
│ Stream 2: ████░░░░░░░░ (blocked)    │
│ Stream 3: ██░░░░░░░░░░ (blocked)    │
└─────────────────────────────────────┘

QUIC/HTTP/3: Streams independent
┌─────────────────────────────────────┐
│ Stream 1: ████████░░░░ (waiting)    │
│ Stream 2: ████████████ (complete)   │
│ Stream 3: ████████████ (complete)   │
└─────────────────────────────────────┘
```

### Connection Migration

QUIC connections survive network changes (WiFi → Cellular):

```
Before (TCP):
WiFi IP: 192.168.1.100 ──┐
                          ├── Connection dies, must reconnect
Cellular IP: 10.0.0.50 ──┘

With QUIC:
WiFi IP: 192.168.1.100 ──┐
                          ├── Same connection continues
Cellular IP: 10.0.0.50 ──┘    (Connection ID stays same)
```

---

## 7. Practical Implications for System Design

### Choosing Protocols

| Application Type | Recommended Protocol | Reason |
|------------------|---------------------|--------|
| Web Applications | TCP (HTTP/1.1, HTTP/2) | Reliability needed |
| Modern Web | QUIC (HTTP/3) | Speed + reliability |
| Video Streaming | UDP (RTP) or QUIC | Low latency |
| Online Gaming | UDP + custom reliability | Ultra-low latency |
| Chat/Messaging | TCP or WebSocket | Message delivery |
| IoT Telemetry | UDP (MQTT over UDP) | Low overhead |
| File Transfer | TCP | Data integrity |
| VoIP | UDP (RTP) | Real-time |

### Hybrid Approaches

Many applications use both:
- **Gaming**: UDP for game state, TCP for chat/inventory
- **Streaming**: UDP for video, TCP for metadata
- **Video Calls**: UDP for media, TCP for signaling

---

## 8. Summary

- **TCP**: Reliable, ordered, connection-oriented - use when data integrity matters
- **UDP**: Fast, lightweight, connectionless - use when speed matters more than reliability
- **QUIC**: Best of both worlds - reliability with low latency
- Choice depends on application requirements: reliability vs speed
- Modern applications often use hybrid approaches
- HTTP/3 with QUIC represents the future of web transport

---

## Further Reading
- [RFC 793 - TCP Specification](https://tools.ietf.org/html/rfc793)
- [RFC 768 - UDP Specification](https://tools.ietf.org/html/rfc768)
- [QUIC RFC 9000](https://www.rfc-editor.org/rfc/rfc9000)
- [High Performance Browser Networking - Transport](https://hpbn.co/)
