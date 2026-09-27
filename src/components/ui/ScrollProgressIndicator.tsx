import React from 'react';
import { HEALTHCARE_FRAMES } from '../../three/frames/healthcareFrames';

interface ScrollProgressIndicatorProps {
  scrollProgress: number;
  currentFrameIndex: number;
  onNavigateToFrame: (index: number) => void;
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  scrollProgress,
  currentFrameIndex,
  onNavigateToFrame,
}) => {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-end pointer-events-auto">
      {/* Current Frame Title Callout */}
      <div className="mb-4 text-right">
        <div className="font-mono text-[9px] uppercase tracking-widest text-sky-700 font-bold">
          FRAME {currentFrameIndex + 1 < 10 ? `0${currentFrameIndex + 1}` : currentFrameIndex + 1} / 10
        </div>
        <div className="font-sans text-xs font-semibold text-slate-800 max-w-[120px] truncate">
          {HEALTHCARE_FRAMES[currentFrameIndex]?.name}
        </div>
      </div>

      {/* Vertical Rail */}
      <div className="relative flex flex-col items-center space-y-3">
        {/* Track Line */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-slate-200 -z-10 rounded-full" />

        {/* Dynamic Scrub Line */}
        <div
          className="absolute top-0 w-[2px] bg-gradient-to-b from-sky-500 to-teal-500 -z-10 transition-all duration-75 rounded-full"
          style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />

        {/* 10 Frame Dots */}
        {HEALTHCARE_FRAMES.map((frame, idx) => {
          const isActive = idx === currentFrameIndex;
          const isPassed = scrollProgress >= frame.startProgress;

          return (
            <button
              key={frame.id}
              onClick={() => onNavigateToFrame(idx)}
              title={`${frame.name} (${Math.round(frame.startProgress * 100)}%)`}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'h-3.5 w-3.5 bg-sky-600 shadow-[0_0_12px_rgba(2,132,199,0.5)] scale-125'
                    : isPassed
                    ? 'h-2 w-2 bg-sky-400 hover:scale-110'
                    : 'h-1.5 w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />

              {/* Tooltip on hover */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white border border-slate-200 text-[10px] font-mono px-2 py-0.5 rounded shadow-sm text-slate-700 pointer-events-none font-medium">
                {frame.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
