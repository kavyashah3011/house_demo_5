import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        const step = Math.floor(Math.random() * 10) + 6;
        return Math.min(100, prev + step);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8fafc] transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Soft clinical ambient glow */}
      <div className="absolute h-96 w-96 rounded-full bg-sky-200/40 blur-[100px] pointer-events-none" />

      {/* Brand & Heartbeat Pulse */}
      <div className="relative flex flex-col items-center space-y-6 text-center">
        {/* Heartbeat Pulse Icon */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full border border-sky-400/40 animate-ping opacity-60" />
          <div className="h-14 w-14 rounded-full border border-sky-300 bg-white p-3 flex items-center justify-center shadow-md">
            <svg
              className="h-7 w-7 text-sky-600 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>

        <div>
          <div className="text-xs font-mono uppercase tracking-[0.35em] text-sky-700 font-bold">
            AETHERIA HEALTH
          </div>
          <h1 className="mt-2 text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900">
            Initializing Healthcare Experience
          </h1>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-56 overflow-hidden rounded-full bg-slate-200/80 p-0.5 shadow-inner">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="font-mono text-xs tracking-wider text-slate-500 font-medium">
          {progress < 10 ? `0${progress}` : progress}%
        </div>
      </div>
    </div>
  );
};
