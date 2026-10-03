import React, { useState, useEffect } from 'react';
import { Shield, Search, Menu, X, Bell, ChevronRight } from 'lucide-react';
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

  // Lock body scroll and handle Escape key for mobile menu accessibility
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navItems = siteConfig.nav; // Exactly 5 tabs: Home, Bypass Methods, News, Vulnerabilities, Tutorials

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
          background: isScrolled ? 'rgba(3, 7, 18, 0.96)' : 'rgba(3, 7, 18, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          transition: 'all 0.25s ease'
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '66px', gap: '0.75rem' }}>
          {/* Brand Logo & Editorial Wordmark */}
          <div
            onClick={() => handleNavClick('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              textDecoration: 'none',
              flexShrink: 0,
              minWidth: 0
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('/')}
            aria-label="CyberAI Watch Home"
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(16, 185, 129, 0.3) 100%)',
                border: '1px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(0, 240, 255, 0.2)',
                flexShrink: 0
              }}
            >
              <Shield size={19} color="#00f0ff" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'nowrap' }}>
                <span className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff', whiteSpace: 'nowrap' }}>
                  CYBER<span style={{ color: '#00f0ff' }}>AI</span> WATCH
                </span>
                <span className="nav-intel-badge" style={{ fontSize: '0.58rem', padding: '0.1rem 0.3rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  INTEL
                </span>
              </div>
              <div className="brand-subtext" style={{ fontSize: '0.62rem', color: '#94a3b8', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                EDITORIAL PUBLICATION
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links — Exactly 5 Primary Tabs */}
          <nav style={{ display: 'none', gap: '0.35rem', alignItems: 'center', flexWrap: 'nowrap' }} className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid transparent',
                    color: isActive ? '#00f0ff' : '#cbd5e1',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '7px',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-display)',
                    boxShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.2)' : 'none'
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

          {/* Right Action Icons & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {/* YouTube Quick Link */}
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
                padding: '0.4rem 0.65rem',
                borderRadius: '7px',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
              className="youtube-nav-btn"
              title="Official YouTube Channel @HackWithKunal"
            >
              <Youtube size={14} />
              <span>YouTube</span>
            </a>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#94a3b8',
                padding: '0.4rem 0.65rem',
                borderRadius: '7px',
                cursor: 'pointer',
                fontSize: '0.78rem',
                transition: 'all 0.2s ease',
                minWidth: '36px',
                minHeight: '36px',
                justifyContent: 'center'
              }}
              aria-label="Search articles and CVEs (Ctrl+K)"
            >
              <Search size={15} color="#00f0ff" />
              <span style={{ display: 'none' }} className="search-text">Search</span>
              <kbd style={{ display: 'none', padding: '0.1rem 0.3rem', background: '#1e293b', borderRadius: '4px', fontSize: '0.6rem', fontFamily: 'var(--font-mono)' }} className="search-kbd">
                Ctrl K
              </kbd>
            </button>

            {/* Subscribe CTA */}
            <button
              onClick={onOpenSubscribe}
              className="btn-cyber-primary nav-subscribe-btn"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', minHeight: '36px', whiteSpace: 'nowrap' }}
              aria-label="Subscribe to weekly newsletter"
            >
              <Bell size={12} />
              <span className="subscribe-btn-text">Subscribe</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid #1e293b',
                color: '#f8fafc',
                padding: '0.45rem',
                borderRadius: '7px',
                cursor: 'pointer',
                minWidth: '40px',
                minHeight: '40px'
              }}
              className="mobile-toggle"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} color="#00f0ff" /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(3, 7, 18, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.25rem',
            paddingTop: '5rem',
            overflowY: 'auto',
            overscrollBehavior: 'contain'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Drawer Header with Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} color="#00f0ff" />
              <span className="font-heading" style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                PRIMARY SECTIONS
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#f8fafc',
                borderRadius: '6px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                minHeight: '40px'
              }}
              aria-label="Close menu"
            >
              <X size={15} color="#00f0ff" />
              <span>Close</span>
            </button>
          </div>

          {/* 5 Primary Navigation Tabs ONLY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
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
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                    border: isActive ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.06)',
                    color: isActive ? '#00f0ff' : '#f8fafc',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    minHeight: '48px',
                    width: '100%'
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} opacity={0.7} />
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }} />

          {/* Secondary Actions: Search, YouTube, Subscribe */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSearch();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'rgba(14, 165, 233, 0.12)',
                border: '1px solid rgba(14, 165, 233, 0.35)',
                color: '#38bdf8',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: '46px',
                width: '100%'
              }}
            >
              <Search size={16} />
              <span>Search All Articles & CVEs</span>
            </button>

            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#f87171',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                minHeight: '46px',
                width: '100%'
              }}
            >
              <Youtube size={16} />
              <span>Watch on YouTube (@HackWithKunal)</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSubscribe();
              }}
              className="btn-cyber-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                minHeight: '46px',
                width: '100%'
              }}
            >
              <Bell size={15} />
              <span>Subscribe to Newsletter</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .search-text { display: inline !important; }
          .search-kbd { display: inline !important; }
          .youtube-nav-btn { display: inline-flex !important; }
        }
        @media (max-width: 480px) {
          .brand-subtext { display: none !important; }
          .nav-intel-badge { display: none !important; }
        }
        @media (max-width: 360px) {
          .subscribe-btn-text { display: none !important; }
          .nav-subscribe-btn { padding: 0.35rem 0.55rem !important; }
        }
      `}</style>
    </>
  );
}
