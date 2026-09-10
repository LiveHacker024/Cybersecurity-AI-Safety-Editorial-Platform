import React, { useState, useEffect } from 'react';
import { Clock, Calendar, ShieldCheck, Share2, Bookmark, Check, ChevronRight, BookOpen, HelpCircle, FileText, ArrowRight, UserCheck, Lock } from 'lucide-react';
import { getArticleBySlug, articlesData } from '../data/articles';
import { founderData } from '../data/founder';
import { updateMetaTags, generateArticleSchema, generateFaqSchema, generateBreadcrumbSchema } from '../utils/seo';
import AdSlot from '../components/ads/AdSlot';

export default function ArticlePage({ slug, onNavigate }) {
  const article = getArticleBySlug(slug) || articlesData[0];

  const [fontSize, setFontSize] = useState(18);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');

  // SEO updates & scroll progress
  useEffect(() => {
    window.scrollTo(0, 0);

    updateMetaTags({
      title: `${article.title} — HackWithKunal`,
      description: article.subtitle || article.excerpt,
      keywords: article.tags?.join(', ') || 'cybersecurity, AI safety',
      image: article.heroImage,
      url: window.location.href,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      author: article.author?.name || 'Kunal Rajput',
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          generateArticleSchema(article),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://hackwithkunal.com" },
            { name: article.categoryName, url: `https://hackwithkunal.com/${article.category}` },
            { name: article.title, url: window.location.href }
          ]),
          ...(article.faqs ? [generateFaqSchema(article.faqs)] : [])
        ]
      }
    });

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = totalScroll / (windowHeight || 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, article]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedArticles = articlesData
    .filter(a => a.id !== article.id && (a.category === article.category || a.trending))
    .slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', background: '#050811', paddingBottom: '5rem' }}>
      {/* Top Sticky Reading Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(0, 240, 255, 0.2)',
          zIndex: 99
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #00f0ff 0%, #38bdf8 100%)',
            boxShadow: '0 0 10px #00f0ff',
            transition: 'width 0.1s ease-out'
          }}
        />
      </div>

      <div className="container-custom" style={{ paddingTop: '2.5rem' }}>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.825rem',
            color: '#64748b',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <span
            onClick={() => onNavigate('/')}
            style={{ cursor: 'pointer', color: '#94a3b8' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            HOME
          </span>
          <ChevronRight size={14} />
          <span
            onClick={() => onNavigate(`/${article.category}`)}
            style={{ cursor: 'pointer', color: '#38bdf8' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#38bdf8'}
          >
            {article.categoryName?.toUpperCase()}
          </span>
          <ChevronRight size={14} />
          <span style={{ color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <header style={{ maxWidth: '960px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="cyber-badge" style={{ fontSize: '0.78rem' }}>
              {article.categoryName}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} /> {article.readingTime}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={14} /> {article.publishedAt}
            </span>
          </div>

          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(2.1rem, 4.5vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em'
            }}
          >
            {article.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}
          >
            {article.subtitle}
          </p>

          {/* Author Bar & Reader Toolbar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
              padding: '1.25rem',
              background: 'rgba(15, 23, 42, 0.75)',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.15)'
            }}
          >
            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <img
                src={article.author?.avatar || founderData.images.avatar}
                alt={article.author?.name || founderData.name}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #00f0ff'
                }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {article.author?.name || founderData.name}
                  <ShieldCheck size={16} color="#00f0ff" />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  {article.author?.role || founderData.role}
                </div>
              </div>
            </div>

            {/* Actions: Font Size & Share */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#0a0f1d', borderRadius: '6px', border: '1px solid #1e293b' }}>
                <button
                  onClick={() => setFontSize(Math.max(15, fontSize - 1))}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', padding: '0.35rem 0.65rem', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
                  title="Decrease Font Size"
                >
                  A-
                </button>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', padding: '0.35rem 0.65rem', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
                  title="Increase Font Size"
                >
                  A+
                </button>
              </div>

              <button
                onClick={handleCopyLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid #334155',
                  color: copiedLink ? '#34d399' : '#cbd5e1',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
                <span>{copiedLink ? 'Copied Link' : 'Share'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image / Media */}
        <div
          style={{
            maxWidth: '960px',
            marginBottom: '3rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)'
          }}
        >
          <img
            src={article.heroImage}
            alt={article.title}
            style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* 2-Column Editorial Grid (Main Content + Sidebar) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 780px) 320px',
            gap: '3.5rem',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
          className="article-layout-grid"
        >
          {/* Main Article Column */}
          <main style={{ minWidth: 0 }}>
            {/* Key Takeaways Box */}
            {article.keyTakeaways && (
              <div
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  marginBottom: '2.5rem',
                  borderLeft: '4px solid #00f0ff',
                  background: 'rgba(10, 15, 29, 0.85)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#00f0ff', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <ShieldCheck size={16} /> Key Security Takeaways
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {article.keyTakeaways.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                      <span style={{ color: '#00f0ff', fontWeight: 700 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Table of Contents */}
            {article.tableOfContents && (
              <div
                style={{
                  padding: '1.5rem',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '12px',
                  border: '1px solid #1e293b',
                  marginBottom: '2.5rem'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Table of Contents
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {article.tableOfContents.map((toc) => (
                    <a
                      key={toc.id}
                      href={`#${toc.id}`}
                      style={{
                        color: '#38bdf8',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#38bdf8'}
                    >
                      <ChevronRight size={14} /> {toc.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* In-Article AdSense Banner */}
            <AdSlot type="leaderboard" />

            {/* Markdown Body Content */}
            <div
              className="prose-cyber"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/## (.*?)\n/g, '<h2 id="$1">$1</h2>')
                  .replace(/### (.*?)\n/g, '<h3>$1</h3>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/```txt([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                  .replace(/```json([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                  .replace(/```bash([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                  .replace(/```mermaid([\s\S]*?)```/g, '<div style="padding:1rem;background:#090e1a;border:1px solid #38bdf833;border-radius:8px;margin:1.5rem 0;color:#00f0ff;font-family:monospace;font-size:0.85rem;"><strong style="display:block;margin-bottom:0.5rem;color:#f8fafc">Interactive Attack Flow Diagram:</strong>$1</div>')
              }}
            />

            {/* Trust Verification Box */}
            <div
              className="glass-panel"
              style={{
                marginTop: '3.5rem',
                marginBottom: '2.5rem',
                padding: '2rem',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 15, 29, 0.95) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <ShieldCheck size={22} color="#00f0ff" />
                <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                  Why You Can Trust This Article
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.25rem',
                  fontSize: '0.85rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#00f0ff', marginBottom: '0.2rem' }}>Peer-Reviewed Research</div>
                  <div style={{ color: '#94a3b8' }}>Tested in HackWithKunal & ASD Cybersecurity lab environments. Cross-checked with NIST & MITRE standards.</div>
                </div>

                <div>
                  <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.2rem' }}>Verified Author</div>
                  <div style={{ color: '#94a3b8' }}>Written by Kunal Rajput (Junior Penetration Tester, CEH & VAPT certified).</div>
                </div>

                <div>
                  <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '0.2rem' }}>Zero Commercial Bias</div>
                  <div style={{ color: '#94a3b8' }}>No paid vendor placements. Defensive tools recommended solely on cryptographic merits.</div>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            {article.faqs && article.faqs.length > 0 && (
              <div style={{ marginTop: '2.5rem', marginBottom: '3rem' }}>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={20} color="#00f0ff" /> Frequently Asked Security Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {article.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1.25rem 1.5rem',
                        background: 'rgba(15, 23, 42, 0.7)',
                        borderRadius: '10px',
                        border: '1px solid #1e293b'
                      }}
                    >
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                        {faq.question}
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sources & Citations */}
            {article.sources && (
              <div
                style={{
                  padding: '1.25rem',
                  background: 'rgba(10, 15, 29, 0.6)',
                  borderRadius: '8px',
                  border: '1px solid #1e293b',
                  fontSize: '0.8rem',
                  color: '#64748b'
                }}
              >
                <div style={{ fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Verified Intelligence Sources & Academic Citations:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {article.sources.map((src, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FileText size={12} color="#00f0ff" />
                      <span>{src}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>

          {/* Desktop Right Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Author Quick Box */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img
                  src={article.author?.avatar || founderData.images.avatar}
                  alt={article.author?.name || founderData.name}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00f0ff' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff' }}>
                    {article.author?.name || founderData.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                    {article.author?.role || founderData.role}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: '1rem' }}>
                {founderData.shortBio}
              </p>
              <button
                onClick={() => onNavigate('/about')}
                className="btn-cyber-secondary"
                style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}
              >
                View Full Bio & Certifications
              </button>
            </div>

            {/* Sidebar AdSlot */}
            <AdSlot type="rectangle" />

            {/* Trending Articles Widget */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#00f0ff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Trending Threat Reports
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onNavigate(`/${rel.category}/${rel.slug}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                      {rel.categoryName} • {rel.readingTime}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.4 }} className="hover-cyan">
                      {rel.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
