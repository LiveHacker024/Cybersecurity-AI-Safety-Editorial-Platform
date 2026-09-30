/**
 * Security Testing Hub — Category Metadata & Legitimate Educational Lab Resources
 * Strictly authentic resources: OWASP, PortSwigger, NIST, MITRE.
 */

export const securityCategories = [
  {
    id: "api-security",
    slug: "api-security",
    name: "API Security Testing",
    shortTitle: "API Security",
    path: "/security-testing/api-security",
    tagline: "Testing REST, GraphQL, token authorization, API business logic, and backend configurations.",
    description: "Comprehensive guide for authorized security assessments of application programming interfaces (APIs). Focuses on REST, GraphQL, token-based authentication (JWT, OAuth 2.0/OIDC), Object-Level Authorization (BOLA/IDOR), Mass Assignment, rate limiting, and backend API misconfigurations following the OWASP API Security Top 10 framework.",
    icon: "Server",
    color: "#00f0ff",
    badge: "OWASP API Top 10",
    focusAreas: [
      "REST & GraphQL Endpoint Logic",
      "Broken Object Level Authorization (BOLA)",
      "Broken Object Property Level Authorization",
      "Authentication & Token Lifecycles (JWT/OAuth)",
      "Rate Limiting & Resource Exhaustion",
      "Backend Security Misconfigurations"
    ],
    safePracticeGuidance: "Execute API security tests strictly against sandbox environments, staging APIs, or intentionally vulnerable API labs where you have explicit written authorization.",
    verifiedLabs: [
      {
        name: "OWASP crAPI (Completely Ridiculous API)",
        description: "Modern microservices-based intentionally vulnerable API testing platform covering the full OWASP API Security Top 10.",
        url: "https://github.com/OWASP/crAPI",
        type: "Open Source Lab"
      },
      {
        name: "OWASP Juice Shop (API Surface)",
        description: "Rich REST and GraphQL attack surface for learning API authorization and input handling defenses.",
        url: "https://owasp.org/www-project-juice-shop/",
        type: "Interactive Lab"
      },
      {
        name: "OWASP API Security Project",
        description: "Official OWASP documentation and reference framework for API vulnerabilities and threat classifications.",
        url: "https://owasp.org/www-project-api-security/",
        type: "Standard / Framework"
      },
      {
        name: "PortSwigger API Testing Academy",
        description: "Interactive lab exercises exploring API reconnaissance, endpoint discovery, and hidden parameter analysis.",
        url: "https://portswigger.net/web-security/api-testing",
        type: "Educational Lab"
      }
    ],
    faqs: [
      {
        question: "What is the primary difference between API security testing and traditional web testing?",
        answer: "API security testing targets machine-to-machine data exchanges, focusing heavily on object-level authorization (BOLA), parameter manipulation (Mass Assignment), token issuance/validation, and business logic state machines rather than browser rendering contexts (DOM/XSS)."
      },
      {
        question: "Why is BOLA considered the most prevalent API risk?",
        answer: "Modern APIs expose direct database identifiers (IDs/UUIDs) without enforcing that the authenticated token holder possesses valid ownership rights over that specific requested record."
      },
      {
        question: "How should testers verify API rate limiting safely?",
        answer: "Authorized testers should send small, throttled bursts of requests with test tokens to observe whether HTTP 429 Too Many Requests responses and standard RateLimit headers (e.g., RateLimit-Remaining) are returned before resource exhaustion occurs."
      }
    ]
  },
  {
    id: "web-security",
    slug: "web-security",
    name: "Web Security Testing",
    shortTitle: "Web Security",
    path: "/security-testing/web-security",
    tagline: "Testing browser-facing apps, server-side inputs, session states, and web architecture.",
    description: "In-depth testing methodologies for browser-facing web applications, HTTP protocols, input sanitization boundaries, session state lifecycles, cross-origin communication policies, and server-side evaluation engines structured around the OWASP Web Security Testing Guide (WSTG) and OWASP Top 10.",
    icon: "Globe",
    color: "#38bdf8",
    badge: "OWASP Top 10 & WSTG",
    focusAreas: [
      "Access Control & Direct Object References",
      "Injection Vectors (SQLi, NoSQLi, Command, Template)",
      "Cross-Site Scripting (Reflected, Stored, DOM)",
      "Cross-Origin Policies (CORS & CSRF)",
      "Session Lifecycles & State Management",
      "HTTP Protocol Anomalies & Cache Deception"
    ],
    safePracticeGuidance: "Always perform web application testing within local dockerized containers, verified bug bounty target scopes, or approved enterprise test environments.",
    verifiedLabs: [
      {
        name: "PortSwigger Web Security Academy",
        description: "Authoritative free online training platform covering real-world web vulnerabilities with hands-on labs.",
        url: "https://portswigger.net/web-security",
        type: "Educational Academy"
      },
      {
        name: "OWASP Web Security Testing Guide (WSTG v4.2)",
        description: "The premier cybersecurity testing standard for web application security professionals and penetration testers.",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        type: "Standard / Guide"
      },
      {
        name: "OWASP Juice Shop",
        description: "Insecure web application built on Node.js, Express, and Angular for cybersecurity awareness and capture-the-flag training.",
        url: "https://owasp.org/www-project-juice-shop/",
        type: "Interactive Lab"
      },
      {
        name: "Damn Vulnerable Web Application (DVWA)",
        description: "Classic PHP/MySQL web application designed to test security skills and defensive tools legally.",
        url: "https://github.com/digininja/DVWA",
        type: "Open Source Lab"
      }
    ],
    faqs: [
      {
        question: "What is the recommended approach for testing SQL Injection safely?",
        answer: "Authorized testers use benign mathematical assertions (such as evaluating true/false conditions with controlled test datasets) or parameterized query verification in test databases rather than invasive data extraction or DROP TABLE commands."
      },
      {
        question: "What differentiates Reflected XSS from Stored XSS?",
        answer: "Reflected XSS occurs when an immediate user input is mirrored in an HTTP response without sanitization. Stored XSS occurs when the unsanitized payload is persisted in the server database and rendered to subsequent users."
      },
      {
        question: "How does Content Security Policy (CSP) mitigate cross-site scripting?",
        answer: "CSP instructs the browser to only execute scripts from explicitly allowlisted origins and cryptographic nonces, disallowing unauthorized inline scripts and untrusted third-party domains."
      }
    ]
  },
  {
    id: "mobile-security",
    slug: "mobile-security",
    name: "Mobile Security Testing",
    shortTitle: "Mobile Security",
    path: "/security-testing/mobile-security",
    tagline: "Testing Android and iOS applications, storage, IPC, WebViews, and mobile network protocols.",
    description: "Systematic methodology for auditing Android and iOS mobile applications based on the OWASP Mobile Application Security Verification Standard (MASVS) and Mobile Application Security Testing Guide (MASTG). Covers local data storage, exported IPC components, deep links, cryptographic keystores, certificate validation, and client-side authorization.",
    icon: "Smartphone",
    color: "#10b981",
    badge: "OWASP MASVS / MASTG",
    focusAreas: [
      "Android Component Access (Activities, Receivers, Providers)",
      "iOS Keychain & File Protection APIs",
      "Intent Filters, Deep Links & Custom URL Schemes",
      "Mobile WebViews & Bridge Security",
      "Network Security Config & Certificate Pinning",
      "Secure Biometric & Keystore Implementations"
    ],
    safePracticeGuidance: "Test mobile binaries only within rooted/jailbroken virtual emulators or dedicated laboratory test devices designated specifically for security research.",
    verifiedLabs: [
      {
        name: "OWASP Mobile Application Security (MAS)",
        description: "The authoritative industry standard for mobile app security, including MASVS requirements and the MASTG testing checklist.",
        url: "https://mas.owasp.org/",
        type: "Standard / Guide"
      },
      {
        name: "OWASP MSTG Hacking Playground (Android & iOS)",
        description: "Official OWASP test applications containing intentional security vulnerabilities to practice reverse engineering and dynamic analysis.",
        url: "https://github.com/OWASP/MASTG-Hacking-Playground",
        type: "Open Source Lab"
      },
      {
        name: "Android Developers Security Best Practices",
        description: "Official Google Android documentation on secure storage, IPC permissions, and cryptographic key generation.",
        url: "https://developer.android.com/topic/security/best-practices",
        type: "Official Vendor Docs"
      },
      {
        name: "Apple Platform Security Guide",
        description: "Official Apple documentation detailing the Secure Enclave, iOS Keychain access groups, and App Transport Security.",
        url: "https://support.apple.com/guide/security/welcome/web",
        type: "Official Vendor Docs"
      }
    ],
    faqs: [
      {
        question: "Why should client-side mobile logic never be trusted for access control?",
        answer: "Mobile applications run on client-controlled hardware where binary patching, runtime instrumentation (e.g., Frida, Objection), and debuggers can easily bypass local if-else checks. All authorizations must be verified server-side."
      },
      {
        question: "What is the difference between Android SharedPreferences and EncryptedSharedPreferences?",
        answer: "Standard SharedPreferences store XML keys and values in plain text on the device filesystem. EncryptedSharedPreferences automatically encrypts both keys and values using AES-256 backed by the Android Keystore."
      },
      {
        question: "How does iOS File Protection safeguard application data?",
        answer: "iOS File Protection uses the device passcode and hardware encryption keys (NSFileProtectionComplete) to keep stored files inaccessible while the device is locked."
      }
    ]
  }
];
