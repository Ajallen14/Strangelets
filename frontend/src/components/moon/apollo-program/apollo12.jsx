import React from 'react';
import { ScrollReveal } from '../../ui/ScrollReveal';

const MISSION_STATS = [
  { label: 'Crew', value: '3' },
  { label: 'Landing Site', value: 'Ocean of Storms' },
  { label: 'Distance to Surveyor 3', value: '~540 ft' },
  { label: 'Surface Time', value: '~31 hrs' },
  { label: 'Lightning Strikes at Launch', value: '2', small: true },
];

const CREW = [
  { name: 'Pete Conrad', role: 'Commander — walked to Surveyor 3' },
  { name: 'Alan Bean', role: 'Lunar Module Pilot — walked to Surveyor 3' },
  { name: 'Richard Gordon', role: 'Command Module Pilot — held the orbit above' },
];

const LEFT_BEHIND = [
  { item: "Intrepid's descent stage", status: 'Still there' },
  { item: 'ALSEP 1 science station', status: 'Still there' },
  { item: 'The rest of Surveyor 3', status: 'Still there' },
  { item: 'Footprints in the dust', status: 'Still there' },
  { item: "Surveyor 3's camera & scoop", status: 'Returned to Earth' },
];

const Apollo12 = () => {
  return (
    <div className="mb-24">
      {/* Featured Mission Title */}
      <ScrollReveal delay={0.1}>
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6061B6]">
            Featured Mission · November 1969
          </span>
          <h3 className="text-[clamp(1.75rem, 3.5vw, 2.5rem)] font-bold text-[#FCF9EC] mt-2">
            Apollo 12: The Landing That Found an Old Friend
          </h3>
        </div>
      </ScrollReveal>

      {/* Mission Profile + Crew Panels */}
            {/* Row 1: Spacecraft Image + Mission Profile */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch mb-8">
        <ScrollReveal delay={0.2}>
          <div className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm w-full h-80 md:h-[400px]">
            <img
              src="/Apollo/apollo-12-spacecraft.jpg"
              alt="Apollo 12 spacecraft over the Moon"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm font-bold text-[#C9B5E0] tracking-wider uppercase">November 1969</p>
              <p className="text-2xl font-extrabold text-[#FCF9EC] mt-1">Intrepid over the Ocean of Storms</p>
              <p className="text-sm text-[#C9B5E0]/90 mt-1">The mission that survived two lightning strikes</p>
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

      {/* Row 2: Crew strip */}
      <ScrollReveal delay={0.3}>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {CREW.map((member) => (
            <div
              key={member.name}
              className="p-5 rounded-2xl bg-black/40 border border-[#6061B6]/30 backdrop-blur-sm"
            >
              <div className="w-2 h-2 mb-3 rounded-full bg-[#6061B6]" />
              <p className="text-lg font-bold text-[#FCF9EC]">{member.name}</p>
              <p className="text-sm text-[#C9B5E0]/80 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Narrative */}
      <div className="max-w-4xl mx-auto space-y-8">
        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            If Apollo 11 proved humans could land on the Moon, Apollo 12 set out to prove they could
            land <span className="text-[#FCF9EC] font-semibold italic">where they wanted to</span>.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Apollo 11 had overshot its target by about four miles. For the missions to come, that
            wasn't good enough. NASA wanted a pinpoint landing, and it chose a target that would put
            the idea to the test: <span className="text-[#FCF9EC] font-semibold">Surveyor 3</span>, a
            robotic lander that had been sitting alone in the Ocean of Storms since April 1967.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            The crew was Pete Conrad, Richard Gordon, and Alan Bean.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#FCF9EC] font-semibold leading-[1.8]">
            Their trip began in rain.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            On <span className="text-[#FCF9EC] font-semibold">November 14, 1969</span>, under cloudy,
            dripping skies, with President Nixon watching, the Saturn V rose from Pad 39A.
            Thirty-six seconds later, lightning struck the rocket. Fifty-two seconds in, it struck
            again. Power systems failed and telemetry flickered. Dials and alarms lit up the cabin
            in a way the crew had never seen in training.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="relative pl-8 border-l-2 border-[#6061B6] py-4">
            <p className="text-2xl md:text-3xl font-bold text-[#FCF9EC] italic leading-snug">
              "But the rocket kept flying."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            The mission controllers recovered the spacecraft's systems, the crew regained control,
            and Apollo 12 went on to the Moon.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            On <span className="text-[#FCF9EC] font-semibold">November 19</span>, Conrad flew the
            lunar module, <span className="text-[#FCF9EC] font-semibold italic">Intrepid</span>, down
            toward the dusty plain. They spotted Surveyor Crater, with the robot waiting somewhere
            near its rim. They touched down just northwest of it, only about{' '}
            <span className="text-[#FCF9EC] font-semibold">540 feet</span> from Surveyor 3.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="relative pl-8 border-l-2 border-[#C9B5E0] py-4 bg-[#00105B]/30 rounded-r-xl pr-6">
            <p className="text-2xl md:text-3xl font-bold text-[#FCF9EC] italic leading-snug">
              "Close enough to walk."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#FCF9EC] font-semibold leading-[1.8]">
            And so they did.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            After more than two years alone in the vacuum, Surveyor 3 was still standing, its legs
            planted in the soil, its gleaming body now coated in lunar dust. The astronauts walked up
            to it, examined it, and, using cutters, carefully removed its television camera, its
            scoop, and other parts. Everything was bagged and carried home for scientists to study.
          </p>
        </ScrollReveal>
                  <ScrollReveal delay={0.2}>
          <figure className="relative group overflow-hidden rounded-2xl border border-[#6061B6]/30 bg-black/40 backdrop-blur-sm">
            <img
              src="/Apollo/apollo-12-soil-sample.webp"
              alt="Apollo 12 lunar soil sample"
              className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <figcaption className="absolute bottom-4 left-6 right-6 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[#FCF9EC]">Returned hardware & lunar soil — studied on Earth</span>
              <span className="text-xs text-[#C9B5E0]/80 uppercase tracking-wider whitespace-nowrap">Archive Photo</span>
            </figcaption>
          </figure>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Conrad and Bean spent a little more than{' '}
            <span className="text-[#FCF9EC] font-semibold">thirty-one hours</span> on the Moon. They
            flew back, docked with Gordon in orbit, and splashed down in the Pacific on November 24,
            within sight of the recovery ship.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-[#C9B5E0] leading-[1.8]">
            Apollo 12 is often forgotten, the second landing after the famous first. But it did
            something more important than a flag or a footprint. It showed that landing could be
            done <span className="text-[#FCF9EC] font-semibold">on purpose, with precision, and with
            a plan.</span>
          </p>
        </ScrollReveal>

        {/* =====================================================
            OCEAN OF STORMS INVENTORY — what's still there today
            ===================================================== */}
        <ScrollReveal delay={0.2}>
          <div className="p-6 md:p-8 rounded-2xl bg-black/40 border border-[#6061B6]/30 backdrop-blur-sm">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9B5E0] mb-5">
              Still in the Ocean of Storms Today
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
                      entry.status !== 'Still there'
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
              "And somewhere on the Ocean of Storms, the rest of Surveyor 3 is still there, waiting
              in the dust — a robot that outlasted its own mission and was visited by the people it
              had helped."
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Apollo12;