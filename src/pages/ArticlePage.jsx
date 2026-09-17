import React, { useState, useEffect } from 'react';
import {
  Clock, Calendar, User, Share2, Bookmark, CheckCircle2,
  AlertTriangle, Shield, ArrowLeft, ChevronRight, Lock,
  Copy, Check, ExternalLink, ListOrdered, HelpCircle
} from 'lucide-react';
import { Linkedin, Youtube } from '../components/common/SocialIcons';
import { getAllArticles } from '../utils/storage';
import { updateMetaTags, generateArticleSchema, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import ClaimBadge from '../components/common/ClaimBadge';
import SourceList from '../components/common/SourceList';
import AdSlot from '../components/ads/AdSlot';
import NewsletterBox from '../components/home/NewsletterBox';
import { siteConfig } from '../config/site';

export default function ArticlePage({ slug, onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');

  const allArticles = getAllArticles();
  const article = allArticles.find(a => a.slug === slug) || allArticles[0];

  useEffect(() => {
    if (!article) return;
    
    const canonicalUrl = `${siteConfig.domain}/${article.category}/${article.slug}`;
    updateMetaTags({
      title: `${article.title} — ${siteConfig.name}`,
      description: article.subtitle || article.excerpt,
      keywords: article.keywords || `${article.title}, AI safety, cybersecurity, ${siteConfig.name}`,
      image: article.heroImage,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      author: article.author?.name || siteConfig.founder.name,
      schema: generateArticleSchema(article)
    });

    recordPageView(`/${article.category}/${article.slug}`, article.title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article, slug]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=500');
  };

  if (!article) {
    return (
      <div className="container-custom" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ color: '#ffffff' }}>Article Not Found</h2>
        <button onClick={() => onNavigate('/')} className="btn-cyber-primary" style={{ marginTop: '1rem' }}>
          Return to Homepage
        </button>
      </div>
    );
  }

  // Related articles lookup
  const relatedList = allArticles
    .filter(a => a.slug !== article.slug && (a.category === article.category || (article.relatedArticles && article.relatedArticles.includes(a.slug))))
    .slice(0, 3);

  return (
    <article style={{ background: '#030712', minHeight: '100vh', padding: '2rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '1080px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('/')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>
            Home
          </button>
          <ChevronRight size={14} />
          <button onClick={() => onNavigate(`/${article.category}`)} style={{ background: 'transparent', border: 'none', color: '#00f0ff', cursor: 'pointer', padding: 0, textTransform: 'capitalize' }}>
            {article.categoryName || article.category}
          </button>
          <ChevronRight size={14} />
          <span style={{ color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
            {article.title}
          </span>
        </div>

        {/* Header Section */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span
              style={{
                padding: '0.2rem 0.65rem',
                borderRadius: '6px',
                background: 'rgba(0, 240, 255, 0.15)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                color: '#00f0ff',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}
            >
              {article.type || "ANALYSIS"}
            </span>

            <ClaimBadge status={article.claimStatus || "ANALYSIS"} />

            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              STATUS: {article.status || "PUBLISHED"}
            </span>
          </div>

          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '1.25rem'
            }}
          >
            {article.title}
          </h1>

          {article.subtitle && (
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              {article.subtitle}
            </p>
          )}

          {/* Author & Meta Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <img
                src={article.author?.avatar || "/assets/founder/founder-photo.png"}
                alt={article.author?.name}
                style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #00f0ff', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
                  {article.author?.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                  {article.author?.role}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} color="#00f0ff" />
                {article.publishedAt}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} color="#00f0ff" />
                {article.readingTime}
              </span>

              {/* Share buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
                <button
                  onClick={handleShare}
                  className="btn-cyber-secondary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                  title="Copy Article Link"
                >
                  {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={handleLinkedInShare}
                  style={{
                    background: 'rgba(14, 165, 233, 0.15)',
                    border: '1px solid rgba(14, 165, 233, 0.35)',
                    color: '#38bdf8',
                    padding: '0.4rem 0.65rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                  title="Share on LinkedIn"
                >
                  <Linkedin size={13} />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Top Ad Slot */}
        <AdSlot type="top-article" />

        {/* Two-Column Editorial Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '3rem', alignItems: 'start' }} className="article-grid">
          {/* Main Article Content */}
          <div style={{ minWidth: 0 }}>
            {/* Hero Image Visual */}
            {article.heroImage && (
              <div
                style={{
                  marginBottom: '2rem',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  background: '#0b0f19',
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7)'
                }}
              >
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt || article.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '480px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  loading="eager"
                />
              </div>
            )}

            {/* Key Takeaways Box */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div
                style={{
                  background: 'rgba(0, 240, 255, 0.05)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '2.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <Shield size={18} color="#00f0ff" />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#00f0ff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Executive Summary & Key Takeaways
                  </h3>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsible Security Disclaimer */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                borderLeft: '3px solid #10b981',
                padding: '1rem 1.25rem',
                borderRadius: '0 8px 8px 0',
                marginBottom: '2.5rem',
                fontSize: '0.825rem',
                color: '#94a3b8',
                lineHeight: 1.5
              }}
            >
              <strong style={{ color: '#10b981' }}>Responsible Security Notice:</strong> All technical descriptions, proof-of-concept analyses, and threat models on CyberAI Watch are published strictly for defensive engineering, authorized security testing, and vulnerability mitigation.
            </div>

            {/* Markdown Body Content */}
            <div
              className="article-body"
              style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#cbd5e1' }}
              onClick={(e) => {
                const link = e.target.closest('a');
                if (link) {
                  const href = link.getAttribute('href');
                  if (href && href.startsWith('/') && !href.startsWith('//')) {
                    e.preventDefault();
                    onNavigate(href);
                  }
                }
              }}
            >
              {article.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: (() => {
                      let html = article.content;
                      // Replace horizontal rules
                      html = html.replace(/^---$/gim, '<hr style="border: 0; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 2.5rem 0;" />');
                      // Replace h2 headings with IDs derived from text/TOC
                      html = html.replace(/^## (.*$)/gim, (match, headingText) => {
                        const cleanText = headingText.trim();
                        // Find matching TOC item or generate slug
                        const tocMatch = article.tableOfContents?.find(t => t.title === cleanText || cleanText.includes(t.title));
                        const headingId = tocMatch ? tocMatch.id : cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        return `<h2 id="${headingId}" style="font-size: 1.65rem; color: #ffffff; margin: 2.5rem 0 1.25rem; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.5rem; scroll-margin-top: 100px;">${cleanText}</h2>`;
                      });
                      html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 1.35rem; color: #ffffff; margin: 2rem 0 1rem; font-weight: 800; scroll-margin-top: 100px;">$1</h3>');
                      html = html.replace(/^# (.*$)/gim, '<h1 style="font-size: 2rem; color: #ffffff; margin: 2.5rem 0 1rem; font-weight: 900;">$1</h1>');
                      // Markdown links [text](url)
                      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #00f0ff; text-decoration: underline; text-underline-offset: 3px; font-weight: 600;">$1</a>');
                      // Markdown bold and italics
                      html = html.replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #ffffff; font-weight: 700;">$1</strong>');
                      html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
                      // Markdown blockquotes
                      html = html.replace(/^> (.*$)/gim, '<blockquote style="border-left: 3px solid #00f0ff; padding-left: 1.25rem; margin: 1.75rem 0; color: #e2e8f0; font-style: italic; background: rgba(0, 240, 255, 0.04); padding: 1rem 1.25rem; border-radius: 0 8px 8px 0;">$1</blockquote>');
                      // Markdown unordered lists
                      html = html.replace(/^\s*-\s+(.*$)/gim, '<li style="margin-bottom: 0.5rem; margin-left: 1.5rem; list-style-type: disc; color: #cbd5e1;">$1</li>');
                      html = html.replace(/```([\s\S]*?)```/gim, '<pre style="background: #0b0f19; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 1.25rem; overflow-x: auto; font-family: var(--font-mono); font-size: 0.85rem; color: #38bdf8; margin: 1.75rem 0;"><code>$1</code></pre>');
                      html = html.replace(/\n\n/gim, '<p style="margin-bottom: 1.5rem;"></p>');
                      return html;
                    })()
                  }}
                />
              ) : (
                <p>{article.excerpt}</p>
              )}
            </div>

            {/* In-Content Ad Placement */}
            <AdSlot type="in-content" />

            {/* Frequently Asked Questions (FAQ) Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div id="frequently-asked-questions" style={{ marginTop: '3.5rem', marginBottom: '2.5rem', scrollMarginTop: '100px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <HelpCircle size={22} color="#00f0ff" />
                  <h3 className="font-heading" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Frequently Asked Questions
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {article.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="glass-panel"
                      style={{
                        padding: '1.25rem 1.5rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(56, 189, 248, 0.15)',
                        background: 'rgba(15, 23, 42, 0.6)'
                      }}
                    >
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#00f0ff', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                        {faq.question}
                      </h4>
                      <p style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Sources & References */}
            {article.sources && <SourceList sources={article.sources} />}

            {/* Author Profile Footer Card */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: '12px',
                marginTop: '3.5rem',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={article.author?.avatar || "/assets/founder/founder-photo.png"}
                alt={article.author?.name}
                style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #00f0ff', objectFit: 'cover' }}
              />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {article.author?.name}
                  </h4>
                  <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                    VERIFIED
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                  {article.author?.role}
                </div>
                <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: '0 0 0.85rem', lineHeight: 1.5 }}>
                  {siteConfig.founder.bio}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => onNavigate('/author/kunal-rajput')}
                    style={{ background: 'transparent', border: 'none', color: '#00f0ff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    View Author Articles →
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Article Ad Slot */}
            <AdSlot type="bottom-article" />
          </div>

          {/* Sticky Sidebar (Table of Contents & Meta) */}
          <aside style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="article-sidebar">
            {/* Table of Contents */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
                  <ListOrdered size={16} color="#00f0ff" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Table of Contents
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {article.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        style={{
                          fontSize: '0.8rem',
                          color: '#94a3b8',
                          textDecoration: 'none',
                          lineHeight: 1.4,
                          display: 'block',
                          transition: 'color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags Cloud */}
            {article.tags && (
              <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  Threat Topics & Tags
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#cbd5e1',
                        fontSize: '0.72rem'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Ad Slot */}
            <AdSlot type="sidebar" />
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedList.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              CONTINUE READING
            </span>
            <h3 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 1.75rem' }}>
              Related Threat Analyses & Research
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {relatedList.map((rel) => (
                <div
                  key={rel.slug}
                  onClick={() => onNavigate(`/${rel.category}/${rel.slug}`)}
                  className="glass-panel"
                  style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                      <span style={{ fontSize: '0.68rem', color: '#00f0ff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {rel.categoryName}
                      </span>
                      <ClaimBadge status={rel.claimStatus || "ANALYSIS"} size="small" />
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                      {rel.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                      {rel.excerpt}
                    </p>
                  </div>
                  <div style={{ marginTop: '1rem', paddingTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{rel.publishedAt}</span>
                    <span style={{ color: '#00f0ff' }}>{rel.readingTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
          .article-sidebar { display: none !important; }
        }
      `}</style>
    </article>
  );
}
