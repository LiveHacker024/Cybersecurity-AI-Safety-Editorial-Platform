import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchModal from './components/layout/SearchModal';
import ConsentBanner from './components/layout/ConsentBanner';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import VulnerabilitiesPage from './pages/VulnerabilitiesPage';
import SearchPage from './pages/SearchPage';
import TrendingPage from './pages/TrendingPage';
import AuthorPage from './pages/AuthorPage';
import YouTubePage from './pages/YouTubePage';
import NewsletterPage from './pages/NewsletterPage';
import UnsubscribePage from './pages/UnsubscribePage';
import LegalPage from './pages/LegalPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import SecurityToolsSuite from './components/tools/SecurityToolsSuite';
import NewsletterBox from './components/home/NewsletterBox';
import SecurityTestingHubPage from './pages/securityTesting/SecurityTestingHubPage';
import CategoryTestingPage from './pages/securityTesting/CategoryTestingPage';
import VulnerabilityDetailPage from './pages/securityTesting/VulnerabilityDetailPage';
import BypassMethodsPage from './pages/BypassMethodsPage';
import { getAllArticles } from './utils/storage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // Sync with browser history back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath((window.location.pathname + window.location.search) || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K opens search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (path) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Resolver
  const renderContent = () => {
    const pathWithoutQuery = currentPath.split('?')[0];
    const cleanPath = pathWithoutQuery === '/' ? '/' : pathWithoutQuery.replace(/\/+$/, '');

    // 1. Home
    if (cleanPath === '/' || cleanPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Specialized Hubs & Features
    if (cleanPath === '/vulnerabilities') {
      return <VulnerabilitiesPage onNavigate={navigate} />;
    }
    if (cleanPath === '/search') {
      return <SearchPage onNavigate={navigate} currentPath={currentPath} />;
    }
    if (cleanPath === '/trending' || cleanPath === '/most-read') {
      return <TrendingPage onNavigate={navigate} />;
    }
    if (cleanPath === '/author/kunal-rajput' || cleanPath === '/author') {
      return <AuthorPage onNavigate={navigate} />;
    }
    if (cleanPath === '/youtube') {
      return <YouTubePage onNavigate={navigate} />;
    }
    if (cleanPath === '/newsletter') {
      return <NewsletterPage onNavigate={navigate} />;
    }
    if (cleanPath === '/unsubscribe') {
      return <UnsubscribePage onNavigate={navigate} />;
    }
    if (cleanPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }
    if (cleanPath === '/tools') {
      return (
        <div style={{ minHeight: '100vh', background: '#030712', padding: '3.5rem 0' }}>
          <SecurityToolsSuite />
        </div>
      );
    }

    // Bypass Methods Hub
    if (cleanPath === '/bypass-methods') {
      return <BypassMethodsPage onNavigate={navigate} />;
    }

    // Security Testing Knowledge Hub
    if (cleanPath === '/security-testing') {
      return <SecurityTestingHubPage onNavigate={navigate} />;
    }
    if (cleanPath === '/security-testing/api-security') {
      return <CategoryTestingPage categorySlug="api-security" onNavigate={navigate} />;
    }
    if (cleanPath === '/security-testing/web-security') {
      return <CategoryTestingPage categorySlug="web-security" onNavigate={navigate} />;
    }
    if (cleanPath === '/security-testing/mobile-security') {
      return <CategoryTestingPage categorySlug="mobile-security" onNavigate={navigate} />;
    }
    if (cleanPath.startsWith('/security-testing/')) {
      const secSegments = cleanPath.split('/').filter(Boolean);
      if (secSegments.length >= 3 && secSegments[0] === 'security-testing') {
        return <VulnerabilityDetailPage categorySlug={secSegments[1]} slug={secSegments[2]} onNavigate={navigate} />;
      }
    }

    // 3. Legal & Editorial Policy Pages
    if (cleanPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (cleanPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (cleanPath === '/privacy-policy') {
      return <LegalPage policyKey="privacyPolicy" onNavigate={navigate} />;
    }
    if (cleanPath === '/terms') {
      return <LegalPage policyKey="terms" onNavigate={navigate} />;
    }
    if (cleanPath === '/cookie-policy') {
      return <LegalPage policyKey="cookiePolicy" onNavigate={navigate} />;
    }
    if (cleanPath === '/disclaimer') {
      return <LegalPage policyKey="disclaimer" onNavigate={navigate} />;
    }
    if (cleanPath === '/editorial-policy' || cleanPath === '/editorial-standards') {
      return <LegalPage policyKey="editorialPolicy" onNavigate={navigate} />;
    }
    if (cleanPath === '/correction-policy') {
      return <LegalPage policyKey="correctionPolicy" onNavigate={navigate} />;
    }
    if (cleanPath === '/affiliate-disclosure') {
      return <LegalPage policyKey="affiliateDisclosure" onNavigate={navigate} />;
    }
    if (cleanPath === '/advertising-policy') {
      return <LegalPage policyKey="advertisingPolicy" onNavigate={navigate} />;
    }

    // 4. Categories & Direct Articles
    const segments = cleanPath.split('/').filter(Boolean);
    const categorySlugs = [
      'cybersecurity',
      'ai-safety',
      'ai-security',
      'threat-intelligence',
      'vulnerabilities',
      'privacy',
      'tutorials',
      'guides',
      'analysis',
      'news',
      'security-news',
      'technology'
    ];

    if (segments.length === 1 && categorySlugs.includes(segments[0])) {
      const catSlug = segments[0] === 'guides' ? 'tutorials' : segments[0];
      return <CategoryPage categorySlug={catSlug} onNavigate={navigate} />;
    }

    if (segments.length === 2 && (categorySlugs.includes(segments[0]) || segments[0] === 'article')) {
      return <ArticlePage slug={segments[1]} onNavigate={navigate} />;
    }

    // Direct match by article slug anywhere in pathname
    const allArticles = getAllArticles();
    const matchedArticle = allArticles.find(a => a.slug === segments[segments.length - 1]);
    if (matchedArticle) {
      return <ArticlePage slug={matchedArticle.slug} onNavigate={navigate} />;
    }

    // Fallback: 404
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#030712' }}>
      {/* Top Navbar */}
      <Navbar
        onNavigate={navigate}
        currentPath={currentPath}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeModalOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main style={{ flex: 1 }}>
        {renderContent()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Instant Search Modal (Cmd+K / Search button) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(path) => {
          setIsSearchOpen(false);
          navigate(path);
        }}
      />

      {/* Subscribe Modal */}
      {isSubscribeModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(3, 7, 18, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setIsSubscribeModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '760px' }}
          >
            <NewsletterBox />
          </div>
        </div>
      )}

      {/* GDPR / ePrivacy Cookie & Analytics Consent Banner */}
      <ConsentBanner />
    </div>
  );
}
