import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronRight, Zap } from 'lucide-react';
import { getAllArticles } from '../../utils/storage';
import ClaimBadge from '../common/ClaimBadge';

export default function BreakingTicker({ onSelectArticle }) {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const list = getAllArticles().filter(a => a.status === 'PUBLISHED');
    setArticles(list);
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [articles]);

  if (articles.length === 0) return null;
  const current = articles[currentIndex] || articles[0];

  return (
    <div
      style={{
        background: 'rgba(5, 8, 17, 0.95)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
        padding: '0.6rem 0'
      }}
    >
      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.2rem 0.55rem',
              borderRadius: '4px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#ef4444',
              fontSize: '0.68rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              flexShrink: 0
            }}
          >
            <Zap size={12} />
            <span className="ticker-badge-text">THREAT WIRE</span>
          </div>

          <div
            onClick={() => onSelectArticle(`/${current.category}/${current.slug}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              overflow: 'hidden',
              minWidth: 0
            }}
          >
            <div className="ticker-claim-badge" style={{ flexShrink: 0 }}>
              <ClaimBadge status={current.claimStatus || "CONFIRMED FACT"} size="small" />
            </div>
            <span style={{ fontSize: '0.825rem', color: '#f8fafc', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {current.title}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <button
            onClick={() => onSelectArticle(`/${current.category}/${current.slug}`)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00f0ff',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              cursor: 'pointer',
              padding: '0.2rem 0.4rem',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Read Story</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .ticker-claim-badge { display: none !important; }
        }
      `}</style>
    </div>
  );
}
