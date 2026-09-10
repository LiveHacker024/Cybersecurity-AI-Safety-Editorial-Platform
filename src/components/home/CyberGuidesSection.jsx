import React from 'react';
import { BookOpen, CheckCircle, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { guidesData } from '../../data/guides';

export default function CyberGuidesSection({ onNavigate }) {
  return (
    <section style={{ padding: '4.5rem 0 3.5rem', background: '#050811' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="cyber-badge-emerald" style={{ marginBottom: '0.65rem' }}>
              <ShieldCheck size={14} /> DEFENSIVE PLAYBOOKS
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)', fontWeight: 800, color: '#ffffff' }}>
              Actionable Cybersecurity & Privacy Guides
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/guides')}
            className="btn-cyber-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            View All Guides <ArrowRight size={16} />
          </button>
        </div>

        {/* Guides Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {guidesData.map((guide) => (
            <div
              key={guide.id}
              className="glass-panel"
              onClick={() => onNavigate(`/guides/${guide.slug}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(56, 189, 248, 0.15)'
              }}
            >
              {/* Image thumbnail */}
              <div style={{ height: '170px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={guide.heroImage}
                  alt={guide.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem' }}>
                  <span className="cyber-badge-emerald">
                    {guide.difficulty} • {guide.timeToComplete}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.65rem', lineHeight: 1.4 }}>
                    {guide.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {guide.summary}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #1e293b' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>By {guide.author}</span>
                  <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    Read Guide <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
