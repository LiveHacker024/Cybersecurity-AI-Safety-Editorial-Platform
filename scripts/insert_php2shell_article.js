import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const articlesFilePath = path.join(rootDir, 'src', 'data', 'articles.js');

const php2shellArticle = {
  id: "php2shell-php-vulnerability-fix-2026",
  slug: "php2shell-php-vulnerability-fix-2026",
  canonicalUrl: "https://cyberaiwatch.com/vulnerabilities/php2shell-php-vulnerability-fix-2026",
  title: "PHP2Shell Explained: Critical PHP RCE Vulnerabilities, Affected Versions, and Security Fixes",
  subtitle: "A verified technical breakdown of the critical PHP remote code execution vulnerabilities (CVE-2026-109618, CVE-2026-109619, and CVE-2026-115560): root causes, affected runtime environments, emergency patch versions, defensive log auditing, and interim mitigations.",
  seoTitle: "PHP2Shell Explained: PHP RCE Vulnerabilities and Fixes",
  type: "CRITICAL CVE RADAR",
  claimStatus: "SOURCE-VERIFIED",
  status: "PUBLISHED",
  category: "vulnerabilities",
  categoryName: "Vulnerabilities",
  categoryColor: "red",
  tags: [
    "PHP2Shell vulnerability",
    "PHP remote code execution",
    "CVE-2026-109618",
    "CVE-2026-109619",
    "CVE-2026-115560",
    "PHP security update",
    "PHP vulnerability fix",
    "web server security",
    "PHP-FPM security",
    "mod_php RCE",
    "GHSA-w8hw-w9fx-j79w",
    "GHSA-6wmf-4rv5-p3rp",
    "Zend Engine security",
    "CISA KEV",
    "patch management"
  ],
  keywords: "PHP2Shell vulnerability, PHP remote code execution, CVE-2026-109618, CVE-2026-109619, CVE-2026-115560, PHP security update, PHP vulnerability fix, web server security, PHP 8.5.12, PHP 8.4.27, PHP 8.3.36, PHP 8.2.35, mod_php exploit, PHP-FPM RCE, Zend memory corruption",
  author: {
    name: "Kunal Rajput",
    role: "Founder & Editor-in-Chief — CyberAI Watch",
    avatar: "/assets/founder/founder-photo.png",
    verified: true
  },
  publishedAt: "October 24, 2026",
  updatedAt: "October 24, 2026",
  readingTime: "18 min read",
  heroImage: "/assets/images/php2shell-php-vulnerability-fix-2026-hero.jpg",
  heroImageAlt: "PHP2Shell remote code execution vulnerability breakdown, affected PHP versions, and enterprise security update verification",
  featured: true,
  trending: true,
  badge: "CRITICAL SECURITY BULLETIN",
  excerpt: "A comprehensive, source-verified investigation into PHP2Shell (CVE-2026-109618 & CVE-2026-109619) and the related CVE-2026-115560 advisory: dissecting core Zend engine memory corruption, affected runtimes from mod_php to PHP-FPM, verified patch versions, defensive log auditing labs, and practical mitigation steps.",
  keyTakeaways: [
    "On October 21, 2026, the PHP development team released emergency security updates addressing two critical vulnerabilities—CVE-2026-109618 and CVE-2026-109619 (collectively dubbed 'PHP2Shell')—both assigned a CVSS v4.0 score of 9.2.",
    "The vulnerabilities reside in the core Zend Engine runtime: CVE-2026-109618 triggers out-of-memory corruption during request cleanup, while CVE-2026-109619 triggers a use-after-free flaw when request-owned internal state survives across subsequent worker executions.",
    "All web request execution models are exposed, with Apache mod_php categorized by the PHP security team as carrying the highest risk because unauthenticated requests trigger memory corruption before any application code executes.",
    "Official patched releases are PHP 8.5.12, 8.4.27, 8.3.36, and 8.2.35. A separate informational advisory issued on October 23, 2026 addresses CVE-2026-115560 (session upload progress), which is slated for regular scheduled bugfix releases.",
    "Web Application Firewalls (WAFs) and reverse proxy rate limits provide valuable interim shielding but do NOT resolve underlying engine memory corruption; applying official runtime patches and restarting web workers is the only complete remediation."
  ],
  tableOfContents: [
    {
      id: "what-is-php2shell-and-why-is-it-important",
      title: "1. What Is PHP2Shell, and Why Is It Important?"
    },
    {
      id: "understanding-cve-2026-109618-and-cve-2026-109619",
      title: "2. Understanding CVE-2026-109618 and CVE-2026-109619"
    },
    {
      id: "how-remote-code-execution-works",
      title: "3. How Remote Code Execution Works"
    },
    {
      id: "which-php-versions-and-server-configurations-are-affected",
      title: "4. Which PHP Versions and Server Configurations Are Affected?"
    },
    {
      id: "how-to-check-your-php-version-and-apply-security-updates",
      title: "5. How to Check Your PHP Version and Apply Security Updates"
    },
    {
      id: "defensive-lab-review-server-logs-and-investigate-suspicious-processes",
      title: "6. Defensive Lab: Review Server Logs and Investigate Suspicious Processes"
    },
    {
      id: "related-advisory-cve-2026-115560",
      title: "7. Related Advisory: CVE-2026-115560"
    },
    {
      id: "lessons-for-website-owners-developers-and-ethical-hackers",
      title: "8. Lessons for Website Owners, Developers, and Ethical Hackers"
    },
    {
      id: "frequently-asked-questions",
      title: "9. Frequently Asked Questions"
    },
    {
      id: "conclusion",
      title: "10. Conclusion"
    },
    {
      id: "verified-sources-and-references",
      title: "11. Verified Sources & References"
    }
  ],
  content: `# PHP2Shell Explained: Critical PHP RCE Vulnerabilities and How to Fix Them

**Published:** October 24, 2026 | **Updated:** October 24, 2026 | **Author:** Kunal Rajput, Founder & Editor-in-Chief

On October 21, 2026, the global web security landscape received an urgent bulletin from the PHP development team: the simultaneous disclosure of two critical remote code execution (RCE) vulnerabilities in the core PHP runtime engine. Tracked as **CVE-2026-109618** and **CVE-2026-109619**, and rapidly dubbed **"PHP2Shell"** across cybersecurity circles, both flaws carry an official **CVSS v4.0 severity rating of 9.2 (Critical)**. Two days later, on October 23, 2026, the PHP team issued a complementary informational security advisory addressing **CVE-2026-115560**, a distinct session upload progress serialization issue.

Because the PHP engine underpins more than 75% of server-side websites worldwide—powering WordPress, Drupal, Joomla, Laravel, Symfony, and enterprise corporate portals—these disclosures demand immediate technical triage. The vulnerabilities operate below the application level: an unauthenticated remote attacker can trigger severe memory corruption inside the web server worker process before any framework authentication, routing, or database validation ever runs.

In this source-verified technical investigation, **CyberAI Watch** breaks down the exact mechanics of PHP2Shell, audits verified primary advisories, evaluates runtime environment risk factors across Apache \`mod_php\` and PHP-FPM, conducts a safe defensive log-auditing lab, and provides an authoritative roadmap to verify and patch your systems.

---

## What Is PHP2Shell, and Why Is It Important?

To grasp the severity of PHP2Shell, one must first recognize the structural role PHP plays in modern server architecture.

### What PHP Does on a Web Server

When an HTTP client requests a dynamic webpage or submits a form, the front-end web server (such as Nginx, Apache HTTP Server, LiteSpeed, or Caddy) does not parse the script itself. Instead, it dispatches the request to the PHP interpreter—often through FastCGI Process Manager (**PHP-FPM**), an embedded module like **\`mod_php\`**, or an integrated execution bridge such as **FrankenPHP**.

The core PHP engine (the Zend Engine) is responsible for:
1. Allocating memory buffers for the incoming HTTP request body, headers, and multipart form streams.
2. Parsing request parameters, cookies, and uploaded files.
3. Compiling and executing the application's PHP scripts in an isolated memory context.
4. Tearing down the request context, resetting internal states, and freeing heap memory back to the operating system or internal allocator pool.

### What the PHP2Shell Moniker Represents

**"PHP2Shell"** is the collective technical moniker assigned by vulnerability researchers to describe the exploit chain potential of **CVE-2026-109618** and **CVE-2026-109619**. The name highlights the direct consequence of unauthenticated exploitation: transforming an unauthenticated, malformed HTTP request sent over port 80 or 443 into an interactive command shell executing with the privileges of the underlying web server process (such as \`www-data\`, \`nobody\`, or an isolated application pool user).

### Why Remote Code Execution (RCE) Is Catastrophic

Remote Code Execution represents the highest tier of cybersecurity risk. When an adversary achieves RCE on a web application server:
- **Full Data Exposure:** Attackers can read configuration files containing database passwords, encryption salts, and cloud service API keys (such as \`wp-config.php\`, \`.env\`, or IAM instance metadata credentials).
- **Database Exfiltration:** With server-level access, threat actors can directly dump internal databases, exfiltrating customer records, financial transactions, and credential hashes.
- **Web Shell Persistence:** Attackers routinely write backdoor web shells into writable media directories, ensuring persistent access even if transient server states are reset.
- **Lateral Movement & Infrastructure Pivot:** The compromised web worker serves as a launchpad to scan internal corporate networks, pivot toward internal microservices, or execute container breakouts.

### Why Internet-Facing PHP Deployments Require Immediate Attention

Unlike traditional application vulnerabilities (like SQL injection or Cross-Site Scripting), which depend on coding mistakes inside custom themes, plugins, or controllers, PHP2Shell is a **core runtime vulnerability**. An attacker does not need to locate a flawed form input or vulnerable plugin endpoint. If a web server exposes an unpatched PHP runtime to the public internet, the flaw is reachable during initial request ingestion.

### Understanding Threat Telemetry: Separating Facts from Speculation

In high-profile vulnerability disclosures, sensationalized reporting often confuses theoretical risk with actual damage. Defenders must enforce technical precision:

<div style="overflow-x: auto; margin: 2rem 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left; background: #0b0f19; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px;">
  <thead>
    <tr style="background: rgba(239, 68, 68, 0.15); border-bottom: 2px solid rgba(239, 68, 68, 0.3);">
      <th style="padding: 0.85rem 1rem; color: #ff5555; font-weight: 800;">Operational Category</th>
      <th style="padding: 0.85rem 1rem; color: #ff5555; font-weight: 800;">Technical Meaning</th>
      <th style="padding: 0.85rem 1rem; color: #ff5555; font-weight: 800;">Current Status for PHP2Shell</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700; white-space: nowrap;">Vulnerability Disclosure</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">Official announcement confirming a security flaw in software code.</td>
      <td style="padding: 0.75rem 1rem;"><span style="padding: 0.2rem 0.5rem; border-radius: 4px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: #10b981; font-size: 0.75rem; font-weight: 700;">CONFIRMED (Oct 21, 2026)</span></td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700; white-space: nowrap;">Proof of Concept (PoC)</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">Code demonstrating exploitability under controlled laboratory parameters.</td>
      <td style="padding: 0.75rem 1rem;"><span style="padding: 0.2rem 0.5rem; border-radius: 4px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: #10b981; font-size: 0.75rem; font-weight: 700;">DEMONSTRATED IN LABS</span></td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700; white-space: nowrap;">Observed Attack Traffic</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">Telemetry showing automated scanning, fuzzing, and payload probes.</td>
      <td style="padding: 0.75rem 1rem;"><span style="padding: 0.2rem 0.5rem; border-radius: 4px; background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.35); color: #eab308; font-size: 0.75rem; font-weight: 700;">ACTIVE SCANNING DETECTED</span></td>
    </tr>
    <tr>
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700; white-space: nowrap;">Confirmed Compromise</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">Forensically validated unauthorized breach resulting in persistent adversary control.</td>
      <td style="padding: 0.75rem 1rem;"><span style="padding: 0.2rem 0.5rem; border-radius: 4px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8; font-size: 0.75rem; font-weight: 700;">ORGANIZATION-SPECIFIC TRIAGE</span></td>
    </tr>
  </tbody>
</table>
</div>

---

## Understanding CVE-2026-109618 and CVE-2026-109619

While grouped together under the PHP2Shell banner, CVE-2026-109618 and CVE-2026-109619 exploit fundamentally distinct failure modes inside the Zend Engine's memory lifecycle.

### CVE-2026-109618: RCE via Out-of-Memory (OOM) Corruption

- **GitHub Advisory ID:** [GHSA-w8hw-w9fx-j79w](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)
- **Official Severity:** CVSS v4.0 9.2 (Critical)
- **Primary Mechanism:** Out-of-Memory (OOM) handling control-flow corruption during request termination.

#### Root Cause Analysis
During incoming HTTP request parsing (such as decoding multi-part form data, building parameter hash tables, or assembling file upload buffers), the PHP engine allocates heap memory via its internal memory manager (\`zend_mm\`). If an allocation request exceeds the configured \`memory_limit\` or system allocator capacity, the engine triggers an immediate bail-out sequence.

In C, the Zend Engine historically accomplishes this non-local jump using \`longjmp()\`. The flaw arises because this abrupt abort interrupts PHP while internal request data structures are only partially allocated and uninitialized. 

When execution jumps directly to the request shutdown and cleanup routines, the cleanup logic improperly assumes that these structures are fully formed and valid. As the engine attempts to iterate through and free these uninitialized pointers, it branches on uninitialized memory fields. By carefully staging the memory layout prior to the OOM condition, an unauthenticated attacker can control these pointers, inducing heap memory corruption that can be leveraged to hijack execution flow.

#### Conditions Required for Exploitation
1. The web server must accept an HTTP request with input designed to trigger an allocation failure at an exact phase of request initialization.
2. The server must enforce a finite PHP \`memory_limit\` or encounter an OS-level allocation failure during request parsing.
3. The engine's request termination handler must proceed to parse the uninitialized structures.

### CVE-2026-109619: RCE via Stale Global State (Use-After-Free)

- **GitHub Advisory ID:** [GHSA-6wmf-4rv5-p3rp](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)
- **Official Severity:** CVSS v4.0 9.2 (Critical)
- **Primary Mechanism:** Request-owned internal state survives across request boundaries in persistent worker processes (Use-After-Free).

#### Root Cause Analysis
In high-performance environments (such as PHP-FPM, Apache worker MPMs, FrankenPHP, and LiteSpeed LSAPI), worker processes are persistent. Rather than terminating after a single request, a worker process services hundreds or thousands of sequential requests.

The Zend Engine maintains certain global state variables and pointer tables that point to request-allocated memory. In standard execution, these global pointers are cleared at the end of the request. However, when an execution context encounters specific fatal errors or uncaught exceptions handled via \`longjmp()\`, the global pointer reset is bypassed.

Consequently, request A terminates, and its backing heap memory is freed. Yet, the persistent worker process retains global state pointers that still reference this deallocated heap region. When request B arrives at that exact same worker, the engine accesses this stale global state before normal initialization resets it. This creates a classic **Use-After-Free (UAF)** condition, allowing an attacker to read residual sensitive memory or execute arbitrary code by supplying data that occupies the freshly freed heap chunk.

#### Conditions Required for Exploitation
1. An attacker sends an initial request to a worker process that intentionally triggers a fatal error or exception (such as through specific upload-progress session handlers or PHP 8.5 fatal backtraces).
2. The worker aborts execution and retains dangling pointers to request-allocated memory.
3. The attacker (or an automated script) immediately sends a secondary request to the same worker process, triggering execution against the stale memory state.

### Comparison Matrix: CVE-2026-109618 vs. CVE-2026-109619

<div style="overflow-x: auto; margin: 2rem 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left; background: #0b0f19; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px;">
  <thead>
    <tr style="background: rgba(14, 165, 233, 0.15); border-bottom: 2px solid rgba(56, 189, 248, 0.3);">
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Identifier</th>
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Vulnerability Mechanism</th>
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Trigger Phase</th>
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Potential Impact</th>
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Recommended Remediation</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700; white-space: nowrap;">CVE-2026-109618</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">Out-of-Memory (OOM) memory corruption during cleanup</td>
      <td style="padding: 0.75rem 1rem; color: #94a3b8;">Request body & multipart parsing</td>
      <td style="padding: 0.75rem 1rem; color: #ef4444; font-weight: 700;">Unauthenticated RCE</td>
      <td style="padding: 0.75rem 1rem; color: #38bdf8;">Upgrade to PHP 8.5.12, 8.4.27, 8.3.36, or 8.2.35</td>
    </tr>
    <tr>
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700; white-space: nowrap;">CVE-2026-109619</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">Stale global state / Use-After-Free across worker requests</td>
      <td style="padding: 0.75rem 1rem; color: #94a3b8;">Cross-request worker reuse</td>
      <td style="padding: 0.75rem 1rem; color: #ef4444; font-weight: 700;">RCE & Sensitive Memory Leakage</td>
      <td style="padding: 0.75rem 1rem; color: #38bdf8;">Upgrade runtime; interim: disable session upload progress & restart workers</td>
    </tr>
  </tbody>
</table>
</div>

---

## How Remote Code Execution Works

To demystify how a software bug transforms into arbitrary code execution, consider the lifecycle of an HTTP request through a conceptual, non-weaponized model.

### Normal Request Processing Lifecycle

In a secure, normally executing environment:
1. **HTTP Ingestion:** The client sends an HTTP POST request containing form fields.
2. **Interpreter Initialization:** The PHP engine allocates dedicated memory for the request (\`RINIT\` phase).
3. **Execution:** The application script runs, queries a database, and generates HTML.
4. **Clean Teardown:** The engine invokes \`RSHUTDOWN\`. It iterates through allocated objects, deallocates request memory, resets global state pointers to \`NULL\`, and returns the worker process cleanly to the idle queue.

### The Exploited Lifecycle: Memory Corruption via Improper Control Flow

In an exploited scenario under CVE-2026-109618 or CVE-2026-109619:

\`\`\`
[ Attacker HTTP Request ]
          │
          ▼
[ Web Server (Nginx / Apache / LiteSpeed) ]
          │
          ▼
[ PHP Worker Process (PHP-FPM / mod_php) ]
          │
          ├─► Normal Initialization Begins
          │   Allocates partial memory structures
          │
          ├─► [Trigger Event: Allocation Failure / Fatal Error]
          │   Premature longjmp() abort called
          │
          ├─► [Fault Point: Incomplete Cleanup]
          │   • Pointers left uninitialized (CVE-2026-109618) OR
          │   • Dangling global pointers survive to next request (CVE-2026-109619)
          │
          ├─► Engine reads attacker-staged heap memory
          │   Instruction pointer (RIP/EIP) hijacked
          │
          ▼
[ Execution of Arbitrary Shellcode / Command Execution under www-data ]
\`\`\`

Because the CPU executes whatever instruction sequence is referenced by the corrupted pointer, control flow diverts away from valid PHP bytecode and into memory containing executable machine instructions supplied by the attacker. At that moment, the attacker has achieved remote code execution.

> **Responsible Security Notice:** CyberAI Watch does not publish functional exploit code, weaponized payloads, or bypass syntax. All technical analysis is presented strictly for defensive understanding, detection engineering, and patch verification.

---

## Which PHP Versions and Server Configurations Are Affected?

The PHP development team has officially confirmed that all PHP installations handling web requests are exposed. 

### Verified Patch Versions

The official security release published on **October 21, 2026** provides fixes across all active, supported PHP branches:

<div style="overflow-x: auto; margin: 2rem 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left; background: #0b0f19; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px;">
  <thead>
    <tr style="background: rgba(14, 165, 233, 0.15); border-bottom: 2px solid rgba(56, 189, 248, 0.3);">
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">PHP Branch</th>
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Vulnerable Range</th>
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Verified Fixed Version</th>
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Lifecycle Status</th>
      <th style="padding: 0.85rem 1rem; color: #00f0ff; font-weight: 800;">Official Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700;">PHP 8.5</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">8.5.0 – 8.5.11</td>
      <td style="padding: 0.75rem 1rem; color: #10b981; font-weight: 800;">PHP 8.5.12</td>
      <td style="padding: 0.75rem 1rem; color: #38bdf8;">Active Support</td>
      <td style="padding: 0.75rem 1rem;"><a href="https://news-web.php.net/php.announce/513" target="_blank" rel="noopener noreferrer" style="color: #00f0ff; text-decoration: underline;">php.announce/513</a></td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700;">PHP 8.4</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">8.4.0 – 8.4.26</td>
      <td style="padding: 0.75rem 1rem; color: #10b981; font-weight: 800;">PHP 8.4.27</td>
      <td style="padding: 0.75rem 1rem; color: #38bdf8;">Active Support</td>
      <td style="padding: 0.75rem 1rem;"><a href="https://www.php.net/archive/2026.php#2026-10-21-3" target="_blank" rel="noopener noreferrer" style="color: #00f0ff; text-decoration: underline;">PHP 8.4.27 Notice</a></td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700;">PHP 8.3</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">8.3.0 – 8.3.35</td>
      <td style="padding: 0.75rem 1rem; color: #10b981; font-weight: 800;">PHP 8.3.36</td>
      <td style="padding: 0.75rem 1rem; color: #38bdf8;">Active Support</td>
      <td style="padding: 0.75rem 1rem;"><a href="https://www.php.net/archive/2026.php#2026-10-21-2" target="_blank" rel="noopener noreferrer" style="color: #00f0ff; text-decoration: underline;">PHP 8.3.36 Notice</a></td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700;">PHP 8.2</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">8.2.0 – 8.2.34</td>
      <td style="padding: 0.75rem 1rem; color: #10b981; font-weight: 800;">PHP 8.2.35</td>
      <td style="padding: 0.75rem 1rem; color: #eab308; font-weight: 700;">EOL Dec 31, 2026</td>
      <td style="padding: 0.75rem 1rem;"><a href="https://www.php.net/archive/2026.php#2026-10-21-1" target="_blank" rel="noopener noreferrer" style="color: #00f0ff; text-decoration: underline;">PHP 8.2.35 Notice</a></td>
    </tr>
    <tr>
      <td style="padding: 0.75rem 1rem; color: #f8fafc; font-weight: 700;">PHP 8.1 & older</td>
      <td style="padding: 0.75rem 1rem; color: #cbd5e1;">5.4 through 8.1.x</td>
      <td style="padding: 0.75rem 1rem; color: #ef4444; font-weight: 800;">No Official Upstream Release</td>
      <td style="padding: 0.75rem 1rem; color: #ef4444; font-weight: 700;">End of Life (EOL)</td>
      <td style="padding: 0.75rem 1rem;"><a href="https://github.com/php/php-src/tree/PHP-8.1-CVE-2026-109618-109619" target="_blank" rel="noopener noreferrer" style="color: #00f0ff; text-decoration: underline;">Minimal Git Backports</a></td>
    </tr>
  </tbody>
</table>
</div>

*Note on End-of-Life Versions:* PHP 8.1, 8.0, and 7.4 no longer receive official point releases. However, due to the acute severity of PHP2Shell, the PHP security team committed minimal source-level backport branches to the official GitHub repository for organizations compiling from source. Linux distributions with Long Term Support (such as Ubuntu ESM, RHEL, and Debian LTS) provide vendor-backported binaries.

*Pre-Release Testing:* Developers testing upcoming PHP releases should note that **PHP 8.6.0 RC4** includes these fixes.

### Server Runtime Analysis: Where Is the Risk Highest?

The practical exposure of an organization depends heavily on the specific execution runtime:

1. **Apache with \`mod_php\` (Highest Risk):**  
   The official PHP security advisory specifically flags \`mod_php\` as carrying the highest severity. When running \`mod_php\`, the interpreter executes inside the Apache process itself. Threat researchers demonstrated that an unauthenticated HTTP request can trigger the OOM corruption flaw **before any application-level routing or security code executes**, bypassing all framework middleware.
2. **PHP-FPM (FastCGI Process Manager):**  
   PHP-FPM is the standard production architecture paired with Nginx and Apache. Workers persist across hundreds of requests. This makes PHP-FPM especially vulnerable to **CVE-2026-109619**, where a fatal error induced in request A leaves stale global pointers active when the worker receives request B.
3. **FrankenPHP:**  
   FrankenPHP utilizes CGo to embed persistent PHP worker threads directly within the Go-based Caddy web server. Its persistent worker model means stale global state vulnerabilities can persist across requests within a thread unless patched.
4. **LiteSpeed Web Server (LSAPI):**  
   LiteSpeed's high-performance LSAPI processes requests through persistent workers, rendering it susceptible to the same worker-state reuse and OOM cleanup failures as PHP-FPM.
5. **php-cgi:**  
   Legacy CGI models spawn a new process per request, neutralizing cross-request stale state flaws (CVE-2026-109619). However, they remain fully vulnerable to single-request OOM memory corruption (CVE-2026-109618).

### The WAF Myth: Why Firewalls Cannot Replace Patches

Both Cloudflare and the PHP development team issued clear warnings regarding perimeter defenses:

> "While edge WAF rules provide an essential perimeter defense layer and buy time, they do not patch the underlying vulnerability. Administrators must update PHP to the officially patched versions." — Cloudflare Security Advisory

A Web Application Firewall examines incoming HTTP traffic for signature patterns (such as known exploit payloads or header anomalies). However:
- Attackers can vary multipart boundaries, character encodings, and chunked transfer encodings to bypass static signatures.
- Internal memory pointer corruption occurs entirely within the server's heap memory management, which no reverse proxy can inspect or sanitize.
- Relying on a WAF without patching leaves internal network interfaces, staging domains, and API endpoints unprotected.

For related defensive threat intelligence, consult our [CVE Vulnerability Tracker](/vulnerabilities) and our guide on [Web Application Security Testing](/security-testing/web-security).

---

## How to Check Your PHP Version and Apply Security Updates

Upgrading your PHP runtime requires a structured, safe approach.

### Step 1: Verify the Active Runtime (Not Just the CLI)

A frequent pitfall for system administrators is checking only the command-line interface. On modern Linux servers, the CLI binary (\`/usr/bin/php\`) is often completely independent of the PHP-FPM service or Apache module.

Safe CLI check:
\`\`\`bash
# Check the CLI binary version
php -v
\`\`\`

Safe Web Server FPM check:
\`\`\`bash
# Query the FPM binary directly
php-fpm8.3 -v

# Or inspect the running process command-line on Linux
cat /proc/$(pgrep -f "php-fpm: master" | head -n 1)/cmdline | tr '\\0' ' '
\`\`\`

> **Security Warning on \`phpinfo()\`:** Never create an unauthenticated \`info.php\` file in a public web root. Exposing \`phpinfo()\` discloses server software versions, internal IP addresses, compiler flags, and active modules to prospective attackers. If temporary script validation is necessary, restrict access strictly to \`127.0.0.1\` via your web server configuration and delete the diagnostic file immediately after use.

### Step 2: Apply Security Updates via Package Managers

#### On Ubuntu / Debian:
\`\`\`bash
# Update repository package indices
sudo apt update

# Upgrade only the PHP packages to minimize change scope
sudo apt --only-upgrade install php8.3-fpm php8.3-cli php8.3-common php8.3-curl php8.3-mbstring

# CRITICAL: Restart the worker service to load patched binaries into memory
sudo systemctl restart php8.3-fpm

# Reload web server to ensure FastCGI sockets reconnect cleanly
sudo systemctl reload nginx
\`\`\`

#### On RHEL / Rocky Linux / AlmaLinux:
\`\`\`bash
# Check available updates
sudo dnf check-update php

# Apply updates from configured repositories (e.g., Remi)
sudo dnf upgrade php php-fpm

# Restart the PHP FastCGI manager and web server
sudo systemctl restart php-fpm
sudo systemctl reload httpd
\`\`\`

#### In Containerized Environments (Docker / Kubernetes):
Never patch a running container in production. Rebuild your base image:
\`\`\`dockerfile
# Update Dockerfile base image to verified release
FROM php:8.3.36-fpm-alpine

# Rebuild without cache to ensure latest system packages
# docker build --no-cache -t myapp:patched .
\`\`\`
Deploy the updated container image through your CI/CD pipeline and execute rolling restarts of all pods.

### Step 3: Verify the Running Service

Ensure the patched binary is actively serving traffic:
\`\`\`bash
# Confirm worker processes were spawned after the upgrade timestamp
ps -eo pid,lstart,cmd | grep php-fpm
\`\`\`

If running version checks confirms you are running **8.5.12, 8.4.27, 8.3.36, or 8.2.35**, the primary PHP2Shell vulnerabilities are remediated.

---

## Defensive Lab: Review Server Logs and Investigate Suspicious Processes

For authorized systems administrators and SOC analysts, conducting a defensive audit of server telemetry helps identify scanning attempts or anomalous process behaviors.

### 1. Review Web Server Access and Error Logs

Access logs reveal inbound scanning spikes, while error logs document segmentation faults and allocation failures:

\`\`\`bash
# Search Nginx error logs for abnormal FastCGI worker exits or segfaults
sudo grep -Ei "recv\\(\\) failed|upstream prematurely closed connection|segfault" /var/log/nginx/error.log

# Search PHP-FPM logs for rapid memory exhaustion fatal errors
sudo grep -Ei "Allowed memory size of|child .* exited on signal 11" /var/log/php8.3-fpm.log
\`\`\`

### 2. Identify Abnormal Request Signatures

Examine access logs for patterns associated with CVE-2026-109618 probes:
\`\`\`bash
# Search for consecutive HTTP 500 responses with large request bodies
sudo awk '$9 ~ /500/ {print $1, $4, $7, $9, $10}' /var/log/nginx/access.log | head -n 30
\`\`\`
Look for:
- Requests lacking a valid \`Content-Length\` header or carrying negative values.
- Abnormal, deeply nested multipart form boundaries.
- Rapid bursts of requests from a single IP directed at endpoints processing file uploads.

### 3. Audit Active Processes for Unexpected Child Shells

In an RCE scenario, an attacker typically instructs the worker process to spawn a shell. Under normal operations, a PHP-FPM worker should never spawn \`/bin/sh\` or \`/bin/bash\`.

Safe, read-only process inspection commands:
\`\`\`bash
# Audit process hierarchy for PHP-FPM master and workers
pstree -p $(pgrep -f "php-fpm: master" | head -n 1)

# Check for spawned interactive shells running under web users
ps -ef | grep -E "sh|bash|dash|python|perl|nc|ncat|socat|wget|curl" | grep -E "www-data|apache|nobody"

# Audit open network sockets owned by web workers
sudo lsof -i -n -P | grep -E "www-data|apache|php-fpm"
\`\`\`

If you observe an established outbound connection from a \`www-data\` process to an unfamiliar external IP address, treat the server as an active incident.

### 4. Correlate with System and Deployment Logs

Cross-reference suspicious timestamps against:
- Authentication logs (\`/var/log/auth.log\` or \`journalctl -u ssh\`) to verify whether administrator logins coincided with unusual activity.
- File integrity monitoring (AIDE, Tripwire, or Git status) in web directories to detect unauthorized PHP web shells (\`git status --ignored\`).

> **Crucial Defensive Caveat:** The absence of suspicious log entries does **not** prove that a server was never compromised. Advanced adversaries can execute payloads entirely in memory or alter log files if root escalation occurs. If compromise is suspected, isolate the host from the network, capture a volatile memory dump, and initiate standard incident response procedures.

---

## Related Advisory: CVE-2026-115560

On October 23, 2026, the PHP development team published an informational security bulletin addressing a separate issue: **CVE-2026-115560** ([Informational Advisory 2026-10-23-1](https://www.php.net/archive/2026.php#2026-10-23-1)).

### The Affected Feature and Specific Conditions

CVE-2026-115560 concerns PHP's session upload progress feature (\`session.upload_progress.enabled\`), which monitors file upload metrics via session data. 

For an application to be vulnerable to this theoretical RCE vector, it must meet **all three** of the following conditions simultaneously:
1. The server or base application configuration sets \`session.serialize_handler\` to \`php_binary\` or \`php_serialize\`.
2. The application code explicitly alters this setting at runtime to \`php\` using \`ini_set('session.serialize_handler', 'php')\` **before** calling \`session_start()\`.
3. Session upload progress remains enabled in \`php.ini\` (which is the default).

Applications that do not dynamically swap serialization handlers at runtime are **not exposed**.

### Patch Status and Official Timeline

Because this configuration combination is rare across standard production software, the PHP maintainers determined that an emergency out-of-band release was unnecessary. Instead, the official code fix for CVE-2026-115560 is scheduled for inclusion in the next regular bugfix release cycle.

> **Important Clarification:** The October 21 emergency updates (PHP 8.5.12, 8.4.27, 8.3.36, 8.2.35) resolved CVE-2026-109618 and CVE-2026-109619. They **did not** include a code fix for CVE-2026-115560.

### Recommended Temporary Mitigation

To protect environments where application code behavior is uncertain, the PHP maintainers recommend disabling the upload progress directive in \`php.ini\`:

\`\`\`ini
; Recommended mitigation in php.ini
session.upload_progress.enabled = 0
\`\`\`

After modifying \`php.ini\`, reload your PHP workers:
\`\`\`bash
sudo systemctl restart php8.3-fpm
\`\`\`

*Note:* If you already applied \`session.upload_progress.enabled = 0\` on October 21 as an interim mitigation for CVE-2026-109619, **your environment is already protected** against CVE-2026-115560, and no additional configuration changes are required.

*Application Impact:* Disabling this setting disables the internal tracking mechanism used by legacy HTML upload progress meters. Modern applications utilizing asynchronous client-side chunked uploads (e.g., via JavaScript Fetch or Tus protocols) are unaffected.

---

## Lessons for Website Owners, Developers, and Ethical Hackers

The disclosure of PHP2Shell provides critical architectural lessons for enterprise security teams:

### 10-Point Defensive Hardening Checklist

1. **Continuous Asset Discovery:** Maintain an updated inventory of all running web assets. Organizations frequently discover vulnerable PHP instances in abandoned staging environments, internal wikis, and forgotten container clusters.
2. **Track EOL Milestones:** Formulate migration plans well ahead of vendor deadlines. **PHP 8.2 reaches End-of-Life on December 31, 2026**, after which it will receive no further official security updates.
3. **Automated, Tested Patch Pipelines:** Modern DevSecOps teams should have automated canary testing environments capable of deploying PHP runtime updates within hours of release.
4. **Enforce Least Privilege:** Never run PHP workers as \`root\`. Use dedicated system users (\`www-data\`), configure separate PHP-FPM pools per application, and mount web directories with read-only permissions where write access is not strictly required.
5. **Egress Network Filtering:** Use host firewalls (\`iptables\` / \`nftables\` / AWS Security Groups) to **block all outbound connections** initiated by web server user accounts. If a web worker cannot initiate outbound TCP connections to external IP addresses, reverse shells fail.
6. **Decouple Secrets from Process Memory:** Avoid storing production database credentials in global environment variables accessible to process dumps. Use specialized secrets managers or volume-mounted secret files with strict permissions.
7. **Centralized Log Ingestion:** Stream access, error, and process execution logs off-host to a centralized SIEM (Splunk, Elastic, Datadog) to prevent attackers from scrubbing local log trails.
8. **Immutable Backups:** Maintain offsite, versioned backups with air-gapped retention to safeguard against ransomware deployment following server compromise.
9. **Incident Response Preparedness:** Ensure SOC analysts have documented playbooks for containing compromised web workers without taking down business operations unnecessarily.
10. **Authorized Security Testing:** Continually assess your attack surface through authorized vulnerability testing and penetration testing exercises (see our guide on [API Security Testing](/security-testing/api-security)).

---

## Frequently Asked Questions

### What is PHP2Shell?
PHP2Shell is the moniker given to two critical remote code execution vulnerabilities—CVE-2026-109618 and CVE-2026-109619—discovered in the core PHP Zend runtime engine, both rated CVSS 9.2 (Critical).

### Is PHP2Shell a PHP framework or a vulnerability?
PHP2Shell is **not** a framework, library, or product. It is a security vulnerability moniker coined by researchers to highlight that unauthenticated HTTP requests can yield remote shell execution on unpatched PHP servers.

### Which PHP versions need security updates?
All active PHP branches require updates: upgrade PHP 8.5 to **8.5.12**, PHP 8.4 to **8.4.27**, PHP 8.3 to **8.3.36**, and PHP 8.2 to **8.2.35**. EOL versions (PHP 8.1 and older) should be migrated immediately or patched using minimal source backports.

### Does updating PHP eliminate all related risks?
Updating your PHP runtime to the patched releases completely remediates the underlying memory corruption flaws (CVE-2026-109618 and CVE-2026-109619). However, if an attacker previously compromised your server before patches were applied, updating the binary will not remove established backdoors or stolen credentials. A forensic audit is required.

### Can a WAF replace a PHP security patch?
No. While Web Application Firewalls provide a valuable interim defense, attackers can bypass WAF rule signatures. A WAF cannot repair memory corruption inside the PHP binary; only updating the runtime provides a definitive fix.

### How can I check whether my website runs PHP?
You can inspect HTTP response headers (look for \`X-Powered-By: PHP\`, though often suppressed), check your hosting control panel (cPanel, Plesk, Cloudflare dashboard), or query your server directly using \`php-fpm -v\` or package manager queries (\`dpkg -l | grep php\`, \`rpm -qa | grep php\`).

### What should I do if I suspect a compromise?
Immediately isolate the affected server from the network, capture a volatile memory snapshot for forensic analysis, inspect active processes for unauthorized child shells, review external network connections, rotate all database credentials and API secrets, and restore from a known clean backup.

### What is the difference between CVE-2026-109618, CVE-2026-109619, and CVE-2026-115560?
CVE-2026-109618 is an out-of-memory heap corruption flaw during request aborts; CVE-2026-109619 is a cross-request use-after-free flaw caused by stale global pointers; CVE-2026-115560 is a distinct session upload progress serialization issue scheduled for the next regular bugfix cycle.

---

## Conclusion

The PHP2Shell vulnerability disclosures represent a landmark reminder of the foundational role that runtime engines play in internet security. Because the vulnerabilities operate within the core request parser and memory allocator of the Zend Engine, no application-level framework can completely insulate an unpatched deployment.

Security teams and website administrators must take decisive action:
1. Verify the exact running PHP runtime version across all web server pools.
2. Upgrade to the officially released patch versions (**PHP 8.5.12, 8.4.27, 8.3.36, or 8.2.35**) immediately.
3. Restart all PHP-FPM, Apache, and container worker services to ensure unpatched binaries are cleared from system memory.
4. Review the October 23 informational advisory for CVE-2026-115560 and evaluate whether setting \`session.upload_progress.enabled = 0\` is appropriate for your application architecture.

By combining timely patch management with defensive egress filtering and rigorous log auditing, organizations can eliminate exposure to PHP2Shell and safeguard their infrastructure against emerging web threats.

---

## Verified Sources & References

1. **The PHP Group / Daniel Scherzer** (October 21, 2026). *[ANNOUNCE] PHP 8.5.12 Released*. PHP Mailing Lists (\`php.announce/513\`).  
   Direct URL: [https://news-web.php.net/php.announce/513](https://news-web.php.net/php.announce/513)
2. **The PHP Group** (October 21, 2026). *Security advisory: Critical remote code execution vulnerabilities, update now*. Official PHP News Archive 2026 (\`#2026-10-21-5\`).  
   Direct URL: [https://www.php.net/archive/2026.php#2026-10-21-5](https://www.php.net/archive/2026.php#2026-10-21-5)
3. **The PHP Group** (October 23, 2026). *Informational advisory: Session upload progress*. Official PHP News Archive 2026 (\`#2026-10-23-1\`).  
   Direct URL: [https://www.php.net/archive/2026.php#2026-10-23-1](https://www.php.net/archive/2026.php#2026-10-23-1)
4. **GitHub Security Advisory** (October 21, 2026). *GHSA-w8hw-w9fx-j79w: RCE via OOM corruption (CVE-2026-109618)*.  
   Direct URL: [https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)
5. **GitHub Security Advisory** (October 21, 2026). *GHSA-6wmf-4rv5-p3rp: RCE via stale global state (CVE-2026-109619)*.  
   Direct URL: [https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)
6. **Google Cloud Security** (October 21, 2026). *Responding to Core PHP Vulnerabilities: CVE-2026-109618 and CVE-2026-109619 (GCP-2026-070)*. Google Cloud Security Blog.  
   Direct URL: [https://cloud.google.com/blog/products/identity-security/responding-to-core-php-vulnerabilities-cve-2026-109618-cve-2026-109619](https://cloud.google.com/blog/products/identity-security/responding-to-core-php-vulnerabilities-cve-2026-109618-cve-2026-109619)
7. **Cloudflare Threat Research** (October 21, 2026). *Mitigating Critical PHP Vulnerabilities with Cloudflare WAF*. Cloudflare Blog.  
   Direct URL: [https://blog.cloudflare.com/php-vulnerabilities-waf-protection/](https://blog.cloudflare.com/php-vulnerabilities-waf-protection/)
8. **Qualys Threat Research** (October 21, 2026). *PHP Announces Critical Security Release for Two Vulnerabilities*. Qualys Security Blog.  
   Direct URL: [https://blog.qualys.com/vulnerabilities-threat-research/2026/10/20/php-announces-critical-security-release-for-two-vulnerabilities](https://blog.qualys.com/vulnerabilities-threat-research/2026/10/20/php-announces-critical-security-release-for-two-vulnerabilities)
9. **Palo Alto Networks Unit 42** (October 22, 2026). *Threat Brief: Core PHP Vulnerabilities CVE-2026-109618 and CVE-2026-109619*. Unit 42 Threat Intelligence.  
   Direct URL: [https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/](https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/)
10. **Canadian Centre for Cyber Security** (October 21, 2026). *Alert AL26-026: Critical Vulnerabilities Impacting PHP (CVE-2026-109618 and CVE-2026-109619)*. Cyber Centre Advisories.  
    Direct URL: [https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619](https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619)
`,
  faqs: [
    {
      question: "What is PHP2Shell?",
      answer: "PHP2Shell is the collective security moniker given to two critical remote code execution vulnerabilities—CVE-2026-109618 and CVE-2026-109619—discovered in the core PHP Zend runtime engine, both carrying an official CVSS v4.0 severity rating of 9.2 (Critical)."
    },
    {
      question: "Is PHP2Shell a PHP framework or a vulnerability?",
      answer: "PHP2Shell is not a framework, software package, or tool. It is an editorial and threat-research term describing the risk of unauthenticated remote command execution resulting from memory corruption in core PHP runtimes."
    },
    {
      question: "Which PHP versions need security updates?",
      answer: "All active PHP versions require updates: PHP 8.5 must be updated to 8.5.12, PHP 8.4 to 8.4.27, PHP 8.3 to 8.3.36, and PHP 8.2 to 8.2.35. EOL versions (PHP 8.1 and earlier) should be upgraded to a supported release or patched using vendor-provided LTS packages."
    },
    {
      question: "Does updating PHP eliminate all related risks?",
      answer: "Updating to the patched PHP releases resolves the core vulnerabilities. However, if a server was already compromised prior to patching, updating the binary will not remove established backdoors, altered files, or leaked credentials. A thorough forensic audit and credential rotation are recommended."
    },
    {
      question: "Can a WAF replace a PHP security patch?",
      answer: "No. Web Application Firewalls provide valuable interim request filtering, but they cannot fix underlying engine memory corruption and can be bypassed using obfuscated payloads or alternative encodings. Patching the PHP engine and restarting workers is required."
    },
    {
      question: "How can I check whether my website runs PHP?",
      answer: "You can check response headers (such as X-Powered-By), check your hosting control panel, or connect to your server terminal and inspect active processes using 'php -v' and 'ps aux | grep php-fpm'."
    },
    {
      question: "What should I do if I suspect a compromise?",
      answer: "Immediately isolate the server from the network, capture volatile memory and disk snapshots, inspect running processes for unexpected child shells spawned under www-data, rotate all database passwords and API keys, and restore systems from a known clean backup."
    },
    {
      question: "What is the difference between CVE-2026-109618, CVE-2026-109619, and CVE-2026-115560?",
      answer: "CVE-2026-109618 is an out-of-memory memory corruption flaw triggered during request abort cleanup; CVE-2026-109619 is a cross-request use-after-free flaw caused by stale global pointers; CVE-2026-115560 is a separate session upload progress issue that requires specific dynamic handler changes at runtime and is slated for the regular release cycle."
    }
  ],
  sources: [
    {
      name: "The PHP Group",
      title: "[ANNOUNCE] PHP 8.5.12 Released",
      url: "https://news-web.php.net/php.announce/513",
      date: "October 21, 2026",
      type: "Official Release Announcement",
      note: "Primary security release announcement for PHP 8.5.12 confirming critical RCE fixes for CVE-2026-109618 and CVE-2026-109619."
    },
    {
      name: "The PHP Group",
      title: "Security advisory: Critical remote code execution vulnerabilities, update now",
      url: "https://www.php.net/archive/2026.php#2026-10-21-5",
      date: "October 21, 2026",
      type: "Official Security Advisory",
      note: "Comprehensive advisory detailing affected deployments, mod_php risk level, and interim mitigation parameters."
    },
    {
      name: "The PHP Group",
      title: "Informational advisory: Session upload progress",
      url: "https://www.php.net/archive/2026.php#2026-10-23-1",
      date: "October 23, 2026",
      type: "Informational Advisory",
      note: "Official guidance regarding session upload progress serialization (CVE-2026-115560) and session.upload_progress.enabled mitigation."
    },
    {
      name: "GitHub Security Advisory",
      title: "GHSA-w8hw-w9fx-j79w: RCE via OOM corruption (CVE-2026-109618)",
      url: "https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w",
      date: "October 21, 2026",
      type: "Vulnerability Database",
      note: "Technical vulnerability record documenting Zend Engine out-of-memory control flow corruption."
    },
    {
      name: "GitHub Security Advisory",
      title: "GHSA-6wmf-4rv5-p3rp: RCE via stale global state (CVE-2026-109619)",
      url: "https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp",
      date: "October 21, 2026",
      type: "Vulnerability Database",
      note: "Technical vulnerability record detailing cross-request worker stale state persistence."
    },
    {
      name: "Google Cloud Security",
      title: "Responding to Core PHP Vulnerabilities (CVE-2026-109618 & CVE-2026-109619)",
      url: "https://cloud.google.com/blog/products/identity-security/responding-to-core-php-vulnerabilities-cve-2026-109618-cve-2026-109619",
      date: "October 21, 2026",
      type: "Cloud Security Bulletin",
      note: "Google Cloud security analysis (GCP-2026-070) detailing Looker, App Engine, Compute Engine, and GKE mitigation protocols."
    },
    {
      name: "Cloudflare Threat Research",
      title: "Mitigating Critical PHP Vulnerabilities with Cloudflare WAF",
      url: "https://blog.cloudflare.com/php-vulnerabilities-waf-protection/",
      date: "October 21, 2026",
      type: "Threat Analysis & WAF Guidance",
      note: "Cloudflare technical disclosure detailing emergency managed rulesets, payload mutation observations, and patching requirements."
    },
    {
      name: "Qualys Threat Research",
      title: "PHP Announces Critical Security Release for Two Vulnerabilities",
      url: "https://blog.qualys.com/vulnerabilities-threat-research/2026/10/20/php-announces-critical-security-release-for-two-vulnerabilities",
      date: "October 21, 2026",
      type: "Security Research Briefing",
      note: "Vulnerability research evaluating exploitation pre-conditions, memory management, and enterprise remediation."
    },
    {
      name: "Palo Alto Networks Unit 42",
      title: "Threat Brief: Core PHP Vulnerabilities CVE-2026-109618 and CVE-2026-109619",
      url: "https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/",
      date: "October 22, 2026",
      type: "Threat Intelligence Brief",
      note: "Threat telemetry analysis tracking in-the-wild scanning patterns and proof-of-concept exploit circulation."
    },
    {
      name: "Canadian Centre for Cyber Security",
      title: "Alert AL26-026: Critical Vulnerabilities Impacting PHP",
      url: "https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619",
      date: "October 21, 2026",
      type: "Government Cyber Alert",
      note: "National cyber security center advisory warning Canadian and international organizations to patch PHP deployments."
    }
  ],
  relatedArticles: [
    "fortimail-cve-2026-104286-cert-in-alert",
    "ai-agents-south-korean-bank-hacks-artex-claude",
    "openai-ai-agents-tried-hacking-four-websites"
  ]
};

// Read current articles.js
let content = fs.readFileSync(articlesFilePath, 'utf8');

// Check if article is already inserted
if (content.includes('php2shell-php-vulnerability-fix-2026')) {
  console.log('Article already exists in articles.js, updating...');
  // Read using import
  import(articlesFilePath).then(module => {
    const list = module.articlesData;
    const idx = list.findIndex(a => a.slug === 'php2shell-php-vulnerability-fix-2026');
    if (idx >= 0) {
      list[idx] = php2shellArticle;
    } else {
      list.unshift(php2shellArticle);
    }
    const outputCode = `/**
 * Authentic Editorial Article Database for CyberAI Watch
 * STRICT ZERO-FABRICATION POLICY: Grounded in real technical research, verified CVEs, and real-world architectures.
 */

export const articlesData = ${JSON.stringify(list, null, 2)};
`;
    fs.writeFileSync(articlesFilePath, outputCode, 'utf8');
    console.log('✓ Successfully updated articles.js with php2shell article!');
  });
} else {
  // Insert at beginning of articlesData array
  const targetPattern = /export const articlesData = \[\s*\{/;
  if (targetPattern.test(content)) {
    const serialized = JSON.stringify(php2shellArticle, null, 2);
    const replacement = `export const articlesData = [\n  ${serialized},\n  {`;
    content = content.replace(targetPattern, replacement);
    fs.writeFileSync(articlesFilePath, content, 'utf8');
    console.log('✓ Successfully prepended PHP2Shell article to articles.js!');
  } else {
    console.error('Could not find articlesData array start pattern!');
    process.exit(1);
  }
}
