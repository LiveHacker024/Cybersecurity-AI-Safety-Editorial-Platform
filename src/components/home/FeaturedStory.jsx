import React from 'react';
import { Clock, Calendar, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getFeaturedArticle } from '../../data/articles';

export default function FeaturedStory({ onNavigate }) {
  const article = getFeaturedArticle();

  return (
    <section style={{ padding: '4.5rem 0 2.5rem' }}>
      <div className="container-custom">
        {/* Section Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '4px', height: '24px', background: '#00f0ff', borderRadius: '2px' }} />
            <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f8fafc' }}>
              Lead Editorial Investigation
            </h2>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={14} /> PEER-REVIEWED RESEARCH
          </span>
        </div>

        {/* Large Editorial Card */}
        <div
          className="glass-panel"
          onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 15, 29, 0.95) 100%)'
          }}
        >
          {/* Media Column (Image + Hover Zoom) */}
          <div
            style={{
              position: 'relative',
              minHeight: '340px',
              overflow: 'hidden'
            }}
          >
            <img
              src={article.heroImage}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="featured-media-img"
            />
            {/* Dark gradient overlay for text protection */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, transparent 60%, rgba(15, 23, 42, 0.9) 100%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                zIndex: 2
              }}
            >
              <span className="cyber-badge-purple" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 700 }}>
                {article.badge}
              </span>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Category & Read Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <span className="cyber-badge" style={{ fontSize: '0.75rem' }}>
                  {article.categoryName}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} /> {article.readingTime}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} /> {article.publishedAt}
                </span>
              </div>

              {/* Headline */}
              <h3
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 800,
                  lineHeight: 1.25,
                  color: '#ffffff',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                  transition: 'color 0.2s ease'
                }}
              >
                {article.title}
              </h3>

              {/* Excerpt */}
              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '1rem',
                  lineHeight: 1.65,
                  marginBottom: '1.75rem'
                }}
              >
                {article.excerpt}
              </p>
            </div>

            {/* Author Footer & CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.5rem',
                borderTop: '1px solid #1e293b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #00f0ff'
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {article.author.name} <ShieldCheck size={14} color="#00f0ff" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {article.author.role}
                  </div>
                </div>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#00f0ff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-display)'
                }}
              >
                Read Deep Dive <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .glass-panel:hover .featured-media-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
