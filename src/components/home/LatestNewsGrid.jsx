import React, { useState } from 'react';
import { Clock, ArrowRight, ShieldCheck, Tag, Filter } from 'lucide-react';
import { getAllArticles } from '../../utils/storage';
import { categoriesData } from '../../data/categories';
import ClaimBadge from '../common/ClaimBadge';

export default function LatestNewsGrid({ onNavigate }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');

  const filtered = selectedCat === 'all'
    ? allArticles
    : allArticles.filter(a => a.category === selectedCat);

  return (
    <section style={{ padding: '3.5rem 0' }}>
      <div className="container-custom">
        {/* Header & Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              DISPATCH FEED
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Latest Cybersecurity & Threat Analysis
            </h2>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedCat('all')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                background: selectedCat === 'all' ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
                border: '1px solid ' + (selectedCat === 'all' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
                color: selectedCat === 'all' ? '#030712' : '#cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              All Topics
            </button>
            {categoriesData.slice(0, 5).map(c => (
              <button
                key={c.slug}
                onClick={() => setSelectedCat(c.slug)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  background: selectedCat === c.slug ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid ' + (selectedCat === c.slug ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
                  color: selectedCat === c.slug ? '#030712' : '#cbd5e1',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '1.75rem'
            }}
          >
            {filtered.map(article => (
              <div
                key={article.slug}
                onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
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
                    <ClaimBadge status={article.claimStatus || "CONFIRMED FACT"} size="small" />
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                    {article.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: '1.25rem' }}>
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
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img
                      src={article.author?.avatar || "/assets/founder/founder-photo.png"}
                      alt={article.author?.name}
                      style={{ width: '22px', height: '22px', borderRadius: '50%' }}
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
    </section>
  );
}
