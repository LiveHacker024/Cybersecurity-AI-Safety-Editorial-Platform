import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function AdSlot({ type = "leaderboard", className = "" }) {
  // Configs for standard IAB sizes
  const config = {
    billboard: {
      width: '970px',
      minHeight: '250px',
      name: 'IAB Billboard (970x250)'
    },
    leaderboard: {
      width: '728px',
      minHeight: '90px',
      name: 'IAB Leaderboard (728x90)'
    },
    rectangle: {
      width: '300px',
      minHeight: '250px',
      name: 'IAB Medium Rectangle (300x250)'
    },
    infeed: {
      width: '100%',
      minHeight: '120px',
      name: 'In-Feed Responsive Display'
    }
  }[type] || {
    width: '100%',
    minHeight: '100px',
    name: 'Responsive Cyber Ad Unit'
  };

  return (
    <div className={`ad-slot-wrapper ${className}`} style={{ maxWidth: config.width, margin: '2rem auto' }}>
      <div className="ad-label">
        ADVERTISEMENT • GOOGLE ADSENSE VERIFIED PLACEMENT
      </div>

      <div
        style={{
          width: '100%',
          minHeight: config.minHeight,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(10, 15, 29, 0.8) 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0ea5e9', marginBottom: '0.35rem', fontWeight: 600 }}>
          <ShieldCheck size={16} /> {config.name}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#475569' }}>
          Targeted Ethical Tech & Security Sponsors • Non-Intrusive Display
        </div>
      </div>
    </div>
  );
}
