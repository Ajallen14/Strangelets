import React, { useEffect, useState } from "react";

export const AiLoader = ({
  size = 180,
  text = "Loading...",
  visible = true,
  onHidden,
  className = ""
}) => {
  const [fade, setFade] = useState(visible ? 0 : 1);

  // Graceful fade-in on mount / whenever the loader is shown.
  // The first render paints opacity-0 (see initial state above), then the
  // overlay transitions to opacity-100 via Tailwind classes so it never
  // "pops" into existence.
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setFade(1), 0);
    return () => clearTimeout(timer);
  }, [visible]);

  // Graceful fade-out when hidden. The overlay transitions to opacity-0 first;
  // parents keep it mounted via `visible` and unmount in `onHidden` only after
  // the 700ms transition completes, so the exit animation is never cut short.
  useEffect(() => {
    if (visible) return;
    const startExit = setTimeout(() => setFade(0), 0);
    const finishExit = setTimeout(() => onHidden?.(), 700);
    return () => {
      clearTimeout(startExit);
      clearTimeout(finishExit);
    };
  }, [visible, onHidden]);

  const letters = text.split("");

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1a3379] via-[#0f172a] to-black transition-opacity duration-700 ease-in-out ${
        fade === 1 ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <div
        className="relative flex items-center justify-center font-sans select-none"
        style={{ width: size, height: size }}
      >
        {/* Animated Letters */}
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block text-white dark:text-gray-800 opacity-40 animate-loaderLetter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}

        {/* Rotating Glowing Circle */}
        <div className="absolute inset-0 rounded-full animate-loaderCircle"></div>
      </div>

      {/* 
        FIX: Changed <style jsx> to standard <style> for Vite/React compatibility.
        Note: In a production shadcn app, these keyframes should ideally be moved 
        to your tailwind.config.js or index.css to avoid global scope pollution.
      */}
      <style>{`
        @keyframes loaderCircle {
          0% {
            transform: rotate(90deg);
            box-shadow:
              0 6px 12px 0 #38bdf8 inset,
              0 12px 18px 0 #005dff inset,
              0 36px 36px 0 #1e40af inset,
              0 0 3px 1.2px rgba(56, 189, 248, 0.3),
              0 0 6px 1.8px rgba(0, 93, 255, 0.2);
          }
          50% {
            transform: rotate(270deg);
            box-shadow:
              0 6px 12px 0 #60a5fa inset,
              0 12px 6px 0 #0284c7 inset,
              0 24px 36px 0 #005dff inset,
              0 0 3px 1.2px rgba(56, 189, 248, 0.3),
              0 0 6px 1.8px rgba(0, 93, 255, 0.2);
          }
          100% {
            transform: rotate(450deg);
            box-shadow:
              0 6px 12px 0 #4dc8fd inset,
              0 12px 18px 0 #005dff inset,
              0 36px 36px 0 #1e40af inset,
              0 0 3px 1.2px rgba(56, 189, 248, 0.3),
              0 0 6px 1.8px rgba(0, 93, 255, 0.2);
          }
        }

        @keyframes loaderLetter {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.15);
          }
          40% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }

        .animate-loaderCircle {
          animation: loaderCircle 5s linear infinite;
        }

        .animate-loaderLetter {
          animation: loaderLetter 3s infinite;
        }

        @media (prefers-color-scheme: dark) {
          .animate-loaderCircle {
            box-shadow:
              0 6px 12px 0 #4b5563 inset,
              0 12px 18px 0 #6b7280 inset,
              0 36px 36px 0 #9ca3af inset,
              0 0 3px 1.2px rgba(107, 114, 128, 0.3),
              0 0 6px 1.8px rgba(156, 163, 175, 0.2);
          }
        }
      `}</style>
    </div>
  );
};
