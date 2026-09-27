import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { audioEngine } from './AudioEngine';

export default function InteractiveGate({ onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const starRef = useRef(null);
  const xpRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isCompleted, setIsCompleted] = useState(false);

  const strokePoints = useRef([]);
  const coveredAngles = useRef(new Set());
  const guideRadius = 110;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation loop for fluid caustics ripples and drawing trail
    let animId;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw faint guide circle
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 3;
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.arc(cx, cy, guideRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw active user glowing brush stroke
      if (strokePoints.current.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Outer glow
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 14;
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.moveTo(strokePoints.current[0].x, strokePoints.current[0].y);
        for (let i = 1; i < strokePoints.current.length; i++) {
          ctx.lineTo(strokePoints.current[i].x, strokePoints.current[i].y);
        }
        ctx.stroke();

        // Core bright line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(strokePoints.current[0].x, strokePoints.current[0].y);
        for (let i = 1; i < strokePoints.current.length; i++) {
          ctx.lineTo(strokePoints.current[i].x, strokePoints.current[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePointerDown = (e) => {
    if (isCompleted) return;
    audioEngine.init();
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    strokePoints.current = [{ x, y }];
    trackAngle(x, y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing || isCompleted) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    strokePoints.current.push({ x, y });
    if (strokePoints.current.length > 120) {
      strokePoints.current.shift(); // keep smooth sliding tail
    }

    trackAngle(x, y);
    audioEngine.playDrawTone(progress / 100);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const trackAngle = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // If within reasonable proximity to circle ring (tolerance ±75px)
    if (Math.abs(dist - guideRadius) < 75) {
      let angle = Math.atan2(dy, dx); // -PI to PI
      let bucket = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * 36); // 36 buckets of 10 degrees
      coveredAngles.current.add(bucket);

      const percent = Math.min(100, Math.round((coveredAngles.current.size / 32) * 100));
      setProgress(percent);

      if (percent >= 90 && !isCompleted) {
        triggerCompletion();
      }
    }
  };

  const triggerCompletion = () => {
    setIsCompleted(true);
    audioEngine.playRewardChime();
    audioEngine.startAmbient();

    // Confetti / sparkle explosion
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#34d399', '#ffffff'],
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      },
    });

    // Star pop-in and spin
    tl.fromTo(
      starRef.current,
      { scale: 0, rotation: -90, opacity: 0 },
      { scale: 1.2, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
    );

    // XP text float up
    tl.fromTo(
      xpRef.current,
      { y: 15, opacity: 0 },
      { y: -20, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

    tl.to(
      [starRef.current, xpRef.current],
      { opacity: 0, scale: 0.8, y: -40, duration: 0.4, delay: 0.5 }
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none bg-[#78b39c]/90 backdrop-blur-md transition-colors duration-1000 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(167, 243, 208, 0.4) 0%, rgba(20, 83, 45, 0.95) 100%)`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Background caustics water ripples animation */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen overflow-hidden">
        <div className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-200/20 via-emerald-500/10 to-transparent animate-spin-slow" />
      </div>

      {/* Center Drawing Guide Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair touch-none"
      />

      {/* Central Instruction Prompt */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <span className="font-mono text-sm tracking-[0.35em] text-white/90 uppercase font-semibold drop-shadow-md">
          Draw A Zero
        </span>

        {/* Progress percent indicator */}
        <span className="font-mono text-[11px] tracking-widest text-emerald-200/75 mt-2">
          {progress > 0 ? `${progress}% TRACED` : 'TRACING GESTURE REQUIRED'}
        </span>
      </div>

      {/* Reward Elements (4-point Golden Star + XP Float) */}
      <div className="absolute z-20 flex flex-col items-center pointer-events-none">
        <div
          ref={starRef}
          className="opacity-0 w-16 h-16 flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]">
            <path
              d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z"
              fill="#fbbf24"
            />
          </svg>
        </div>
        <div
          ref={xpRef}
          className="opacity-0 font-mono text-sm font-bold tracking-[0.2em] text-amber-200 mt-2 drop-shadow"
        >
          + 100 XP
        </div>
      </div>

      {/* Quick Skip / Auto-Complete for testing & accessibility */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          triggerCompletion();
        }}
        className="absolute bottom-8 text-[11px] font-mono tracking-widest text-white/50 hover:text-white border border-white/20 hover:border-white/50 px-4 py-1.5 rounded-full transition-all duration-300 pointer-events-auto"
      >
        [ SKIP GESTURE ]
      </button>
    </div>
  );
}
