import React from 'react';
import { ShieldCheck, BookOpen, Lock, Scale, ArrowRight } from 'lucide-react';
import { YoutubeIcon } from '../common/SocialIcons';
import { founderData } from '../../data/founder';

export default function FounderTrustSection({ onNavigate }) {
  const trustCards = [
    {
      title: "DEFENSIVE SECURITY",
      desc: "Security content is created for education, awareness, prevention, and responsible defensive use.",
      icon: <ShieldCheck size={16} color="#00f0ff" />
    },
    {
      title: "SOURCE-BASED REPORTING",
      desc: "Important claims and security developments should be supported by reliable primary sources or reputable reporting.",
      icon: <BookOpen size={16} color="#00f0ff" />
    },
    {
      title: "RESPONSIBLE DISCLOSURE",
      desc: "We do not publish instructions intended to enable unauthorized access, credential theft, malware deployment, or cyber abuse.",
      icon: <Lock size={16} color="#00f0ff" />
    },
    {
      title: "EDITORIAL TRANSPARENCY",
      desc: "When information is uncertain, developing, or based on third-party reporting, it should be clearly identified as such.",
      icon: <Scale size={16} color="#00f0ff" />
    }
  ];

  return (
    <section className="founder-editorial-section" aria-label="Editorial Integrity and Leadership">
      <div className="container-custom">
        <div className="founder-editorial-panel">
          <div className="founder-editorial-grid">
            
            {/* Left Column (Desktop) */}
            <div className="founder-left-col">
              {/* 1. Editorial Label */}
              <div className="order-1-label">
                <div className="cyber-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} color="#00f0ff" /> EDITORIAL INTEGRITY & CREDIBILITY
                </div>
              </div>

              {/* 2. Headline */}
              <div className="order-2-headline">
                <h2
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.2
                  }}
                >
                  Directed by <span className="gradient-text-cyan">{founderData.name}</span>
                </h2>
              </div>

              {/* 3. Role */}
              <div className="order-3-role">
                <p
                  style={{
                    color: '#00f0ff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.925rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  Founder & Editor — HackWithKunal
                </p>
              </div>

              {/* 6. Description */}
              <div className="order-6-desc">
                <p style={{ color: '#cbd5e1', fontSize: '0.985rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                  HackWithKunal is an independent cybersecurity and AI safety publication focused on explaining digital threats, privacy risks, emerging technologies, and practical security practices in clear and accessible language.
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Our editorial approach prioritizes accuracy, responsible security education, transparent sourcing, and practical guidance for individuals and businesses.
                </p>
              </div>

              {/* 8. CTA Buttons */}
              <div className="order-8-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginTop: '1.75rem' }}>
                <button
                  onClick={() => onNavigate('/editorial-standards')}
                  className="btn-cyber-primary"
                  style={{ padding: '0.7rem 1.35rem', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Read Editorial Standards <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => onNavigate('/about')}
                  className="btn-cyber-secondary"
                  style={{ padding: '0.7rem 1.35rem', fontSize: '0.875rem' }}
                >
                  About the Publication
                </button>
                <a
                  href={founderData.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '0.7rem 1.35rem', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <YoutubeIcon size={16} color="#ef4444" /> YouTube Channel
                </a>
              </div>
            </div>

            {/* Right Column (Desktop) */}
            <div className="founder-right-col">
              {/* 4. 16:9 Founder Photo Card */}
              <div className="order-4-image">
                <div className="founder-image-card">
                  <img
                    src="/assets/founder/founder-photo.png"
                    alt="Kunal Rajput, founder and editor of HackWithKunal"
                    style={{
                      aspectRatio: '16 / 9',
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      objectPosition: 'center 22%'
                    }}
                  />
                </div>
              </div>

              {/* 5. Photo Caption */}
              <div className="order-5-caption founder-caption">
                <div className="founder-caption-name">Kunal Rajput</div>
                <div className="founder-caption-role">Founder & Editor — HackWithKunal</div>
              </div>

              {/* 7. Trust Cards */}
              <div className="order-7-trust">
                <div className="trust-cards-grid">
                  {trustCards.map((card, idx) => (
                    <div key={idx} className="trust-card">
                      <div className="trust-card-title">
                        {card.icon}
                        <span>{card.title}</span>
                      </div>
                      <p className="trust-card-desc">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
