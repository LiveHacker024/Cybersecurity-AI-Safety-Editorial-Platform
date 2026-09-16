import React from 'react';
import { siteConfig } from '../../config/site';

export default function AdSlot({
  type = "in-content",
  slotId = "",
  format = "auto",
  className = ""
}) {
  const isAdSenseActive = siteConfig.monetization.isAdSenseActive;
  const clientId = siteConfig.monetization.adsenseClientId;

  // Responsive dimensions based on placement type
  const heightMap = {
    leaderboard: '90px',
    billboard: '180px',
    rectangle: '250px',
    'in-content': '120px',
    sidebar: '300px',
    'top-article': '100px',
    'bottom-article': '140px',
    'between-sections': '90px'
  };

  const minHeight = heightMap[type] || '100px';

  // When AdSense is active and client ID is provided
  if (isAdSenseActive && clientId) {
    return (
      <aside
        className={`ad-container ${className}`}
        aria-label="Advertisement"
        style={{
          width: '100%',
          margin: '2.5rem 0',
          textAlign: 'center',
          overflow: 'hidden',
          padding: '0.75rem 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(5, 8, 17, 0.4)'
        }}
      >
        <span
          style={{
            fontSize: '0.625rem',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          ADVERTISEMENT
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight }}
          data-ad-client={clientId}
          data-ad-slot={slotId || "1234567890"}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  // Pre-approval / Unconfigured state:
  // Gracefully collapse to avoid empty placeholder boxes or dashed borders during editorial and AdSense quality reviews.
  return null;
}
