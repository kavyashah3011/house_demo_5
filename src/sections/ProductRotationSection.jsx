import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CigarVisualEngine from '../components/canvas/CigarVisualEngine';
import { RotateCcw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const rotationCards = [
  {
    title: 'HAND ROLLED',
    subtitle: 'Totalmente a Mano',
    description:
      'Created by master torcedores with over two decades of dedicated experience. Each leaf is bunched in accordion folds to ensure consistent, effortless airflow.',
    angle: '0° — 90° ORIENTATION',
    badge: '100% ARTISANAL',
  },
  {
    title: 'AGED TO PERFECTION',
    subtitle: '5-Year Secondary Fermentation',
    description:
      'Cured and aged in Spanish cedar rooms under unyielding temperature and humidity control. Tannins mellow into decadent natural caramel and cocoa nuances.',
    angle: '90° — 180° ORIENTATION',
    badge: 'SOLERA AGED',
  },
  {
    title: 'PREMIUM TOBACCO',
    subtitle: '100% Long Filler Habano',
    description:
      'Zero short fillers or homogenized leaf. Only full-length, unbroken vintage leaves from the world’s most protected Vuelta Abajo micro-appellations.',
    angle: '180° — 270° ORIENTATION',
    badge: 'CAPA HABANO',
  },
  {
    title: 'CRAFTED WITH PRECISION',
    subtitle: 'Drawmaster Calibration',
    description:
      'Individually inspected for density, balance, and draw resistance before the gold seal is applied. An uncompromised smoking experience from foot to cap.',
    angle: '270° — 360° FULL REVOLUTION',
    badge: 'DRAW TESTED',
  },
];

export default function ProductRotationSection() {
  const sectionRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [cigarTransform, setCigarTransform] = useState({
    rotX: 0.12,
    rotY: 0,
    rotZ: -0.22,
    posX: -0.05,
    posY: -0.24,
    posZ: -0.2,
    scale: 0.88,
    emberIntensity: 1.0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1.0,
        onUpdate: (self) => {
          const p = self.progress; // 0 to 1
          const fullRotY = p * Math.PI * 2; // 0 to 360 degrees
          const deg = Math.round(p * 360);
          setRotationDegree(deg);

          // Card index based on quadrant (0, 1, 2, 3)
          const cardIdx = Math.min(
            rotationCards.length - 1,
            Math.floor(p * rotationCards.length)
          );
          setActiveCardIndex(cardIdx);

          // Dynamic 360° axial rotation + subtle camera orbit
          setCigarTransform({
            rotX: 0.12 + Math.sin(p * Math.PI) * 0.1,
            rotY: fullRotY,
            rotZ: -0.22 + Math.cos(p * Math.PI * 2) * 0.06,
            posX: -0.05 + Math.sin(p * Math.PI * 2) * 0.08,
            posY: -0.24,
            posZ: -0.2 + Math.sin(p * Math.PI) * 0.25,
            scale: 0.88 + Math.sin(p * Math.PI) * 0.08,
            emberIntensity: 1.0 + Math.sin(p * Math.PI * 4) * 0.4,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const activeCard = rotationCards[activeCardIndex];

  return (
    <section
      id="rotation"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#060504] overflow-hidden flex flex-col justify-between pt-32 pb-8 select-none"
    >
      {/* Background Lighting Shift */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${50 + Math.sin(rotationDegree * (Math.PI / 180)) * 20}% 50%, rgba(45, 28, 17, 0.45) 0%, rgba(6, 5, 4, 0.98) 75%)`,
        }}
      />

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-2xl mx-auto px-6 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#c5a059] uppercase block mb-1">
          360° AXIAL INSPECTION
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f0ea] tracking-[0.2em] font-light uppercase">
          PERFECTION IN EVERY DIMENSION
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2 font-mono text-[11px] text-[#dfba73]">
          <RotateCcw size={12} className="animate-spin-slow" />
          <span>AXIS ROTATION: {rotationDegree}° / 360°</span>
        </div>
      </div>

      {/* Center 3D Cigar Canvas */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <CigarVisualEngine transformState={cigarTransform} />
      </div>

      {/* Sequential Floating Information Card (Only ONE visible at a time) */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full flex items-center justify-end pointer-events-none">
        <div
          key={activeCardIndex}
          className="max-w-xs sm:max-w-sm bg-[#0e0c09]/85 backdrop-blur-xl border border-[#c5a059]/40 p-6 sm:p-7 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.95)] animate-fade-in space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-[#dfba73]">
              {activeCard.angle}
            </span>
            <span className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded border border-[#c5a059]/40 text-[#c5a059] uppercase bg-[#14120f]">
              {activeCard.badge}
            </span>
          </div>

          <h3 className="font-serif text-2xl text-[#f5f0ea] tracking-wider">
            {activeCard.title}
          </h3>

          <h4 className="font-serif text-sm text-gold-gradient tracking-wide font-light">
            {activeCard.subtitle}
          </h4>

          <p className="font-sans text-xs text-[#c2bbb0] leading-relaxed font-light">
            {activeCard.description}
          </p>

          <div className="pt-2 border-t border-[#2a241c] flex items-center justify-between text-[10px] font-mono text-[#7e786e]">
            <span>QUADRANT {activeCardIndex + 1} OF 4</span>
            <span className="text-[#dfba73]">ACTIVE VIEW</span>
          </div>
        </div>
      </div>

      {/* Bottom Degree Timeline */}
      <div className="relative z-20 max-w-xl mx-auto px-6 w-full pointer-events-none">
        <div className="flex items-center justify-between mb-2 font-mono text-[9px] tracking-widest text-[#7e786e]">
          <span>0° CAPA</span>
          <span>90° CAPOTE</span>
          <span>180° SEAM</span>
          <span>270° TRIPA</span>
          <span>360° REVOLUTION</span>
        </div>
        <div className="w-full h-1 bg-[#1a1612] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#c5a059] transition-all duration-75"
            style={{ width: `${(rotationDegree / 360) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
