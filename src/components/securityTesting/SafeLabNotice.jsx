import React from 'react';
import { ShieldCheck, ExternalLink, AlertTriangle } from 'lucide-react';

export default function SafeLabNotice({ verifiedLabs = [], title = "Practice Safely — Authorized Testing Only" }) {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        background: 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.08) 0%, rgba(5, 8, 17, 0.95) 100%)',
        marginBottom: '2rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
        <ShieldCheck size={20} color="#10b981" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
          {title}
        </h3>
      </div>

      <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 1rem' }}>
        Practice only in applications you own, intentionally vulnerable labs, CTF environments, or systems where you have explicit, documented authorization. All examples in this knowledge hub use controlled test identifiers and safe parameters.
      </p>

      {verifiedLabs && verifiedLabs.length > 0 && (
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.6rem' }}>
            Authoritative & Verified Lab Environments:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {verifiedLabs.map((lab, idx) => (
              <a
                key={idx}
                href={lab.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00f0ff' }}>{lab.name}</span>
                  <ExternalLink size={13} color="#94a3b8" />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>{lab.description}</span>
                {lab.type && (
                  <span style={{ fontSize: '0.68rem', color: '#10b981', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                    {lab.type}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
