import React, { useEffect } from 'react';
import { Shield, Award, BookOpen, Mail, MapPin, CheckCircle, ExternalLink, Code2, Terminal, UserCheck } from 'lucide-react';
import { YoutubeIcon, LinkedinIcon } from '../components/common/SocialIcons';
import { founderData } from '../data/founder';
import { updateMetaTags, generateBreadcrumbSchema } from '../utils/seo';

export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    updateMetaTags({
      title: "About Kunal Rajput & HackWithKunal — Cybersecurity Intelligence",
      description: "Learn about Kunal Rajput, Junior Penetration Tester at ASD Cybersecurity and founder of HackWithKunal. Certifications, research methodology, and editorial mission.",
      keywords: "Kunal Rajput, HackWithKunal, ASD Cybersecurity, Junior Penetration Tester, CEH, VAPT, Cybersecurity",
      schema: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": founderData.name,
        "jobTitle": founderData.role,
        "worksFor": {
          "@type": "Organization",
          "name": "ASD Cybersecurity"
        },
        "url": "https://hackwithkunal.com/about",
        "sameAs": [
          founderData.socials.youtube,
          founderData.socials.linkedin
        ]
      }
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050811', padding: '3.5rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#64748b', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
          <span onClick={() => onNavigate('/')} style={{ cursor: 'pointer', color: '#94a3b8' }}>HOME</span>
          <span>/</span>
          <span style={{ color: '#00f0ff' }}>ABOUT THE FOUNDER</span>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '3rem',
            marginBottom: '3.5rem',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 29, 0.98) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '24px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '200px',
                  height: '200px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '50%',
                  padding: '5px',
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0284c7 100%)',
                  boxShadow: '0 0 35px rgba(0, 240, 255, 0.35)'
                }}
              >
                <img
                  src={founderData.images.avatar}
                  alt={founderData.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <h1 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                {founderData.name}
              </h1>

              <div style={{ fontSize: '0.875rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '0.75rem' }}>
                {founderData.role}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="#f43f5e" /> {founderData.location}
              </div>
            </div>

            <div>
              <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
                <UserCheck size={14} /> FOUNDER PROFILE & MISSION
              </div>

              <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
                Simplifying Ethical Security & AI Safety for the Connected World
              </h2>

              <p style={{ color: '#cbd5e1', fontSize: '0.975rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {founderData.bio}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <a
                  href={founderData.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <YoutubeIcon size={16} /> YouTube Channel
                </a>

                <a
                  href={founderData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <LinkedinIcon size={16} /> LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={18} color="#00f0ff" /> Research Spotlight Video
            </h3>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <video
                src={founderData.images.video}
                controls
                playsInline
                style={{ width: '100%', maxHeight: '260px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.75rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
              Kunal Rajput • Penetration Testing & AI Safety Lab
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={18} color="#00f0ff" /> Core Technical Proficiencies
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {founderData.skills.map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
                  <CheckCircle size={15} color="#00f0ff" style={{ flexShrink: 0 }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '3.5rem' }}>
          <h3 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={20} color="#00f0ff" /> Professional Certifications & Education
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            {founderData.certifications.map((cert, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '10px',
                  border: '1px solid #1e293b'
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
                  {cert.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                  {cert.issuer} • {cert.year}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '1.25rem', background: 'rgba(5, 8, 17, 0.7)', borderRadius: '10px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Academic Degree
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              {founderData.education.degree}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              {founderData.education.institution} ({founderData.education.period})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
