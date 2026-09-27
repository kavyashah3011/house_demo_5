import React, { useState } from 'react';
import { NAVIGATION_LINKS } from '../../data/healthcare';

interface NavbarProps {
  scrollProgress: number;
  currentFrameIndex: number;
  onNavigateToFrame: (index: number) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  scrollProgress,
  currentFrameIndex,
  onNavigateToFrame,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const isScrolled = scrollProgress > 0.02;

  // Synthesize soft high-tech clinical audio chime
  const playClinicalChime = () => {
    if (!isAudioEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {}
  };

  const handleLinkClick = (index: number) => {
    playClinicalChime();
    onNavigateToFrame(index);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-2.5 shadow-sm'
          : 'bg-white/60 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Clinical Mark */}
        <button
          onClick={() => handleLinkClick(0)}
          className="flex items-center space-x-3 group focus:outline-none"
        >
          <div className="h-8 w-8 rounded-lg bg-sky-50 border border-sky-300 p-1.5 flex items-center justify-center transition-all group-hover:border-sky-500 group-hover:bg-sky-100 shadow-sm">
            <svg
              className="h-full w-full text-sky-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div className="text-left">
            <span className="font-display font-bold tracking-wider text-slate-900 text-base block leading-none">
              AETHERIA
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-sky-600 block mt-0.5 font-semibold">
              HEALTHCARE 3D
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links with Active Indicator */}
        <nav className="hidden lg:flex items-center space-x-1">
          {NAVIGATION_LINKS.map((item) => {
            const isActive = item.frameIndex === currentFrameIndex;
            return (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.frameIndex)}
                className={`relative px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all focus:outline-none font-semibold ${
                  isActive
                    ? 'text-sky-700 bg-sky-50/90 shadow-sm'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button, Audio Toggle & Hamburger */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Audio Chime Feedback Toggle */}
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`p-2 rounded-full border transition-all text-xs focus:outline-none ${
              isAudioEnabled
                ? 'bg-sky-100 border-sky-300 text-sky-700'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title={isAudioEnabled ? 'Mute clinical audio feedback' : 'Enable clinical audio feedback'}
          >
            {isAudioEnabled ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          <button
            onClick={() => {
              playClinicalChime();
              onOpenContact();
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 rounded-full transition-all duration-300 shadow-md font-bold hover:scale-105"
          >
            Clinical Partnership
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-slate-200 px-6 pt-4 pb-6 backdrop-blur-xl animate-fadeIn space-y-2 shadow-lg">
          {NAVIGATION_LINKS.map((item) => {
            const isActive = item.frameIndex === currentFrameIndex;
            return (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.frameIndex)}
                className={`block w-full text-left py-2 px-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold'
                    : 'text-slate-700 hover:text-sky-600 font-semibold'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full mt-3 py-2.5 text-center text-xs font-mono uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm font-bold"
          >
            Clinical Partnership
          </button>
        </div>
      )}
    </header>
  );
};
