import React, { useState } from 'react';
import { Clock, ArrowRight, ShieldCheck, Tag, Filter, FileText, Calendar } from 'lucide-react';
import { getAllArticles } from '../../utils/storage';
import { categoriesData } from '../../data/categories';
import ClaimBadge from '../common/ClaimBadge';

export default function LatestNewsGrid({ onNavigate }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');
  const leadArticle = allArticles.find(a => a.featured) || allArticles[0];

  const filtered = selectedCat === 'all'
    ? allArticles.filter(a => a.slug !== leadArticle?.slug)
    : allArticles.filter(a => a.category === selectedCat);

  return (
    <section id="latest-news" style={{ padding: '3.5rem 0', scrollMarginTop: '80px' }}>
      <div className="container-custom">
        {/* Header & Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              LATEST DISPATCHES & EDITORIAL WIRE
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(1.35rem, 2.8vw, 1.75rem)', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Latest Cybersecurity News & Threat Research
            </h2>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              flexWrap: 'wrap',
              maxWidth: '100%',
              overflowX: 'auto',
              paddingBottom: '0.25rem'
            }}
          >
            <button
              onClick={() => setSelectedCat('all')}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                background: selectedCat === 'all' ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
                border: '1px solid ' + (selectedCat === 'all' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
                color: selectedCat === 'all' ? '#030712' : '#cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              All Topics ({allArticles.length})
            </button>
            {categoriesData.slice(0, 5).map(c => (
              <button
                key={c.slug}
                onClick={() => setSelectedCat(c.slug)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  background: selectedCat === c.slug ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid ' + (selectedCat === c.slug ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
                  color: selectedCat === c.slug ? '#030712' : '#cbd5e1',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', margin: 0 }}>No published stories in this category yet.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1.75rem'
            }}
          >
            {filtered.map(article => (
              <div
                key={article.slug}
                onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
                className="glass-panel latest-news-card"
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '14px',
                  border: '1px solid rgba(56, 189, 248, 0.18)',
                  background: 'rgba(15, 23, 42, 0.75)',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
              >
                <div>
                  {/* Article Thumbnail Image */}
                  <div
                    style={{
                      width: '100%',
                      height: '160px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '1rem',
                      background: '#070a12',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <img
                      src={article.heroImage || "/assets/images/fortimail-vulnerability-cert-in-2026-hero.jpg"}
                      alt={article.heroImageAlt || article.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Header Row: Category Badge & Claim Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
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
                      {article.categoryName}
                    </span>
                    <ClaimBadge status={article.claimStatus || "SOURCE-VERIFIED"} size="small" />
                  </div>

                  {/* Article Title */}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.65rem' }}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer: Date, Reading Time & Read Story */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '0.75rem',
                    color: '#64748b',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={12} color="#00f0ff" />
                    <span>{article.publishedAt}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: '#94a3b8' }}>{article.readingTime}</span>
                    <span style={{ color: '#00f0ff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <span>Read Story</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .latest-news-card:hover {
          border-color: rgba(0, 240, 255, 0.4) !important;
          transform: translateY(-2px);
          background: rgba(22, 36, 62, 0.85) !important;
        }
      `}</style>
    </section>
  );
}
