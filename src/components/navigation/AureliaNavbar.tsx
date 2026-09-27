import React, { useState } from 'react';
import { Search, Globe, Volume2, VolumeX, Menu, X, Sparkles, Video } from 'lucide-react';

interface AureliaNavbarProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenMenu: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  viewMode: string;
  onToggleViewMode?: () => void;
  onOpenReelModal: () => void;
}

export const AureliaNavbar: React.FC<AureliaNavbarProps> = ({
  activeSection,
  onNavigateSection,
  onOpenBooking,
  onOpenMenu,
  isAudioPlaying,
  onToggleAudio,
  viewMode,
  onToggleViewMode,
  onOpenReelModal,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'residences', label: 'Residences', target: 'residence' },
    { id: 'amenities', label: 'Amenities', target: 'lobby' },
    { id: 'architecture', label: 'Architecture', target: 'hero' },
    { id: 'location', label: 'Location', target: 'arrival' },
    { id: 'gallery', label: 'Gallery', target: 'penthouse-pool' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-[#0B111A]/90 via-[#0B111A]/60 to-transparent backdrop-blur-md border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Identity matching the reel */}
        <div 
          onClick={() => onNavigateSection('hero')}
          className="cursor-pointer group flex flex-col items-start select-none"
        >
          <span className="text-[9px] tracking-[0.25em] text-gold-400/80 font-medium uppercase transition-colors group-hover:text-gold-300">
            Residency Overview
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-white font-normal group-hover:text-gold-200 transition-colors">
              AURELIA
            </span>
          </div>
          <span className="text-[8px] tracking-[0.35em] text-slate-400 font-sans -mt-1 uppercase">
            Residences
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || (link.id === 'residences' && activeSection === 'residence');
            return (
              <button
                key={link.id}
                onClick={() => onNavigateSection(link.target)}
                className={`relative py-2 text-xs lg:text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-slate-300/80 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-fadeIn" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & CTAs */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Reel Mode / Comparison Button */}
          <button
            onClick={onOpenReelModal}
            title="Compare with Instagram Reel"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-[11px] tracking-wider uppercase bg-white/5 border border-gold-400/30 text-gold-300 hover:bg-gold-400/10 transition-all"
          >
            <Video className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline font-mono">Reel Ref</span>
          </button>

          {/* Audio Lounge Toggle */}
          <button
            onClick={onToggleAudio}
            className={`p-2 rounded-full border transition-all ${
              isAudioPlaying 
                ? 'bg-gold-500/20 border-gold-400/40 text-gold-300' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={isAudioPlaying ? 'Mute Atmosphere Music' : 'Play Atmosphere Music'}
          >
            {isAudioPlaying ? (
              <div className="flex items-center space-x-1">
                <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
                <span className="hidden lg:flex space-x-[2px] items-end h-3">
                  <span className="w-[2px] bg-gold-400 h-2 animate-[pulse_0.8s_ease-in-out_infinite]" />
                  <span className="w-[2px] bg-gold-400 h-3 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-[2px] bg-gold-400 h-1.5 animate-[pulse_1s_ease-in-out_infinite]" />
                </span>
              </div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Quick Search */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              title="Search residences"
            >
              <Search className="w-4 h-4" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 w-64 bg-[#0B111A]/95 border border-gold-500/30 rounded-lg p-2 shadow-2xl backdrop-blur-xl animate-fadeIn">
                <input
                  type="text"
                  placeholder="Search level, floorplan, suites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold-400"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Currency / Language selector */}
          <div className="hidden xl:flex items-center space-x-1 text-slate-300/80 text-xs tracking-wider cursor-pointer hover:text-white transition-colors">
            <Globe className="w-3.5 h-3.5 text-gold-400/80" />
            <span>$ USD (EN)</span>
          </div>

          {/* Golden CTA: BOOK A VIEWING */}
          <button
            onClick={onOpenBooking}
            className="relative px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-slate-950 font-medium text-xs sm:text-xs tracking-[0.16em] uppercase rounded shadow-lg shadow-gold-500/15 hover:shadow-gold-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all font-sans"
          >
            Book A Viewing
          </button>

          {/* Mobile / Full Menu Trigger */}
          <button
            onClick={onOpenMenu}
            className="p-2 text-slate-300 hover:text-white transition-colors"
            title="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
