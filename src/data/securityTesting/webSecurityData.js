/**
 * Authentic Web Security Vulnerability Database
 * Adheres strictly to OWASP Top 10 (2021), OWASP Web Security Testing Guide (WSTG v4.2), and MITRE CWE.
 * Zero-fabrication policy: strictly technical, educational, and authorized testing methodologies.
 */

export const webVulnerabilities = [
  {
    slug: "idor-insecure-direct-object-references",
    name: "Insecure Direct Object References (IDOR)",
    shortDefinition: "A type of broken access control where an application exposes a reference to an internal database object in a URL or form parameter without verifying that the requesting user has permission to access it.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web / Multiple",
    owaspClassification: "OWASP Top 10 A01:2021 — Broken Access Control",
    cweClassification: "CWE-639: Authorization Bypass Through User-Controlled Key (also CWE-284: Improper Access Control)",
    severity: "Contextual: High to Critical (Directly exposes unauthorized user records, sensitive documents, or administrative controls)",
    difficulty: "Beginner",
    rootCause: "Relying on client-provided IDs directly in database queries without validating the requesting user's active session against the resource ownership record.",
    whereTestersLook: "URL parameters (`/user/profile?id=1024`), hidden form fields (`<input name=\"account_id\" value=\"500\">`), downloadable file paths, and cookies containing user IDs.",
    authorizedTestingMethodology: [
      "Create two distinct authorized test user accounts in your lab: User A and User B.",
      "As User A, generate a private test record (e.g. invoice or profile) and note its ID: `<TEST_ID_A>`.",
      "Log in as User B and request the resource using `<TEST_ID_A>` in the URL parameter or form input.",
      "Check whether User B receives User A's data (HTTP 200) or receives a properly enforced access denial (HTTP 403 / 404)."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/account/invoices?id=<TEST_INVOICE_ID_A>",
      headers: {
        "Cookie": "session_id=<USER_B_TEST_SESSION_COOKIE>"
      },
      payload: null
    },
    safeTestInput: {
      input: "id=<TEST_INVOICE_ID_A>",
      purpose: "Check if the server verifies record ownership against the authenticated session before rendering.",
      expectedSecureBehavior: "HTTP 403 Forbidden or HTTP 404 Not Found without disclosing any part of User A's invoice.",
      vulnerableBehaviorIndicators: [
        "HTTP 200 OK returned displaying User A's private invoice data to User B.",
        "Modifications to User A's records successful when submitted with User B's session."
      ]
    },
    evidenceToCollect: "Request headers with User B's session paired with the rendered response containing User A's private record. Sensitive data redacted.",
    developerRemediation: "Implement robust server-side authorization checks on every resource retrieval. Scope all queries to the authenticated session context (e.g., `WHERE id = :id AND user_id = :session_user_id`).",
    preventionChecklist: [
      "Validate user ownership for every database access.",
      "Use indirect reference maps or session-scoped object registries when direct IDs must be hidden.",
      "Implement comprehensive automated access-control tests in CI/CD pipelines."
    ],
    relatedVulnerabilities: [
      { name: "Broken Object Level Authorization (BOLA)", slug: "broken-object-level-authorization", category: "api-security" },
      { name: "Broken Access Control & Forced Browsing", slug: "broken-access-control-forced-browsing", category: "web-security" }
    ],
    references: [
      { name: "OWASP Top 10 A01:2021 — Broken Access Control", url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/", type: "OWASP" },
      { name: "MITRE CWE-639: Insecure Direct Object References", url: "https://cwe.mitre.org/data/definitions/639.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "sql-injection-sqli",
    name: "SQL Injection (SQLi)",
    shortDefinition: "Occurs when user-supplied input is directly concatenated into dynamic database queries without sanitization or parameterization, allowing attackers to manipulate query logic, extract data, or modify database contents.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web / Multiple",
    owaspClassification: "OWASP Top 10 A03:2021 — Injection",
    cweClassification: "CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')",
    severity: "Contextual: High to Critical (Allows complete database exfiltration, authentication bypass, or data destruction)",
    difficulty: "Intermediate",
    rootCause: "Constructing SQL statements via raw string concatenation rather than using parameterized prepared statements or stored procedures.",
    whereTestersLook: "Login forms, search input fields, URL query parameters, HTTP headers (e.g. `User-Agent`, `Referer`), and data-filtering forms.",
    authorizedTestingMethodology: [
      "In a dedicated test lab, submit standard benign syntax testing characters (such as single quotes `'` or double quotes `\"`) into input fields.",
      "Check whether the server returns database syntax error messages (error-based detection).",
      "Test boolean-based logic using benign arithmetic conditions (e.g. `AND 1=1` vs `AND 1=2`) and observe differential page responses.",
      "Verify that all queries in the codebase utilize parameterized queries."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/products/search?category=<TEST_CATEGORY>' AND '1'='1",
      headers: {
        "Accept": "text/html"
      },
      payload: null
    },
    safeTestInput: {
      input: "<TEST_CATEGORY>' AND '1'='1",
      purpose: "Check if SQL query structure is altered by client input in a controlled lab.",
      expectedSecureBehavior: "The application searches for the literal string `<TEST_CATEGORY>' AND '1'='1` without altering SQL syntax or returning database errors.",
      vulnerableBehaviorIndicators: [
        "Database error returned (e.g. `ORA-00933`, `Unclosed quotation mark`, `You have an error in your SQL syntax`).",
        "Differential output displaying all products when `1=1` is injected vs zero products when `1=2` is injected."
      ]
    },
    evidenceToCollect: "Server error messages or differential boolean responses in a controlled lab environment.",
    developerRemediation: "Always use parameterized queries (prepared statements) for all database engines (e.g., `PreparedStatement` in Java, parameterized queries in PDO, or ORM parameter binding). Never concatenate user input into SQL strings.",
    preventionChecklist: [
      "Use prepared statements with bind variables across all queries.",
      "Apply the principle of least privilege to database service accounts.",
      "Use ORM frameworks securely without raw query concatenation."
    ],
    references: [
      { name: "OWASP SQL Injection Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-89: SQL Injection", url: "https://cwe.mitre.org/data/definitions/89.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced Blind SQL Injection & Out-of-Band (OAST) Verification",
      prerequisiteKnowledge: "Understanding of relational database query execution plans, subqueries, and out-of-band DNS resolution.",
      authorizedTargetRequirement: "Staging database environment with controlled logging.",
      affectedTechnology: "PostgreSQL, MySQL, Microsoft SQL Server, Oracle Database.",
      exactObjective: "Verify how database engines handle asynchronous subqueries and whether database network egress is restricted.",
      methodology: "Test boolean and time-delay assertions in a controlled test rig to verify database sanitization layers.",
      expectedResult: "Parameterized drivers treat all inputs as literal values, preventing execution of nested subqueries.",
      remediation: "Enforce strict parameterized queries and restrict database server network egress to local subnets.",
      references: [
        { name: "PortSwigger Blind SQL Injection", url: "https://portswigger.net/web-security/sql-injection/blind", type: "PortSwigger" }
      ]
    }
  },
  {
    slug: "reflected-cross-site-scripting-xss",
    name: "Reflected Cross-Site Scripting (Reflected XSS)",
    shortDefinition: "Occurs when an application receives user input in an HTTP request and includes that input within the immediate response in an unsafe manner without adequate validation or context-aware encoding.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A03:2021 — Injection",
    cweClassification: "CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
    severity: "Contextual: Medium to High (Enables session hijacking, credential harvesting, or arbitrary client-side script execution)",
    difficulty: "Beginner",
    rootCause: "Echoing unescaped user-controlled request parameters (e.g. search keywords or error messages) directly into HTML markup, attributes, or inline scripts.",
    whereTestersLook: "Search result pages, error message parameters (`?error=...`), URL parameters reflected on the page, and form input fields.",
    authorizedTestingMethodology: [
      "Identify all parameters reflected in the HTML response.",
      "Submit a unique, benign alphanumeric canary string (e.g. `<canary_test_12345>`) to determine where and how the input is reflected.",
      "Inspect the page source to analyze whether HTML special characters (`<`, `>`, `\"`, `'`, `&`) are properly HTML-entity encoded (e.g. `&lt;`, `&gt;`).",
      "Verify if a strong Content Security Policy (CSP) is enforced."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/search?q=<TEST_CANARY_STRING>",
      headers: {
        "Accept": "text/html"
      },
      payload: null
    },
    safeTestInput: {
      input: "<test_canary_tag>",
      purpose: "Check if HTML tags are encoded before being rendered into the DOM.",
      expectedSecureBehavior: "The application renders `&lt;test_canary_tag&gt;` safely within the HTML without parsing it as a DOM element.",
      vulnerableBehaviorIndicators: [
        "The raw unencoded tag `<test_canary_tag>` is inserted directly into the DOM tree.",
        "Script contexts execute unescaped user input."
      ]
    },
    evidenceToCollect: "Raw HTML source code showing unencoded reflection in the DOM.",
    developerRemediation: "Apply context-aware output encoding (HTML body encoding, attribute encoding, JavaScript encoding) before rendering untrusted input. Implement a strict Content Security Policy (CSP).",
    preventionChecklist: [
      "Use modern templating engines with automatic contextual encoding enabled (e.g., React, Angular, Thymeleaf, Jinja2).",
      "Deploy `Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-...'`.",
      "Set `HttpOnly` and `SameSite=Lax` or `Strict` on sensitive session cookies."
    ],
    references: [
      { name: "OWASP Cross-Site Scripting Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-79: Cross-site Scripting", url: "https://cwe.mitre.org/data/definitions/79.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "stored-cross-site-scripting-xss",
    name: "Stored Cross-Site Scripting (Stored XSS)",
    shortDefinition: "Occurs when an application receives untrusted input from a user, stores it in a persistent database or file, and later embeds it into web pages served to other users without adequate output encoding.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A03:2021 — Injection",
    cweClassification: "CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
    severity: "Contextual: High to Critical (Can compromise all users viewing the infected page, including administrators)",
    difficulty: "Intermediate",
    rootCause: "Persisting unvalidated user input in databases and rendering it into administrative dashboards, comment sections, or user profile pages without context-aware encoding.",
    whereTestersLook: "User profile names, comment sections, support ticket systems, forum posts, and feedback forms.",
    authorizedTestingMethodology: [
      "Submit benign test markers with distinctive formatting (e.g. `<b>safe_test_marker</b>` or benign custom attributes) into user profile or comment fields.",
      "Log into a second authorized test account (or administrative test viewer) and navigate to the page where the stored record is displayed.",
      "Examine the rendered HTML source to verify if the tags are safely encoded or rendered as active DOM elements."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/comments/create",
      headers: {
        "Authorization": "Bearer <TEST_TOKEN>",
        "Content-Type": "application/json"
      },
      payload: {
        "post_id": "<TEST_POST_ID>",
        "content": "Safe testing comment: <test_stored_canary>"
      }
    },
    safeTestInput: {
      input: "Safe comment: <test_stored_canary>",
      purpose: "Verify whether stored content is encoded when rendered to other users.",
      expectedSecureBehavior: "The content is stored safely and rendered as `&lt;test_stored_canary&gt;`.",
      vulnerableBehaviorIndicators: [
        "The raw markup `<test_stored_canary>` is injected into the DOM of all users viewing the comment.",
        "Unsanitized HTML formatting alters page structure."
      ]
    },
    evidenceToCollect: "Rendered HTML source from the viewing user's browser session showing unencoded persisted tags.",
    developerRemediation: "Encode all stored data at the time of output rendering according to the specific HTML context. Use HTML sanitization libraries (e.g., DOMPurify) if rich text markup is required.",
    preventionChecklist: [
      "Sanitize rich HTML input using robust libraries like DOMPurify.",
      "Enforce strict Content Security Policy (CSP).",
      "Store raw text and encode strictly at output time."
    ],
    references: [
      { name: "OWASP XSS Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-79: Cross-site Scripting", url: "https://cwe.mitre.org/data/definitions/79.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "dom-based-xss",
    name: "DOM-Based Cross-Site Scripting (DOM XSS)",
    shortDefinition: "Vulnerability where client-side JavaScript takes data from an untrusted source (e.g., URL hash, search params) and passes it to an unsafe execution sink (e.g., innerHTML, eval) entirely within the browser.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A03:2021 — Injection",
    cweClassification: "CWE-79: Cross-site Scripting",
    severity: "Contextual: Medium to High (Enables client-side session compromise and DOM manipulation)",
    difficulty: "Intermediate",
    rootCause: "Client-side scripts reading sources (`window.location.hash`, `location.search`, `document.referrer`) and writing directly to sinks (`element.innerHTML`, `document.write`, `eval`) without sanitization.",
    whereTestersLook: "Single Page Application (SPA) routing scripts, URL hash handlers (`#tab1`), client-side query string parsers, and `window.postMessage` event listeners.",
    authorizedTestingMethodology: [
      "Review client-side JavaScript code to trace data flow from sources (`location.hash`, `searchParams`) to execution sinks.",
      "Supply safe test strings with URI encoding to test how client-side parsers process inputs.",
      "Check whether `element.textContent` or safe DOM APIs are used instead of `innerHTML`."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/dashboard#section=<TEST_CANARY_VALUE>",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "#section=<TEST_CANARY_VALUE>",
      purpose: "Check if client-side router safely parses hash fragments before inserting into DOM.",
      expectedSecureBehavior: "The application uses `element.textContent` or a sanitized router without interpreting HTML markup.",
      vulnerableBehaviorIndicators: [
        "Client script executes `document.getElementById('content').innerHTML = location.hash`.",
        "Unsanitized DOM injection occurs upon hash change."
      ]
    },
    evidenceToCollect: "Browser developer console trace showing source-to-sink data flow.",
    developerRemediation: "Use safe DOM manipulation properties like `element.textContent` instead of `innerHTML`. When HTML rendering is necessary, sanitize using DOMPurify before DOM insertion.",
    preventionChecklist: [
      "Avoid dangerous sinks (`innerHTML`, `outerHTML`, `document.write`, `eval`).",
      "Adopt Trusted Types API (`require-trusted-types-for 'script'`).",
      "Sanitize dynamic HTML client-side using DOMPurify."
    ],
    references: [
      { name: "OWASP DOM Based XSS Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-79: Cross-site Scripting", url: "https://cwe.mitre.org/data/definitions/79.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "cross-site-request-forgery-csrf",
    name: "Cross-Site Request Forgery (CSRF)",
    shortDefinition: "An attack that forces an authenticated browser user to execute unwanted state-changing actions on a trusted web application where they are currently authenticated.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A01:2021 — Broken Access Control",
    cweClassification: "CWE-352: Cross-Site Request Forgery (CSRF)",
    severity: "Contextual: Medium to High (Allows unauthorized actions such as email changes, password updates, or financial transfers)",
    difficulty: "Beginner",
    rootCause: "Relying solely on ambient browser credentials (session cookies) for state-changing requests without requiring an unpredictable anti-CSRF token or `SameSite` cookie protection.",
    whereTestersLook: "State-changing POST/PUT/DELETE forms (email change, password reset, funds transfer) and API endpoints that authenticate via cookies.",
    authorizedTestingMethodology: [
      "Inspect sensitive forms to check if unpredictable anti-CSRF tokens (`_csrf`, `csrf_token`) are required.",
      "Test whether removing or submitting an invalid CSRF token causes the server to reject the state change.",
      "Check cookie attributes: verify if session cookies include `SameSite=Lax` or `SameSite=Strict`.",
      "Check if changing HTTP method from POST to GET bypasses token verification."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/account/settings/update-email",
      headers: {
        "Cookie": "session_id=<TEST_SESSION_COOKIE>",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      payload: "email=new_lab_test@example.com"
    },
    safeTestInput: {
      input: "Submitting state-changing request without CSRF token",
      purpose: "Determine if the application verifies anti-CSRF tokens on sensitive state changes.",
      expectedSecureBehavior: "HTTP 403 Forbidden with error `Missing or invalid CSRF token`.",
      vulnerableBehaviorIndicators: [
        "The email or profile state is updated successfully without token validation.",
        "Application accepts cross-origin POST requests with ambient cookies."
      ]
    },
    evidenceToCollect: "HTTP response demonstrating successful state change without CSRF token.",
    developerRemediation: "Implement cryptographically random anti-CSRF tokens (Synchronizer Token Pattern or Double Submit Cookie) on all state-changing endpoints. Set `SameSite=Lax` or `SameSite=Strict` on session cookies.",
    preventionChecklist: [
      "Use framework-provided CSRF protection (e.g. Spring Security, Django CSRF middleware).",
      "Configure `SameSite=Lax` or `Strict` for all session cookies.",
      "Verify `Origin` and `Referer` headers on incoming state-changing requests."
    ],
    references: [
      { name: "OWASP CSRF Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-352: Cross-Site Request Forgery", url: "https://cwe.mitre.org/data/definitions/352.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "server-side-template-injection-ssti",
    name: "Server-Side Template Injection (SSTI)",
    shortDefinition: "Occurs when user input is directly concatenated into a server-side template engine template instead of being passed as data, allowing attackers to execute template directives and potentially arbitrary code.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A03:2021 — Injection",
    cweClassification: "CWE-1336: Improper Neutralization of Special Elements Used in a Template Engine",
    severity: "Contextual: High to Critical (Can result in full Remote Code Execution on the application server)",
    difficulty: "Advanced",
    rootCause: "Dynamically constructing template strings by concatenating user input into engines like Jinja2, Twig, Freemarker, Velocity, or Pebble.",
    whereTestersLook: "Custom email templates, profile bio generators, dynamic PDF generators, and CMS page title templates.",
    authorizedTestingMethodology: [
      "Identify input fields evaluated by template engines (e.g. custom greetings: `Hello {{ name }}`).",
      "In a controlled lab, submit benign mathematical template expressions (e.g. `{{7*7}}` or `${7*7}`).",
      "Observe if the rendered output evaluates the arithmetic expression (displaying `49`) rather than the literal string `{{7*7}}`.",
      "Identify the specific template engine by comparing syntax behavior across engines in an authorized environment."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/preview/email-template",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer <TEST_TOKEN>"
      },
      payload: {
        "template": "Hello {{7*7}}!"
      }
    },
    safeTestInput: {
      input: "{{7*7}}",
      purpose: "Check if the server evaluates dynamic template expressions supplied by user input.",
      expectedSecureBehavior: "The page renders the literal text `Hello {{7*7}}!` without evaluating the expression.",
      vulnerableBehaviorIndicators: [
        "The page renders `Hello 49!`, confirming server-side template expression evaluation.",
        "Template engine syntax errors returned in response."
      ]
    },
    evidenceToCollect: "Rendered response showing evaluated expression arithmetic.",
    developerRemediation: "Never concatenate user input directly into template strings. Always pass user input as contextual data variables to pre-compiled templates. Use sandboxed template execution modes where available.",
    preventionChecklist: [
      "Use static templates and pass user input only via data context dictionaries.",
      "Enable engine-specific sandbox modes (e.g., Jinja2 SandboxedEnvironment).",
      "Disable access to underlying system class loaders and reflection APIs in templates."
    ],
    references: [
      { name: "PortSwigger Server-Side Template Injection", url: "https://portswigger.net/web-security/server-side-template-injection", type: "PortSwigger" },
      { name: "CWE-1336: Improper Neutralization of Special Elements Used in a Template Engine", url: "https://cwe.mitre.org/data/definitions/1336.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced Template Engine Sandbox Analysis",
      prerequisiteKnowledge: "Understanding of Java/Python object reflection, MRO (Method Resolution Order), and AST interpretation.",
      authorizedTargetRequirement: "Staging server with sandboxed Jinja2/Twig instances.",
      affectedTechnology: "Jinja2, Twig, Velocity, Pebble, FreeMarker.",
      exactObjective: "Analyze whether sandbox implementations restrict access to reflection methods and runtime execution properties.",
      methodology: "Test restricted attribute access (`__class__`, `__mro__`) against sandbox security policy validators in a lab.",
      expectedResult: "Security managers intercept restricted attribute access and throw security exceptions.",
      remediation: "Disallow dynamic template construction from user inputs; enforce strict AST node allowlists.",
      references: [
        { name: "OWASP Injection Prevention", url: "https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html", type: "OWASP" }
      ]
    }
  },
  {
    slug: "os-command-injection",
    name: "OS Command Injection",
    shortDefinition: "Occurs when an application executes system shell commands with user-supplied input concatenated directly into the command string without validation or escaping.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web / Multiple",
    owaspClassification: "OWASP Top 10 A03:2021 — Injection",
    cweClassification: "CWE-78: Improper Neutralization of Special Elements used in an OS Command ('OS Command Injection')",
    severity: "Contextual: Critical (Direct remote command execution on the host operating system)",
    difficulty: "Intermediate",
    rootCause: "Calling system command functions (e.g., `system()`, `exec()`, `Runtime.getRuntime().exec()`, `child_process.exec()`) with unsanitized user input strings.",
    whereTestersLook: "Network diagnostics tools (ping/traceroute forms), document converters, image thumbnail generators, and backup utilities.",
    authorizedTestingMethodology: [
      "Identify parameters passed to underlying system utilities in a controlled lab environment.",
      "Test input handling using benign command delimiters (e.g. `|`, `;`, `&`, `&&`) with safe test commands (such as testing echo commands or viewing help banners in a lab).",
      "Check whether the application uses language-native APIs instead of invoking the shell."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/tools/dns-lookup",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer <TEST_TOKEN>"
      },
      payload: {
        "hostname": "example.com; echo SAFE_LAB_TEST"
      }
    },
    safeTestInput: {
      input: "example.com; echo SAFE_LAB_TEST",
      purpose: "Check if the server concatenates input into a shell command.",
      expectedSecureBehavior: "The application validates the hostname against a strict DNS regex (`^[a-zA-Z0-9.-]+$`) and rejects special characters with HTTP 400.",
      vulnerableBehaviorIndicators: [
        "The string `SAFE_LAB_TEST` is returned in the diagnostic output.",
        "System command execution syntax errors returned."
      ]
    },
    evidenceToCollect: "Command output showing execution of the appended safe echo command in a controlled lab.",
    developerRemediation: "Avoid invoking shell commands. Use language-specific built-in APIs (e.g. `dns.resolve()` in Node.js instead of shell `nslookup`). If shell calls are unavoidable, use argument array execution (e.g., `execFile` without shell) and strict allowlists.",
    preventionChecklist: [
      "Use language-native library functions instead of system shell execution.",
      "Pass parameters as discrete argument arrays rather than concatenated shell strings.",
      "Enforce strict character allowlists (e.g., alphanumeric only)."
    ],
    references: [
      { name: "OWASP Command Injection Defense", url: "https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-78: OS Command Injection", url: "https://cwe.mitre.org/data/definitions/78.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "path-traversal-directory-traversal",
    name: "Path Traversal / Directory Traversal",
    shortDefinition: "Allows attackers to read arbitrary files on the server running an application by manipulating file path variables using dot-dot-slash (`../`) sequences.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web / Multiple",
    owaspClassification: "OWASP Top 10 A01:2021 — Broken Access Control",
    cweClassification: "CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
    severity: "Contextual: High to Critical (Enables reading of source code, configuration files, and credentials)",
    difficulty: "Beginner",
    rootCause: "Passing user-controlled filenames directly into filesystem APIs without canonicalizing paths or verifying that the target path remains inside the designated root directory.",
    whereTestersLook: "File download routes (`/download?file=...`), image loaders (`/images?name=...`), language/locale parameters (`?lang=en.json`), and document viewers.",
    authorizedTestingMethodology: [
      "Identify parameters that reference filesystem objects.",
      "In a controlled lab environment, test path traversal sequences (e.g. `../../test.txt` or URL-encoded variations `%2e%2e%2f`).",
      "Check whether the application resolves the absolute canonical path and enforces directory root boundaries."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/view-document?file=../../safe_lab_test.txt",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "../../safe_lab_test.txt",
      purpose: "Check if the server restricts file access to the base directory.",
      expectedSecureBehavior: "HTTP 400 Bad Request or HTTP 403 Forbidden with path traversal rejection.",
      vulnerableBehaviorIndicators: [
        "The server returns files located outside the public documents root directory.",
        "Differential error messages indicating file existence outside the document root."
      ]
    },
    evidenceToCollect: "HTTP response showing retrieval of files outside the designated root in a controlled test lab.",
    developerRemediation: "Use database IDs or static filename allowlists instead of raw paths. If user input must be used, resolve the canonical path and ensure it starts with the designated root path (e.g., `canonicalPath.startsWith(allowedBaseDir)`).",
    preventionChecklist: [
      "Store files using random UUID keys rather than user-supplied filenames.",
      "Verify canonical path boundaries before reading files.",
      "Run the web server process with minimal filesystem permissions."
    ],
    references: [
      { name: "OWASP Path Traversal", url: "https://owasp.org/www-community/attacks/Path_Traversal", type: "OWASP" },
      { name: "CWE-22: Path Traversal", url: "https://cwe.mitre.org/data/definitions/22.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "open-url-redirection",
    name: "Open URL Redirection",
    shortDefinition: "Occurs when an application accepts untrusted user input as a target URL in a redirect parameter without validating the destination domain, facilitating phishing attacks.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A01:2021 — Broken Access Control",
    cweClassification: "CWE-601: URL Redirection to Untrusted Site ('Open Redirect')",
    severity: "Contextual: Medium (Primary vector for credential harvesting and OAuth code interception)",
    difficulty: "Beginner",
    rootCause: "Passing user-controlled redirect parameters (`?return_url=...`, `?next=...`) directly to HTTP 302/307 redirect headers without domain allowlisting.",
    whereTestersLook: "Login return parameters (`/login?next=/dashboard`), logout handlers, language selectors, and OAuth authorization callback URLs.",
    authorizedTestingMethodology: [
      "Identify redirect parameters across login and navigation workflows.",
      "Test redirect behavior by supplying a controlled external domain (e.g. `https://test-external.example`).",
      "Check whether relative paths (e.g. `/profile`) work while external URLs are rejected.",
      "Test common bypass attempts (protocol-relative `//example.com`, backslashes `\\example.com`) in a lab."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/auth/login?next=https://test-external-lab.example",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "next=https://test-external-lab.example",
      purpose: "Check if the redirect logic enforces relative path or domain allowlisting.",
      expectedSecureBehavior: "The application ignores the external domain and redirects to a safe default path (e.g., `/dashboard`).",
      vulnerableBehaviorIndicators: [
        "HTTP 302 Found response with `Location: https://test-external-lab.example`."
      ]
    },
    evidenceToCollect: "HTTP response headers showing the unvalidated external destination in the `Location` header.",
    developerRemediation: "Validate that redirect URLs begin with a single forward slash followed by alphanumeric characters (e.g., `/^[a-zA-Z0-9_-]/`), preventing external URLs and protocol-relative paths. Maintain strict domain allowlists for external redirects.",
    preventionChecklist: [
      "Reject absolute URLs in redirect parameters unless on an explicit allowlist.",
      "Disallow protocol-relative URLs (`//example.com`).",
      "Warn users before navigating away to external sites."
    ],
    references: [
      { name: "OWASP Unvalidated Redirects and Forwards Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-601: URL Redirection to Untrusted Site", url: "https://cwe.mitre.org/data/definitions/601.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "session-fixation-management-weaknesses",
    name: "Session Fixation & Insecure Session Management",
    shortDefinition: "Flaws where an application fails to issue a new session identifier upon user authentication, allowing an attacker who knows a pre-authentication session ID to hijack the authenticated session.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A07:2021 — Identification and Authentication Failures",
    cweClassification: "CWE-384: Session Fixation (also CWE-613: Insufficient Session Expiration)",
    severity: "Contextual: High (Enables complete account takeover if session identifiers are known or captured)",
    difficulty: "Intermediate",
    rootCause: "Maintaining the same session cookie value across the login privilege transition boundary rather than regenerating a new session ID upon successful authentication.",
    whereTestersLook: "Login workflows, session cookies (`Set-Cookie` headers before and after login), and password change actions.",
    authorizedTestingMethodology: [
      "Obtain an anonymous session cookie from the login page: `<ANON_SESSION_ID>`.",
      "Authenticate with valid test credentials using the same browser session.",
      "Inspect the response `Set-Cookie` header to verify whether a brand new session identifier was issued.",
      "Check whether the pre-authentication session identifier `<ANON_SESSION_ID>` is still accepted after login."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/login",
      headers: {
        "Cookie": "session_id=<ANON_TEST_SESSION_ID>",
        "Content-Type": "application/json"
      },
      payload: {
        "username": "test_user",
        "password": "<TEST_PASSWORD>"
      }
    },
    safeTestInput: {
      input: "Authenticating with pre-existing anonymous session cookie",
      purpose: "Verify that the server regenerates the session token on privilege boundary changes.",
      expectedSecureBehavior: "The server invalidates the old anonymous session and issues a new cryptographically random session ID via `Set-Cookie`.",
      vulnerableBehaviorIndicators: [
        "The server retains `<ANON_TEST_SESSION_ID>` without issuing a new cookie, elevating privileges on the existing identifier."
      ]
    },
    evidenceToCollect: "HTTP response headers showing absence of session regeneration on login.",
    developerRemediation: "Always regenerate session identifiers upon successful login and privilege changes (e.g., `session.regenerate()` or `HttpServletRequest.changeSessionId()`). Set `HttpOnly`, `Secure`, and `SameSite` flags on all session cookies.",
    preventionChecklist: [
      "Regenerate session IDs immediately upon authentication.",
      "Invalidate server-side session stores on logout.",
      "Enforce absolute and idle session timeout limits."
    ],
    references: [
      { name: "OWASP Session Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-384: Session Fixation", url: "https://cwe.mitre.org/data/definitions/384.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "web-cache-deception-cache-poisoning",
    name: "Web Cache Deception & Cache Poisoning",
    shortDefinition: "Attacks where differences in path parsing between a web cache (CDN/proxy) and origin server cause dynamic private user data to be cached publicly (Deception) or cause the cache to store malicious content (Poisoning).",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A05:2021 — Security Misconfiguration",
    cweClassification: "CWE-524: Use of Cache-Containing Sensitive Information (also CWE-444: Inconsistent Interpretation of HTTP Requests)",
    severity: "Contextual: High to Critical (Can leak private account data or serve stored XSS to all website visitors)",
    difficulty: "Advanced",
    rootCause: "Origin servers ignoring file extension paths (e.g. treating `/account/profile/test.css` as `/account/profile`) while caching proxies cache the response based on the static `.css` extension.",
    whereTestersLook: "Static file caching rules on CDNs (Cloudflare, CloudFront, Akamai), path delimiter handling, and unkeyed request headers.",
    authorizedTestingMethodology: [
      "In a staging environment with a caching proxy, request a private dynamic endpoint with an appended static extension: `/api/user/profile/nonexistent.js`.",
      "Check if the origin server returns the authenticated user's private JSON/HTML profile.",
      "Request the exact same URL from an unauthenticated second browser session and observe if the response is served from cache (`X-Cache: HIT`)."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/account/settings/test_cache_deception.css",
      headers: {
        "Cookie": "session=<TEST_SESSION_A>"
      },
      payload: null
    },
    safeTestInput: {
      input: "/account/settings/test_cache_deception.css",
      purpose: "Check if CDN caches authenticated responses when static extensions are appended to dynamic endpoints.",
      expectedSecureBehavior: "The origin returns HTTP 404 Not Found or sets `Cache-Control: no-store, private` preventing cache persistence.",
      vulnerableBehaviorIndicators: [
        "The CDN caches the response and serves User A's private settings to User B with `X-Cache: HIT`."
      ]
    },
    evidenceToCollect: "Comparative HTTP responses showing private user data returned to unauthenticated clients with cache HIT indicators.",
    developerRemediation: "Ensure all dynamic and authenticated endpoints explicitly return `Cache-Control: no-store, private`. Configure CDNs to cache based on `Content-Type` response headers rather than URL extensions.",
    preventionChecklist: [
      "Set `Cache-Control: no-store` on all authenticated endpoints.",
      "Align URL routing rules between caching proxies and origin web frameworks.",
      "Disable caching for any response containing `Set-Cookie` or `Authorization`."
    ],
    references: [
      { name: "PortSwigger Web Cache Poisoning Research", url: "https://portswigger.net/research/practical-web-cache-poisoning", type: "PortSwigger" },
      { name: "CWE-524: Use of Cache-Containing Sensitive Information", url: "https://cwe.mitre.org/data/definitions/524.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: true,
    advancedSection: {
      title: "Advanced Web Cache Deception Matrix Testing",
      prerequisiteKnowledge: "Understanding of CDN cache key normalization, path traversal in cache keys, and origin server URL mapping.",
      authorizedTargetRequirement: "Staging environment behind configured CDN edge proxy.",
      affectedTechnology: "Cloudflare, AWS CloudFront, Fastly, Nginx caching proxies.",
      exactObjective: "Evaluate cache behavior across varying path delimiters (`;`, `%23`, `%3F`, `%00`) to detect delimiter discrepancies.",
      methodology: "Send structured test requests with varying delimiters and static extensions in a lab to audit cache key generation.",
      expectedResult: "Origin server returns HTTP 404 or explicitly marks dynamic responses with `Cache-Control: no-store`.",
      remediation: "Standardize URL delimiter handling and mandate `Cache-Control: no-store` at the application framework level.",
      references: [
        { name: "PortSwigger Web Cache Deception", url: "https://portswigger.net/web-security/web-cache-deception", type: "PortSwigger" }
      ]
    }
  },
  {
    slug: "http-host-header-attacks",
    name: "HTTP Host Header Attacks & Password Reset Poisoning",
    shortDefinition: "Vulnerabilities occurring when web applications trust the client-supplied HTTP `Host` header to construct password reset links, scripts, or internal redirect destinations.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A05:2021 — Security Misconfiguration",
    cweClassification: "CWE-644: Improper Neutralization of HTTP Headers for Scripting Syntax (also CWE-20)",
    severity: "Contextual: High (Can result in password reset token theft and complete account takeover)",
    difficulty: "Intermediate",
    rootCause: "Constructing absolute URLs for emails (e.g. `\"https://\" + request.getHost() + \"/reset-password?token=\" + token`) using unvalidated `Host` or `X-Forwarded-Host` headers.",
    whereTestersLook: "Password reset request endpoints (`/forgot-password`), absolute link generators in emails, and web server default vhost routing.",
    authorizedTestingMethodology: [
      "In a controlled lab, initiate a password reset request for a test account while modifying the `Host` header (e.g. `Host: test-listener.example`).",
      "Inspect the generated test email to verify whether the reset link was constructed using the modified Host domain.",
      "Test override headers: `X-Forwarded-Host: test-listener.example`."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/auth/forgot-password",
      headers: {
        "Host": "test-controlled-listener.example",
        "Content-Type": "application/json"
      },
      payload: {
        "email": "lab_user@example.com"
      }
    },
    safeTestInput: {
      input: "Host: test-controlled-listener.example",
      purpose: "Check if the server uses client-supplied Host headers to construct email reset links.",
      expectedSecureBehavior: "The server rejects the unapproved Host header with HTTP 400 or constructs URLs using a statically configured canonical server name.",
      vulnerableBehaviorIndicators: [
        "The generated reset link sent in email points to `https://test-controlled-listener.example/reset?token=...`."
      ]
    },
    evidenceToCollect: "Email body showing reset token URL constructed with the manipulated Host header.",
    developerRemediation: "Never construct URLs using the incoming `Host` header from HTTP requests. Use a statically configured canonical domain name in server configuration files (e.g. `SITE_URL=https://app.example.com`).",
    preventionChecklist: [
      "Use static server domain configuration for all generated links.",
      "Configure web servers (Nginx/Apache) to reject requests with unrecognized Host headers.",
      "Validate `X-Forwarded-Host` against an approved proxy allowlist."
    ],
    references: [
      { name: "PortSwigger HTTP Host Header Attacks", url: "https://portswigger.net/web-security/host-header", type: "PortSwigger" },
      { name: "CWE-644: Improper Neutralization of HTTP Headers", url: "https://cwe.mitre.org/data/definitions/644.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "prototype-pollution",
    name: "Prototype Pollution (Client & Server-Side)",
    shortDefinition: "A JavaScript vulnerability where an attacker modifies `Object.prototype`, injecting or altering properties that are subsequently inherited by all JavaScript objects in the runtime.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web / API",
    owaspClassification: "OWASP Top 10 A03:2021 — Injection",
    cweClassification: "CWE-1321: Improperly Controlled Modification of Object Prototype Attributes ('Prototype Pollution')",
    severity: "Contextual: High to Critical (Can lead to client-side XSS or server-side Remote Code Execution in Node.js)",
    difficulty: "Advanced",
    rootCause: "Recursive object merge, clone, or property path utility functions that fail to sanitize special property keys like `__proto__`, `constructor`, and `prototype`.",
    whereTestersLook: "Deep merge utilities (e.g. lodash `merge`), query string parsers that handle nested objects (`?__proto__[admin]=true`), and JSON payload processors.",
    authorizedTestingMethodology: [
      "In a controlled lab, send a test payload with `__proto__` property injection: `{\"__proto__\": {\"polluted_test_key\": \"polluted_test_val\"}}`.",
      "Check if newly created objects (e.g. `const obj = {}; obj.polluted_test_key`) inherit the test property.",
      "On client side, check if polluted properties flow into DOM sinks leading to XSS."
    ],
    safeTestExample: {
      requestMethod: "POST",
      endpoint: "/api/v1/settings/merge",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer <TEST_TOKEN>"
      },
      payload: {
        "__proto__": {
          "safe_polluted_canary": true
        }
      }
    },
    safeTestInput: {
      input: "{\"__proto__\": {\"safe_polluted_canary\": true}}",
      purpose: "Check if the object merge function sanitizes prototype property keys.",
      expectedSecureBehavior: "The merge function strips `__proto__` and `constructor` keys, leaving `Object.prototype.safe_polluted_canary` undefined.",
      vulnerableBehaviorIndicators: [
        "In JavaScript runtime, `{}.safe_polluted_canary` evaluates to `true`.",
        "Server application crashes or exhibits altered configuration behavior."
      ]
    },
    evidenceToCollect: "Node.js diagnostic log showing polluted Object prototype in an authorized test environment.",
    developerRemediation: "Freeze Object prototype (`Object.freeze(Object.prototype)`), use `Object.create(null)` for dictionary objects, or use secure modern libraries (e.g. Lodash 4.17.21+) that sanitize prototype keys during deep cloning.",
    preventionChecklist: [
      "Use `Map` instead of plain objects for key-value collections.",
      "Validate JSON schemas with tools that disallow `__proto__` properties.",
      "Update utility libraries to versions that patch prototype pollution CVEs."
    ],
    references: [
      { name: "PortSwigger Prototype Pollution Research", url: "https://portswigger.net/web-security/prototype-pollution", type: "PortSwigger" },
      { name: "CWE-1321: Prototype Pollution", url: "https://cwe.mitre.org/data/definitions/1321.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "websocket-security-cswsh",
    name: "Cross-Site WebSocket Hijacking (CSWSH) & WebSocket Security",
    shortDefinition: "Vulnerabilities in WebSocket handshakes where servers authenticate initial connections via ambient cookies without validating the `Origin` header, allowing malicious web pages to establish unauthorized WebSocket connections.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web / API",
    owaspClassification: "OWASP Top 10 A01:2021 — Broken Access Control",
    cweClassification: "CWE-1385: Missing Origin Validation in WebSockets (also CWE-352: CSRF)",
    severity: "Contextual: High (Enables real-time interception of private communications and unauthorized message transmission)",
    difficulty: "Intermediate",
    rootCause: "WebSocket handshake endpoints relying solely on HTTP cookies for authentication while omitting strict validation of the `Origin` header during connection upgrade.",
    whereTestersLook: "WebSocket endpoints (`ws://`, `wss://`), connection upgrade requests (`GET /ws`), chat applications, and live financial feeds.",
    authorizedTestingMethodology: [
      "Capture the HTTP WebSocket upgrade request (`Upgrade: websocket`).",
      "In a controlled lab, send a handshake request with a modified `Origin: https://untrusted-lab.example` while supplying a valid authenticated session cookie.",
      "Verify whether the server completes the 101 Switching Protocols handshake or rejects the connection based on the unapproved Origin."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/ws/v1/feed",
      headers: {
        "Upgrade": "websocket",
        "Connection": "Upgrade",
        "Origin": "https://test-untrusted-origin.example",
        "Cookie": "session=<TEST_SESSION_COOKIE>",
        "Sec-WebSocket-Key": "dGhlIHNhbXBsZSBub25jZQ==",
        "Sec-WebSocket-Version": "13"
      },
      payload: null
    },
    safeTestInput: {
      input: "Origin: https://test-untrusted-origin.example",
      purpose: "Verify whether the WebSocket server validates Origin headers during the handshake.",
      expectedSecureBehavior: "The server rejects the handshake with HTTP 403 Forbidden.",
      vulnerableBehaviorIndicators: [
        "The server responds with HTTP 101 Switching Protocols and establishes a live bidirectional communication stream."
      ]
    },
    evidenceToCollect: "HTTP 101 Switching Protocols response header paired with unauthorized Origin request header in an authorized lab.",
    developerRemediation: "Validate the `Origin` header against an explicit allowlist during the initial HTTP upgrade handshake. Use short-lived, single-use authentication tokens passed during connection initialization rather than relying on ambient cookies.",
    preventionChecklist: [
      "Validate `Origin` header strictly during WebSocket handshake.",
      "Use one-time handshake tokens for WebSocket authentication.",
      "Enforce CSRF tokens on WebSocket connection requests."
    ],
    references: [
      { name: "OWASP HTML5 Security Cheat Sheet — WebSockets", url: "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-1385: Missing Origin Validation in WebSockets", url: "https://cwe.mitre.org/data/definitions/1385.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "sensitive-info-exposure-sourcemaps-git",
    name: "Information Exposure via Client Source Maps & Git Metadata",
    shortDefinition: "Public exposure of unminified JavaScript source maps (`.map` files), exposed `.git` directories, or environment configuration backups on web servers.",
    category: "web-security",
    categoryName: "Web Security",
    applicablePlatform: "Web",
    owaspClassification: "OWASP Top 10 A05:2021 — Security Misconfiguration",
    cweClassification: "CWE-538: Insertion of Sensitive Information into Externally-Accessible File or Directory",
    severity: "Contextual: Low to High (Exposes entire application source code, proprietary algorithms, or internal API schemas)",
    difficulty: "Beginner",
    rootCause: "Build pipelines generating `.js.map` files and uploading them to production web roots, or web servers failing to block access to hidden `/.git/` directories.",
    whereTestersLook: "`/.git/HEAD`, `/.git/config`, `/.env`, `/assets/app.js.map`, `/static/js/main.chunk.js.map`.",
    authorizedTestingMethodology: [
      "In an authorized assessment scope, check if `.map` files are publicly downloadable from production URLs referenced in JavaScript comments (`//# sourceMappingURL=...`).",
      "Check if `/.git/HEAD` or `/.env` return HTTP 200 responses with valid repository markers.",
      "Verify whether source maps contain original developer comments, private endpoints, or unreleased features."
    ],
    safeTestExample: {
      requestMethod: "GET",
      endpoint: "/static/js/bundle.js.map",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "GET /static/js/bundle.js.map or GET /.git/HEAD",
      purpose: "Check if production web servers expose source maps or version control metadata.",
      expectedSecureBehavior: "HTTP 404 Not Found or HTTP 403 Forbidden.",
      vulnerableBehaviorIndicators: [
        "HTTP 200 OK returned containing full unminified TypeScript/JavaScript source code in JSON format.",
        "`ref: refs/heads/main` returned from `/.git/HEAD`."
      ]
    },
    evidenceToCollect: "HTTP response snippet showing source map JSON structure or git repository header.",
    developerRemediation: "Configure production build tools (Webpack, Vite, esbuild) to omit source map generation or upload source maps exclusively to private error monitoring servers (e.g., Sentry) rather than public web roots. Block access to hidden dotfiles in web server configs.",
    preventionChecklist: [
      "Set `sourcemap: false` or `hidden-source-map` in production Vite/Webpack builds.",
      "Configure web server rules: `location ~ /\\. { deny all; }` in Nginx.",
      "Audit deployment artifacts in CI/CD before releasing to production."
    ],
    references: [
      { name: "CWE-538: Insertion of Sensitive Information into Externally-Accessible File or Directory", url: "https://cwe.mitre.org/data/definitions/538.html", type: "MITRE" },
      { name: "OWASP Web Security Testing Guide — Review Webserver Metafiles", url: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/03-Review_Webserver_Metafiles_for_Information_Leakage", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  }
];
