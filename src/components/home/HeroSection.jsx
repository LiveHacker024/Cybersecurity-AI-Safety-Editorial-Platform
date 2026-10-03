import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Shield, Activity, Sparkles, X, Clock, Calendar, FileText, Key } from 'lucide-react';
import { getAllArticles, getAllVulnerabilities } from '../../utils/storage';
import { allSecurityTestingVulnerabilities } from '../../data/securityTesting';
import ClaimBadge from '../common/ClaimBadge';

export default function HeroSection({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');
  const allVulns = getAllVulnerabilities();

  // Handle click outside to close live search dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search logic matching real local data
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      // 1. Search Published Articles
      const matchedArticles = allArticles.filter(a =>
        a.title.toLowerCase().includes(trimmed) ||
        (a.subtitle && a.subtitle.toLowerCase().includes(trimmed)) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(trimmed)) ||
        (a.keywords && a.keywords.toLowerCase().includes(trimmed)) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(trimmed))) ||
        (a.categoryName && a.categoryName.toLowerCase().includes(trimmed)) ||
        (a.category && a.category.toLowerCase().includes(trimmed))
      ).map(a => ({
        type: 'article',
        category: a.categoryName || a.category,
        title: a.title,
        excerpt: a.subtitle || a.excerpt,
        date: a.publishedAt,
        readingTime: a.readingTime,
        claimStatus: a.claimStatus || 'SOURCE-VERIFIED',
        path: `/${a.category}/${a.slug}`
      }));

      // 2. Search CVE Tracker entries
      const matchedVulns = allVulns.filter(v =>
        v.cveId.toLowerCase().includes(trimmed) ||
        v.name.toLowerCase().includes(trimmed) ||
        (v.product && v.product.toLowerCase().includes(trimmed)) ||
        (v.vendor && v.vendor.toLowerCase().includes(trimmed)) ||
        (v.mitigation && v.mitigation.toLowerCase().includes(trimmed))
      ).map(v => ({
        type: 'cve',
        category: 'Vulnerabilities & CVEs',
        title: `${v.cveId}: ${v.name}`,
        excerpt: `Affected Product: ${v.product} (${v.vendor}). Status: ${v.exploitationStatus}.`,
        date: 'Active CVE Advisory',
        readingTime: `CVSS ${v.cvss || '9.8'}`,
        claimStatus: 'CRITICAL ALERT',
        path: '/vulnerabilities'
      }));

      // 3. Search Security Testing Knowledge Hub entries
      const matchedTesting = allSecurityTestingVulnerabilities.filter(t =>
        t.name.toLowerCase().includes(trimmed) ||
        (t.shortDefinition && t.shortDefinition.toLowerCase().includes(trimmed)) ||
        (t.cweClassification && t.cweClassification.toLowerCase().includes(trimmed)) ||
        (t.owaspClassification && t.owaspClassification.toLowerCase().includes(trimmed))
      ).slice(0, 3).map(t => ({
        type: 'testing',
        category: `${t.categoryName || 'Security Testing'}`,
        title: t.name,
        excerpt: t.shortDefinition,
        date: t.owaspClassification || 'Authorized Testing Lab',
        readingTime: 'Educational Guide',
        claimStatus: 'SAFE LAB',
        path: `/security-testing/${t.category}/${t.slug}`
      }));

      const combined = [...matchedArticles, ...matchedVulns, ...matchedTesting];
      setResults(combined);
      setIsSearching(false);
      setIsDropdownOpen(true);
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  // Key navigation & submission handler
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length === 1) {
        onNavigate(results[0].path);
        setIsDropdownOpen(false);
      } else if (results.length > 1) {
        onNavigate(`/search?q=${encodeURIComponent(query)}`);
        setIsDropdownOpen(false);
      }
    }
  };

  const handleSelectSuggestion = (term) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const authenticSuggestions = ["FortiMail", "CVE", "AI Security", "Dark Web", "Cybersecurity"];

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(580px, 68vh, 700px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3.5rem, 7vw, 5.5rem) 0 3rem',
        overflow: 'visible',
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)'
      }}
    >
      {/* Background Image: Hooded Hacker / Laptop with Cyan Binary Code */}
      <div
        className="hero-background-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/assets/images/cyberai-watch-dark-web-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
        aria-hidden="true"
      />

      {/* Subtle Readability Gradient: Strongest behind text, transparent toward image focal areas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(3, 7, 18, 0.72) 0%, rgba(3, 7, 18, 0.55) 40%, rgba(3, 7, 18, 0.85) 80%, #030712 100%), radial-gradient(ellipse at 50% 35%, rgba(3, 7, 18, 0.45) 0%, rgba(3, 7, 18, 0.85) 100%)',
          zIndex: 2
        }}
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '920px',
          margin: '0 auto'
        }}
      >
        {/* Small Label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: '9999px',
            background: 'rgba(10, 15, 29, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            marginBottom: '1.25rem',
            boxShadow: '0 0 16px rgba(0, 240, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <Sparkles size={13} color="#00f0ff" />
          <span style={{ fontSize: '0.74rem', color: '#f8fafc', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
            CYBERSECURITY • AI SECURITY • THREAT INTELLIGENCE
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="font-heading hero-headline"
          style={{
            fontSize: 'clamp(2.1rem, 5.2vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '1.25rem',
            textShadow: '0 3px 25px rgba(0, 0, 0, 0.9)'
          }}
        >
          Defending Systems in the Era of <span className="gradient-text-cyan">Autonomous AI</span>
        </h1>

        {/* Short Description */}
        <p
          className="hero-description"
          style={{
            fontSize: 'clamp(1rem, 2.1vw, 1.18rem)',
            color: '#e2e8f0',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
            maxWidth: '780px',
            margin: '0 auto 2.5rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)'
          }}
        >
          Independent cybersecurity journalism, security research, vulnerability tracking and defensive security education.
        </p>

        {/* ONE Prominent Hero Search Box */}
        <div
          ref={searchContainerRef}
          style={{
            position: 'relative',
            maxWidth: '680px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(10, 15, 29, 0.92)',
              border: '1.5px solid rgba(0, 240, 255, 0.45)',
              borderRadius: '14px',
              padding: '0.4rem 0.5rem 0.4rem 1.25rem',
              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 240, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 0.25s ease'
            }}
          >
            <Search size={20} color="#00f0ff" style={{ flexShrink: 0, marginRight: '0.75rem' }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (query.trim().length >= 2) setIsDropdownOpen(true);
              }}
              placeholder="Search CyberAI Watch articles, vulnerabilities & guides..."
              aria-label="Search CyberAI Watch articles"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                fontFamily: 'var(--font-sans)',
                minWidth: 0
              }}
            />

            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  setIsDropdownOpen(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  padding: '0.4rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.25rem'
                }}
                aria-label="Clear search query"
              >
                <X size={18} />
              </button>
            )}

            <button
              onClick={() => {
                if (results.length === 1) {
                  onNavigate(results[0].path);
                  setIsDropdownOpen(false);
                } else if (query.trim()) {
                  onNavigate(`/search?q=${encodeURIComponent(query)}`);
                  setIsDropdownOpen(false);
                }
              }}
              className="btn-cyber-primary hero-search-submit"
              style={{
                padding: '0.65rem 1.25rem',
                fontSize: '0.88rem',
                fontWeight: 800,
                borderRadius: '10px',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                flexShrink: 0
              }}
              aria-label="Submit Search"
            >
              <span>Search</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Live Search Results Dropdown Panel */}
          {isDropdownOpen && query.trim().length >= 2 && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.6rem)',
                left: 0,
                right: 0,
                background: 'rgba(8, 12, 24, 0.98)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                borderRadius: '14px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 240, 255, 0.15)',
                maxHeight: '420px',
                overflowY: 'auto',
                zIndex: 60,
                textAlign: 'left',
                padding: '1rem'
              }}
            >
              {results.length > 0 ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                      FOUND {results.length} MATCHING {results.length === 1 ? 'RESULT' : 'RESULTS'}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Press Enter to open or select below
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {results.slice(0, 5).map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          onNavigate(item.path);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          background: 'rgba(15, 23, 42, 0.7)',
                          border: '1px solid rgba(56, 189, 248, 0.15)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#00f0ff';
                          e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.15)';
                          e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)';
                        }}
                      >
                        {/* Category & Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 800,
                              color: '#00f0ff',
                              background: 'rgba(0, 240, 255, 0.12)',
                              padding: '0.15rem 0.45rem',
                              borderRadius: '4px'
                            }}
                          >
                            {item.category.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>• {item.date}</span>
                          <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>• {item.readingTime}</span>
                        </div>

                        {/* Title */}
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.3rem' }}>
                          {item.title}
                        </h4>

                        {/* Excerpt */}
                        <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.45, margin: 0 }}>
                          {item.excerpt}
                        </p>

                        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#00f0ff', fontSize: '0.75rem', fontWeight: 700 }}>
                          <span>Read Story</span>
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {results.length > 5 && (
                    <button
                      onClick={() => {
                        onNavigate(`/search?q=${encodeURIComponent(query)}`);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        marginTop: '0.75rem',
                        padding: '0.65rem',
                        background: 'rgba(0, 240, 255, 0.12)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#00f0ff',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      View all {results.length} results on Search Page →
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 0.5rem' }}>
                    No articles found for: <span style={{ color: '#00f0ff' }}>"{query}"</span>
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 1rem' }}>
                    Try another keyword such as:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                    {authenticSuggestions.map((sug) => (
                      <button
                        key={sug}
                        onClick={() => handleSelectSuggestion(sug)}
                        style={{
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          color: '#38bdf8',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer'
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            min-height: 520px !important;
            padding: 3rem 0 2.5rem !important;
          }
          .hero-background-image {
            background-position: center 10% !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            min-height: 480px !important;
            padding: 2.25rem 0 2rem !important;
          }
          .hero-search-submit span {
            display: none;
          }
          .hero-search-submit {
            padding: 0.65rem 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
}
