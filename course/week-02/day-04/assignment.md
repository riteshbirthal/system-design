# Day 4 Assignment: REST API Design

## Assignment Overview
**Difficulty:** Intermediate
**Estimated Time:** 75-90 minutes
**Points:** 100

---

## Part 1: URL Design (25 points)

### Task 1.1 (15 points)
Design RESTful URLs for an e-commerce platform with the following resources:
- Products (with categories)
- Users (with addresses and orders)
- Shopping carts
- Reviews (for products)

For each resource, provide URLs for all CRUD operations:

| Resource | Operation | HTTP Method | URL |
|----------|-----------|-------------|-----|
| Products | List all | | |
| Products | Get one | | |
| Products | Create | | |
| Products | Update | | |
| Products | Delete | | |
| Products | List by category | | |
| Users | List all | | |
| Users | Get one | | |
| User Addresses | List for user | | |
| User Orders | List for user | | |
| Cart | Get user's cart | | |
| Cart Items | Add item | | |
| Cart Items | Remove item | | |
| Reviews | List for product | | |
| Reviews | Add for product | | |

### Task 1.2 (10 points)
Identify and fix the problems with these URLs:

1. `GET /getUserById?id=123`
2. `POST /products/create`
3. `GET /users/123/orders/456/items/789/reviews/101/comments`
4. `DELETE /users/delete/123`
5. `GET /Product/list`

---

## Part 2: API Response Design (25 points)

### Task 2.1 (15 points)
Design the JSON response structures for the following scenarios:

1. **Successful product list with pagination:**
```json
// Design your response structure here
```

2. **Single product with nested category:**
```json
// Design your response structure here
```

3. **Validation error when creating user (invalid email and missing name):**
```json
// Design your response structure here
```

4. **404 Not Found for a product:**
```json
// Design your response structure here
```

### Task 2.2 (10 points)
For each scenario, specify the correct HTTP status code and explain why:

| Scenario | Status Code | Reasoning |
|----------|-------------|-----------|
| Product successfully deleted | | |
| User tries to access another user's data | | |
| Server cannot connect to database | | |
| Invalid JSON in request body | | |
| User successfully logged in | | |

---

## Part 3: Complete API Specification (30 points)

### Task 3.1 (30 points)
Design a complete REST API for a **Blog Platform** with the following features:
- Users can create, read, update, delete posts
- Users can comment on posts
- Users can like/unlike posts
- Posts can have tags
- Users can follow other users

Provide:

1. **Resource Endpoints Table:**

| Resource | Method | Endpoint | Description | Auth Required |
|----------|--------|----------|-------------|---------------|
| | | | | |

2. **Request/Response Examples** for:
   - Creating a new blog post
   - Getting a post with comments
   - Liking a post
   - Following a user

3. **Error Handling Strategy:**
   - Define your error response format
   - List common error codes and messages

4. **Pagination Strategy:**
   - How will you paginate posts list?
   - How will you paginate comments on a post?

---

## Part 4: Advanced Topics (20 points)

### Task 4.1 (10 points)
Design a versioning strategy for the blog API:
1. How will you version the API?
2. How will you handle breaking changes?
3. What is your deprecation policy?
4. How will you communicate changes to API consumers?

### Task 4.2 (10 points)
Design rate limiting for the blog API:

| Endpoint Type | Rate Limit | Why |
|--------------|------------|-----|
| Read (GET) | | |
| Write (POST/PUT) | | |
| Authentication | | |
| Search | | |

Also answer:
1. What headers will you use to communicate rate limits?
2. What response will users receive when rate limited?
3. How will authenticated vs unauthenticated users differ?

---

## Submission Guidelines

1. Save your answers in a document named `day04_rest_api_assignment_[yourname].md`
2. Use proper JSON formatting for examples
3. Submit by the end of Day 4

## Grading Rubric

| Criteria | Points |
|----------|--------|
| URL Design Quality | 20 |
| Response Structure | 20 |
| API Specification Completeness | 25 |
| Advanced Topics | 20 |
| Clarity & Formatting | 15 |
| **Total** | **100** |

---

## Bonus Challenge (Optional - 20 extra points)

### Bonus 1: OpenAPI Specification (15 points)
Write an OpenAPI 3.0 specification for at least 3 endpoints of your blog API.

### Bonus 2: HATEOAS Design (5 points)
Add hypermedia links to your responses following HATEOAS principles. Show how a client could navigate from:
- Blog post → Author profile → Author's other posts → Comments
