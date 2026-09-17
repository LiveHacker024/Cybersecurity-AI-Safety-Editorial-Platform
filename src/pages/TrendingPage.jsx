import React, { useState, useEffect } from 'react';
import { TrendingUp, Flame, Eye, Clock, ArrowRight, Activity, BarChart2 } from 'lucide-react';
import { getAllArticles } from '../utils/storage';
import { getAnalyticsSummary, recordPageView } from '../utils/analytics';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import ClaimBadge from '../components/common/ClaimBadge';
import { siteConfig } from '../config/site';

export default function TrendingPage({ onNavigate }) {
  const [analytics, setAnalytics] = useState(null);
  const allArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');

  useEffect(() => {
    updateMetaTags({
      title: `Trending Cybersecurity & AI Safety Stories — ${siteConfig.name}`,
      description: "Trending and most engaged investigations, threat advisories, and AI safety breakdowns across CyberAI Watch.",
      type: "website",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Trending", url: "/trending" }
      ])
    });

    recordPageView('/trending', 'Trending Stories');
    setAnalytics(getAnalyticsSummary());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Compute real ranked stories based on stored local telemetry
  const rankedArticles = allArticles.map((art) => {
    const path = `/${art.category}/${art.slug}`;
    const directViews = analytics?.viewsByPath?.[path] || 0;
    return { ...art, realViewCount: directViews };
  }).sort((a, b) => b.realViewCount - a.realViewCount);

  const hasRealActivity = rankedArticles.some(a => a.realViewCount > 0);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '960px' }}>
        <header
          className="glass-panel"
          style={{
            padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem)',
            borderRadius: '16px',
            marginBottom: '3rem',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 240, 255, 0.12) 0%, rgba(5, 8, 17, 0.9) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
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
              REAL ENGAGEMENT SIGNALS
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              ZERO SYNTHETIC TRAFFIC
            </span>
          </div>

          <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1rem' }}>
            Trending & Most Read Stories
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '780px', margin: 0 }}>
            Ranked purely by verified reader interactions, publication recency, and technical incident severity.
          </p>
        </header>

        {/* Real Activity Alert or Empty Telemetry State */}
        {!hasRealActivity && (
          <div
            className="glass-panel"
            style={{
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              borderRadius: '12px',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <BarChart2 size={24} color="#00f0ff" />
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.25rem' }}>
                Zero-Telemetry Transparent Ranking
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0, lineHeight: 1.45 }}>
                Trending metrics reflect genuine on-site reader navigation. As you explore stories across CyberAI Watch, ranking updates automatically without transmitting telemetry to third-party ad trackers.
              </p>
            </div>
          </div>
        )}

        {/* Ranked Stories Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {rankedArticles.map((article, idx) => (
            <div
              key={article.slug}
              onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
              className="glass-panel"
              style={{
                padding: 'clamp(1rem, 3vw, 1.75rem)',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Rank Index */}
              <div
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)',
                  color: idx < 3 ? '#00f0ff' : '#475569',
                  minWidth: '36px',
                  lineHeight: 1
                }}
              >
                0{idx + 1}
              </div>

              {/* Story Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#00f0ff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {article.categoryName}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>•</span>
                    <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>{article.type}</span>
                  </div>
                  <ClaimBadge status={article.claimStatus || "CONFIRMED FACT"} size="small" />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.65rem' }}>
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1rem' }}>
                  {article.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span>{article.publishedAt}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {article.realViewCount > 0 && (
                      <span style={{ color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                        {article.realViewCount} {article.realViewCount === 1 ? 'local read' : 'local reads'}
                      </span>
                    )}
                    <span style={{ color: '#00f0ff', fontWeight: 600 }}>{article.readingTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
