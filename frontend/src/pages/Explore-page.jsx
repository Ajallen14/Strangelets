import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import OrbitalSystemSection from '../components/OrbitalSystemSection';
import anime from 'animejs/lib/anime.es.js';

/* =========================================================
   FLOATING PARTICLE FIELD (anime.js)
   - Pure white dots drifting slowly behind the 3D scene
   - pointer-events-none so they never block planet clicks
   ========================================================= */
const PARTICLE_COUNT = 55;

const FloatingParticles = () => {
  const containerRef = useRef(null);

  // Generate stable random positions once per mount
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        top: Math.random() * 100,        // % of viewport height
        left: Math.random() * 100,       // % of viewport width
        size: 1 + Math.random() * 2.5,   // 1px - 3.5px
        baseOpacity: 0.25 + Math.random() * 0.55,
        driftX: (Math.random() - 0.5) * 80,  // -40px to +40px
        driftY: (Math.random() - 0.5) * 120, // -60px to +60px
        duration: 6000 + Math.random() * 8000, // 6s - 14s
        delay: Math.random() * 3000,
      })),
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const dots = containerRef.current.querySelectorAll('.space-dot');

    // Animate each dot with its own random drift + opacity pulse
    dots.forEach((dot, i) => {
      const p = particles[i];
      anime({
        targets: dot,
        translateX: [0, p.driftX],
        translateY: [0, p.driftY],
        opacity: [p.baseOpacity, p.baseOpacity * 0.25],
        scale: [1, 1.4],
        duration: p.duration,
        delay: p.delay,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
      });
    });

    // Cleanup: kill all animations on this component's nodes when unmounting
    return () => {
      anime.remove(dots);
    };
  }, [particles]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="space-dot absolute rounded-full bg-white"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.baseOpacity,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.6)`,
          }}
        />
      ))}
    </div>
  );
};

/* =========================================================
   EXPLORE PAGE
   ========================================================= */
const ExplorePage = () => {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleSelectDestination = (path, label) => {
    setSelectedDestination(label);
    // Delay prevents React Three Fiber unmount race condition
    setTimeout(() => {
      navigate(path);
    }, 50);
  };

  return (
    // ✅ Plain black background — no more radial gradient
    <main className="relative w-full h-screen bg-black text-[#FCF9EC] flex flex-col items-center overflow-hidden">

      {/* ✅ Floating white particle field sits behind the 3D canvas */}
      <FloatingParticles />

      {/* Header */}
      <header className="relative z-10 w-full max-w-[720px] text-center px-4 pt-6 pb-2 md:pt-8 md:pb-4 pointer-events-auto shrink-0">
        <span className="inline-block px-4 py-1.5 mb-3 md:mb-5 text-[10px] md:text-xs font-bold tracking-[0.14em] uppercase bg-[#00105B]/85 text-[#C9B5E0] border border-[#6061B6] rounded-full">
          Solar System Orbit
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold my-2 mb-2 md:mb-4 text-[#FCF9EC] tracking-tight leading-tight">
          Earth Orbit
        </h1>
        <p className="text-[0.9rem] md:text-[1.05rem] leading-[1.5] md:leading-[1.6] text-[#C9B5E0] mb-2 md:mb-6 px-2">
          Earth at the center, with the Moon orbiting near and Mars orbiting far,
          set against a deep space black background.
        </p>
      </header>

      {/* 3D Stage — sits ABOVE the particles (z-10 vs z-0) */}
      <div className="relative z-10 w-full max-w-[1200px] flex-1 min-h-0 flex justify-center items-center px-2 md:px-8 pb-4 md:pb-8">
        <OrbitalSystemSection
          showOrbits={true}
          onSelectDestination={handleSelectDestination}
        />
      </div>

      {/* Feedback */}
      {selectedDestination && (
        <div className="relative z-10 shrink-0 pb-4 md:pb-6">
          <p className="text-[0.85rem] md:text-[0.95rem] text-[#C9B5E0]">
            Destination selected:{' '}
            <span className="text-[#FCF9EC] font-bold">{selectedDestination}</span>
          </p>
        </div>
      )}
    </main>
  );
};

export default ExplorePage;