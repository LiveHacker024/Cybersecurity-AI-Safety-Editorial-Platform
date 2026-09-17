import React from 'react';
import { AlertOctagon, ExternalLink, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { getAllVulnerabilities } from '../../utils/storage';
import SeverityBadge from '../common/SeverityBadge';

export default function VulnerabilitiesWidget({ onNavigate }) {
  const vulns = getAllVulnerabilities().slice(0, 3);

  return (
    <section style={{ padding: '3.5rem 0', background: 'rgba(15, 23, 42, 0.25)', borderTop: '1px solid rgba(239, 68, 68, 0.15)', borderBottom: '1px solid rgba(239, 68, 68, 0.15)' }}>
      <div className="container-custom">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
              <Activity size={16} color="#ef4444" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                AUTHENTIC CVE TRACKER • CISA KEV & NVD
              </span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Active Exploits & Critical Vulnerability Advisories
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/vulnerabilities')}
            className="btn-cyber-secondary"
            style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
          >
            <span>View Full CVE Registry</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
          {vulns.map((v) => (
            <div
              key={v.cveId}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(5, 8, 17, 0.8)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                    {v.cveId}
                  </span>
                  <SeverityBadge severity={v.severity} cvss={v.cvss} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                  {v.name}
                </h3>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  <strong style={{ color: '#cbd5e1' }}>Product:</strong> {v.product} ({v.vendor})
                </div>

                <div style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.2rem' }}>
                    Remediation Action:
                  </span>
                  <p style={{ fontSize: '0.78rem', color: '#e2e8f0', margin: 0, lineHeight: 1.45 }}>
                    {v.mitigation}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', color: '#64748b' }}>
                <span>Status: <strong style={{ color: '#f87171' }}>{v.exploitationStatus}</strong></span>
                <a
                  href={v.vendorAdvisory}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#00f0ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                >
                  <span>Advisory</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
