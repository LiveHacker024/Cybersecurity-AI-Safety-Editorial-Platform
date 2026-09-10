import React, { useEffect } from 'react';
import { 
  Shield, 
  Award, 
  BookOpen, 
  Mail, 
  MapPin, 
  Phone,
  ExternalLink, 
  Code2, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { YoutubeIcon, LinkedinIcon } from '../components/common/SocialIcons';
import { founderData } from '../data/founder';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';

export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    updateMetaTags({
      title: "About Kunal Rajput — Founder & Editor of HackWithKunal | Founder of VANIX",
      description: "Complete professional profile of Kunal Rajput: Founder & Editor of HackWithKunal, Founder of VANIX, Cybersecurity Professional, and Junior Penetration Tester. Technical skills, experience, and editorial integrity.",
      keywords: "Kunal Rajput, HackWithKunal, VANIX, Cybersecurity Professional, Junior Penetration Tester, AI Safety, Web Development",
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "name": founderData.name,
            "jobTitle": "Founder & Editor — HackWithKunal | Founder — VANIX",
            "description": founderData.bio,
            "image": "https://hackwithkunal.com/assets/founder/founder-photo.png",
            "url": "https://hackwithkunal.com/about",
            "sameAs": [
              founderData.socials.youtube,
              founderData.socials.linkedin
            ]
          },
          generateBreadcrumbSchema([
            { name: "Home", url: "https://hackwithkunal.com" },
            { name: "About", url: "https://hackwithkunal.com/about" }
          ])
        ]
      }
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0 6rem' }}>
      <div className="container-custom" style={{ maxWidth: '1080px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#64748b', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
          <span onClick={() => onNavigate('/')} style={{ cursor: 'pointer', color: '#94a3b8' }}>HOME</span>
          <span>/</span>
          <span style={{ color: '#00f0ff' }}>ABOUT THE FOUNDER</span>
        </nav>

        {/* Hero Card / Profile Header */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 29, 0.98) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '24px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            {/* 16:9 Landscape Founder Photo */}
            <div>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                  background: '#090d1a'
                }}
              >
                <img
                  src="/assets/founder/founder-photo.png"
                  alt="Kunal Rajput, founder and editor of HackWithKunal"
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    objectPosition: 'center 22%',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}>{founderData.name}</div>
                <div style={{ color: '#00f0ff', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                  Founder &amp; Editor — HackWithKunal • Founder — VANIX
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
                  <MapPin size={13} color="#f43f5e" /> {founderData.location}
                </div>
              </div>
            </div>

            {/* Profile Intro & Multi-Role Badges */}
            <div>
              <div className="cyber-badge" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} color="#00f0ff" /> EDITORIAL &amp; PROFESSIONAL PROFILE
              </div>

              <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                {founderData.name}
              </h1>

              {/* Roles Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {founderData.roles.map((r, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      background: 'rgba(30, 41, 59, 0.75)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      color: idx === 0 ? '#00f0ff' : idx === 1 ? '#38bdf8' : '#e2e8f0',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.985rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                {founderData.bio}
              </p>

              {/* Contact & Social CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <a
                  href={`mailto:${founderData.email}`}
                  className="btn-cyber-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Mail size={15} /> Contact Email
                </a>
                <a
                  href={founderData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
                <a
                  href={founderData.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <YoutubeIcon size={15} color="#ef4444" /> YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 1. ABOUT ME */}
        <section className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} color="#00f0ff" /> About Me
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            {founderData.aboutMe}
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.75 }}>
            My work combines rigorous technical analysis of cyber threats with practical engineering—whether building hardened client-side Web Crypto utilities for millions of digital users or architecting responsive, high-performance web applications for emerging brands.
          </p>
        </section>

        {/* 2. PROFESSIONAL EXPERIENCE */}
        <section className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={20} color="#00f0ff" /> Professional Experience
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {founderData.experience.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.75rem',
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '16px',
                  border: '1px solid rgba(56, 189, 248, 0.2)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                      {exp.company}
                    </h3>
                    <div style={{ color: '#00f0ff', fontSize: '0.9rem', fontFamily: 'var(--font-mono)', fontWeight: 600, marginTop: '0.15rem' }}>
                      {exp.role}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38bdf8',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {exp.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      <CheckCircle2 size={15} color="#00f0ff" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 & 4. TECHNICAL SKILLS & DIGITAL SKILLS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Technical Cybersecurity Skills */}
          <section className="glass-panel" style={{ padding: '2rem' }}>
            <h2 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={18} color="#00f0ff" /> Technical &amp; Security Skills
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {founderData.technicalSkills.map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={14} color="#00f0ff" style={{ flexShrink: 0 }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Digital & Content Skills */}
          <section className="glass-panel" style={{ padding: '2rem' }}>
            <h2 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={18} color="#38bdf8" /> Digital &amp; Content Skills
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {founderData.digitalSkills.map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={14} color="#38bdf8" style={{ flexShrink: 0 }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 5 & 6. CERTIFICATIONS & EDUCATION */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Certifications & Training */}
          <section className="glass-panel" style={{ padding: '2rem' }}>
            <h2 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="#00f0ff" /> Certifications &amp; Training
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {founderData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: '10px',
                    border: '1px solid #1e293b'
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.2rem' }}>
                    {cert.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                    {cert.issuer} • {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Languages */}
          <section className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GraduationCap size={18} color="#00f0ff" /> Education
              </h2>
              <div
                style={{
                  padding: '1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '10px',
                  border: '1px solid #1e293b'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Degree
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                  {founderData.education.degree}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  {founderData.education.institution} ({founderData.education.period})
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={16} color="#38bdf8" /> Languages
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {founderData.languages.map((l, idx) => (
                  <div key={idx} style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.85rem' }}>{l.language}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{l.proficiency}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 7. TECHNICAL PROJECTS */}
        <section className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="#00f0ff" /> Technical Projects
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {founderData.projects.map((proj, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '12px',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    {proj.category}
                  </div>
                  <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                    {proj.name}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {proj.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. EDITORIAL INTEGRITY PLEDGE */}
        <section
          className="glass-panel"
          style={{
            padding: '2.5rem',
            marginBottom: '2.5rem',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(6, 13, 27, 0.95) 100%)'
          }}
        >
          <div className="cyber-badge" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={14} color="#00f0ff" /> EDITORIAL INTEGRITY &amp; ETHICS
          </div>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Responsible Security Education Policy
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.985rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            {founderData.editorialPledge}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => onNavigate('/editorial-standards')}
              className="btn-cyber-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              View Full Publishing Principles <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* 9. CONTACT INFORMATION */}
        <section className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={20} color="#00f0ff" /> Contact &amp; Business Inquiries
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}
          >
            <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', border: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Editorial Email
              </div>
              <a href={`mailto:${founderData.email}`} style={{ color: '#00f0ff', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
                {founderData.email}
              </a>
            </div>

            <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', border: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                VANIX Technology Contact
              </div>
              <a href={`tel:${founderData.vanixContact}`} style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} /> {founderData.vanixContact}
              </a>
            </div>

            <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', border: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Professional Network
              </div>
              <a href={founderData.socials.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LinkedinIcon size={14} /> LinkedIn Profile
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
