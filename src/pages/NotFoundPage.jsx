import React, { useEffect } from 'react';
import { ShieldAlert, ArrowLeft, Search, Home } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';
import { siteConfig } from '../config/site';

export default function NotFoundPage({ onNavigate }) {
  useEffect(() => {
    updateMetaTags({
      title: `404 — Page Not Found | ${siteConfig.name}`,
      description: "The requested editorial investigation or page could not be located."
    });
  }, []);

  return (
    <div style={{ background: '#030712', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <div
        className="glass-panel"
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
          borderRadius: '16px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444',
            margin: '0 auto 1.5rem'
          }}
        >
          <ShieldAlert size={28} />
        </div>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
          HTTP 404 STATUS
        </span>
        <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', margin: '0.4rem 0 1rem' }}>
          Document Not Found
        </h1>

        <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2rem' }}>
          The requested URL does not correspond to an active published investigation or resource on CyberAI Watch.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('/')}
            className="btn-cyber-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
          >
            <Home size={15} /> Return Home
          </button>
          <button
            onClick={() => onNavigate('/search')}
            className="btn-cyber-secondary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
          >
            <Search size={15} /> Search Articles
          </button>
        </div>
      </div>
    </div>
  );
}
