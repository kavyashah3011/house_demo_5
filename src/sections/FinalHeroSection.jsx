import React, { useState } from 'react';
import CigarVisualEngine from '../components/canvas/CigarVisualEngine';
import SmokeCanvas from '../components/canvas/SmokeCanvas';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FinalHeroSection({ onOpenConcierge }) {
  const [cigarTransform] = useState({
    rotX: 0.12,
    rotY: 0.45,
    rotZ: -0.22,
    posX: 0,
    posY: 0.24,
    posZ: 0.05,
    scale: 0.86,
    emberIntensity: 1.3,
  });

  return (
    <section className="relative w-full h-screen bg-[#060504] overflow-hidden flex flex-col justify-between pt-28 pb-12 select-none">
      {/* Background Volumetric Light & Dark Luxury Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_45%,rgba(66,40,24,0.38)_0%,rgba(18,11,7,0.7)_55%,rgba(6,5,4,1)_95%)]" />

      {/* Atmospheric Smoke and Floating Gold Embers */}
      <SmokeCanvas density="medium" />

      {/* Centerpiece Hero 3D Cigar */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <CigarVisualEngine transformState={cigarTransform} />
      </div>

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-2xl mx-auto px-6 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#c5a059] uppercase block mb-1">
          FINALE & CEREMONY
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#f5f0ea] tracking-[0.16em] uppercase font-light">
          THE ART OF THE CIGAR
        </h2>
        <div className="w-16 h-[1px] bg-[#c5a059]/40 mx-auto mt-3" />
      </div>

      {/* Bottom Sophisticated CTA Group */}
      <div className="relative z-20 max-w-xl mx-auto px-6 text-center space-y-4">
        <p className="font-sans text-xs sm:text-sm text-[#c2bbb0] max-w-md mx-auto font-light leading-relaxed">
          Allocated directly from the aging lockers of Vuelta Abajo to private collectors and certified luxury salons worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Main Discover CTA Button with Sophisticated Hover Effect */}
          <a
            href="#collection"
            className="group relative px-8 py-3.5 border border-[#dfba73] bg-[#c5a059]/15 hover:bg-[#c5a059] text-[#dfba73] hover:text-[#060504] font-serif text-sm tracking-[0.25em] font-semibold uppercase rounded-sm shadow-[0_0_25px_rgba(197,160,89,0.2)] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">DISCOVER THE COLLECTION</span>
            <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 pointer-events-none" />
          </a>

          {/* Concierge Allocation CTA */}
          <button
            onClick={onOpenConcierge}
            className="px-6 py-3.5 border border-[#2a241c] hover:border-[#c5a059] bg-[#0e0c0a] text-[#c2bbb0] hover:text-[#dfba73] font-mono text-xs tracking-widest uppercase rounded-sm transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles size={13} />
            <span>PRIVATE ALLOCATION</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-[9px] font-mono text-[#7e786e] pt-3">
          <span className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-[#c5a059]" /> Certified Climate Controlled
          </span>
          <span>•</span>
          <span>Strictly 21+ In Accordance with Law</span>
        </div>
      </div>
    </section>
  );
}
