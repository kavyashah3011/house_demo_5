import React, { useState, useRef } from 'react';
import { FrameImageConfig, FrameHotspot } from '../../three/frames/frameTypes';

interface Proper3DFrameVisualProps {
  image: FrameImageConfig;
  frameIndex: number;
  frameId: string;
  opacity: number;
  onInspect: () => void;
}

export const Proper3DFrameVisual: React.FC<Proper3DFrameVisualProps> = ({
  image,
  frameIndex,
  frameId,
  opacity,
  onInspect,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<FrameHotspot | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse perspective tilt calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: ((y - centerY) / centerY) * -6,
      y: ((x - centerX) / centerX) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setActiveHotspot(null);
  };

  const hotspots = image.hotspots || [];

  // Theme accent colors based on frame
  const getGlowColor = () => {
    if (frameId === 'heart') return 'rgba(225, 29, 72, 0.15)';
    if (frameId === 'treatment') return 'rgba(13, 148, 136, 0.18)';
    if (frameId === 'technology') return 'rgba(15, 23, 42, 0.12)';
    if (frameId === 'brain') return 'rgba(14, 165, 233, 0.20)';
    if (frameId === 'diagnosis') return 'rgba(6, 182, 212, 0.18)';
    return 'rgba(2, 132, 199, 0.18)';
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[540px] select-none group"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 1. Volumetric Ambient Glow Backdrop */}
      <div
        className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`,
          transform: 'scale(1.15)',
        }}
      />

      {/* 2. Floating 3D Subject Stage */}
      <div
        className="relative w-full aspect-square flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`,
        }}
      >
        {/* Contact Shadow Under the 3D Model */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl pointer-events-none transition-transform duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.22) 0%, transparent 75%)',
            transform: `translate(-50%, ${tilt.x * 1.5}px) scale(${1 - tilt.x * 0.02})`,
          }}
        />

        {/* 3D Visual Artwork */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white/40 backdrop-blur-sm border border-white/60 shadow-[0_20px_50px_rgba(2,132,199,0.12)]">
          <img
            src={image.src}
            alt={image.alt}
            loading="eager"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          />

          {/* Precision Clinical HUD Corner Reticles */}
          <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-sky-500/80 rounded-tl pointer-events-none z-10" />
          <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-sky-500/80 rounded-tr pointer-events-none z-10" />
          <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-sky-500/80 rounded-bl pointer-events-none z-10" />
          <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-sky-500/80 rounded-br pointer-events-none z-10" />

          {/* Top Left: Clinical 3D Badge */}
          {image.badge && (
            <div className="absolute top-3.5 left-4 flex items-center space-x-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[9px] font-bold tracking-wider text-sky-800 shadow-sm border border-sky-200/80 backdrop-blur-md z-20">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping" />
              <span>{image.badge}</span>
            </div>
          )}

          {/* Top Right: Fullscreen 8K Inspection Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspect();
            }}
            className="absolute top-3.5 right-4 flex items-center space-x-1.5 rounded-full bg-white/95 hover:bg-sky-50 px-3 py-1 font-mono text-[9px] font-bold text-slate-700 hover:text-sky-700 shadow-sm border border-slate-200 transition-all z-20 focus:outline-none"
            title="Inspect high-resolution 3D medical model"
          >
            <svg className="h-3 w-3 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            <span>8K INSPECT</span>
          </button>

          {/* Interactive Hotspot Telemetry Pins */}
          {hotspots.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id;
            return (
              <div
                key={spot.id}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(isSelected ? null : spot);
                  }}
                  onMouseEnter={() => setActiveHotspot(spot)}
                  className="relative group/spot focus:outline-none cursor-pointer"
                  aria-label={spot.title}
                >
                  <span className="absolute -inset-2 rounded-full bg-sky-400/40 animate-ping" />
                  <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg border-2 border-white text-[10px] font-bold transition-transform group-hover/spot:scale-125">
                    +
                  </span>
                </button>

                {/* Hotspot Floating Telemetry Popover */}
                {isSelected && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-1/2 bottom-full mb-2.5 -translate-x-1/2 w-52 rounded-xl bg-white/95 p-3 shadow-2xl border border-sky-400 backdrop-blur-md z-30 text-left animate-fadeIn pointer-events-auto"
                  >
                    <div className="font-mono text-[8px] uppercase tracking-wider text-sky-700 font-bold">
                      {spot.title}
                    </div>
                    <div className="text-xs font-bold font-mono text-slate-900 mt-0.5">
                      {spot.value}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-1 leading-snug">
                      {spot.detail}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 text-[10px] font-mono text-slate-600 shadow-sm">
            <span className="truncate max-w-[240px] text-slate-700 font-medium">
              {image.caption}
            </span>
            <span className="flex items-center space-x-1.5 text-sky-600 font-semibold pl-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>3D ACTIVE</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
