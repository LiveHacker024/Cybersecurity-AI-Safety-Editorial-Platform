import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BreakingTicker from '../components/layout/BreakingTicker';
import FeaturedStory from '../components/home/FeaturedStory';
import LatestNewsGrid from '../components/home/LatestNewsGrid';
import ThreatIntelligence3D from '../components/3d/ThreatIntelligence3D';
import AiBattlefieldSection from '../components/home/AiBattlefieldSection';
import CyberGuidesSection from '../components/home/CyberGuidesSection';
import SecurityToolsSuite from '../components/tools/SecurityToolsSuite';
import FounderTrustSection from '../components/home/FounderTrustSection';
import NewsletterBox from '../components/home/NewsletterBox';
import AdSlot from '../components/ads/AdSlot';

export default function HomePage({ onNavigate }) {
  return (
    <div style={{ background: '#050811' }}>
      {/* 3D Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* Breaking Cyber Ticker */}
      <BreakingTicker onSelectArticle={onNavigate} />

      {/* Featured Primary Story */}
      <FeaturedStory onNavigate={onNavigate} />

      {/* AdSense Unit */}
      <div className="container-custom">
        <AdSlot type="leaderboard" />
      </div>

      {/* Latest News Feed */}
      <LatestNewsGrid onNavigate={onNavigate} />

      {/* 3D Threat Intelligence Matrix */}
      <ThreatIntelligence3D />

      {/* AI Safety: The Next Cyber Battlefield */}
      <AiBattlefieldSection onNavigate={onNavigate} />

      {/* Evergreen Defensive Guides */}
      <CyberGuidesSection onNavigate={onNavigate} />

      {/* AdSense Unit */}
      <div className="container-custom">
        <AdSlot type="billboard" />
      </div>

      {/* Interactive Client-Side Security Tools Suite */}
      <SecurityToolsSuite />

      {/* Founder Editorial Trust Spotlight */}
      <FounderTrustSection onNavigate={onNavigate} />

      {/* Newsletter Signup */}
      <NewsletterBox />
    </div>
  );
}
