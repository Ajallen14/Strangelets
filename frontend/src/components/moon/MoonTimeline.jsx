import React from 'react';
import { Link } from 'react-router-dom';
import { Timeline } from '../ui/timeline';

// Era data — set `to` once the era page exists (early-program is live)
const DEFAULT_ERAS = [
  { key: 'early-robotic', label: 'Early Robotic Programs (1950–70s)', to: '/moon/early-program' },
  { key: 'apollo', label: 'The Apollo Program (1961–72)', to: null },
  { key: 'post-apollo', label: 'Post-Apollo Missions (1990s–2010s)', to: null },
  { key: 'artemis', label: 'Modern & Ongoing Exploration (Artemis)', to: null },
];

const MoonTimeline = ({ eras = DEFAULT_ERAS, className = '' }) => {
  return (
    <div className={`relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 ${className}`}>
      <Timeline orientation="horizontal" className="mt-8">
        {eras.map((era) => (
          <Timeline.Item
            key={era.key}
            label={
              era.to ? (
                <Link
                  to={era.to}
                  className="hover:text-[#C9B5E0] hover:underline decoration-[#6061B6] decoration-2 underline-offset-4 transition-all duration-300"
                >
                  {era.label}
                </Link>
              ) : (
                era.label
              )
            }
          />
        ))}
      </Timeline>
    </div>
  );
};

export default MoonTimeline;