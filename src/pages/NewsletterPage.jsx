import React, { useEffect } from 'react';
import NewsletterBox from '../components/home/NewsletterBox';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import { siteConfig } from '../config/site';

export default function NewsletterPage({ onNavigate }) {
  useEffect(() => {
    updateMetaTags({
      title: `Weekly Threat Intelligence Dispatch — ${siteConfig.name}`,
      description: "Subscribe to the CyberAI Watch newsletter for curated vulnerability analyses, AI safety breakthroughs, and defensive hardening playbooks.",
      type: "website",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Newsletter", url: "/newsletter" }
      ])
    });

    recordPageView('/newsletter', 'Newsletter Page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '4rem 0' }}>
      <NewsletterBox />
    </div>
  );
}
