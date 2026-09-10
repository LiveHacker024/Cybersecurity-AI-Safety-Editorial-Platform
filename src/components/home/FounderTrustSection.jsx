import React from 'react';
import { ShieldCheck, Award, Lock, ExternalLink, CheckCircle2 } from 'lucide-react';
import { YoutubeIcon, LinkedinIcon } from '../common/SocialIcons';
import { founderData } from '../../data/founder';

export default function FounderTrustSection({ onNavigate }) {
  return (
    <section
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(180deg, #050811 0%, #0c1322 50%, #050811 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container-custom">
        <div
          className="glass-panel"
          style={{
            padding: '3rem',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(10, 15, 29, 0.98) 100%)',
            borderRadius: '24px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            {/* Left: Founder Profile & Credentials */}
            <div>
              <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
                <ShieldCheck size={14} /> EDITORIAL INTEGRITY & CREDIBILITY
              </div>

              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '1rem',
                  lineHeight: 1.2
                }}
              >
                Directed by <span className="gradient-text-cyan">{founderData.name}</span>
              </h2>

              <p style={{ color: '#00f0ff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '1.25rem', fontWeight: 600 }}>
                {founderData.role} • {founderData.company}
              </p>

              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                {founderData.bio}
              </p>

              {/* Certifications and Accreditations */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.75rem', fontWeight: 700 }}>
                  Verified Security Accreditations
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {founderData.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        background: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        color: '#f8fafc',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Award size={13} color="#00f0ff" /> {cert.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => onNavigate('/about')}
                  className="btn-cyber-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
                >
                  Read Full Founder Bio
                </button>
                <a
                  href={founderData.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
                >
                  <YoutubeIcon size={16} color="#ef4444" /> YouTube Channel
                </a>
              </div>
            </div>

            {/* Right: Media Showcase & Trust Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
                }}
              >
                <img
                  src={founderData.images.avatar}
                  alt={founderData.name}
                  style={{ width: '100%', maxHeight: '280px', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    insetInline: 0,
                    padding: '1.25rem',
                    background: 'linear-gradient(to top, rgba(5,8,17,0.95) 0%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.1rem' }}>Kunal Rajput</div>
                    <div style={{ color: '#00f0ff', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>VAPT Operations & Research</div>
                  </div>
                  <span className="cyber-badge-emerald">
                    <CheckCircle2 size={13} /> VERIFIED RESEARCHER
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.75rem'
                }}
              >
                {[
                  {
                    title: "100% Defensive Security",
                    desc: "Strictly educational intelligence. We never publish exploits for cybercrime or unauthorized penetration."
                  },
                  {
                    title: "Peer-Reviewed CVE Citations",
                    desc: "Every vulnerability report is validated against NIST NVD and MITRE ATT&CK standards."
                  },
                  {
                    title: "Hands-on Pentesting Experience",
                    desc: "Insights derived from active penetration testing workflows at ASD Cybersecurity and HackWithKunal."
                  }
                ].map((pillar, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.85rem 1.15rem',
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '8px',
                      border: '1px solid #1e293b'
                    }}
                  >
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.2rem' }}>
                      {pillar.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                      {pillar.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
