import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#38bdf8', '#10b981']
    });
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container-custom">
        <div
          className="glass-panel"
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 29, 0.98) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.1)'
          }}
        >
          {/* Top Badge */}
          <div className="cyber-badge" style={{ marginBottom: '1.25rem' }}>
            <Mail size={14} /> WEEKLY INTEL BRIEFING
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}
          >
            Stay Ahead of the <span className="gradient-text-cyan">Threat</span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '620px',
              margin: '0 auto 2.25rem',
              lineHeight: 1.6
            }}
          >
            Get important cybersecurity, AI safety and privacy stories without the noise.
          </p>

          {subscribed ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#34d399',
                fontWeight: 700,
                fontSize: '1.05rem'
              }}
            >
              <CheckCircle size={22} />
              <span>You're Subscribed! Security briefing will arrive in your inbox.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                maxWidth: '520px',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                justifyContent: 'center'
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: '1 1 280px',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '10px',
                  background: 'rgba(5, 8, 17, 0.8)',
                  border: '1px solid #1e293b',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00f0ff'}
                onBlur={(e) => e.target.style.borderColor = '#1e293b'}
              />

              <button
                type="submit"
                className="btn-cyber-primary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1.5rem',
              fontSize: '0.78rem',
              color: '#64748b'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Lock size={12} /> Privacy Guaranteed
            </span>
            <span>•</span>
            <span>Zero Tracking Pixels</span>
            <span>•</span>
            <span>Unsubscribe Anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
