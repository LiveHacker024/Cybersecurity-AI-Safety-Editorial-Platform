import React from 'react';
import { Lock, ShieldAlert, CheckCircle2, ExternalLink, Terminal, AlertTriangle } from 'lucide-react';

export default function PaidAdvancedModule({ advancedData, onNavigate }) {
  if (!advancedData) return null;

  return (
    <section
      id="advanced-testing-paid"
      className="glass-panel"
      style={{
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
        borderRadius: '14px',
        border: '1px solid rgba(0, 240, 255, 0.35)',
        background: 'radial-gradient(ellipse at top right, rgba(0, 240, 255, 0.08) 0%, rgba(5, 8, 17, 0.95) 100%)',
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
        position: 'relative'
      }}
    >
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              background: 'rgba(0, 240, 255, 0.15)',
              color: '#00f0ff',
              fontSize: '0.75rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Lock size={12} /> ADVANCED TESTING — PAID
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            ADVANCED AUTHORIZED SECURITY TESTING
          </span>
        </div>

        <div style={{ fontSize: '0.75rem', color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          CURATED LAB MODULE
        </div>
      </div>

      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.3 }}>
        {advancedData.title}
      </h3>

      {/* Strict Ethical Testing Notice */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderRadius: '8px',
          background: 'rgba(239, 68, 68, 0.08)',
          borderLeft: '3px solid #ef4444',
          marginBottom: '1.5rem',
          fontSize: '0.825rem',
          color: '#cbd5e1',
          lineHeight: 1.5
        }}
      >
        <strong style={{ color: '#f87171' }}>Ethical Requirement: </strong>
        Execute this advanced testing methodology solely within dedicated authorized laboratory sandboxes, capture-the-flag environments, or staging deployments with documented stakeholder authorization. Never perform testing against production systems without explicit permission.
      </div>

      {/* Grid of Key Technical Metadata */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          padding: '1.15rem',
          borderRadius: '10px',
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '1.5rem',
          fontSize: '0.85rem'
        }}
      >
        <div>
          <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
            Prerequisite Knowledge
          </span>
          <span style={{ color: '#f8fafc', lineHeight: 1.4 }}>{advancedData.prerequisiteKnowledge}</span>
        </div>

        <div>
          <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
            Authorized Target Lab
          </span>
          <span style={{ color: '#00f0ff', fontWeight: 600 }}>{advancedData.authorizedTargetRequirement}</span>
        </div>

        <div>
          <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
            Affected Technology Stacks
          </span>
          <span style={{ color: '#cbd5e1' }}>{advancedData.affectedTechnology}</span>
        </div>
      </div>

      {/* Exact Objective */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
          Exact Assessment Objective
        </h4>
        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
          {advancedData.exactObjective}
        </p>
      </div>

      {/* Step-by-Step Advanced Methodology */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
          Advanced Testing Methodology
        </h4>
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '8px',
            background: 'rgba(3, 7, 18, 0.7)',
            border: '1px solid rgba(56, 189, 248, 0.15)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.825rem',
            color: '#e2e8f0',
            lineHeight: 1.65
          }}
        >
          {advancedData.methodology}
        </div>
      </div>

      {/* Expected Result & Verification */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
          Expected Secure Result & Validation
        </h4>
        <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
          {advancedData.expectedResult}
        </p>
      </div>

      {/* Defensive Engineering & Remediation */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
          Advanced Defensive Engineering & Remediation
        </h4>
        <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
          {advancedData.remediation}
        </p>
      </div>

      {/* References */}
      {advancedData.references && advancedData.references.length > 0 && (
        <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            Authoritative Research:
          </span>
          {advancedData.references.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: '#00f0ff',
                fontSize: '0.78rem',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              <span>{ref.name}</span>
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
