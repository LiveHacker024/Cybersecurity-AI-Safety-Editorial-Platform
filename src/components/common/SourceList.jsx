import React from 'react';
import { ExternalLink, ShieldCheck, Building2, Landmark, FileCode2, Newspaper, GraduationCap, Users } from 'lucide-react';

export default function SourceList({ sources = [] }) {
  if (!sources || sources.length === 0) return null;

  const typeConfig = {
    OFFICIAL: { label: "Official Document", icon: ShieldCheck, color: "#10b981" },
    VENDOR: { label: "Vendor Advisory", icon: Building2, color: "#38bdf8" },
    GOVERNMENT: { label: "Government / CISA", icon: Landmark, color: "#f59e0b" },
    RESEARCH: { label: "Security Research", icon: FileCode2, color: "#c084fc" },
    NEWS: { label: "Verified News", icon: Newspaper, color: "#94a3b8" },
    ACADEMIC: { label: "Academic Paper", icon: GraduationCap, color: "#60a5fa" },
    COMMUNITY: { label: "Community Disclosure", icon: Users, color: "#a3e635" }
  };

  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(56, 189, 248, 0.15)',
        borderRadius: '12px',
        padding: '1.25rem',
        marginTop: '2rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <ShieldCheck size={18} color="#00f0ff" />
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Verified Sources & References
        </h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {sources.map((src, index) => {
          const conf = typeConfig[src.type] || typeConfig.OFFICIAL;
          const Icon = conf.icon;
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(5, 8, 17, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '220px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    background: `${conf.color}15`,
                    color: conf.color,
                    border: `1px solid ${conf.color}35`,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <Icon size={11} />
                  {conf.label}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>
                  {src.name}
                </span>
              </div>

              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#00f0ff',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  <span>View Primary Reference</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
