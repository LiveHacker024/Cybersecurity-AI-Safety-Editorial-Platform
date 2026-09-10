import React, { useEffect } from 'react';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    updateMetaTags({
      title: "Privacy Policy — HackWithKunal",
      description: "HackWithKunal privacy policy covering data handling, cookies, Google AdSense, GDPR, and CCPA compliance."
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '820px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <Lock size={14} /> PRIVACY & DATA POLICY
          </div>
          <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Privacy Policy
          </h1>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Last Updated: September 10, 2026
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7 }}>
          <section>
            <h2 className="font-heading" style={{ color: '#00f0ff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Introduction</h2>
            <p>
              HackWithKunal ("we", "our", "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ color: '#00f0ff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. Information We Collect</h2>
            <p>
              We operate on a data-minimization philosophy. We do not require account registration to read our intelligence reports or access defensive security guides. When subscribing to our weekly newsletter, we only collect your email address for newsletter delivery.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ color: '#00f0ff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. Google AdSense & Cookies</h2>
            <p>
              We use Google AdSense to serve ethical advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site based on prior visits to our site or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ color: '#00f0ff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>4. Client-Side Tools Privacy Guarantee</h2>
            <p>
              All interactive tools (including our Password Entropy Analyzer and Phishing URL Inspector) execute 100% locally in your web browser. No inputted passwords, passphrases, or URLs are ever transmitted to our servers or third parties.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ color: '#00f0ff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>5. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact Kunal Rajput at <code style={{ color: '#00f0ff' }}>livehacker024@gmail.com</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
