import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { toggleHumidorAmbiance, getAmbianceState } from '../utils/audioAmbiance';

export default function Navbar({ onOpenConcierge }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const nextState = toggleHumidorAmbiance((active) => {
      setIsAudioActive(active);
    });
    setIsAudioActive(nextState);
  };

  const navLinks = [
    { label: 'ANATOMY', href: '#anatomy' },
    { label: 'CRAFT', href: '#craft' },
    { label: 'JOURNEY', href: '#story' },
    { label: '360° VITOLA', href: '#rotation' },
    { label: 'THE VAULT', href: '#box' },
    { label: 'COLLECTION', href: '#collection' },
    { label: 'TASTING', href: '#flavor' },
    { label: 'PHILOSOPHY', href: '#philosophy' },
  ];

  return (
    <>
      {/* Top Gold Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#8e6f36] via-[#dfba73] to-[#c5a059] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#060504]/90 backdrop-blur-md border-b border-[#2a241c]/60 py-3.5'
            : 'bg-gradient-to-b from-[#060504]/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#"
            className="flex items-center gap-3.5 group select-none"
            aria-label="Monarca 1892 Homepage"
          >
            {/* Heraldic Gold Monogram Icon */}
            <div className="w-9 h-9 rounded-sm border border-[#c5a059]/40 bg-[#12100d] flex items-center justify-center relative overflow-hidden group-hover:border-[#dfba73] transition-colors duration-300">
              <span className="font-serif font-bold text-sm tracking-widest text-[#dfba73]">M</span>
              <div className="absolute inset-0 bg-[#c5a059]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.28em] text-sm text-[#f5f0ea] font-semibold group-hover:text-[#dfba73] transition-colors">
                MONARCA
              </span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#c5a059]/70 uppercase">
                1892 • RESERVA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.2em] text-[#c2bbb0] hover:text-[#dfba73] transition-colors duration-200 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#dfba73] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Controls: Telemetry, Audio, Concierge CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Live Humidor Telemetry Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a241c] bg-[#12100d]/80 text-[10px] font-mono text-[#c2bbb0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
              <span>68% RH • 70°F • VUELTA ABAJO</span>
            </div>

            {/* Audio Atmosphere Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded border text-[11px] font-mono tracking-wider transition-all duration-300 ${
                isAudioActive
                  ? 'border-[#dfba73] text-[#dfba73] bg-[#c5a059]/10 shadow-[0_0_12px_rgba(197,160,89,0.2)]'
                  : 'border-[#2a241c] text-[#7e786e] hover:text-[#c2bbb0] hover:border-[#3d3428]'
              }`}
              title="Toggle Humidor Ambient Audio"
            >
              {isAudioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span className="hidden sm:inline">
                {isAudioActive ? 'ATMOSPHERE ON' : 'ATMOSPHERE'}
              </span>
              {/* Equalizer animation when playing */}
              {isAudioActive && (
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-[#dfba73] animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                  <span className="w-0.5 bg-[#dfba73] animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
                  <span className="w-0.5 bg-[#dfba73] animate-[pulse_0.5s_ease-in-out_infinite] h-1.5" />
                </div>
              )}
            </button>

            {/* Reserve Allocation CTA */}
            <button
              onClick={onOpenConcierge}
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 border border-[#c5a059] bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#dfba73] hover:text-[#060504] font-mono text-[11px] tracking-[0.16em] uppercase rounded-sm transition-all duration-300 shadow-[0_0_15px_rgba(197,160,89,0.12)] hover:shadow-[0_0_25px_rgba(197,160,89,0.35)]"
            >
              <Sparkles size={12} />
              <span>ALLOCATION</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#c2bbb0] hover:text-[#dfba73] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-[#060504]/96 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col justify-center px-10 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl tracking-[0.2em] text-[#f5f0ea] hover:text-[#dfba73] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-8 flex flex-col items-center gap-4 border-t border-[#2a241c] mt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="w-full max-w-xs py-3 bg-[#c5a059] text-[#060504] font-mono text-xs tracking-widest uppercase font-semibold"
            >
              RESERVE ALLOCATION
            </button>
            <div className="text-[10px] font-mono text-[#7e786e]">
              HUMIDOR: 68% RH • 70°F • VUELTA ABAJO
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
