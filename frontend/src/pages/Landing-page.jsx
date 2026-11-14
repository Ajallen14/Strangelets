import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SoftAurora from '../components/SoftAurora';
import OrbitalSystemSection from '../components/OrbitalSystemSection';
import Hyperspeed from '../components/Hyperspeed';

const LandingPage = () => {
  const navigate = useNavigate();
  const earthTriggerRef = useRef(null);
  const orbitalTriggerRef = useRef(null);

  const [isEarthVisible, setIsEarthVisible] = useState(false);
  const [isOrbitalActive, setIsOrbitalActive] = useState(false);
  const [warpTarget, setWarpTarget] = useState(null);

  useEffect(() => {
    const earthObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsEarthVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          // Reset fade if user scrolls back up to Section 1
          setIsEarthVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    const orbitalObserver = new IntersectionObserver(
      ([entry]) => {
        setIsOrbitalActive(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    if (earthTriggerRef.current) earthObserver.observe(earthTriggerRef.current);
    if (orbitalTriggerRef.current) orbitalObserver.observe(orbitalTriggerRef.current);

    return () => {
      earthObserver.disconnect();
      orbitalObserver.disconnect();
    };
  }, []);

  const handlePlanetClick = (path, label) => {
    setWarpTarget({ path, label });
    setTimeout(() => {
      navigate(path);
    }, 2400);
  };

  return (
    <main className="landing-main">
      {/* Fullscreen Hyperspeed Transition Overlay when Moon or Mars is clicked */}
      {warpTarget && (
        <div className="hyperspeed-overlay">
          <Hyperspeed
            effectOptions={{
              distortion: 'turbulentDistortion',
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 4,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 3,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              colors: {
                roadColor: 0x000000,
                islandColor: 0x00105b,
                background: 0x000000,
                shoulderLines: 0x6061b6,
                brokenLines: 0xc9b5e0,
                leftCars: [0xc9b5e0, 0x6061b6, 0xfcf9ec],
                rightCars: [0x6061b6, 0x00105b, 0xc9b5e0],
                sticks: 0xfcf9ec,
              },
            }}
          />
          <div className="warp-hud">
            <span className="badge-pill">Hyperspeed Engaged</span>
            <h2>Warping to {warpTarget.label}...</h2>
          </div>
        </div>
      )}

      {/* SECTION 1: Hero + Scoped SoftAurora Background */}
      <section id="hero-section" className="page-section hero-section">
        <div className="section-aurora-bg">
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={1}
            color1="#06a5d2"
            color2="#e100ff"
            bandHeight={0.5}
            bandSpread={1}
            enableMouseInteraction
            mouseInfluence={0.25}
            spectrum={1}
            colorSpeed={1}
            noiseFrequency={2.5}
            noiseAmplitude={1}
            tilt={0}
            octaveDecay={0.1}
            layerOffset={0}
            clickPulse
            intro
            lightMode={false}
          />
        </div>

        <div className="hero-content">
          <span className="badge-pill">Interactive Space Museum</span>
          <h1 className="hero-title">Abandoned, Not Forgotten</h1>
          <p className="hero-description">
            Since the 1960s, NASA has left hardware across the solar system—on the
            Moon, on Mars, and in deep space. From retired rovers to probes still
            traveling away from Earth, explore the stories of these silent
            pioneers and the groundbreaking science they made possible.
          </p>

          <a href="#earth-showcase" className="scroll-prompt">
            <span>Scroll to Explore Earth</span>
            <div className="scroll-arrow">↓</div>
          </a>
        </div>
      </section>

      {/* UNIFIED SCROLL WRAPPER FOR SECTIONS 2 & 3 */}
      <div className="space-scroll-track">
        {/* Sticky 3D Viewport that travels from Section 2 into Section 3 */}
        <div
          className={`sticky-3d-stage ${
            isEarthVisible || isOrbitalActive ? 'visible' : ''
          }`}
        >
          {/* Dynamic Header that morphs between Section 2 and Section 3 */}
          <div className="stage-header-container">
            <div className={`stage-heading ${!isOrbitalActive ? 'active' : 'hidden'}`}>
              <span className="badge-pill">Pale Blue Dot</span>
              <h2>Where Every Mission Began</h2>
            </div>

            <div className={`stage-heading ${isOrbitalActive ? 'active' : 'hidden'}`}>
              <span className="badge-pill">Mission Selector</span>
              <h2>Select a World to Launch</h2>
              <p>
                Tap the orbiting <strong>Moon</strong> or <strong>Mars</strong> to engage
                hyperspeed travel and inspect NASA&apos;s discarded hardware.
              </p>
            </div>
          </div>

          {/* Single 3D Canvas: Close-up Earth in Sec 2 -> Orbiting Moon/Mars in Sec 3 */}
          <OrbitalSystemSection
            showOrbits={isOrbitalActive}
            onSelectDestination={handlePlanetClick}
          />

          {/* Bottom Scroll Prompt (Only visible in Section 2) */}
          <a
            href="#orbital-system"
            className={`scroll-prompt stage-bottom-prompt ${
              !isOrbitalActive ? 'active' : 'hidden'
            }`}
          >
            <span>Scroll to Reveal Moon &amp; Mars Orbits</span>
            <div className="scroll-arrow">↓</div>
          </a>
        </div>

        {/* Invisible Scroll Waypoints for Section 2 and Section 3 */}
        <section
          id="earth-showcase"
          ref={earthTriggerRef}
          className="scroll-trigger-section"
        />
        <section
          id="orbital-system"
          ref={orbitalTriggerRef}
          className="scroll-trigger-section"
        />
      </div>
    </main>
  );
};

export default LandingPage;