import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarsCanvas from '../../components/MarsCanvas';


const MarsPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-black text-[#FCF9EC]">
      {/* Header */}
      <header className="relative z-10 w-full max-w-[720px] shrink-0 px-4 pt-5 pb-2 text-center md:pt-6">
        <button
          type="button"
          onClick={() => navigate('/explore')}
          className="mb-2 inline-block rounded-full border border-[#6061B6] bg-[#00105B]/85 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9B5E0] transition-all duration-300 hover:bg-[#C9B5E0] hover:text-black cursor-pointer"
        >
          ← Explore
        </button>
        <h1 className="my-1 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-[#FCF9EC]">
          Mars
        </h1>
        <p className="px-2 text-[0.9rem] leading-[1.5] text-[#C9B5E0] md:text-[1.05rem]">
          Humanity's discarded machines rest across the red planet — each marker
          below is a last known location.
        </p>
      </header>

      {/* 3D Mars with equipment markers */}
      <div className="relative z-10 w-full flex-1 min-h-0 px-2 md:px-8">
        <MarsCanvas onSelect={setSelected} />
      </div>

      {/* Equipment detail — directly below the 3D model */}
      <section className="relative z-10 shrink-0 px-4 pb-3">
        <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-[#6061B6]/50 bg-[#00105B]/60 p-4 backdrop-blur-sm md:p-5">
          {selected ? (
            <div key={selected.id}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 className="text-base font-bold text-[#FCF9EC] md:text-lg">
                  {selected.name}
                </h2>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C9B5E0]">
                  {selected.year} · {selected.status}
                </span>
              </div>
              <p className="mb-2 text-[0.8rem] font-semibold leading-[1.5] text-[#FCF9EC] md:text-[0.9rem]">
                {selected.summary}
              </p>
              <p className="text-[0.85rem] leading-[1.5] text-[#C9B5E0] md:text-[0.95rem]">
                {selected.detail}
              </p>
              <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#6061B6]">
                Last known location — {Math.abs(selected.lat).toFixed(2)}°
                {selected.lat >= 0 ? 'N' : 'S'}, {Math.abs(selected.lng).toFixed(2)}°
                {selected.lng >= 0 ? 'E' : 'W'}
              </p>
            </div>
          ) : (
            <p className="text-center text-xs text-[#C9B5E0] md:text-sm">
              Hover a marker on Mars to see the equipment · click it for its story.
            </p>
          )}
        </div>
      </section>

      {/* Discarded equipment list */}
      <section className="relative z-10 shrink-0 w-full overflow-x-auto px-4 pb-4">
        <ul className="mx-auto flex w-full max-w-[1200px] justify-center gap-2 md:flex-wrap">
          {MARS_EQUIPMENT.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer md:text-[0.7rem] ${
                  selected?.id === item.id
                    ? 'border-[#FCF9EC] bg-[#C9B5E0] text-black'
                    : 'border-[#6061B6] bg-[#00105B]/85 text-[#C9B5E0] hover:bg-[#6061B6] hover:text-[#FCF9EC]'
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default MarsPage;
