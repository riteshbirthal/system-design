const questions = [
  {
    question: "What is the difference between authentication and authorization?",
    answer: "Authentication (AuthN): Verifies WHO you are - proving identity (username/password, MFA, certificates). Authorization (AuthZ): Verifies WHAT you can do - checking permissions (can user edit this resource?). AuthN happens first, then AuthZ. Example: Login proves identity (AuthN), then system checks if you can access admin panel (AuthZ).",
    difficulty: "Easy"
  },
  {
    question: "What is OAuth 2.0 and what problem does it solve?",
    answer: "OAuth 2.0 is an authorization framework allowing third-party applications to access user resources without sharing credentials. Problem solved: User wants app to access their Google data without giving app their Google password. Solution: User authorizes app with Google, Google gives app a token with limited scope/time. Roles: Resource Owner, Client, Auth Server, Resource Server.",
    difficulty: "Medium"
  },
  {
    question: "Explain the OAuth 2.0 Authorization Code flow.",
    answer: "Steps: 1) User clicks 'Login with Google'. 2) App redirects to Google with client_id, redirect_uri, scope. 3) User authenticates with Google, approves access. 4) Google redirects back with authorization code. 5) App exchanges code for access token (server-side, with client_secret). 6) App uses token to access resources. Most secure flow for web apps.",
    difficulty: "Medium"
  },
  {
    question: "What is a JWT and what are its components?",
    answer: "JWT (JSON Web Token) is a self-contained token for secure information transfer. Three parts: Header (algorithm, type), Payload (claims - user data, expiry, issuer), Signature (hash of header+payload with secret). Format: xxxxx.yyyyy.zzzzz (Base64 encoded). Benefits: Stateless, self-contained, can be verified without database lookup.",
    difficulty: "Medium"
  },
  {
    question: "What are best practices for JWT security?",
    answer: "Use strong algorithms (RS256, ES256, not HS256 with weak secret). Short expiry (15 min access token, longer refresh token). Don't store sensitive data in payload (it's only encoded, not encrypted). Always validate: signature, expiry (exp), issuer (iss), audience (aud). Use HTTPS. Store securely (HttpOnly cookie vs localStorage trade-offs).",
    difficulty: "Medium"
  },
  {
    question: "How should passwords be stored?",
    answer: "Never store plaintext. Use adaptive hashing: bcrypt, scrypt, or Argon2 (not MD5/SHA). These include salt (prevents rainbow tables) and are intentionally slow (prevents brute force). Example: bcrypt.hashpw(password, bcrypt.gensalt(rounds=12)). Verify by hashing input and comparing. Never implement your own crypto.",
    difficulty: "Medium"
  },
  {
    question: "What is SQL injection and how do you prevent it?",
    answer: "SQL injection: Attacker inserts SQL code via user input. Example: input = \"'; DROP TABLE users;--\" in login form. Prevention: Use parameterized queries/prepared statements (never string concatenation), ORM frameworks, input validation (whitelist), least privilege DB accounts. Example: cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,)).",
    difficulty: "Medium"
  },
  {
    question: "What is Cross-Site Scripting (XSS) and how do you prevent it?",
    answer: "XSS: Attacker injects malicious scripts into pages viewed by others. Types: Stored (saved in DB), Reflected (in URL), DOM-based. Prevention: Output encoding/escaping (convert < to &lt;), Content Security Policy header, HttpOnly cookies (JS can't access), input validation. Never trust user input. Use framework auto-escaping.",
    difficulty: "Medium"
  },
  {
    question: "What is CSRF and how do you prevent it?",
    answer: "CSRF (Cross-Site Request Forgery): Attacker tricks user's browser into making unwanted requests using user's authenticated session. Example: Hidden form submission to transfer money. Prevention: CSRF tokens (unique per session, validated server-side), SameSite cookie attribute (Strict/Lax), verify Origin/Referer headers, require re-authentication for sensitive actions.",
    difficulty: "Medium"
  },
  {
    question: "What security headers should you implement?",
    answer: "Essential headers: Strict-Transport-Security (force HTTPS), X-Content-Type-Options: nosniff (prevent MIME sniffing), X-Frame-Options: DENY (prevent clickjacking), Content-Security-Policy (control resource loading), X-XSS-Protection: 1; mode=block (legacy XSS filter). Also: Referrer-Policy, Permissions-Policy. Check with securityheaders.com.",
    difficulty: "Medium"
  },
  {
    question: "What is TLS and how does the handshake work?",
    answer: "TLS (Transport Layer Security) encrypts data in transit. Handshake: 1) Client Hello (supported cipher suites). 2) Server Hello (chosen cipher, server certificate). 3) Client verifies certificate against trusted CAs. 4) Key exchange (asymmetric crypto to establish shared secret). 5) Symmetric encryption begins with shared key. Use TLS 1.2+, strong ciphers.",
    difficulty: "Hard"
  },
  {
    question: "What is the principle of least privilege?",
    answer: "Users/services should have minimum permissions needed to perform their function. Examples: Database user with only SELECT on needed tables, service account without admin rights, API keys scoped to specific endpoints. Benefits: Limits damage from breaches, reduces attack surface, easier audit. Implement: Regular access reviews, deny by default.",
    difficulty: "Easy"
  },
  {
    question: "What is Role-Based Access Control (RBAC)?",
    answer: "RBAC assigns permissions to roles, then roles to users. Example: Admin role has all permissions, Editor can edit content, Viewer can only read. Benefits: Easy to manage (change role, not individual permissions), audit-friendly, scalable. Implementation: roles table, user_roles table, role_permissions table. Check role in authorization middleware.",
    difficulty: "Medium"
  },
  {
    question: "How do you implement rate limiting?",
    answer: "Algorithms: Fixed window (count per time window), Sliding window (rolling count), Token bucket (tokens replenish at fixed rate), Leaky bucket (process at constant rate). Implementation: Track by IP, API key, or user. Use Redis for distributed systems. Return 429 with Retry-After header. Configure limits based on endpoint sensitivity and expected usage.",
    difficulty: "Medium"
  },
  {
    question: "What is mTLS and when is it used?",
    answer: "mTLS (mutual TLS): Both client and server present certificates and verify each other. Regular TLS: Only server presents certificate. mTLS use cases: Service-to-service communication in microservices, zero trust networks, API clients requiring strong authentication. Service mesh (Istio) automates mTLS between services.",
    difficulty: "Medium"
  },
  {
    question: "How do you secure secrets in applications?",
    answer: "Never commit secrets to code/version control. Solutions: Environment variables (basic), secrets managers (Vault, AWS Secrets Manager), Kubernetes secrets. Best practices: Rotate regularly, encrypt at rest, audit access, use different secrets per environment. Access: Application fetches at startup or runtime, not baked into images.",
    difficulty: "Medium"
  },
  {
    question: "What is the OWASP Top 10?",
    answer: "OWASP Top 10 is list of most critical web security risks. Current major items: Injection (SQL, command), Broken Authentication, Sensitive Data Exposure, XXE, Broken Access Control, Security Misconfiguration, XSS, Insecure Deserialization, Using Components with Known Vulnerabilities, Insufficient Logging. Use as checklist for security review.",
    difficulty: "Easy"
  },
  {
    question: "How do you implement secure session management?",
    answer: "Session ID: Generate cryptographically random IDs, regenerate after login (prevent fixation). Cookies: HttpOnly (no JS access), Secure (HTTPS only), SameSite (CSRF protection), appropriate expiry. Server-side: Store minimal data, validate on each request, implement logout (invalidate session), timeout inactive sessions. Consider JWT for stateless.",
    difficulty: "Medium"
  },
  {
    question: "What is a zero trust security model?",
    answer: "Zero Trust: 'Never trust, always verify' - no implicit trust based on network location. Principles: Verify explicitly (authenticate every request), least privilege access, assume breach (limit blast radius). Implementation: Strong identity verification, micro-segmentation, encrypt all traffic (even internal), continuous validation. Contrasts with perimeter security.",
    difficulty: "Medium"
  },
  {
    question: "How do you handle authentication in microservices?",
    answer: "Patterns: 1) API Gateway authentication (gateway validates, passes user context). 2) Token propagation (JWT passed through services). 3) Service-to-service auth (mTLS, service accounts). Implementation: Auth at gateway, JWT for user context, mTLS or service mesh for internal. Avoid: Each service re-authenticating users. Consider: Token validation caching.",
    difficulty: "Hard"
  },
  {
    question: "What is defense in depth?",
    answer: "Defense in depth uses multiple security layers so if one fails, others protect. Layers: Network (firewalls, segmentation), Host (OS hardening, antivirus), Application (input validation, auth), Data (encryption, access control). Example: Even if firewall breached, application still validates input and encrypts sensitive data. No single point of failure.",
    difficulty: "Easy"
  },
  {
    question: "How do you prevent brute force attacks?",
    answer: "Prevention: Account lockout (temporary after X failures), progressive delays (exponential backoff), CAPTCHA after failures, rate limiting by IP, require MFA. Detection: Monitor failed login attempts, alert on patterns. Don't reveal if username exists. Use constant-time comparison to prevent timing attacks.",
    difficulty: "Medium"
  },
  {
    question: "What is Content Security Policy (CSP)?",
    answer: "CSP is HTTP header that controls which resources browser can load, preventing XSS. Example: Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com. Directives: default-src, script-src, style-src, img-src, frame-ancestors. Start with report-only mode to test. Powerful XSS mitigation when properly configured.",
    difficulty: "Medium"
  },
  {
    question: "How do you secure API keys?",
    answer: "Never expose in client-side code or URLs. Transmit in headers (not query params - they're logged). Server-side: Hash stored keys, scope to specific APIs/IPs, set expiry, implement rotation. Monitor usage, rate limit, alert on anomalies. Revocation mechanism required. Consider: OAuth for user auth, API keys for service auth.",
    difficulty: "Medium"
  },
  {
    question: "What is certificate pinning?",
    answer: "Certificate pinning: Application only accepts specific certificates/public keys, not any CA-signed cert. Prevents MITM even if attacker has rogue CA cert. Implementation: Embed expected cert hash in app, validate on connection. Use cases: Mobile apps, high-security APIs. Trade-off: Harder certificate rotation (requires app update).",
    difficulty: "Hard"
  },
  {
    question: "How do you handle security logging and monitoring?",
    answer: "Log: Authentication attempts (success/failure), authorization failures, security-relevant events, admin actions. Don't log: Passwords, tokens, sensitive data. Implementation: Structured logging, centralized collection (SIEM), real-time alerting. Alerts: Multiple failed logins, privilege escalation, unusual access patterns. Retain logs for compliance/forensics.",
    difficulty: "Medium"
  },
  {
    question: "What is OAuth 2.0 PKCE and when is it used?",
    answer: "PKCE (Proof Key for Code Exchange): Extension for public clients (mobile, SPA) that can't securely store client_secret. Flow: Client generates code_verifier, sends hash (code_challenge) with auth request. When exchanging code for token, sends original code_verifier. Server verifies hash matches. Prevents authorization code interception attacks.",
    difficulty: "Hard"
  },
  {
    question: "How do you secure file uploads?",
    answer: "Validation: Whitelist allowed file types (check magic bytes, not just extension), limit file size. Storage: Store outside web root, use random filenames, separate domain for serving. Processing: Scan for malware, re-encode images (strip metadata). Serve: Proper Content-Type, Content-Disposition: attachment. Never execute uploaded files.",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between access token and refresh token?",
    answer: "Access token: Short-lived (minutes), used to access resources, sent with each API request. Refresh token: Long-lived (days/weeks), used only to get new access tokens, stored securely. Why: If access token compromised, limited damage (short expiry). Refresh token used infrequently, easier to monitor/revoke. Rotation: Issue new refresh token with each use.",
    difficulty: "Medium"
  },
  {
    question: "How do you implement security in a CI/CD pipeline?",
    answer: "SAST (Static Analysis): Scan code for vulnerabilities (SonarQube). DAST (Dynamic Analysis): Test running application. Dependency scanning: Check for vulnerable libraries (Snyk, Dependabot). Secret scanning: Prevent committed secrets. Container scanning: Check images for vulnerabilities. Infrastructure as code scanning. Fail builds on critical findings. Shift security left.",
    difficulty: "Medium"
  }
];

export default questions;
