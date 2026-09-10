import React from 'react';
import { Shield, Lock, Terminal, Mail, CheckCircle, ExternalLink, Heart } from 'lucide-react';
import { YoutubeIcon, LinkedinIcon } from '../common/SocialIcons';
import { founderData } from '../../data/founder';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'rgba(3, 6, 14, 0.98)',
        borderTop: '1px solid rgba(56, 189, 248, 0.15)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '1px',
          background: 'radial-gradient(ellipse, #00f0ff 0%, transparent 70%)',
          opacity: 0.6
        }}
      />

      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Column 1: Brand & Positioning */}
          <div>
            <div
              onClick={() => onNavigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(2, 132, 199, 0.4) 100%)',
                  border: '1px solid #00f0ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Shield size={20} color="#00f0ff" />
              </div>
              <span className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                HACKWITH<span style={{ color: '#00f0ff' }}>KUNAL</span>
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.04em' }}>
              Cybersecurity • AI Safety • Privacy • Technology
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Independent cybersecurity and artificial intelligence safety publication. Dedicated to defensive research, vulnerability awareness, and secure digital architecture.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href={founderData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '6px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <YoutubeIcon size={15} color="#f87171" /> YouTube {founderData.socials.youtubeHandle}
              </a>
              <a
                href={founderData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '6px',
                  background: 'rgba(14, 165, 233, 0.15)',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  color: '#38bdf8',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <LinkedinIcon size={15} color="#38bdf8" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-heading" style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: "Home", path: "/" },
                { label: "Cybersecurity", path: "/cybersecurity" },
                { label: "AI Safety", path: "/ai-safety" },
                { label: "Privacy", path: "/privacy" },
                { label: "Technology", path: "/technology" },
                { label: "Security Guides", path: "/guides" },
                { label: "About HackWithKunal", path: "/about" },
                { label: "Contact Tip Line", path: "/contact" }
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Standards */}
          <div>
            <h4 className="font-heading" style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Legal & Standards
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Terms of Service", path: "/terms" },
                { label: "Cookie Policy", path: "/privacy-policy" },
                { label: "Educational Disclaimer", path: "/terms" },
                { label: "Editorial Standards", path: "/editorial-standards" },
                { label: "Corrections Policy", path: "/editorial-standards" }
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Defensive Guidance */}
          <div>
            <h4 className="font-heading" style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Defensive Playbooks
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: "Secure Your Gmail Account", path: "/guides/how-to-protect-gmail-account" },
                { label: "Recognize AI Phishing Scams", path: "/guides/how-to-detect-phishing-message" },
                { label: "Harden WhatsApp Privacy", path: "/guides/how-to-secure-whatsapp-privacy" },
                { label: "Protect Your Android Device", path: "/guides/how-to-secure-android-phone" },
                { label: "Password Entropy Analyzer", path: "/tools" },
                { label: "Phishing URL Inspector", path: "/tools" }
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ethical Non-Malicious Pledge Callout */}
        <div
          style={{
            padding: '1.25rem',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '10px',
            border: '1px solid rgba(56, 189, 248, 0.15)',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <Lock size={20} color="#00f0ff" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
          <div style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.6 }}>
            <strong style={{ color: '#f8fafc' }}>ETHICAL RESEARCH STATEMENT:</strong> {founderData.editorialPledge}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #1e293b',
            fontSize: '0.8rem',
            color: '#64748b'
          }}
        >
          <div>
            © {currentYear} <strong>HackWithKunal</strong>. All rights reserved. Directed by <strong>Kunal Rajput</strong>.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Security Intel Feed Online
            </span>
            <span>AdSense Ready</span>
            <span>SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
