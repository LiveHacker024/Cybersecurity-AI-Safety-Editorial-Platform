import React, { useState } from 'react';
import { Clock, Calendar, Shield, ArrowRight, Filter, ChevronRight, User } from 'lucide-react';
import { articlesData } from '../../data/articles';

export default function LatestNewsGrid({ onNavigate }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filterTabs = [
    { id: 'ALL', label: 'All Intel' },
    { id: 'cybersecurity', label: 'Cyber Attack' },
    { id: 'ai-safety', label: 'AI Security' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'technology', label: 'Mobile & Hardware' },
    { id: 'finance-tech', label: 'FinTech' }
  ];

  const filteredArticles = selectedFilter === 'ALL'
    ? articlesData
    : articlesData.filter(a => a.category === selectedFilter);

  return (
    <section style={{ padding: '3.5rem 0' }}>
      <div className="container-custom">
        {/* Section Header & Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid #1e293b',
            paddingBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '4px', height: '24px', background: '#00f0ff', borderRadius: '2px' }} />
            <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
              Latest Cybersecurity & Threat Intelligence
            </h2>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-display)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isActive ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                    color: isActive ? '#00f0ff' : '#94a3b8',
                    border: isActive ? '1px solid #00f0ff' : '1px solid #1e293b'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Grid Layout with varying card sizes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredArticles.map((article, index) => (
            <article
              key={article.id}
              className="glass-panel"
              onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(56, 189, 248, 0.15)'
              }}
            >
              {/* Card Thumbnail */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 9',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={article.heroImage}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  className="article-card-img"
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem'
                  }}
                >
                  <span className="cyber-badge">
                    {article.categoryName}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} /> {article.publishedAt}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} /> {article.readingTime}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: '#f8fafc',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {article.title}
                  </h3>

                  {/* 2-Line Summary */}
                  <p
                    style={{
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>

                {/* Author Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid #1e293b'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1' }}>
                      {article.author.name}
                    </span>
                  </div>

                  <span style={{ color: '#00f0ff', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: 600 }}>
                    Read <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .glass-panel:hover .article-card-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
