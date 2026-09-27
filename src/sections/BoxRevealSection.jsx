import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BoxRevealSection({ onSelectVitola }) {
  const containerRef = useRef(null);
  const boxWrapperRef = useRef(null);
  const lidRef = useRef(null);
  const innerCigarsRef = useRef(null);
  const textCueRef = useRef(null);

  const [boxStage, setBoxStage] = useState(0); // 0: approach, 1: tilt, 2: open lid, 3: reveal cigars, 4: zoom in

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            setBoxStage(Math.floor(p * 5));
          },
        },
      });

      // 1. Box approaches camera and rotates slightly into 3D view
      tl.fromTo(
        boxWrapperRef.current,
        {
          scale: 0.65,
          rotateX: 25,
          rotateY: -20,
          rotateZ: 4,
          y: 80,
          z: -300,
        },
        {
          scale: 1.0,
          rotateX: 22,
          rotateY: -6,
          rotateZ: 0,
          y: 0,
          z: 0,
          ease: 'power1.out',
          duration: 0.35,
        },
        0
      );

      // 2. Lid begins opening smoothly in 3D perspective
      tl.to(
        lidRef.current,
        {
          rotateX: -115,
          ease: 'power2.inOut',
          duration: 0.35,
        },
        0.3
      );

      // 3. Cigars lift slightly and illuminate
      tl.fromTo(
        innerCigarsRef.current,
        {
          y: 15,
          opacity: 0.7,
        },
        {
          y: -5,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.25,
        },
        0.5
      );

      // 4. Camera zooms towards the cigars for transition into collection
      tl.to(
        boxWrapperRef.current,
        {
          scale: 1.45,
          y: 60,
          rotateX: 35,
          ease: 'power2.inOut',
          duration: 0.35,
        },
        0.65
      );

      // Text prompt fades
      tl.to(
        textCueRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.2,
        },
        0.75
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="box"
      ref={containerRef}
      className="relative w-full h-screen bg-[#060504] overflow-hidden flex flex-col items-center justify-between pt-32 pb-8 select-none"
    >
      {/* Background Volumetric Dark Ambiance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_60%,rgba(48,30,18,0.45)_0%,rgba(18,12,8,0.75)_55%,rgba(6,5,4,1)_95%)]" />

      {/* Top Header */}
      <div ref={textCueRef} className="relative z-20 text-center max-w-2xl mx-auto px-6 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#c5a059] uppercase block mb-1">
          SANCTUARY OF CEDAR
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f0ea] tracking-[0.16em] uppercase font-light">
          THE VAULT UNSEALED
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#c2bbb0] max-w-lg mx-auto mt-2 font-light">
          Solid Spanish cedar cabinet sealed with brass mortise hinges and gold warranty seal. Scroll to witness the unveiling.
        </p>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="relative z-10 w-full max-w-4xl h-[520px] flex items-center justify-center"
        style={{ perspective: '1400px' }}
      >
        <div
          ref={boxWrapperRef}
          className="relative w-[340px] sm:w-[480px] md:w-[560px] h-[300px] sm:h-[340px] will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Box Body (Base Cabinet) */}
          <div
            className="absolute inset-0 rounded-md border-2 border-[#5a4622] bg-[#1a110a] shadow-[0_35px_80px_rgba(0,0,0,0.95)] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2b1a10 0%, #170d07 50%, #0d0704 100%)',
            }}
          >
            {/* Spanish Cedar Interior Tray */}
            <div className="absolute inset-3 rounded bg-[#3a2315] border border-[#5d3b24] p-4 flex flex-col justify-between shadow-inner">
              {/* Cedar Grain Lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(0,0,0,0.4)_8px,rgba(0,0,0,0.4)_10px)]" />

              {/* Gold Silk Pull Ribbon */}
              <div className="absolute left-6 top-0 bottom-0 w-3 bg-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.5)] z-20" />

              {/* Ten Immaculate Cigars Arrayed Side-by-Side */}
              <div
                ref={innerCigarsRef}
                className="relative z-10 w-full h-full flex items-center justify-center gap-1.5 sm:gap-2 px-6"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative flex-1 h-[90%] rounded-t-full rounded-b-sm bg-gradient-to-r from-[#21140c] via-[#3d2416] to-[#1a0f09] border-x border-[#140b06] shadow-[0_6px_15px_rgba(0,0,0,0.7)] flex flex-col justify-between items-center py-2"
                  >
                    {/* Cigar Band (Anilla) on each vitola */}
                    <div className="w-full h-7 bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36] border-y border-[#5a4622] shadow-[0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center">
                      <span className="font-serif font-bold text-[7px] text-[#230a10]">M</span>
                    </div>

                    {/* Footer gold ribbon on the center vitolas */}
                    <div className="w-full h-2 bg-[#c5a059]/70" />
                  </div>
                ))}
              </div>

              {/* Authentic Guarantee Certificate Badge */}
              <div className="relative z-20 flex items-center justify-between pt-2 border-t border-[#5d3b24]/60 text-[9px] font-mono text-[#c5a059]">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={11} /> GARANTÍA NACIONAL
                </span>
                <span>CABINET #088 / 250</span>
              </div>
            </div>
          </div>

          {/* Box Lid (Opens via 3D rotateX on top origin) */}
          <div
            ref={lidRef}
            className="absolute inset-0 rounded-md border-2 border-[#5a4622] bg-[#22140b] shadow-[0_20px_60px_rgba(0,0,0,0.85)] origin-top will-change-transform z-30"
            style={{
              background: 'linear-gradient(135deg, #382215 0%, #20130b 60%, #120a06 100%)',
              transformOrigin: 'top center',
            }}
          >
            {/* Piano Lacquer Gloss Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Embossed Gold Crest on Lid Exterior */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#dfba73] bg-[#1a0c10] flex items-center justify-center p-2 shadow-[0_0_20px_rgba(197,160,89,0.3)] mb-3">
                <span className="font-serif font-bold text-2xl sm:text-3xl text-[#dfba73]">M</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#f5f0ea] tracking-[0.25em] font-semibold">
                MONARCA
              </h3>
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#dfba73] uppercase mt-1">
                HABANO 1892 • CABILDO DE LA HABANA
              </span>

              {/* Brass Mortise Latch on bottom edge */}
              <div className="absolute bottom-2 w-12 h-3 rounded-t-sm bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#8e6f36] border border-[#5a4622] shadow" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stage Progress Indicator */}
      <div className="relative z-20 max-w-md mx-auto px-6 w-full flex items-center justify-center gap-4 text-center pointer-events-none font-mono text-[10px] tracking-widest text-[#7e786e]">
        <span>CEDAR CABINET REVEAL</span>
        <span>•</span>
        <span className="text-[#dfba73]">100% CEDRELA ODORATA</span>
      </div>
    </section>
  );
}
