import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchModal from './components/layout/SearchModal';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import GuidesPage from './pages/GuidesPage';
import AboutPage from './pages/AboutPage';
import EditorialStandardsPage from './pages/EditorialStandardsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import SecurityToolsSuite from './components/tools/SecurityToolsSuite';
import NewsletterBox from './components/home/NewsletterBox';
import { articlesData } from './data/articles';

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

    // 2. Specific Static Pages
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/editorial-standards') {
      return <EditorialStandardsPage onNavigate={navigate} />;
    }
    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (currentPath === '/tools') {
      return (
        <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0' }}>
          <SecurityToolsSuite />
        </div>
      );
    }

    // 3. Guides
    if (currentPath === '/guides') {
      return <GuidesPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/guides/')) {
      const guideSlug = currentPath.replace('/guides/', '');
      return <GuidesPage selectedGuideSlug={guideSlug} onNavigate={navigate} />;
    }

    // 4. Categories & Direct Articles
    const segments = currentPath.split('/').filter(Boolean);
    const categorySlugs = ['cybersecurity', 'ai-safety', 'ai-news', 'privacy', 'technology', 'finance-tech', 'news'];

    if (segments.length === 1 && categorySlugs.includes(segments[0])) {
      return <CategoryPage categorySlug={segments[0]} onNavigate={navigate} />;
    }

    if (segments.length === 2 && categorySlugs.includes(segments[0])) {
      return <ArticlePage slug={segments[1]} onNavigate={navigate} />;
    }

    // Direct check if it's an article slug
    const matchedArticle = articlesData.find(a => a.slug === segments[segments.length - 1]);
    if (matchedArticle) {
      return <ArticlePage slug={matchedArticle.slug} onNavigate={navigate} />;
    }

    // Fallback: Default Category or Home
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#050811' }}>
      {/* Top Navbar */}
      <Navbar
        onNavigate={navigate}
        currentPath={currentPath}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeModalOpen(true)}
      />

      {/* Main Routed Page Content */}
      <div style={{ flex: 1 }}>
        {renderContent()}
      </div>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Instant Search Modal (Cmd+K / Search button) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={navigate}
      />

      {/* Subscribe Modal */}
      {isSubscribeModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(3, 6, 14, 0.85)',
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
            style={{ width: '100%', maxWidth: '720px' }}
          >
            <NewsletterBox />
          </div>
        </div>
      )}
    </div>
  );
}
