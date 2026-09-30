import React from 'react';
import { CheckCircle2, Lock, Shield, BookOpen } from 'lucide-react';

export default function FreeVsPaidNotice() {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        background: 'rgba(5, 8, 17, 0.9)',
        marginBottom: '2.5rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
        <BookOpen size={20} color="#00f0ff" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
          Educational Access & Tier Architecture
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {/* Free Tier Card */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#10b981',
                padding: '0.2rem 0.5rem',
                background: 'rgba(16, 185, 129, 0.15)',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              FREE ACCESS
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
              Core Knowledge & Baseline Labs
            </span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem', color: '#cbd5e1' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" /> Full technical definitions & root cause analysis
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" /> Beginner defensive & authorized testing methodology
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" /> Safe test input examples with mock placeholders
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" /> Detection logic & indicator checklist
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" /> Expected secure vs vulnerable behaviors
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" /> Developer remediation & prevention checklists
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" /> Authoritative OWASP & MITRE CWE citations
            </li>
          </ul>
        </div>

        {/* Paid Advanced Tier Card */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '10px',
            background: 'rgba(0, 240, 255, 0.04)',
            border: '1px solid rgba(0, 240, 255, 0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#00f0ff',
                padding: '0.2rem 0.5rem',
                background: 'rgba(0, 240, 255, 0.15)',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Lock size={11} /> ADVANCED TESTING — PAID
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
              Deep Technical Modules
            </span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem', color: '#cbd5e1' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={13} color="#00f0ff" /> Advanced request manipulation & normalization testing
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={13} color="#00f0ff" /> Complex multi-service attack-path analysis
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={13} color="#00f0ff" /> Defensive WAF & rate-limiter behavioral telemetry
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={13} color="#00f0ff" /> Advanced single-packet concurrency & race condition test rigs
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={13} color="#00f0ff" /> Deep lab walkthroughs with microservice environments
            </li>
          </ul>

          <div style={{ marginTop: '0.85rem', padding: '0.45rem 0.65rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.6)', fontSize: '0.72rem', color: '#94a3b8' }}>
            * All advanced testing modules are framed strictly for authorized assessment and defensive engineering.
          </div>
        </div>
      </div>
    </div>
  );
}
