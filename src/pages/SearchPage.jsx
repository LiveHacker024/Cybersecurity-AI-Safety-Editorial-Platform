import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, ArrowRight, ShieldCheck, Tag, X } from 'lucide-react';
import { getAllArticles } from '../utils/storage';
import { categoriesData } from '../data/categories';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView, recordSearchQuery } from '../utils/analytics';
import ClaimBadge from '../components/common/ClaimBadge';
import { siteConfig } from '../config/site';

export default function SearchPage({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');

  useEffect(() => {
    updateMetaTags({
      title: `Search Articles & Threat Intelligence — ${siteConfig.name}`,
      description: "Search all cybersecurity investigations, AI safety breakdowns, vulnerability advisories, and defensive tutorials.",
      type: "website",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Search", url: "/search" }
      ])
    });

    recordPageView('/search', 'Site Search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Trigger search tracking on debounce
  useEffect(() => {
    if (query.trim().length >= 3) {
      const timer = setTimeout(() => {
        recordSearchQuery(query);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const results = allArticles.filter((a) => {
    const q = query.toLowerCase().trim();
    const matchesQuery = !q || (
      a.title.toLowerCase().includes(q) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
      (a.content && a.content.toLowerCase().includes(q)) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
      (a.author?.name && a.author.name.toLowerCase().includes(q))
    );

    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchesType = selectedType === 'ALL' || a.type === selectedType;

    return matchesQuery && matchesCategory && matchesType;
  });

  const articleTypes = ['ALL', 'NEWS', 'ANALYSIS', 'EXPLAINER', 'HOW-TO', 'TUTORIAL', 'RESEARCH', 'VULNERABILITY'];

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '960px' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            REAL-TIME INTELLIGENCE SEARCH
          </span>
          <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 900, color: '#ffffff', margin: '0.4rem 0 1.5rem' }}>
            Search CyberAI Watch
          </h1>

          {/* Search Input Bar */}
          <div style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}>
            <Search size={18} color="#00f0ff" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              autoFocus
              placeholder="Search by keyword, CVE, agent risk, or topic..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 2.5rem 0.85rem 2.75rem',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)'
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </header>

        {/* Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {/* Category Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', marginRight: '0.5rem', fontFamily: 'var(--font-mono)' }}>CATEGORY:</span>
            <button
              onClick={() => setSelectedCategory('ALL')}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                background: selectedCategory === 'ALL' ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
                border: '1px solid ' + (selectedCategory === 'ALL' ? '#00f0ff' : 'rgba(255, 255, 255, 0.08)'),
                color: selectedCategory === 'ALL' ? '#030712' : '#cbd5e1',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              All
            </button>
            {categoriesData.slice(0, 6).map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  background: selectedCategory === cat.slug ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid ' + (selectedCategory === cat.slug ? '#00f0ff' : 'rgba(255, 255, 255, 0.08)'),
                  color: selectedCategory === cat.slug ? '#030712' : '#cbd5e1',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Type Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', marginRight: '0.5rem', fontFamily: 'var(--font-mono)' }}>TYPE:</span>
            {articleTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                style={{
                  padding: '0.25rem 0.55rem',
                  borderRadius: '4px',
                  background: selectedType === type ? 'rgba(168, 85, 247, 0.25)' : 'transparent',
                  border: '1px solid ' + (selectedType === type ? '#c084fc' : 'rgba(255, 255, 255, 0.06)'),
                  color: selectedType === type ? '#c084fc' : '#94a3b8',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
          <span>Showing {results.length} results</span>
          {query && <span>Query: "{query}"</span>}
        </div>

        {/* Results List */}
        {results.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '12px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No matching articles found</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
              Try searching with broader terms such as "AI", "Agent", "CVE", or "Injection".
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {results.map((article) => (
              <div
                key={article.slug}
                onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#00f0ff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {article.categoryName}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>•</span>
                    <span style={{ fontSize: '0.7rem', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
                      {article.type}
                    </span>
                  </div>
                  <ClaimBadge status={article.claimStatus || "CONFIRMED FACT"} size="small" />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, margin: 0 }}>
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                  {article.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                  <span>By {article.author?.name} • {article.publishedAt}</span>
                  <span style={{ color: '#00f0ff', fontWeight: 600 }}>{article.readingTime}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
