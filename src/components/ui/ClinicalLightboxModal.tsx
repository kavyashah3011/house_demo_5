import React, { useState, useEffect } from 'react';
import { Healthcare3DFrame } from '../../three/frames/frameTypes';

interface ClinicalLightboxModalProps {
  frame: Healthcare3DFrame | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicalLightboxModal: React.FC<ClinicalLightboxModalProps> = ({
  frame,
  isOpen,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setZoomLevel(1);
      setActiveHotspotId(null);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !frame) return null;

  const hotspots = frame.image.hotspots || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col lg:flex-row bg-white/95 rounded-3xl border border-sky-300/60 shadow-[0_25px_70px_rgba(2,132,199,0.3)] overflow-hidden">
        {/* Precision Corner Accent Brackets */}
        <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-sky-600 rounded-tl pointer-events-none z-20" />
        <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-sky-600 rounded-tr pointer-events-none z-20" />
        <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-sky-600 rounded-bl pointer-events-none z-20" />
        <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-sky-600 rounded-br pointer-events-none z-20" />

        {/* Left: 8K Visual Viewport */}
        <div className="relative flex-1 bg-gradient-to-b from-slate-100 to-sky-50 flex items-center justify-center p-4 sm:p-8 overflow-hidden min-h-[360px] lg:min-h-[600px]">
          {/* Zoom Control Pill */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-200 shadow-sm text-xs font-mono text-slate-700">
            <span>ZOOM:</span>
            <button
              onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
              disabled={zoomLevel <= 1}
              className="h-6 w-6 rounded-full bg-slate-100 hover:bg-sky-100 disabled:opacity-40 flex items-center justify-center font-bold text-slate-800"
            >
              -
            </button>
            <span className="w-10 text-center font-bold text-sky-700">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.25))}
              disabled={zoomLevel >= 2.5}
              className="h-6 w-6 rounded-full bg-slate-100 hover:bg-sky-100 disabled:opacity-40 flex items-center justify-center font-bold text-slate-800"
            >
              +
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="text-[10px] text-sky-600 underline font-semibold ml-1"
              >
                Reset
              </button>
            )}
          </div>

          {/* Active 3D Render Image Container */}
          <div
            className="relative transition-transform duration-300 ease-out max-h-full max-w-full flex items-center justify-center cursor-crosshair"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={frame.image.src}
              alt={frame.image.alt}
              className="max-h-[520px] w-auto object-contain rounded-2xl shadow-xl select-none"
            />

            {/* Interactive Clinical Hotspot Markers */}
            {hotspots.map((spot) => {
              const isActive = activeHotspotId === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <button
                    onClick={() => setActiveHotspotId(isActive ? null : spot.id)}
                    className="relative group focus:outline-none"
                    aria-label={spot.title}
                  >
                    <span className="absolute -inset-2 rounded-full bg-sky-500/30 animate-ping" />
                    <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg border-2 border-white text-[11px] font-bold transition-transform group-hover:scale-125">
                      +
                    </span>
                  </button>

                  {/* Hotspot Floating Tooltip */}
                  {isActive && (
                    <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-56 rounded-xl bg-white/95 p-3 shadow-2xl border border-sky-400 backdrop-blur-md z-40 text-left animate-fadeIn">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-sky-700 font-bold">
                        {spot.title}
                      </div>
                      <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">
                        {spot.value}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                        {spot.detail}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Telemetry Status Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-[11px] font-mono text-slate-600">
            <span className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ISOTROPIC 8K RENDER FIDELITY</span>
            </span>
            <span className="text-sky-700 font-semibold">{frame.image.caption}</span>
          </div>
        </div>

        {/* Right: Clinical Telemetry & Detailed Specifications */}
        <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 bg-white overflow-y-auto">
          <div>
            {/* Header with Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                <span>FRAME {frame.index + 1} / 10</span>
                <span>•</span>
                <span>{frame.name}</span>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-sm font-bold transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Title & Clinical Narrative */}
            <div className="mt-4">
              <h3 className="text-2xl font-display font-extrabold text-slate-900 leading-tight">
                {frame.text.headline}
              </h3>
              <p className="mt-2 text-xs font-semibold text-sky-700">
                {frame.text.subheadline}
              </p>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                {frame.text.description}
              </p>
            </div>

            {/* Key Clinical Telemetry */}
            {frame.text.metrics && (
              <div className="mt-6 space-y-2.5">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Clinical Metrics & Benchmarks
                </h4>
                {frame.text.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{m.label}</div>
                      {m.sublabel && (
                        <div className="text-[10px] text-teal-600 font-medium">{m.sublabel}</div>
                      )}
                    </div>
                    <div className="text-base font-bold font-mono text-sky-700">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Hotspot List */}
            {hotspots.length > 0 && (
              <div className="mt-6">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Inspectable Anatomical Features ({hotspots.length})
                </h4>
                <div className="space-y-1.5">
                  {hotspots.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspotId(activeHotspotId === spot.id ? null : spot.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                        activeHotspotId === spot.id
                          ? 'bg-sky-100 text-sky-900 border border-sky-400 font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>{spot.title}</span>
                      <span className="text-sky-700 font-bold">{spot.value}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="mt-8 pt-4 border-t border-slate-200">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 shadow-md font-bold transition-all"
            >
              Return to 3D Navigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
