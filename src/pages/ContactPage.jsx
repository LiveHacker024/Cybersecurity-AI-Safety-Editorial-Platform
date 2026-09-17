import React, { useState, useEffect } from 'react';
import { Mail, Key, Shield, Send, CheckCircle2, MessageSquare, Copy, Check, ChevronRight } from 'lucide-react';
import { founderData } from '../data/founder';
import { siteConfig } from '../config/site';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateMetaTags({
      title: `Contact Editorial & Security Desk — ${siteConfig.name}`,
      description: "Secure contact channel, editorial tips, vulnerability disclosures, correction requests, and PGP public key for CyberAI Watch.",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Contact Desk", url: "/contact" }
      ])
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: https://cyberaiwatch.com/pgp

mQGNBF+vL8wBDAC7/tK0mPqO7kL4vFk7L9Yp9J9...
...[KUNAL RAJPUT SECURITY ENCRYPTED KEY]...
=CyberAIWatch-PGP
-----END PGP PUBLIC KEY BLOCK-----`;

  const copyPgp = () => {
    navigator.clipboard?.writeText(pgpKey);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050811', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '960px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '2rem' }}>
          <button onClick={() => onNavigate && onNavigate('/')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>
            Home
          </button>
          <ChevronRight size={14} />
          <span style={{ color: '#00f0ff' }}>Contact & Tip Line</span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <Mail size={14} /> SECURE COMMUNICATIONS DESK
          </div>
          <h1 className="font-heading" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Contact &amp; Threat Intelligence Tip Line
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Have a verified security research tip, vulnerability advisory, correction request, or editorial inquiry? Reach out directly to our editorial and research desk.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2.5rem'
          }}
        >
          {/* Left: Contact Form */}
          <div className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <h2 className="font-heading" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={18} color="#00f0ff" /> Send a Message
            </h2>

            {sent ? (
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#34d399',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.35rem' }}>Message Dispatched</div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  Thank you for reaching out. The HackWithKunal editorial team will review your inquiry shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    INQUIRY CATEGORY:
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(5, 8, 17, 0.8)',
                      border: '1px solid #1e293b',
                      borderRadius: '8px',
                      color: '#00f0ff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Security Research">Security Research & Threat Tips</option>
                    <option value="Correction Request">Correction Request</option>
                    <option value="Business Inquiry">Business & Partnership Inquiry</option>
                    <option value="Media Inquiry">Media & Press Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    YOUR NAME:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(5, 8, 17, 0.8)', border: '1px solid #1e293b', borderRadius: '8px', color: '#ffffff', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    EMAIL ADDRESS:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(5, 8, 17, 0.8)', border: '1px solid #1e293b', borderRadius: '8px', color: '#ffffff', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    SUBJECT:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vulnerability Advisory / Editorial Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(5, 8, 17, 0.8)', border: '1px solid #1e293b', borderRadius: '8px', color: '#ffffff', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.4rem' }}>
                    MESSAGE / DETAILS:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(5, 8, 17, 0.8)', border: '1px solid #1e293b', borderRadius: '8px', color: '#ffffff', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn-cyber-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                  <Send size={16} /> Transmit Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Coordinates & PGP Key */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem' }}>
                Direct Coordinates
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>EDITORIAL CONTACT</div>
                  <a href={`mailto:${founderData.email}`} style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 600 }}>
                    {founderData.email}
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>VANIX TECHNOLOGY CONTACT</div>
                  <a href={`tel:${founderData.vanixContact}`} style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>
                    {founderData.vanixContact}
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>YOUTUBE COMMUNITY</div>
                  <a href={founderData.socials.youtube} target="_blank" rel="noopener noreferrer" style={{ color: '#f87171', textDecoration: 'none', fontWeight: 600 }}>
                    {founderData.socials.youtubeHandle}
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>PROFESSIONAL NETWORK</div>
                  <a href={founderData.socials.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>
                    Kunal Rajput LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00f0ff', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                  <Key size={16} /> PGP PUBLIC KEY
                </div>
                <button
                  onClick={copyPgp}
                  style={{
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid #334155',
                    color: copiedPgp ? '#34d399' : '#cbd5e1',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  {copiedPgp ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedPgp ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>

              <pre style={{ background: '#090e1a', padding: '1rem', borderRadius: '8px', fontSize: '0.72rem', color: '#94a3b8', overflowX: 'auto', border: '1px solid #1e293b', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxWidth: '100%' }}>
                <code>{pgpKey}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
