import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const flavorNotes = [
  {
    name: 'SPANISH CEDAR',
    category: 'Wood & Resins',
    stage: 'First & Second Third',
    intensity: '94%',
    nuance: 'Subtle sweet woodiness imparted by five years resting in Cedrela Odorata humidor lockers.',
    coords: 'top-[4%] left-[2%] md:left-[5%]',
  },
  {
    name: 'DARK CACAO',
    category: 'Sweets & Confection',
    stage: 'First Third Peak',
    intensity: '88%',
    nuance: 'Bittersweet 85% chocolate with roasted nibs, prominent on the front palate and retrohale.',
    coords: 'top-[4%] right-[2%] md:right-[5%]',
  },
  {
    name: 'ROASTED ESPRESSO',
    category: 'Roast & Crema',
    stage: 'Entire Smoke',
    intensity: '92%',
    nuance: 'Dense, aromatic roasted Italian espresso crema providing a creamy backbone to the draw.',
    coords: 'top-[38%] left-[0%] md:left-[2%]',
  },
  {
    name: 'EXOTIC SPICE',
    category: 'Piquant & Warmth',
    stage: 'Mid to Final Third',
    intensity: '82%',
    nuance: 'Cinnamon stick, nutmeg, and cracked tellicherry black pepper tingling on the retrohale.',
    coords: 'top-[38%] right-[0%] md:right-[2%]',
  },
  {
    name: 'VINTAGE LEATHER',
    category: 'Animalic & Aged',
    stage: 'Second Third',
    intensity: '86%',
    nuance: 'Supple horse-saddle leather and warm parchment characteristic of mature Corojo wrapper leaf.',
    coords: 'bottom-[4%] left-[2%] md:left-[5%]',
  },
  {
    name: 'MINERAL EARTH',
    category: 'Terroir & Soil',
    stage: 'Final Third Climax',
    intensity: '90%',
    nuance: 'Rich, damp red alluvial loam and volcanic soil that lingers long after the final puff.',
    coords: 'bottom-[4%] right-[2%] md:right-[5%]',
  },
];

const thirdsData = [
  {
    label: 'FIRST THIRD',
    subtitle: 'The Awakening (0 – 25 Min)',
    dominant: 'Spanish Cedar, Creamy Espresso, Brioche',
    desc: 'Mild white pepper greets the tongue, swiftly yielding to sweet cedarwood and velvety cocoa cream. The smoke is exceptionally cool and gentle.',
  },
  {
    label: 'SECOND THIRD',
    subtitle: 'The Symphony (25 – 55 Min)',
    dominant: 'Dark Cacao, Vintage Leather, Roasted Nuts',
    desc: 'The flavor body deepens significantly. Rich essential oils coat the palate. Complex notes of saddle leather, roasted almonds, and dark molasses harmonize.',
  },
  {
    label: 'FINAL THIRD',
    subtitle: 'The Climax (55 – 85 Min)',
    dominant: 'Mineral Earth, Black Pepper, Smoked Oak',
    desc: 'Full strength takes the stage. Warm piquant spices and damp mineral earth crescendo with zero bitterness, leaving a lasting, aristocratic finish.',
  },
];

export default function FlavorProfileSection() {
  const containerRef = useRef(null);
  const centerSphereRef = useRef(null);
  const [activeThird, setActiveThird] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Floating animation for each note node
      gsap.utils.toArray('.flavor-node').forEach((node, i) => {
        gsap.to(node, {
          y: '-=12',
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // ScrollTrigger timeline revealing notes sequentially
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1.0,
        },
      });

      tl.fromTo(
        '.flavor-node',
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.15, ease: 'power2.out' }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flavor"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#060504] pt-32 pb-20 px-6 overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Background Volumetric Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(45,28,17,0.35)_0%,rgba(14,10,7,0.7)_50%,rgba(6,5,4,1)_85%)]" />

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-3xl mx-auto mb-12">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#c5a059] uppercase block mb-1">
          AROMA CHEMISTRY & PALATE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f0ea] tracking-[0.16em] uppercase font-light">
          FLAVOR NOTES
        </h2>
        <div className="w-16 h-[1px] bg-[#c5a059]/40 mx-auto mt-3 mb-3" />
        <p className="font-sans text-xs sm:text-sm text-[#c2bbb0] max-w-lg mx-auto font-light leading-relaxed">
          Crafted without artificial infusions or flavoring. The palate is shaped entirely through mineral terroir, seed varietals, and cedar curing.
        </p>
      </div>

      {/* Interactive Floating Notes Arena */}
      <div className="relative z-20 w-full max-w-6xl mx-auto h-[480px] sm:h-[540px] flex items-center justify-center my-4">
        {/* Central Core Medallion with concentric rings */}
        <div
          ref={centerSphereRef}
          className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-[#c5a059]/30 bg-[#120f0c]/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6 shadow-[0_0_60px_rgba(197,160,89,0.15)]"
        >
          {/* Subtle Outer Concentric Ring */}
          <div className="absolute -inset-6 rounded-full border border-[#c5a059]/15 animate-spin-very-slow pointer-events-none" />
          <div className="absolute -inset-14 rounded-full border border-[#c5a059]/10 pointer-events-none" />

          <span className="font-mono text-[9px] tracking-[0.3em] text-[#c5a059] uppercase mb-1">
            CORE ESSENCE
          </span>
          <span className="font-serif text-2xl sm:text-3xl text-[#f5f0ea] font-medium tracking-wider">
            BALANCE
          </span>
          <span className="w-8 h-[1px] bg-[#c5a059]/50 my-1.5" />
          <span className="font-mono text-[9px] text-[#7e786e] tracking-widest">
            100% NATURAL
          </span>
        </div>

        {/* Floating Elegant Flavor Nodes */}
        {flavorNotes.map((note) => (
          <div
            key={note.name}
            className={`flavor-node absolute ${note.coords} max-w-[210px] sm:max-w-[240px] bg-[#0e0c0a]/85 backdrop-blur-md border border-[#c5a059]/25 hover:border-[#dfba73] p-3.5 sm:p-4 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.85)] transition-all duration-300 group cursor-default`}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-[#2a241c] text-[9px] font-mono text-[#7e786e]">
              <span>{note.category.toUpperCase()}</span>
              <span className="text-[#dfba73]">{note.intensity}</span>
            </div>

            <h4 className="font-serif text-sm sm:text-base text-[#f5f0ea] tracking-wider mt-1 group-hover:text-[#dfba73] transition-colors">
              {note.name}
            </h4>

            <p className="font-sans text-[11px] text-[#c2bbb0] leading-snug mt-1 font-light">
              {note.nuance}
            </p>

            <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-[#c5a059]">
              <span>STAGE: {note.stage}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: Thirds Progression Tabs */}
      <div className="relative z-20 max-w-4xl mx-auto w-full mt-10">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
          {thirdsData.map((third, idx) => (
            <button
              key={third.label}
              onClick={() => setActiveThird(idx)}
              className={`py-3 px-4 rounded-sm border text-left transition-all duration-300 ${
                activeThird === idx
                  ? 'border-[#dfba73] bg-[#1a140e] text-[#dfba73] shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                  : 'border-[#2a241c] bg-[#0d0c0a] text-[#7e786e] hover:border-[#3d3428] hover:text-[#c2bbb0]'
              }`}
            >
              <span className="font-mono text-[9px] tracking-widest uppercase block">
                {third.label}
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#f5f0ea] tracking-wide block mt-0.5">
                {third.subtitle}
              </span>
            </button>
          ))}
        </div>

        {/* Third Description Box */}
        <div className="bg-[#100e0b] border border-[#2a241c] p-5 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[9px] tracking-widest text-[#c5a059] uppercase">
              DOMINANT PALATE ACCENTS:
            </span>
            <p className="font-serif text-base text-[#f5f0ea] tracking-wide">
              {thirdsData[activeThird].dominant}
            </p>
            <p className="font-sans text-xs text-[#c2bbb0] font-light leading-relaxed max-w-2xl">
              {thirdsData[activeThird].desc}
            </p>
          </div>
          <div className="flex-shrink-0 self-start sm:self-center font-mono text-[10px] text-[#7e786e] border-l border-[#2a241c] pl-4">
            EVOLUTION: LINEAR & PURE
          </div>
        </div>
      </div>
    </section>
  );
}
