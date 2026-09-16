import React, { useState, useEffect } from 'react';
import { Shield, Clock, ArrowRight, Filter, Tag, CheckCircle2 } from 'lucide-react';
import { categoriesData } from '../data/categories';
import { getAllArticles } from '../utils/storage';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import ClaimBadge from '../components/common/ClaimBadge';
import AdSlot from '../components/ads/AdSlot';
import { siteConfig } from '../config/site';

export default function CategoryPage({ categorySlug, onNavigate }) {
  const [selectedSubcat, setSelectedSubcat] = useState('all');

  const category = categoriesData.find(c => c.slug === categorySlug) || {
    id: categorySlug,
    slug: categorySlug,
    name: categorySlug.replace(/-/g, ' ').toUpperCase(),
    tagline: `In-depth analysis, intelligence, and guides for ${categorySlug.replace(/-/g, ' ')}.`,
    description: `Comprehensive technical coverage of ${categorySlug.replace(/-/g, ' ')} by CyberAI Watch.`,
    subcategories: []
  };

  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');
  const catArticles = allArticles.filter(a => a.category === category.slug || a.categorySlug === category.slug);

  const filteredArticles = selectedSubcat === 'all'
    ? catArticles
    : catArticles.filter(a => a.tags && a.tags.some(t => t.toLowerCase().includes(selectedSubcat.toLowerCase())));

  useEffect(() => {
    updateMetaTags({
      title: `${category.name} — ${siteConfig.name}`,
      description: category.description || category.tagline,
      type: "website",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: category.name, url: `/${category.slug}` }
      ])
    });

    recordPageView(`/${category.slug}`, `${category.name} Hub`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug]);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom">
        {/* Hub Header */}
        <header
          className="glass-panel"
          style={{
            padding: '3rem 2.5rem',
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
              {category.badge || "EDITORIAL HUB"}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              {catArticles.length} VERIFIED {catArticles.length === 1 ? 'STORY' : 'STORIES'}
            </span>
          </div>

          <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1rem' }}>
            {category.name}
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '820px', margin: 0 }}>
            {category.description || category.tagline}
          </p>

          {/* Subcategory Pills */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.75rem' }}>
              <button
                onClick={() => setSelectedSubcat('all')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  background: selectedSubcat === 'all' ? '#00f0ff' : 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid ' + (selectedSubcat === 'all' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
                  color: selectedSubcat === 'all' ? '#030712' : '#cbd5e1',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                All Topics
              </button>
              {category.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcat(sub)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    background: selectedSubcat === sub ? '#00f0ff' : 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid ' + (selectedSubcat === sub ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
                    color: selectedSubcat === sub ? '#030712' : '#cbd5e1',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Ad Placement */}
        <AdSlot type="leaderboard" />

        {/* Stories Grid */}
        {filteredArticles.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '12px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No published stories yet in this topic</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              Our editorial desk is actively researching new threat advisories for this section.
            </p>
            <button onClick={() => onNavigate('/')} className="btn-cyber-primary">
              Return to Homepage
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredArticles.map((article) => (
              <div
                key={article.slug}
                onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: 'rgba(0, 240, 255, 0.12)',
                        color: '#00f0ff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {article.type || "ANALYSIS"}
                    </span>
                    <ClaimBadge status={article.claimStatus || "CONFIRMED FACT"} size="small" />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                    {article.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                    {article.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '0.78rem',
                    color: '#64748b'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <img
                      src={article.author?.avatar || "/assets/founder/founder-photo.png"}
                      alt={article.author?.name}
                      style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                    />
                    <span>{article.author?.name}</span>
                  </div>
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
