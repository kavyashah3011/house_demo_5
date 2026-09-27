import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Compass } from 'lucide-react';

const collection = [
  {
    id: 'gran-robusto',
    name: 'GRAN ROBUSTO',
    vitola: 'Robusto Extra • 54 RG × 5.5"',
    origin: 'Vuelta Abajo, Cuba',
    strength: 'Medium-Full',
    strengthLevel: 4, // out of 5
    burnTime: '65 – 80 min',
    flavorNotes: ['Dark Chocolate', 'Espresso Crema', 'Spanish Cedar', 'Nutmeg'],
    description:
      'The quintessential expression of the atelier. Generous ring gauge delivers a cool, velvet draw with dense aromatics that evolve smoothly across three distinct thirds.',
    ringGaugeMm: '21.43 mm',
    wrapper: '5-Year Colorado Maduro',
    cigarGraphic: (
      <div className="relative w-12 sm:w-14 h-64 sm:h-72 flex flex-col items-center">
        {/* Parejo cap */}
        <div className="w-full h-8 rounded-t-full bg-gradient-to-r from-[#2a1a11] via-[#432818] to-[#1f130c] shadow-inner" />
        {/* Main cylinder */}
        <div className="w-full flex-1 bg-gradient-to-r from-[#2a1a11] via-[#3d2416] to-[#1a0f09] relative flex flex-col justify-start items-center">
          {/* Oily specular highlight line */}
          <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-white/10 blur-[0.5px]" />
          {/* Band */}
          <div className="w-[104%] h-12 mt-6 rounded-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36] border-y border-[#5a4622] flex flex-col items-center justify-center shadow-md">
            <span className="font-serif font-bold text-[9px] text-[#230a10]">MONARCA</span>
            <span className="font-mono text-[7px] text-[#230a10]">1892</span>
          </div>
        </div>
        {/* Foot with gold band */}
        <div className="w-full h-6 rounded-b-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36] border-t border-[#5a4622] flex items-center justify-center">
          <span className="font-mono text-[6px] text-[#230a10]">RESERVA</span>
        </div>
      </div>
    ),
  },
  {
    id: 'churchill-reserva',
    name: 'CHURCHILL RESERVA',
    vitola: 'Julieta No. 2 • 48 RG × 7.0"',
    origin: 'Pinar del Río, Cuba',
    strength: 'Medium',
    strengthLevel: 3,
    burnTime: '90 – 110 min',
    flavorNotes: ['Aged Leather', 'Toasted Brioche', 'Honeyed Almond', 'White Pepper'],
    description:
      'Aristocratic proportions engineered for extended philosophical contemplation. Subtle, refined, and aromatic with an exceptionally smooth, long-lasting cedar finish.',
    ringGaugeMm: '19.05 mm',
    wrapper: 'Grade-1 Habano Rosado',
    cigarGraphic: (
      <div className="relative w-10 sm:w-11 h-72 sm:h-80 flex flex-col items-center">
        <div className="w-full h-8 rounded-t-full bg-gradient-to-r from-[#382215] via-[#4e2f1d] to-[#25150d]" />
        <div className="w-full flex-1 bg-gradient-to-r from-[#382215] via-[#482b1b] to-[#22130b] relative flex flex-col justify-start items-center">
          <div className="absolute left-2 top-0 bottom-0 w-1 bg-white/10 blur-[0.5px]" />
          <div className="w-[104%] h-11 mt-8 rounded-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36] border-y border-[#5a4622] flex flex-col items-center justify-center shadow-md">
            <span className="font-serif font-bold text-[8px] text-[#230a10]">MONARCA</span>
            <span className="font-mono text-[6px] text-[#230a10]">CHURCHILL</span>
          </div>
        </div>
        <div className="w-full h-5 rounded-b-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36] border-t border-[#5a4622]" />
      </div>
    ),
  },
  {
    id: 'torpedo-no-2',
    name: 'TORPEDO NO. 2',
    vitola: 'Pirámide • 52 RG × 6.1"',
    origin: 'San Juan y Martínez',
    strength: 'Full Bodied',
    strengthLevel: 5,
    burnTime: '70 – 85 min',
    flavorNotes: ['Crushed Peppercorn', 'Dark Cocoa 85%', 'Rare Leather', 'Smoked Earth'],
    description:
      'Tapered head concentrates the smoke on the palate with laser precision. Formidable Ligero leaf balance delivers immense complexity and commanding full strength.',
    ringGaugeMm: '20.64 mm',
    wrapper: 'Sun-Grown Vintage Maduro',
    cigarGraphic: (
      <div className="relative w-11 sm:w-12 h-64 sm:h-72 flex flex-col items-center">
        {/* Pointed Torpedo Pyramid Cap */}
        <div
          className="w-full h-12 bg-gradient-to-r from-[#21140c] via-[#3a2215] to-[#180e08]"
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
        />
        <div className="w-full flex-1 bg-gradient-to-r from-[#21140c] via-[#331e12] to-[#150c07] relative flex flex-col justify-start items-center">
          <div className="absolute left-2 top-0 bottom-0 w-1 bg-white/10 blur-[0.5px]" />
          <div className="w-[104%] h-12 mt-4 rounded-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36] border-y border-[#5a4622] flex flex-col items-center justify-center shadow-md">
            <span className="font-serif font-bold text-[8px] text-[#230a10]">TORPEDO</span>
            <span className="font-mono text-[6px] text-[#230a10]">NO. 2</span>
          </div>
        </div>
        <div className="w-full h-5 rounded-b-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36]" />
      </div>
    ),
  },
  {
    id: 'doble-corona',
    name: 'DOBLE CORONA MADURO',
    vitola: 'Prominente • 56 RG × 7.5"',
    origin: 'Sancti Spíritus',
    strength: 'Full Bodied',
    strengthLevel: 5,
    burnTime: '100 – 120 min',
    flavorNotes: ['Dark Molasses', 'Smoked Oak', 'Bourbon Vanilla', 'Black Truffle'],
    description:
      'The crown jewel of our reserves. A majestic vitola aged 7 full years in Spanish cedar soleras. Dense, velvety smoke with profound resinous sweetness and unbroken ash stability.',
    ringGaugeMm: '22.22 mm',
    wrapper: 'Añejado 7 Años Maduro',
    cigarGraphic: (
      <div className="relative w-12 sm:w-14 h-[280px] sm:h-[310px] flex flex-col items-center">
        <div className="w-full h-8 rounded-t-full bg-gradient-to-r from-[#1c1109] via-[#331c10] to-[#150b06]" />
        <div className="w-full flex-1 bg-gradient-to-r from-[#1c1109] via-[#2c180e] to-[#110804] relative flex flex-col justify-start items-center">
          <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-white/10 blur-[0.5px]" />
          <div className="w-[104%] h-14 mt-6 rounded-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36] border-y border-[#5a4622] flex flex-col items-center justify-center shadow-md">
            <span className="font-serif font-bold text-[8px] text-[#230a10]">DOBLE CORONA</span>
            <span className="font-mono text-[6px] text-[#230a10]">MADURO</span>
          </div>
        </div>
        <div className="w-full h-6 rounded-b-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36]" />
      </div>
    ),
  },
];

export default function CollectionSection({ onSelectVitola }) {
  const [selectedVitola, setSelectedVitola] = useState(collection[0]);

  return (
    <section
      id="collection"
      className="relative w-full min-h-screen bg-[#060504] pt-32 pb-24 px-6 overflow-hidden select-none"
    >
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(45,28,17,0.3)_0%,rgba(6,5,4,1)_70%)]" />

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#c5a059] uppercase block mb-2">
          FLAGSHIP VITOLAS
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f5f0ea] tracking-[0.16em] uppercase font-light">
          THE COLLECTION
        </h2>
        <div className="w-16 h-[1px] bg-[#c5a059]/40 mx-auto mt-4 mb-4" />
        <p className="font-sans text-xs sm:text-sm text-[#c2bbb0] max-w-xl mx-auto font-light leading-relaxed">
          Each vitola is rolled to exact historical cepo calibrations and aged to its peak aromatic potential. Limited to allocated private releases.
        </p>
      </div>

      {/* Editorial Vitola Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collection.map((cigar) => (
          <div
            key={cigar.id}
            onClick={() => {
              setSelectedVitola(cigar);
              if (onSelectVitola) onSelectVitola(cigar);
            }}
            className="group relative bg-[#0d0c0a] border border-[#2a241c] hover:border-[#c5a059]/60 rounded-sm p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-pointer overflow-hidden"
          >
            {/* Subtle Hover Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#c5a059]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Meta Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2a241c] relative z-10">
              <span className="font-mono text-[9px] tracking-widest text-[#dfba73] uppercase">
                {cigar.wrapper}
              </span>
              <span className="font-mono text-[9px] text-[#7e786e]">
                {cigar.burnTime}
              </span>
            </div>

            {/* Center Product Silhouette Render */}
            <div className="my-8 flex items-center justify-center relative min-h-[280px]">
              {/* Subtle back illumination glow */}
              <div className="absolute w-32 h-32 rounded-full bg-[#c5a059]/5 group-hover:bg-[#c5a059]/15 blur-2xl transition-all duration-500 pointer-events-none" />
              <div className="transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500">
                {cigar.cigarGraphic}
              </div>
            </div>

            {/* Bottom Content & Specifications */}
            <div className="relative z-10 space-y-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#f5f0ea] tracking-wider group-hover:text-[#dfba73] transition-colors">
                  {cigar.name}
                </h3>
                <span className="font-mono text-[10px] tracking-widest text-[#7e786e] block mt-0.5">
                  {cigar.vitola}
                </span>
              </div>

              {/* Strength Meter */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#7e786e]">
                <span>STRENGTH: {cigar.strength.toUpperCase()}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`w-1.5 h-1.5 rounded-full ${
                        lvl <= cigar.strengthLevel
                          ? 'bg-[#dfba73] shadow-[0_0_5px_#dfba73]'
                          : 'bg-[#2a241c]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Flavor Profile Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cigar.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="font-sans text-[10px] px-2 py-0.5 rounded bg-[#14120f] border border-[#2a241c] text-[#c2bbb0]"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <p className="font-sans text-xs text-[#7e786e] line-clamp-3 leading-relaxed pt-1">
                {cigar.description}
              </p>

              {/* Action Link */}
              <div className="pt-3 border-t border-[#2a241c] flex items-center justify-between text-[#dfba73] font-mono text-[10px] tracking-widest uppercase">
                <span className="group-hover:translate-x-1 transition-transform">RESERVE ALLOCATION</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
