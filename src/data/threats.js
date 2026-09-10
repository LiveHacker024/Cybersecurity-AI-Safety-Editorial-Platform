export const threatNodesData = [
  {
    id: "ai-threats",
    label: "AI THREATS",
    title: "Autonomous Agent Hijacking & Prompt Injections",
    severity: "CRITICAL",
    riskScore: 9.4,
    scoreLabel: "Reference CVSS Score (NVD Base)",
    color: "#00f0ff",
    description: "Adversaries leverage indirect prompt injections, multimodal poisoned payloads, and autonomous agent tool abuse to exfiltrate private corporate data and trigger unauthorized API calls.",
    countermeasures: [
      "Strict input/output guardrails with deterministic validation",
      "Isolated sandboxing for autonomous agent tool execution",
      "Human-in-the-loop approvals for sensitive API mutations",
      "Content provenance verification using digital watermarking"
    ],
    activeVectors: ["Indirect Prompt Injection", "Agent Privilege Escalation", "Voice/Video Deepfake Spoofing"]
  },
  {
    id: "phishing",
    label: "PHISHING",
    title: "AI-Synthesized Phishing & Reverse-Proxy MFA Bypass",
    severity: "HIGH",
    riskScore: 8.8,
    scoreLabel: "Reference CVSS Score (NVD Base)",
    color: "#38bdf8",
    description: "Modern phishing campaigns utilize real-time LLM personalization, spoofed corporate branding, QR codes (quishing), and automated reverse-proxies to bypass standard OTP two-factor authentication.",
    countermeasures: [
      "FIDO2 / WebAuthn hardware security keys & passkeys",
      "Conditional access policies based on device health & location",
      "Automated email gateway inspection with AI anomaly detection",
      "Continuous interactive phishing simulation training"
    ],
    activeVectors: ["Evilginx Reverse Proxies", "QR Code Quishing", "Hyper-targeted Executive Vishing"]
  },
  {
    id: "ransomware",
    label: "RANSOMWARE",
    title: "Intermittent Encryption & Double Extortion",
    severity: "CRITICAL",
    riskScore: 9.6,
    scoreLabel: "Reference CVSS Score (NVD Base)",
    color: "#f43f5e",
    description: "Ransomware groups combine rapid intermittent file encryption with massive cloud data exfiltration and public shaming portals to force high-stakes ransom negotiations.",
    countermeasures: [
      "Immutable, air-gapped backup architectures",
      "Zero Trust network micro-segmentation",
      "Endpoint Detection and Response (EDR) with heuristic killswitches",
      "Rigorous least-privilege identity access management (IAM)"
    ],
    activeVectors: ["Double Extortion Campaigns", "Hypervisor/ESXi Targeting", "Supply Chain Lateral Movement"]
  },
  {
    id: "data-breaches",
    label: "DATA BREACHES",
    title: "API Secret Leakage & Cloud Storage Misconfigurations",
    severity: "HIGH",
    riskScore: 8.6,
    scoreLabel: "Reference CVSS Score (NVD Base)",
    color: "#f59e0b",
    description: "Unauthenticated cloud storage buckets, exposed API tokens in public repositories, and third-party SaaS integrations remain the primary vectors for mass record disclosures.",
    countermeasures: [
      "Automated pre-commit secret scanners in CI/CD pipelines",
      "Cloud Security Posture Management (CSPM) policy audits",
      "Field-level encryption for sensitive personally identifiable data (PII)",
      "Continuous external attack surface management (EASM)"
    ],
    activeVectors: ["Shadow API Endpoints", "CI/CD Token Exposure", "Third-Party Vendor Compromise"]
  },
  {
    id: "identity-fraud",
    label: "IDENTITY FRAUD",
    title: "Synthetic Identities & Biometric Liveness Spoofing",
    severity: "MEDIUM",
    riskScore: 7.9,
    scoreLabel: "Reference CVSS Score (NVD Base)",
    color: "#8b5cf6",
    description: "Combining real consumer fragments with generative AI photos and voice samples to bypass KYC identity verification, open fraudulent credit lines, and execute SIM swaps.",
    countermeasures: [
      "Multi-modal biometric liveness detection with 3D challenge-response",
      "Carrier-level SIM-lock passcodes and eSIM porting safeguards",
      "Hardware-bound device attestation",
      "Zero-knowledge identity proof verification"
    ],
    activeVectors: ["Generative KYC Spoofing", "Unauthorized SIM Porting", "Credential Stuffing"]
  },
  {
    id: "privacy",
    label: "PRIVACY & SURVEILLANCE",
    title: "Cross-App Telemetry & Data Broker Aggregation",
    severity: "MEDIUM",
    riskScore: 7.5,
    scoreLabel: "Reference CVSS Score (NVD Base)",
    color: "#10b981",
    description: "Uncontrolled mobile SDK telemetry, canvas browser fingerprinting, and unregulated third-party data broker trading compromise consumer confidentiality without explicit consent.",
    countermeasures: [
      "System-wide DNS-based tracker blocking (Pi-hole, NextDNS)",
      "Strict app permission sandboxing and tracker opt-outs",
      "Hardware-isolated containerization for untrusted applications",
      "Encrypted DNS over HTTPS (DoH) and zero-logging VPN tunnels"
    ],
    activeVectors: ["Mobile SDK Telemetry Harvesting", "Canvas Fingerprinting", "Location-Data Reselling"]
  }
];

export const breakingNewsTicker = [
  {
    id: "b1",
    tag: "THREAT ALERT",
    text: "Zero-day vulnerability discovered in enterprise VPN gateways — vendor patch advisory issued (CVE-2026-1184).",
    time: "12m ago"
  },
  {
    id: "b2",
    tag: "AI SAFETY",
    text: "Researchers document indirect prompt injection vectors in autonomous desktop agents with tool-use permissions.",
    time: "38m ago"
  },
  {
    id: "b3",
    tag: "BREACH WIRE",
    text: "Major international logistics provider discloses third-party API credential compromise affecting customer records.",
    time: "1h ago"
  },
  {
    id: "b4",
    tag: "PRIVACY ALERT",
    text: "Regulatory update issued regarding AI training dataset consent and biometric scrubbing compliance mandates.",
    time: "2h ago"
  },
  {
    id: "b5",
    tag: "PASSKEY UPDATE",
    text: "Over 82% of major web platforms now support FIDO2 passkeys for phishing-resistant authentication.",
    time: "4h ago"
  }
];

export const liveSecurityMetrics = {
  activeThreatLevel: "ELEVATED",
  globalCveMonitored: "148,000+",
  phishingBlocked24h: "Reference Metric",
  aiAgentVulnsDocumented: "310+",
  defenseGuidesPublished: "10"
};
