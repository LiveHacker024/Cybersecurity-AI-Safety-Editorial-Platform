import React from 'react';
import { ArrowRight, ShieldCheck, Terminal, Cpu, Lock, Sparkles, TrendingUp } from 'lucide-react';
import { siteConfig } from '../../config/site';

export default function HeroSection({ onNavigate }) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '5rem 0 3.5rem',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0, 240, 255, 0.12) 0%, rgba(5, 8, 17, 0) 100%)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.1)'
      }}
    >
      <div className="container-custom" style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto' }}>
        {/* Editorial Positioning Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            marginBottom: '1.75rem',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.15)'
          }}
        >
          <Sparkles size={14} color="#00f0ff" />
          <span style={{ fontSize: '0.78rem', color: '#f8fafc', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
            CYBERSECURITY • AI SAFETY • THREAT INTELLIGENCE
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="font-heading"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '1.5rem'
          }}
        >
          Defending Systems in the Era of <span style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 50%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Autonomous AI</span>
        </h1>

        {/* Subtitle / Mission */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '780px',
            margin: '0 auto 2.5rem'
          }}
        >
          {siteConfig.description} Founded by <strong>{siteConfig.founder.name}</strong> (<span style={{ color: '#00f0ff' }}>{siteConfig.founder.brand}</span>).
        </p>

        {/* Action Buttons */}
        <div className="hero-action-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('/ai-safety')}
            className="btn-cyber-primary hero-btn"
            style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
          >
            <span>Explore AI Safety Hub</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => onNavigate('/vulnerabilities')}
            className="btn-cyber-secondary hero-btn"
            style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
          >
            <span>Live CVE Tracker</span>
          </button>
          <button
            onClick={() => onNavigate('/tutorials')}
            className="btn-cyber-secondary hero-btn"
            style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
          >
            <span>Defensive Guides</span>
          </button>
        </div>

        {/* Highlights Bar */}
        <div
          className="hero-highlights-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginTop: '3.5rem',
            textAlign: 'left'
          }}
        >
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: '#00f0ff' }}>
              <ShieldCheck size={18} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Verified CVE Triage</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              Official CISA KEV and NVD-referenced vulnerability tracking with CVSS scoring.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: '#c084fc' }}>
              <Cpu size={18} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>AI Agent Security</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              Mitigating prompt injection, RAG poisoning, and autonomous agent hijacking.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: '#10b981' }}>
              <Lock size={18} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Zero Telemetry</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              Client-side cryptographic tools executed entirely within the browser sandbox.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .hero-action-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-btn {
            width: 100% !important;
            justify-content: center !important;
            min-height: 48px !important;
          }
          .hero-highlights-grid {
            grid-template-columns: 1fr !important;
            margin-top: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
