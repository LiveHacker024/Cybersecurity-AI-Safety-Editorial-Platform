import React from 'react';
import { Clock, User, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { getAllArticles } from '../../utils/storage';
import ClaimBadge from '../common/ClaimBadge';

export default function FeaturedStory({ onNavigate }) {
  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');
  // Sort dynamically to always lead with the newest or explicitly featured article
  const leadArticle = allArticles.find(a => a.featured) || allArticles[0];
  const secondaryArticles = allArticles.filter(a => a.slug !== leadArticle?.slug).slice(0, 2);

  if (!leadArticle) return null;

  return (
    <section id="featured-story" style={{ padding: '3.5rem 0 2rem', scrollMarginTop: '80px' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                EDITORIAL SPOTLIGHT
              </span>
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: 900, color: '#ffffff', margin: 0 }}>
              Featured Investigation & Top Stories
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/news')}
            className="btn-cyber-secondary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', fontWeight: 700 }}
          >
            <span>View All News & Wire</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Lead Story + Secondary Grid */}
        <div
          className="featured-story-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch'
          }}
        >
          {/* Primary Lead Article Card */}
          <div
            onClick={() => onNavigate(`/${leadArticle.category}/${leadArticle.slug}`)}
            className="glass-panel featured-lead-card"
            style={{
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gridColumn: 'span 2',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              background: 'rgba(10, 15, 29, 0.9)'
            }}
          >
            <div>
              {/* Hero Image if present */}
              {leadArticle.heroImage && (
                <div
                  style={{
                    marginBottom: '1.5rem',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    maxHeight: '320px',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    background: '#070a12'
                  }}
                >
                  <img
                    src={leadArticle.heroImage}
                    alt={leadArticle.heroImageAlt || leadArticle.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '320px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="eager"
                  />
                </div>
              )}

              {/* Badges Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '0.2rem 0.65rem',
                    borderRadius: '4px',
                    background: 'rgba(0, 240, 255, 0.15)',
                    border: '1px solid rgba(0, 240, 255, 0.35)',
                    color: '#00f0ff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {leadArticle.categoryName}
                </span>
                <ClaimBadge status={leadArticle.claimStatus || "SOURCE-VERIFIED"} />
                {leadArticle.type && (
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    • {leadArticle.type}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.35rem, 2.8vw, 1.95rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.25,
                  marginBottom: '1rem'
                }}
              >
                {leadArticle.title}
              </h3>

              {/* Excerpt */}
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {leadArticle.subtitle || leadArticle.excerpt}
              </p>
            </div>

            {/* Author & Meta Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <img
                  src={leadArticle.author?.avatar || "/assets/founder/founder-photo.png"}
                  alt={leadArticle.author?.name}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #00f0ff', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                    {leadArticle.author?.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {leadArticle.publishedAt}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={13} color="#00f0ff" />
                  {leadArticle.readingTime}
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: '#030712',
                    background: '#00f0ff',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '6px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>Read Story</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Lead Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {secondaryArticles.map((art) => (
              <div
                key={art.slug}
                onClick={() => onNavigate(`/${art.category}/${art.slug}`)}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '14px',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  background: 'rgba(15, 23, 42, 0.8)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: 'rgba(0, 240, 255, 0.12)',
                        color: '#00f0ff',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {art.categoryName}
                    </span>
                    <ClaimBadge status={art.claimStatus || "SOURCE-VERIFIED"} size="small" />
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                    {art.title}
                  </h3>
                  <p style={{ fontSize: '0.835rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                    {art.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', color: '#64748b' }}>
                  <span>{art.publishedAt}</span>
                  <span style={{ color: '#00f0ff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>{art.readingTime}</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .featured-story-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-lead-card {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 480px) {
          .featured-lead-card {
            padding: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
