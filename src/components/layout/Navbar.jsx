import React, { useState, useEffect } from 'react';
import { Shield, Search, Menu, X, Bell, ExternalLink, ChevronRight, Terminal } from 'lucide-react';
import { Youtube } from '../common/SocialIcons';
import { siteConfig } from '../../config/site';

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

  const navItems = siteConfig.nav;

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
          background: isScrolled ? 'rgba(3, 7, 18, 0.94)' : 'rgba(3, 7, 18, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px', gap: '1rem' }}>
          {/* Brand Logo & Editorial Wordmark */}
          <div
            onClick={() => handleNavClick('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(16, 185, 129, 0.3) 100%)',
                border: '1px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.25)'
              }}
            >
              <Shield size={22} color="#00f0ff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff' }}>
                  CYBER<span style={{ color: '#00f0ff' }}>AI</span> WATCH
                </span>
                <span style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  INTEL
                </span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)' }}>
                BY KUNAL RAJPUT • HACKWITHKUNAL
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', gap: '0.2rem', alignItems: 'center', flexWrap: 'nowrap' }} className="desktop-nav">
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
                    padding: '0.4rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.825rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
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

          {/* Right Action Icons & YouTube link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            {/* YouTube Channel Quick Link */}
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
              className="youtube-nav-btn"
              title="Official YouTube Channel @HackWithKunal"
            >
              <Youtube size={15} />
              <span>YouTube</span>
            </a>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                color: '#94a3b8',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                transition: 'all 0.2s ease'
              }}
              aria-label="Search articles and CVEs"
            >
              <Search size={15} color="#00f0ff" />
              <span style={{ display: 'none' }} className="search-text">Search</span>
              <kbd style={{ display: 'none', padding: '0.1rem 0.35rem', background: '#1e293b', borderRadius: '4px', fontSize: '0.62rem', fontFamily: 'var(--font-mono)' }} className="search-kbd">
                Ctrl K
              </kbd>
            </button>

            {/* Subscribe CTA */}
            <button
              onClick={onOpenSubscribe}
              className="btn-cyber-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
            >
              <Bell size={13} /> Subscribe
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'flex',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid #1e293b',
                color: '#f8fafc',
                padding: '0.45rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} color="#00f0ff" /> : <Menu size={20} />}
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
            background: 'rgba(3, 7, 18, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '5.5rem 1.5rem 2rem',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
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
                    padding: '0.8rem 1.15rem',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                    border: isActive ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.06)',
                    color: isActive ? '#00f0ff' : '#f8fafc',
                    fontSize: '0.98rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} opacity={0.6} />
                </button>
              );
            })}
          </div>

          {/* Mobile YouTube & Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                padding: '0.75rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Youtube size={18} />
              <span>Watch on YouTube (@HackWithKunal)</span>
            </a>
          </div>

          {/* Founder Quick Card in Mobile Drawer */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <img
                src={siteConfig.founder.avatar}
                alt={siteConfig.founder.name}
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00f0ff' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>{siteConfig.founder.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>Founder & Editor-in-Chief</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleNavClick('/author/kunal-rajput')}
                className="btn-cyber-secondary"
                style={{ flex: 1, padding: '0.45rem', fontSize: '0.78rem' }}
              >
                Author Profile
              </button>
              <button
                onClick={() => handleNavClick('/about')}
                className="btn-cyber-secondary"
                style={{ flex: 1, padding: '0.45rem', fontSize: '0.78rem' }}
              >
                Editorial Mission
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1100px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .search-text { display: inline !important; }
          .search-kbd { display: inline !important; }
          .youtube-nav-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
