import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    id: 'leaf',
    number: '01',
    title: 'THE LEAF',
    subtitle: 'Nurtured in Volcanic Mineral Soil',
    description:
      'Harvested leaf by leaf across five separate primings. Only leaves with flawless elasticity, unbroken veining, and rich natural oils are approved for the curing barn.',
    badge: 'HARVEST & CURING',
    visualStyle: 'from-[#1f2d18]/40 via-[#131a0e]/60 to-[#060504]',
    spec: 'Vuelta Abajo • 45-Day Slow Air Cure',
    renderGraphic: () => (
      <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-80 md:h-80 mx-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#432818" />
            <stop offset="50%" stopColor="#2c1a0e" />
            <stop offset="100%" stopColor="#140b06" />
          </linearGradient>
          <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dfba73" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c5a059" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Stylized Tobacco Leaf Silhouette */}
        <path
          d="M200 40 C280 90 330 180 320 280 C310 350 240 370 200 380 C160 370 90 350 80 280 C70 180 120 90 200 40 Z"
          fill="url(#leafGrad)"
          stroke="#c5a059"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Main Leaf Stem */}
        <path d="M200 45 Q200 200 200 378" stroke="url(#veinGrad)" strokeWidth="2.5" fill="none" />
        {/* Branching Leaf Veins */}
        <path d="M200 110 Q250 130 290 145 M200 110 Q150 130 110 145" stroke="url(#veinGrad)" strokeWidth="1.2" fill="none" />
        <path d="M200 170 Q260 195 310 215 M200 170 Q140 195 90 215" stroke="url(#veinGrad)" strokeWidth="1.2" fill="none" />
        <path d="M200 230 Q260 260 305 285 M200 230 Q140 260 95 285" stroke="url(#veinGrad)" strokeWidth="1.2" fill="none" />
        <path d="M200 290 Q245 320 280 340 M200 290 Q155 320 120 340" stroke="url(#veinGrad)" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    id: 'blend',
    number: '02',
    title: 'THE BLEND',
    subtitle: 'The Harmonic Secret of the Master',
    description:
      'A multi-vintage marriage of three distinct leaf types. Ligero provides dense body, Seco introduces intricate floral and spice aromatics, while Volado ensures a serene, effortless combustion.',
    badge: 'LIGERO • SECO • VOLADO',
    visualStyle: 'from-[#381a10]/40 via-[#1f0d06]/60 to-[#060504]',
    spec: 'Ratio: 40% Ligero • 35% Seco • 25% Volado',
    renderGraphic: () => (
      <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-80 md:h-80 mx-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        {/* Concentric Trio Blend Wheel */}
        <circle cx="200" cy="200" r="140" fill="none" stroke="#2a1a11" strokeWidth="24" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#c5a059" strokeWidth="24" strokeDasharray="320 600" strokeDashoffset="0" />
        <circle cx="200" cy="200" r="105" fill="none" stroke="#8e6f36" strokeWidth="18" strokeDasharray="280 500" strokeDashoffset="50" />
        <circle cx="200" cy="200" r="75" fill="none" stroke="#dfba73" strokeWidth="12" strokeDasharray="200 400" strokeDashoffset="120" />
        <circle cx="200" cy="200" r="6" fill="#f5f0ea" />
        <text x="200" y="195" textAnchor="middle" fill="#dfba73" fontFamily="Cinzel" fontSize="12" letterSpacing="3">HARMONY</text>
        <text x="200" y="215" textAnchor="middle" fill="#c2bbb0" fontFamily="Space Mono" fontSize="9" letterSpacing="2">3 VINTAGES</text>
      </svg>
    ),
  },
  {
    id: 'roll',
    number: '03',
    title: 'THE ROLL',
    subtitle: 'Totalmente a Mano by Master Torcedores',
    description:
      'With a single curve of the crescent-shaped chaveta knife, the artisan cuts the wrapper leaf to micron precision. Rolled with accordion folding to achieve an unyielding, symmetrical draw.',
    badge: 'CHAVETA & CEPO',
    visualStyle: 'from-[#2e1d13]/40 via-[#170e08]/60 to-[#060504]',
    spec: 'Max 120 Cigars Per Torcedor / Day',
    renderGraphic: () => (
      <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-80 md:h-80 mx-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        {/* Chaveta Blade Silhouette in Burnished Steel & Brass */}
        <defs>
          <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cfd8dc" />
            <stop offset="70%" stopColor="#607d8b" />
            <stop offset="100%" stopColor="#263238" />
          </linearGradient>
        </defs>
        <path
          d="M90 220 Q200 80 310 220 C270 240 130 240 90 220 Z"
          fill="url(#bladeGrad)"
          stroke="#dfba73"
          strokeWidth="1.5"
        />
        {/* Wooden Handle */}
        <rect x="175" y="235" width="50" height="70" rx="6" fill="#3e2723" stroke="#8d6e63" strokeWidth="2" />
        <circle cx="200" cy="255" r="4" fill="#dfba73" />
        <circle cx="200" cy="285" r="4" fill="#dfba73" />
        {/* Golden Inscription on Blade */}
        <text x="200" y="175" textAnchor="middle" fill="#dfba73" fontFamily="Cinzel" fontSize="10" letterSpacing="4">TOTALMENTE A MANO</text>
      </svg>
    ),
  },
  {
    id: 'rest',
    number: '04',
    title: 'THE REST',
    subtitle: 'Solera Aging in Spanish Cedar Humidors',
    description:
      'Resting for a minimum of 36 to 60 months in solid Cedrela Odorata rooms maintained at 68% relative humidity and 18°C. Tannins soften into silky sweetness as essential oils crystallize.',
    badge: 'SPANISH CEDAR VAULT',
    visualStyle: 'from-[#3a2010]/40 via-[#180b05]/60 to-[#060504]',
    spec: 'Climate: 68% RH • 18°C • Zero Light',
    renderGraphic: () => (
      <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-80 md:h-80 mx-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        {/* Spanish Cedar Cabinet Slats */}
        <rect x="70" y="100" width="260" height="200" rx="4" fill="#2d1c12" stroke="#c5a059" strokeWidth="1.5" />
        {[135, 170, 205, 240, 275].map((y) => (
          <line key={y} x1="85" y1={y} x2="315" y2={y} stroke="#4a2e1d" strokeWidth="2" strokeDasharray="6 4" />
        ))}
        {/* Hygrometer Instrument Dial */}
        <circle cx="200" cy="200" r="45" fill="#140d08" stroke="#dfba73" strokeWidth="2.5" />
        <circle cx="200" cy="200" r="38" fill="none" stroke="#c5a059" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="200" y1="200" x2="225" y2="185" stroke="#dfba73" strokeWidth="2" />
        <circle cx="200" cy="200" r="3" fill="#dfba73" />
        <text x="200" y="222" textAnchor="middle" fill="#f5f0ea" fontFamily="Space Mono" fontSize="9">68% RH</text>
      </svg>
    ),
  },
  {
    id: 'finish',
    number: '05',
    title: 'THE FINISH',
    subtitle: 'The Triple Parejo Cap & Embossed Anilla',
    description:
      'Each finished vitola is crowned with a traditional triple-flag cap and adorned with the Monarca gold-embossed seal. Tested by air-draw drawmaster machines before entering private allocation.',
    badge: 'INSPECTED & SEALED',
    visualStyle: 'from-[#422818]/40 via-[#1c130d]/60 to-[#060504]',
    spec: '100% Draw Tested • Zero Imperfections',
    renderGraphic: () => (
      <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-80 md:h-80 mx-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        {/* Golden Medallion of Seal */}
        <circle cx="200" cy="200" r="90" fill="#230a10" stroke="#dfba73" strokeWidth="4" />
        <circle cx="200" cy="200" r="80" fill="none" stroke="#c5a059" strokeWidth="1.5" strokeDasharray="4 6" />
        <text x="200" y="160" textAnchor="middle" fill="#dfba73" fontFamily="Cinzel" fontSize="16" letterSpacing="4">MONARCA</text>
        <text x="200" y="195" textAnchor="middle" fill="#f5f0ea" fontFamily="Cinzel" fontSize="24" fontWeight="bold">1892</text>
        <text x="200" y="225" textAnchor="middle" fill="#c5a059" fontFamily="Space Mono" fontSize="8" letterSpacing="3">RESERVA PRIVADA</text>
        <text x="200" y="245" textAnchor="middle" fill="#dfba73" fontSize="14">★★★★★</text>
      </svg>
    ),
  },
];

export default function CraftsmanshipSection() {
  const containerRef = useRef(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${scenes.length * 90}%`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const index = Math.min(
            scenes.length - 1,
            Math.floor(self.progress * scenes.length)
          );
          setActiveSceneIndex(index);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const currentScene = scenes[activeSceneIndex];

  return (
    <section
      id="craft"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060504] overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-8 select-none"
    >
      {/* Background Dynamic Ambient Radial Light */}
      <div
        className={`absolute inset-0 bg-gradient-radial ${currentScene.visualStyle} transition-all duration-700 pointer-events-none`}
      />

      {/* Top Header */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#c5a059] uppercase block mb-1">
          THE ARTISAN'S CODE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f0ea] tracking-[0.16em] uppercase font-light">
          CRAFTED BY HAND
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#c2bbb0] max-w-2xl mx-auto mt-2 font-light leading-relaxed">
          Every cigar begins with carefully selected tobacco and ends with a character that can only be created through patience, precision, and experience.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Graphic Art / Instrument Visualization */}
        <div className="flex items-center justify-center relative">
          <div className="w-80 h-80 rounded-full bg-[#0d0c0a]/60 border border-[#c5a059]/20 flex items-center justify-center p-6 backdrop-blur-md relative">
            <div className="absolute inset-0 rounded-full border border-[#c5a059]/10 animate-spin-very-slow pointer-events-none" />
            {currentScene.renderGraphic()}
          </div>
        </div>

        {/* Right: Scene Content with Crossfade */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-[#dfba73]">
              STAGE {currentScene.number} OF 05
            </span>
            <span className="w-8 h-[1px] bg-[#c5a059]/40" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#c5a059] uppercase px-2.5 py-0.5 rounded border border-[#c5a059]/30 bg-[#12100d]">
              {currentScene.badge}
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f0ea] tracking-wider">
            {currentScene.title}
          </h3>

          <h4 className="font-serif text-base sm:text-lg text-gold-gradient tracking-wide font-light">
            {currentScene.subtitle}
          </h4>

          <p className="font-sans text-sm text-[#c2bbb0] leading-relaxed max-w-lg font-light">
            {currentScene.description}
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#2a241c] bg-[#0d0c0a] font-mono text-[11px] text-[#7e786e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span>{currentScene.spec}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scene Indicators */}
      <div className="relative z-20 max-w-xl mx-auto px-6 w-full flex items-center justify-between">
        {scenes.map((scene, idx) => (
          <div
            key={scene.id}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => setActiveSceneIndex(idx)}
          >
            <div
              className={`h-[2px] w-12 sm:w-16 transition-all duration-300 ${
                idx === activeSceneIndex
                  ? 'bg-[#dfba73] shadow-[0_0_10px_#dfba73]'
                  : 'bg-[#2a241c]'
              }`}
            />
            <span
              className={`font-mono text-[10px] tracking-wider transition-colors ${
                idx === activeSceneIndex ? 'text-[#dfba73]' : 'text-[#7e786e]'
              }`}
            >
              {scene.number}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
