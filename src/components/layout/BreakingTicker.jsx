import React from 'react';
import { Radio, Zap, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { breakingNewsTicker } from '../../data/threats';

export default function BreakingTicker({ onSelectArticle }) {
  // Duplicate array for smooth continuous looping
  const tickerItems = [...breakingNewsTicker, ...breakingNewsTicker];

  return (
    <div
      style={{
        background: 'rgba(10, 15, 29, 0.95)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.12)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 40,
        height: '42px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Static Left Breaking Badge */}
      <div
        style={{
          background: 'linear-gradient(90deg, #f43f5e 0%, #e11d48 100%)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          padding: '0 1.25rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '4px 0 15px rgba(244, 63, 94, 0.4)',
          zIndex: 2,
          flexShrink: 0
        }}
      >
        <Radio size={14} className="animate-pulse" />
        <span>BREAKING</span>
      </div>

      {/* Animated Ticker Track */}
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)'
        }}
      >
        <div className="animate-ticker" style={{ display: 'flex', alignItems: 'center' }}>
          {tickerItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0 2rem',
                fontSize: '0.85rem',
                color: '#cbd5e1',
                cursor: 'pointer'
              }}
              onClick={() => onSelectArticle && onSelectArticle('/cybersecurity/ai-agent-security-threats-2026')}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: '#00f0ff',
                  background: 'rgba(0, 240, 255, 0.1)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 240, 255, 0.25)'
                }}
              >
                {item.tag}
              </span>
              <span style={{ fontWeight: 500 }}>{item.text}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>({item.time})</span>
              <span style={{ color: '#334155', marginLeft: '0.5rem' }}>•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
