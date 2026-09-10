import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Tag, User, ShieldCheck } from 'lucide-react';
import { articlesData } from '../../data/articles';
import { guidesData } from '../../data/guides';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter articles and guides
  const trimmedQuery = query.toLowerCase().trim();
  const matchedArticles = trimmedQuery
    ? articlesData.filter(a =>
        a.title.toLowerCase().includes(trimmedQuery) ||
        a.subtitle?.toLowerCase().includes(trimmedQuery) ||
        a.excerpt?.toLowerCase().includes(trimmedQuery) ||
        a.tags?.some(t => t.toLowerCase().includes(trimmedQuery)) ||
        a.categoryName?.toLowerCase().includes(trimmedQuery)
      )
    : articlesData.slice(0, 4);

  const matchedGuides = trimmedQuery
    ? guidesData.filter(g =>
        g.title.toLowerCase().includes(trimmedQuery) ||
        g.summary?.toLowerCase().includes(trimmedQuery)
      )
    : guidesData.slice(0, 2);

  const handleItemClick = (path) => {
    onSelectResult(path);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(3, 6, 14, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '5rem 1rem 2rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'rgba(10, 15, 29, 0.95)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.2)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #1e293b'
          }}
        >
          <Search size={22} color="#00f0ff" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cybersecurity analysis, AI safety, guides, CVEs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-sans)'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: '#1e293b',
              border: 'none',
              color: '#94a3b8',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(15, 23, 42, 0.5)',
            borderBottom: '1px solid #1e293b',
            overflowX: 'auto',
            fontSize: '0.75rem'
          }}
        >
          <span style={{ color: '#64748b', fontFamily: 'var(--font-mono)' }}>POPULAR:</span>
          {["AI Agents", "Passkeys", "Prompt Injection", "Gmail 2FA", "Apple Silicon", "Deepfake"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid #334155',
                color: '#cbd5e1',
                padding: '0.2rem 0.55rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {/* Articles Section */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#00f0ff', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Articles & Research ({matchedArticles.length})
            </div>
            {matchedArticles.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '0.875rem', padding: '0.5rem 0' }}>No articles match your search term.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {matchedArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleItemClick(`/${article.category}/${article.slug}`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid #1e293b',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#00f0ff';
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#1e293b';
                      e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {article.categoryName}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>• {article.readingTime}</span>
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>
                        {article.title}
                      </div>
                    </div>
                    <ArrowRight size={16} color="#00f0ff" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guides Section */}
          {matchedGuides.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#fb7185', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Defensive Guides ({matchedGuides.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {matchedGuides.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => handleItemClick(`/guides/${guide.slug}`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid #1e293b',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#fb7185';
                      e.currentTarget.style.background = 'rgba(244, 63, 94, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#1e293b';
                      e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#fb7185', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '0.2rem' }}>
                        DEFENSIVE GUIDE • {guide.timeToComplete}
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>
                        {guide.title}
                      </div>
                    </div>
                    <ArrowRight size={16} color="#fb7185" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
