import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Compass } from 'lucide-react';
import { audioEngine } from './AudioEngine';

export default function HeaderHUD({ scrollProgress = 0, onOpenMenu }) {
  const [isMuted, setIsMuted] = useState(false);
  const [coord, setCoord] = useState('-100 AC');

  useEffect(() => {
    // Dynamic coordinate calculation based on scroll progress
    const val = Math.round(-100 + scrollProgress * 250);
    setCoord(`${val > 0 ? '+' : ''}${val} AC`);
  }, [scrollProgress]);

  const handleToggleSound = () => {
    const active = audioEngine.toggleMute();
    setIsMuted(!active);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none transition-all duration-500">
      {/* Top Left: Compass & Coordinates */}
      <div className="flex items-center gap-2 pointer-events-auto bg-black/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
        <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
        <span className="font-mono text-xs tracking-widest text-emerald-300 font-medium">
          [ {coord} ]
        </span>
      </div>

      {/* Top Center: Subtitle / Brand Mark */}
      <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
        <span>ASTRA ARCHIVE</span>
        <span>•</span>
        <span>EXPERIENCE 01</span>
      </div>

      {/* Top Right: Soundscape Equalizer & Controls */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full transition-all duration-300 text-white/80 hover:text-white"
          title="Toggle Ambient Audio"
        >
          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3 w-3.5">
            <span className={`w-0.5 bg-emerald-400 rounded-full ${!isMuted ? 'animate-[bounce_0.6s_infinite_alternate]' : 'h-1'}`} style={{ height: !isMuted ? '80%' : '20%' }} />
            <span className={`w-0.5 bg-emerald-400 rounded-full ${!isMuted ? 'animate-[bounce_0.8s_infinite_alternate_0.2s]' : 'h-1.5'}`} style={{ height: !isMuted ? '100%' : '40%' }} />
            <span className={`w-0.5 bg-emerald-400 rounded-full ${!isMuted ? 'animate-[bounce_0.5s_infinite_alternate_0.4s]' : 'h-1'}`} style={{ height: !isMuted ? '60%' : '30%' }} />
          </div>
          <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
            {isMuted ? 'MUTED' : 'SOUND'}
          </span>
        </button>
      </div>
    </header>
  );
}
