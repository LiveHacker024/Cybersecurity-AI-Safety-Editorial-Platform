import React, { useState } from 'react';
import { Shield, KeyRound, Globe, AlertTriangle, CheckCircle2, RefreshCw, Lock, Sparkles, Copy, Check, Info } from 'lucide-react';

export default function SecurityToolsSuite() {
  const [activeTab, setActiveTab] = useState('password');

  // Password Entropy State
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  // Phishing URL Inspector State
  const [urlInput, setUrlInput] = useState('');
  const [urlReport, setUrlReport] = useState(null);

  // Calculate Password Entropy (100% Client-Side)
  const calculateEntropy = (str) => {
    if (!str) return { entropy: 0, score: 0, crackTime: '0 seconds', label: 'Empty' };

    let pool = 0;
    if (/[a-z]/.test(str)) pool += 26;
    if (/[A-Z]/.test(str)) pool += 26;
    if (/[0-9]/.test(str)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(str)) pool += 33;

    const entropy = Math.round(str.length * (Math.log2(pool || 1)));

    let score = 0;
    let label = 'Very Weak';
    let crackTime = 'Instant';

    if (entropy > 80) {
      score = 4;
      label = 'Cryptographically Robust';
      crackTime = 'Centuries (GPU Cluster resistant)';
    } else if (entropy > 60) {
      score = 3;
      label = 'Strong';
      crackTime = 'Several Years';
    } else if (entropy > 40) {
      score = 2;
      label = 'Moderate';
      crackTime = 'A Few Days';
    } else if (entropy > 25) {
      score = 1;
      label = 'Weak';
      crackTime = 'A Few Minutes';
    }

    return { entropy, score, crackTime, label };
  };

  const entropyData = calculateEntropy(password);

  // Generate strong random passphrase (Client-Side)
  const generatePassphrase = () => {
    const words = [
      "quantum", "shield", "nebula", "cipher", "beacon", "crypto",
      "vector", "enclave", "matrix", "orbital", "sentinel", "vertex",
      "granite", "aurora", "dynamo", "solaris", "titan", "falcon"
    ];
    const picked = [
      words[Math.floor(Math.random() * words.length)],
      words[Math.floor(Math.random() * words.length)],
      words[Math.floor(Math.random() * words.length)],
      Math.floor(100 + Math.random() * 900),
      "#"
    ].join("-");
    setPassword(picked);
  };

  // Analyze URL Heuristics (100% Client-Side Parser)
  const analyzeUrl = (e) => {
    e.preventDefault();
    if (!urlInput) return;

    let target = urlInput.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }

    try {
      const parsed = new URL(target);
      const hostname = parsed.hostname.toLowerCase();

      const findings = [];
      let riskLevel = 'LOW RISK / LEGITIMATE STRUCTURE';
      let riskScore = 95;

      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
        findings.push({ severity: 'CRITICAL', text: 'Uses direct numeric IP address instead of registered domain name.' });
        riskScore -= 50;
      }

      const suspiciousTLDs = ['.xyz', '.top', '.buzz', '.work', '.click', '.fit', '.cfd'];
      if (suspiciousTLDs.some(tld => hostname.endsWith(tld))) {
        findings.push({ severity: 'HIGH', text: `Uses high-risk top-level domain (${hostname.slice(hostname.lastIndexOf('.'))}).` });
        riskScore -= 30;
      }

      const majorBrands = ['paypal', 'apple', 'google', 'microsoft', 'netflix', 'amazon', 'bankofamerica', 'wellsfargo', 'chase'];
      const matchedBrand = majorBrands.find(b => hostname.includes(b));
      if (matchedBrand && !hostname.endsWith(`${matchedBrand}.com`) && !hostname.endsWith(`${matchedBrand}.net`)) {
        findings.push({ severity: 'CRITICAL', text: `Contains brand name "${matchedBrand}" inside deceptive subdomain or lookalike domain.` });
        riskScore -= 60;
      }

      if (hostname.split('.').length > 4) {
        findings.push({ severity: 'MEDIUM', text: 'Excessive subdomain depth often used in reverse-proxy phishing kits (e.g. Evilginx).' });
        riskScore -= 20;
      }

      if (/0|1/.test(hostname) && (hostname.includes('g00gle') || hostname.includes('micr0s0ft') || hostname.includes('paypa1'))) {
        findings.push({ severity: 'CRITICAL', text: 'Typosquatting substitution detected (Leetspeak character substitution).' });
        riskScore -= 60;
      }

      if (findings.length === 0) {
        findings.push({ severity: 'CLEAN', text: 'Standard domain structure with clean URL parameters.' });
      }

      if (riskScore < 50) riskLevel = 'CRITICAL / LIKELY PHISHING LURE';
      else if (riskScore < 80) riskLevel = 'SUSPICIOUS / PROCEED WITH CAUTION';

      setUrlReport({
        hostname,
        protocol: parsed.protocol,
        pathname: parsed.pathname,
        riskScore: Math.max(riskScore, 5),
        riskLevel,
        findings
      });
    } catch (err) {
      setUrlReport({
        hostname: urlInput,
        riskScore: 10,
        riskLevel: 'MALFORMED URL STRUCTURE',
        findings: [{ severity: 'CRITICAL', text: 'Invalid URL string format.' }]
      });
    }
  };

  return (
    <section style={{ padding: '4.5rem 0', background: '#050811' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '0.85rem' }}>
            <Lock size={14} /> DEFENSIVE UTILITY SUITE
          </div>
          <h2 className="font-heading" style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.85rem' }}>
            Interactive <span className="gradient-text-cyan">Cybersecurity Tools</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            100% Client-Side, Zero-Telemetry security assessment utilities. Your input data never leaves your local browser sandbox.
          </p>
        </div>

        {/* Educational Privacy & Disclaimer Banner */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto 2.5rem',
            padding: '0.85rem 1.25rem',
            background: 'rgba(14, 165, 233, 0.08)',
            borderRadius: '10px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.825rem',
            color: '#cbd5e1'
          }}
        >
          <Info size={18} color="#00f0ff" style={{ flexShrink: 0 }} />
          <div>
            <strong>EDUCATIONAL UTILITY NOTICE:</strong> These tools are provided strictly for educational demonstration and awareness. They do not constitute formal security audits or certified penetration testing. No entered passwords or URLs are stored or transmitted to any server.
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('password')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: activeTab === 'password' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              color: activeTab === 'password' ? '#00f0ff' : '#94a3b8',
              border: activeTab === 'password' ? '1px solid #00f0ff' : '1px solid #1e293b',
              boxShadow: activeTab === 'password' ? '0 0 15px rgba(0, 240, 255, 0.2)' : 'none'
            }}
          >
            <KeyRound size={16} /> Password Entropy Analyzer
          </button>

          <button
            onClick={() => setActiveTab('phishing')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: activeTab === 'phishing' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              color: activeTab === 'phishing' ? '#00f0ff' : '#94a3b8',
              border: activeTab === 'phishing' ? '1px solid #00f0ff' : '1px solid #1e293b',
              boxShadow: activeTab === 'phishing' ? '0 0 15px rgba(0, 240, 255, 0.2)' : 'none'
            }}
          >
            <Globe size={16} /> Phishing URL Inspector
          </button>
        </div>

        {/* Tab 1: Password Analyzer */}
        {activeTab === 'password' && (
          <div
            className="glass-panel"
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              padding: 'clamp(1.25rem, 3vw, 2.5rem)',
              border: '1px solid rgba(56, 189, 248, 0.25)'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.5rem' }}>
                ENTER PASSPHRASE TO CALCULATE ENTROPY BITS:
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Type a sample password or generated passphrase..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    flex: '1 1 220px',
                    minWidth: 0,
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(5, 8, 17, 0.9)',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    color: '#00f0ff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.05rem',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={generatePassphrase}
                  className="btn-cyber-secondary"
                  style={{ padding: '0.85rem 1.25rem', flexShrink: 0 }}
                >
                  <RefreshCw size={16} /> Generate Passphrase
                </button>
              </div>
            </div>

            {/* Entropy Meter */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                padding: '1.5rem',
                background: 'rgba(5, 8, 17, 0.6)',
                borderRadius: '12px',
                border: '1px solid #1e293b',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>ENTROPY RATING</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: entropyData.score > 2 ? '#34d399' : (entropyData.score > 1 ? '#fbbf24' : '#fb7185') }}>
                  {entropyData.entropy} Bits
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{entropyData.label}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>ESTIMATED BRUTE-FORCE RESISTANCE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem' }}>
                  {entropyData.crackTime}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Theoretical 100B Guesses/Sec Benchmark</div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              <strong style={{ color: '#f8fafc' }}>Defensive Recommendation:</strong> Use long 4-word random passphrases (e.g. <code style={{ color: '#00f0ff' }}>quantum-shield-matrix-928#</code>) combined with an open-source password manager and FIDO2 Passkeys.
            </div>
          </div>
        )}

        {/* Tab 2: Phishing Inspector */}
        {activeTab === 'phishing' && (
          <div
            className="glass-panel"
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              padding: 'clamp(1.25rem, 3vw, 2.5rem)',
              border: '1px solid rgba(56, 189, 248, 0.25)'
            }}
          >
            <form onSubmit={analyzeUrl} style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '0.5rem' }}>
                PASTE SUSPICIOUS URL OR DOMAIN TO INSPECT HEURISTICS:
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="e.g. https://login.microsoft.verify-secure-portal.xyz/auth"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  style={{
                    flex: '1 1 220px',
                    minWidth: 0,
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(5, 8, 17, 0.9)',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn-cyber-primary" style={{ padding: '0.85rem 1.5rem', flexShrink: 0 }}>
                  Inspect URL
                </button>
              </div>
            </form>

            {urlReport && (
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  background: 'rgba(5, 8, 17, 0.85)',
                  border: `1px solid ${urlReport.riskScore < 50 ? '#f43f5e' : (urlReport.riskScore < 80 ? '#f59e0b' : '#10b981')}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>INSPECTED HOSTNAME</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#00f0ff' }}>
                      {urlReport.hostname}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      background: urlReport.riskScore < 50 ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: urlReport.riskScore < 50 ? '#fb7185' : '#34d399',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {urlReport.riskLevel}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {urlReport.findings.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: '0.875rem',
                        color: f.severity === 'CRITICAL' ? '#fb7185' : (f.severity === 'HIGH' ? '#fbbf24' : '#cbd5e1')
                      }}
                    >
                      {f.severity === 'CRITICAL' ? (
                        <AlertTriangle size={16} color="#f43f5e" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                      ) : (
                        <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                      )}
                      <span>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
