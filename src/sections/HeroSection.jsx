import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CigarVisualEngine from '../components/canvas/CigarVisualEngine';
import SmokeCanvas from '../components/canvas/SmokeCanvas';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const textGroupRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [cigarTransform, setCigarTransform] = useState({
    rotX: 0.16,
    rotY: -0.22,
    rotZ: -0.30,
    posX: 0,
    posY: isMobile ? 0.02 : -0.15,
    posZ: isMobile ? 0.2 : -1.4, // poised closer on mobile portrait
    scale: isMobile ? 1.0 : 0.82,
    emberIntensity: 0.9,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ScrollTrigger timeline for Hero zoom and transition into section
    const ctx = gsap.context(() => {
      const mobileActive = window.innerWidth < 768;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress; // 0 to 1

            // Cigar movement: advances towards viewer, rotates, scales up
            setCigarTransform({
              rotX: 0.16 + p * 0.22,
              rotY: -0.22 + p * 1.6, // gentle rotation
              rotZ: -0.30 + p * 0.20,
              posX: p * 0.12,
              posY: (mobileActive ? 0.02 : -0.15) + p * 0.25,
              posZ: (mobileActive ? 0.2 : -1.4) + p * 2.6, // approaches viewer from distance
              scale: (mobileActive ? 1.0 : 0.82) + p * 0.45, // zooms larger
              emberIntensity: 0.9 + p * 0.7,
            });
          },
        },
      });

      // 1. Brand titles fade and drift upward
      tl.to(
        textGroupRef.current,
        {
          opacity: 0,
          y: -80,
          scale: 0.95,
          filter: 'blur(8px)',
          ease: 'power2.inOut',
          duration: 0.6,
        },
        0
      );

      // 2. Scroll indicator vanishes immediately
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 20,
          ease: 'power2.out',
          duration: 0.25,
        },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#060504] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Volumetric Lighting & Radial Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(66,40,24,0.35)_0%,rgba(20,11,6,0.5)_45%,rgba(6,5,4,0.98)_85%)]" />

      {/* Atmospheric Smoke & Golden Ember Wisps */}
      <SmokeCanvas density="medium" />

      {/* 3D Photorealistic Cigar Visual Engine */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <CigarVisualEngine transformState={cigarTransform} />
      </div>

      {/* Hero Typography & Editorial Copy */}
      <div
        ref={textGroupRef}
        className="relative z-30 max-w-5xl mx-auto px-6 text-center pointer-events-none flex flex-col items-center justify-center"
      >
        {/* Heritage Monogram Badge */}
        <div className="mb-4 inline-flex items-center gap-3 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#12100d]/70 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfba73]" />
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#dfba73] uppercase">
            HABANO 1892 • VUELTA ABAJO
          </span>
        </div>

        {/* Brand Name */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-smoke-gradient tracking-[0.16em] font-semibold uppercase leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          MONARCA
        </h1>

        {/* Cinematic Subtitle */}
        <h2 className="font-serif text-lg sm:text-2xl md:text-3xl text-gold-gradient tracking-[0.24em] uppercase font-light mt-3 sm:mt-5">
          CRAFTED FOR THE MOMENT
        </h2>

        {/* Supporting Luxury Copy */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#c2bbb0] tracking-wider max-w-xl mx-auto mt-4 font-light leading-relaxed">
          Exceptional tobacco. Meticulous craftsmanship. Timeless character.
        </p>
      </div>

      {/* Animated Scroll to Discover Cue */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none select-none text-[#c2bbb0]/80"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c5a059]">
          SCROLL TO DISCOVER
        </span>
        <div className="w-4 h-7 rounded-full border border-[#c5a059]/50 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-[#dfba73] animate-bounce" />
        </div>
        <ChevronDown size={14} className="text-[#c5a059] animate-pulse" />
      </div>

      {/* Decorative Gold Edge Accents */}
      <div className="absolute top-24 left-10 hidden md:block z-30 font-mono text-[9px] tracking-[0.3em] text-[#7e786e]">
        LAT 22° 16' N • LON 83° 58' W
      </div>
      <div className="absolute top-24 right-10 hidden md:block z-30 font-mono text-[9px] tracking-[0.3em] text-[#7e786e]">
        SOLERA NO. 88 • BATCH RESERVA
      </div>
    </section>
  );
}
