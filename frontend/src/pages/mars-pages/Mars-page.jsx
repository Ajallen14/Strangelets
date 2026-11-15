import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Resize, Html } from '@react-three/drei';
import MarsCanvas from '../../components/MarsCanvas';
import { ScrollReveal } from '../../components/ui/ScrollReveal';


// 3D model of the selected equipment, rendered in the hero card like Moon's.
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

// Hero card on the left of the grid: the 3D model with a caption overlaid,
// matching the Moon page's featured-mission image card.
const EquipmentHeroCard = ({ item }) => (
  <div className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm w-full h-80 md:h-[400px] cursor-grab active:cursor-grabbing">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(96,97,182,0.35),rgba(0,0,0,0.85)_70%)]" />
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 5, 5]} intensity={3} color="#FCF9EC" />
      <directionalLight position={[-5, -2, -5]} intensity={1.4} color="#6061B6" />
      <pointLight position={[0, -3, 4]} intensity={1.2} color="#C9B5E0" />
      <Suspense fallback={<Html center><span className="text-[#C9B5E0] text-sm font-semibold">Loading model...</span></Html>}>
        <EquipmentModel modelPath={item.model} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </Canvas>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
    <div className="absolute bottom-6 left-6 right-6">
      <p className="text-sm font-bold text-[#C9B5E0] tracking-wider uppercase">{item.year}</p>
      <p className="text-2xl font-extrabold text-[#FCF9EC] mt-1">{item.title}</p>
      <p className="text-sm text-[#C9B5E0]/90 mt-1">{item.status}</p>
    </div>
  </div>
);

// Fallback hero card for equipment with no 3D model on file — same shell as
// the model card so the grid keeps its shape.
const NoModelCard = ({ item }) => (
  <div className="relative flex h-80 md:h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(96,97,182,0.35),rgba(0,0,0,0.85)_70%)]" />
    <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-[#C9B5E0]/70">
      Last Known Location
    </span>
    <p className="relative mt-3 text-center text-xl font-bold text-[#FCF9EC] md:text-2xl">
      {item.name}
    </p>
    <p className="relative mt-1 text-sm text-[#C9B5E0]">
      {item.lat}°, {item.lng}° · {item.year}
    </p>
  </div>
);

// "Mission Profile" panel on the right of the grid, as on the Moon page.
// Falls back to the basic fields for items without a stats array.
const MissionProfile = ({ item }) => {
  const stats = item.stats || [
    { label: 'Year', value: item.year },
    { label: 'Status', value: item.status },
    { label: 'Last Known Site', value: item.name, small: true },
  ];
  return (
    <div className="h-full min-h-80 md:min-h-[400px] p-6 rounded-2xl bg-gradient-to-br from-[#00105B]/60 to-[#6061B6]/20 border border-[#6061B6]/40 backdrop-blur-sm flex flex-col justify-center">
      <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9B5E0] mb-5">
        Mission Profile
      </h4>
      <div className="space-y-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex items-baseline justify-between gap-4 ${
              i < stats.length - 1 ? 'pb-3 border-b border-[#6061B6]/20' : ''
            }`}
          >
            <span className="text-xs text-[#C9B5E0]/70 uppercase tracking-wider">{stat.label}</span>
            <span className={`${stat.small ? 'text-sm text-[#C9B5E0]' : 'text-xl text-[#FCF9EC]'} font-bold text-right`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// The story of one equipment item, laid out exactly like a Moon featured mission:
// centered title, hero 3D model + Mission Profile grid, then narrative paragraphs.
const EquipmentStory = ({ item }) => (
  <div className="mb-24">
    {/* Featured Mission Title */}
    <ScrollReveal delay={0.1}>
      <div className="text-center mb-10">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6061B6]">
          Featured Mission
        </span>
        <h3 className="text-[clamp(1.75rem, 3.5vw, 2.5rem)] font-bold text-[#FCF9EC] mt-2">
          {item.title}
        </h3>
      </div>
    </ScrollReveal>

    {/* Hero 3D Model + Mission Profile */}
    <div className="grid md:grid-cols-2 gap-8 items-stretch mb-12">
      <ScrollReveal delay={0.2}>
        {item.model ? (
          <EquipmentHeroCard item={item} />
        ) : (
          <NoModelCard item={item} />
        )}
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <MissionProfile item={item} />
      </ScrollReveal>
    </div>

    {/* Narrative */}
    <div className="max-w-4xl mx-auto space-y-8">
      {(item.subsections || [{ paragraphs: item.paragraphs }]).map((sub, si) => (
        <div key={si}>
          {sub.heading && (
            <ScrollReveal>
              <h4 className="text-xl md:text-2xl font-bold text-[#FCF9EC] mb-4">
                {sub.heading}
              </h4>
            </ScrollReveal>
          )}
          {sub.paragraphs.filter(Boolean).map((p, i) => (
            <ScrollReveal key={`${si}-${i}`}>
              <p className="text-lg text-[#C9B5E0] leading-[1.8]">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>
      ))}
    </div>
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
      <header className="relative z-10 w-full max-w-5xl shrink-0 mx-auto px-4 pt-5 pb-2 md:pt-6 text-center">
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
        <span className="inline-block px-4 py-1.5 mb-4 mt-2 text-xs font-bold tracking-[0.14em] uppercase bg-[#00105B]/85 text-[#C9B5E0] border border-[#6061B6] rounded-full">
          Mars History
        </span>
        <h1 className="text-[clamp(2rem, 5vw, 3.5rem)] font-extrabold mb-4 text-[#FCF9EC] tracking-tight">
          Discarded Machines of Mars
        </h1>
        <p className="text-lg text-[#C9B5E0] max-w-2xl mx-auto">
          Humanity's discarded machines rest across the red planet — each marker below is a last
          known location.
        </p>
      </header>

      {/* 3D Mars with equipment markers — fills the rest of the first screen */}
      <div className="relative z-10 w-full h-[calc(100vh-16rem)] min-h-[380px] px-2 md:px-8">
        <MarsCanvas onSelect={setSelected} />
      </div>

      {/* Story — flows in the page below Mars, only after a marker is clicked */}
      {selected && (
        <section
          ref={contentRef}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16"
        >
          <EquipmentStory key={selected.id} item={selected} />
        </section>
      )}
    </main>
  );
};

export default MarsPage;
