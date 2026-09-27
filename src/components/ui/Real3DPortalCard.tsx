import React, { useState, useRef } from 'react';
import { FrameImageConfig, FrameHotspot } from '../../three/frames/frameTypes';

interface Real3DPortalCardProps {
  image: FrameImageConfig;
  align?: 'left' | 'right' | 'center';
  opacity?: number;
  onInspect?: () => void;
}

export const Real3DPortalCard: React.FC<Real3DPortalCardProps> = ({
  image,
  align = 'right',
  opacity = 1,
  onInspect,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<FrameHotspot | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Controlled, elegant 3D perspective tilt
    setTilt({
      x: ((y - centerY) / centerY) * -5,
      y: ((x - centerX) / centerX) * 5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setActiveHotspot(null);
  };

  const hotspots = image.hotspots || [];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="group relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] rounded-3xl bg-white/95 p-3 sm:p-4 border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(2,132,199,0.18)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_25px_65px_-10px_rgba(2,132,199,0.28)] hover:border-sky-400"
    >
      {/* Precision Clinical Corner Brackets */}
      <div className="absolute top-2 left-2 h-3.5 w-3.5 border-t-2 border-l-2 border-sky-500 rounded-tl pointer-events-none z-20" />
      <div className="absolute top-2 right-2 h-3.5 w-3.5 border-t-2 border-r-2 border-sky-500 rounded-tr pointer-events-none z-20" />
      <div className="absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-sky-500 rounded-bl pointer-events-none z-20" />
      <div className="absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-sky-500 rounded-br pointer-events-none z-20" />

      {/* 3D Image Canvas Window */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-sky-50 shadow-inner">
        <img
          src={image.src}
          alt={image.alt}
          loading="eager"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dynamic Holographic Glass Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-white/40 pointer-events-none" />

        {/* Clinical 3D Badge */}
        {image.badge && (
          <div className="absolute top-3 left-3 flex items-center space-x-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-sky-800 shadow-md border border-sky-200 backdrop-blur-md z-20">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping" />
            <span>{image.badge}</span>
          </div>
        )}

        {/* Expand / Inspect Button in Top-Right */}
        {onInspect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspect();
            }}
            className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-white/95 hover:bg-sky-50 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-700 hover:text-sky-700 shadow-md border border-slate-200 transition-all z-20 focus:outline-none"
            title="Inspect 3D model in 8K Lightbox"
          >
            <svg className="h-3 w-3 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            <span>INSPECT</span>
          </button>
        )}

        {/* Interactive Hotspots Overlaid on Image */}
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
                className="relative group/spot focus:outline-none"
                aria-label={spot.title}
              >
                <span className="absolute -inset-1.5 rounded-full bg-sky-400/40 animate-ping" />
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-white shadow-md border-2 border-white text-[9px] font-bold transition-transform group-hover/spot:scale-125">
                  +
                </span>
              </button>

              {/* Interactive Tooltip Card */}
              {isSelected && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 rounded-xl bg-white/95 p-2.5 shadow-2xl border border-sky-400 backdrop-blur-md z-30 text-left animate-fadeIn pointer-events-auto"
                >
                  <div className="font-mono text-[8px] uppercase tracking-wider text-sky-700 font-bold">
                    {spot.title}
                  </div>
                  <div className="text-xs font-bold font-mono text-slate-900 mt-0.5">
                    {spot.value}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                    {spot.detail}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Card Caption & Status Bar */}
      <div className="mt-3 flex items-center justify-between px-1 font-mono text-[11px] text-slate-500">
        <span className="truncate text-slate-700 font-medium">{image.caption}</span>
        <button
          onClick={onInspect}
          className="flex items-center space-x-1 text-sky-600 hover:text-sky-800 font-semibold pl-2 transition-colors cursor-pointer"
        >
          <span>3D ACTIVE</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>
    </div>
  );
};
