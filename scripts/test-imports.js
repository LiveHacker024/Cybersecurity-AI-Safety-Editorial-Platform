import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Test importing all components and data
async function testAll() {
  try {
    console.log('Testing App import...');
    const App = (await import('../src/App.jsx')).default;
    console.log('Testing HomePage import...');
    const HomePage = (await import('../src/pages/HomePage.jsx')).default;
    console.log('Testing HeroSection import...');
    const HeroSection = (await import('../src/components/home/HeroSection.jsx')).default;
    console.log('Testing FeaturedStory import...');
    const FeaturedStory = (await import('../src/components/home/FeaturedStory.jsx')).default;
    console.log('Testing LatestNewsGrid import...');
    const LatestNewsGrid = (await import('../src/components/home/LatestNewsGrid.jsx')).default;
    console.log('Testing VulnerabilitiesWidget import...');
    const VulnerabilitiesWidget = (await import('../src/components/home/VulnerabilitiesWidget.jsx')).default;
    console.log('Testing AiBattlefieldSection import...');
    const AiBattlefieldSection = (await import('../src/components/home/AiBattlefieldSection.jsx')).default;
    console.log('Testing ThreatIntelligenceSection import...');
    const ThreatIntelligenceSection = (await import('../src/components/home/ThreatIntelligenceSection.jsx')).default;
    console.log('Testing CyberGuidesSection import...');
    const CyberGuidesSection = (await import('../src/components/home/CyberGuidesSection.jsx')).default;
    console.log('Testing SecurityToolsSuite import...');
    const SecurityToolsSuite = (await import('../src/components/tools/SecurityToolsSuite.jsx')).default;
    console.log('Testing YouTubeSection import...');
    const YouTubeSection = (await import('../src/components/home/YouTubeSection.jsx')).default;
    console.log('Testing FounderTrustSection import...');
    const FounderTrustSection = (await import('../src/components/home/FounderTrustSection.jsx')).default;
    console.log('Testing NewsletterBox import...');
    const NewsletterBox = (await import('../src/components/home/NewsletterBox.jsx')).default;
    console.log('Testing AdSlot import...');
    const AdSlot = (await import('../src/components/ads/AdSlot.jsx')).default;

    console.log('All modules imported successfully without syntax or module errors!');
  } catch (err) {
    console.error('ERROR during module import or execution:', err);
  }
}

testAll();
