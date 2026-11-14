import React from 'react';

const LandingPage = () => {
  const destinations = [
    {
      id: 'moon',
      name: 'The Moon',
      tagline: 'Apollo Lunar Rovers, Seismometers & Landers',
      description:
        'Discover the equipment left behind by astronauts between 1969 and 1972 that taught us how the Moon was formed.',
      badge: '1960s - Present',
    },
    {
      id: 'mars',
      name: 'Mars',
      tagline: 'Sojourner, Spirit, Opportunity & InSight',
      description:
        'Meet the robotic explorers resting in the red dust after uncovering ancient water and Martian quakes.',
      badge: '1970s - Present',
    },
    {
      id: 'deep-space',
      name: 'Deep Space',
      tagline: 'Voyager, Pioneer & New Horizons',
      description:
        'Track the probes still traveling into the cosmos and the silent spacecraft orbiting distant worlds.',
      badge: 'Interstellar',
    },
  ];

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <span>Stranglets</span>
        </div>
        
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <span className="badge-pill">Interactive Space Museum</span>
        <h1 className="hero-title">Abandoned, Not Forgotten</h1>
        <p className="hero-description">
          Since the 1960s, NASA has left hardware across the solar system—on the
          Moon, on Mars, and in deep space. From retired rovers to probes still
          traveling away from Earth, explore the stories of these silent
          pioneers and the groundbreaking science they made possible.
        </p>
        <a href="#destinations" className="cta-btn">
          Start the Mission
        </a>
      </header>

      
      
    </div>
  );
};

export default LandingPage;