import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1.0,
        },
      });

      // Line 1: "NOT MADE IN A HURRY." starts visible and dissolves with scroll
      tl.fromTo(
        line1Ref.current,
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
        { opacity: 0.15, scale: 0.95, y: -40, filter: 'blur(6px)', duration: 0.4 }
      );

      // Line 2: "MADE TO BE REMEMBERED." illuminates as user scrolls
      tl.fromTo(
        line2Ref.current,
        { opacity: 0.2, scale: 0.92, y: 30, filter: 'blur(8px)' },
        { opacity: 1, scale: 1.02, y: 0, filter: 'blur(0px)', duration: 0.4 },
        0.2
      );

      // Line 3: Supporting seal
      tl.fromTo(
        line3Ref.current,
        { opacity: 0.3, y: 15 },
        { opacity: 1, y: 0, duration: 0.3 },
        0.4
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full h-screen bg-[#040302] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Deep Obsidian Black Minimalist Void */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(20,12,7,0.3)_0%,rgba(4,3,2,1)_80%)]" />

      {/* Massive Typographic Statements */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6">
        {/* Statement 1 */}
        <h2
          ref={line1Ref}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-smoke-gradient tracking-[0.14em] uppercase font-light leading-none will-change-transform"
        >
          NOT MADE IN A HURRY.
        </h2>

        {/* Statement 2 */}
        <h2
          ref={line2Ref}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-bright tracking-[0.14em] uppercase font-semibold leading-none will-change-transform drop-shadow-[0_15px_30px_rgba(197,160,89,0.2)]"
        >
          MADE TO BE REMEMBERED.
        </h2>

        {/* Minimalist Seal */}
        <div ref={line3Ref} className="pt-8 flex flex-col items-center gap-2">
          <div className="w-12 h-[1px] bg-[#c5a059]/40" />
          <span className="font-mono text-[9px] tracking-[0.4em] text-[#7e786e] uppercase">
            MONARCA 1892 • RESERVA PRIVADA
          </span>
        </div>
      </div>
    </section>
  );
}
