import React, { useState, useEffect } from 'react';
import { Shield, Search, Menu, X, Terminal, Bell, Lock, Sparkles, ChevronDown } from 'lucide-react';
import { founderData } from '../../data/founder';

export default function Navbar({ onNavigate, currentPath, onOpenSearch, onOpenSubscribe }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Cybersecurity", path: "/cybersecurity" },
    { label: "AI Safety", path: "/ai-safety" },
    { label: "AI News", path: "/ai-news" },
    { label: "Privacy", path: "/privacy" },
    { label: "Technology", path: "/technology" },
    { label: "Guides", path: "/guides" },
    { label: "Tools", path: "/tools" },
    { label: "News", path: "/news" }
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: isScrolled ? 'rgba(5, 8, 17, 0.92)' : 'rgba(5, 8, 17, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(2, 132, 199, 0.4) 100%)',
                border: '1px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)'
              }}
            >
              <Shield size={22} color="#00f0ff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                  HACKWITH<span style={{ color: '#00f0ff' }}>KUNAL</span>
                </span>
                <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(0, 240, 255, 0.15)', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 700, border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                  INTEL
                </span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)' }}>
                CYBERSECURITY & AI SAFETY
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    background: isActive ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid transparent',
                    color: isActive ? '#00f0ff' : '#cbd5e1',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-display)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#00f0ff';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                color: '#94a3b8',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.825rem',
                transition: 'all 0.2s ease'
              }}
              aria-label="Search articles"
            >
              <Search size={16} color="#00f0ff" />
              <span style={{ display: 'none' }} className="search-text">Search...</span>
              <kbd style={{ display: 'none', padding: '0.1rem 0.35rem', background: '#1e293b', borderRadius: '4px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }} className="search-kbd">
                Ctrl K
              </kbd>
            </button>

            {/* Subscribe CTA */}
            <button
              onClick={onOpenSubscribe}
              className="btn-cyber-primary"
              style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
            >
              <Bell size={14} /> Subscribe
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'flex',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid #1e293b',
                color: '#f8fafc',
                padding: '0.5rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} color="#00f0ff" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(5, 8, 17, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '5.5rem 1.5rem 2rem',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.9rem 1.25rem',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                    border: isActive ? '1px solid #00f0ff' : '1px solid #1e293b',
                    color: isActive ? '#00f0ff' : '#f8fafc',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronDown size={16} style={{ transform: 'rotate(-90deg)', opacity: 0.5 }} />
                </button>
              );
            })}
          </div>

          {/* Founder Quick Card in Mobile Drawer */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <img
                src={founderData.images.avatar}
                alt={founderData.name}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00f0ff' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{founderData.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>ASD Cybersecurity / HackWithKunal</div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1rem' }}>
              {founderData.shortBio}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleNavClick('/about')}
                className="btn-cyber-secondary"
                style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem' }}
              >
                About Kunal
              </button>
              <button
                onClick={() => handleNavClick('/editorial-standards')}
                className="btn-cyber-secondary"
                style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem' }}
              >
                Editorial Standards
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .search-text { display: inline !important; }
          .search-kbd { display: inline !important; }
        }
      `}</style>
    </>
  );
}
