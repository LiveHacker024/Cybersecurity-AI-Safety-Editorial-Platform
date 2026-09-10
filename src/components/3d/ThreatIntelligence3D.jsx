import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { threatNodesData } from '../../data/threats';
import { ShieldCheck, AlertTriangle, Cpu, Lock, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export default function ThreatIntelligence3D() {
  const [selectedThreat, setSelectedThreat] = useState(threatNodesData[0]);
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'low-power' });
    } catch (e) {
      console.warn("WebGL not supported for Threat Intelligence Canvas", e);
      return;
    }

    const width = currentMount.clientWidth || 600;
    const height = currentMount.clientHeight || 480;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    currentMount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 5, 24);
    camera.lookAt(0, 0, 0);

    // Defense Grid Ground
    const gridHelper = new THREE.GridHelper(26, isMobile ? 14 : 26, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = -6;
    scene.add(gridHelper);

    // Central Shield Core Mesh
    const shieldGroup = new THREE.Group();
    scene.add(shieldGroup);

    // Central Prism / Shield Geometry
    const shieldGeo = new THREE.CylinderGeometry(0.1, 3.5, 6, 6, 1);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.rotation.x = Math.PI;
    shieldGroup.add(shieldMesh);

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(1.8, isMobile ? 8 : 16, isMobile ? 8 : 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    shieldGroup.add(coreMesh);

    // Six Orbiting Threat Nodes
    const nodeCount = 6;
    const nodeMeshes = [];
    const orbitRadius = 9.5;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      const y = Math.sin(i * 1.5) * 1.5;

      const nGeo = new THREE.DodecahedronGeometry(0.8, 0);
      const nMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x00f0ff : (i === 2 ? 0xf43f5e : 0x38bdf8),
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      const nodeMesh = new THREE.Mesh(nGeo, nMat);
      nodeMesh.position.set(x, y, z);
      shieldGroup.add(nodeMesh);
      nodeMeshes.push({ mesh: nodeMesh, angle, yBase: y });

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.25
      });
      const line = new THREE.Line(lineGeo, lineMat);
      shieldGroup.add(line);
    }

    // Threat Pulses
    const pulseCount = isMobile ? 12 : 30;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);

    for (let i = 0; i < pulseCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 8;
      pulsePositions[i * 3] = Math.cos(angle) * r;
      pulsePositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pulsePositions[i * 3 + 2] = Math.sin(angle) * r;
    }

    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: 0xf43f5e,
      size: 0.2,
      transparent: true,
      opacity: 0.85
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    shieldGroup.add(pulsePoints);

    // Animation loop with reduced-motion support
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return; // Render static frame
      }

      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      shieldGroup.rotation.y = time * 0.1;
      shieldMesh.rotation.y = time * 0.2;
      coreMesh.rotation.z = -time * 0.3;

      nodeMeshes.forEach((item, idx) => {
        item.mesh.rotation.x = time + idx;
        item.mesh.rotation.y = time * 1.5;
        item.mesh.position.y = item.yBase + Math.sin(time * 2 + idx) * 0.4;
      });

      gridHelper.position.z = (time * 0.5) % 1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shieldGeo.dispose();
      shieldMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
    };
  }, []);

  return (
    <section style={{ position: 'relative', padding: '5rem 0', overflow: 'hidden' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '0.85rem' }}>
            <ShieldCheck size={14} /> THREAT INTELLIGENCE MATRIX
          </div>
          <h2 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Interactive <span className="gradient-text-cyan">Global Threat Radar</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Defensive taxonomy and architectural analysis of adversarial vectors targeting cloud infrastructure, artificial intelligence agents, and enterprise perimeters.
          </p>
        </div>

        {/* 2D Interactive Threat Selection Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '2.5rem'
          }}
        >
          {threatNodesData.map((threat) => {
            const isSelected = selectedThreat.id === threat.id;
            return (
              <button
                key={threat.id}
                onClick={() => setSelectedThreat(threat)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: isSelected ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                  color: isSelected ? '#00f0ff' : '#94a3b8',
                  border: isSelected ? '1px solid #00f0ff' : '1px solid #1e293b',
                  boxShadow: isSelected ? '0 0 18px rgba(0, 240, 255, 0.3)' : 'none'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: threat.severity === 'CRITICAL' ? '#f43f5e' : (threat.severity === 'HIGH' ? '#f59e0b' : '#38bdf8'),
                    boxShadow: `0 0 8px ${threat.severity === 'CRITICAL' ? '#f43f5e' : '#38bdf8'}`
                  }}
                />
                {threat.label}
              </button>
            );
          })}
        </div>

        {/* 3D Visualizer & Dynamic Detail Panel Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          {/* Left: 3D Threat Scene */}
          <div
            className="glass-panel"
            style={{
              position: 'relative',
              height: '460px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '1.5rem',
              border: '1px solid rgba(56, 189, 248, 0.2)'
            }}
          >
            <div
              ref={mountRef}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.15,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              <video
                src="/assets/videos/firewall.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(5, 8, 17, 0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                border: '1px solid rgba(56, 189, 248, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#00f0ff' }}>
                <Activity size={14} />
                SHIELD STATUS: DEFENSE ENCLAVE
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                6 VECTORS MONITORED
              </div>
            </div>
          </div>

          {/* Right: Selected Threat Detail Brief */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              borderLeft: `4px solid ${selectedThreat.severity === 'CRITICAL' ? '#f43f5e' : (selectedThreat.severity === 'HIGH' ? '#f59e0b' : '#00f0ff')}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span
                  className="cyber-badge"
                  style={{
                    background: selectedThreat.severity === 'CRITICAL' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(0, 240, 255, 0.15)',
                    color: selectedThreat.severity === 'CRITICAL' ? '#fb7185' : '#00f0ff',
                    borderColor: selectedThreat.severity === 'CRITICAL' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(0, 240, 255, 0.4)'
                  }}
                >
                  <AlertTriangle size={12} /> {selectedThreat.severity} IMPACT
                </span>
                <h3 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.65rem', color: '#f8fafc' }}>
                  {selectedThreat.title}
                </h3>
              </div>

              <div
                style={{
                  textAlign: 'right',
                  padding: '0.5rem 0.85rem',
                  background: 'rgba(15, 23, 42, 0.8)',
                  borderRadius: '8px',
                  border: '1px solid #1e293b'
                }}
              >
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', textTransform: 'uppercase' }}>
                  {selectedThreat.scoreLabel || 'Reference CVSS'}
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: selectedThreat.severity === 'CRITICAL' ? '#f43f5e' : '#00f0ff' }}>
                  {selectedThreat.riskScore}
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              {selectedThreat.description}
            </p>

            {/* Active Vectors */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                Attack Vector Signatures
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {selectedThreat.activeVectors.map((v, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(30, 41, 59, 0.7)',
                      color: '#cbd5e1',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      border: '1px solid #334155'
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Defensive Mitigations */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#00f0ff', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lock size={13} /> Recommended Defensive Countermeasures
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedThreat.countermeasures.map((cm, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: '#e2e8f0' }}>
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <span>{cm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
