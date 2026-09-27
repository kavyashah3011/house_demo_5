import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroHandImg from '../assets/clean_hero_hand.jpg';

gsap.registerPlugin(ScrollTrigger);

const TOKENS = [
  { id: 'tesla', name: 'Tesla', symbol: 'T', color: '#e82127', radius: 'rotate-[15deg]' },
  { id: 'amazon', name: 'Amazon', symbol: 'a', color: '#ff9900', radius: 'rotate-[-20deg]' },
  { id: 'microsoft', name: 'Microsoft', symbol: '❖', color: '#00a4ef', radius: 'rotate-[40deg]' },
  { id: 'nike', name: 'Nike', symbol: '✔', color: '#111111', radius: 'rotate-[-35deg]' },
  { id: 'apple', name: 'Apple', symbol: '', color: '#444444', radius: 'rotate-[10deg]' },
  { id: 'google', name: 'Google', symbol: 'G', color: '#4285f4', radius: 'rotate-[-10deg]' },
];

export default function TechDreamSection() {
  const sectionRef = useRef(null);
  const handContainerRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const tokensRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section while scrolling through the 3D hand expansion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        },
      });

      // Hand zooms towards camera in 3D space
      tl.to(handContainerRef.current, {
        scale: 1.35,
        y: -30,
        ease: 'none',
      }, 0);

      // Parallax texts moving in opposite directions
      tl.to(textLeftRef.current, {
        x: -80,
        opacity: 0.2,
        ease: 'none',
      }, 0);

      tl.to(textRightRef.current, {
        x: 80,
        opacity: 0.2,
        ease: 'none',
      }, 0);

      // Orbiting tokens expand and rotate around the hand
      tokensRef.current.forEach((token, idx) => {
        if (!token) return;
        const angle = (idx / TOKENS.length) * Math.PI * 2;
        const expandDistance = 70;
        const xOffset = Math.cos(angle) * expandDistance;
        const yOffset = Math.sin(angle) * expandDistance;

        tl.to(token, {
          x: `+=${xOffset}`,
          y: `+=${yOffset}`,
          rotation: `+=${idx % 2 === 0 ? 45 : -45}`,
          scale: 1.25,
          ease: 'none',
        }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sec-tech"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#c1dfc8] via-[#a8d3b8] to-[#bed8cc] text-emerald-950 select-none perspective-container"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.6)_0%,_rgba(168,211,184,0)_70%)] pointer-events-none" />

      {/* Top Left Floating Text */}
      <div
        ref={textLeftRef}
        className="absolute top-24 left-8 sm:left-20 z-20 pointer-events-none"
      >
        <span className="block font-serif text-5xl sm:text-7xl md:text-8xl font-light text-[#1b4d3e]">
          College
        </span>
        <span className="block font-script text-4xl sm:text-6xl text-[#2d6a56] -mt-2 sm:-mt-4">
          would...
        </span>
      </div>

      {/* Central 3D Hand Visual with Orbiting Tokens */}
      <div
        ref={handContainerRef}
        className="relative z-10 w-full max-w-2xl h-[420px] sm:h-[500px] flex items-center justify-center preserve-3d"
      >
        {/* Hand Image Layer */}
        <div className="relative w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-white/40">
          <img
            src={heroHandImg}
            alt="3D Alien Hand Reaching"
            className="w-full h-full object-cover"
          />
          {/* Subtle luminous halo */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-white/20 pointer-events-none" />
        </div>

        {/* Orbiting 3D Company Tokens */}
        {TOKENS.map((tok, idx) => {
          // Calculate initial circular arrangement around the center
          const angle = (idx / TOKENS.length) * (Math.PI * 2);
          const r = 160; // radius in px
          const cx = Math.cos(angle) * r;
          const cy = Math.sin(angle) * r;

          return (
            <div
              key={tok.id}
              ref={(el) => (tokensRef.current[idx] = el)}
              style={{
                transform: `translate(${cx}px, ${cy}px)`,
              }}
              className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 group"
            >
              {/* Token Glow */}
              <div
                className="absolute inset-0 rounded-full opacity-40 blur-md group-hover:opacity-80 transition-opacity"
                style={{ backgroundColor: tok.color }}
              />
              <span
                className="relative z-10 font-bold font-sans text-lg sm:text-xl drop-shadow-sm"
                style={{ color: tok.color }}
              >
                {tok.symbol}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Right Floating Text */}
      <div
        ref={textRightRef}
        className="absolute bottom-28 right-8 sm:right-20 z-20 pointer-events-none text-right"
      >
        <span className="block font-script text-5xl sm:text-7xl text-[#1b4d3e]">
          ...hire
        </span>
        <span className="block font-serif text-6xl sm:text-8xl md:text-9xl font-light text-[#164232] -mt-3 sm:-mt-5">
          You
        </span>
      </div>
    </section>
  );
}
