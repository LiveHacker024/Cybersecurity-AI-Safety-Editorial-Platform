/**
 * Authentic API Security Vulnerability Database
 * Adheres strictly to OWASP API Security Top 10 (2023), MITRE CWE, and RFC specifications.
 * Zero-fabrication policy: strictly technical, educational, and authorized testing methodologies.
 */

export const apiVulnerabilities = [
  {
    slug: "broken-object-level-authorization",
    name: "Broken Object Level Authorization (BOLA / IDOR)",
    shortDefinition: "Occurs when an API endpoint accepts an object identifier from user input without validating whether the authenticated user possesses authorization to access or modify that specific record.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API1:2023 — Broken Object Level Authorization",
    cweClassification: "CWE-284: Improper Access Control (also CWE-639: Authorization Bypass Through User-Controlled Key)",
    severity: "Contextual: High to Critical (Directly enables unauthorized data exposure or account takeover across tenant boundaries)",
    difficulty: "Beginner",
    rootCause: "The backend service retrieves database records directly using client-supplied IDs (e.g. integer IDs, UUIDs, usernames) without binding the query to the authenticated session context or validating object-level tenancy policies.",
    whereTestersLook: "RESTful path parameters (`/api/v1/users/{id}`), JSON request bodies containing object keys (`{\"account_id\": 102}`), query strings (`?invoice_id=8842`), and GraphQL query arguments.",
    authorizedTestingMethodology: [
      "Provision two distinct authorized testing accounts within your lab environment: Account A (Primary) and Account B (Secondary).",
      "Using Account A, create a test resource (e.g., a note or profile) and record its identifier: `<TEST_RESOURCE_ID_A>`.",
      "Using Account B, capture a valid authenticated session token: `<TEST_TOKEN_B>`.",
      "Send a request to the API resource endpoint supplying `<TEST_RESOURCE_ID_A>` in the URL or payload while presenting `<TEST_TOKEN_B>` in the Authorization header.",
      "Inspect the HTTP response status code and body: verify whether Account B received Account A's private data (HTTP 200) or was correctly rejected (HTTP 403 Forbidden or HTTP 404 Not Found)."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/tenants/<LAB_TENANT_A_ID>/invoices/<TEST_INVOICE_ID_A>",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN_ACCOUNT_B>",
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "<TEST_OBJECT_ID_A>",
      purpose: "Verify whether the backend enforces object ownership checks against the authenticated session token.",
      expectedSecureBehavior: "The API returns HTTP 403 Forbidden or HTTP 404 Not Found, logging the unauthorized access attempt without disclosing the resource payload.",
      vulnerableBehaviorIndicators: [
        "The API responds with HTTP 200 OK and returns sensitive object properties belonging to Account A.",
        "The API executes modification commands (PUT/PATCH/DELETE) on Account A's resource when authorized as Account B.",
        "Differential error messages indicating that the object exists even if access is denied."
      ]
    },
    evidenceToCollect: "Full HTTP request headers and body containing the test token, paired with the complete HTTP response showing the unauthorized record payload. Redact all production tokens and personal identifiers.",
    developerRemediation: "Implement authorization checks at the data-access layer. Scope all database queries by the authenticated user's organization or user ID (e.g., `SELECT * FROM invoices WHERE id = :id AND org_id = :auth_org_id`). Utilize attribute-based access control (ABAC) or policy enforcement engines.",
    preventionChecklist: [
      "Enforce tenant-scoped queries for every database lookup.",
      "Use cryptographically random, non-sequential UUIDs (v4 or v7) to prevent trivial enumeration, though note that UUIDs alone do NOT replace authorization checks.",
      "Adopt automated authorization integration tests across all microservices.",
      "Log and monitor unexpected cross-tenant object query attempts."
    ],
    relatedVulnerabilities: [
      { name: "Insecure Direct Object References (IDOR)", slug: "idor-insecure-direct-object-references", category: "web-security" },
      { name: "Broken Function Level Authorization (BFLA)", slug: "broken-function-level-authorization", category: "api-security" },
      { name: "Broken Object Property Level Authorization", slug: "broken-object-property-level-authorization", category: "api-security" }
    ],
    references: [
      { name: "OWASP API Security Top 10 — API1:2023 BOLA", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "MITRE CWE-639: Insecure Direct Object References", url: "https://cwe.mitre.org/data/definitions/639.html", type: "MITRE" },
      { name: "NIST SP 800-162 Guide to Attribute Based Access Control", url: "https://csrc.nist.gov/publications/detail/sp/800-162/final", type: "NIST" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced Object-Level Authorization & Secondary IDOR Testing",
      prerequisiteKnowledge: "Understanding of REST API gateways, multi-tenant relational schemas, and microservice token propagation.",
      authorizedTargetRequirement: "Intentionally vulnerable multi-tenant lab environment (e.g., OWASP crAPI or private authorized sandbox).",
      affectedTechnology: "Distributed microservices, GraphQL federated graphs, and nested REST resources.",
      exactObjective: "Evaluate authorization resilience across composite API calls, nested sub-resources (`/api/v1/teams/<A>/members/<B>/audit`), and asynchronous export queues.",
      methodology: "1. Map secondary and nested endpoints. 2. Verify if child resource resolvers independently validate tenant boundary invariants. 3. Assess batch endpoint handling where multiple IDs are supplied in an array (`ids: [1, 2, 3]`).",
      expectedResult: "All composite and batch operations reject unauthorized identifiers, returning partial success or overall policy rejections without leaking records.",
      remediation: "Apply centralized Policy as Code (e.g., Open Policy Agent - OPA) at the API gateway and re-verify at every microservice data retrieval layer.",
      references: [
        { name: "OWASP Authorization Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Testing_Automation_Cheat_Sheet.html", type: "OWASP" }
      ]
    }
  },
  {
    slug: "broken-authentication",
    name: "Broken Authentication in APIs",
    shortDefinition: "Flaws in the authentication mechanism that permit threat actors to compromise authentication tokens, bypass password reset requirements, or forge credentials.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API2:2023 — Broken Authentication",
    cweClassification: "CWE-287: Improper Authentication (also CWE-306: Missing Authentication for Critical Function)",
    severity: "Contextual: High to Critical (Enables full account takeover or unauthenticated API resource access)",
    difficulty: "Intermediate",
    rootCause: "Weak credential policies, missing rate limiting on login endpoints, improperly signed or unsigned JWTs, predictable password reset tokens, or failure to invalidate tokens upon logout.",
    whereTestersLook: "Authentication routes (`/api/auth/login`, `/api/auth/refresh`, `/api/auth/reset-password`), OAuth token endpoints, and mobile API session initialization flows.",
    authorizedTestingMethodology: [
      "Test credential stuffing resilience on authentication endpoints by attempting multiple failed logins with controlled test accounts to verify lockout/throttling.",
      "Inspect token lifecycle: verify whether revoked or logged-out tokens remain accepted by backend resource servers.",
      "Assess password reset workflows: check if verification codes are short, sequential, or lack expiration timestamps.",
      "Verify if sensitive endpoints accept requests without an Authorization header or with invalid signature algorithms."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/auth/token/refresh",
      headers: {
        "Content-Type": "application/json"
      },
      payload: {
        "refresh_token": "<EXPIRED_OR_REVOKED_TEST_TOKEN>"
      }
    },
    safeTestInput: {
      input: "<EXPIRED_OR_REVOKED_TEST_TOKEN>",
      purpose: "Check if the API server rejects expired, revoked, or manipulated tokens.",
      expectedSecureBehavior: "HTTP 401 Unauthorized with token rejection error.",
      vulnerableBehaviorIndicators: [
        "The API returns a fresh access token despite the refresh token being marked revoked or expired.",
        "Unlimited failed authentication attempts without rate limiting or CAPTCHA enforcement.",
        "Passwords or secret tokens accepted via unencrypted HTTP query parameters."
      ]
    },
    evidenceToCollect: "Token lifecycle audit logs, timestamps of expiration, and HTTP responses demonstrating accepted invalid tokens.",
    developerRemediation: "Implement robust OAuth 2.0 / OIDC standard flows. Enforce short-lived access tokens (e.g., 15 minutes) with rotating refresh tokens. Apply rate limiting and IP reputation checks on authentication endpoints.",
    preventionChecklist: [
      "Require multi-factor authentication (MFA) for administrative and sensitive API actions.",
      "Validate token signatures with asymmetric keys (RS256/ES256) and reject `none` algorithm.",
      "Store token blocklists in distributed caches (e.g., Redis) for immediate revocation."
    ],
    relatedVulnerabilities: [
      { name: "JWT Implementation Weaknesses", slug: "jwt-implementation-weaknesses", category: "api-security" },
      { name: "OAuth 2.0 / OIDC Configuration Issues", slug: "oauth-oidc-configuration-issues", category: "api-security" }
    ],
    references: [
      { name: "OWASP API2:2023 Broken Authentication", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "NIST SP 800-63B Digital Identity Guidelines", url: "https://pages.nist.gov/800-63-3/sp800-63b.html", type: "NIST" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced Token Replay & Race Conditions in Refresh Flow",
      prerequisiteKnowledge: "Understanding of OAuth 2.0 Token Exchange, concurrency testing, and distributed cache latency.",
      authorizedTargetRequirement: "Authorized staging API instance with mock identity provider.",
      affectedTechnology: "OAuth 2.0 Authorization Server and Resource Servers.",
      exactObjective: "Assess whether rapid concurrent requests with a single-use refresh token permit multiple valid access tokens to be generated before cache synchronization.",
      methodology: "Send synchronized parallel HTTP requests using a single refresh token within a 50ms window in a controlled test rig.",
      expectedResult: "Only the first request succeeds; subsequent concurrent requests fail with HTTP 400/401 and trigger automatic token family revocation.",
      remediation: "Employ strict atomic database transactions or distributed locks (Redis Redlock) during token rotation.",
      references: [
        { name: "RFC 6749 - OAuth 2.0 Authorization Framework", url: "https://datatracker.ietf.org/doc/html/rfc6749", type: "RFC" }
      ]
    }
  },
  {
    slug: "broken-object-property-level-authorization",
    name: "Broken Object Property Level Authorization",
    shortDefinition: "Consolidates Mass Assignment and Excessive Data Exposure, occurring when an API exposes sensitive object fields or allows clients to alter protected attributes.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API3:2023 — Broken Object Property Level Authorization",
    cweClassification: "CWE-213: Exposure of Sensitive Information Due to Incompatible Policies (also CWE-915: Mass Assignment)",
    severity: "Contextual: Medium to High (Enables privilege escalation, unauthorized balance updates, or personal data harvesting)",
    difficulty: "Intermediate",
    rootCause: "Directly serializing entire database entities into responses (over-exposure) or blindly binding client JSON payloads to database ORM models (mass assignment).",
    whereTestersLook: "Registration endpoints, profile update APIs (`PATCH /api/users/me`), order creation payloads, and nested entity creation routes.",
    authorizedTestingMethodology: [
      "Capture the standard response of an endpoint to discover internal entity property names (e.g. `is_admin`, `role`, `account_balance`, `is_verified`).",
      "In a subsequent `POST` or `PATCH` request from an authorized standard account, supply extra properties in the request JSON: `{\"role\": \"admin\", \"is_verified\": true}`.",
      "Inspect the response and perform a subsequent GET request to check whether the protected attributes were updated."
    ],
    safeTestExample: {
      requestMethod: "PATCH",
      endpoint: "/api/v1/users/profile",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Content-Type": "application/json"
      },
      payload: {
        "display_name": "Test User",
        "is_admin": true,
        "subscription_tier": "enterprise"
      }
    },
    safeTestInput: {
      input: "{\"is_admin\": true}",
      purpose: "Verify whether the backend sanitizes and allowlists writable fields during model binding.",
      expectedSecureBehavior: "The server ignores non-allowlisted properties or returns HTTP 400 Bad Request with a schema validation error.",
      vulnerableBehaviorIndicators: [
        "The response confirms `is_admin: true` in the updated user object.",
        "The user account gains administrative access rights immediately."
      ]
    },
    evidenceToCollect: "Request payload containing injected keys and the corresponding response demonstrating modified object properties.",
    developerRemediation: "Utilize Data Transfer Objects (DTOs) with strict allowlisting for incoming requests. Apply explicit serialization schemas to strip internal attributes before sending responses.",
    preventionChecklist: [
      "Never pass untrusted client request bodies directly to ORM model update methods.",
      "Use schema validation libraries (e.g., Zod, Joi, Pydantic) to reject unknown keys.",
      "Audit API serialization logic to exclude password hashes, internal IDs, and PII."
    ],
    relatedVulnerabilities: [
      { name: "Mass Assignment", slug: "mass-assignment-api", category: "api-security" },
      { name: "Sensitive Data Exposure in APIs", slug: "sensitive-data-exposure-apis", category: "api-security" }
    ],
    references: [
      { name: "OWASP API3:2023 Broken Object Property Level Authorization", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "CWE-915: Improperly Controlled Modification of Dynamically-Determined Object Attributes", url: "https://cwe.mitre.org/data/definitions/915.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "unrestricted-resource-consumption",
    name: "Unrestricted Resource Consumption (Rate Limiting Flaws)",
    shortDefinition: "Occurs when an API fails to restrict the volume, frequency, or size of client requests, allowing resource exhaustion, DoS, or excessive cloud compute costs.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API4:2023 — Unrestricted Resource Consumption",
    cweClassification: "CWE-770: Allocation of Resources Without Limits or Throttling (also CWE-400: Uncontrolled Resource Consumption)",
    severity: "Contextual: Medium to High (Can cause service outages, severe financial depletion, or credential brute-forcing)",
    difficulty: "Beginner",
    rootCause: "Absence of rate limiting, missing payload size limits, unconstrained pagination limits (`?limit=1000000`), or heavy regex/compression operations without timeouts.",
    whereTestersLook: "Search endpoints, report generation APIs, file export routes, pagination parameters, and authentication endpoints.",
    authorizedTestingMethodology: [
      "Review response headers for standard rate limiting indicators (`RateLimit-Limit`, `RateLimit-Remaining`, `Retry-After`).",
      "In a controlled lab environment, test pagination parameters by requesting large page sizes: `?page=1&limit=50000`.",
      "Send small bursts of sequential requests (e.g. 20 requests) with a test account to observe whether HTTP 429 Too Many Requests is triggered.",
      "Observe backend latency changes when querying deeply nested or unindexed filter parameters."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/audit-logs?limit=10000&offset=0",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "?limit=10000",
      purpose: "Check if the API enforces a server-side maximum pagination ceiling.",
      expectedSecureBehavior: "The API clamps the limit to a safe server-side maximum (e.g., max 100 items) or returns HTTP 400 Bad Request.",
      vulnerableBehaviorIndicators: [
        "The API attempts to serialize all 10,000 records, resulting in massive response size and server CPU spikes.",
        "Absence of HTTP 429 response when sending high-frequency automated requests.",
        "Out-of-memory errors (HTTP 500) triggered by large query parameters."
      ]
    },
    evidenceToCollect: "Response timing metrics, response headers showing missing rate limits, and server error codes.",
    developerRemediation: "Implement global and per-tenant rate limiters using token bucket or sliding window algorithms in API gateways. Set hard maximum limits on pagination and file payload sizes.",
    preventionChecklist: [
      "Enforce hard max limits on pagination (e.g., `max_limit = 100`).",
      "Deploy gateway-level rate limiting by IP, user ID, and API key.",
      "Implement request payload body size limits (e.g., max 2MB)."
    ],
    references: [
      { name: "OWASP API4:2023 Unrestricted Resource Consumption", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "CWE-770: Allocation of Resources Without Limits or Throttling", url: "https://cwe.mitre.org/data/definitions/770.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "broken-function-level-authorization",
    name: "Broken Function Level Authorization (BFLA)",
    shortDefinition: "Flaws where an API endpoint fails to restrict administrative or sensitive functions to users possessing appropriate roles or permission groups.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API5:2023 — Broken Function Level Authorization",
    cweClassification: "CWE-285: Improper Authorization (also CWE-862: Missing Authorization)",
    severity: "Contextual: High to Critical (Grants standard users administrative controls or privileged action execution)",
    difficulty: "Beginner",
    rootCause: "Relying on frontend UI hiding of administrative buttons without validating user roles on backend administrative API endpoints.",
    whereTestersLook: "Administrative endpoints (`/api/admin/users`, `/api/v1/system/config`), HTTP verb manipulation (changing `GET /users/1` to `DELETE /users/1`), and hidden management routes.",
    authorizedTestingMethodology: [
      "Identify administrative functions through API documentation, OpenAPI/Swagger files, or administrative user sessions.",
      "Send a request to the administrative endpoint (`DELETE /api/v1/users/<LAB_USER_ID>`) using a standard non-admin test token.",
      "Verify whether the server rejects the request with HTTP 403 Forbidden or incorrectly processes the privileged action."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/admin/export-database",
      headers: {
        "Authorization": "Bearer <STANDARD_USER_TEST_TOKEN>",
        "Content-Type": "application/json"
      },
      payload: {
        "export_format": "json"
      }
    },
    safeTestInput: {
      input: "<STANDARD_USER_TEST_TOKEN> presented to /api/v1/admin/*",
      purpose: "Verify role-based access control (RBAC) enforcement on administrative endpoints.",
      expectedSecureBehavior: "HTTP 403 Forbidden with zero administrative side effects.",
      vulnerableBehaviorIndicators: [
        "HTTP 200 OK returned with administrative system data.",
        "Administrative state changes executed by standard accounts."
      ]
    },
    evidenceToCollect: "Authenticated non-admin request paired with HTTP 200 response demonstrating execution of privileged actions.",
    developerRemediation: "Implement robust Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC) middleware on every privileged API route. Deny access by default.",
    preventionChecklist: [
      "Apply default-deny access control policies across all administrative routes.",
      "Never rely on client-side routing guards to protect administrative features.",
      "Regularly audit OpenAPI definitions for unprotected administrative endpoints."
    ],
    references: [
      { name: "OWASP API5:2023 Broken Function Level Authorization", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "CWE-285: Improper Authorization", url: "https://cwe.mitre.org/data/definitions/285.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "server-side-request-forgery-api",
    name: "Server-Side Request Forgery (SSRF) in APIs",
    shortDefinition: "Occurs when an API endpoint fetches a remote resource based on a user-supplied URI without validating or restricting the target destination.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Multiple",
    owaspClassification: "OWASP API6:2023 — Server-Side Request Forgery",
    cweClassification: "CWE-918: Server-Side Request Forgery (SSRF)",
    severity: "Contextual: High to Critical (Can leak cloud metadata tokens, scan internal microservices, or bypass firewalls)",
    difficulty: "Intermediate",
    rootCause: "The API backend accepts user-controlled URLs (e.g. webhooks, avatar imports, file URLs) and makes backend HTTP requests without restricting internal IP ranges or private hostnames.",
    whereTestersLook: "Webhook registration endpoints (`POST /api/webhooks`), URL import parameters (`?import_url=...`), PDF generators, and image thumbnailers.",
    authorizedTestingMethodology: [
      "Identify API parameters that accept remote URLs (e.g., `callback_url`, `webhook_url`).",
      "Supply a controlled testing callback URL (e.g., an internal lab collaborator server: `<CONTROLLED_CALLBACK_URL>`).",
      "Check whether the API initiates an outbound connection to the controlled listener and observe the User-Agent and network origin.",
      "Test loopback / private IP filtering with safe test inputs (`http://127.0.0.1:8080` in a dedicated isolated lab) to verify whether internal addresses are blocked."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/integrations/webhook",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Content-Type": "application/json"
      },
      payload: {
        "endpoint_url": "https://<CONTROLLED_CALLBACK_URL>/api/test-listener",
        "event": "order.created"
      }
    },
    safeTestInput: {
      input: "https://<CONTROLLED_CALLBACK_URL>/api/test-listener",
      purpose: "Determine if the server-side webhook dispatcher safely validates target destinations.",
      expectedSecureBehavior: "The server resolves DNS, checks against private IPv4/IPv6 ranges (e.g., 10.0.0.0/8, 127.0.0.0/8, 169.254.169.254, 192.168.0.0/16), and blocks connections to internal resources.",
      vulnerableBehaviorIndicators: [
        "Backend sends requests to localhost or private cloud metadata services.",
        "Internal service responses mirrored back in API error messages."
      ]
    },
    evidenceToCollect: "Outbound HTTP connection logs from your controlled lab listener verifying the server-side source IP.",
    developerRemediation: "Validate and sanitize all user-supplied URLs. Resolve DNS and disallow private and loopback IP ranges before opening connections. Disable HTTP redirects on outbound clients.",
    preventionChecklist: [
      "Use dedicated network egress proxies for third-party webhook dispatchers.",
      "Block requests to cloud metadata endpoints (e.g., 169.254.169.254).",
      "Disable unnecessary URL schemes (e.g. `file://`, `gopher://`, `dict://`)."
    ],
    references: [
      { name: "OWASP API6:2023 Server Side Request Forgery", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "CWE-918: Server-Side Request Forgery", url: "https://cwe.mitre.org/data/definitions/918.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced SSRF: DNS Rebinding & Protocol Smuggling Protections",
      prerequisiteKnowledge: "Understanding of DNS TTL resolution, socket connection lifecycles, and cloud IMDSv2 tokens.",
      authorizedTargetRequirement: "Authorized cloud sandbox with simulated metadata services.",
      affectedTechnology: "Node.js Axios, Python Requests, Go HTTP Client, and Java HttpURLConnection.",
      exactObjective: "Analyze whether the application validates DNS at validation time but re-resolves DNS at connection time (Time-of-Check to Time-of-Use DNS Rebinding).",
      methodology: "Simulate dual-A record DNS responses with 0s TTL in a private lab to assess socket-level IP pinning.",
      expectedResult: "Socket connect calls pin the validated IP address directly, preventing rebinding to internal addresses.",
      remediation: "Implement custom HTTP transport dialers that validate the resolved IP immediately before the TCP socket handshake.",
      references: [
        { name: "OWASP SSRF Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html", type: "OWASP" }
      ]
    }
  },
  {
    slug: "security-misconfiguration-apis",
    name: "Security Misconfiguration in APIs",
    shortDefinition: "Improperly configured API gateways, missing security headers, enabled debugging modes, verbose stack traces, or permissive CORS configurations.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API7:2023 — Security Misconfiguration",
    cweClassification: "CWE-16: Configuration",
    severity: "Contextual: Medium to High (Leaks infrastructure secrets or facilitates cross-origin data theft)",
    difficulty: "Beginner",
    rootCause: "Leaving default credentials active, enabling development error handlers in production, missing CORS controls, or permitting unencrypted plain HTTP transport.",
    whereTestersLook: "HTTP response headers, error pages, unhandled exception outputs, API gateway headers, and CORS preflight options.",
    authorizedTestingMethodology: [
      "Send malformed JSON payloads (e.g. unclosed brackets `{\"data\": `) to trigger error handlers.",
      "Check whether the server returns detailed stack traces, internal file paths, or framework version numbers.",
      "Send an `OPTIONS` request with custom `Origin: https://evil.example` to inspect `Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials` headers.",
      "Verify whether unsupported HTTP verbs (e.g., `TRACE`, `HEAD`, `TRACK`) are enabled."
    ],
    safeTestExample: {
      requestMethod: "OPTIONS",
      endpoint: "/api/v1/users/me",
      headers: {
        "Origin": "https://test-untrusted-origin.local",
        "Access-Control-Request-Method": "GET"
      },
      payload: null
    },
    safeTestInput: {
      input: "Origin: https://test-untrusted-origin.local",
      purpose: "Determine whether the API dynamically reflects arbitrary origins with credential support.",
      expectedSecureBehavior: "The API rejects untrusted origins or returns strict allowlisted origins without `Access-Control-Allow-Credentials: true`.",
      vulnerableBehaviorIndicators: [
        "Response returns `Access-Control-Allow-Origin: https://test-untrusted-origin.local` and `Access-Control-Allow-Credentials: true`.",
        "Verbose stack traces containing database queries and server environment paths."
      ]
    },
    evidenceToCollect: "Raw HTTP responses showing stack traces, debug banners, or permissive CORS response headers.",
    developerRemediation: "Disable debug modes and detailed stack traces in production. Enforce strict CORS allowlists. Configure automated hardening benchmarks for API gateways.",
    preventionChecklist: [
      "Return uniform generic error messages (e.g. `{\"error\": \"Internal Server Error\", \"code\": \"ERR_500\"}`).",
      "Deploy Content Security Policy and security headers on API responses.",
      "Regularly run automated configuration linting in CI/CD pipelines."
    ],
    references: [
      { name: "OWASP API7:2023 Security Misconfiguration", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "CWE-16: Configuration", url: "https://cwe.mitre.org/data/definitions/16.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "lack-of-protection-from-automated-threats",
    name: "Lack of Protection from Automated Threats",
    shortDefinition: "Failure of an API to identify and mitigate automated business-logic abuse such as credential stuffing, inventory hoarding, or large-scale data scraping.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API8:2023 — Lack of Protection from Automated Threats",
    cweClassification: "CWE-799: Improper Control of Interaction Frequency",
    severity: "Contextual: Medium to High (Enables mass scraping, account takeover, and automated scalping)",
    difficulty: "Intermediate",
    rootCause: "APIs exposing critical business functions without device fingerprinting, behavioral analysis, CAPTCHAs, or sequence verification.",
    whereTestersLook: "Account creation endpoints, ticket/inventory reservation APIs, coupon redemption endpoints, and public search/lookup APIs.",
    authorizedTestingMethodology: [
      "Test if repetitive sequential automated requests with rotated User-Agents trigger anti-bot mitigations.",
      "Check if critical multi-step workflows (e.g. cart checkout) can be executed in a single API call without intermediate state verification.",
      "Verify whether sensitive public endpoints enforce proof-of-work or challenge tokens."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/coupons/redeem",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Content-Type": "application/json"
      },
      payload: {
        "coupon_code": "PROMO_<TEST_CODE>"
      }
    },
    safeTestInput: {
      input: "Automated test script sending 50 sequential coupon attempts",
      purpose: "Check if the API detects high-velocity non-human business flow execution.",
      expectedSecureBehavior: "API returns challenge or temporarily throttles client session after successive failed attempts.",
      vulnerableBehaviorIndicators: [
        "Unrestricted coupon guessing or inventory reservation without human-interaction verification.",
        "Absence of bot protection headers or rate anomalies."
      ]
    },
    evidenceToCollect: "Transaction logs showing rapid execution of business logic flows without server throttling.",
    developerRemediation: "Integrate bot management solutions, CAPTCHA challenges on sensitive actions, and implement strict multi-step business logic state machines.",
    preventionChecklist: [
      "Implement client telemetry and behavioral anomaly detection.",
      "Enforce step-by-step transaction tokens for critical checkout flows.",
      "Rate-limit sensitive actions per user, per device, and per IP."
    ],
    references: [
      { name: "OWASP API8:2023 Lack of Protection from Automated Threats", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "OWASP Automated Threat Handbook", url: "https://owasp.org/www-project-automated-threats-to-web-applications/", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "improper-inventory-management-apis",
    name: "Improper Inventory Management (Shadow & Zombie APIs)",
    shortDefinition: "Exposing deprecated, unpatched, or undocumented API versions (Zombie APIs) and unmanaged endpoints (Shadow APIs) lacking modern security controls.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API9:2023 — Improper Inventory Management",
    cweClassification: "CWE-1059: Incomplete Documentation (also CWE-284)",
    severity: "Contextual: Medium to Critical (Legacy endpoints frequently lack authentication or rate limiting)",
    difficulty: "Beginner",
    rootCause: "Leaving older API versions (e.g. `/api/v1/`) active when `/api/v2/` is released, or deploying staging endpoints without decommissioning older vulnerable versions.",
    whereTestersLook: "URL version paths (`/api/v1/`, `/api/v2/`, `/api/beta/`, `/api/test/`, `/api/staging/`), OpenAPI/Swagger historical specs, and legacy subdomains.",
    authorizedTestingMethodology: [
      "Inspect current API endpoints and test whether predecessor versions exist (e.g. changing `/api/v3/users` to `/api/v1/users`).",
      "Check whether older versions enforce the same authentication and authorization controls as the current production version.",
      "Verify if staging, test, or developer endpoints are accessible from public networks without VPN restrictions."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/users/me",
      headers: {
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "Accessing legacy /api/v1/ route without auth tokens",
      purpose: "Verify whether decommissioned API versions are disabled and return HTTP 404/410.",
      expectedSecureBehavior: "The API responds with HTTP 404 Not Found or HTTP 410 Gone.",
      vulnerableBehaviorIndicators: [
        "Legacy endpoint responds with live user data while missing modern authentication checks.",
        "Unauthenticated access permitted on `/api/v1/` that was patched in `/api/v2/`."
      ]
    },
    evidenceToCollect: "Comparative HTTP responses between current version (enforcing auth) and legacy version (permitting access).",
    developerRemediation: "Maintain an automated, authoritative API catalog using OpenAPI specifications. Retire and decommission old API versions with explicit sunset schedules (HTTP 410 Gone).",
    preventionChecklist: [
      "Establish centralized API gateways that route strictly approved API versions.",
      "Implement automated API discovery and inventory scanning in CI/CD.",
      "Enforce network segmentation to prevent staging APIs from being exposed to public networks."
    ],
    references: [
      { name: "OWASP API9:2023 Improper Inventory Management", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "NIST Special Publication 800-204 Security Strategies for Microservices", url: "https://csrc.nist.gov/publications/detail/sp/800-204/final", type: "NIST" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "unsafe-consumption-of-apis",
    name: "Unsafe Consumption of Third-Party APIs",
    shortDefinition: "Occurs when backend services blindly trust data received from third-party APIs without sanitization, validation, or secure transport enforcement.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API10:2023 — Unsafe Consumption of APIs",
    cweClassification: "CWE-20: Improper Input Validation (also CWE-345: Insufficient Verification of Data Authenticity)",
    severity: "Contextual: Medium to High (Third-party data compromises internal services via injection or trust exploitation)",
    difficulty: "Intermediate",
    rootCause: "Assuming external services or partner APIs are secure, leading to unvalidated SQL queries, command execution, or improper SSL verification on egress traffic.",
    whereTestersLook: "Payment gateway callback handlers, CRM integration endpoints, partner webhook ingestion routes, and social media feed aggregators.",
    authorizedTestingMethodology: [
      "In a staging environment with a mock third-party service, supply unusual inputs (special characters, large payloads, malformed JSON) in external response fields.",
      "Check if the receiving backend microservice validates and sanitizes incoming data before storing it or querying internal databases.",
      "Verify whether egress connections to third-party APIs enforce strict TLS certificate validation."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/integrations/partner-sync",
      headers: {
        "Authorization": "Bearer <TEST_PARTNER_KEY>",
        "Content-Type": "application/json"
      },
      payload: {
        "partner_transaction_id": "<TEST_TXN_ID>' OR '1'='1",
        "status": "COMPLETED"
      }
    },
    safeTestInput: {
      input: "<TEST_TXN_ID>' OR '1'='1",
      purpose: "Determine if third-party data is treated as untrusted input and properly parameterized.",
      expectedSecureBehavior: "The backend schema validator rejects non-conforming transaction ID formats with HTTP 400 Bad Request.",
      vulnerableBehaviorIndicators: [
        "Internal database error or SQL syntax exception triggered by third-party data fields.",
        "Unvalidated redirects or SSRF executed based on third-party URL parameters."
      ]
    },
    evidenceToCollect: "Backend error logs demonstrating improper handling of external API responses.",
    developerRemediation: "Treat all external and partner API data as untrusted. Validate all incoming fields against strict schemas. Implement mutual TLS (mTLS) and timeout controls on egress connections.",
    preventionChecklist: [
      "Apply strict input validation to all data received from external integrations.",
      "Enforce TLS certificate verification for all outbound HTTP clients.",
      "Set aggressive connection and read timeouts on third-party API calls."
    ],
    references: [
      { name: "OWASP API10:2023 Unsafe Consumption of APIs", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "CWE-20: Improper Input Validation", url: "https://cwe.mitre.org/data/definitions/20.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "jwt-implementation-weaknesses",
    name: "JWT Implementation Weaknesses",
    shortDefinition: "Vulnerabilities in JSON Web Token validation such as algorithm confusion (RS256 vs HS256), accepting the 'none' algorithm, or weak HMAC secret keys.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API2:2023 — Broken Authentication",
    cweClassification: "CWE-347: Improper Verification of Cryptographic Signature (also CWE-327: Use of a Broken or Risky Cryptographic Algorithm)",
    severity: "Contextual: High to Critical (Directly allows token forgery and unauthorized administrative access)",
    difficulty: "Intermediate",
    rootCause: "Misconfigured JWT libraries that trust client-supplied `alg` header parameters, fail to enforce signature verification, or use easily brute-forced HMAC secrets.",
    whereTestersLook: "`Authorization: Bearer <TOKEN>` headers, JWT `alg` and `kid` headers, and token issuance endpoints.",
    authorizedTestingMethodology: [
      "Decode the test JWT header and payload to inspect claims (`sub`, `role`, `exp`).",
      "Test 'none' algorithm handling: set `\"alg\": \"none\"` in the token header, remove the signature, and submit to an authorized test endpoint in a lab.",
      "Test key confusion (RS256 public key as HS256 secret) in a lab environment if asymmetric keys are used.",
      "Verify whether expired tokens (where `exp` is in the past) are strictly rejected."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/user/profile",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiI8TEFCX1VTRVJfSUQ+Iiwicm9sZSI6InVzZXIifQ.",
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "JWT with alg=none and stripped signature",
      purpose: "Verify whether the JWT verification middleware rejects unsigned tokens.",
      expectedSecureBehavior: "HTTP 401 Unauthorized with error indicating invalid signature.",
      vulnerableBehaviorIndicators: [
        "HTTP 200 OK returned and claims processed without signature verification.",
        "Expired tokens accepted without HTTP 401 response."
      ]
    },
    evidenceToCollect: "Token header structure and HTTP 200 response demonstrating acceptance of forged token claims.",
    developerRemediation: "Explicitly allowlist accepted algorithms (e.g. only RS256) on verification servers. Never trust the `alg` header from incoming tokens. Enforce expiration checks.",
    preventionChecklist: [
      "Hardcode expected verification algorithm in JWT library configuration.",
      "Use strong asymmetric keys (RSA 2048+ bit or ECDSA P-256).",
      "Reject tokens missing valid expiration (`exp`) claims."
    ],
    references: [
      { name: "RFC 7519 - JSON Web Token (JWT)", url: "https://datatracker.ietf.org/doc/html/rfc7519", type: "RFC" },
      { name: "CWE-347: Improper Verification of Cryptographic Signature", url: "https://cwe.mitre.org/data/definitions/347.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced JWT Key Injection (JKU / JWK / KID Traversal) Testing",
      prerequisiteKnowledge: "Understanding of JSON Web Key Sets (JWKS), OpenID Connect discovery endpoints, and header parameter verification.",
      authorizedTargetRequirement: "Staging microservices lab utilizing federated identity.",
      affectedTechnology: "OAuth 2.0 Identity Providers, Kong/Envoy API gateways, and custom JWT middleware.",
      exactObjective: "Assess whether the token verification engine blindly fetches keys from untrusted `jku` URLs or allows path traversal in `kid` parameters.",
      methodology: "Inject a lab-controlled JWKS URL in the `jku` header and observe if the resource server makes outbound requests or validates the domain allowlist.",
      expectedResult: "The server rejects unapproved JWKS URLs and enforces strict static key IDs without evaluating SQL/filesystem lookups.",
      remediation: "Disable remote JWKS resolution from unapproved client headers; configure static or pre-approved identity provider discovery URLs.",
      references: [
        { name: "RFC 7517 - JSON Web Key (JWK)", url: "https://datatracker.ietf.org/doc/html/rfc7517", type: "RFC" }
      ]
    }
  },
  {
    slug: "token-replay-session-issues",
    name: "Token Replay & Session Revocation Issues",
    shortDefinition: "Failure of API servers to revoke access tokens upon user logout, password reset, or privilege changes, allowing intercepted tokens to remain indefinitely valid.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API2:2023 — Broken Authentication",
    cweClassification: "CWE-294: Authentication Bypass by Capture-replay (also CWE-613: Insufficient Session Expiration)",
    severity: "Contextual: Medium to High (Enables persistent unauthorized access after credential changes)",
    difficulty: "Beginner",
    rootCause: "Stateless JWT architectures where resource servers do not query a revocation blocklist or validate session status against a centralized store.",
    whereTestersLook: "Logout endpoints (`POST /api/auth/logout`), password change flows, and session management settings.",
    authorizedTestingMethodology: [
      "Authenticate with a test account and obtain a valid token: `<TEST_TOKEN>`.",
      "Perform a normal logout request via the official endpoint.",
      "Send a subsequent authenticated request to a protected API endpoint using the original `<TEST_TOKEN>`.",
      "Verify whether the server returns HTTP 401 Unauthorized or still processes the request."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/user/account-summary",
      headers: {
        "Authorization": "Bearer <LOGGED_OUT_TEST_TOKEN>",
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "<LOGGED_OUT_TEST_TOKEN>",
      purpose: "Check if the API enforces server-side session termination upon logout.",
      expectedSecureBehavior: "HTTP 401 Unauthorized indicating the token is revoked.",
      vulnerableBehaviorIndicators: [
        "HTTP 200 OK returned with account data after logout.",
        "Old tokens remain valid after a password change event."
      ]
    },
    evidenceToCollect: "Timestamped logs showing successful authenticated request occurring after a completed logout request.",
    developerRemediation: "Implement short-lived access tokens (e.g. 5–15 minutes) combined with a distributed token revocation store (e.g. Redis blocklist) for immediate invalidation.",
    preventionChecklist: [
      "Invalidate all active refresh tokens upon password resets.",
      "Implement token versioning or timestamp checks in user records.",
      "Keep access token lifespans strictly limited."
    ],
    references: [
      { name: "OWASP Session Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-613: Insufficient Session Expiration", url: "https://cwe.mitre.org/data/definitions/613.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "oauth-oidc-configuration-issues",
    name: "OAuth 2.0 & OIDC Misconfigurations",
    shortDefinition: "Implementation weaknesses in OAuth 2.0 authorization grants, such as unvalidated redirect URIs, missing state parameters (CSRF), or improper scope validation.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Web",
    owaspClassification: "OWASP API2:2023 — Broken Authentication",
    cweClassification: "CWE-287: Improper Authentication (also CWE-601: Open Redirect)",
    severity: "Contextual: High to Critical (Can leak authorization codes or access tokens to unauthorized third parties)",
    difficulty: "Intermediate",
    rootCause: "Loose regex matching on `redirect_uri`, omitting the `state` parameter, or failing to enforce PKCE (Proof Key for Code Exchange) on public clients.",
    whereTestersLook: "OAuth authorization endpoints (`/oauth/authorize`), token exchange endpoints (`/oauth/token`), and callback handlers.",
    authorizedTestingMethodology: [
      "Inspect the authorization URL for the presence and randomness of the `state` parameter.",
      "Test redirect URI validation by modifying `redirect_uri=https://authorized.example.com` to `https://authorized.example.com.attacker.local` or path traversals.",
      "Check if public clients (mobile / SPA) enforce PKCE (`code_challenge` and `code_verifier`).",
      "Verify whether authorization codes can be reused multiple times."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/oauth/authorize?client_id=<TEST_CLIENT_ID>&response_type=code&redirect_uri=https://authorized-lab.example/callback&scope=read:profile",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "redirect_uri=https://unregistered-domain.local/callback",
      purpose: "Determine whether the OAuth authorization server enforces strict exact-match redirect URI allowlisting.",
      expectedSecureBehavior: "The server rejects the request with an `invalid_redirect_uri` error without displaying the consent screen.",
      vulnerableBehaviorIndicators: [
        "Authorization code forwarded to unverified domains.",
        "Authorization flow succeeds when omitting the `state` parameter."
      ]
    },
    evidenceToCollect: "Server error response or redirect response capturing the authorization code parameter.",
    developerRemediation: "Require exact full-string matching for redirect URIs. Mandate cryptographically random `state` parameters. Enforce PKCE (RFC 7636) for all OAuth clients.",
    preventionChecklist: [
      "Disallow wildcard redirect URIs.",
      "Expire authorization codes within 60 seconds of issuance and enforce single-use.",
      "Require PKCE for all Single Page Applications (SPAs) and mobile apps."
    ],
    references: [
      { name: "RFC 6749 - The OAuth 2.0 Authorization Framework", url: "https://datatracker.ietf.org/doc/html/rfc6749", type: "RFC" },
      { name: "RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients (PKCE)", url: "https://datatracker.ietf.org/doc/html/rfc7636", type: "RFC" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "graphql-security-issues",
    name: "GraphQL Security Weaknesses (Introspection & Depth Abuse)",
    shortDefinition: "Flaws in GraphQL implementations including enabled introspection in production, lack of query depth/cost limiting, and missing field-level authorization.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API4:2023 & API5:2023",
    cweClassification: "CWE-400: Uncontrolled Resource Consumption (also CWE-285: Improper Authorization)",
    severity: "Contextual: Medium to High (Enables complete schema discovery, server DoS, or unauthorized field access)",
    difficulty: "Intermediate",
    rootCause: "GraphQL's single-endpoint design (`/graphql`) executing complex nested queries without query complexity limits or field-level authorization resolvers.",
    whereTestersLook: "`/graphql`, `/api/graphql`, `/v1/graphql`, schema introspection queries, and batch query arrays.",
    authorizedTestingMethodology: [
      "Send a standard schema introspection query (`{ __schema { types { name } } }`) to determine whether schema discovery is exposed.",
      "Test query depth limiting by sending deeply nested cyclical queries (`user { posts { author { posts { author { id } } } } }`).",
      "Verify field-level authorization by querying sensitive fields (e.g. `salary`, `ssn`, `internalNotes`) with a standard non-admin account.",
      "Test batch query execution: send an array of 50 queries in a single HTTP POST to observe backend resource impact."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/graphql",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer <TEST_TOKEN>"
      },
      payload: {
        "query": "{ __schema { queryType { name } } }"
      }
    },
    safeTestInput: {
      input: "{ __schema { queryType { name } } }",
      purpose: "Check if GraphQL schema introspection is disabled in production environments.",
      expectedSecureBehavior: "HTTP 400 Bad Request with error stating introspection is disabled.",
      vulnerableBehaviorIndicators: [
        "Full schema types, mutations, and internal queries returned in JSON response.",
        "Server timeout or high CPU load caused by deeply nested cyclical queries."
      ]
    },
    evidenceToCollect: "GraphQL response containing schema definitions or server timeout logs caused by nested queries.",
    developerRemediation: "Disable introspection in production. Implement query depth limiting (e.g. max depth 5) and query cost analysis. Enforce authorization checks in every field resolver.",
    preventionChecklist: [
      "Disable schema introspection in non-development environments.",
      "Use depth limiting middleware (e.g., `graphql-depth-limit`).",
      "Implement query allowlisting (persisted queries) for production clients."
    ],
    references: [
      { name: "OWASP GraphQL Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html", type: "OWASP" },
      { name: "PortSwigger GraphQL API Vulnerabilities", url: "https://portswigger.net/web-security/graphql", type: "PortSwigger" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced GraphQL Batching & Directive Abuse Testing",
      prerequisiteKnowledge: "Understanding of GraphQL AST parsing, field resolver execution trees, and DataLoader batch caching.",
      authorizedTargetRequirement: "Staging GraphQL cluster with instrumented performance monitoring.",
      affectedTechnology: "Apollo Server, GraphQL-Java, Hasura, and Yoga.",
      exactObjective: "Evaluate if batched aliases (`a1: user(id:1), a2: user(id:2)...`) bypass standard HTTP rate limiters and exhaust backend database connections.",
      methodology: "Construct alias-multiplexed queries in a test rig to observe database connection pool saturation.",
      expectedResult: "Query complexity analyzers calculate aggregated field cost before execution and reject excessive complexity with HTTP 400.",
      remediation: "Deploy static query cost calculation middleware that caps total field score per request.",
      references: [
        { name: "OWASP GraphQL Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html", type: "OWASP" }
      ]
    }
  },
  {
    slug: "api-origin-cors-configuration-issues",
    name: "API Origin & CORS Misconfigurations",
    shortDefinition: "Improper Cross-Origin Resource Sharing (CORS) configurations on API endpoints that allow untrusted web applications to execute authenticated cross-origin requests.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Web",
    owaspClassification: "OWASP API7:2023 — Security Misconfiguration",
    cweClassification: "CWE-942: Permissive Cross-domain Policy with Untrusted Domains",
    severity: "Contextual: High (Allows malicious websites to read sensitive API responses on behalf of authenticated victims)",
    difficulty: "Beginner",
    rootCause: "Dynamically echoing the request `Origin` header in `Access-Control-Allow-Origin` combined with `Access-Control-Allow-Credentials: true` or using flawed regex matching.",
    whereTestersLook: "All authenticated API endpoints returning JSON data, tested via HTTP `Origin` headers.",
    authorizedTestingMethodology: [
      "Send a request to a sensitive API endpoint with `Origin: https://untrusted-test.local`.",
      "Check if the server reflects `Access-Control-Allow-Origin: https://untrusted-test.local`.",
      "Verify whether `Access-Control-Allow-Credentials: true` is also present.",
      "Test null origin handling: `Origin: null`."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/user/billing-details",
      headers: {
        "Origin": "https://test-cors-origin.local",
        "Authorization": "Bearer <TEST_TOKEN>"
      },
      payload: null
    },
    safeTestInput: {
      input: "Origin: https://test-cors-origin.local",
      purpose: "Check if the API allows arbitrary untrusted origins with credentials.",
      expectedSecureBehavior: "The API omits CORS headers or returns a strict static allowlisted domain.",
      vulnerableBehaviorIndicators: [
        "Server reflects the untrusted origin in `Access-Control-Allow-Origin` alongside `Access-Control-Allow-Credentials: true`."
      ]
    },
    evidenceToCollect: "HTTP response headers showing reflected origin and credential authorization flags.",
    developerRemediation: "Implement a strict static allowlist of trusted origins. Never dynamically reflect arbitrary request origins when credentials are supported.",
    preventionChecklist: [
      "Avoid `Access-Control-Allow-Origin: *` on endpoints returning private data.",
      "Never trust the `null` origin.",
      "Use centralized CORS middleware with validated origin arrays."
    ],
    references: [
      { name: "OWASP CORS Origin Header Scrutiny", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Origin_Resource_Sharing_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-942: Permissive Cross-domain Policy with Untrusted Domains", url: "https://cwe.mitre.org/data/definitions/942.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "api-key-exposure-in-clients",
    name: "API Key Exposure in Client Applications",
    shortDefinition: "Embedding private backend API secret keys, signing tokens, or administrative credentials inside client-side JavaScript, mobile binaries, or public repositories.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Mobile / Web",
    owaspClassification: "OWASP API2:2023 & OWASP M9:2024",
    cweClassification: "CWE-798: Use of Hard-coded Credentials",
    severity: "Contextual: High to Critical (Directly exposes cloud infrastructure, paid API quotas, or administrative backends)",
    difficulty: "Beginner",
    rootCause: "Developers assuming client-side code (frontend bundles or mobile APKs) is private and hardcoding backend API keys instead of routing through a secure backend proxy.",
    whereTestersLook: "Client JavaScript source bundles (`main.js`, `.env` leaks), decompiled mobile APK resources (`strings.xml`), and public GitHub commits.",
    authorizedTestingMethodology: [
      "Review client-side bundle assets using browser developer tools and search for token keywords (`apiKey`, `secret`, `aws_key`, `authorization`).",
      "Check whether discovered keys possess write or administrative capabilities by reviewing documentation or testing in an isolated lab.",
      "Verify whether the API key is restricted by IP, domain, or HTTP referer."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/internal/config",
      headers: {
        "X-API-Key": "<TEST_DISCOVERED_KEY>"
      },
      payload: null
    },
    safeTestInput: {
      input: "<TEST_DISCOVERED_KEY>",
      purpose: "Assess the permission scope of exposed client keys.",
      expectedSecureBehavior: "Client keys possess minimal read-only public permissions; private secrets are kept exclusively on backend servers.",
      vulnerableBehaviorIndicators: [
        "Exposed key permits unrestricted database modifications or administrative user creation.",
        "Unrestricted cloud service credentials embedded in frontend code."
      ]
    },
    evidenceToCollect: "Source file excerpt demonstrating hardcoded credentials paired with API response confirming key validity.",
    developerRemediation: "Never store private API keys in client-side code. Use backend proxies (Backend For Frontend - BFF pattern) to inject secrets securely on server-side requests.",
    preventionChecklist: [
      "Use secret scanners (e.g., git-secrets, Trufflehog) in pre-commit hooks.",
      "Restrict cloud API keys by HTTP referer, IP range, and specific API scopes.",
      "Rotate compromised keys immediately upon discovery."
    ],
    references: [
      { name: "CWE-798: Use of Hard-coded Credentials", url: "https://cwe.mitre.org/data/definitions/798.html", type: "MITRE" },
      { name: "OWASP Secrets Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "sensitive-data-exposure-apis",
    name: "Sensitive Data Exposure in APIs",
    shortDefinition: "APIs returning complete data objects containing PII, password hashes, or internal business identifiers, relying on the client to filter what is displayed.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API3:2023 — Broken Object Property Level Authorization",
    cweClassification: "CWE-213: Exposure of Sensitive Information",
    severity: "Contextual: High (Enables data harvesting, privacy violations, and credential compromise)",
    difficulty: "Beginner",
    rootCause: "Generic backend queries (`SELECT *`) serialized directly into JSON responses without property filtering or data transformation layers.",
    whereTestersLook: "User profile endpoints (`/api/users`), search result objects, team member lists, and order transaction responses.",
    authorizedTestingMethodology: [
      "Send standard requests to list or retrieve resources using an authorized test account.",
      "Analyze the complete JSON response payload using an HTTP proxy.",
      "Check for properties not displayed in the UI, such as `password_hash`, `social_security_number`, `home_address`, `internal_notes`, or `payment_tokens`."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/users/public-profile/<LAB_USER_ID>",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "Normal GET request to public profile endpoint",
      purpose: "Inspect the raw JSON payload for non-public sensitive fields.",
      expectedSecureBehavior: "The API response contains only public profile fields (e.g. `username`, `avatar_url`).",
      vulnerableBehaviorIndicators: [
        "Response contains internal properties (`email_verified`, `billing_address`, `password_salt`, `role_id`)."
      ]
    },
    evidenceToCollect: "Full JSON response payload demonstrating over-exposed data fields.",
    developerRemediation: "Implement response Data Transfer Objects (DTOs) or serialization filters to explicitly define which fields are included in external responses.",
    preventionChecklist: [
      "Avoid `SELECT *` in database queries supporting API endpoints.",
      "Define strict public serialization view schemas.",
      "Implement automated API response scanners to detect PII leakage."
    ],
    references: [
      { name: "OWASP API3:2023 Broken Object Property Level Authorization", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "CWE-213: Exposure of Sensitive Information", url: "https://cwe.mitre.org/data/definitions/213.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "improper-error-handling-apis",
    name: "Improper Error Handling & Information Leakage in APIs",
    shortDefinition: "API endpoints disclosing stack traces, database schema details, framework versions, or internal IP addresses when handling unexpected inputs.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API7:2023 — Security Misconfiguration",
    cweClassification: "CWE-209: Generation of Error Message Containing Sensitive Information",
    severity: "Contextual: Low to Medium (Assists threat actors in tailoring subsequent injection or exploit payloads)",
    difficulty: "Beginner",
    rootCause: "Catching exceptions and serializing raw exception objects (e.g. `err.stack`, `SQLSTATE` errors) into HTTP responses.",
    whereTestersLook: "Malformed request endpoints, unexpected content-type headers, invalid data types (sending string for integer ID), and oversized payloads.",
    authorizedTestingMethodology: [
      "Send invalid data types (e.g., `{\"user_id\": \"abc\"}` where an integer is expected).",
      "Send malformed JSON payloads and inspect error structure.",
      "Check whether HTTP 500 error responses contain file paths, database query text, or server environment variables."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/orders/calculate",
      headers: {
        "Content-Type": "application/json"
      },
      payload: {
        "item_id": "INVALID_TYPE_STRING",
        "quantity": -1
      }
    },
    safeTestInput: {
      input: "{\"item_id\": \"INVALID_TYPE_STRING\"}",
      purpose: "Check if the application catches type conversion errors gracefully without leaking stack traces.",
      expectedSecureBehavior: "HTTP 400 Bad Request with a clean error message: `{\"error\": \"Invalid item_id format\"}`.",
      vulnerableBehaviorIndicators: [
        "HTTP 500 containing raw database query text or stack traces detailing internal source files."
      ]
    },
    evidenceToCollect: "Error response body showing internal application paths or framework debugging traces.",
    developerRemediation: "Implement centralized global exception handlers that log technical error details securely to internal monitoring tools while returning generic, sanitized error messages to clients.",
    preventionChecklist: [
      "Use global try-catch middleware with standardized error formats.",
      "Disable verbose error output in framework production configs.",
      "Assign unique request correlation IDs for debugging without leaking logs."
    ],
    references: [
      { name: "CWE-209: Generation of Error Message Containing Sensitive Information", url: "https://cwe.mitre.org/data/definitions/209.html", type: "MITRE" },
      { name: "OWASP Error Handling Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "improper-response-caching-apis",
    name: "Improper Response Caching & Cache Poisoning in APIs",
    shortDefinition: "Occurs when API responses containing sensitive user data lack appropriate `Cache-Control` headers, allowing shared proxies or CDNs to store and serve private records to unauthorized users.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Web",
    owaspClassification: "OWASP API7:2023 — Security Misconfiguration",
    cweClassification: "CWE-524: Use of Cache-Containing Sensitive Information (also CWE-444: Inconsistent Interpretation of HTTP Requests)",
    severity: "Contextual: Medium to High (Enables cache poisoning or leakage of private data via shared caches)",
    difficulty: "Intermediate",
    rootCause: "Omission of `Cache-Control: no-store, private` headers on authenticated API endpoints, or using unkeyed request headers in CDN cache key generators.",
    whereTestersLook: "HTTP response headers (`Cache-Control`, `Pragma`, `Vary`, `CF-Cache-Status`, `X-Cache`), especially on user profile, billing, and document retrieval routes.",
    authorizedTestingMethodology: [
      "Inspect response headers on authenticated endpoints returning personal user data.",
      "Verify whether `Cache-Control: no-store` or `Cache-Control: private, max-age=0` is present.",
      "Test CDN caching behavior in a staging environment to observe if identical requests from different client IPs receive cached responses containing another user's session data."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/user/payment-methods",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "Standard authenticated GET request",
      purpose: "Verify caching directives on authenticated API responses.",
      expectedSecureBehavior: "`Cache-Control: no-store, max-age=0` and `Pragma: no-cache` returned on all private data endpoints.",
      vulnerableBehaviorIndicators: [
        "Response returns `Cache-Control: public, max-age=3600` on endpoints containing user-specific data.",
        "Responses served with `X-Cache: HIT` to unauthenticated second clients."
      ]
    },
    evidenceToCollect: "HTTP response headers showing public cache directives alongside private user payloads.",
    developerRemediation: "Explicitly set `Cache-Control: no-store, no-cache, must-revalidate, private` on all endpoints handling authenticated or sensitive data. Configure CDN cache keys to include authorization headers.",
    preventionChecklist: [
      "Set default `Cache-Control: no-store` across all API gateway routes.",
      "Ensure CDNs do not cache responses bearing `Authorization` headers unless explicitly designed for public content.",
      "Audit `Vary` headers on dynamic multilingual or device-specific endpoints."
    ],
    references: [
      { name: "RFC 9111 - HTTP Caching", url: "https://datatracker.ietf.org/doc/html/rfc9111", type: "RFC" },
      { name: "CWE-524: Use of Cache-Containing Sensitive Information", url: "https://cwe.mitre.org/data/definitions/524.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "debug-test-endpoint-exposure-apis",
    name: "Debug & Swagger Endpoint Exposure in APIs",
    shortDefinition: "Public exposure of internal debugging consoles, Swagger/OpenAPI documentation, health probes with sensitive telemetry, or profiling endpoints.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API7:2023 — Security Misconfiguration",
    cweClassification: "CWE-489: Active Debug Code",
    severity: "Contextual: Low to High (Provides complete API map, testing payloads, or internal health secrets)",
    difficulty: "Beginner",
    rootCause: "Leaving framework testing packages (e.g., Spring Boot Actuator, Swagger UI, Flask DebugToolbar) enabled in production without authentication guards.",
    whereTestersLook: "`/swagger-ui.html`, `/api-docs`, `/openapi.json`, `/actuator/env`, `/actuator/heapdump`, `/_debug`, `/graphql/ide`.",
    authorizedTestingMethodology: [
      "Check common documentation and debug paths in an authorized testing scope.",
      "Verify whether discovered Swagger UI pages allow unauthenticated execution of administrative endpoints.",
      "Check whether actuator or metrics endpoints expose internal environment variables or cloud keys."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/actuator/env",
      headers: {
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "GET /actuator/env or GET /swagger-ui/index.html",
      purpose: "Determine if internal management or interactive test interfaces are publicly accessible.",
      expectedSecureBehavior: "HTTP 404 Not Found or HTTP 403 Forbidden with network-level restriction.",
      vulnerableBehaviorIndicators: [
        "Actuator endpoint dumps environment variables, database URLs, or system properties.",
        "Interactive Swagger UI allows unauthenticated testing of internal APIs."
      ]
    },
    evidenceToCollect: "HTTP response headers and response snippets demonstrating access to internal debug dashboards.",
    developerRemediation: "Disable debug tools, Swagger UI, and sensitive actuator endpoints in production build profiles. Restrict management endpoints to internal private networks.",
    preventionChecklist: [
      "Use environment-specific build configurations (disable debug in `production`).",
      "Protect documentation endpoints with enterprise SSO or IP allowlists.",
      "Review Spring Boot Actuator endpoint exposure (`management.endpoints.web.exposure.include=health`)."
    ],
    references: [
      { name: "CWE-489: Active Debug Code", url: "https://cwe.mitre.org/data/definitions/489.html", type: "MITRE" },
      { name: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "file-upload-issues-through-apis",
    name: "File Upload Weaknesses in REST & Multipart APIs",
    shortDefinition: "Vulnerabilities arising when APIs process uploaded files without validating file extensions, MIME types, file sizes, or storage locations, potentially leading to remote code execution or stored XSS.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Web",
    owaspClassification: "OWASP API7:2023 & OWASP Top 10 A04:2021",
    cweClassification: "CWE-434: Unrestricted Upload of File with Dangerous Type",
    severity: "Contextual: High to Critical (Can lead to server compromise if uploaded files are executed by the web server)",
    difficulty: "Intermediate",
    rootCause: "Trusting client-supplied `Content-Type` headers or file extensions and storing files directly in public web server document roots.",
    whereTestersLook: "Avatar upload endpoints (`POST /api/users/avatar`), document attachment APIs (`POST /api/documents`), and multipart form handlers.",
    authorizedTestingMethodology: [
      "Upload a safe test file containing benign text with mismatched extensions (e.g. `test.png.txt`).",
      "Verify whether the server validates magic bytes (file signature) rather than solely relying on client headers.",
      "Check whether the server renames uploaded files and stores them on an isolated storage domain (e.g. S3 bucket) with `Content-Disposition: attachment`."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/user/avatar",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
      },
      payload: "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"file\"; filename=\"safe_test.txt\"\r\nContent-Type: text/plain\r\n\r\nBENIGN_TEST_PAYLOAD\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--"
    },
    safeTestInput: {
      input: "Safe test text file uploaded to image-only avatar endpoint",
      purpose: "Verify server-side file type and magic byte validation.",
      expectedSecureBehavior: "The server rejects non-image files with HTTP 400 Bad Request: `{\"error\": \"Unsupported file format\"}`.",
      vulnerableBehaviorIndicators: [
        "Executable or script files stored directly in executable web directories.",
        "File served with executable MIME types without content disposition restrictions."
      ]
    },
    evidenceToCollect: "Upload response demonstrating file acceptance paired with retrieval URL confirming storage location.",
    developerRemediation: "Validate file magic bytes on the server. Store uploads in isolated object storage (e.g., AWS S3, Google Cloud Storage) with randomly generated filenames. Enforce strict `Content-Type` and `Content-Disposition: attachment` headers.",
    preventionChecklist: [
      "Never store user uploads in the web server's executable directory root.",
      "Generate new cryptographically random filenames for all stored uploads.",
      "Scan uploaded files with antivirus and content disarm tools."
    ],
    references: [
      { name: "OWASP File Upload Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-434: Unrestricted Upload of File with Dangerous Type", url: "https://cwe.mitre.org/data/definitions/434.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "injection-vulnerabilities-api-inputs",
    name: "Injection Vulnerabilities Through API Inputs",
    shortDefinition: "Occurs when untrusted data supplied in JSON bodies, headers, or query parameters is concatenated directly into SQL queries, NoSQL commands, OS shell commands, or ORM filters.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Multiple",
    owaspClassification: "OWASP API10:2023 & OWASP Top 10 A03:2021",
    cweClassification: "CWE-89: SQL Injection (also CWE-943: NoSQL Injection, CWE-78: OS Command Injection)",
    severity: "Contextual: High to Critical (Can allow full database exfiltration or server command execution)",
    difficulty: "Intermediate",
    rootCause: "Constructing interpreter queries via raw string concatenation instead of parameterized prepared statements or safe ORM abstractions.",
    whereTestersLook: "Search endpoints (`/api/search?q=`), sorting parameters (`?sort=price`), JSON filter objects (`{\"filter\": {\"$gt\": \"\"}}`), and export endpoints.",
    authorizedTestingMethodology: [
      "Test input fields with standard benign SQL syntax delimiters (e.g. single quote `'`, double quote `\"`) in a controlled lab.",
      "Observe if the API returns database syntax error messages (error-based detection).",
      "For NoSQL APIs, test if JSON object operators (e.g. `{\"username\": {\"$ne\": null}}`) alter query execution logic.",
      "Verify that all database interactions utilize parameterized queries."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/api/v1/products?search=<TEST_INPUT_TERM>'",
      headers: {
        "Accept": "application/json"
      },
      payload: null
    },
    safeTestInput: {
      input: "<TEST_INPUT_TERM>'",
      purpose: "Check if the API sanitizes single quotes or triggers unhandled SQL syntax errors.",
      expectedSecureBehavior: "The API treats the input as a literal search string, returning zero results or safe results without errors.",
      vulnerableBehaviorIndicators: [
        "HTTP 500 error containing SQL syntax error details (e.g. `syntax error near line 1`).",
        "Differential query logic execution based on boolean assertions."
      ]
    },
    evidenceToCollect: "HTTP response showing database error message or proof of altered query logic in a controlled test environment.",
    developerRemediation: "Always use parameterized queries (prepared statements) for relational databases. Use strict input validation and object typing to disallow operator injection in NoSQL databases.",
    preventionChecklist: [
      "Mandate parameterized queries across all database drivers.",
      "Disallow dynamic table or column name concatenation in SQL queries.",
      "Use schema validation to ensure string parameters cannot be submitted as nested JSON query objects."
    ],
    references: [
      { name: "OWASP SQL Injection Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-89: Improper Neutralization of Special Elements used in an SQL Command", url: "https://cwe.mitre.org/data/definitions/89.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "xml-xxe-in-xml-apis",
    name: "XML External Entity (XXE) in SOAP & XML REST APIs",
    shortDefinition: "Vulnerability in XML parsers that evaluate external entity references within user-supplied XML documents, allowing local file disclosure or SSRF.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Web",
    owaspClassification: "OWASP Top 10 A05:2021 — Security Misconfiguration",
    cweClassification: "CWE-611: Improper Restriction of XML External Entity Reference",
    severity: "Contextual: High to Critical (Can disclose sensitive server configuration files or initiate internal SSRF)",
    difficulty: "Intermediate",
    rootCause: "XML parser configurations that have Document Type Definitions (DTD) and external entity resolution enabled by default.",
    whereTestersLook: "SOAP API endpoints, REST APIs accepting `Content-Type: application/xml` or `text/xml`, and XML-based document import features.",
    authorizedTestingMethodology: [
      "Identify endpoints accepting XML payloads or test if JSON endpoints also parse XML when `Content-Type: application/xml` is supplied.",
      "Submit a safe XML entity reference defining an internal string constant in a controlled lab environment.",
      "Observe whether the XML parser resolves the custom entity safely without allowing file or remote URL references."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/xml-service",
      headers: {
        "Content-Type": "application/xml"
      },
      payload: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<!DOCTYPE test [ <!ENTITY testval \"SAFE_LAB_TEST_STRING\"> ]>\r\n<order>\r\n  <item>&testval;</item>\r\n</order>"
    },
    safeTestInput: {
      input: "XML payload containing internal benign entity reference &testval;",
      purpose: "Determine if the XML parser processes custom DTD entities.",
      expectedSecureBehavior: "The XML parser disables external DTD processing completely (returns HTTP 400 or parses without evaluating DTD).",
      vulnerableBehaviorIndicators: [
        "The server evaluates the entity and reflects the value or executes remote network callbacks defined in DOCTYPE."
      ]
    },
    evidenceToCollect: "XML parser output demonstrating entity resolution in a controlled test environment.",
    developerRemediation: "Completely disable `DOCTYPE` declarations and external DTD resolution in all XML parser libraries (e.g. `setFeature(\"http://apache.org/xml/features/disallow-doctype-decl\", true)`). Prefer JSON over XML where possible.",
    preventionChecklist: [
      "Disable DTD parsing and external entity resolution globally in XML parsers.",
      "Use modern defused XML parsing libraries.",
      "Reject XML content types if the API exclusively expects JSON."
    ],
    references: [
      { name: "OWASP XML External Entity Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-611: Improper Restriction of XML External Entity Reference", url: "https://cwe.mitre.org/data/definitions/611.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "insecure-deserialization-apis",
    name: "Insecure Deserialization in API Payloads",
    shortDefinition: "Occurs when untrusted serialized objects (such as Java, Python pickle, PHP, or .NET binary serialization) are parsed by an API without verification, enabling remote code execution.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Multiple",
    owaspClassification: "OWASP Top 10 A08:2021 — Software and Data Integrity Failures",
    cweClassification: "CWE-502: Deserialization of Untrusted Data",
    severity: "Contextual: High to Critical (Directly enables remote code execution on the backend application server)",
    difficulty: "Advanced",
    rootCause: "Using native object deserialization methods on user-controlled streams where gadget chains instantiate dangerous classes during unpacking.",
    whereTestersLook: "Custom binary API endpoints, Java RMI/Hessian protocols, Base64-encoded session tokens, and webhook payloads.",
    authorizedTestingMethodology: [
      "Identify endpoints that accept serialized object formats (e.g. Java serialization signatures `rO0AB...` or Python pickle byte streams).",
      "Verify whether the API uses safe text formats (JSON, Protocol Buffers) or enforces strict cryptographic signing on serialized blobs.",
      "In an authorized lab, test if custom class loaders reject unapproved classes during deserialization."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/state/restore",
      headers: {
        "Content-Type": "application/x-java-serialized-object"
      },
      payload: "<SAFE_SERIALIZED_TEST_OBJECT>"
    },
    safeTestInput: {
      input: "<SAFE_SERIALIZED_TEST_OBJECT>",
      purpose: "Check if the API rejects native serialized objects.",
      expectedSecureBehavior: "The API rejects native binary serialization formats, requiring structured JSON or Protobuf formats.",
      vulnerableBehaviorIndicators: [
        "The server instantiates arbitrary classes from incoming serialized byte streams without type allowlisting."
      ]
    },
    evidenceToCollect: "Server error logs indicating native deserialization execution.",
    developerRemediation: "Avoid native language serialization formats. Use structured, data-only formats like JSON or Protocol Buffers. If serialization is unavoidable, enforce strict object look-ahead allowlisting or digital signatures.",
    preventionChecklist: [
      "Migrate legacy binary serialization to JSON or Protobuf.",
      "Implement look-ahead deserialization filters (e.g., JEP 290 in Java).",
      "Digitally sign serialized data with HMAC before transmission."
    ],
    references: [
      { name: "OWASP Deserialization Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-502: Deserialization of Untrusted Data", url: "https://cwe.mitre.org/data/definitions/502.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "race-conditions-api-business-logic",
    name: "Race Conditions in API Business Logic",
    shortDefinition: "Concurrency flaws where simultaneous API requests exploit timing windows before database transactions lock, allowing double-spending, inventory over-allocation, or coupon reuse.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API / Web",
    owaspClassification: "OWASP API4:2023 & CWE-362",
    cweClassification: "CWE-362: Concurrent Execution using Shared Resource with Improper Synchronization",
    severity: "Contextual: High (Enables financial theft, unauthorized asset redemption, or quota bypasses)",
    difficulty: "Advanced",
    rootCause: "Check-then-act logic patterns lacking database-level row locks (e.g. `SELECT FOR UPDATE`) or atomic balance operations.",
    whereTestersLook: "Financial transfer APIs (`/api/transfers`), gift card redemption endpoints, coupon application routes, and limited-stock checkout actions.",
    authorizedTestingMethodology: [
      "Identify state-changing endpoints where a balance or quota is checked and then decremented.",
      "In a controlled lab environment, send parallel synchronized HTTP requests (e.g. 5 identical transfer requests with a 10-credit balance).",
      "Inspect the final database state to verify whether the balance was properly decremented or if multiple transactions executed against the initial balance."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/credits/transfer",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Content-Type": "application/json"
      },
      payload: {
        "recipient_id": "<LAB_RECIPIENT_ID>",
        "amount": 100
      }
    },
    safeTestInput: {
      input: "Parallel synchronized transfer requests in a test environment",
      purpose: "Assess database concurrency controls and isolation levels under simultaneous requests.",
      expectedSecureBehavior: "Only one request succeeds; all concurrent requests fail with HTTP 400/409 (insufficient balance or transaction conflict).",
      vulnerableBehaviorIndicators: [
        "Multiple transfers complete successfully, resulting in a negative account balance or duplicated credit issuance."
      ]
    },
    evidenceToCollect: "Audit trail demonstrating multiple successful transaction records originating from a single initial balance.",
    developerRemediation: "Use atomic database operations (e.g. `UPDATE accounts SET balance = balance - 100 WHERE id = :id AND balance >= 100`), pessimistic row locking (`SELECT FOR UPDATE`), or distributed locks (Redis Redlock).",
    preventionChecklist: [
      "Avoid check-then-act logic in application code without database locks.",
      "Use database transaction isolation levels (e.g., Serializable).",
      "Implement idempotency keys for critical state-changing API requests."
    ],
    references: [
      { name: "CWE-362: Concurrent Execution using Shared Resource with Improper Synchronization", url: "https://cwe.mitre.org/data/definitions/362.html", type: "MITRE" },
      { name: "PortSwigger Race Conditions Research", url: "https://portswigger.net/research/smashing-the-state-machine", type: "PortSwigger" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced Single-Packet Concurrency Testing for Business Logic APIs",
      prerequisiteKnowledge: "Understanding of TCP windowing, HTTP/2 multiplexing frame synchronization, and distributed database locking.",
      authorizedTargetRequirement: "Staging cluster with financial transaction simulation.",
      affectedTechnology: "PostgreSQL, MySQL, Redis, and distributed microservice ledgers.",
      exactObjective: "Analyze whether single-packet HTTP/2 multiplexed requests can exploit microsecond race windows during state updates.",
      methodology: "Send 20 concurrent HTTP/2 stream frames bundled within a single TCP packet in a controlled test rig.",
      expectedResult: "Strict database constraints (e.g. `CHECK (balance >= 0)`) prevent overdrafts regardless of request concurrency.",
      remediation: "Enforce database-level constraint integrity rules alongside distributed Redis idempotency locks.",
      references: [
        { name: "PortSwigger Research: Smashing the State Machine", url: "https://portswigger.net/research/smashing-the-state-machine", type: "PortSwigger" }
      ]
    }
  },
  {
    slug: "mass-assignment-api",
    name: "Mass Assignment Vulnerabilities in APIs",
    shortDefinition: "Occurs when an API automatically binds client-supplied JSON parameters to internal ORM model properties without filtering, allowing attackers to modify sensitive attributes.",
    category: "api-security",
    categoryName: "API Security",
    applicablePlatform: "API",
    owaspClassification: "OWASP API3:2023 — Broken Object Property Level Authorization",
    cweClassification: "CWE-915: Improperly Controlled Modification of Dynamically-Determined Object Attributes",
    severity: "Contextual: High (Enables privilege escalation, account status manipulation, or unauthorized balance modifications)",
    difficulty: "Intermediate",
    rootCause: "Passing request body objects directly to ORM update functions without strict field allowlisting.",
    whereTestersLook: "Registration forms, profile settings (`PATCH /api/users/me`), billing updates, and order checkout payloads.",
    authorizedTestingMethodology: [
      "Review the API data schema or response of a standard user object to identify protected properties (`role`, `is_admin`, `verified`, `plan`).",
      "Construct a `POST` or `PATCH` request with a test account injecting those extra properties into the JSON payload.",
      "Verify whether the server persists the injected values in the database."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/users/register",
      headers: {
        "Content-Type": "application/json"
      },
      payload: {
        "username": "test_user_lab",
        "email": "test@lab.example",
        "password": "<TEST_PASSWORD>",
        "role": "admin"
      }
    },
    safeTestInput: {
      input: "{\"role\": \"admin\"}",
      purpose: "Check if the registration endpoint binds the role property from client input.",
      expectedSecureBehavior: "The server ignores the role parameter and assigns the default non-privileged role (e.g. `user`).",
      vulnerableBehaviorIndicators: [
        "The newly created user account is granted administrative privileges upon login."
      ]
    },
    evidenceToCollect: "Registration request payload and the resulting user profile response confirming the elevated role.",
    developerRemediation: "Use dedicated input Data Transfer Objects (DTOs) with explicit allowlists. Avoid dynamic auto-binding of HTTP request bodies to database entity models.",
    preventionChecklist: [
      "Explicitly define writable fields for every API endpoint.",
      "Use schema validation libraries to reject or strip non-allowlisted properties.",
      "Conduct automated API contract tests in CI/CD."
    ],
    references: [
      { name: "OWASP API3:2023 Broken Object Property Level Authorization", url: "https://owasp.org/www-project-api-security/", type: "OWASP" },
      { name: "CWE-915: Improperly Controlled Modification of Dynamically-Determined Object Attributes", url: "https://cwe.mitre.org/data/definitions/915.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  }
];
