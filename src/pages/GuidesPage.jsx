import React, { useEffect, useState } from 'react';
import { BookOpen, ShieldCheck, Clock, CheckCircle2, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { guidesData, getGuideBySlug } from '../data/guides';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import AdSlot from '../components/ads/AdSlot';

import { siteConfig } from '../config/site';

export default function GuidesPage({ selectedGuideSlug, onNavigate }) {
  const selectedGuide = selectedGuideSlug ? getGuideBySlug(selectedGuideSlug) : null;
  const [completedSteps, setCompletedSteps] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedGuide) {
      updateMetaTags({
        title: `${selectedGuide.title} — ${siteConfig.name} Defensive Guide`,
        description: selectedGuide.summary,
        keywords: `cybersecurity guide, ${selectedGuide.title}, Kunal Rajput, HackWithKunal, CyberAI Watch`,
        image: selectedGuide.heroImage,
        schema: generateBreadcrumbSchema([
          { name: "Home", url: `${siteConfig.domain}` },
          { name: "Guides", url: `${siteConfig.domain}/tutorials` },
          { name: selectedGuide.title, url: window.location.href }
        ])
      });
    } else {
      updateMetaTags({
        title: `Defensive Cybersecurity & Privacy Guides — ${siteConfig.name}`,
        description: "Field-tested, non-malicious hardening tutorials to secure your accounts, audit device permissions, and safeguard personal privacy.",
        keywords: "cybersecurity guides, hardening, Gmail 2FA, Android security, WhatsApp lockdown, Kunal Rajput, CyberAI Watch",
        schema: generateBreadcrumbSchema([
          { name: "Home", url: `${siteConfig.domain}` },
          { name: "Guides", url: `${siteConfig.domain}/tutorials` }
        ])
      });
    }
  }, [selectedGuide, selectedGuideSlug]);

  const toggleStep = (stepNumber) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  if (selectedGuide) {
    return (
      <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0 5rem' }}>
        <div className="container-custom" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#64748b', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
            <span onClick={() => onNavigate('/')} style={{ cursor: 'pointer', color: '#94a3b8' }}>HOME</span>
            <ChevronRight size={14} />
            <span onClick={() => onNavigate('/guides')} style={{ cursor: 'pointer', color: '#38bdf8' }}>GUIDES</span>
            <ChevronRight size={14} />
            <span style={{ color: '#cbd5e1' }}>{selectedGuide.title}</span>
          </div>

          <div className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)', marginBottom: '2.5rem', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="cyber-badge-emerald">{selectedGuide.difficulty}</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={14} /> {selectedGuide.timeToComplete}
              </span>
            </div>

            <h1 className="font-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.25 }}>
              {selectedGuide.title}
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {selectedGuide.summary}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid #1e293b', fontSize: '0.85rem', color: '#cbd5e1', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span>Curated by <strong>{selectedGuide.author}</strong></span>
              <span style={{ color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>100% DEFENSIVE & SAFE</span>
            </div>
          </div>

          <AdSlot type="leaderboard" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3rem' }}>
            {selectedGuide.steps.map((step) => {
              const isDone = !!completedSteps[step.stepNumber];
              return (
                <div
                  key={step.stepNumber}
                  className="glass-panel"
                  style={{
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    border: isDone ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(56, 189, 248, 0.2)',
                    background: isDone ? 'rgba(16, 185, 129, 0.05)' : 'rgba(15, 23, 42, 0.75)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: isDone ? '#10b981' : 'rgba(0, 240, 255, 0.15)',
                          color: isDone ? '#ffffff' : '#00f0ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.9rem',
                          border: isDone ? 'none' : '1px solid #00f0ff',
                          flexShrink: 0
                        }}
                      >
                        {step.stepNumber}
                      </div>
                      <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, color: isDone ? '#34d399' : '#ffffff' }}>
                        {step.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleStep(step.stepNumber)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        background: isDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 41, 59, 0.8)',
                        border: isDone ? '1px solid #10b981' : '1px solid #334155',
                        color: isDone ? '#34d399' : '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        flexShrink: 0
                      }}
                    >
                      {isDone ? <Check size={14} /> : null}
                      <span>{isDone ? 'COMPLETED' : 'MARK DONE'}</span>
                    </button>
                  </div>

                  <p style={{ color: '#cbd5e1', fontSize: '0.975rem', lineHeight: 1.7, paddingLeft: 'clamp(0rem, 2vw, 2.75rem)' }}>
                    {step.details}
                  </p>
                </div>
              );
            })}
          </div>

          {selectedGuide.checklist && (
            <div className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', borderLeft: '4px solid #34d399', background: 'rgba(10, 15, 29, 0.9)' }}>
              <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} color="#34d399" /> Verification Security Checklist
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {selectedGuide.checklist.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
                    <CheckCircle2 size={16} color="#34d399" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0 5rem' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <div className="cyber-badge-emerald" style={{ marginBottom: '1rem' }}>
            <BookOpen size={14} /> EVERGREEN HARDENING MANUALS
          </div>
          <h1 className="font-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Defensive <span className="gradient-text-emerald">Security Guides</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Field-tested, non-malicious tutorials designed to secure your accounts, audit device permissions, configure hardware keys, and safeguard personal privacy.
          </p>
        </div>

        <AdSlot type="leaderboard" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2rem'
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
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(56, 189, 248, 0.2)'
              }}
            >
              <div style={{ aspectRatio: '16 / 9', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={guide.heroImage}
                  alt={guide.title}
                  style={{ width: '100%', height: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span className="cyber-badge-emerald">{guide.difficulty} • {guide.timeToComplete}</span>
                </div>
              </div>

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h2 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                    {guide.title}
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {guide.summary}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid #1e293b' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>By {guide.author}</span>
                  <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    Read Guide <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
