// Discarded NASA equipment on Mars — the user's 7-item list.
// lat/lng are the last known coordinates on Mars (degrees; lng east-positive).
export const MARS_EQUIPMENT = [
  {
    id: 'viking',
    name: 'Viking Landers',
    lat: 22.697,
    lng: -47.973,
    year: '1976',
    status: 'Silent since 1982',
    summary:
      'Twin landers that proved Mars could be touched and studied for years, not days. Viking 1 held the surface record for over two decades.',
    detail:
      'Viking 1 set down in Chryse Planitia on July 20, 1976 — the first successful US Mars landing — and Viking 2 followed in Utopia Planitia on September 3. Built for 90 sols, Viking 1 kept sending data until November 1982, when a faulty command sequence overwrote its antenna memory. Viking 2 lasted until April 1980. Both landers still sit where they fell silent.',
  },
  {
    id: 'pathfinder',
    name: 'Mars Pathfinder Lander',
    lat: 19.33,
    lng: -33.55,
    year: '1997',
    status: 'Silent since 1997',
    summary:
      'The airbag-landers proof of cheap Mars access. Carried Sojourner, the first wheeled vehicle on Mars, and returned 16,500 images in 83 sols.',
    detail:
      'Pathfinder bounced to a stop in Ares Vallis on July 4, 1997 inside a cocoon of airbags — a landing technique never tried before. It deployed Sojourner, a microwave-oven-sized rover that analyzed rocks for 83 sols. The mission ended when the lander\'s battery died in a cold night; the site was later renamed the Carl Sagan Memorial Station.',
  },
  {
    id: 'spirit',
    name: 'Spirit Rover',
    lat: -14.57,
    lng: 175.48,
    year: '2004',
    status: 'Silent since 2010',
    summary:
      'A 90-day rover that roamed for 6 years. Trapped in soft soil at Troy, it kept working as a stationary science platform through its last winter.',
    detail:
      'Spirit landed in Gusev Crater on January 4, 2004, expected to drive 600 meters. It covered 7.73 km, found evidence that Gusev once held water-altered rocks, and climbed Husband Hill. Stuck in sand in 2009, it became a fixed lab until NASA lost contact in March 2010, after 2,269 sols.',
  },
  {
    id: 'opportunity',
    name: 'Opportunity Rover',
    lat: -1.94,
    lng: 354.47,
    year: '2004',
    status: 'Silent since 2018',
    summary:
      'The 15-year marathoner. Drove 45 km across Meridiani Planitia, found gypsum and hematite "blueberries," then died in a planet-wide dust storm.',
    detail:
      'Opportunity landed on January 25, 2004, for a 90-sol mission and lasted 5,352 sols. It found minerals that prove ancient liquid water, survived 11 years beyond its warranty, and sent its last words — "my battery is low and it\'s getting dark" — as a global dust storm blotted out the sun in June 2018.',
  },
  {
    id: 'phoenix',
    name: 'Phoenix Lander',
    lat: 68.22,
    lng: 234.35,
    year: '2008',
    status: 'Silent since 2008',
    summary:
      'The polar ice-digger. Touched down in the arctic plain of Vastitas Borealis, tasted water ice in Martian soil, and froze into the winter night.',
    detail:
      'Phoenix landed on May 25, 2008, the first craft to touch the Martian arctic. Its robotic arm scraped water-ice just below the surface and recorded snowfall. Built for 90 sols, it outlasted the Martian summer but could not survive the -150°C polar winter; its solar panels shattered in the ice.',
  },
  {
    id: 'insight',
    name: 'InSight Lander',
    lat: 4.5,
    lng: 135.9,
    year: '2018',
    status: 'Silent since 2022',
    summary:
      'The quake-listener. Its seismometer heard hundreds of marsquakes, revealing a liquid core, until dust starved its solar panels on Elysium Planitia.',
    detail:
      'InSight landed on November 26, 2018, with a self-hammering mole and France\'s SEIS seismometer. It recorded over 1,300 marsquakes, measured a molten core, and tracked meteorite strikes. Dust-coated panels finally starved it in December 2022, but it left the first full picture of Mars\' hidden interior.',
  },
  {
    id: 'ingenuity',
    name: 'Ingenuity Helicopter',
    lat: 18.44,
    lng: 77.45,
    year: '2021',
    status: 'Retired 2024',
    summary:
      'The first aircraft on another world. Meant to fly five times, it flew 72 — until a rotor blade broke in the sand of Jezero Crater.',
    detail:
      'Ingenuity rode under Perseverance\'s belly and rose 3 meters on April 19, 2021 — the Wright Brothers moment on Mars. It survived 72 flights over 3 years as Perseverance\'s scout. On January 18, 2024, a rotor blade struck the ground during landing and shattered. It rests in Jezero Crater while Perseverance carries its legacy forward.',
  },
];

// Spherical-to-Cartesian for a Y-up GLB sphere.
// Sphere texture convention: lng 0 faces +Z at the equator, rotation about +Y.
export const latLngToVec3 = (lat, lng, r) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
};
