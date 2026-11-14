import React, { Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Resize, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Timeline } from "../../components/ui/timeline";
import { ScrollReveal } from "../../components/ui/ScrollReveal";

// --- 3D Moon Component ---
function MoonModel() {
  const moonRef = useRef();
  const { scene } = useGLTF('/models/moon.glb');

  useFrame((_, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.15; // Slow, continuous rotation
    }
  });

  return (
    <group ref={moonRef}>
      <Resize scale={3.5}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Resize>
    </group>
  );
}

const MoonExplore = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-black text-[#FCF9EC] flex flex-col overflow-x-hidden">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/explore')}
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-5 py-2.5 bg-[#00105B]/90 text-[#FCF9EC] border border-[#6061B6] rounded-full font-bold text-sm uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:bg-[#C9B5E0] hover:text-black hover:border-[#FCF9EC] hover:scale-105 cursor-pointer"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
        <span>Back to Orbit</span>
      </button>

      {/* Page Header */}
      <header className="relative z-10 text-center px-6 pt-24 pb-8 md:pt-32 md:pb-12">
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.14em] uppercase bg-[#00105B]/85 text-[#C9B5E0] border border-[#6061B6] rounded-full">
          Lunar History
        </span>
        <h1 className="text-[clamp(2rem, 5vw, 3.5rem)] font-extrabold mb-4 text-[#FCF9EC] tracking-tight">
          Timeline of Lunar Exploration
        </h1>
        <p className="text-lg text-[#C9B5E0] max-w-2xl mx-auto">
          From early robotic crash-landers to the upcoming Artemis missions, 
          trace the history of humanity's journey to the Moon.
        </p>
      </header>

      {/* 3D Interactive Moon Stage */}
      <div className="relative z-10 w-full max-w-5xl mx-auto h-[70vh] md:h-[50vh] flex justify-center items-center px-4 mb-12">
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={3} color="#FCF9EC" />
            <directionalLight position={[-5, -2, -5]} intensity={1} color="#6061B6" />
            
            <Suspense fallback={<Html center><span className="text-[#C9B5E0] text-sm font-semibold">Loading Lunar Model...</span></Html>}>
              <MoonModel />
            </Suspense>
            
            <OrbitControls enableZoom={true} enablePan={false} rotateSpeed={0.5} minDistance={4} maxDistance={10} />
          </Canvas>
          
          {/* 3D Viewer Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className="text-xs text-[#6061B6] font-semibold uppercase tracking-widest animate-pulse">
              Drag to Rotate • Scroll to Zoom
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Timeline Section with Scroll Reveal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20">
        <Timeline orientation="horizontal" className="mt-8">
          
          {/* 1. Early Robotic Programs */}
          <ScrollReveal delay={0.1}>
            <Timeline.Item label="Early Robotic Programs (1950–70s)" />
          </ScrollReveal>

          {/* 2. The Apollo Program */}
          <ScrollReveal delay={0.2}>
            <Timeline.Item label="The Apollo Program (1961–72)" />
          </ScrollReveal>

          {/* 3. Post-Apollo Robotic & Orbital Missions */}
          <ScrollReveal delay={0.3}>
            <Timeline.Item label="Post-Apollo Missions (1990s–2010s)" />
          </ScrollReveal>

          {/* 4. Modern & Ongoing Exploration */}
          <ScrollReveal delay={0.4}>
            <Timeline.Item label="Modern & Ongoing Exploration (Artemis)" />
          </ScrollReveal>

        </Timeline>
      </div>
    </main>
  );
};

useGLTF.preload('/models/moon.glb');
export default MoonExplore;