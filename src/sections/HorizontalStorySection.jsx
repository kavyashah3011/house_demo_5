import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Eye, Scissors, Hourglass, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    number: '01',
    label: 'ORIGIN',
    icon: Compass,
    title: 'WHERE TOBACCO BEGINS',
    subtitle: 'Vuelta Abajo, Pinar del Río',
    quote: 'The red volcanic soil holds minerals that exist nowhere else on earth.',
    text: 'Sheltered by limestone mogotes and blessed with morning mists, the Vega Finas plantations generate leaves with unprecedented oil density and supple elasticity. The earth breathes life into the harvest.',
    bgTone: 'bg-[#0a0705]',
    accentColor: '#c5a059',
    details: [
      { k: 'TERROIR', v: 'Volcanic Alluvial' },
      { k: 'ELEVATION', v: '180m Above Sea' },
      { k: 'MICROCLIMATE', v: 'Subtropical Mist' },
    ],
    graphic: (
      <div className="w-full h-24 rounded bg-[#18120c] border border-[#3d2f1f] p-3 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#dfba73_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="flex items-center justify-between text-[8px] font-mono text-[#c5a059] relative z-10">
          <span>GEO-SURVEY: PINAR DEL RÍO</span>
          <span>22°16'N 83°58'W</span>
        </div>
        <div className="flex items-end justify-between relative z-10">
          <div className="space-y-0.5">
            <span className="text-[7px] font-mono text-[#7e786e] block uppercase">ALLUVIAL PROFILE</span>
            <span className="text-xs font-serif text-[#dfba73]">Iron-Rich Red Volcanic Loam</span>
          </div>
          <div className="w-8 h-8 rounded-full border border-[#dfba73]/40 flex items-center justify-center text-[#dfba73] font-mono text-[9px]">
            180m
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    label: 'SELECTION',
    icon: Eye,
    title: 'ONLY THE CHOSEN LEAVES',
    subtitle: 'Tactile Inspection by Escogedores',
    quote: 'Of ten thousand cured leaves, barely two hundred are deemed worthy of the Monarca capote.',
    text: 'Under neutral north-facing sunlight, master sorters evaluate color consistency, vein diameter, and moisture balance. Every leaf is measured against an unyielding standard perfected over three generations.',
    bgTone: 'bg-[#080706]',
    accentColor: '#dfba73',
    details: [
      { k: 'SELECTION RATIO', v: 'Top 2.1% Yield' },
      { k: 'SORTING PRIMINGS', v: '5 Discrete Tiers' },
      { k: 'INSPECTION TIME', v: '45 Sec Per Leaf' },
    ],
    graphic: (
      <div className="w-full h-24 rounded bg-[#18120c] border border-[#3d2f1f] p-3 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-[8px] font-mono text-[#c5a059]">
          <span>LEAF INSPECTION REPORT</span>
          <span>YIELD: TOP 2.1%</span>
        </div>
        <div className="flex items-center justify-around z-10 py-1">
          <div className="text-center">
            <span className="text-[10px] font-mono text-[#dfba73] block">5</span>
            <span className="text-[7px] font-mono text-[#7e786e] uppercase">Primings</span>
          </div>
          <div className="w-[1px] h-6 bg-[#3d2f1f]" />
          <div className="text-center">
            <span className="text-[10px] font-mono text-[#dfba73] block">0.8mm</span>
            <span className="text-[7px] font-mono text-[#7e786e] uppercase">Max Vein</span>
          </div>
          <div className="w-[1px] h-6 bg-[#3d2f1f]" />
          <div className="text-center">
            <span className="text-[10px] font-mono text-[#dfba73] block">16%</span>
            <span className="text-[7px] font-mono text-[#7e786e] uppercase">Moisture</span>
          </div>
        </div>
        <div className="text-[8px] font-mono text-[#7e786e] flex items-center justify-between">
          <span>GRADE: SUPREMO MADURO</span>
          <span className="text-[#dfba73]">PASSED</span>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    label: 'CRAFT',
    icon: Scissors,
    title: 'SHAPED BY EXPERIENCED HANDS',
    subtitle: 'The Solitary Maestro',
    quote: 'A true torcedor does not count the cigars made in a day. He counts only the flaws avoided.',
    text: 'Sitting at an oiled wooden bench with the crescent chaveta, wooden press mold, and natural tragacanth gum. The bunched filler is folded in accordion pleats to ensure unbroken airflow through the vitola.',
    bgTone: 'bg-[#0b0806]',
    accentColor: '#c5a059',
    details: [
      { k: 'TECHNIQUE', v: 'Totalmente a Mano' },
      { k: 'ARTISAN TENURE', v: '15+ Years Minimum' },
      { k: 'CAP FINISH', v: 'Triple-Flag Parejo' },
    ],
    graphic: (
      <div className="w-full h-24 rounded bg-[#18120c] border border-[#3d2f1f] p-3 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-[8px] font-mono text-[#c5a059]">
          <span>TORCEDOR BENCH TOOLS</span>
          <span>HECHO A MANO</span>
        </div>
        <div className="flex items-center justify-between z-10">
          <div className="space-y-0.5">
            <span className="text-[7px] font-mono text-[#7e786e] block uppercase">TOOLING</span>
            <span className="text-xs font-serif text-[#dfba73]">Crescent Chaveta • Cepo 54</span>
          </div>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-[#dfba73]/40 text-[#dfba73]">
            ACCORDION FOLD
          </span>
        </div>
        <div className="text-[8px] font-mono text-[#7e786e] flex items-center justify-between">
          <span>CAP FINISH: TRIPLE-FLAG PAREJO</span>
          <span className="text-[#dfba73]">MASTER GRADE</span>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    label: 'AGING',
    icon: Hourglass,
    title: 'TIME DEVELOPS CHARACTER',
    subtitle: 'Spanish Cedar Humidor Vaults',
    quote: 'Tobacco is alive. In silence and darkness, harsh ammonia yields to noble sugars.',
    text: 'Laid to rest in solid Spanish cedar cabinets for three to seven years. The porous wood breathes alongside the rolled cigars, naturally regulating humidity while infusing delicate cedarwood tannins.',
    bgTone: 'bg-[#090807]',
    accentColor: '#dfba73',
    details: [
      { k: 'FERMENTATION', v: 'Secondary Natural' },
      { k: 'WOOD SPECIE', v: 'Cedrela Odorata' },
      { k: 'AGING PERIOD', v: '36 to 84 Months' },
    ],
    graphic: (
      <div className="w-full h-24 rounded bg-[#18120c] border border-[#3d2f1f] p-3 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-[8px] font-mono text-[#c5a059]">
          <span>CEDRELA ODORATA VAULT</span>
          <span>SOLERA AGED</span>
        </div>
        <div className="flex items-center justify-around z-10 py-1">
          <div className="text-center">
            <span className="text-[10px] font-mono text-[#dfba73] block">68%</span>
            <span className="text-[7px] font-mono text-[#7e786e] uppercase">Humidity</span>
          </div>
          <div className="w-[1px] h-6 bg-[#3d2f1f]" />
          <div className="text-center">
            <span className="text-[10px] font-mono text-[#dfba73] block">18°C</span>
            <span className="text-[7px] font-mono text-[#7e786e] uppercase">Temp</span>
          </div>
          <div className="w-[1px] h-6 bg-[#3d2f1f]" />
          <div className="text-center">
            <span className="text-[10px] font-mono text-[#dfba73] block">60 MO</span>
            <span className="text-[7px] font-mono text-[#7e786e] uppercase">Cure</span>
          </div>
        </div>
        <div className="text-[8px] font-mono text-[#7e786e] flex items-center justify-between">
          <span>CHLOROPHYLL: 0.0% • RESIN BLOOM</span>
          <span className="text-[#dfba73]">CRYSTALLIZED</span>
        </div>
      </div>
    ),
  },
  {
    number: '05',
    label: 'EXPERIENCE',
    icon: Flame,
    title: 'THE CEREMONIAL DRAW',
    subtitle: 'Velvety Ash & Complex Aromatics',
    quote: 'The cut, the toast, and the cold draw precede an hour of quiet contemplation.',
    text: 'A dense, cool smoke delivers alternating layers of dark roasted cocoa, espresso crema, sweet leather, and crushed black pepper. The ash holds firm and white, testament to mineral equilibrium.',
    bgTone: 'bg-[#0c0806]',
    accentColor: '#c5a059',
    details: [
      { k: 'ASH DENSITY', v: 'Solid White Ring' },
      { k: 'SMOKE COOLNESS', v: '18°C At Palate' },
      { k: 'FINISH LENGTH', v: 'Long & Resinous' },
    ],
    graphic: (
      <div className="w-full h-24 rounded bg-[#18120c] border border-[#3d2f1f] p-3 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-[8px] font-mono text-[#c5a059]">
          <span>CEREMONIAL PALATE</span>
          <span>THE DRAW</span>
        </div>
        <div className="flex items-center justify-between z-10">
          <div className="space-y-0.5">
            <span className="text-[7px] font-mono text-[#7e786e] block uppercase">PAIRING ACCENT</span>
            <span className="text-xs font-serif text-[#dfba73]">Highland Single Malt • Espresso</span>
          </div>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-[#dfba73]/40 text-[#dfba73]">
            SOLID ASH
          </span>
        </div>
        <div className="text-[8px] font-mono text-[#7e786e] flex items-center justify-between">
          <span>COOL SMOKE: 18°C AT PALATE</span>
          <span className="text-[#dfba73]">SUBLIME</span>
        </div>
      </div>
    ),
  },
];

export default function HorizontalStorySection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Calculate horizontal scroll distance
      const totalPanels = panels.length;

      gsap.to(track, {
        xPercent: -100 * (totalPanels - 1) / totalPanels,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.0,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060504] overflow-hidden select-none"
    >
      {/* Top Banner Indicator */}
      <div className="absolute top-8 left-8 sm:left-12 z-30 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#c5a059] uppercase">
          CHRONICLE OF EXCELLENCE
        </span>
        <span className="w-8 h-[1px] bg-[#c5a059]/40" />
        <span className="font-mono text-[10px] text-[#7e786e]">
          SCROLL TO NAVIGATE CHRONOLOGICALLY
        </span>
      </div>

      {/* Horizontal Track Container */}
      <div
        ref={trackRef}
        className="flex h-full w-[500vw] will-change-transform"
      >
        {panels.map((panel, idx) => {
          const IconComponent = panel.icon;
          return (
            <div
              key={panel.number}
              className={`w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 sm:p-16 md:p-24 relative ${panel.bgTone} border-r border-[#2a241c]/50`}
            >
              {/* Background Large Giant Number Watermark */}
              <div className="absolute right-12 bottom-6 font-serif text-[18vw] font-bold text-[#c5a059]/5 pointer-events-none select-none leading-none">
                {panel.number}
              </div>

              {/* Editorial Content Card */}
              <div className="max-w-4xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left 7 Columns: Story & Editorial Copy */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 bg-[#14100c] flex items-center justify-center text-[#dfba73]">
                      <IconComponent size={14} />
                    </div>
                    <span className="font-mono text-xs tracking-widest text-[#dfba73]">
                      CHAPTER {panel.number}
                    </span>
                    <span className="w-6 h-[1px] bg-[#c5a059]/30" />
                    <span className="font-mono text-[10px] tracking-[0.3em] text-[#c5a059] uppercase">
                      {panel.label}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#f5f0ea] tracking-wider uppercase font-light leading-tight">
                    {panel.title}
                  </h2>

                  <h3 className="font-serif text-lg sm:text-xl text-gold-gradient tracking-wide font-light">
                    {panel.subtitle}
                  </h3>

                  <blockquote className="border-l-2 border-[#c5a059] pl-4 font-cormorant italic text-base sm:text-lg text-[#dfba73]/90 my-3">
                    "{panel.quote}"
                  </blockquote>

                  <p className="font-sans text-sm sm:text-base text-[#c2bbb0] font-light leading-relaxed max-w-xl">
                    {panel.text}
                  </p>
                </div>

                {/* Right 4 Columns: Luxury Editorial Spec Plate */}
                <div className="lg:col-span-4 bg-[#12100d]/90 backdrop-blur-md border border-[#c5a059]/30 p-5 sm:p-7 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-3.5">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#2a241c]">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[#c5a059] uppercase">
                      ARCHIVE TELEMETRY
                    </span>
                    <span className="font-mono text-[10px] text-[#7e786e]">
                      P. {idx + 1}/5
                    </span>
                  </div>

                  {/* Visual Plate Graphic */}
                  {panel.graphic}

                  <div className="space-y-2.5">
                    {panel.details.map((d) => (
                      <div key={d.k} className="flex flex-col">
                        <span className="font-mono text-[9px] tracking-widest text-[#7e786e] uppercase">
                          {d.k}
                        </span>
                        <span className="font-serif text-sm sm:text-base text-[#f5f0ea] tracking-wider">
                          {d.v}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2.5 border-t border-[#2a241c] flex items-center justify-between font-mono text-[10px] text-[#c5a059]">
                    <span>STATUS: VALIDATED</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfba73] animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
