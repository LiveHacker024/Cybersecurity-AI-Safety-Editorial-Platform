import React from 'react';
import { Clock, User, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { getAllArticles } from '../../utils/storage';
import ClaimBadge from '../common/ClaimBadge';

export default function FeaturedStory({ onNavigate }) {
  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');
  const leadArticle = allArticles.find(a => a.featured) || allArticles[0];
  const secondaryArticles = allArticles.filter(a => a.slug !== leadArticle?.slug).slice(0, 2);

  if (!leadArticle) return null;

  return (
    <section style={{ padding: '3.5rem 0 2rem' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              EDITORIAL SPOTLIGHT
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Top Stories & Primary Investigations
            </h2>
          </div>
        </div>

        {/* Lead Story + Secondary Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch'
          }}
        >
          {/* Primary Lead Article Card */}
          <div
            onClick={() => onNavigate(`/${leadArticle.category}/${leadArticle.slug}`)}
            className="glass-panel"
            style={{
              padding: '2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gridColumn: 'span 2',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              {/* Badges Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '0.2rem 0.6rem',
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
                <ClaimBadge status={leadArticle.claimStatus || "ANALYSIS"} />
              </div>

              {/* Title */}
              <h3
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.25,
                  marginBottom: '1rem'
                }}
              >
                {leadArticle.title}
              </h3>

              {/* Excerpt */}
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
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
                  style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid #00f0ff' }}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={13} />
                  {leadArticle.readingTime}
                </span>
                <span style={{ fontSize: '0.825rem', color: '#00f0ff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>Read Investigation</span>
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
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#cbd5e1',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {art.categoryName}
                    </span>
                    <ClaimBadge status={art.claimStatus || "CONFIRMED FACT"} size="small" />
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                    {art.title}
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    {art.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.75rem', color: '#64748b' }}>
                  <span>{art.publishedAt}</span>
                  <span style={{ color: '#00f0ff', fontWeight: 600 }}>{art.readingTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
