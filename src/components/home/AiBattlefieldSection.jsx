import React from 'react';
import { Bot, UserCheck, ShieldAlert, Cpu, Scale, ArrowRight, Sparkles, Layers } from 'lucide-react';

export default function AiBattlefieldSection({ onNavigate }) {
  const aiCards = [
    {
      id: "ai-agents",
      title: "AI Agents",
      subtitle: "Autonomous Tool Execution & SSRF",
      icon: Bot,
      color: "#00f0ff",
      description: "Agents empowered with API execution privileges create lateral exfiltration pathways when exposed to indirect prompt injections.",
      targetSlug: "/ai-safety/ai-agent-security-threats-2026"
    },
    {
      id: "deepfakes",
      title: "Deepfakes",
      subtitle: "Zero-Shot Acoustic & Video Spoofing",
      icon: UserCheck,
      color: "#fb7185",
      description: "Generative voice cloning bypasses telephonic verification and KYC identity checkpoints in high-urgency financial fraud.",
      targetSlug: "/ai-safety/deepfake-voice-cloning-defense"
    },
    {
      id: "ai-phishing",
      title: "AI Phishing",
      subtitle: "Hyper-Targeted Synthesized Lures",
      icon: ShieldAlert,
      color: "#38bdf8",
      description: "Automated LLM reconnaissance writes grammatically flawless, highly contextual Spear-Phishing campaigns at mass scale.",
      targetSlug: "/cybersecurity/passkey-migration-phishing-resistance"
    },
    {
      id: "ai-security",
      title: "AI Security",
      subtitle: "Model Weight & Pipeline Integrity",
      icon: Cpu,
      color: "#34d399",
      description: "Protecting training datasets from data poisoning, preventing model inversion, and securing vector database retrieval pipelines.",
      targetSlug: "/ai-safety/ai-governance-red-teaming"
    },
    {
      id: "ai-governance",
      title: "AI Governance",
      subtitle: "Red-Teaming & Guardrail Audits",
      icon: Scale,
      color: "#c084fc",
      description: "Establishing deterministic policy boundaries, constitutional alignment, and regulatory compliance frameworks for frontier models.",
      targetSlug: "/ai-safety/ai-governance-red-teaming"
    }
  ];

  return (
    <section
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(180deg, #050811 0%, #0a0f1d 50%, #050811 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow accents */}
      <div className="glow-ambient-cyan" style={{ top: '10%', left: '-10%' }} />
      <div className="glow-ambient-blue" style={{ bottom: '10%', right: '-10%' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
          <div className="cyber-badge-purple" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={13} /> FRONTIER AI THREAT ANALYSIS
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              color: '#ffffff'
            }}
          >
            THE NEXT <span className="gradient-text-cyan">CYBER BATTLEFIELD</span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              lineHeight: 1.7
            }}
          >
            AI is becoming part of both the attack surface and the defense system. Learn how AI agents, deepfakes, automated attacks and AI governance are changing cybersecurity.
          </p>
        </div>

        {/* 3D/2D Visual Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem'
          }}
        >
          {aiCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="glass-panel"
                onClick={() => onNavigate(card.targetSlug)}
                style={{
                  padding: 'clamp(1.25rem, 3vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  border: '1px solid rgba(56, 189, 248, 0.18)',
                  background: 'rgba(15, 23, 42, 0.75)'
                }}
              >
                <div>
                  {/* Card Icon Header */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: `rgba(0, 240, 255, 0.1)`,
                      border: `1px solid ${card.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                      boxShadow: `0 0 15px rgba(0, 240, 255, 0.2)`
                    }}
                  >
                    <Icon size={26} color={card.color} />
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {card.title}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: card.color,
                      marginBottom: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {card.subtitle}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      color: '#94a3b8',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Card Link Action */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid #1e293b',
                    color: card.color,
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  <span>Explore Intelligence</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
