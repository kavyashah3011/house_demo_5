import React, { useState, useRef, useEffect } from 'react';
import { audioEngine } from './AudioEngine';

export default function TapHoldTrigger({ onTriggerComplete }) {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isHolding, setIsHolding] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const holdTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  const HOLD_DURATION = 1200; // 1.2s to fill ring

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) cancelAnimationFrame(holdTimerRef.current);
    };
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    if (isTriggered) return;

    audioEngine.init();
    setIsHolding(true);
    startTimeRef.current = Date.now();

    const updateHold = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / HOLD_DURATION) * 100);
      setProgress(currentProgress);

      audioEngine.playHoldHum(currentProgress / 100);

      if (currentProgress >= 100) {
        setIsTriggered(true);
        setIsHolding(false);
        audioEngine.playShatterBoom();
        if (onTriggerComplete) onTriggerComplete();
      } else {
        holdTimerRef.current = requestAnimationFrame(updateHold);
      }
    };

    holdTimerRef.current = requestAnimationFrame(updateHold);
  };

  const handleEnd = () => {
    if (isTriggered) return;
    setIsHolding(false);
    if (holdTimerRef.current) {
      cancelAnimationFrame(holdTimerRef.current);
    }
    // Smoothly reset progress
    setProgress(0);
  };

  // SVG circular stroke calculation
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className={`relative w-20 h-20 flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 ${
          isHolding ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        {/* Pulsing Aura Glow */}
        <div
          className={`absolute inset-0 rounded-full bg-white/20 blur-xl transition-all duration-300 ${
            isHolding ? 'bg-red-500/50 scale-150 blur-2xl' : 'animate-pulse'
          }`}
        />

        {/* Circular Progress SVG Gauge */}
        <svg className="w-16 h-16 -rotate-90">
          {/* Background Track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="rgba(0, 0, 0, 0.4)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="3"
            className="backdrop-blur-sm"
          />
          {/* Active Fill Ring */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="transparent"
            stroke={progress > 80 ? '#ef4444' : '#ffffff'}
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-75 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        </svg>

        {/* Center Hand Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-colors duration-200 ${
              progress > 80 ? 'text-red-400' : 'text-white'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="mt-3 text-center pointer-events-none">
        <span className="font-mono text-[11px] tracking-[0.25em] text-white/90 uppercase font-bold drop-shadow">
          {isHolding ? `${Math.round(progress)}% BREAKING` : 'TAP & HOLD'}
        </span>
      </div>
    </div>
  );
}
