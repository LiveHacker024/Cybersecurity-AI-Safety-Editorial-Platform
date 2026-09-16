import React from 'react';
import { ExternalLink, Play, CheckCircle2, Video } from 'lucide-react';
import { Youtube } from '../common/SocialIcons';
import { siteConfig } from '../../config/site';

export default function YouTubeSection() {
  return (
    <section style={{ padding: '4rem 0', background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(239, 68, 68, 0.08) 0%, rgba(3, 7, 18, 0) 100%)' }}>
      <div className="container-custom">
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Channel Overview */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444'
                }}
              >
                <Youtube size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f87171', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
                  VIDEO INTELLIGENCE & TUTORIALS
                </span>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  HackWithKunal on YouTube
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Watch hands-on defensive security walkthroughs, ethical testing lab setups, and deep dives into AI safety risks hosted by <strong>{siteConfig.founder.name}</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Non-destructive defensive cybersecurity labs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>AI prompt injection & agent vulnerability breakdowns</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Hardware security keys & client-side encryption guides</span>
              </div>
            </div>

            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: '#ef4444',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.35)'
              }}
            >
              <Youtube size={18} />
              <span>Subscribe @HackWithKunal</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Right Column: Video Showcase Card */}
          <div
            style={{
              background: 'rgba(5, 8, 17, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#0f172a',
                aspectRatio: '16/9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)'
                }}
              >
                <Play size={24} style={{ marginLeft: '3px' }} />
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#ffffff'
                }}
              >
                Featured Video
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                HACKWITHKUNAL EDITORIAL DISPATCH
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: '0.25rem 0 0.5rem' }}>
                AI Agents, Prompt Injection & Defensive Hardening
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                Direct access to channel tutorials and live demonstrations. Follow along with practical defensive playbooks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
