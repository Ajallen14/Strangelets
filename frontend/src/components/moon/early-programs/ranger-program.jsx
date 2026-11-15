import React from 'react';
import { ScrollReveal } from '../../ui/ScrollReveal';

const MISSION_STATS = [
  { label: 'Total Images', value: '17,000+' },
  { label: 'Success Rate', value: '3 of 9' },
  { label: 'Ranger 7 Images', value: '4,316' },
  { label: 'Ranger 9 Images', value: '5,814' },
  { label: 'Program Span', value: '1961–1965', small: true },
];

const RangerProgram = ({
  heroImagePath = '/models/3D-moon-assets/Ranger.jpg',
}) => {
  return (
    <div className="mb-24">
      {/* Featured Mission Title */}
      <ScrollReveal delay={0.1}>
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6061B6]">
            Featured Mission
          </span>
          <h3 className="text-[clamp(1.75rem, 3.5vw, 2.5rem)] font-bold text-[#FCF9EC] mt-2">
            Rangers 7, 8 & 9: The Spacecraft That Died Taking Pictures
          </h3>
        </div>
      </ScrollReveal>

      {/* Hero Image + Stats Panel */}
      <div className="grid md:grid-cols-5 gap-8 items-start mb-12">
        <ScrollReveal delay={0.2} className="md:col-span-3">
          <div className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm w-full h-80 md:h-[400px]">
            <img
              src={heroImagePath}
              alt="Ranger spacecraft approaching the Moon"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm font-bold text-[#C9B5E0] tracking-wider uppercase">July 31, 1964</p>
              <p className="text-2xl font-extrabold text-[#FCF9EC] mt-1">Ranger 7</p>
              <p className="text-sm text-[#C9B5E0]/90 mt-1">
                The first Ranger to survive the fall — and the first to send back pictures
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="md:col-span-2">
          <div className="h-full min-h-80 md:min-h-[400px] p-6 rounded-2xl bg-gradient-to-br from-[#00105B]/60 to-[#6061B6]/20 border border-[#6061B6]/40 backdrop-blur-sm flex flex-col justify-center">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9B5E0] mb-5">
              Mission Profile
            </h4>
            <div className="space-y-4">
              {MISSION_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-baseline justify-between ${
                    i < MISSION_STATS.length - 1 ? 'pb-3 border-b border-[#6061B6]/20' : ''
                  }`}
                >
                  <span className="text-xs text-[#C9B5E0]/70 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span
                    className={`${
                      stat.small ? 'text-sm text-[#C9B5E0]' : 'text-xl text-[#FCF9EC]'
                    } font-bold`}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Narrative */}
      <div className="max-w-4xl mx-auto space-y-8">
        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Before anyone could walk on the Moon, someone had to look at it. Really look. From Earth,
            the lunar surface was a blur. Was it solid rock? Deep dust? Nobody knew whether an
            astronaut's boots would hold. So NASA's Jet Propulsion Laboratory built the Ranger
            spacecraft with a simple, brutal purpose: <span className="text-[#FCF9EC] font-semibold">
            fly straight at the Moon, take pictures the whole way down, and keep transmitting until
            the very last second.</span>
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="relative pl-8 border-l-2 border-[#6061B6] py-4">
            <p className="text-2xl md:text-3xl font-bold text-[#FCF9EC] italic leading-snug">
              "There was no return trip. No landing. The mission ended in a crash."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            And for a long time, the Rangers couldn't even manage that. The first six all failed.
            Some never reached the Moon. <span className="text-[#FCF9EC] font-semibold">Ranger 4</span> hit
            it but sent back nothing. <span className="text-[#FCF9EC] font-semibold">Ranger 6</span> struck
            its target, but a short circuit had silenced its cameras. By then, the program had gone
            through five failures in a row, and a new project manager took over. All hopes rested on
            <span className="text-[#FCF9EC] font-semibold"> Ranger 7</span>.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            On <span className="text-[#FCF9EC] font-semibold">July 31, 1964</span>, it delivered.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            For about seventeen minutes, Ranger 7 fell toward the Moon and sent home{' '}
            <span className="text-[#FCF9EC] font-semibold">4,316 pictures</span>, each sharper than the
            last. The final frames showed rocks and craters as small as a few feet across. Then the
            signal turned to static as the spacecraft slammed into the surface.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            <span className="text-[#FCF9EC] font-semibold">Ranger 8</span> followed in{' '}
            <span className="text-[#FCF9EC] font-semibold">February 1965</span>, sending back more than
            7,000 images and crashing into the Sea of Tranquility. Four and a half years later,
            Apollo 11 would land in that same region.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="relative pl-8 border-l-2 border-[#C9B5E0] py-4 bg-[#00105B]/30 rounded-r-xl pr-6">
            <p className="text-2xl md:text-3xl font-bold text-[#FCF9EC] italic leading-snug">
              "Millions of Americans watched the Moon rush up toward them, frame by frame, until the screen went blank."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Then came <span className="text-[#FCF9EC] font-semibold">Ranger 9</span>, the finale. It was
            aimed at the huge crater Alphonsus, and this time NASA broadcast its pictures live.
            Ranger 9 had captured <span className="text-[#FCF9EC] font-semibold">5,814 images</span> in
            its final minutes.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Together, the three missions returned more than 17,000 photographs. They showed a surface
            littered with craters, but also one that looked solid enough to land on.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Ranger 9 closed out the program. There were no more Rangers. Their wreckage still lies
            scattered across the lunar surface, where it was left in 1964 and 1965. Decades later,
            Apollo 16 astronauts and NASA's Lunar Reconnaissance Orbiter photographed the scar Ranger
            7 left behind.
          </p>
        </ScrollReveal>
         <ScrollReveal delay={0.2}>
          <figure className="flex items-center relative group overflow-hidden rounded-2xl  bg-black/40 backdrop-blur-sm">
            <img
              src="/models/3D-moon-assets/ranger-1.webp"
              alt="Ranger Block III spacecraft reference render"
              className="w-[70%] h-[50%] md:h-80 object-fit transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <figcaption className="absolute bottom-4 left-6 right-6 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[#FCF9EC]">
                Ranger Block III spacecraft
              </span>
              <span className="text-xs text-[#C9B5E0]/80 uppercase tracking-wider whitespace-nowrap">
                Archive Render
              </span>
            </figcaption>
          </figure>
        </ScrollReveal>
        <ScrollReveal>
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#00105B]/60 to-[#6061B6]/20 border border-[#C9B5E0]/30 backdrop-blur-sm text-center">
            <p className="text-xl md:text-2xl font-bold text-[#FCF9EC] leading-snug italic">
              "The Rangers never came home. But they went first, so that someone else could."
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default RangerProgram;