import React, { useState, useEffect } from 'react';
import {
  Lock, Shield, FileText, Plus, Trash2, Edit3, CheckCircle2,
  AlertTriangle, Users, BarChart3, Settings, LogOut, Eye,
  Save, RefreshCw, Radio, ExternalLink, Globe
} from 'lucide-react';
import { getAllArticles, saveArticle, deleteArticle, getAllVulnerabilities, saveVulnerability, getSubscribers } from '../utils/storage';
import { getAnalyticsSummary } from '../utils/analytics';
import { categoriesData } from '../data/categories';
import { siteConfig } from '../config/site';

const ADMIN_SESSION_KEY = "cyberaiwatch_admin_session_v1";

export default function AdminPage({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'new-article' | 'vulnerabilities' | 'subscribers' | 'analytics'

  // Data states
  const [articles, setArticles] = useState([]);
  const [vulns, setVulns] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Article Form State
  const [editingArticle, setEditingArticle] = useState({
    title: '',
    slug: '',
    subtitle: '',
    category: 'cybersecurity',
    type: 'ANALYSIS',
    claimStatus: 'ANALYSIS',
    status: 'DRAFT',
    readingTime: '5 min read',
    excerpt: '',
    content: '',
    tags: 'AI, Security, Triage',
    keyTakeaways: 'Key point 1\nKey point 2'
  });

  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (session === 'valid') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setArticles(getAllArticles());
    setVulns(getAllVulnerabilities());
    setSubscribers(getSubscribers());
    setAnalytics(getAnalyticsSummary());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const envSecret = import.meta.env.VITE_ADMIN_SECRET;
    const validSecret = envSecret || "cyberaiwatch2026";
    if (passwordInput && passwordInput === validSecret) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'valid');
      setIsAuthenticated(true);
      setAuthError('');
      loadData();
    } else {
      setAuthError('Invalid credentials. Access denied.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!editingArticle.title || !editingArticle.slug) {
      alert('Title and Slug are required.');
      return;
    }

    const catObj = categoriesData.find(c => c.slug === editingArticle.category);

    const articleToSave = {
      ...editingArticle,
      id: editingArticle.slug,
      categoryName: catObj ? catObj.name : editingArticle.category,
      tags: typeof editingArticle.tags === 'string' ? editingArticle.tags.split(',').map(t => t.trim()) : editingArticle.tags,
      keyTakeaways: typeof editingArticle.keyTakeaways === 'string' ? editingArticle.keyTakeaways.split('\n').filter(Boolean) : editingArticle.keyTakeaways,
      publishedAt: editingArticle.publishedAt || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: {
        name: siteConfig.founder.name,
        role: siteConfig.founder.role,
        avatar: siteConfig.founder.avatar,
        verified: true
      }
    };

    saveArticle(articleToSave);
    loadData();
    setActiveTab('articles');
    alert('Article saved successfully!');
  };

  const handleDeleteArticle = (slug) => {
    if (window.confirm(`Are you sure you want to delete "${slug}"?`)) {
      deleteArticle(slug);
      loadData();
    }
  };

  const startEditArticle = (art) => {
    setEditingArticle({
      ...art,
      tags: Array.isArray(art.tags) ? art.tags.join(', ') : (art.tags || ''),
      keyTakeaways: Array.isArray(art.keyTakeaways) ? art.keyTakeaways.join('\n') : (art.keyTakeaways || '')
    });
    setActiveTab('new-article');
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div style={{ background: '#030712', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '440px',
            padding: '2.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid #00f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00f0ff',
              margin: '0 auto 1.25rem'
            }}
          >
            <Lock size={24} />
          </div>

          <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Editorial CMS Login
          </h2>
          <p style={{ fontSize: '0.825rem', color: '#94a3b8', marginBottom: '1.75rem' }}>
            Protected editorial console for {siteConfig.name}
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Access Secret..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                marginBottom: '1rem'
              }}
            />

            {authError && (
              <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem' }}>
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="btn-cyber-primary"
              style={{ width: '100%', padding: '0.8rem', justifyContent: 'center' }}
            >
              Authenticate & Enter CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Console
  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '2rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '1180px' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} color="#00f0ff" />
              <h1 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                CyberAI Watch — Editorial CMS
              </h1>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              AUTHENTICATED AS EDITOR-IN-CHIEF
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => onNavigate('/')}
              className="btn-cyber-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              <Globe size={14} /> View Site
            </button>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#f87171',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('articles')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              background: activeTab === 'articles' ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
              border: '1px solid ' + (activeTab === 'articles' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
              color: activeTab === 'articles' ? '#030712' : '#cbd5e1',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <FileText size={15} />
            <span>Articles ({articles.length})</span>
          </button>

          <button
            onClick={() => {
              setEditingArticle({
                title: '',
                slug: '',
                subtitle: '',
                category: 'cybersecurity',
                type: 'ANALYSIS',
                claimStatus: 'ANALYSIS',
                status: 'DRAFT',
                readingTime: '5 min read',
                excerpt: '',
                content: '',
                tags: 'Cybersecurity, Defense',
                keyTakeaways: 'Key Takeaway 1\nKey Takeaway 2'
              });
              setActiveTab('new-article');
            }}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              background: activeTab === 'new-article' ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
              border: '1px solid ' + (activeTab === 'new-article' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
              color: activeTab === 'new-article' ? '#030712' : '#cbd5e1',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Plus size={15} />
            <span>Create Article</span>
          </button>

          <button
            onClick={() => setActiveTab('vulnerabilities')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              background: activeTab === 'vulnerabilities' ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
              border: '1px solid ' + (activeTab === 'vulnerabilities' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
              color: activeTab === 'vulnerabilities' ? '#030712' : '#cbd5e1',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Radio size={15} />
            <span>CVE Registry ({vulns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              background: activeTab === 'subscribers' ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
              border: '1px solid ' + (activeTab === 'subscribers' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
              color: activeTab === 'subscribers' ? '#030712' : '#cbd5e1',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Users size={15} />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              background: activeTab === 'analytics' ? '#00f0ff' : 'rgba(15, 23, 42, 0.6)',
              border: '1px solid ' + (activeTab === 'analytics' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'),
              color: activeTab === 'analytics' ? '#030712' : '#cbd5e1',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <BarChart3 size={15} />
            <span>Analytics</span>
          </button>
        </div>

        {/* Tab 1: Articles List */}
        {activeTab === 'articles' && (
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Article Catalog ({articles.length})
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {articles.map((art) => (
                <div
                  key={art.slug}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(0, 240, 255, 0.15)', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                        {art.category}
                      </span>
                      <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
                        {art.type}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: art.status === 'PUBLISHED' ? '#10b981' : '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                        [{art.status || 'PUBLISHED'}]
                      </span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                      {art.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Slug: /{art.category}/{art.slug} • Published: {art.publishedAt}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => onNavigate(`/${art.category}/${art.slug}`)}
                      style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#cbd5e1', padding: '0.4rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                      title="Preview Live Page"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      onClick={() => startEditArticle(art)}
                      style={{ background: 'rgba(0, 240, 255, 0.15)', border: '1px solid rgba(0, 240, 255, 0.35)', color: '#00f0ff', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(art.slug)}
                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#f87171', padding: '0.4rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                      title="Delete Article"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Create / Edit Article Form */}
        {activeTab === 'new-article' && (
          <form onSubmit={handleSaveArticle} className="glass-panel" style={{ padding: 'clamp(1rem, 3vw, 2rem)', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
              {editingArticle.id ? 'Edit Article & Workflow' : 'Create New Investigation / Article'}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Headline (Title)</label>
                <input
                  type="text"
                  required
                  placeholder="Enter headline..."
                  value={editingArticle.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingArticle({ ...editingArticle, title, slug: editingArticle.id ? editingArticle.slug : slug });
                  }}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#ffffff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>URL Slug</label>
                <input
                  type="text"
                  required
                  placeholder="article-slug"
                  value={editingArticle.slug}
                  onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#ffffff', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Category</label>
                <select
                  value={editingArticle.category}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#ffffff' }}
                >
                  {categoriesData.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Article Type</label>
                <select
                  value={editingArticle.type}
                  onChange={(e) => setEditingArticle({ ...editingArticle, type: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#ffffff' }}
                >
                  {['NEWS', 'ANALYSIS', 'EXPLAINER', 'HOW-TO', 'TUTORIAL', 'RESEARCH', 'VULNERABILITY', 'OPINION', 'INTERVIEW', 'RESOURCE'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Claim Confidence</label>
                <select
                  value={editingArticle.claimStatus}
                  onChange={(e) => setEditingArticle({ ...editingArticle, claimStatus: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#ffffff' }}
                >
                  {['CONFIRMED FACT', 'REPORTED CLAIM', 'ANALYSIS', 'UNKNOWN / UNVERIFIED'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Workflow Status</label>
                <select
                  value={editingArticle.status}
                  onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#ffffff' }}
                >
                  {['IDEA', 'RESEARCH', 'DRAFT', 'FACT CHECK', 'EDITOR REVIEW', 'SCHEDULE', 'PUBLISHED', 'UPDATED'].map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Subtitle / Excerpt</label>
              <textarea
                rows={2}
                placeholder="Brief summary..."
                value={editingArticle.excerpt}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value, subtitle: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#ffffff', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Markdown Content Body</label>
              <textarea
                rows={12}
                placeholder="Write article in markdown format (## Section Header, ``` code, > quotes)..."
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#ffffff', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('articles')}
                style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#cbd5e1', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-cyber-primary"
                style={{ padding: '0.75rem 1.75rem' }}
              >
                <Save size={16} /> Save Article
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Vulnerabilities Management */}
        {activeTab === 'vulnerabilities' && (
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
              CVE Repository ({vulns.length} Entries)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {vulns.map((v) => (
                <div
                  key={v.cveId}
                  style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>{v.cveId}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>CVSS {v.cvss} ({v.severity})</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>{v.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{v.vendor} — {v.product}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>{v.exploitationStatus}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
              Newsletter Subscribers ({subscribers.length})
            </h3>
            {subscribers.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No local subscribers registered yet. Subscriptions via on-site boxes will appear here.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {subscribers.map((s, idx) => (
                  <div key={idx} style={{ padding: '0.75rem 1rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#ffffff' }}>{s.email}</span>
                    <span style={{ color: '#64748b' }}>{s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : 'Active'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Analytics */}
        {activeTab === 'analytics' && (
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
              Privacy-Conscious Telemetry Summary
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Total Page Views</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                  {analytics?.totalViews || 0}
                </div>
              </div>

              <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Newsletter Conversions</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                  {analytics?.newsletterSignups || 0}
                </div>
              </div>

              <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Tracked Queries</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
                  {analytics?.recentSearches?.length || 0}
                </div>
              </div>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
              Recent Search Queries
            </h4>
            {analytics?.recentSearches?.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No searches recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {analytics.recentSearches.map((s, idx) => (
                  <span key={idx} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', color: '#cbd5e1', fontSize: '0.8rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    "{s.q}"
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
