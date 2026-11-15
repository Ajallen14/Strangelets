import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Resize, Html } from '@react-three/drei';
import MarsCanvas from '../../components/MarsCanvas';


// 3D model of the selected equipment, rendered inline below Mars.
// Mirrors the MoonModel pattern in components/moon/MoonHero.jsx.
function EquipmentModel({ modelPath }) {
  const ref = useRef();
  const { scene } = useGLTF(modelPath);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={ref}>
      <Resize scale={2.6}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Resize>
    </group>
  );
}

const EquipmentModelViewer = ({ modelPath }) => (
  <div className="relative h-72 md:h-[360px] rounded-xl overflow-hidden border border-[#6061B6]/30 cursor-grab active:cursor-grabbing">
    {/* Soft radial glow so dark models don't vanish against the black backdrop */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(96,97,182,0.35),rgba(0,0,0,0.85)_70%)]" />
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 5, 5]} intensity={3} color="#FCF9EC" />
      <directionalLight position={[-5, -2, -5]} intensity={1.4} color="#6061B6" />
      <pointLight position={[0, -3, 4]} intensity={1.2} color="#C9B5E0" />
      <Suspense
        fallback={
          <Html center>
            <span className="text-[#C9B5E0] text-sm font-semibold whitespace-nowrap">
              Loading model...
            </span>
          </Html>
        }
      >
        <EquipmentModel modelPath={modelPath} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </Canvas>
  </div>
);

const MarsPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const contentRef = useRef(null);

  // Jump to the top of the story whenever a marker is clicked.
  useEffect(() => {
    if (selected) contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected]);

  return (
    <main className="relative w-full min-h-screen bg-black text-[#FCF9EC]">
      {/* Header */}
      <header className="relative z-10 w-full max-w-5xl shrink-0 px-4 pt-5 pb-2 md:pt-6">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2 rounded-full border border-[#6061B6] bg-[#00105B]/85 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9B5E0] transition-all duration-300 hover:bg-[#C9B5E0] hover:text-black cursor-pointer"
          >
            <span>←</span>
            <span>Explore</span>
          </button>
        </div>
        <h1 className="my-1 text-center text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-[#FCF9EC]">
          Mars
        </h1>
        <p className="mx-auto max-w-xl px-2 text-center text-[0.9rem] leading-[1.5] text-[#C9B5E0] md:text-[1.05rem]">
          Humanity's discarded machines rest across the red planet — each marker
          below is a last known location.
        </p>
      </header>

      {/* 3D Mars with equipment markers — fills the rest of the first screen */}
      <div className="relative z-10 w-full h-[calc(100vh-11rem)] min-h-[380px] px-2 md:px-8">
        <MarsCanvas onSelect={setSelected} />
      </div>

      {/* Story — flows in the page below Mars, only after a marker is clicked */}
      {selected && (
        <section
          ref={contentRef}
          className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-6"
        >
          <div className={`gap-8 ${selected.model ? 'grid md:grid-cols-12' : ''}`}>
            {selected.model && (
              <div className="md:col-span-5">
                <EquipmentModelViewer modelPath={selected.model} />
              </div>
            )}

            <div className={selected.model ? 'md:col-span-7' : ''}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 className="text-lg font-bold text-[#FCF9EC] md:text-2xl">
                  {selected.title}
                </h2>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C9B5E0] md:text-sm">
                  {selected.year} · {selected.status}
                </span>
              </div>
              {(selected.subsections || [{ paragraphs: selected.paragraphs }]).map(
                (sub, si) => (
                  <div key={si} className={si > 0 ? 'mt-8' : ''}>
                    {sub.heading && (
                      <h3 className="mt-2 text-base font-bold text-[#FCF9EC] md:text-lg">
                        {sub.heading}
                      </h3>
                    )}
                    {sub.paragraphs.filter(Boolean).map((p, i) => (
                      <p
                        key={i}
                        className={`leading-[1.7] text-[#C9B5E0] ${
                          i === 0 ? 'mt-2 text-[0.95rem] font-semibold text-[#FCF9EC] md:text-[1.05rem]' : 'mt-3 text-[0.9rem] md:text-[1rem]'
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default MarsPage;
