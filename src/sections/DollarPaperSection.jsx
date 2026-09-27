import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import medallionImg from '../assets/clean_banknote_medallion.jpg';
import burningDollarImg from '../assets/clean_burning_dollar.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function DollarPaperSection() {
  const sectionRef = useRef(null);
  const medallionRef = useRef(null);
  const dollarRef = useRef(null);
  const textSellsRef = useRef(null);
  const textPaperRef = useRef(null);
  const fireGlowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger sequence for the currency / burning dollar revelation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1.1,
        },
      });

      // Medallion scales back as the burning $100 bill takes center stage
      tl.to(medallionRef.current, {
        scale: 0.85,
        opacity: 0.3,
        y: -40,
        ease: 'none',
      }, 0);

      // Dollar bill zooms forward into view
      tl.fromTo(
        dollarRef.current,
        { scale: 0.6, y: 100, opacity: 0, rotation: -8 },
        { scale: 1.15, y: -20, opacity: 1, rotation: 2, ease: 'none' },
        0.2
      );

      // Active fire glow pulsing intensity
      tl.to(fireGlowRef.current, {
        opacity: 0.9,
        scale: 1.25,
        ease: 'none',
      }, 0.4);

      // Typography "University sells" -> "Paper"
      tl.to(textSellsRef.current, {
        x: -40,
        opacity: 0.4,
        ease: 'none',
      }, 0.3);

      tl.fromTo(
        textPaperRef.current,
        { opacity: 0, scale: 0.85, y: 50 },
        { opacity: 1, scale: 1.1, y: 0, ease: 'none' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sec-dollar"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#08180e] via-[#0f2e1c] to-[#040e08] text-white select-none perspective-container"
    >
      {/* Guilloche Banknote Background Pattern */}
      <div className="absolute inset-0 guilloche-pattern opacity-30 pointer-events-none" />

      {/* Background Banknote Medallion with Classical Marble Hand */}
      <div
        ref={medallionRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div className="w-[360px] sm:w-[480px] md:w-[540px] aspect-square rounded-full overflow-hidden border-4 border-emerald-600/30 shadow-[0_0_80px_rgba(21,128,61,0.4)]">
          <img
            src={medallionImg}
            alt="Banknote Medallion Hand"
            className="w-full h-full object-cover filter brightness-105"
          />
        </div>
      </div>

      {/* Front: Burning Hundred-Dollar Bill with Benjamin Franklin in Graduation Cap */}
      <div
        ref={dollarRef}
        className="relative z-20 w-full max-w-md sm:max-w-xl aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-amber-500/30 group"
      >
        <img
          src={burningDollarImg}
          alt="Franklin Dollar with College Graduation Cap on Fire"
          className="w-full h-full object-cover filter contrast-110"
        />

        {/* Dynamic Electric Yellow Flame Overlay & Sparks */}
        <div
          ref={fireGlowRef}
          className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-transparent to-yellow-400/20 mix-blend-color-dodge pointer-events-none opacity-50"
        />

        {/* Animated burning edge sparks */}
        <div className="absolute inset-0 border-2 border-amber-400/40 rounded-2xl animate-pulse pointer-events-none shadow-[inset_0_0_30px_rgba(245,158,11,0.5)]" />
      </div>

      {/* Typography: "University sells" */}
      <div
        ref={textSellsRef}
        className="absolute top-20 sm:top-24 left-8 sm:left-20 z-30 pointer-events-none"
      >
        <span className="block font-serif text-4xl sm:text-6xl md:text-7xl font-light text-emerald-200">
          University
        </span>
        <span className="block font-script text-5xl sm:text-7xl md:text-8xl text-emerald-300 -mt-2 sm:-mt-5">
          sells...
        </span>
      </div>

      {/* Typography: "Paper" (Luminous Glowing Script) */}
      <div
        ref={textPaperRef}
        className="absolute bottom-24 sm:bottom-28 right-8 sm:right-24 z-30 pointer-events-none text-right"
      >
        <span className="font-script text-7xl sm:text-9xl md:text-[11rem] leading-none text-emerald-300 text-glow-green font-normal">
          Paper
        </span>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-14 z-30 pointer-events-none text-center">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-emerald-400/80 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/30">
          CREDENTIALS COST A FORTUNE. PROOF IS FREE.
        </span>
      </div>
    </section>
  );
}
