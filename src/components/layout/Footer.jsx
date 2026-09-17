import React from 'react';
import { Shield, Rss, FileText, Lock, ExternalLink, Globe2 } from 'lucide-react';
import { Youtube, Linkedin } from '../common/SocialIcons';
import { siteConfig } from '../../config/site';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (path) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#030712',
        borderTop: '1px solid rgba(56, 189, 248, 0.15)',
        color: '#94a3b8',
        padding: '3.5rem 0 2rem',
        marginTop: 'auto'
      }}
    >
      <div className="container-custom">
        {/* Main Footer Grid */}
        <div
          className="footer-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Column 1: Brand & Editorial Identity */}
          <div style={{ gridColumn: 'span 1' }}>
            <div
              onClick={() => handleLinkClick('/')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', cursor: 'pointer' }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(16, 185, 129, 0.3) 100%)',
                  border: '1px solid #00f0ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Shield size={20} color="#00f0ff" />
              </div>
              <span className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>
                CYBER<span style={{ color: '#00f0ff' }}>AI</span> WATCH
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1.25rem' }}>
              Independent international editorial publication covering cybersecurity journalism, AI safety research, vulnerability triage, and defensive digital engineering.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                title="YouTube — HackWithKunal"
              >
                <Youtube size={18} />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(14, 165, 233, 0.12)',
                  border: '1px solid rgba(14, 165, 233, 0.35)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                title="LinkedIn — Kunal Rajput"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#fbbf24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                title="RSS Editorial Feed"
              >
                <Rss size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Editorial Hubs */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              Editorial Hubs
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <button onClick={() => handleLinkClick('/cybersecurity')} className="footer-link">Cybersecurity News</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/ai-safety')} className="footer-link">AI Safety & Risks</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/ai-security')} className="footer-link">AI Model Security</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/threat-intelligence')} className="footer-link">Threat Intelligence</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/vulnerabilities')} className="footer-link">CVE Vulnerability Tracker</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/privacy')} className="footer-link">Privacy & Encryption</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/tutorials')} className="footer-link">Defensive Tutorials</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/analysis')} className="footer-link">Technical Analysis</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Author */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              Editorial Team
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <button onClick={() => handleLinkClick('/author/kunal-rajput')} className="footer-link">
                  Kunal Rajput (Founder & Editor)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/youtube')} className="footer-link">
                  HackWithKunal Video Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/tools')} className="footer-link">
                  Zero-Telemetry Security Tools
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/trending')} className="footer-link">
                  Trending Threat Topics
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/newsletter')} className="footer-link">
                  Weekly Dispatch Newsletter
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/admin')} className="footer-link" style={{ opacity: 0.6 }}>
                  Editorial CMS Access
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Standards */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              Standards & Policies
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <button onClick={() => handleLinkClick('/editorial-policy')} className="footer-link">Editorial Standards & Fact-Check</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/correction-policy')} className="footer-link">Correction & Retraction Policy</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/disclaimer')} className="footer-link">Responsible Security Disclaimer</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/privacy-policy')} className="footer-link">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/terms')} className="footer-link">Terms of Service</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/cookie-policy')} className="footer-link">Cookie Policy</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/advertising-policy')} className="footer-link">Advertising & Monetization</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/contact')} className="footer-link">Contact & Vulnerability Disclosure</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution & Integrity Row */}
        <div
          style={{
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.78rem',
            color: '#64748b'
          }}
        >
          <div>
            © {currentYear} <strong>{siteConfig.name}</strong>. Directed by <strong>{siteConfig.founder.name}</strong> ({siteConfig.founder.brand}). All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none' }}>
              Sitemap
            </a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none' }}>
              Robots.txt
            </a>
            <a href="/ads.txt" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none' }}>
              Ads.txt
            </a>
            <span style={{ color: '#00f0ff', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              PEOPLE FIRST. SEARCH SECOND.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.85rem;
          padding: 0.2rem 0;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #00f0ff;
          transform: translateX(2px);
        }
        @media (max-width: 640px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
