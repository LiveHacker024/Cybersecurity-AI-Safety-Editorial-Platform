import React from 'react';
import { Shield, ArrowRight, BookOpen, AlertCircle, Cpu, Lock, Radio } from 'lucide-react';
import Hero3DScene from '../3d/Hero3DScene';
import { liveSecurityMetrics } from '../../data/threats';

export default function HeroSection({ onNavigate }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        background: '#050811',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)'
      }}
    >
      {/* 3D & Video Hero Canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}
      >
        <Hero3DScene />
      </div>

      {/* 2D Text & Editorial Content Layer */}
      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem'
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          {/* Eyebrow Badge */}
          <div
            className="cyber-badge"
            style={{
              marginBottom: '1.25rem',
              padding: '0.35rem 0.85rem',
              fontSize: '0.8rem',
              background: 'rgba(0, 240, 255, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.35)'
            }}
          >
            <Radio size={14} className="animate-pulse" color="#00f0ff" />
            <span>THE DIGITAL THREAT LANDSCAPE</span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}
          >
            Cybersecurity. <span className="gradient-text-cyan">AI Safety.</span> Digital Intelligence.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#cbd5e1',
              lineHeight: 1.65,
              marginBottom: '2.25rem',
              maxWidth: '680px'
            }}
          >
            Understand the threats shaping the connected world — and learn how to protect yourself, your business and your data with verified, defensive intelligence.
          </p>

          {/* Call to Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '3.5rem'
            }}
          >
            <button
              onClick={() => onNavigate('/cybersecurity')}
              className="btn-cyber-primary"
            >
              Explore Latest Threats <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onNavigate('/guides')}
              className="btn-cyber-secondary"
            >
              <BookOpen size={18} color="#00f0ff" /> Read Security Guides
            </button>
          </div>

          {/* Live Telemetry Metric Bar */}
          <div
            className="glass-panel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1.25rem',
              padding: '1.25rem 1.75rem',
              background: 'rgba(10, 15, 29, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.2)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                Global Threat Level
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f43f5e', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={16} /> {liveSecurityMetrics.activeThreatLevel}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                CVEs Monitored
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                {liveSecurityMetrics.globalCveMonitored}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                AI Agents Audited
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                {liveSecurityMetrics.aiAgentVulnsDocumented}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                Defensive Guides
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                {liveSecurityMetrics.defenseGuidesPublished}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
