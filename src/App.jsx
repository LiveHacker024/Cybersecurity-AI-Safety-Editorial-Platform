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
import { getAllArticles } from './utils/storage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // Sync with browser history back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
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
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Specialized Hubs & Features
    if (currentPath === '/vulnerabilities') {
      return <VulnerabilitiesPage onNavigate={navigate} />;
    }
    if (currentPath === '/search') {
      return <SearchPage onNavigate={navigate} />;
    }
    if (currentPath === '/trending' || currentPath === '/most-read') {
      return <TrendingPage onNavigate={navigate} />;
    }
    if (currentPath === '/author/kunal-rajput' || currentPath === '/author') {
      return <AuthorPage onNavigate={navigate} />;
    }
    if (currentPath === '/youtube') {
      return <YouTubePage onNavigate={navigate} />;
    }
    if (currentPath === '/newsletter') {
      return <NewsletterPage onNavigate={navigate} />;
    }
    if (currentPath === '/unsubscribe') {
      return <UnsubscribePage onNavigate={navigate} />;
    }
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }
    if (currentPath === '/tools') {
      return (
        <div style={{ minHeight: '100vh', background: '#030712', padding: '3.5rem 0' }}>
          <SecurityToolsSuite />
        </div>
      );
    }

    // 3. Legal & Editorial Policy Pages
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (currentPath === '/privacy-policy') {
      return <LegalPage policyKey="privacyPolicy" onNavigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <LegalPage policyKey="terms" onNavigate={navigate} />;
    }
    if (currentPath === '/cookie-policy') {
      return <LegalPage policyKey="cookiePolicy" onNavigate={navigate} />;
    }
    if (currentPath === '/disclaimer') {
      return <LegalPage policyKey="disclaimer" onNavigate={navigate} />;
    }
    if (currentPath === '/editorial-policy' || currentPath === '/editorial-standards') {
      return <LegalPage policyKey="editorialPolicy" onNavigate={navigate} />;
    }
    if (currentPath === '/correction-policy') {
      return <LegalPage policyKey="correctionPolicy" onNavigate={navigate} />;
    }
    if (currentPath === '/affiliate-disclosure') {
      return <LegalPage policyKey="affiliateDisclosure" onNavigate={navigate} />;
    }
    if (currentPath === '/advertising-policy') {
      return <LegalPage policyKey="advertisingPolicy" onNavigate={navigate} />;
    }

    // 4. Categories & Direct Articles
    const segments = currentPath.split('/').filter(Boolean);
    const categorySlugs = [
      'cybersecurity',
      'ai-safety',
      'ai-security',
      'threat-intelligence',
      'privacy',
      'tutorials',
      'guides',
      'analysis',
      'news',
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
