import React, { useEffect } from 'react';
import { ShieldCheck, Scale, FileCheck, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';

export default function EditorialStandardsPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    updateMetaTags({
      title: "Editorial Standards & Fact-Checking Policy — HackWithKunal",
      description: "HackWithKunal publishing ethics, CVE validation guidelines, corrections policy, and strict non-malicious security research principles.",
      url: window.location.href
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '840px' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <ShieldCheck size={14} /> PUBLISHING PRINCIPLES
          </div>
          <h1 className="font-heading" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Editorial Standards & Fact-Checking Policy
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Our commitment to technical rigor, ethical vulnerability disclosure, source transparency, and independent cybersecurity journalism.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#00f0ff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={20} /> 1. Defensive Security Pledge (Non-Malicious Research)
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7 }}>
              HackWithKunal is strictly dedicated to defensive cybersecurity, privacy protection, and AI safety engineering. We do <strong>NOT</strong> provide actionable hacking tutorials for unlawful unauthorized access, credential stuffing tools, weaponized malware payloads, or automated exploit frameworks targeting specific organizations. All vulnerability demonstrations use controlled local sandboxes and open research standards (OWASP, NIST).
            </p>
          </div>

          <div>
            <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileCheck size={20} /> 2. Technical Verification & Source Validation
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Every threat alert, CVE writeup, and security advisory undergoes hands-on technical verification. When covering zero-days or data breaches, our editorial team:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} color="#00f0ff" /> Cross-references CVE IDs with the National Vulnerability Database (NVD) and vendor security bulletins.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} color="#00f0ff" /> Clearly distinguishes confirmed compromises from unverified dark web claims and ransom claims.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} color="#00f0ff" /> Re-evaluates CVSS v3.1 and v4.0 severity scoring based on real-world exploitability.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#34d399', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Scale size={20} /> 3. Corrections & Transparency Policy
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7 }}>
              If an error is discovered in our reporting, we correct it promptly and transparently. Substantive corrections are marked with an updated timestamp and an explicit correction note at the base of the article detailing what was modified.
            </p>
          </div>

          <div>
            <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} /> 4. Advertising & Editorial Independence (Google AdSense)
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Editorial decisions are made independently of advertising partners and sponsors. All advertisements, including Google AdSense displays, are clearly demarcated with standardized labels. We never publish paid covert advertorials disguised as objective security research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
