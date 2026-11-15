import React from 'react';
import { ScrollReveal } from '../../ui/ScrollReveal';

const MISSION_STATS = [
  { label: 'Spacecraft Launched', value: '7' },
  { label: 'Successful Soft Landings', value: '5' },
  { label: 'Images Returned', value: '~88,000' },
  { label: 'Surveyor 7 Photos', value: '21,000' },
  { label: 'Current Status', value: 'Still on the Moon', small: true },
];

const Surveyor = ({
  heroImagePath = '/models/3D-moon-assets/surveyor-2.jpg',
  archiveImagePath = '/models/3D-moon-assets/surveyor-3.jpg',
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
            Surveyor: The Robots That Made the Moon Safe
          </h3>
        </div>
      </ScrollReveal>

      {/* Hero Image + Stats Panel */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch mb-12">
        <ScrollReveal delay={0.2}>
          <div className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm w-full h-80 md:h-[400px]">
            <img
              src={heroImagePath}
              alt="Surveyor lander on the lunar surface"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm font-bold text-[#C9B5E0] tracking-wider uppercase">June 1966</p>
              <p className="text-2xl font-extrabold text-[#FCF9EC] mt-1">Surveyor 1</p>
              <p className="text-sm text-[#C9B5E0]/90 mt-1">
                The first American soft landing on the Moon
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
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
            The Rangers had shown us the Moon. But looking was not the same as landing.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Nobody knew for certain what a spacecraft would find beneath its feet. Solid rock? Or
            dust so deep it would swallow a lander whole? Before NASA could send astronauts, it
            needed machines that could <span className="text-[#FCF9EC] font-semibold">touch down
            gently, stand up, and report back.</span>
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Those machines were the <span className="text-[#FCF9EC] font-semibold">Surveyors</span>.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Built by Hughes Aircraft for the Jet Propulsion Laboratory, each Surveyor stood about
            ten feet tall on three spindly legs with crushable footpads. Each carried a television
            camera. Some carried a robotic scoop to dig trenches in the soil. Others carried an
            instrument to analyze what the Moon was made of.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Between 1966 and 1968, seven were launched. Two failed.{' '}
            <span className="text-[#FCF9EC] font-semibold">Surveyor 2</span> tumbled out of control
            after a botched course correction and crashed.{' '}
            <span className="text-[#FCF9EC] font-semibold">Surveyor 4</span> went silent just minutes
            before touchdown.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="relative pl-8 border-l-2 border-[#6061B6] py-4">
            <p className="text-2xl md:text-3xl font-bold text-[#FCF9EC] italic leading-snug">
              "But five landed."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            <span className="text-[#FCF9EC] font-semibold">Surveyor 1</span> set down in June 1966,
            the first American soft landing on the Moon, and answered the biggest question of all:
            the surface could hold the weight of a landing craft.{' '}
            <span className="text-[#FCF9EC] font-semibold">Surveyor 3</span> dug trenches in the soil
            for the cameras to watch. <span className="text-[#FCF9EC] font-semibold">Surveyors 5 and
            6</span> analyzed the chemistry of the lunar ground. And{' '}
            <span className="text-[#FCF9EC] font-semibold">Surveyor 7</span>, the last of the series,
            travelled to the rugged highlands near the crater Tycho, a place too dangerous for
            astronauts, and sent home some 21,000 photographs.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            In all, the five successful Surveyors returned about{' '}
            <span className="text-[#FCF9EC] font-semibold">88,000 images</span>.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Then, like so many missions, they were finished. The original plan called for ten
            spacecraft, but with the Apollo landing sites cleared, the extra Surveyors were no
            longer needed. Each one fell silent, left behind as the sun set and the cold of the
            lunar night closed in.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            They are still there today, standing exactly where they landed.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#FCF9EC] font-semibold leading-[1.8]">
            Except for one.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            In <span className="text-[#FCF9EC] font-semibold">November 1969</span>, Apollo 12
            astronauts Pete Conrad and Alan Bean landed within walking distance of Surveyor 3, which
            had been sitting alone on the Moon for more than two years. They crossed the dusty
            ground, reached the old machine, and clipped off its camera, its scoop, and other parts,
            to carry them home to Earth.
          </p>
        </ScrollReveal>

        {/* Archive Image — surveyor-3.jpg */}
        <ScrollReveal delay={0.2}>
          <figure className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm">
            <img
              src={archiveImagePath}
              alt="Surveyor 3 on the Moon, visited by Apollo 12"
              className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <figcaption className="absolute bottom-4 left-6 right-6 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[#FCF9EC]">
                Surveyor 3 — visited by Apollo 12, November 1969
              </span>
              <span className="text-xs text-[#C9B5E0]/80 uppercase tracking-wider whitespace-nowrap">
                Archive Photo
              </span>
            </figcaption>
          </figure>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="relative pl-8 border-l-2 border-[#C9B5E0] py-4 bg-[#00105B]/30 rounded-r-xl pr-6">
            <p className="text-2xl md:text-3xl font-bold text-[#FCF9EC] italic leading-snug">
              "It remains the only robotic probe ever visited by humans on another world."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#00105B]/60 to-[#6061B6]/20 border border-[#C9B5E0]/30 backdrop-blur-sm text-center">
            <p className="text-xl md:text-2xl font-bold text-[#FCF9EC] leading-snug italic">
              "The robots went first. They stood alone in the dark so that people could follow."
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Surveyor;