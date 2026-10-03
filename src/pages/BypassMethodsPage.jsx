import React, { useEffect } from 'react';
import { ShieldCheck, Lock, Unlock, AlertTriangle, Key, Layers, Server, Terminal, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import SafeLabNotice from '../components/securityTesting/SafeLabNotice';
import FreeVsPaidNotice from '../components/securityTesting/FreeVsPaidNotice';
import AdSlot from '../components/ads/AdSlot';
import { siteConfig } from '../config/site';

export default function BypassMethodsPage({ onNavigate }) {
  useEffect(() => {
    updateMetaTags({
      title: `Bypass Methods & Defensive Testing Hub — ${siteConfig.name}`,
      description: "Educational and defensive guide to authentication bypass testing, authorization validation, access control flaws, and responsible security remediation.",
      keywords: "bypass methods, authentication bypass, authorization testing, IDOR, access control, defensive security, API security testing, CyberAI Watch",
      url: `${siteConfig.domain}/bypass-methods`,
      type: "website"
    });
    recordPageView('/bypass-methods', 'Bypass Methods & Defensive Testing Hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const verifiedLabs = [
    { name: "OWASP Juice Shop (Auth Labs)", url: "https://owasp.org/www-project-juice-shop/" },
    { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security/authentication" },
    { name: "Damn Vulnerable Web App (DVWA)", url: "https://github.com/digininja/DVWA" },
    { name: "OWASP API Top 10 Practice", url: "https://owasp.org/www-project-api-security/" }
  ];

  const bypassCategories = [
    {
      id: "authentication-bypass",
      title: "Authentication Bypass Defense",
      icon: Key,
      color: "#00f0ff",
      badge: "AUTH TESTING",
      summary: "Analyzing vulnerabilities in authentication workflows that permit unauthorized access, token forgery, or password reset manipulation.",
      concepts: [
        "Session Fixation & Token Leakage prevention",
        "JSON Web Token (JWT) Algorithm Confusion & None-Alg validation",
        "Multi-Factor Authentication (MFA) step-skipping defenses",
        "Password Reset Token predictability & entropy validation"
      ],
      targetRoute: "/security-testing/api-security"
    },
    {
      id: "authorization-access-control",
      title: "Authorization & IDOR Testing",
      icon: Lock,
      color: "#38bdf8",
      badge: "ACCESS CONTROL",
      summary: "Defending against Broken Object Level Authorization (BOLA/IDOR) and Broken Function Level Authorization (BFLA) across APIs.",
      concepts: [
        "Insecure Direct Object References (IDOR) defense",
        "Privilege escalation via HTTP parameter pollution",
        "Role-Based Access Control (RBAC) server-side enforcement",
        "GraphQL alias & query depth permission auditing"
      ],
      targetRoute: "/security-testing/web-security"
    },
    {
      id: "input-filter-bypass",
      title: "Input Validation & Filter Bypass",
      icon: Layers,
      color: "#34d399",
      badge: "INPUT SANITIZATION",
      summary: "Mitigating path traversal, NULL-byte injection, and encoding tricks used to bypass poorly implemented input filters.",
      concepts: [
        "Path traversal normalization (CWE-22) & canonicalization",
        "NULL-byte character neutralization (CWE-158)",
        "Double URL encoding & unicode normalization defense",
        "Strict allow-listing vs flawed block-list architectures"
      ],
      targetRoute: "/security-testing/web-security"
    },
    {
      id: "client-vs-server",
      title: "Client-Side vs Server-Side Enforcement",
      icon: Server,
      color: "#c084fc",
      badge: "SERVER DEFENSE",
      summary: "Why client-side validation alone provides zero security and how to build deterministic server-side authorization controls.",
      concepts: [
        "Mobile runtime hooking (Frida/Objection) resilience",
        "Never trusting client-supplied role parameters (e.g., isAdmin=true)",
        "API Gateway & Microservice zero-trust identity propagation",
        "Cryptographic state verification with origin-bound tokens"
      ],
      targetRoute: "/security-testing/mobile-security"
    }
  ];

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '1180px' }}>
        {/* Header Badge & Title */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3rem' }}>
          <div className="cyber-badge-cyan" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <ShieldCheck size={14} /> DEFENSIVE SECURITY & TESTING METHODOLOGY
          </div>
          
          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '1.25rem'
            }}
          >
            Bypass Methods & <span className="gradient-text-cyan">Defensive Validation</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            An educational knowledge base exploring authentication bypass vectors, access control flaws, input normalization, and defensive engineering to harden applications against unauthorized exploitation.
          </p>
        </div>

        {/* Responsible Security & Safe Lab Notice */}
        <SafeLabNotice
          verifiedLabs={verifiedLabs}
          title="Educational Scope — Authorized Security Audits Only"
        />

        {/* Ad Slot */}
        <AdSlot type="top-article" />

        {/* 4 Core Pillars Grid */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                CORE DEFENSE MODULES
              </span>
              <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Architectural Breakdown of Common Bypass Vectors
              </h2>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '1.75rem'
            }}
          >
            {bypassCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="glass-panel"
                  style={{
                    padding: '1.75rem',
                    borderRadius: '14px',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'rgba(15, 23, 42, 0.75)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '10px',
                          background: 'rgba(0, 240, 255, 0.1)',
                          border: `1px solid ${cat.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 15px rgba(0, 240, 255, 0.15)`
                        }}
                      >
                        <Icon size={22} color={cat.color} />
                      </div>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: cat.color,
                          background: 'rgba(0, 240, 255, 0.08)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          border: `1px solid rgba(56, 189, 248, 0.25)`
                        }}
                      >
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.65rem' }}>
                      {cat.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {cat.summary}
                    </p>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                        Defensive Testing Checkpoints:
                      </span>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {cat.concepts.map((concept, idx) => (
                          <li key={idx} style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '0.45rem', lineHeight: 1.4 }}>
                            <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate(cat.targetRoute)}
                    className="btn-cyber-secondary"
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      padding: '0.65rem 1rem',
                      fontSize: '0.825rem',
                      fontWeight: 700
                    }}
                  >
                    <span>Explore Testing Hub Labs</span>
                    <ArrowRight size={14} color="#00f0ff" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Free vs Paid Tier Architecture Notice */}
        <FreeVsPaidNotice />

        {/* In-Content Ad Placement */}
        <AdSlot type="in-content" />

        {/* Defensive Engineering Principles Section */}
        <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.25)', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <Terminal size={22} color="#00f0ff" />
            <h3 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Defensive Principles for Eliminating Bypass Flaws
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#00f0ff', marginBottom: '0.5rem' }}>
                1. Principle of Complete Mediation
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Every single request to an API endpoint or web resource must be checked for valid authentication and authorization on the server side, without relying on client-side state or cached assumption.
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
                2. Canonical Input Normalization
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Before applying input filters or access rules, decode and canonicalize all input strings once. Stripping sequences iteratively often introduces double-encoding traversal bypasses.
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>
                3. Deny by Default
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Access control systems must fail closed. If a permission rule cannot be evaluated or an unexpected parameter format is encountered, default immediately to HTTP 403 Forbidden.
              </p>
            </div>
          </div>
        </div>

        {/* Hub Link Card */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid #00f0ff',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(15, 23, 42, 0.9) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              Ready to Practice in Authorized Labs?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0, maxWidth: '600px' }}>
              Explore our comprehensive 53-entry Security Testing Knowledge Hub covering Web Security, API Security, and Mobile Security.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/security-testing')}
            className="btn-cyber-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', fontWeight: 800 }}
          >
            <span>Open Security Testing Hub</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
