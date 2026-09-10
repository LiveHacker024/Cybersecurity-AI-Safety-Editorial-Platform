export const guidesData = [
  {
    id: "how-to-protect-gmail-account",
    slug: "how-to-protect-gmail-account",
    title: "How to Protect Your Gmail Account from Takeovers: Complete Hardening Guide",
    difficulty: "Beginner",
    timeToComplete: "10 mins",
    category: "guides",
    categoryName: "Security Guides",
    categoryColor: "rose",
    author: "Kunal Rajput",
    publishedAt: "September 8, 2026",
    heroImage: "/assets/images/pexels-pixabay-60504.jpg",
    summary: "A step-by-step defensive guide to enabling phishing-resistant Passkeys, configuring Advanced Protection Program, and revoking dangerous third-party OAuth app permissions.",
    steps: [
      {
        stepNumber: 1,
        title: "Enable FIDO2 Passkeys & Disable SMS Verification",
        details: "Navigate to Google Account Security -> Passkeys and Security Keys. Create a hardware-backed passkey using your device's biometric sensor or YubiKey. SMS verification is vulnerable to SIM-swapping and must be disabled as a primary recovery method."
      },
      {
        stepNumber: 2,
        title: "Audit Third-Party App & OAuth Permissions",
        details: "Go to Data & Privacy -> Third-party apps with account access. Immediately revoke access for abandoned apps, old browser extensions, and tools requesting full mailbox read/write access."
      },
      {
        stepNumber: 3,
        title: "Activate Enhanced Safe Browsing for Chrome & Gmail",
        details: "Turn on Enhanced Safe Browsing to provide proactive real-time protection against malicious downloads, zero-day phishing links, and deceptive extensions."
      },
      {
        stepNumber: 4,
        title: "Enroll in Google Advanced Protection Program (For High-Risk Users)",
        details: "If you are a journalist, executive, or security professional, enroll in the free Google Advanced Protection Program, which mandates physical hardware security keys for login."
      }
    ],
    checklist: [
      "FIDO2 Passkey or Hardware Key Configured",
      "SMS 2FA Disabled / Deprecated",
      "Third-party OAuth permissions audited and pruned",
      "Enhanced Safe Browsing enabled",
      "Recovery email and phone number verified and secured with unique passwords"
    ]
  },
  {
    id: "how-to-detect-phishing-message",
    slug: "how-to-detect-phishing-message",
    title: "How to Detect an AI-Generated Phishing Message: 6 Telltale Signals",
    difficulty: "Beginner",
    timeToComplete: "5 mins",
    category: "guides",
    categoryName: "Security Guides",
    categoryColor: "rose",
    author: "Kunal Rajput",
    publishedAt: "September 7, 2026",
    heroImage: "/assets/images/pexels-dan-nelson-1667453-3949100.jpg",
    summary: "AI has eliminated spelling errors from phishing emails. Learn how to inspect email headers, analyze punycode domain spoofing, and identify conversational manipulation triggers.",
    steps: [
      {
        stepNumber: 1,
        title: "Inspect the Sender Envelope vs. Display Name",
        details: "Never trust the friendly sender name. Always expand the header details to view the actual Return-Path and SPF/DKIM authentication status."
      },
      {
        stepNumber: 2,
        title: "Beware of Artificially Heightened Urgency",
        details: "AI phishing templates deliberately induce psychological panic (e.g., 'Account termination in 2 hours', 'Payroll invoice suspension') to bypass rational scrutiny."
      },
      {
        stepNumber: 3,
        title: "Analyze Hyperlinks Before Clicking",
        details: "Hover over hyperlinks or long-press on mobile to inspect the actual destination URL. Look for subtle typosquatting (e.g., 'micros0ft.com' or 'paypaI.com' with an uppercase 'i')."
      },
      {
        stepNumber: 4,
        title: "Never Scan Unsolicited QR Codes (Quishing)",
        details: "Adversaries embed malicious URLs inside QR codes in PDF attachments to evade email gateway text scanners. Scan only QR codes from physically verified sources."
      }
    ],
    checklist: [
      "Checked full email address and Return-Path header",
      "Verified SPF and DKIM pass indicators",
      "Inspected link destination without clicking",
      "Verified request through an independent out-of-band communication channel"
    ]
  },
  {
    id: "how-to-secure-whatsapp-privacy",
    slug: "how-to-secure-whatsapp-privacy",
    title: "How to Harden WhatsApp Security & Privacy: Essential Checklist",
    difficulty: "Beginner",
    timeToComplete: "8 mins",
    category: "guides",
    categoryName: "Security Guides",
    categoryColor: "rose",
    author: "Kunal Rajput",
    publishedAt: "September 6, 2026",
    heroImage: "/assets/images/pexels-tima-miroshnichenko-5380792.jpg",
    summary: "Lock down your WhatsApp account against account hijacking, number spoofing, and unauthorized cloud backup reading with end-to-end encrypted backup keys.",
    steps: [
      {
        stepNumber: 1,
        title: "Enable Two-Step Verification with a Custom PIN",
        details: "Go to Settings -> Account -> Two-step verification. Set a 6-digit PIN. This prevents anyone from registering your phone number on a new device even if they intercept an SMS OTP."
      },
      {
        stepNumber: 2,
        title: "Turn on End-to-End Encrypted Cloud Backups",
        details: "By default, Google Drive and iCloud WhatsApp backups are unencrypted in storage. Go to Settings -> Chats -> Chat backup -> End-to-end encrypted backup and set a 64-digit cryptographic key or custom password."
      },
      {
        stepNumber: 3,
        title: "Protect IP Address in Calls",
        details: "Go to Settings -> Privacy -> Advanced -> Protect IP address in calls. This relays peer-to-peer calls through WhatsApp servers so third parties cannot log your ISP IP address."
      },
      {
        stepNumber: 4,
        title: "Silence Unknown Callers & Audit Linked Devices",
        details: "Turn on 'Silence Unknown Callers' to eliminate unsolicited spam calls. Regularly check 'Linked Devices' to ensure no unauthorized browser sessions remain open."
      }
    ],
    checklist: [
      "Two-step 6-digit PIN activated",
      "End-to-end encrypted backup enabled with secret key",
      "Protect IP address in calls turned on",
      "Silence unknown callers enabled",
      "Linked devices audited and old sessions logged out"
    ]
  },
  {
    id: "how-to-secure-android-phone",
    slug: "how-to-secure-android-phone",
    title: "How to Secure an Android Phone: Sideloading, Permissions & Spyware Defense",
    difficulty: "Intermediate",
    timeToComplete: "12 mins",
    category: "guides",
    categoryName: "Security Guides",
    categoryColor: "rose",
    author: "Kunal Rajput",
    publishedAt: "September 5, 2026",
    heroImage: "/assets/images/pexels-tima-miroshnichenko-5380675.jpg",
    summary: "A comprehensive technical lockdown guide for modern Android devices: disabling dangerous permissions, auditing accessibility services, and configuring Private DNS.",
    steps: [
      {
        stepNumber: 1,
        title: "Audit Accessibility & Special App Access Permissions",
        details: "Go to Settings -> Apps -> Special app access -> Accessibility. Spyware often abuses Accessibility services to log keystrokes and capture screen frames. Ensure only trusted system tools have this permission."
      },
      {
        stepNumber: 2,
        title: "Disable Sideloading from Unknown Sources",
        details: "Ensure 'Install unknown apps' is disabled for all browsers, file managers, and messaging apps to prevent drive-by malicious APK installations."
      },
      {
        stepNumber: 3,
        title: "Configure Encrypted Private DNS (NextDNS / Cloudflare)",
        details: "Go to Network & Internet -> Private DNS. Enter a secure DoH hostname (e.g., 'dns.quad9.net' or 'security.cloudflare-dns.com') to encrypt all DNS queries and block malicious domains at the network level."
      },
      {
        stepNumber: 4,
        title: "Enable Google Play Protect & Reboot Regularly",
        details: "Ensure Play Protect real-time scanning is active. Rebooting your phone at least once every 48 hours clears non-persistent memory-only spyware payloads."
      }
    ],
    checklist: [
      "Accessibility services restricted to essential tools",
      "Unknown APK installation blocked",
      "Encrypted Private DNS active",
      "Biometric app lock configured for sensitive financial applications",
      "Bi-weekly device reboot cycle maintained"
    ]
  }
];

export const getGuideBySlug = (slug) => guidesData.find(g => g.slug === slug);
