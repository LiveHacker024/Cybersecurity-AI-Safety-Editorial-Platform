import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, ArrowRight, ShieldAlert, BookOpen, ShieldCheck, Tag, X, Calendar } from 'lucide-react';
import { getAllArticles, getAllVulnerabilities } from '../utils/storage';
import { allSecurityTestingVulnerabilities } from '../data/securityTesting';
import { categoriesData } from '../data/categories';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView, recordSearchQuery } from '../utils/analytics';
import ClaimBadge from '../components/common/ClaimBadge';
import { siteConfig } from '../config/site';

export default function SearchPage({ onNavigate, currentPath }) {
  const getInitialQuery = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    }
    return '';
  };

  const [query, setQuery] = useState(getInitialQuery);
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, ARTICLES, CVES, TESTING
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');
  const allVulns = getAllVulnerabilities();

  // Sync state when currentPath or URL search changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q !== null && q !== query) {
        setQuery(q);
      }
    }
  }, [currentPath]);

  useEffect(() => {
    updateMetaTags({
      title: `Search Articles, CVEs & Security Testing — ${siteConfig.name}`,
      description: "Search all verified cybersecurity journalism, autonomous AI safety research, active CVE advisories, and defensive security testing labs.",
      type: "website",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Search", url: "/search" }
      ])
    });

    recordPageView('/search', 'Site Search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Trigger analytics tracking on debounce
  useEffect(() => {
    if (query.trim().length >= 3) {
      const timer = setTimeout(() => {
        recordSearchQuery(query);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const q = query.toLowerCase().trim();

  // 1. Articles Search
  const matchedArticles = allArticles.filter((a) => {
    const matchesQuery = !q || (
      a.title.toLowerCase().includes(q) ||
      (a.subtitle && a.subtitle.toLowerCase().includes(q)) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
      (a.content && a.content.toLowerCase().includes(q)) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
      (a.keywords && a.keywords.toLowerCase().includes(q)) ||
      (a.author?.name && a.author.name.toLowerCase().includes(q)) ||
      (a.categoryName && a.categoryName.toLowerCase().includes(q)) ||
      (a.category && a.category.toLowerCase().includes(q))
    );
    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  // 2. CVE Vulnerabilities Search
  const matchedVulns = allVulns.filter((v) => {
    if (!q) return true;
    return (
      v.cveId.toLowerCase().includes(q) ||
      v.name.toLowerCase().includes(q) ||
      (v.product && v.product.toLowerCase().includes(q)) ||
      (v.vendor && v.vendor.toLowerCase().includes(q)) ||
      (v.mitigation && v.mitigation.toLowerCase().includes(q)) ||
      (v.exploitationStatus && v.exploitationStatus.toLowerCase().includes(q))
    );
  });

  // 3. Security Testing Knowledge Hub Search
  const matchedTesting = allSecurityTestingVulnerabilities.filter((t) => {
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      (t.shortDefinition && t.shortDefinition.toLowerCase().includes(q)) ||
      (t.cweClassification && t.cweClassification.toLowerCase().includes(q)) ||
      (t.owaspClassification && t.owaspClassification.toLowerCase().includes(q)) ||
      (t.categoryName && t.categoryName.toLowerCase().includes(q)) ||
      (t.applicablePlatform && t.applicablePlatform.toLowerCase().includes(q))
    );
  });

  const totalResultsCount =
    (activeTab === 'ALL' ? (matchedArticles.length + matchedVulns.length + matchedTesting.length) :
     activeTab === 'ARTICLES' ? matchedArticles.length :
     activeTab === 'CVES' ? matchedVulns.length :
     matchedTesting.length);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '960px' }}>
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            AUTHENTIC INTELLIGENCE SEARCH
          </span>
          <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 900, color: '#ffffff', margin: '0.4rem 0 1.5rem' }}>
            {query.trim() ? `Search results for "${query}"` : 'Search CyberAI Watch'}
          </h1>

          {/* Search Input Bar */}
          <div style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}>
            <Search size={18} color="#00f0ff" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              autoFocus
              placeholder="Search by keyword, CVE, agent risk, or defensive lab..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (typeof window !== 'undefined') {
                  const url = e.target.value ? `/search?q=${encodeURIComponent(e.target.value)}` : '/search';
                  window.history.replaceState({}, '', url);
                }
              }}
              style={{
                width: '100%',
                padding: '0.85rem 2.5rem 0.85rem 2.75rem',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1.5px solid rgba(0, 240, 255, 0.45)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)'
              }}
              aria-label="Search CyberAI Watch articles and data"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  if (typeof window !== 'undefined') {
                    window.history.replaceState({}, '', '/search');
                  }
                }}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </header>

        {/* Source Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'ALL', label: `All Sources (${matchedArticles.length + matchedVulns.length + matchedTesting.length})` },
            { id: 'ARTICLES', label: `Articles & News (${matchedArticles.length})` },
            { id: 'CVES', label: `Vulnerabilities / CVEs (${matchedVulns.length})` },
            { id: 'TESTING', label: `Security Testing Labs (${matchedTesting.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                background: activeTab === tab.id ? 'rgba(0, 240, 255, 0.2)' : 'rgba(15, 23, 42, 0.7)',
                border: activeTab === tab.id ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                color: activeTab === tab.id ? '#00f0ff' : '#cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#94a3b8', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
          <span style={{ fontWeight: 700, color: '#f8fafc' }}>
            {totalResultsCount} {totalResultsCount === 1 ? 'result found' : 'results found'}
          </span>
          {query && <span>Query: <strong style={{ color: '#00f0ff' }}>"{query}"</strong></span>}
        </div>

        {/* Empty State */}
        {totalResultsCount === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '12px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.25rem' }}>No matching results found</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              No results found for "{query}". Try checking your spelling or search terms such as "FortiMail", "CVE", "AI Security", "Dark Web", or "Cybersecurity".
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {["FortiMail", "CVE", "AI Security", "Dark Web", "Cybersecurity"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#38bdf8',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* 1. Articles Section */}
            {(activeTab === 'ALL' || activeTab === 'ARTICLES') && matchedArticles.length > 0 && (
              <div>
                {activeTab === 'ALL' && (
                  <h3 style={{ fontSize: '0.85rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                    Cybersecurity & AI Safety Articles ({matchedArticles.length})
                  </h3>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {matchedArticles.map((article) => (
                    <div
                      key={article.slug}
                      onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
                      className="glass-panel"
                      style={{
                        padding: '1.35rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.55rem',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#00f0ff';
                        e.currentTarget.style.background = 'rgba(0, 240, 255, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', color: '#00f0ff', fontWeight: 800, fontFamily: 'var(--font-mono)', background: 'rgba(0, 240, 255, 0.12)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                            {article.categoryName ? article.categoryName.toUpperCase() : article.category.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>• {article.publishedAt}</span>
                          <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>• {article.readingTime}</span>
                        </div>
                        <ClaimBadge status={article.claimStatus || "SOURCE-VERIFIED"} size="small" />
                      </div>

                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, margin: 0 }}>
                        {article.title}
                      </h4>

                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                        {article.subtitle || article.excerpt}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#00f0ff', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.25rem' }}>
                        <span>Read Story</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. CVE Tracker Vulnerabilities Section */}
            {(activeTab === 'ALL' || activeTab === 'CVES') && matchedVulns.length > 0 && (
              <div>
                {activeTab === 'ALL' && (
                  <h3 style={{ fontSize: '0.85rem', color: '#f43f5e', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                    Active Vulnerabilities & CVE Advisories ({matchedVulns.length})
                  </h3>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {matchedVulns.map((vuln) => (
                    <div
                      key={vuln.cveId}
                      onClick={() => onNavigate('/vulnerabilities')}
                      className="glass-panel"
                      style={{
                        padding: '1.35rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.55rem',
                        borderLeft: '3px solid #f43f5e',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#f43f5e';
                        e.currentTarget.style.background = 'rgba(244, 63, 94, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', color: '#f43f5e', fontWeight: 800, fontFamily: 'var(--font-mono)', background: 'rgba(244, 63, 94, 0.15)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                            {vuln.cveId}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>• Vendor: {vuln.vendor}</span>
                          <span style={{ fontSize: '0.72rem', color: '#fb7185' }}>• CVSS {vuln.cvss || '9.8'}</span>
                        </div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#f43f5e', background: 'rgba(244, 63, 94, 0.15)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          {vuln.exploitationStatus}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, margin: 0 }}>
                        {vuln.name} — Affected: {vuln.product}
                      </h4>

                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                        {vuln.mitigation || 'Review source advisory and apply vendor patches immediately.'}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f43f5e', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.25rem' }}>
                        <span>View CVE Tracker Advisory</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Security Testing Knowledge Hub Section */}
            {(activeTab === 'ALL' || activeTab === 'TESTING') && matchedTesting.length > 0 && (
              <div>
                {activeTab === 'ALL' && (
                  <h3 style={{ fontSize: '0.85rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                    Security Testing Knowledge Hub & Defensive Labs ({matchedTesting.length})
                  </h3>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {matchedTesting.map((lab) => (
                    <div
                      key={`${lab.category}-${lab.slug}`}
                      onClick={() => onNavigate(`/security-testing/${lab.category}/${lab.slug}`)}
                      className="glass-panel"
                      style={{
                        padding: '1.35rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.55rem',
                        borderLeft: '3px solid #00f0ff',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#00f0ff';
                        e.currentTarget.style.background = 'rgba(0, 240, 255, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', color: '#00f0ff', fontWeight: 800, fontFamily: 'var(--font-mono)', background: 'rgba(0, 240, 255, 0.12)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                            {lab.categoryName.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>• {lab.applicablePlatform || 'Platform'}</span>
                        </div>
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          SAFE LAB
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, margin: 0 }}>
                        {lab.name}
                      </h4>

                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                        {lab.shortDefinition}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#00f0ff', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.25rem' }}>
                        <span>Open Defensive Testing Guide</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
