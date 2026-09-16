import React, { useEffect } from 'react';
import { ShieldCheck, ExternalLink, BookOpen, Terminal, CheckCircle2, GraduationCap, Cpu, Award } from 'lucide-react';
import { Youtube, Linkedin } from '../components/common/SocialIcons';
import { founderData } from '../data/founder';
import { getAllArticles } from '../utils/storage';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import ClaimBadge from '../components/common/ClaimBadge';
import { siteConfig } from '../config/site';

export default function AuthorPage({ onNavigate }) {
  const authorArticles = getAllArticles().filter(a => a.status === 'PUBLISHED');

  useEffect(() => {
    updateMetaTags({
      title: `${founderData.name} — Founder & Editor-in-Chief | ${siteConfig.name}`,
      description: founderData.bio,
      type: "profile",
      image: founderData.images.avatar,
      schema: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": founderData.name,
        "jobTitle": founderData.role,
        "worksFor": {
          "@type": "Organization",
          "name": siteConfig.name,
          "url": siteConfig.domain
        },
        "sameAs": [
          founderData.socials.youtube,
          founderData.socials.linkedin
        ]
      }
    });

    recordPageView('/author/kunal-rajput', `${founderData.name} Profile`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '960px' }}>
        {/* Author Profile Header Card */}
        <header
          className="glass-panel"
          style={{
            padding: '3rem 2.5rem',
            borderRadius: '16px',
            marginBottom: '3rem',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 240, 255, 0.12) 0%, rgba(5, 8, 17, 0.9) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <img
              src={founderData.images.avatar}
              alt={founderData.name}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #00f0ff',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)'
              }}
            />

            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <h1 className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  {founderData.name}
                </h1>
                <span style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  VERIFIED EDITOR
                </span>
              </div>

              <div style={{ fontSize: '0.95rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                {founderData.role} • {founderData.personalBrand}
              </div>

              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                {founderData.bio}
              </p>
            </div>
          </div>

          {/* Social Channels Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <a
              href={founderData.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Youtube size={16} />
              <span>YouTube Channel ({founderData.socials.youtubeHandle})</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={founderData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(14, 165, 233, 0.15)',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                color: '#38bdf8',
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Linkedin size={16} />
              <span>LinkedIn Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </header>

        {/* Technical Focus & Certifications */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '3.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#00f0ff' }}>
              <Terminal size={18} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Technical Areas of Focus
              </h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {founderData.technicalSkills.map((skill, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={14} color="#10b981" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#c084fc' }}>
              <GraduationCap size={18} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Academic & Professional Training
              </h3>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#f8fafc', fontSize: '0.9rem', display: 'block' }}>{founderData.education.degree}</strong>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{founderData.education.institution} ({founderData.education.period})</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {founderData.certifications.map((cert, idx) => (
                <li key={idx} style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
                  <strong style={{ color: '#ffffff' }}>{cert.title}</strong> — {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Published Articles Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                EDITORIAL CATALOG
              </span>
              <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Articles & Investigations by {founderData.name}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {authorArticles.map((article) => (
              <div
                key={article.slug}
                onClick={() => onNavigate(`/${article.category}/${article.slug}`)}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#00f0ff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {article.categoryName}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>•</span>
                    <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>{article.type}</span>
                  </div>
                  <ClaimBadge status={article.claimStatus || "CONFIRMED FACT"} size="small" />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, margin: 0 }}>
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                  {article.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                  <span>{article.publishedAt}</span>
                  <span style={{ color: '#00f0ff', fontWeight: 600 }}>{article.readingTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
