import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Shield, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timeMilestones = [
  {
    year: 'YEAR 01',
    phase: 'PRIMARY FERMENTATION',
    attribute: 'Patience',
    summary: 'Raw vegetable harshness and excess ammonia dissipate within temperature-controlled pilones.',
    chemicalChange: 'Chlorophyll → Amber Carotenes',
  },
  {
    year: 'YEAR 03',
    phase: 'SOLERA TRANQUILITY',
    attribute: 'Aging',
    summary: 'Resting in solid Spanish cedar cabinets. Tannins soften as essential oils marry across the blend.',
    chemicalChange: 'Polyphenol Oxidation → Rich Tannin Softening',
  },
  {
    year: 'YEAR 05',
    phase: 'PLUME CRYSTALLIZATION',
    attribute: 'Character',
    summary: 'The wrapper achieves an oily velvet luster. Microscopic essential oils crystallize naturally on the leaf.',
    chemicalChange: 'Essential Oil Bloom • Peak Smoking Equilibrium',
  },
  {
    year: 'YEAR 07',
    phase: 'ATELIER RESERVA',
    attribute: 'Legacy',
    summary: 'Reserved solely for private allocation cabinets. An incomparable smoking experience of profound depth.',
    chemicalChange: 'Vintage Solera Perfection • Single-Cask Allocation',
  },
];

export default function AgingTimeSection() {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Spotlight moves slowly across the aging room
      gsap.to(spotlightRef.current, {
        x: '+=120',
        y: '-=40',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Pinned ScrollTrigger for the aging timeline
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const idx = Math.min(
            timeMilestones.length - 1,
            Math.floor(self.progress * timeMilestones.length)
          );
          setActiveYearIndex(idx);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const currentMilestone = timeMilestones[activeYearIndex];

  return (
    <section
      id="time"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060504] overflow-hidden flex flex-col justify-between pt-32 pb-8 select-none"
    >
      {/* Moving Warm Light Beam in Dark Aging Vault */}
      <div
        ref={spotlightRef}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.12)_0%,rgba(66,40,24,0.06)_40%,transparent_70%)] pointer-events-none blur-3xl will-change-transform"
      />

      {/* Atmospheric Wooden Humidor Vault Wall Silhouette */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_60px,#1a110a_60px,#1a110a_62px)]" />

      {/* Floating Micro Dust Motes Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_30%_40%,rgba(223,186,115,0.4)_1px,transparent_1px),radial-gradient(circle_at_70%_60%,rgba(223,186,115,0.3)_1px,transparent_1px)] bg-[length:90px_90px]" />

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-6">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#c5a059] uppercase block mb-1">
          THE ALCHEMY OF PATIENCE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#f5f0ea] tracking-[0.16em] uppercase font-light">
          TIME CHANGES EVERYTHING
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3 text-gold-gradient font-serif text-sm tracking-widest uppercase">
          <span>PATIENCE</span>
          <span>→</span>
          <span>AGING</span>
          <span>→</span>
          <span>CHARACTER</span>
        </div>
      </div>

      {/* Centerpiece: Time Stage Card */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 w-full flex items-center justify-center">
        <div className="w-full max-w-xl bg-[#0e0c0a]/90 backdrop-blur-xl border border-[#c5a059]/40 p-8 sm:p-10 rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c5a059]/30 bg-[#14120e] text-[10px] font-mono text-[#dfba73]">
            <Clock size={12} />
            <span>SOLERA MATURATION CYCLE</span>
          </div>

          <div className="font-serif text-5xl sm:text-6xl text-gold-bright tracking-wider font-semibold">
            {currentMilestone.year}
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#f5f0ea] tracking-widest uppercase">
            {currentMilestone.phase}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#c2bbb0] leading-relaxed max-w-md mx-auto font-light">
            {currentMilestone.summary}
          </p>

          <div className="pt-3 border-t border-[#2a241c] flex items-center justify-between text-[10px] font-mono text-[#7e786e]">
            <span>TRANSFORMATION:</span>
            <span className="text-[#dfba73]">{currentMilestone.chemicalChange}</span>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Milestones */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 w-full">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {timeMilestones.map((m, idx) => (
            <div
              key={m.year}
              onClick={() => setActiveYearIndex(idx)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div
                className={`w-full h-1 rounded-full transition-all duration-300 ${
                  idx === activeYearIndex
                    ? 'bg-[#dfba73] shadow-[0_0_12px_#dfba73]'
                    : 'bg-[#2a241c] group-hover:bg-[#3d3428]'
                }`}
              />
              <span
                className={`font-mono text-[9px] tracking-wider transition-colors ${
                  idx === activeYearIndex ? 'text-[#dfba73]' : 'text-[#7e786e]'
                }`}
              >
                {m.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
