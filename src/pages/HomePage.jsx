import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import BreakingTicker from '../components/layout/BreakingTicker';
import FeaturedStory from '../components/home/FeaturedStory';
import LatestNewsGrid from '../components/home/LatestNewsGrid';
import VulnerabilitiesWidget from '../components/home/VulnerabilitiesWidget';
import AiBattlefieldSection from '../components/home/AiBattlefieldSection';
import ThreatIntelligenceSection from '../components/home/ThreatIntelligenceSection';
import CyberGuidesSection from '../components/home/CyberGuidesSection';
import SecurityToolsSuite from '../components/tools/SecurityToolsSuite';
import YouTubeSection from '../components/home/YouTubeSection';
import FounderTrustSection from '../components/home/FounderTrustSection';
import NewsletterBox from '../components/home/NewsletterBox';
import AdSlot from '../components/ads/AdSlot';
import { updateMetaTags, generateWebsiteSchema } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import { siteConfig } from '../config/site';

export default function HomePage({ onNavigate }) {
  useEffect(() => {
    updateMetaTags({
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: siteConfig.description,
      schema: generateWebsiteSchema()
    });
    recordPageView('/', `${siteConfig.name} — Homepage`);
  }, []);

  return (
    <div style={{ background: '#030712' }}>
      {/* 1. Breaking Threat Ticker */}
      <BreakingTicker onSelectArticle={onNavigate} />

      {/* 2. Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* 3. Top Stories Spotlight */}
      <FeaturedStory onNavigate={onNavigate} />

      {/* Monetization Slot: Leaderboard */}
      <div className="container-custom">
        <AdSlot type="leaderboard" />
      </div>

      {/* 4 & 5. Latest Cybersecurity News Feed */}
      <LatestNewsGrid onNavigate={onNavigate} />

      {/* 6 & 7. AI Safety & Model Security Hub Spotlight */}
      <AiBattlefieldSection onNavigate={onNavigate} />

      {/* 8. Authentic Vulnerabilities & CVE Tracker Widget */}
      <VulnerabilitiesWidget onNavigate={onNavigate} />

      {/* 9. Threat Intelligence Grid */}
      <ThreatIntelligenceSection onNavigate={onNavigate} />

      {/* Monetization Slot: Billboard */}
      <div className="container-custom">
        <AdSlot type="billboard" />
      </div>

      {/* 10. Privacy & Client-Side Zero-Telemetry Tools Suite */}
      <SecurityToolsSuite />

      {/* 12. Defensive Tutorials & Hardening Guides */}
      <CyberGuidesSection onNavigate={onNavigate} />

      {/* 14. YouTube & HackWithKunal Video Hub */}
      <YouTubeSection />

      {/* 15. Weekly Dispatch Newsletter */}
      <NewsletterBox />

      {/* 16. Founder Trust & Editorial Standards */}
      <FounderTrustSection onNavigate={onNavigate} />
    </div>
  );
}
