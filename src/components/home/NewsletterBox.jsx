import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { addSubscriber } from '../../utils/storage';
import { recordNewsletterSignup } from '../../utils/analytics';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      const res = addSubscriber(email, name);
      if (res.success) {
        recordNewsletterSignup();
        setStatus('success');
        setMessage(res.alreadySubscribed
          ? 'You are already subscribed to the CyberAI Watch dispatch.'
          : 'Thank you for subscribing! You will receive our weekly cybersecurity & AI safety briefing.');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage('Subscription failed. Please try again later.');
      }
    }, 400);
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container-custom">
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(1.75rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            background: 'linear-gradient(135deg, rgba(5, 8, 17, 0.95) 0%, rgba(15, 23, 42, 0.8) 100%)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.1)',
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid #00f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00f0ff',
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.25)'
            }}
          >
            <Mail size={24} />
          </div>

          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            WEEKLY EDITORIAL DISPATCH
          </span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, color: '#ffffff', margin: '0.4rem 0 0.75rem' }}>
            Direct Intelligence in Your Inbox
          </h2>

          <p style={{ fontSize: '0.925rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 2rem' }}>
            Zero spam. Zero synthetic noise. Curated vulnerability advisories, AI safety breakdowns, and defensive hardening playbooks delivered weekly.
          </p>

          {status === 'success' ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 1.5rem',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#10b981',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              <CheckCircle2 size={20} />
              <span>{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: '540px', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      flex: '1 1 180px',
                      minWidth: 0,
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(5, 8, 17, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: '2 1 200px',
                      minWidth: 0,
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(5, 8, 17, 0.8)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-cyber-primary"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', justifyContent: 'center' }}
                >
                  <span>{status === 'loading' ? 'Processing...' : 'Subscribe to CyberAI Watch'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {status === 'error' && (
                <div style={{ color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '0.5rem' }}>
                  <AlertCircle size={14} />
                  <span>{message}</span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#64748b', marginTop: '1rem' }}>
                <ShieldCheck size={14} color="#10b981" />
                <span>Strict privacy pledge • One-click unsubscribe anytime at /unsubscribe</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
