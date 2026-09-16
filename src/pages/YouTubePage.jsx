import React, { useEffect } from 'react';
import { ExternalLink, Play, CheckCircle2, Video, ShieldCheck, ArrowRight } from 'lucide-react';
import { Youtube } from '../components/common/SocialIcons';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import { siteConfig } from '../config/site';

export default function YouTubePage({ onNavigate }) {
  useEffect(() => {
    updateMetaTags({
      title: `HackWithKunal YouTube Channel & Defensive Video Labs — ${siteConfig.name}`,
      description: "Official video tutorials, cybersecurity lab setups, and AI safety walkthroughs hosted by Kunal Rajput.",
      type: "website",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "YouTube Hub", url: "/youtube" }
      ])
    });

    recordPageView('/youtube', 'YouTube Hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const videoTopics = [
    {
      title: "AI Agent Attack Surfaces & Indirect Prompt Injection",
      category: "AI Safety",
      desc: "Demonstrating how untrusted web inputs hijack autonomous language model tools and how to build deterministic boundary guardrails.",
      linkSlug: "ai-agents-cybersecurity-target"
    },
    {
      title: "RAG Vector Store Poisoning & Semantic Hijacking",
      category: "AI Security",
      desc: "Deconstructing cosine similarity exploitation in vector databases and how to implement cryptographic chunk verification.",
      linkSlug: "llm-rag-poisoning-defenses"
    },
    {
      title: "Hardware Security Keys: FIDO2 / WebAuthn Configuration",
      category: "Tutorial",
      desc: "Step-by-step setup guide for configuring physical YubiKeys to defeat real-time reverse proxy phishing kits.",
      linkSlug: "hardware-security-keys-yubikey-guide"
    },
    {
      title: "Zero-Day Incident Triage for Enterprise Gateways",
      category: "Incident Playbook",
      desc: "Field-tested framework for deploying compensating controls, capturing volatile memory, and verifying CISA KEV status.",
      linkSlug: "zero-day-vulnerability-triage-guide"
    }
  ];

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <header
          className="glass-panel"
          style={{
            padding: '3rem 2.5rem',
            borderRadius: '16px',
            marginBottom: '3rem',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(239, 68, 68, 0.15) 0%, rgba(5, 8, 17, 0.9) 100%)',
            textAlign: 'center'
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
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 25px rgba(239, 68, 68, 0.3)'
            }}
          >
            <Youtube size={30} />
          </div>

          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f87171', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            OFFICIAL VIDEO MEDIA HUB
          </span>
          <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#ffffff', margin: '0.4rem 0 1rem' }}>
            HackWithKunal on YouTube
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 2rem' }}>
            Hands-on defensive security engineering, ethical lab demonstrations, and AI risk dissections hosted by <strong>{siteConfig.founder.name}</strong>.
          </p>

          <a
            href={siteConfig.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: '#ef4444',
              color: '#ffffff',
              padding: '0.85rem 2rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 25px rgba(239, 68, 68, 0.4)'
            }}
          >
            <Youtube size={20} />
            <span>Visit @HackWithKunal on YouTube</span>
            <ExternalLink size={14} />
          </a>
        </header>

        {/* Video Tutorials Grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                FEATURED WORKSHOPS & BRIEFINGS
              </span>
              <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Video Tutorials & Companion Articles
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {videoTopics.map((vid, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#00f0ff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {vid.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                      <Video size={12} />
                      YOUTUBE
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.65rem' }}>
                    {vid.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    {vid.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => onNavigate(`/tutorials/${vid.linkSlug}`)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#00f0ff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: 0
                    }}
                  >
                    <span>Read Companion Article</span>
                    <ArrowRight size={13} />
                  </button>

                  <a
                    href={siteConfig.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ef4444', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <span>Watch</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
