import React, { useState, useEffect } from 'react';
import { Shield, Server, Globe, Smartphone, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { securityCategories, allSecurityTestingVulnerabilities, searchAndFilterSecurityVulnerabilities } from '../../data/securityTesting';
import SecurityTestingFilterBar from '../../components/securityTesting/SecurityTestingFilterBar';
import VulnerabilityCard from '../../components/securityTesting/VulnerabilityCard';
import SafeLabNotice from '../../components/securityTesting/SafeLabNotice';
import FreeVsPaidNotice from '../../components/securityTesting/FreeVsPaidNotice';
import AdSlot from '../../components/ads/AdSlot';
import { updateMetaTags, generateBreadcrumbSchema } from '../../utils/seo';
import { recordPageView } from '../../utils/analytics';
import { siteConfig } from '../../config/site';

export default function SecurityTestingHubPage({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [platform, setPlatform] = useState('ALL');
  const [difficulty, setDifficulty] = useState('ALL');
  const [access, setAccess] = useState('ALL');

  useEffect(() => {
    updateMetaTags({
      title: `Security Testing Knowledge Hub: API, Web & Mobile — ${siteConfig.name}`,
      description: "Authoritative cybersecurity testing knowledge hub covering API security (OWASP API Top 10), web application security (WSTG), and mobile security (MASVS) with safe lab methodologies.",
      type: "website",
      url: `${siteConfig.domain}/security-testing`,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${siteConfig.domain}/security-testing#webpage`,
            "name": "Security Testing Knowledge Hub",
            "url": `${siteConfig.domain}/security-testing`,
            "description": "Comprehensive security testing knowledge hub covering API, web application, and mobile vulnerability assessments with authorized lab methodologies.",
            "publisher": {
              "@type": "NewsMediaOrganization",
              "name": siteConfig.name,
              "url": siteConfig.domain
            }
          },
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Security Testing", url: "/security-testing" }
          ])
        ]
      }
    });

    recordPageView('/security-testing', 'Security Testing Hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredVulns = searchAndFilterSecurityVulnerabilities({
    search,
    category,
    platform,
    difficulty,
    access
  });

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom">
        {/* Hub Header Hero */}
        <header
          className="glass-panel"
          style={{
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1rem, 3vw, 2.5rem)',
            borderRadius: '16px',
            marginBottom: '2.5rem',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 240, 255, 0.12) 0%, rgba(5, 8, 17, 0.95) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span
              style={{
                padding: '0.2rem 0.65rem',
                borderRadius: '6px',
                background: 'rgba(0, 240, 255, 0.15)',
                color: '#00f0ff',
                fontSize: '0.75rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)'
              }}
            >
              EDITORIAL KNOWLEDGE HUB
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              OWASP & CWE ALIGNED METHODOLOGIES
            </span>
          </div>

          <h1 className="font-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1.2rem', lineHeight: 1.15 }}>
            Security Testing <span style={{ color: '#00f0ff' }}>Knowledge Hub</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.65, maxWidth: '840px', margin: '0 0 2rem' }}>
            A rigorous, authorized educational architecture for security professionals, developers, and defensive engineers. Explore verified vulnerability databases across API, Web, and Mobile attack surfaces with reproducible lab methodologies and developer remediations.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#categories"
              className="btn-cyber-primary"
              style={{ padding: '0.7rem 1.4rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>Explore 3 Core Disciplines</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="#vulnerability-database"
              className="btn-cyber-secondary"
              style={{ padding: '0.7rem 1.4rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>Vulnerability Database ({allSecurityTestingVulnerabilities.length})</span>
            </a>
          </div>
        </header>

        {/* Ad Slot */}
        <AdSlot type="leaderboard" />

        {/* 3 Core Security Disciplines Overview (Section 1) */}
        <section id="categories" style={{ marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
              CORE ARCHITECTURE
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
              Three Distinct Testing Disciplines
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '780px', marginTop: '0.35rem' }}>
              Vulnerabilities are technically categorized where they specifically belong. Cross-references are provided for issues spanning multiple platforms.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* API Security Category Card */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: '14px',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                background: 'rgba(5, 8, 17, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: 'rgba(0, 240, 255, 0.15)',
                      border: '1px solid #00f0ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Server size={24} color="#00f0ff" />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00f0ff', background: 'rgba(0, 240, 255, 0.1)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                    OWASP API Top 10
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem' }}>
                  API Security Testing
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  For REST, GraphQL, token authentication (JWT/OAuth), Broken Object Level Authorization (BOLA/IDOR), Mass Assignment, rate limiting, and backend API business logic.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#00f0ff" /> Object & Function Level Authorization
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#00f0ff" /> Token Lifecycles & Signature Verification
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#00f0ff" /> GraphQL Complexity & Introspection
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/security-testing/api-security')}
                className="btn-cyber-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.65rem', fontSize: '0.85rem' }}
              >
                <span>View API Security Hub</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Web Security Category Card */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: '14px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                background: 'rgba(5, 8, 17, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid #38bdf8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Globe size={24} color="#38bdf8" />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                    OWASP Top 10 & WSTG
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem' }}>
                  Web Security Testing
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  For websites, browser-facing applications, server-side web vulnerabilities, sessions, XSS, CSRF, SQLi, SSTI, HTTP request smuggling, and web architecture.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#38bdf8" /> Server-Side & Client Injection Vectors
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#38bdf8" /> Session Management & State Fixation
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#38bdf8" /> Cache Deception & Host Header Attacks
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/security-testing/web-security')}
                className="btn-cyber-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.65rem', fontSize: '0.85rem' }}
              >
                <span>View Web Security Hub</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Mobile Security Category Card */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: '14px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                background: 'rgba(5, 8, 17, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid #10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Smartphone size={24} color="#10b981" />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                    OWASP MASVS / MASTG
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem' }}>
                  Mobile Security Testing
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Split into Android, iOS, and Cross-Platform testing: covering local storage, exported IPC components, deep links, WebViews, certificate pinning, and Keystore/Keychain security.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#10b981" /> Android IPC, Receivers & Intents
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#10b981" /> iOS Keychain & File Protection APIs
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={13} color="#10b981" /> SSL Pinning & Client Entitlement Checks
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/security-testing/mobile-security')}
                className="btn-cyber-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.65rem', fontSize: '0.85rem' }}
              >
                <span>View Mobile Security Hub</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* Free vs Paid UI Structure Notice (Section 10) */}
        <FreeVsPaidNotice />

        {/* Safe Lab Notice (Section 11) */}
        <SafeLabNotice
          verifiedLabs={[
            {
              name: "OWASP API Security Top 10",
              description: "Official OWASP standard for API vulnerability classification and mitigation guidance.",
              url: "https://owasp.org/www-project-api-security/",
              type: "Authoritative Standard"
            },
            {
              name: "OWASP Web Security Testing Guide (WSTG)",
              description: "The global benchmark guide for testing web application security controls and server-side components.",
              url: "https://owasp.org/www-project-web-security-testing-guide/",
              type: "Testing Guide"
            },
            {
              name: "OWASP Mobile Application Security (MAS)",
              description: "Comprehensive mobile security standard covering MASVS requirements and MASTG checklist.",
              url: "https://mas.owasp.org/",
              type: "Mobile Standard"
            },
            {
              name: "PortSwigger Web Security Academy",
              description: "Authoritative interactive training labs for practicing web vulnerability detection legally.",
              url: "https://portswigger.net/web-security",
              type: "Interactive Academy"
            }
          ]}
        />

        {/* Filterable Vulnerability Database (Section 2 & 14) */}
        <section id="vulnerability-database" style={{ marginTop: '3rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#00f0ff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
              VULNERABILITY DATABASE
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
              Structured Vulnerability Directory
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Filter by platform, security category, testing difficulty, and access tier.
            </p>
          </div>

          {/* Interactive Filter Bar */}
          <SecurityTestingFilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            platform={platform}
            setPlatform={setPlatform}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            access={access}
            setAccess={setAccess}
            totalCount={allSecurityTestingVulnerabilities.length}
            filteredCount={filteredVulns.length}
          />

          {/* Vulnerability Cards Grid */}
          {filteredVulns.length === 0 ? (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '12px' }}>
              <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No matching vulnerability entries found</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Try modifying your search keywords or clearing selected filters.</p>
            </div>
          ) : (
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
          )}
        </section>
      </div>
    </div>
  );
}
