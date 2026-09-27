import React, { useState, useEffect } from 'react';
import { HEALTHCARE_FRAMES } from '../../three/frames/healthcareFrames';

interface FrameNavigationDockProps {
  currentFrameIndex: number;
  onNavigateToFrame: (index: number) => void;
  scrollProgress: number;
}

export const FrameNavigationDock: React.FC<FrameNavigationDockProps> = ({
  currentFrameIndex,
  onNavigateToFrame,
  scrollProgress,
}) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Auto-tour player
  useEffect(() => {
    if (!isTourActive) return;

    const timer = setInterval(() => {
      onNavigateToFrame((currentFrameIndex + 1) % HEALTHCARE_FRAMES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isTourActive, currentFrameIndex, onNavigateToFrame]);

  // Keyboard navigation listener (Arrow Up / Down, Page Up / Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        if (currentFrameIndex < HEALTHCARE_FRAMES.length - 1) {
          onNavigateToFrame(currentFrameIndex + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        if (currentFrameIndex > 0) {
          onNavigateToFrame(currentFrameIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFrameIndex, onNavigateToFrame]);

  const activeFrame = HEALTHCARE_FRAMES[currentFrameIndex] || HEALTHCARE_FRAMES[0];

  return (
    <aside aria-label="Timeline navigation" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex flex-col items-center">
      {/* Floating Hover Tooltip */}
      {hoveredIndex !== null && (
        <div className="mb-2 px-3 py-1 rounded-full bg-slate-900/90 text-white font-mono text-[10px] tracking-wider shadow-lg border border-slate-700 animate-fadeIn pointer-events-none">
          {HEALTHCARE_FRAMES[hoveredIndex].index + 1}. {HEALTHCARE_FRAMES[hoveredIndex].name}
        </div>
      )}

      {/* Main Glassmorphic Dock Container */}
      <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-[0_10px_35px_rgba(2,132,199,0.15)] backdrop-blur-xl transition-all duration-300">
        {/* Previous Frame Button */}
        <button
          onClick={() => {
            if (currentFrameIndex > 0) onNavigateToFrame(currentFrameIndex - 1);
          }}
          disabled={currentFrameIndex === 0}
          className="h-8 w-8 rounded-full bg-slate-50 hover:bg-sky-50 disabled:opacity-30 disabled:hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-sky-700 border border-slate-200 transition-colors focus:outline-none"
          title="Previous Frame (Arrow Up)"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Current Active Chapter Pill */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50/80 border border-sky-200/80 text-[11px] font-mono">
          <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="font-bold text-sky-900">
            FRAME {String(currentFrameIndex + 1).padStart(2, '0')}/10
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 font-semibold max-w-[130px] truncate">
            {activeFrame.name}
          </span>
        </div>

        {/* 10 Interactive Frame Indicators */}
        <div className="flex items-center space-x-1.5 px-1 sm:px-2">
          {HEALTHCARE_FRAMES.map((f, idx) => {
            const isActive = idx === currentFrameIndex;
            return (
              <button
                key={f.id}
                onClick={() => onNavigateToFrame(idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? 'h-3 w-7 bg-sky-600 shadow-sm shadow-sky-500/50'
                    : 'h-2 w-2 bg-slate-300 hover:bg-sky-400 hover:scale-125'
                }`}
                aria-label={`Jump to Frame ${idx + 1}: ${f.name}`}
              />
            );
          })}
        </div>

        {/* Next Frame Button */}
        <button
          onClick={() => {
            if (currentFrameIndex < HEALTHCARE_FRAMES.length - 1) {
              onNavigateToFrame(currentFrameIndex + 1);
            }
          }}
          disabled={currentFrameIndex === HEALTHCARE_FRAMES.length - 1}
          className="h-8 w-8 rounded-full bg-slate-50 hover:bg-sky-50 disabled:opacity-30 disabled:hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-sky-700 border border-slate-200 transition-colors focus:outline-none"
          title="Next Frame (Arrow Down)"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Auto-Tour Toggle */}
        <button
          onClick={() => setIsTourActive(!isTourActive)}
          className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all focus:outline-none flex items-center space-x-1.5 font-bold ${
            isTourActive
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
          title="Autoplay through all 10 clinical frames"
        >
          <span>{isTourActive ? '■ PAUSE' : '▶ TOUR'}</span>
        </button>
      </div>
    </aside>
  );
};
