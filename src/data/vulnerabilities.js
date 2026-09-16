/**
 * Authentic Vulnerability & CVE Tracker Database
 * Sourced from official CISA Known Exploited Vulnerabilities (KEV), NVD, and Vendor Advisories.
 * STRICT ZERO-FABRICATION POLICY: All CVEs represent real documented security advisories.
 */

export const vulnerabilitiesData = [
  {
    cveId: "CVE-2024-3400",
    name: "Palo Alto Networks PAN-OS Command Injection",
    vendor: "Palo Alto Networks",
    product: "PAN-OS (GlobalProtect Gateway)",
    affectedVersions: "PAN-OS 10.2, PAN-OS 11.0, PAN-OS 11.1 (with GlobalProtect enabled)",
    fixedVersions: "PAN-OS 10.2.9-h1, 11.0.4-h1, 11.1.2-h3 and later hotfixes",
    severity: "CRITICAL",
    cvss: 10.0,
    attackVector: "Network (AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H)",
    impact: "Unauthenticated Remote Code Execution with Root privileges",
    exploitationStatus: "Active in Wild (CISA KEV)",
    disclosureDate: "April 12, 2024",
    vendorAdvisory: "https://security.paloaltonetworks.com/CVE-2024-3400",
    mitigation: "Apply the latest hotfix provided by Palo Alto Networks. If hotfixes cannot be applied immediately, enable Threat Prevention signatures 94970, 94971, and 94972 on data interfaces to block exploit payloads.",
    detectionGuidance: "Inspect telemetry and web server logs for irregular SESSID cookies containing shell escape characters such as backticks or semicolon syntax directed at GlobalProtect portals.",
    references: [
      { name: "CISA KEV Advisory", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", type: "GOVERNMENT" },
      { name: "Palo Alto Security Advisory", url: "https://security.paloaltonetworks.com/CVE-2024-3400", type: "VENDOR" },
      { name: "NVD Detail CVE-2024-3400", url: "https://nvd.nist.gov/vuln/detail/CVE-2024-3400", type: "OFFICIAL" },
      { name: "Volexity Threat Research", url: "https://www.volexity.com/blog/2024/04/12/zero-day-exploitation-of-palo-alto-networks-pan-os-cve-2024-3400/", type: "RESEARCH" }
    ]
  },
  {
    cveId: "CVE-2024-21887",
    name: "Ivanti Connect Secure and Policy Secure Command Injection",
    vendor: "Ivanti",
    product: "Connect Secure (ICS) & Policy Secure (IPS)",
    affectedVersions: "ICS 9.x, 22.x; IPS 9.x, 22.x",
    fixedVersions: "Ivanti Connect Secure 22.4R2.2, 22.5R1.1 and subsequent patches",
    severity: "CRITICAL",
    cvss: 9.1,
    attackVector: "Network (AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H)",
    impact: "Authenticated / Chained Remote Command Execution as root user",
    exploitationStatus: "Active in Wild (CISA KEV)",
    disclosureDate: "January 10, 2024",
    vendorAdvisory: "https://forums.ivanti.com/s/article/KB-CVE-2023-46805-Authentication-Bypass-CVE-2024-21887-Command-Injection-for-Ivanti-Connect-Secure-and-Policy-Secure-Gateways",
    mitigation: "Import the XML mitigation file provided by Ivanti or apply full software patch updates. Run the external Integrity Checker Tool (ICT) before and after upgrading.",
    detectionGuidance: "Check for abnormal child processes spawned by python3 or lighttpd processes in web log dumps and examine internal ICT mismatch outputs.",
    references: [
      { name: "CISA Emergency Directive 24-01", url: "https://www.cisa.gov/news-events/directives/ed-24-01-mitigate-ivanti-connect-secure-and-ivanti-policy-secure-vulnerabilities", type: "GOVERNMENT" },
      { name: "Ivanti Knowledge Base", url: "https://forums.ivanti.com/", type: "VENDOR" },
      { name: "NVD CVE-2024-21887", url: "https://nvd.nist.gov/vuln/detail/CVE-2024-21887", type: "OFFICIAL" },
      { name: "Mandiant Incident Triage", url: "https://www.mandiant.com/resources/blog/suspected-apt-targets-ivanti-zero-day", type: "RESEARCH" }
    ]
  },
  {
    cveId: "CVE-2024-1709",
    name: "ConnectWise ScreenConnect Authentication Bypass",
    vendor: "ConnectWise",
    product: "ScreenConnect (Server)",
    affectedVersions: "ScreenConnect 23.9.7 and prior versions",
    fixedVersions: "ScreenConnect 23.9.8 and later",
    severity: "CRITICAL",
    cvss: 10.0,
    attackVector: "Network (AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H)",
    impact: "Complete server takeover and arbitrary administrative user creation",
    exploitationStatus: "Active in Wild (CISA KEV)",
    disclosureDate: "February 19, 2024",
    vendorAdvisory: "https://www.connectwise.com/company/trust/security-bulletins/connectwise-screenconnect-23.9.8",
    mitigation: "Upgrade self-hosted on-premise ScreenConnect servers immediately to version 23.9.8 or higher. Cloud-hosted instances were patched automatically by the vendor.",
    detectionGuidance: "Audit `/SetupWizard.aspx` web hits on uninitialized endpoints and inspect the internal user database for newly registered local administrative accounts.",
    references: [
      { name: "ConnectWise Advisory Bulletin", url: "https://www.connectwise.com/company/trust/security-bulletins", type: "VENDOR" },
      { name: "CISA KEV Inclusion", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", type: "GOVERNMENT" },
      { name: "Huntress Threat Analysis", url: "https://www.huntress.com/blog/slashandgrab-connect-bypass-cve-2024-1709", type: "RESEARCH" }
    ]
  },
  {
    cveId: "CVE-2023-34362",
    name: "Progress MOVEit Transfer SQL Injection",
    vendor: "Progress Software",
    product: "MOVEit Transfer",
    affectedVersions: "MOVEit Transfer versions prior to 2021.0.6, 2021.1.4, 2022.0.4, 2022.1.5, 2023.0.1",
    fixedVersions: "MOVEit Transfer 2021.0.6, 2021.1.4, 2022.0.4, 2022.1.5, 2023.0.1 and subsequent patches",
    severity: "CRITICAL",
    cvss: 9.8,
    attackVector: "Network (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)",
    impact: "Unauthenticated SQL injection leading to remote access and mass data exfiltration",
    exploitationStatus: "Active in Wild (CISA KEV)",
    disclosureDate: "May 31, 2023",
    vendorAdvisory: "https://community.progress.com/s/article/MOVEit-Transfer-Critical-Vulnerability-31May2023",
    mitigation: "Disable external HTTP/HTTPS traffic to MOVEit Transfer until patched. Apply official Progress hotfixes. Inspect file systems for unauthorized `human2.aspx` webshells.",
    detectionGuidance: "Scan IIS web root for unauthorized `.aspx` files and review SQL query logs for anomalous transactions against the session table.",
    references: [
      { name: "CISA Joint Cybersecurity Advisory", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a", type: "GOVERNMENT" },
      { name: "NVD Detail CVE-2023-34362", url: "https://nvd.nist.gov/vuln/detail/CVE-2023-34362", type: "OFFICIAL" },
      { name: "Progress Security Bulletin", url: "https://community.progress.com", type: "VENDOR" }
    ]
  },
  {
    cveId: "CVE-2021-44228",
    name: "Apache Log4j2 JNDI Remote Code Execution (Log4Shell)",
    vendor: "Apache Software Foundation",
    product: "Log4j Core",
    affectedVersions: "Log4j 2.0-beta9 through 2.14.1",
    fixedVersions: "Log4j 2.15.0, 2.16.0, 2.17.1 (and 2.12.4 for Java 7)",
    severity: "CRITICAL",
    cvss: 10.0,
    attackVector: "Network (AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H)",
    impact: "Arbitrary code execution via JNDI lookup expressions parsed in logged strings",
    exploitationStatus: "Active in Wild (CISA KEV)",
    disclosureDate: "December 10, 2021",
    vendorAdvisory: "https://logging.apache.org/log4j/2.x/security.html",
    mitigation: "Upgrade Log4j dependencies to version 2.17.1 or higher. In legacy unpatched systems, remove the `JndiLookup` class from classpath via `zip -q -d log4j-core-*.jar org/apache/logging/log4j/core/lookup/JndiLookup.class`.",
    detectionGuidance: "Inspect application inbound header logs (User-Agent, X-Forwarded-For, etc.) for `${jndi:ldap://...}` or nested `${lower:j}${lower:n}...` obfuscated string lookups.",
    references: [
      { name: "CISA Log4j Guidance", url: "https://www.cisa.gov/news-events/alerts/2021/12/10/apache-releases-log4j-version-2150-address-critical-rce-vulnerability", type: "GOVERNMENT" },
      { name: "NVD Detail CVE-2021-44228", url: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228", type: "OFFICIAL" },
      { name: "Apache Logging Security", url: "https://logging.apache.org/log4j/2.x/security.html", type: "VENDOR" }
    ]
  }
];
