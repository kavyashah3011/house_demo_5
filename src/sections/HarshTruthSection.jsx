import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import redTruthImg from '../assets/clean_red_truth_scene.jpg';

gsap.registerPlugin(ScrollTrigger);

const STAT_SHARDS = [
  {
    id: 1,
    stat: '50%',
    title: 'Drop in Grad Hiring',
    desc: 'at BIG tech firms since peak expansion',
    pos: 'top-16 sm:top-24 left-4 sm:left-12 md:left-24',
    rot: '-rotate-6',
    depth: 1.4,
  },
  {
    id: 2,
    stat: 'Worst since 1988',
    title: 'Historic Bottleneck',
    desc: 'The hardest it has been in 37 years to land an entry-level position',
    pos: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    rot: 'rotate-3',
    depth: 1.8,
  },
  {
    id: 3,
    stat: '73%',
    title: 'Career Trap Paradox',
    desc: 'who land in the wrong first job remain misaligned 10 years later',
    pos: 'bottom-20 sm:bottom-28 left-4 sm:left-16 md:left-28',
    rot: '-rotate-3',
    depth: 1.2,
  },
  {
    id: 4,
    stat: '70%',
    title: 'Degree Mismatch',
    desc: 'of graduates are employed outside their major field of study',
    pos: 'top-32 sm:top-40 right-4 sm:right-16 md:right-32',
    rot: 'rotate-8',
    depth: 1.6,
  },
];

export default function HarshTruthSection() {
  const sectionRef = useRef(null);
  const titleGroupRef = useRef(null);
  const handRef = useRef(null);
  const shardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin while exploring the shards and crisis stats
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1.1,
        },
      });

      // Title exit / shrink
      tl.to(titleGroupRef.current, {
        opacity: 0.15,
        scale: 0.9,
        y: -60,
        ease: 'none',
      }, 0);

      // Hand zooms up
      tl.to(handRef.current, {
        scale: 1.2,
        y: -40,
        ease: 'none',
      }, 0);

      // Glass shards tumble in 3D parallax
      shardsRef.current.forEach((shard, idx) => {
        if (!shard) return;
        const config = STAT_SHARDS[idx];
        tl.to(shard, {
          y: idx % 2 === 0 ? -120 * config.depth : 80 * config.depth,
          x: idx % 2 === 0 ? 50 * config.depth : -60 * config.depth,
          rotation: `+=${idx % 2 === 0 ? 15 : -15}`,
          scale: 1.08,
          ease: 'none',
        }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sec-truth"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2e0007] via-[#5c000f] to-[#1a0004] text-white select-none perspective-container"
    >
      {/* Background Red Dramatic Hand in Spotlight */}
      <div
        ref={handRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-80"
      >
        <img
          src={redTruthImg}
          alt="Human Hand in Red Spotlight"
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        {/* Theatrical Red Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-red-950/40 to-black/80" />
      </div>

      {/* Explosive Typography ("But, That's Bullsh*t") */}
      <div
        ref={titleGroupRef}
        className="absolute top-16 sm:top-20 z-20 text-center pointer-events-none w-full px-4"
      >
        <span className="block font-serif text-3xl sm:text-5xl md:text-6xl text-rose-200/90 italic tracking-wider">
          But,
        </span>
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-1">
          <span className="font-script text-5xl sm:text-7xl md:text-8xl text-rose-300 font-light drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]">
            That's
          </span>
          <span className="font-serif font-bold text-6xl sm:text-8xl md:text-9xl tracking-tight text-white drop-shadow-[0_0_35px_rgba(239,68,68,0.8)]">
            Bullsh*t
          </span>
        </div>
      </div>

      {/* Floating 3D Refractive Glass Shards */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {STAT_SHARDS.map((shard, idx) => (
          <div
            key={shard.id}
            ref={(el) => (shardsRef.current[idx] = el)}
            className={`absolute ${shard.pos} ${shard.rot} pointer-events-auto transition-transform duration-300 hover:scale-105 cursor-pointer`}
          >
            {/* Glass shard container */}
            <div className="glass-card-shard p-5 sm:p-6 rounded-2xl sm:rounded-3xl max-w-[280px] sm:max-w-xs text-white relative overflow-hidden group">
              {/* Iridescent edge reflection */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/25 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              
              <span className="font-mono text-xs tracking-widest text-red-300 uppercase font-semibold block mb-1">
                {shard.title}
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 drop-shadow">
                {shard.stat}
              </div>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {shard.desc}
              </p>

              {/* Shard angled border cut accent */}
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/40 tracking-widest">
                VERIFIED DATA
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom context cue */}
      <div className="absolute bottom-24 z-20 pointer-events-none text-center">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-red-200/70 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-red-500/20">
          SCROLL TO UNCOVER THE CURRENCY
        </span>
      </div>
    </section>
  );
}
