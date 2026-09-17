import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { removeSubscriber } from '../utils/storage';
import { updateMetaTags } from '../utils/seo';
import { siteConfig } from '../config/site';

export default function UnsubscribePage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    updateMetaTags({
      title: `Unsubscribe — ${siteConfig.name}`,
      description: "Manage your subscription preferences or unsubscribe from the CyberAI Watch dispatch."
    });
  }, []);

  const handleUnsubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    removeSubscriber(email);
    setStatus('success');
  };

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '5rem 0', display: 'flex', alignItems: 'center' }}>
      <div className="container-custom" style={{ maxWidth: '540px' }}>
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}
        >
          <Mail size={32} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
          <h1 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Unsubscribe from Dispatch
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '2rem' }}>
            We're sorry to see you go. Enter your email below to be removed immediately from our dispatch list.
          </p>

          {status === 'success' ? (
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.25rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={18} />
                <span>You have been successfully unsubscribed.</span>
              </div>
              <div>
                <button onClick={() => onNavigate('/')} className="btn-cyber-primary">
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUnsubscribe}>
              <input
                type="email"
                required
                placeholder="Enter your subscribed email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  marginBottom: '1rem'
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Confirm Unsubscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
