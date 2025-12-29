# Day 5: GraphQL, gRPC & WebSockets

## Learning Objectives
- Understand GraphQL and its advantages over REST
- Learn gRPC for high-performance service communication
- Understand WebSockets for real-time bidirectional communication
- Compare different API paradigms and when to use each

---

## 1. GraphQL Overview

### What is GraphQL?
GraphQL is a query language for APIs and a runtime for executing those queries. Developed by Facebook in 2012 and open-sourced in 2015, it allows clients to request exactly the data they need.

### GraphQL vs REST

```
REST: Multiple endpoints, fixed responses
┌──────┐     GET /users/123         ┌──────┐
│Client│────────────────────────────▶│Server│
│      │     GET /users/123/posts   │      │
│      │────────────────────────────▶│      │
│      │     GET /posts/1/comments  │      │
│      │────────────────────────────▶│      │
└──────┘     3 round trips          └──────┘

GraphQL: Single endpoint, flexible queries
┌──────┐     POST /graphql          ┌──────┐
│Client│────────────────────────────▶│Server│
│      │     (single query)         │      │
└──────┘     1 round trip           └──────┘
```

### Key Differences

| Aspect | REST | GraphQL |
|--------|------|---------|
| Endpoints | Multiple | Single |
| Data Fetching | Fixed responses | Client specifies |
| Over-fetching | Common | Eliminated |
| Under-fetching | Common | Eliminated |
| Versioning | URL or header | Evolving schema |
| Caching | HTTP caching | Custom solutions |
| Error Handling | HTTP status codes | Always 200, errors in body |

---

## 2. GraphQL Schema & Types

### Schema Definition Language (SDL)

```graphql
# Define types
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
  likes: Int!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

# Query type (read operations)
type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
  posts(authorId: ID): [Post!]!
}

# Mutation type (write operations)
type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
  createPost(input: CreatePostInput!): Post!
  likePost(id: ID!): Post!
}

# Input types
input CreateUserInput {
  name: String!
  email: String!
}

input CreatePostInput {
  title: String!
  content: String!
}

# Subscription type (real-time)
type Subscription {
  postCreated: Post!
  commentAdded(postId: ID!): Comment!
}
```

### Scalar Types

| Type | Description |
|------|-------------|
| Int | 32-bit integer |
| Float | Double-precision float |
| String | UTF-8 string |
| Boolean | true/false |
| ID | Unique identifier |

### Type Modifiers

```graphql
String    # Nullable string
String!   # Non-null string
[String]  # Nullable list of nullable strings
[String!] # Nullable list of non-null strings
[String!]!# Non-null list of non-null strings
```

---

## 3. GraphQL Queries & Mutations

### Query Example

```graphql
# Client request
query GetUserWithPosts($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    posts {
      id
      title
      comments {
        text
        author {
          name
        }
      }
    }
  }
}

# Variables
{
  "userId": "123"
}
```

### Response

```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "posts": [
        {
          "id": "1",
          "title": "GraphQL Introduction",
          "comments": [
            {
              "text": "Great post!",
              "author": {
                "name": "Jane"
              }
            }
          ]
        }
      ]
    }
  }
}
```

### Mutation Example

```graphql
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    author {
      name
    }
  }
}

# Variables
{
  "input": {
    "title": "New Post",
    "content": "This is the content"
  }
}
```

### Subscriptions (Real-time)

```graphql
subscription OnNewComment($postId: ID!) {
  commentAdded(postId: $postId) {
    id
    text
    author {
      name
    }
  }
}
```

---

## 4. GraphQL Pros & Cons

### Advantages ✅
- **No over-fetching**: Get exactly what you need
- **No under-fetching**: Get all related data in one request
- **Strongly typed**: Schema provides clear contract
- **Introspection**: Self-documenting API
- **Developer experience**: Great tooling (GraphiQL, Apollo DevTools)
- **Versionless**: Evolve schema without breaking changes

### Disadvantages ❌
- **Complexity**: More complex than REST for simple APIs
- **Caching**: HTTP caching doesn't work out of the box
- **File uploads**: Not natively supported
- **Rate limiting**: Harder to implement (query complexity)
- **N+1 problem**: Can cause performance issues without DataLoader
- **Learning curve**: New paradigm to learn

---

## 5. gRPC Overview

### What is gRPC?
gRPC (gRPC Remote Procedure Call) is a high-performance, open-source framework developed by Google. It uses Protocol Buffers for serialization and HTTP/2 for transport.

```
┌────────────────────────────────────────────────────────┐
│                        gRPC                             │
├────────────────────────────────────────────────────────┤
│              Protocol Buffers (Serialization)          │
├────────────────────────────────────────────────────────┤
│                   HTTP/2 (Transport)                   │
└────────────────────────────────────────────────────────┘
```

### Protocol Buffers (protobuf)

```protobuf
// user.proto
syntax = "proto3";

package user;

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
  rpc CreateUser(CreateUserRequest) returns (User);
  rpc UpdateUser(UpdateUserRequest) returns (User);
  rpc DeleteUser(DeleteUserRequest) returns (Empty);
  
  // Streaming RPCs
  rpc WatchUsers(WatchRequest) returns (stream User);
  rpc BatchCreateUsers(stream CreateUserRequest) returns (BatchResponse);
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}

message User {
  int64 id = 1;
  string name = 2;
  string email = 3;
  repeated string roles = 4;
  google.protobuf.Timestamp created_at = 5;
}

message GetUserRequest {
  int64 id = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  string next_page_token = 2;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
}
```

### gRPC Communication Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Unary** | Single request, single response | Standard request |
| **Server Streaming** | Single request, stream of responses | Real-time updates |
| **Client Streaming** | Stream of requests, single response | File upload |
| **Bidirectional Streaming** | Stream both ways | Chat, gaming |

```protobuf
// Unary RPC
rpc GetUser(GetUserRequest) returns (User);

// Server streaming
rpc WatchUsers(WatchRequest) returns (stream User);

// Client streaming
rpc UploadFile(stream FileChunk) returns (UploadStatus);

// Bidirectional streaming
rpc Chat(stream ChatMessage) returns (stream ChatMessage);
```

### gRPC vs REST

| Aspect | REST | gRPC |
|--------|------|------|
| Protocol | HTTP/1.1 or HTTP/2 | HTTP/2 only |
| Format | JSON (text) | Protocol Buffers (binary) |
| Contract | OpenAPI (optional) | .proto file (required) |
| Browser Support | Native | Requires gRPC-Web |
| Streaming | Limited | Full support |
| Performance | Good | Excellent |
| Learning Curve | Low | Medium |

### When to Use gRPC
- **Microservices communication**: Service-to-service calls
- **High performance needed**: Low latency, high throughput
- **Streaming required**: Real-time data, bidirectional communication
- **Polyglot environment**: Multiple programming languages
- **Mobile apps**: Efficient for bandwidth-constrained clients

---

## 6. WebSockets

### What are WebSockets?
WebSockets provide full-duplex, bidirectional communication between client and server over a single TCP connection.

```
HTTP Request/Response:           WebSocket:
┌────────┐    Request   ┌────────┐    ┌────────┐  ═══════  ┌────────┐
│ Client │───────────▶│ Server │    │ Client │◀═══════▶│ Server │
│        │◀───────────│        │    │        │ Full-duplex│        │
│        │   Response  │        │    │        │  Persistent│        │
└────────┘             └────────┘    └────────┘           └────────┘
```

### WebSocket Handshake

```http
# Client request (upgrade from HTTP)
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

# Server response
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### WebSocket Client Example (JavaScript)

```javascript
// Connect to WebSocket server
const socket = new WebSocket('wss://example.com/chat');

// Connection opened
socket.onopen = function(event) {
    console.log('Connected');
    socket.send(JSON.stringify({
        type: 'join',
        room: 'general'
    }));
};

// Listen for messages
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Received:', data);
};

// Handle errors
socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

// Connection closed
socket.onclose = function(event) {
    console.log('Disconnected');
};

// Send message
function sendMessage(text) {
    socket.send(JSON.stringify({
        type: 'message',
        text: text,
        timestamp: Date.now()
    }));
}
```

### WebSocket Server Example (Node.js)

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on('connection', function connection(ws) {
    clients.add(ws);
    console.log('Client connected');
    
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        
        // Broadcast to all clients
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'message',
                    from: data.from,
                    text: data.text
                }));
            }
        });
    });
    
    ws.on('close', function close() {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});
```

### WebSocket Use Cases
- **Chat applications**: Real-time messaging
- **Live notifications**: Push updates to users
- **Collaborative editing**: Google Docs-like features
- **Gaming**: Real-time multiplayer games
- **Financial tickers**: Stock price updates
- **Live sports**: Score updates
- **IoT dashboards**: Sensor data streaming

---

## 7. Server-Sent Events (SSE)

### SSE vs WebSocket

| Feature | SSE | WebSocket |
|---------|-----|-----------|
| Direction | Server → Client only | Bidirectional |
| Protocol | HTTP | WebSocket protocol |
| Reconnection | Automatic | Manual |
| Browser Support | Native | Native |
| Complexity | Simple | More complex |

### SSE Example

```javascript
// Client
const eventSource = new EventSource('/events');

eventSource.onmessage = function(event) {
    console.log('Received:', event.data);
};

eventSource.addEventListener('notification', function(event) {
    console.log('Notification:', JSON.parse(event.data));
});

// Server (Node.js)
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Send event every second
    const interval = setInterval(() => {
        res.write(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
    }, 1000);
    
    req.on('close', () => {
        clearInterval(interval);
    });
});
```

---

## 8. Choosing the Right Protocol

### Decision Matrix

```
                         Real-time Needed?
                        /                 \
                      Yes                  No
                       │                    │
              Bidirectional?           Complex Queries?
                /         \               /         \
              Yes         No            Yes         No
               │           │              │           │
          WebSocket       SSE         GraphQL       REST
               │           │
          Or gRPC      Or GraphQL
         Streaming    Subscriptions
```

### Protocol Selection Guide

| Requirement | Best Choice |
|-------------|-------------|
| Simple CRUD API | REST |
| Complex, nested data | GraphQL |
| Microservice communication | gRPC |
| Real-time bidirectional | WebSocket |
| Real-time server push | SSE or GraphQL Subscriptions |
| High-performance RPC | gRPC |
| Browser-first API | REST or GraphQL |
| Mobile with bandwidth constraints | gRPC or GraphQL |

### Hybrid Approaches

Many production systems use multiple protocols:

```
┌─────────────────────────────────────────────────────┐
│                    API Gateway                       │
├───────────┬───────────┬───────────┬─────────────────┤
│   REST    │  GraphQL  │ WebSocket │   gRPC-Web     │
│ (Public)  │ (Mobile)  │  (Chat)   │   (Admin)      │
└───────────┴───────────┴───────────┴─────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    ┌───────┐      ┌────────┐      ┌────────┐
    │User   │      │Post    │      │Chat    │
    │Service│      │Service │      │Service │
    └───────┘      └────────┘      └────────┘
              (gRPC between services)
```

---

## 9. Summary

| Protocol | Best For | Key Feature |
|----------|----------|-------------|
| REST | Standard web APIs | Simplicity, HTTP caching |
| GraphQL | Complex data needs | Flexible queries |
| gRPC | Service-to-service | Performance, streaming |
| WebSocket | Real-time apps | Full-duplex communication |
| SSE | Server push | Simplicity, auto-reconnect |

### Key Takeaways
- **REST**: Default choice for web APIs, simple and well-understood
- **GraphQL**: Great when clients need flexible data fetching
- **gRPC**: Ideal for microservices and high-performance scenarios
- **WebSocket**: Essential for real-time bidirectional communication
- **Choose based on requirements**, not hype

---

## Further Reading
- [GraphQL Official Documentation](https://graphql.org/learn/)
- [gRPC Documentation](https://grpc.io/docs/)
- [WebSocket API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Apollo GraphQL](https://www.apollographql.com/docs/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
