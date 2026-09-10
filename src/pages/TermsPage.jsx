import React, { useEffect } from 'react';
import { Scale, ShieldAlert, Lock } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    updateMetaTags({
      title: "Terms of Service & Disclaimer — HackWithKunal",
      description: "Terms of service, educational disclaimer, and ethical use policies for HackWithKunal."
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '820px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <Scale size={14} /> TERMS OF SERVICE
          </div>
          <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Terms of Service & Disclaimer
          </h1>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Effective Date: September 10, 2026
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7 }}>
          <section>
            <h2 className="font-heading" style={{ color: '#00f0ff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Educational Purpose Only</h2>
            <p>
              The content published on HackWithKunal is intended exclusively for educational, defensive, and research purposes. Readers are responsible for adhering to all applicable regional, national, and international laws regarding cybersecurity and computer misuse.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ color: '#00f0ff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. Non-Liability for Misuse</h2>
            <p>
              Under no circumstances shall HackWithKunal, its founder Kunal Rajput, or its contributors be held liable for any damages resulting from the misuse of technical concepts, defensive guides, or architectural security configurations detailed on this site.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ color: '#00f0ff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. Intellectual Property</h2>
            <p>
              All original articles, analyses, diagrams, and code snippets are the intellectual property of HackWithKunal and Kunal Rajput unless otherwise attributed. You may share excerpts with explicit attribution and link back to the canonical source URL.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
