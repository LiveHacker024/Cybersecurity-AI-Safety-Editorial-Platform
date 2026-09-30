import React, { useState, useEffect } from 'react';
import { Shield, Server, Globe, Smartphone, ArrowRight, ChevronRight, HelpCircle, Layers, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { getSecurityCategory, getVulnerabilitiesByCategory } from '../../data/securityTesting';
import VulnerabilityCard from '../../components/securityTesting/VulnerabilityCard';
import SafeLabNotice from '../../components/securityTesting/SafeLabNotice';
import AdSlot from '../../components/ads/AdSlot';
import { updateMetaTags, generateBreadcrumbSchema } from '../../utils/seo';
import { recordPageView } from '../../utils/analytics';
import { siteConfig } from '../../config/site';

export default function CategoryTestingPage({ categorySlug, onNavigate }) {
  const categoryMeta = getSecurityCategory(categorySlug);
  const [selectedMobileTab, setSelectedMobileTab] = useState('ALL');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const isMobileCategory = categorySlug === 'mobile-security';

  const categoryVulns = getVulnerabilitiesByCategory(categorySlug);

  const filteredVulns = isMobileCategory && selectedMobileTab !== 'ALL'
    ? categoryVulns.filter(v => (v.mobilePlatform || '').toUpperCase() === selectedMobileTab.toUpperCase())
    : categoryVulns;

  useEffect(() => {
    if (!categoryMeta) return;

    let seoTitle = `${categoryMeta.name} Guide: Vulnerabilities, Detection & Prevention — ${siteConfig.name}`;
    let seoDesc = `Learn how to identify and prevent common ${categoryMeta.shortTitle.toLowerCase()} vulnerabilities using authorized testing methods, safe lab examples, OWASP guidance and practical remediation techniques.`;

    if (categorySlug === 'api-security') {
      seoTitle = `API Security Testing Guide: Vulnerabilities, Detection & Prevention — ${siteConfig.name}`;
      seoDesc = "Learn how to identify and prevent common API security vulnerabilities using authorized testing methods, safe lab examples, OWASP guidance and practical remediation techniques.";
    } else if (categorySlug === 'web-security') {
      seoTitle = `Web Security Testing Guide: Vulnerabilities, Detection & Prevention — ${siteConfig.name}`;
      seoDesc = "Learn how to test and remediate web application security vulnerabilities including SQLi, XSS, CSRF, SSRF, and access control flaws following OWASP WSTG guidance.";
    } else if (categorySlug === 'mobile-security') {
      seoTitle = `Mobile Security Testing Guide: Android, iOS & API Vulnerabilities — ${siteConfig.name}`;
      seoDesc = "Learn how to assess Android and iOS mobile application security, local storage, IPC components, deep links, WebViews, and certificate validation following OWASP MASVS.";
    }

    const canonicalUrl = `${siteConfig.domain}${categoryMeta.path}`;

    const schemas = [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        "name": categoryMeta.name,
        "url": canonicalUrl,
        "description": seoDesc,
        "publisher": {
          "@type": "NewsMediaOrganization",
          "name": siteConfig.name,
          "url": siteConfig.domain
        }
      },
      generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Security Testing", url: "/security-testing" },
        { name: categoryMeta.shortTitle, url: categoryMeta.path }
      ])
    ];

    if (categoryMeta.faqs && categoryMeta.faqs.length > 0) {
      schemas.push({
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": categoryMeta.faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      });
    }

    updateMetaTags({
      title: seoTitle,
      description: seoDesc,
      type: "website",
      url: canonicalUrl,
      schema: {
        "@context": "https://schema.org",
        "@graph": schemas
      }
    });

    recordPageView(categoryMeta.path, categoryMeta.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug, categoryMeta]);

  if (!categoryMeta) {
    return (
      <div style={{ background: '#030712', minHeight: '100vh', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container-custom">
          <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Security Testing Category Not Found</h2>
          <button onClick={() => onNavigate('/security-testing')} className="btn-cyber-primary">
            Return to Security Testing Hub
          </button>
        </div>
      </div>
    );
  }

  const getCategoryIcon = () => {
    switch (categorySlug) {
      case 'api-security':
        return <Server size={28} color="#00f0ff" />;
      case 'web-security':
        return <Globe size={28} color="#38bdf8" />;
      case 'mobile-security':
        return <Smartphone size={28} color="#10b981" />;
      default:
        return <Shield size={28} color="#00f0ff" />;
    }
  };

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span onClick={() => onNavigate('/')} style={{ cursor: 'pointer', color: '#94a3b8' }}>Home</span>
          <ChevronRight size={13} />
          <span onClick={() => onNavigate('/security-testing')} style={{ cursor: 'pointer', color: '#94a3b8' }}>Security Testing</span>
          <ChevronRight size={13} />
          <span style={{ color: categoryMeta.color, fontWeight: 600 }}>{categoryMeta.shortTitle}</span>
        </nav>

        {/* Category Hero */}
        <header
          className="glass-panel"
          style={{
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem)',
            borderRadius: '16px',
            marginBottom: '2.5rem',
            border: `1px solid ${categoryMeta.color}44`,
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${categoryMeta.color}15 0%, rgba(5, 8, 17, 0.95) 100%)`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: `${categoryMeta.color}18`,
                border: `1px solid ${categoryMeta.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {getCategoryIcon()}
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: categoryMeta.color,
                  background: `${categoryMeta.color}20`,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {categoryMeta.badge}
              </span>
              <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#ffffff', margin: '0.25rem 0 0' }}>
                {categoryMeta.name}
              </h1>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.65, maxWidth: '840px', margin: '0 0 1.75rem' }}>
            {categoryMeta.description}
          </p>

          {/* Focus Areas Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categoryMeta.focusAreas.map((area, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.78rem',
                  color: '#f8fafc',
                  background: 'rgba(15, 23, 42, 0.8)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <CheckCircle2 size={13} color={categoryMeta.color} />
                {area}
              </span>
            ))}
          </div>
        </header>

        {/* Safe Practice Guidance & Verified Labs */}
        <SafeLabNotice
          verifiedLabs={categoryMeta.verifiedLabs}
          title={`${categoryMeta.shortTitle} — Practice Safely in Approved Labs`}
        />

        {/* Ad Placement */}
        <AdSlot type="leaderboard" />

        {/* Mobile Platform Split Tabs (Section 5) */}
        {isMobileCategory && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                Platform Scope:
              </span>
              {[
                { id: 'ALL', label: `All Mobile Issues (${categoryVulns.length})` },
                { id: 'ANDROID', label: `Android Platform (${categoryVulns.filter(v => v.mobilePlatform === 'Android').length})` },
                { id: 'IOS', label: `iOS Platform (${categoryVulns.filter(v => v.mobilePlatform === 'iOS').length})` },
                { id: 'MULTIPLE', label: `Cross-Platform & API (${categoryVulns.filter(v => v.mobilePlatform === 'Multiple').length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedMobileTab(tab.id)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    background: selectedMobileTab === tab.id ? '#10b981' : 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid ' + (selectedMobileTab === tab.id ? '#10b981' : 'rgba(255, 255, 255, 0.08)'),
                    color: selectedMobileTab === tab.id ? '#030712' : '#cbd5e1',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Vulnerability Index Grid */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {categoryMeta.shortTitle} Vulnerability Catalog
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Showing {filteredVulns.length} authentic vulnerability specifications
              </span>
            </div>

            <button
              onClick={() => onNavigate('/security-testing')}
              className="btn-cyber-secondary"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
            >
              <span>Back to Knowledge Hub</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {filteredVulns.map((vuln) => (
              <VulnerabilityCard
                key={`${vuln.category}-${vuln.slug}`}
                vuln={vuln}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>

        {/* Category FAQs (Section 12 & 16) */}
        {categoryMeta.faqs && categoryMeta.faqs.length > 0 && (
          <section
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(5, 8, 17, 0.9)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <HelpCircle size={22} color={categoryMeta.color} />
              <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Frequently Asked Technical Questions ({categoryMeta.shortTitle})
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categoryMeta.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        color: '#f8fafc',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp size={18} color={categoryMeta.color} /> : <ChevronDown size={18} color="#94a3b8" />}
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 1.25rem 1rem', fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
