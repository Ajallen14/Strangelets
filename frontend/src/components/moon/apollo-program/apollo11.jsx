import React from 'react';
import { ScrollReveal } from '../../ui/ScrollReveal';

const MISSION_STATS = [
  { label: 'Crew', value: '3' },
  { label: 'Landing Site', value: 'Tranquility Base' },
  { label: 'Surface Time', value: '~21 hrs' },
  { label: 'Moonwalk Duration', value: '2.5 hrs' },
  { label: 'Objects Left Behind', value: '~100', small: true },
];

const CREW = [
  { name: 'Neil Armstrong', role: 'Commander — first human on the Moon' },
  { name: 'Buzz Aldrin', role: 'Lunar Module Pilot — walked the surface' },
  { name: 'Michael Collins', role: 'Command Module Pilot — held the orbit above' },
];

const LEFT_BEHIND = [
  { item: 'American flag', status: 'Still there' },
  { item: 'Plaque — "We came in peace for all mankind"', status: 'Still there' },
  { item: 'Apollo 1 crew patch', status: 'Still there' },
  { item: 'Medal honoring Yuri Gagarin', status: 'Still there' },
  { item: "Cameras, tools & Aldrin's boots (~100 objects)", status: 'Still there' },
  { item: "Eagle's descent stage", status: 'Still there' },
  { item: 'Laser retroreflector', status: 'Still working' },
  { item: 'Bootprints in the lunar soil', status: 'Still there' },
];

const Apollo11 = () => {
  return (
    <div className="mb-24">
      {/* Featured Mission Title */}
      <ScrollReveal delay={0.1}>
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6061B6]">
            Featured Mission · July 1969
          </span>
          <h3 className="text-[clamp(1.75rem, 3.5vw, 2.5rem)] font-bold text-[#FCF9EC] mt-2">
            Apollo 11: What They Left Behind
          </h3>
        </div>
      </ScrollReveal>

      {/* Mission Profile + Crew Panels */}
            {/* Row 1: Launch Image + Mission Profile */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch mb-8">
        <ScrollReveal delay={0.2}>
          <div className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm w-full h-80 md:h-[400px]">
            <img
              src="/Apollo/launch.webp"
              alt="Saturn V lifts off on July 16, 1969"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm font-bold text-[#C9B5E0] tracking-wider uppercase">July 16, 1969</p>
              <p className="text-2xl font-extrabold text-[#FCF9EC] mt-1">The Launch</p>
              <p className="text-sm text-[#C9B5E0]/90 mt-1">A million witnesses crowded the beaches at Cape Canaveral</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="h-full min-h-80 p-6 rounded-2xl bg-gradient-to-br from-[#00105B]/60 to-[#6061B6]/20 border border-[#6061B6]/40 backdrop-blur-sm flex flex-col justify-center">
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
                  <span className="text-xs text-[#C9B5E0]/70 uppercase tracking-wider">{stat.label}</span>
                  <span className={`${stat.small ? 'text-sm text-[#C9B5E0]' : 'text-xl text-[#FCF9EC]'} font-bold`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Row 2: Crew Photo + Crew List */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch mb-12">
        <ScrollReveal delay={0.3}>
          <div className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm w-full h-64 md:h-full md:min-h-64">
            <img
              src="/Apollo/crew.webp"
              alt="The Apollo 11 crew"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-6 text-sm font-bold text-[#FCF9EC]">
              Armstrong · Collins · Aldrin
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="h-full min-h-64 p-6 rounded-2xl bg-black/40 border border-[#6061B6]/30 backdrop-blur-sm flex flex-col justify-center">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9B5E0] mb-5">
              The Crew
            </h4>
            <div className="space-y-5">
              {CREW.map((member) => (
                <div key={member.name} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#6061B6] shrink-0" />
                  <div>
                    <p className="text-lg font-bold text-[#FCF9EC]">{member.name}</p>
                    <p className="text-sm text-[#C9B5E0]/80">{member.role}</p>
                  </div>
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
            On <span className="text-[#FCF9EC] font-semibold">July 16, 1969</span>, a million people
            crowded the beaches near Cape Canaveral to watch a Saturn V climb into the sky. Inside
            the capsule were three men: Neil Armstrong, Buzz Aldrin, and Michael Collins.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Four days later, Armstrong and Aldrin climbed into the lunar module{' '}
            <span className="text-[#FCF9EC] font-semibold italic">Eagle</span>, undocked from Collins
            in orbit, and began to fall toward the Moon.
          </p>
        </ScrollReveal>
              <ScrollReveal delay={0.2}>
          <figure className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm">
            <img
              src="/Apollo/spacecraft.jpg"
              alt="Eagle undocks from Columbia"
              className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <figcaption className="absolute bottom-4 left-6 right-6 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[#FCF9EC]">Eagle undocks from Columbia — July 20, 1969</span>
              <span className="text-xs text-[#C9B5E0]/80 uppercase tracking-wider whitespace-nowrap">Archive Photo</span>
            </figcaption>
          </figure>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-lg text-[#FCF9EC] font-semibold leading-[1.8]">
            Then, an alarm.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="relative pl-8 border-l-2 border-[#6061B6] py-4">
            <p className="text-2xl md:text-3xl font-bold text-[#FCF9EC] italic leading-snug">
              "Program alarm," Armstrong called. "It's a 1202."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            No one in the lander knew exactly what it meant. They had never seen it in their
            simulations. Back in Houston, controllers had seconds to decide: abort, or land.{' '}
            <span className="text-[#FCF9EC] font-semibold">They said go.</span>
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Armstrong looked out the window and saw the landing site rushing up toward them, strewn
            with boulders. He took manual control and flew on, searching for a safe place to set
            down, while the fuel gauge crept toward empty.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            At <span className="text-[#FCF9EC] font-semibold">4:17 in the afternoon</span>, Eastern
            time, a small blue light flickered on the instrument panel. Contact.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="relative pl-8 border-l-2 border-[#C9B5E0] py-4 bg-[#00105B]/30 rounded-r-xl pr-6">
            <p className="text-2xl md:text-3xl font-bold text-[#FCF9EC] italic leading-snug">
              "Houston, Tranquility Base here. The Eagle has landed."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Hours later, Armstrong stepped down the ladder and placed his boot on the Moon. For the
            next two and a half hours, he and Aldrin collected rocks, took photographs, and set up
            experiments. They stayed on the surface for about{' '}
            <span className="text-[#FCF9EC] font-semibold">twenty-one hours</span> in all.
          </p>
                <ScrollReveal delay={0.2}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* 4:3 Portrait Image */}
            <figure className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm aspect-[4/3] w-full">
              <img
                src="/Apollo/neil.png"
                alt="Neil Armstrong on the lunar surface"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-4 left-6 right-6">
                <span className="text-sm font-semibold text-[#FCF9EC]">
                  One small step — Armstrong on the surface
                </span>
              </figcaption>
            </figure>

            {/* Text fills the remaining space beside the photo */}
            <div className="space-y-4">
              <p className="text-lg text-[#C9B5E0] leading-[1.8]">
                And then they had to leave. The lander's ascent engine would carry them up.{' '}
                <span className="text-[#FCF9EC] font-semibold">Everything else had to stay.</span>
              </p>
              <p className="text-lg text-[#FCF9EC] font-semibold leading-[1.8]">
                So they left things behind.
              </p>
            </div>

          </div>
        </ScrollReveal>
              </ScrollReveal>

        

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            An American flag. A plaque bolted to one of Eagle's legs, saying they had come in peace
            for all mankind. A patch honoring the Apollo 1 crew, who had died in a launch-pad fire. A
            medal honoring Yuri Gagarin, the first human in space. About a hundred objects in all,
            including cameras, tools, and even Aldrin's boots, all discarded to save weight for the
            trip home.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            One thing they left is <span className="text-[#FCF9EC] font-semibold">still working</span>.
            A laser reflector, placed on the surface, is still used today to measure the distance to
            the Moon.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            The Eagle's descent stage is still there too, a bare metal platform sitting where it
            landed.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            And so are the footprints. The Moon has no wind, no rain, no weather to wear them away.
            The marks Armstrong and Aldrin pressed into the lunar soil are still there, more than
            fifty years later, in the silence of Tranquility Base.
          </p>
        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
          <figure className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm">
            <img
              src="/Apollo/apollo-11-view.jpg"
              alt="View from Tranquility Base"
              className="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <figcaption className="absolute bottom-4 left-6 right-6 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[#FCF9EC]">The view from Tranquility Base — unchanged for 50+ years</span>
              <span className="text-xs text-[#C9B5E0]/80 uppercase tracking-wider whitespace-nowrap">Archive Photo</span>
            </figcaption>
          </figure>
        </ScrollReveal>
        {/* =====================================================
            TRANQUILITY BASE INVENTORY — what's still there today
            ===================================================== */}
        <ScrollReveal delay={0.2}>
          <div className="p-6 md:p-8 rounded-2xl bg-black/40 border border-[#6061B6]/30 backdrop-blur-sm">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9B5E0] mb-5">
              Still at Tranquility Base Today
            </h4>
            <ul className="space-y-3">
              {LEFT_BEHIND.map((entry) => (
                <li
                  key={entry.item}
                  className="flex items-center justify-between gap-4 pb-3 border-b border-[#6061B6]/20 last:border-0 last:pb-0"
                >
                  <span className="text-sm md:text-base text-[#FCF9EC]">{entry.item}</span>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      entry.status === 'Still working'
                        ? 'text-[#FCF9EC] bg-[#C9B5E0]/20 border-[#C9B5E0]/50'
                        : 'text-[#C9B5E0] bg-[#00105B]/40 border-[#6061B6]/40'
                    }`}
                  >
                    {entry.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#00105B]/60 to-[#6061B6]/20 border border-[#C9B5E0]/30 backdrop-blur-sm text-center">
            <p className="text-xl md:text-2xl font-bold text-[#FCF9EC] leading-snug italic">
              "Humans have left the Moon. But we left a piece of ourselves behind."
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Apollo11;