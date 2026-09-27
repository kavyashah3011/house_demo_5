import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, RotateCcw, Share2 } from 'lucide-react';
import whySingularityImg from '../assets/clean_why_singularity.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function SingularitySection({ onOpenBeta, onRestart }) {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const textWhyRef = useRef(null);
  const ctaCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        },
      });

      // Singularity orb expands and pulses
      tl.to(orbRef.current, {
        scale: 1.4,
        opacity: 1,
        ease: 'none',
      }, 0);

      // "Why" text emerges with glow
      tl.fromTo(
        textWhyRef.current,
        { scale: 0.8, opacity: 0.2, y: 40 },
        { scale: 1.1, opacity: 1, y: 0, ease: 'none' },
        0
      );

      // Final CTA card fades into view
      tl.fromTo(
        ctaCardRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Experience link copied to clipboard!');
    }
  };

  return (
    <section
      id="sec-why"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020504] text-white select-none perspective-container"
    >
      {/* Background Singularity Universe */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-60">
        <img
          src={whySingularityImg}
          alt="Cosmic Singularity Scene"
          className="w-full h-full object-cover object-center filter brightness-125"
        />
        {/* Radial dark overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020504]/50 to-[#020504]" />
      </div>

      {/* Radiant Pulsing Singularity Orb in the Center */}
      <div
        ref={orbRef}
        className="absolute z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.9),0_0_140px_rgba(52,211,153,0.7)] animate-pulse pointer-events-none"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 blur-sm" />
      </div>

      {/* Typography: "...and that's Why" */}
      <div
        ref={textWhyRef}
        className="absolute top-20 sm:top-24 z-20 text-center pointer-events-none w-full px-4"
      >
        <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-white/90 font-light block">
          ...and that's
        </span>
        <span className="font-script text-7xl sm:text-9xl md:text-[10rem] leading-none text-emerald-300 block -mt-2 sm:-mt-4 text-glow-green">
          Why
        </span>
      </div>

      {/* Final Conversion CTA Card */}
      <div
        ref={ctaCardRef}
        className="relative z-30 max-w-md w-full mx-4 glass-dock p-8 rounded-3xl border border-white/20 shadow-2xl text-center backdrop-blur-2xl mt-48 sm:mt-56"
      >
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-300 font-mono text-[11px] tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN 14,800+ BUILDERS</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-2">
          Verify Skills. Ship Reality.
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 font-light mb-6">
          Astra is the autonomous verification protocol for the post-credential world. Prove what you can build.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenBeta}
            className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.5)] transition-all active:scale-95"
          >
            <span>Request Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onRestart}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-mono text-xs px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
            title="Restart Experience"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-mono text-xs px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
            title="Share Experience"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </section>
  );
}
