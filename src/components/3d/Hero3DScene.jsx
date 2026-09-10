import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DScene() {
  const mountRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'low-power' });
    } catch (e) {
      console.warn("WebGL not supported, falling back to 2D background video", e);
      return;
    }

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    currentMount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 28;

    // Center Shield / Core Hologram Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(5, isMobile ? 0 : 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icosahedron);

    // Outer Octahedron Shield
    const octGeo = new THREE.OctahedronGeometry(7, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const octahedron = new THREE.Mesh(octGeo, octMat);
    coreGroup.add(octahedron);

    // Orbiting Ring
    const ringGeo1 = new THREE.TorusGeometry(8.5, 0.04, 12, isMobile ? 40 : 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // Floating Threat Particle Cloud
    const particleCount = isMobile ? 40 : 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 6 + Math.random() * 10;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      if (prefersReducedMotion || isMobile) return;
      const rect = currentMount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / width - 0.5;
      const y = (event.clientY - rect.top) / height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreGroup.rotation.y = elapsedTime * 0.12 + targetX * 0.4;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.08 - targetY * 0.4;

      icosahedron.rotation.x = elapsedTime * 0.15;
      octahedron.rotation.y = -elapsedTime * 0.08;
      ring1.rotation.z = elapsedTime * 0.15;
      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Background High-Tech Cybersecurity Video Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.28,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <video
          ref={videoRef}
          src="/assets/videos/hero-banner.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Three.js Interactive Canvas Layer */}
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Cyber Radial Vignette Overlay to ensure text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(5,8,17,0.4) 0%, rgba(5,8,17,0.92) 80%, #050811 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
