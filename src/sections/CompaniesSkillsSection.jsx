import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import resumesImg from '../assets/clean_floating_resumes.jpg';

gsap.registerPlugin(ScrollTrigger);

const FLOATING_DOCS = [
  {
    id: 1,
    badge: 'INTERNAL MEMO',
    quote: '"We no longer require college degrees for software engineering or design roles."',
    author: 'Leading AI Lab',
    pos: 'top-20 sm:top-24 left-6 sm:left-16',
    rot: '-rotate-6',
    speed: 1.5,
  },
  {
    id: 2,
    badge: 'HIRING REALITY',
    quote: '"Show me three deployed production applications, not your transcript GPA."',
    author: 'Unicorn Founder',
    pos: 'bottom-28 sm:bottom-32 left-8 sm:left-24',
    rot: 'rotate-4',
    speed: 1.2,
  },
  {
    id: 3,
    badge: 'VERIFIABLE PROOF',
    quote: '"Skills have an expiration date of 2 years now. What you built yesterday is what matters."',
    author: 'VP of Engineering',
    pos: 'top-36 sm:top-40 right-6 sm:right-20',
    rot: '-rotate-3',
    speed: 1.7,
  },
];

export default function CompaniesSkillsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const resumesWrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger sequence for the floating resumes and corporate truth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 1,
        },
      });

      // Resumes container parallax and scale
      tl.to(resumesWrapperRef.current, {
        scale: 1.18,
        y: -50,
        ease: 'none',
      }, 0);

      // Title parallax
      tl.to(titleRef.current, {
        y: -60,
        opacity: 0.3,
        ease: 'none',
      }, 0);

      // Floating document quotes drift across screen
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const conf = FLOATING_DOCS[idx];
        tl.to(card, {
          y: idx % 2 === 0 ? -100 * conf.speed : 90 * conf.speed,
          x: idx % 2 === 0 ? 40 * conf.speed : -50 * conf.speed,
          rotation: `+=${idx % 2 === 0 ? 12 : -12}`,
          ease: 'none',
        }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sec-companies"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#040e08] via-[#050908] to-[#020504] text-white select-none perspective-container"
    >
      {/* Background Starfield Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Background Floating Resumes Composite */}
      <div
        ref={resumesWrapperRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-70"
      >
        <img
          src={resumesImg}
          alt="Swarm of Floating Torn Resumes and Applications"
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        {/* Soft dark vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050908]/60 to-[#020504]" />
      </div>

      {/* Headline: "...but Companies Care About Proof" */}
      <div
        ref={titleRef}
        className="absolute top-16 sm:top-20 z-20 text-center pointer-events-none w-full px-4"
      >
        <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-emerald-100/90 font-light block">
          ...but Companies
        </span>
        <span className="font-script text-5xl sm:text-7xl md:text-8xl text-emerald-300 font-light block -mt-1 sm:-mt-3 text-glow-sage">
          Care About Proof
        </span>
      </div>

      {/* Floating Interactive Insight Cards */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {FLOATING_DOCS.map((doc, idx) => (
          <div
            key={doc.id}
            ref={(el) => (cardsRef.current[idx] = el)}
            className={`absolute ${doc.pos} ${doc.rot} pointer-events-auto transition-transform duration-300 hover:scale-105 cursor-pointer max-w-[290px] sm:max-w-sm`}
          >
            <div className="glass-dock p-5 rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-xl group">
              <span className="font-mono text-[10px] tracking-widest text-emerald-400 font-semibold block mb-1">
                {doc.badge}
              </span>
              <p className="font-serif text-sm sm:text-base text-white/95 leading-snug italic mb-3">
                {doc.quote}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10 pt-2">
                <span>VERIFIED SOURCE</span>
                <span className="text-emerald-300">{doc.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-24 z-20 pointer-events-none text-center">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-emerald-300/70 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/20">
          PROCEED TO THE SINGULARITY
        </span>
      </div>
    </section>
  );
}
