import React from 'react';
import { ShieldCheck, ArrowRight, ExternalLink, Award, FileCheck } from 'lucide-react';
import { Linkedin, Youtube } from '../common/SocialIcons';
import { siteConfig } from '../../config/site';

export default function FounderTrustSection({ onNavigate }) {
  const founder = siteConfig.founder;

  return (
    <section style={{ padding: '4rem 0', background: 'rgba(5, 8, 17, 0.6)', borderTop: '1px solid rgba(56, 189, 248, 0.1)', borderBottom: '1px solid rgba(56, 189, 248, 0.1)' }}>
      <div className="container-custom">
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(1.25rem, 3vw, 2.5rem)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Founder Profile Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <img
              src={founder.avatar}
              alt={founder.name}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #00f0ff',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)'
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  {founder.name}
                </h3>
                <span style={{ padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '0.68rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  VERIFIED AUTHOR
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                {founder.title} • {founder.brand}
              </div>
              <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0, lineHeight: 1.5, maxWidth: '420px' }}>
                {founder.bio}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Pledge & Links */}
          <div className="founder-pledge-column" style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.08)', paddingLeft: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
              <FileCheck size={18} color="#10b981" />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                EDITORIAL INTEGRITY PLEDGE
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              "We do not generate synthetic news, unverified claims, or exaggerated threat scores. Every CVE breakdown is verified against primary sources, and every tutorial is built strictly for authorized defensive environments."
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('/author/kunal-rajput')}
                className="btn-cyber-primary"
                style={{ padding: '0.5rem 1.15rem', fontSize: '0.825rem' }}
              >
                <span>Read Full Bio & Portfolio</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={() => onNavigate('/editorial-policy')}
                className="btn-cyber-secondary"
                style={{ padding: '0.5rem 1.15rem', fontSize: '0.825rem' }}
              >
                <span>Editorial Standards</span>
              </button>

              <a
                href={founder.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#38bdf8',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .founder-pledge-column {
            border-left: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding-left: 0 !important;
            padding-top: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
