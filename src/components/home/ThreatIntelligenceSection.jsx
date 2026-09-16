import React from 'react';
import { ShieldAlert, Globe2, Radio, ArrowRight, FileText } from 'lucide-react';

export default function ThreatIntelligenceSection({ onNavigate }) {
  const intelItems = [
    {
      title: "Nation-State Cyber Operations Against Critical Infrastructure",
      type: "CAMPAIGN ANALYSIS",
      summary: "Tracking living-off-the-land (LotL) binaries and covert router botnet infrastructures used to establish long-term persistence in utility networks.",
      tag: "APT Intelligence",
      color: "#ef4444"
    },
    {
      title: "Ransomware Extortion Lifecycle & Data Exfiltration Mechanics",
      type: "TACTICS & PROCEDURES",
      summary: "Deconstructing modern double-extortion campaigns utilizing unauthenticated edge VPN zero-days for initial footholds and Cobalt Strike beacons.",
      tag: "Malware Triage",
      color: "#f59e0b"
    },
    {
      title: "Adversary-in-the-Middle (AiTM) Phishing Kits & Session Hijacking",
      type: "TECHNIQUE BREAKDOWN",
      summary: "How modern automated reverse proxy frameworks bypass traditional SMS and TOTP multi-factor authentication tokens in real time.",
      tag: "Identity Defense",
      color: "#38bdf8"
    }
  ];

  return (
    <section style={{ padding: '3.5rem 0' }}>
      <div className="container-custom">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
              <Radio size={16} color="#00f0ff" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                GLOBAL THREAT INTELLIGENCE
              </span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Adversary Tactics, Malware & Infrastructure Tracking
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/threat-intelligence')}
            className="btn-cyber-secondary"
            style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
          >
            <span>Threat Intel Hub</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {intelItems.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `3px solid ${item.color}`
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}35`,
                      color: item.color,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {item.type}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.tag}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                  {item.summary}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => onNavigate('/threat-intelligence')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#00f0ff',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>Intelligence Briefing</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
