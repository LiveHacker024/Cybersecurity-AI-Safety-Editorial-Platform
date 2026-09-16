import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Settings, Check, X } from 'lucide-react';

const CONSENT_STORAGE_KEY = "cyberaiwatch_cookie_consent_v1";

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    advertising: false
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!saved) {
        setIsVisible(true);
      } else {
        setPreferences(JSON.parse(saved));
      }
    } catch (e) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (updated) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    setPreferences(updated);
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, advertising: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, advertising: false });
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {/* Floating Bottom Consent Banner */}
      {isVisible && !isModalOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
            maxWidth: '920px',
            margin: '0 auto',
            zIndex: 90,
            background: 'rgba(5, 8, 17, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 240, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <ShieldCheck size={18} color="#00f0ff" />
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                Privacy & Data Consent
              </span>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              CyberAI Watch respects your privacy and uses zero-telemetry client tools. We use privacy-conscious analytics and display ads to sustain our independent editorial team.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Settings size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Manage Options
            </button>
            <button
              onClick={handleRejectAll}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '0.5rem 0.95rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reject Non-Essential
            </button>
            <button
              onClick={handleAcceptAll}
              className="btn-cyber-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
            >
              Accept All
            </button>
          </div>
        </div>
      )}

      {/* Modal Preferences View */}
      {isModalOpen && (
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
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(0, 240, 255, 0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={22} color="#00f0ff" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Cookie Consent Preferences
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {/* Necessary */}
              <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>Strictly Necessary</span>
                  <span style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>ALWAYS ACTIVE</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                  Required for core navigation, security state, and theme rendering. Cannot be disabled.
                </p>
              </div>

              {/* Analytics */}
              <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>Privacy Analytics</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#00f0ff', cursor: 'pointer' }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                  Anonymized page counts and search terms stored locally to power trending stories without collecting personal identifiers.
                </p>
              </div>

              {/* Advertising */}
              <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>Display Advertising (Google AdSense)</span>
                  <input
                    type="checkbox"
                    checked={preferences.advertising}
                    onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#00f0ff', cursor: 'pointer' }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                  Enables display ad units that fund free access to our investigative cybersecurity journalism.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={handleRejectAll}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reject All
              </button>
              <button
                onClick={() => saveConsent(preferences)}
                className="btn-cyber-primary"
                style={{ padding: '0.55rem 1.5rem', fontSize: '0.85rem' }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
