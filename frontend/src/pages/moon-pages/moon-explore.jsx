   import MoonHero from '../../components/moon/MoonHero';
   import { useNavigate } from 'react-router-dom';
   import MoonTimeline from '../../components/moon/MoonTimeline';
   import Pioneer4Feature from '../../components/moon/early-programs/Pioneer4Feature';
   import { ScrollReveal } from '../../components/ui/ScrollReveal';

const MoonExplore = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-black text-[#FCF9EC] flex flex-col overflow-x-hidden">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/explore')}
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-5 py-2.5 bg-[#00105B]/90 text-[#FCF9EC] border border-[#6061B6] rounded-full font-bold text-sm uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:bg-[#C9B5E0] hover:text-black hover:border-[#FCF9EC] hover:scale-105 cursor-pointer"
      >
        <span>←</span>
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

      {/* 3D Moon Stage (extracted) */}
      <MoonHero />

      {/* Horizontal Timeline (extracted) */}
      <MoonTimeline />

      {/* Early Robotic Programs Era Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        {/* Era Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.14em] uppercase bg-[#00105B]/85 text-[#C9B5E0] border border-[#6061B6] rounded-full">
              Era Spotlight · 1950s–1970s
            </span>
            <h2 className="text-[clamp(2rem, 4.5vw, 3rem)] font-extrabold mb-4 text-[#FCF9EC] tracking-tight">
              Early Robotic Programs
            </h2>
            <p className="text-lg text-[#C9B5E0] max-w-3xl mx-auto leading-relaxed">
              Before humans set foot on the Moon, robotic pioneers paved the way. These early missions 
              answered critical questions about the lunar surface and proved that landing was possible.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Pioneer 4 Story (extracted) */}
        <Pioneer4Feature />

        {/* Other Early Programs (inline — extract to EarlyProgramsGrid.jsx next) */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-[#FCF9EC]">The Rest of the Pioneers</h3>
            <p className="text-[#C9B5E0] mt-2 max-w-2xl mx-auto">
              The programs that followed Pioneer 4 mapped, crashed, and landed on the Moon—paving the way for Apollo.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal delay={0.1}>
            <div className="h-full p-6 rounded-xl bg-[#00105B]/40 border border-[#6061B6]/30 backdrop-blur-sm hover:border-[#C9B5E0]/50 transition-all duration-300">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#6061B6] shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-[#FCF9EC]">Ranger Program</h4>
                  <p className="text-xs text-[#C9B5E0]/70 font-semibold tracking-wider">1961–1965</p>
                </div>
              </div>
              <p className="text-sm text-[#C9B5E0] leading-relaxed">
                Impactor probes that crashed into the Moon while transmitting close-up photographs. 
                Rangers 7, 8, and 9 returned thousands of high-resolution images before impact.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="h-full p-6 rounded-xl bg-[#00105B]/40 border border-[#6061B6]/30 backdrop-blur-sm hover:border-[#C9B5E0]/50 transition-all duration-300">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#6061B6] shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-[#FCF9EC]">Lunar Orbiter Program</h4>
                  <p className="text-xs text-[#C9B5E0]/70 font-semibold tracking-wider">1966–1967</p>
                </div>
              </div>
              <p className="text-sm text-[#C9B5E0] leading-relaxed">
                Five orbiters that systematically mapped 99% of the lunar surface to identify safe 
                landing sites for Apollo.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="h-full p-6 rounded-xl bg-[#00105B]/40 border border-[#6061B6]/30 backdrop-blur-sm hover:border-[#C9B5E0]/50 transition-all duration-300">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#6061B6] shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-[#FCF9EC]">Surveyor Program</h4>
                  <p className="text-xs text-[#C9B5E0]/70 font-semibold tracking-wider">1966–1968</p>
                </div>
              </div>
              <p className="text-sm text-[#C9B5E0] leading-relaxed">
                Seven robotic soft-landers that tested the Moon's surface strength, proving it could 
                support the weight of Apollo landers.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Legacy (inline — extract to EarlyProgramsLegacy.jsx next) */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#00105B]/60 to-[#6061B6]/20 border border-[#6061B6]/40 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold text-[#FCF9EC] mb-4 text-center">
              The Legacy of Early Robotic Exploration
            </h3>
            <p className="text-[#C9B5E0] leading-relaxed text-center max-w-4xl mx-auto">
              These pioneering missions laid the groundwork for Apollo's success. Without the data from 
              Pioneer, Ranger, Lunar Orbiter, and Surveyor, the Apollo landings would have been impossible.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default MoonExplore;