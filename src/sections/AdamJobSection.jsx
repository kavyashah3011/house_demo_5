import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TapHoldTrigger from '../components/TapHoldTrigger';
import creationSceneImg from '../assets/clean_creation_scene.jpg';

gsap.registerPlugin(ScrollTrigger);

// Petals configuration for floating flower effect
const PETALS = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  left: `${(i * 8.5) % 95}%`,
  top: `${(i * 11) % 90}%`,
  size: 14 + (i % 4) * 6,
  rotation: i * 25,
  delay: (i * 0.4) % 3,
}));

export default function AdamJobSection({ onRealityBreak }) {
  const sectionRef = useRef(null);
  const jobTitleRef = useRef(null);
  const sceneWrapperRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger for the Adam & Eve creation sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
        },
      });

      // JOB title float and scale
      tl.fromTo(
        jobTitleRef.current,
        { scale: 0.85, opacity: 0.8 },
        { scale: 1.15, opacity: 1, ease: 'none' },
        0
      );

      // Scene zoom
      tl.to(sceneWrapperRef.current, {
        scale: 1.08,
        ease: 'none',
      }, 0);

      // Floating petals drift
      petalsRef.current.forEach((petal, i) => {
        if (!petal) return;
        tl.to(petal, {
          y: -100 - (i % 3) * 50,
          x: (i % 2 === 0 ? 60 : -60),
          rotation: `+=${i % 2 === 0 ? 120 : -120}`,
          ease: 'none',
        }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sec-adam"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#bed8cc] via-[#d7ebd2] to-[#eeddd2] select-none"
    >
      {/* Background Classical Landscape Scene */}
      <div
        ref={sceneWrapperRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <img
          src={creationSceneImg}
          alt="Creation of Adam Composition"
          className="w-full h-full object-cover object-center opacity-90 filter saturate-[1.1]"
        />
        {/* Ethereal sun rays & dream vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/30" />
      </div>

      {/* Drifting Pink Flower Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {PETALS.map((petal, i) => (
          <div
            key={petal.id}
            ref={(el) => (petalsRef.current[i] = el)}
            style={{
              left: petal.left,
              top: petal.top,
              width: `${petal.size}px`,
              height: `${petal.size * 1.4}px`,
              transform: `rotate(${petal.rotation}deg)`,
            }}
            className="absolute rounded-[50%_0_50%_0] bg-gradient-to-br from-pink-300/80 to-rose-400/60 shadow-sm blur-[0.5px] pointer-events-none"
          />
        ))}
      </div>

      {/* Central "JOB" Typography */}
      <div
        ref={jobTitleRef}
        className="absolute z-10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center"
      >
        <span className="font-serif italic text-6xl sm:text-8xl md:text-9xl font-semibold tracking-wide text-[#14532d] drop-shadow-md">
          JOB
        </span>
      </div>

      {/* Interactive TAP & HOLD Node between the fingertips */}
      <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-6">
        <TapHoldTrigger onTriggerComplete={onRealityBreak} />
      </div>

      {/* Subtle bottom narration prompt */}
      <div className="absolute bottom-24 z-20 pointer-events-none text-center">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#1b4d3e]/80 bg-white/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/40">
          TOUCH THE SPARK TO SHATTER THE ILLUSION
        </span>
      </div>
    </section>
  );
}
