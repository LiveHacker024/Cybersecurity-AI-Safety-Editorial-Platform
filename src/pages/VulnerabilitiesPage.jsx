import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, Filter, ExternalLink, ShieldCheck, Activity, AlertOctagon, Terminal } from 'lucide-react';
import { getAllVulnerabilities } from '../utils/storage';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';
import { recordPageView } from '../utils/analytics';
import SeverityBadge from '../components/common/SeverityBadge';
import AdSlot from '../components/ads/AdSlot';
import { siteConfig } from '../config/site';

export default function VulnerabilitiesPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const allVulns = getAllVulnerabilities();

  useEffect(() => {
    updateMetaTags({
      title: `Vulnerability Tracker & CVE Intelligence — ${siteConfig.name}`,
      description: "Real-time, authentic CVE vulnerability tracking backed by CISA KEV and NVD data. Technical triage, CVSS scores, affected products, and mitigation guides.",
      type: "website",
      schema: generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Vulnerabilities", url: "/vulnerabilities" }
      ])
    });

    recordPageView('/vulnerabilities', 'Vulnerability Tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredVulns = allVulns.filter((v) => {
    const matchesSearch =
      v.cveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      selectedSeverity === 'ALL' || v.severity.toUpperCase() === selectedSeverity.toUpperCase();

    const matchesStatus =
      selectedStatus === 'ALL' || v.exploitationStatus.toLowerCase().includes(selectedStatus.toLowerCase());

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div style={{ background: '#030712', minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container-custom">
        {/* Header */}
        <header
          className="glass-panel"
          style={{
            padding: '3rem 2.5rem',
            borderRadius: '16px',
            marginBottom: '2.5rem',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(239, 68, 68, 0.12) 0%, rgba(5, 8, 17, 0.9) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                padding: '0.2rem 0.65rem',
                borderRadius: '6px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}
            >
              AUTHENTIC CVE REPOSITORY
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              POWERED BY CISA KEV & NVD
            </span>
          </div>

          <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1rem' }}>
            Vulnerability Tracker & CVE Intelligence
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '820px', margin: '0 0 2rem' }}>
            Verified technical vulnerability records with CVSS metrics, proof-of-concept analyses, official vendor advisories, and step-by-step mitigation protocols.
          </p>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by CVE-ID, vendor, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Severity Filter */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '6px',
                    background: selectedSeverity === sev ? '#ef4444' : 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid ' + (selectedSeverity === sev ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'),
                    color: selectedSeverity === sev ? '#ffffff' : '#cbd5e1',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Ad Placement */}
        <AdSlot type="leaderboard" />

        {/* CVE Cards List */}
        {filteredVulns.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '12px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No matching CVE records found</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Try clearing your search filters or searching for another vendor.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {filteredVulns.map((vuln) => (
              <div
                key={vuln.cveId}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderRadius: '14px',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  background: 'rgba(5, 8, 17, 0.85)'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                      {vuln.cveId}
                    </span>
                    <SeverityBadge severity={vuln.severity} cvss={vuln.cvss} />
                  </div>

                  <span style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {vuln.exploitationStatus}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3, marginBottom: '0.85rem' }}>
                  {vuln.name}
                </h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: '8px',
                    marginBottom: '1.25rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Vendor & Product</span>
                    <strong style={{ color: '#f8fafc' }}>{vuln.vendor} — {vuln.product}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Affected Versions</span>
                    <span style={{ color: '#cbd5e1' }}>{vuln.affectedVersions}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Fixed In</span>
                    <span style={{ color: '#10b981', fontWeight: 600 }}>{vuln.fixedVersions}</span>
                  </div>
                </div>

                {/* Mitigation */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.35rem' }}>
                    Remediation & Mitigation:
                  </span>
                  <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                    {vuln.mitigation}
                  </p>
                </div>

                {/* Detection Guidance */}
                {vuln.detectionGuidance && (
                  <div style={{ marginBottom: '1.5rem', padding: '0.85rem', background: 'rgba(0, 240, 255, 0.04)', borderLeft: '3px solid #00f0ff', borderRadius: '0 6px 6px 0' }}>
                    <span style={{ fontSize: '0.72rem', color: '#00f0ff', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.2rem' }}>
                      Detection Guidance / IoC Check:
                    </span>
                    <p style={{ fontSize: '0.825rem', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
                      {vuln.detectionGuidance}
                    </p>
                  </div>
                )}

                {/* References */}
                {vuln.references && vuln.references.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      Authoritative Sources:
                    </span>
                    {vuln.references.map((ref, idx) => (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
