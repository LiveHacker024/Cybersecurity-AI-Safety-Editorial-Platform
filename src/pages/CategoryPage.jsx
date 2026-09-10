import React, { useEffect } from 'react';
import { Shield, Clock, Calendar, ChevronRight } from 'lucide-react';
import { categoriesData } from '../data/categories';
import { getArticlesByCategory, articlesData } from '../data/articles';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import AdSlot from '../components/ads/AdSlot';

export default function CategoryPage({ categorySlug, onNavigate }) {
  const category = categoriesData.find(c => c.slug === categorySlug) || {
    id: categorySlug,
    name: categorySlug ? categorySlug.toUpperCase() : "Cyber Intelligence",
    badge: "Intel Hub",
    tagline: "Latest threat research, vulnerability discoveries, and technical analysis.",
    description: "Deep investigative coverage and practical defensive insights."
  };

  const articles = categorySlug === 'news'
    ? articlesData
    : getArticlesByCategory(categorySlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateMetaTags({
      title: `${category.name} Intel & Research — HackWithKunal`,
      description: category.description,
      keywords: `${category.name}, cybersecurity, threat intelligence, HackWithKunal`,
      url: window.location.href,
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "https://hackwithkunal.com" },
        { name: category.name, url: window.location.href }
      ])
    });
  }, [categorySlug, category]);

  return (
    <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0 5rem' }}>
      <div className="container-custom">
        {/* Category Hero Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '3rem 2.5rem',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 15, 29, 0.95) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '20px'
          }}
        >
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <Shield size={14} /> {category.badge || 'INTELLIGENCE HUB'}
          </div>

          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.85rem',
              letterSpacing: '-0.02em'
            }}
          >
            {category.name}
          </h1>

          <p
            style={{
              color: '#00f0ff',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              marginBottom: '1rem',
              fontWeight: 600
            }}
          >
            {category.tagline}
          </p>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '1.05rem',
              maxWidth: '780px',
              lineHeight: 1.6
            }}
          >
            {category.description}
          </p>
        </div>

        {/* AdSlot */}
        <AdSlot type="leaderboard" />

        {/* Articles Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <h2 className="font-heading" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
              Published Intelligence Reports ({articles.length})
            </h2>
          </div>

          {articles.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
              No articles currently published in this vertical. Check back shortly for updated intelligence.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2rem'
              }}
            >
              {articles.map((article) => (
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
                  <div style={{ aspectRatio: '16 / 9', width: '100%', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      style={{ width: '100%', height: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                      <span className="cyber-badge">{article.categoryName}</span>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={13} /> {article.publishedAt}
                        </span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={13} /> {article.readingTime}
                        </span>
                      </div>

                      <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                        {article.title}
                      </h3>

                      <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {article.excerpt}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #1e293b' }}>
                      <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>By {article.author?.name}</span>
                      <span style={{ color: '#00f0ff', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        Read Report <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
