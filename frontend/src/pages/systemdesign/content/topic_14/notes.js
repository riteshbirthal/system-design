const notes = `
# Security & Authentication

## Introduction to Security

### Security Principles
- **Defense in Depth**: Multiple layers of security
- **Least Privilege**: Minimum access needed
- **Zero Trust**: Never trust, always verify
- **Fail Secure**: Default to secure state on failure

### Security Triad (CIA)
- **Confidentiality**: Protect data from unauthorized access
- **Integrity**: Ensure data hasn't been tampered
- **Availability**: Ensure system is accessible

---

## Authentication vs Authorization

### Authentication (AuthN)
**Who are you?** - Verifying identity

Methods:
- Username/Password
- Multi-factor Authentication (MFA)
- Biometrics
- Certificates
- API Keys
- Tokens (JWT, OAuth)

### Authorization (AuthZ)
**What can you do?** - Verifying permissions

Models:
- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- Access Control Lists (ACL)

---

## OAuth 2.0

### Overview
OAuth 2.0 is an authorization framework enabling third-party access to resources without sharing credentials.

### Roles
- **Resource Owner**: User who owns data
- **Client**: Application requesting access
- **Authorization Server**: Issues tokens
- **Resource Server**: Hosts protected resources

### Flows

**Authorization Code Flow (Web Apps)**
\`\`\`
1. User clicks "Login with Google"
2. Redirect to Google authorization
3. User approves, Google returns auth code
4. App exchanges code for access token
5. App uses token to access resources
\`\`\`

**Client Credentials Flow (Service-to-Service)**
\`\`\`
1. Service authenticates with client_id/secret
2. Authorization server returns access token
3. Service uses token for API calls
\`\`\`

---

## JSON Web Tokens (JWT)

### Structure
\`\`\`
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

### Components
- **Header**: Algorithm, token type
- **Payload**: Claims (user data, expiry)
- **Signature**: Verification hash

### Best Practices
- Use strong algorithms (RS256, ES256)
- Short expiry (15 min access, days refresh)
- Don't store sensitive data in payload
- Validate signature, expiry, issuer

---

## Password Security

### Storage
Never store plaintext passwords.

\`\`\`python
# Hashing with salt
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

# Verification
bcrypt.checkpw(password.encode(), hashed)
\`\`\`

### Best Practices
- Use bcrypt, scrypt, or Argon2
- Enforce password complexity
- Implement account lockout
- Prevent timing attacks

---

## API Security

### Authentication Methods
| Method | Use Case |
|--------|----------|
| API Keys | Simple service auth |
| OAuth 2.0 | User authorization |
| JWT | Stateless auth |
| mTLS | Service-to-service |

### Security Headers
\`\`\`http
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'
\`\`\`

### Rate Limiting
Prevent abuse and DDoS.
\`\`\`http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
\`\`\`

---

## HTTPS/TLS

### TLS Handshake
\`\`\`
1. Client Hello (supported ciphers)
2. Server Hello (chosen cipher, certificate)
3. Client verifies certificate
4. Key exchange
5. Encrypted communication
\`\`\`

### Best Practices
- TLS 1.2+ only
- Strong cipher suites
- Valid certificates (Let's Encrypt)
- HSTS header
- Certificate pinning (mobile)

---

## Common Vulnerabilities

### OWASP Top 10

**1. Injection (SQL, NoSQL, Command)**
\`\`\`python
# Bad
query = f"SELECT * FROM users WHERE id = {user_input}"

# Good - Parameterized
cursor.execute("SELECT * FROM users WHERE id = ?", (user_input,))
\`\`\`

**2. Broken Authentication**
- Weak passwords
- Session fixation
- Credential stuffing

**3. Cross-Site Scripting (XSS)**
\`\`\`html
<!-- Bad -->
<div>Welcome, {{user_input}}</div>

<!-- Good - Escaped -->
<div>Welcome, {{escape(user_input)}}</div>
\`\`\`

**4. Cross-Site Request Forgery (CSRF)**
- Use CSRF tokens
- SameSite cookies

**5. Security Misconfiguration**
- Default credentials
- Verbose errors
- Open cloud storage

---

## Session Management

### Session Types
- **Server-side**: Session ID in cookie, data on server
- **Client-side**: JWT, all data in token

### Cookie Security
\`\`\`
Set-Cookie: session=abc123;
  HttpOnly;     // No JavaScript access
  Secure;       // HTTPS only
  SameSite=Strict;  // CSRF protection
  Max-Age=3600
\`\`\`

---

## Secrets Management

### What to Protect
- API keys
- Database credentials
- Encryption keys
- Certificates

### Solutions
- **Vault** (HashiCorp)
- **AWS Secrets Manager**
- **Azure Key Vault**
- **Environment variables** (basic)

### Best Practices
- Never commit secrets to code
- Rotate regularly
- Audit access
- Encrypt at rest

---

## Security in Microservices

### Service-to-Service Auth
- **mTLS**: Mutual TLS with certificates
- **Service Mesh**: Automatic mTLS (Istio)
- **JWT**: Token propagation

### API Gateway Security
Centralized:
- Authentication
- Rate limiting
- Input validation
- DDoS protection

### Zero Trust
- Verify every request
- Encrypt all traffic
- Least privilege access
- Network segmentation

---

## Best Practices

1. **Use HTTPS everywhere**
2. **Implement MFA** for sensitive operations
3. **Hash passwords** with bcrypt/Argon2
4. **Validate all input** (whitelist approach)
5. **Use prepared statements** for queries
6. **Set security headers**
7. **Implement rate limiting**
8. **Log security events** (audit trail)
9. **Keep dependencies updated**
10. **Regular security audits**

---

## Quick Reference

| Threat | Mitigation |
|--------|------------|
| Password breach | Hash + salt, MFA |
| SQL injection | Prepared statements |
| XSS | Output encoding, CSP |
| CSRF | CSRF tokens, SameSite |
| Man-in-middle | HTTPS, cert pinning |
| DDoS | Rate limiting, CDN |
| Unauthorized access | OAuth, RBAC |
`;

export default notes;
