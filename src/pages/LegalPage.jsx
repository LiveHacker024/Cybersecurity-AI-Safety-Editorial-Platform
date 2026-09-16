import React, { useEffect } from 'react';
import { ShieldCheck, Calendar, ArrowLeft, ChevronRight, FileText, Lock, Mail, ExternalLink } from 'lucide-react';
import { legalPolicies } from '../data/legalContent';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import { siteConfig } from '../config/site';

export default function LegalPage({ policyKey = "about", onNavigate }) {
  const policy = legalPolicies[policyKey] || legalPolicies.about;

  useEffect(() => {
    updateMetaTags({
      title: `${policy.title} — ${siteConfig.name}`,
      description: policy.subtitle,
      type: "website",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: policy.title, url: `/${policy.slug}` }
      ])
    });

    recordPageView(`/${policy.slug}`, policy.title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [policyKey]);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '880px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '2rem' }}>
          <button onClick={() => onNavigate('/')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>
            Home
          </button>
          <ChevronRight size={14} />
          <span style={{ color: '#00f0ff' }}>{policy.title}</span>
        </div>

        {/* Policy Header */}
        <header
          className="glass-panel"
          style={{
            padding: '2.5rem',
            borderRadius: '16px',
            marginBottom: '3rem',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 240, 255, 0.1) 0%, rgba(5, 8, 17, 0.9) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                padding: '0.2rem 0.65rem',
                borderRadius: '6px',
                background: 'rgba(0, 240, 255, 0.15)',
                color: '#00f0ff',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}
            >
              EDITORIAL & LEGAL GOVERNANCE
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} />
              Last Revised: {policy.updatedAt}
            </span>
          </div>

          <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: '#ffffff', marginBottom: '0.75rem' }}>
            {policy.title}
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            {policy.subtitle}
          </p>
        </header>

        {/* Content Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {policy.sections.map((sec, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem' }}>
                {sec.heading}
              </h2>

              <div
                style={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#cbd5e1' }}
                dangerouslySetInnerHTML={{
                  __html: sec.content
                    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #ffffff; font-weight: 700;">$1</strong>')
                    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #00f0ff; text-decoration: underline;">$1</a>')
                    .replace(/\n- (.*$)/gim, '<li style="margin-bottom: 0.4rem;">$1</li>')
                    .replace(/\n\n/gim, '<p style="margin-bottom: 1.25rem;"></p>')
                }}
              />
            </div>
          ))}
        </div>

        {/* Quick Nav to other standards */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '1rem' }}>
            Related Legal & Editorial Documents
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {siteConfig.legalLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94a3b8',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
