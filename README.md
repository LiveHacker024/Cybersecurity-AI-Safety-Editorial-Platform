# HackWithKunal — Cybersecurity & AI Safety Editorial Platform

> **Positioning:** Cybersecurity • AI Safety • Privacy • Technology  
> **Mission:** Understand the threats shaping the connected world — and learn how to protect yourself, your business, and your data.  
> **Founder & Lead Researcher:** [Kunal Rajput](https://www.linkedin.com/in/kunal-rajput-64b4002b4) (Junior Penetration Tester at ASD Cybersecurity)

[![Deployment](https://github.com/LiveHacker024/Cybersecurity-AI-Safety-Editorial-Platform/actions/workflows/deploy.yml/badge.svg)](https://github.com/LiveHacker024/Cybersecurity-AI-Safety-Editorial-Platform/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)

---

## 🛡️ Overview

**HackWithKunal** is an independent, production-grade cybersecurity and AI safety editorial platform. Designed with a 70% clean 2D editorial reading interface and 30% interactive Three.js 3D threat intelligence visualization, it delivers rigorous, educational, defensive security analysis for developers, security professionals, and technology enthusiasts.

### Key Pillars

1. **Cybersecurity Intelligence:** Deep dives into ransomware extortion mechanics, data breach lifecycles, and passkey migration architectures.
2. **AI Safety & Agent Security:** Analysis of prompt injection vectors, autonomous AI agent attack surfaces, and deepfake verification protocols.
3. **Evergreen Defensive Guides:** Step-by-step hardening guides for Gmail, WhatsApp, and Android mobile ecosystems.
4. **Client-Side Security Tools:** 100% in-browser Web Crypto security tool suite with zero telemetry or server transmission.
5. **E-E-A-T & Editorial Integrity:** Transparent editorial guidelines, fact-checking workflows, correction policies, and verified author profiles.

---

## ⚡ Core Features

- **Interactive 3D Threat Radar:** Three.js-powered defense core with live node inspection, Reference CVSS scoring, and mobile/reduced-motion fallbacks.
- **Client-Side Security Suite:**
  - *Password Entropy Analyzer:* Real-time bit-entropy, brute-force crack-time estimation, and structural character analysis without sending data to servers.
  - *Passphrase Generator:* Cryptographically secure EFF-style wordlist generator using browser `window.crypto`.
  - *Phishing URL Inspector:* High-risk TLD detection, homograph attack warning, and IP/credential pattern identification.
- **IAB AdSense-Ready Architecture:** Pre-dimensioned ad containers (`Billboard`, `Leaderboard`, `Medium Rectangle`, `In-Feed`) engineered with static CSS reserves to eliminate Cumulative Layout Shift (CLS).
- **SEO & Search Discoverability:** Structured JSON-LD schemas (`NewsArticle`, `NewsMediaOrganization`, `BreadcrumbList`, `FAQPage`, `Person`), dynamic Open Graph tags, XML sitemap with 14 routes, and `robots.txt`.
- **Instant Global Search:** Keyboard-navigable (`Cmd+K` / `Ctrl+K`) search indexing titles, excerpts, tags, and categories.

---

## 🛠️ Technology Stack

- **Framework:** React 18.3.1
- **Bundler:** Vite 6.0.7
- **3D Graphics:** Three.js (WebGL with adaptive particle scaling)
- **Icons:** Lucide React + custom inline vector components
- **Routing:** Pathname-based SPA with GitHub Pages fallback (`404.html`)
- **Styling:** Modular CSS Design System with Cyber Glassmorphism & WCAG AA contrast

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm 9.x or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/LiveHacker024/Cybersecurity-AI-Safety-Editorial-Platform.git
cd Cybersecurity-AI-Safety-Editorial-Platform

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
# Compile and optimize for production (outputs to dist/)
npm run build
```

This compiles optimized bundles and executes `scripts/postbuild.js` to ensure complete GitHub Pages SPA routing support.

---

## 📜 Ethical Security Policy

HackWithKunal is strictly an **educational and defensive cybersecurity publication**. 

- ❌ **Prohibited:** We do not publish exploit code, unauthorized access guides, malware/ransomware blueprints, phishing templates, or instructions on evading law enforcement or security controls.
- ✅ **Encouraged:** High-level vulnerability root-cause analysis, defensive architectural patterns, threat mitigation steps, and responsible disclosure references.

---

## 👤 Founder & Leadership

- **Founder & Lead Researcher:** Kunal Rajput
- **Role:** Junior Penetration Tester at ASD Cybersecurity
- **Certifications:** Certified Ethical Hacker (CEH), Vulnerability Assessment and Penetration Testing (VAPT)
- **Education:** BIT Meerut
- **Connect:** [LinkedIn](https://www.linkedin.com/in/kunal-rajput-64b4002b4) • [YouTube (@HackWithKunal)](https://www.youtube.com/@HackWithKunal)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
