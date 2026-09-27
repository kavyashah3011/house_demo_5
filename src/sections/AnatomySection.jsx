import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CigarVisualEngine from '../components/canvas/CigarVisualEngine';

gsap.registerPlugin(ScrollTrigger);

export default function AnatomySection() {
  const sectionRef = useRef(null);
  const wrapperLabelRef = useRef(null);
  const binderLabelRef = useRef(null);
  const fillerLabelRef = useRef(null);
  const titleRef = useRef(null);

  const [cigarTransform, setCigarTransform] = useState({
    rotX: 0.14,
    rotY: 0.5,
    rotZ: -0.22,
    posX: 0.04,
    posY: -0.08,
    posZ: 0.2, // nicely framed
    scale: 0.96,
    emberIntensity: 1.0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            // Camera gradually moves even closer into the macro wrapper texture
            setCigarTransform({
              rotX: 0.14 + p * 0.16,
              rotY: 0.5 + p * 1.3, // slowly rotates wrapper into light
              rotZ: -0.22 + p * 0.08,
              posX: 0.04 - p * 0.08,
              posY: -0.08 + p * 0.12,
              posZ: 0.2 + p * 0.65, // macro approach
              scale: 0.96 + p * 0.28,
              emberIntensity: 1.0 + p * 0.4,
            });
          },
        },
      });

      // Section title fades in first
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.15 }
      );

      // Label 1: WRAPPER (Capa) appears at 8%
      tl.fromTo(
        wrapperLabelRef.current,
        { opacity: 0, x: -30, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.3 },
        0.08
      );

      // Label 2: BINDER (Capote) appears at 35%
      tl.fromTo(
        binderLabelRef.current,
        { opacity: 0, x: 30, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.3 },
        0.35
      );

      // Label 3: FILLER (Tripa) appears at 62%
      tl.fromTo(
        fillerLabelRef.current,
        { opacity: 0, x: -30, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.3 },
        0.62
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="anatomy"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#060504] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Cinematic Lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(42,26,17,0.4)_0%,rgba(15,10,7,0.7)_60%,rgba(6,5,4,1)_100%)]" />

      {/* Top Editorial Section Heading */}
      <div
        ref={titleRef}
        className="absolute top-28 sm:top-32 left-0 right-0 z-30 text-center pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#c5a059] uppercase block mb-1">
          ANATOMY OF PERFECTION
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f0ea] tracking-[0.2em] font-light uppercase">
          THE THREE SACRED LAYERS
        </h2>
        <div className="w-16 h-[1px] bg-[#c5a059]/40 mx-auto mt-3" />
      </div>

      {/* Centered Close-Up Cigar 3D Viewport */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <CigarVisualEngine transformState={cigarTransform} />
      </div>

      {/* Editorial Labels Overlay */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 h-full flex flex-col justify-between pt-36 pb-20 pointer-events-none">
        {/* Label 1: WRAPPER (Upper Left) */}
        <div
          ref={wrapperLabelRef}
          className="max-w-xs sm:max-w-sm self-start mt-12 bg-[#0d0c0a]/80 backdrop-blur-md border border-[#c5a059]/30 p-5 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.85)] relative group"
        >
          {/* Thin Gold Connecting Vector Line */}
          <div className="hidden md:block absolute -right-24 top-1/2 w-24 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent">
            <span className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-[#dfba73] shadow-[0_0_8px_#dfba73]" />
          </div>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] text-[#dfba73] tracking-widest">01</span>
            <span className="h-[1px] w-6 bg-[#c5a059]/50" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#c5a059] uppercase">
              CAPA • VINTAGE
            </span>
          </div>
          <h3 className="font-serif text-2xl text-[#f5f0ea] tracking-wider mb-2">
            THE WRAPPER
          </h3>
          <p className="font-sans text-xs text-[#c2bbb0] leading-relaxed font-light">
            Grade-1 Colorado Maduro, naturally cured for five full seasons. Rich in natural essential oils with an unbroken silky grain that imparts nuanced notes of dark cacao and roasted espresso.
          </p>
        </div>

        {/* Label 2: BINDER (Middle Right) */}
        <div
          ref={binderLabelRef}
          className="max-w-xs sm:max-w-sm self-end my-auto bg-[#0d0c0a]/80 backdrop-blur-md border border-[#c5a059]/30 p-5 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.85)] relative"
        >
          {/* Thin Gold Connecting Vector Line */}
          <div className="hidden md:block absolute -left-24 top-1/2 w-24 h-[1px] bg-gradient-to-l from-[#c5a059] to-transparent">
            <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-[#dfba73] shadow-[0_0_8px_#dfba73]" />
          </div>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] text-[#dfba73] tracking-widest">02</span>
            <span className="h-[1px] w-6 bg-[#c5a059]/50" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#c5a059] uppercase">
              CAPOTE • STRUCTURAL
            </span>
          </div>
          <h3 className="font-serif text-2xl text-[#f5f0ea] tracking-wider mb-2">
            THE BINDER
          </h3>
          <p className="font-sans text-xs text-[#c2bbb0] leading-relaxed font-light">
            Hand-selected Corojo leaf possessing tensile strength and precise combustibility. Regulates the burn temperature and guarantees an even, cylindrical progression without canoeing.
          </p>
        </div>

        {/* Label 3: FILLER (Lower Left) */}
        <div
          ref={fillerLabelRef}
          className="max-w-xs sm:max-w-sm self-start mb-6 bg-[#0d0c0a]/80 backdrop-blur-md border border-[#c5a059]/30 p-5 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.85)] relative"
        >
          {/* Thin Gold Connecting Vector Line */}
          <div className="hidden md:block absolute -right-24 top-1/2 w-24 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent">
            <span className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-[#dfba73] shadow-[0_0_8px_#dfba73]" />
          </div>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] text-[#dfba73] tracking-widest">03</span>
            <span className="h-[1px] w-6 bg-[#c5a059]/50" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#c5a059] uppercase">
              TRIPA • HARMONIC CORE
            </span>
          </div>
          <h3 className="font-serif text-2xl text-[#f5f0ea] tracking-wider mb-2">
            THE FILLER
          </h3>
          <p className="font-sans text-xs text-[#c2bbb0] leading-relaxed font-light">
            An accordion fold of whole long-filler leaves: sun-ripened Ligero for body and strength, Seco for aromatic spice, and Volado for continuous, effortless draw.
          </p>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-6 font-mono text-[10px] tracking-widest text-[#7e786e] pointer-events-none">
        <span>VITOLA: GRAN ROBUSTO</span>
        <span>•</span>
        <span>RING GAUGE: 54 (21.43mm)</span>
        <span>•</span>
        <span>DRAW RESISTANCE: 1.2 kPa</span>
      </div>
    </section>
  );
}
