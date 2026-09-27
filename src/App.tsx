import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AureliaNavbar } from './components/navigation/AureliaNavbar';
import { ElevatorRail } from './components/navigation/ElevatorRail';
import { HotspotMarker } from './components/ui/HotspotMarker';
import { DaylightScrubber, TimeOfDay } from './components/ui/DaylightScrubber';
import { ExploreLayoutsModal } from './components/modals/ExploreLayoutsModal';
import { BookViewingModal } from './components/modals/BookViewingModal';
import { ReelReferenceModal } from './components/modals/ReelReferenceModal';
import { AureliaMenuDrawer } from './components/navigation/AureliaMenuDrawer';
import { AURELIA_LEVELS, AureliaLevel } from './data/aureliaData';
import { 
  Building2, 
  ChevronRight, 
  Sparkles, 
  Video, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff,
  Compass, 
  Key, 
  Maximize2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState<TimeOfDay>('16:00');
  const [showHud, setShowHud] = useState(true);

  // Auto-Tour Animation State
  const [isAutoTouring, setIsAutoTouring] = useState(false);
  const autoTourAnimRef = useRef<number | null>(null);

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLayoutsOpen, setIsLayoutsOpen] = useState(false);
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Audio Engine
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Target and current progress for high-precision 60 FPS lerp physics
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Audio initialization
  useEffect(() => {
    audioRef.current = new Audio('/assets/reel_audio.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.55;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((e) => console.log('Audio autoplay prevented:', e));
    }
  }, [isAudioPlaying]);

  // Global Wheel, Touch, and Keyboard listeners for award-winning virtual scrollytelling
  useEffect(() => {
    let animId: number;

    const handleWheel = (e: WheelEvent) => {
      if (isAutoTouring) setIsAutoTouring(false);
      const delta = e.deltaY;
      const speed = e.deltaMode === 1 ? 0.04 : 0.00085;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta * speed));
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (isAutoTouring) setIsAutoTouring(false);
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + deltaY * 0.0022));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        targetProgressRef.current = Math.min(1, targetProgressRef.current + 0.07);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        targetProgressRef.current = Math.max(0, targetProgressRef.current - 0.07);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // 60 FPS Inertial Physics Loop
    const updatePhysics = () => {
      const delta = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(delta) > 0.0001) {
        currentProgressRef.current += delta * 0.2;
        setScrollProgress(currentProgressRef.current);

        const count = AURELIA_LEVELS.length;
        const section = Math.min(Math.floor(currentProgressRef.current * count), count - 1);
        setCurrentSectionIndex(section);
      }
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, [isAutoTouring]);

  // Programmatic jump to section
  const scrollToSection = useCallback((sectionIndex: number) => {
    if (isAutoTouring) setIsAutoTouring(false);
    const count = AURELIA_LEVELS.length;
    const target = sectionIndex / (count - 1);
    targetProgressRef.current = target;
  }, [isAutoTouring]);

  const handleNavigateByTarget = (targetId: string) => {
    const idx = AURELIA_LEVELS.findIndex((l) => l.id === targetId);
    if (idx !== -1) {
      scrollToSection(idx);
    }
  };

  // Auto-tour smooth scroll controller
  useEffect(() => {
    if (!isAutoTouring) {
      if (autoTourAnimRef.current) cancelAnimationFrame(autoTourAnimRef.current);
      return;
    }

    let lastTime = performance.now();
    const durationMs = 17000; // 17 seconds complete cinematic tour

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const increment = delta / durationMs;
      targetProgressRef.current = Math.min(1, targetProgressRef.current + increment);

      if (targetProgressRef.current >= 1) {
        setIsAutoTouring(false);
      } else {
        autoTourAnimRef.current = requestAnimationFrame(step);
      }
    };

    autoTourAnimRef.current = requestAnimationFrame(step);

    return () => {
      if (autoTourAnimRef.current) cancelAnimationFrame(autoTourAnimRef.current);
    };
  }, [isAutoTouring]);

  const toggleAutoTour = () => {
    if (isAutoTouring) {
      setIsAutoTouring(false);
    } else {
      if (targetProgressRef.current >= 0.98) {
        targetProgressRef.current = 0;
        currentProgressRef.current = 0;
        setScrollProgress(0);
      }
      if (!isAudioPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {});
      }
      setIsAutoTouring(true);
    }
  };

  const currentLevel = AURELIA_LEVELS[currentSectionIndex] || AURELIA_LEVELS[0];

  // Dynamic image selection for Level 34 (Residence) based on daylight scrubber
  const getResidenceImage = () => {
    if (selectedTime === '18:30') return '/assets/residence_sunset.jpg';
    if (selectedTime === '20:00') return '/assets/residence_night.jpg';
    return '/assets/residence_day.jpg';
  };

  // Stage boundaries across 0.00 to 1.00
  // Stage 0: Hero Tower (0.00 - 0.16)
  // Stage 1: Ground Floor Arrival (0.17 - 0.35)
  // Stage 2: Grand Lobby (0.36 - 0.53)
  // Stage 3: Level 34 Residence (0.54 - 0.73)
  // Stage 4: Level 48 Infinity Pool (0.74 - 0.88)
  // Stage 5: Twilight Tower Finale (0.89 - 1.00)
  const isHero = scrollProgress < 0.17;
  const isArrival = scrollProgress >= 0.17 && scrollProgress < 0.36;
  const isLobby = scrollProgress >= 0.36 && scrollProgress < 0.54;
  const isResidence = scrollProgress >= 0.54 && scrollProgress < 0.74;
  const isPool = scrollProgress >= 0.74 && scrollProgress < 0.89;
  const isFinale = scrollProgress >= 0.89;

  return (
    <div className="relative w-screen h-screen bg-[#070B10] text-white overflow-hidden select-none font-sans">
      
      {/* TOP LUXURY NAVBAR (Crystal Clear Vector Typography) */}
      <AureliaNavbar
        activeSection={currentLevel.id}
        onNavigateSection={handleNavigateByTarget}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        viewMode="native"
        onOpenReelModal={() => setIsReelModalOpen(true)}
      />

      {/* RIGHT-SIDE SIGNATURE "ADDRESS" ELEVATOR RAIL */}
      <ElevatorRail
        currentLevelIndex={currentSectionIndex}
        onSelectLevel={scrollToSection}
        scrollProgress={scrollProgress}
      />

      {/* SEAMLESS 4K FULL-BLEED BACKGROUND ENGINE WITH KEN BURNS PARALLAX */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {AURELIA_LEVELS.map((lvl, idx) => {
          const sectionCenter = idx / (AURELIA_LEVELS.length - 1);
          const dist = Math.abs(scrollProgress - sectionCenter);
          // Opacity curve: peak at center, smoothly fade out within 0.22 distance
          const opacity = Math.max(0, 1 - dist * 4.2);
          
          // Camera zoom simulation: zooms in as you approach, smoothly resets
          const scale = 1.0 + (1 - Math.min(1, dist * 3.5)) * 0.08;

          let imgSrc = lvl.image;
          if (lvl.id === 'residence') {
            imgSrc = getResidenceImage();
          }

          if (opacity <= 0.001) return null;

          return (
            <div
              key={lvl.id}
              className="absolute inset-0 will-change-transform"
              style={{
                opacity,
                transform: `scale(${scale})`,
                transition: 'transform 0.4s ease-out',
              }}
            >
              <img
                src={imgSrc}
                alt={lvl.title}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-[1.03]"
                loading="eager"
              />
              
              {/* Atmospheric Luxury Cinematic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#070B10]/85 via-[#070B10]/30 to-[#070B10]/75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B10] via-transparent to-[#070B10]/50" />

              {/* Sunset golden atmosphere wash on Level 34 & Level 48 */}
              {(lvl.id === 'penthouse-pool' || (lvl.id === 'residence' && selectedTime === '18:30')) && (
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-orange-500/10 to-transparent mix-blend-screen pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE 3D HOTSPOT MARKERS (Level 48 Infinity Pool Deck) */}
      {isPool && showHud && (
        <div className="absolute inset-0 z-20 pointer-events-auto animate-fadeIn">
          {/* Infinity Pool Hotspot */}
          <div className="absolute top-[34%] left-[24%] sm:left-[32%] -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setIsLayoutsOpen(true)}
              className="group flex items-center space-x-2.5 px-4 py-2 rounded-full bg-black/85 border border-cyan-400/60 backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:scale-105 active:scale-95 transition-all text-xs font-mono text-cyan-200"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
              </span>
              <span className="tracking-wider">25M HEATED INFINITY POOL</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Private Dining Hotspot */}
          <div className="absolute top-[38%] right-[20%] sm:right-[28%] translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="group flex items-center space-x-2.5 px-4 py-2 rounded-full bg-black/85 border border-gold-400/60 backdrop-blur-xl shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:scale-105 active:scale-95 transition-all text-xs font-mono text-gold-200"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-400" />
              </span>
              <span className="tracking-wider">PRIVATE DINING CABANAS</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* EDITORIAL LUXURY SCROLL HUD (Varied font sizes, hierarchy & authentic positioning) */}
      {showHud && (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-12 lg:p-16 pt-24 pb-20">
          
          {/* MAIN DYNAMIC EDITORIAL CONTENT */}
          <div className="max-w-2xl pointer-events-auto transition-all duration-700">
            
            {/* 1. HERO SECTION */}
            {isHero && (
              <div className="space-y-6 animate-fadeIn">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded bg-black/60 border border-gold-400/30 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-[0.25em] text-gold-200 uppercase font-medium">
                    Central District • The Spire Landmark
                  </span>
                </div>

                <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[0.98] drop-shadow-2xl">
                  YOUR LIFE.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8BC94] via-[#F3E5D0] to-[#C5A880] font-normal">
                    ELEVATED.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-200/90 font-light leading-relaxed max-w-lg drop-shadow">
                  A private vertical sanctuary commanding the city skyline. Scroll to descend through the arrival porte-cochère, grand double-height lobby, Level 34 sky residence, and rooftop infinity pool.
                </p>

                <div className="pt-2 flex items-center space-x-4">
                  <button
                    onClick={() => scrollToSection(1)}
                    className="group flex items-center space-x-3 px-7 py-3.5 border border-gold-400/60 hover:border-gold-300 bg-gold-500/15 hover:bg-gold-500/25 backdrop-blur-md rounded text-xs tracking-[0.22em] uppercase font-sans text-white transition-all duration-300 shadow-[0_0_25px_rgba(197,168,128,0.2)]"
                  >
                    <span>EXPLORE THE RESIDENCES</span>
                    <ChevronRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-6 py-3.5 border border-white/20 hover:border-white/40 bg-black/40 backdrop-blur-md rounded text-xs tracking-[0.2em] uppercase font-sans text-slate-300 hover:text-white transition-all"
                  >
                    Schedule Viewing
                  </button>
                </div>
              </div>
            )}

            {/* 2. GROUND FLOOR ARRIVAL */}
            {isArrival && (
              <div className="space-y-4 animate-fadeIn">
                <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.28em] text-gold-400 uppercase">
                  <span>Street Level</span>
                  <span>•</span>
                  <span>Porte-Cochère Arrival</span>
                </div>

                <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide leading-tight drop-shadow-xl">
                  GROUND FLOOR
                </h2>

                <p className="text-sm sm:text-base text-slate-200 font-light max-w-lg leading-relaxed drop-shadow">
                  Sheltered private arrival with heated granite paving, ambient architectural lighting, and 24/7 white-glove valet. Touchless sliding glass doors glide open into the residents&apos; atrium.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded bg-white/10 hover:bg-gold-500/20 border border-gold-400/50 backdrop-blur-md text-xs font-mono text-gold-200 tracking-wider transition-all"
                  >
                    <span>Request Private Valet Arrival</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gold-400" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. THE GRAND LOBBY */}
            {isLobby && (
              <div className="space-y-4 animate-fadeIn">
                <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.28em] text-gold-400 uppercase">
                  <span>Level 01</span>
                  <span>•</span>
                  <span>Double-Height Atrium</span>
                </div>

                <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide leading-tight drop-shadow-xl">
                  THE GRAND LOBBY
                </h2>

                <p className="text-sm sm:text-base text-slate-200 font-light max-w-lg leading-relaxed drop-shadow">
                  Soaring 9-meter marble colonnade, bespoke kinetic wave chandeliers, and an intimate residents&apos; lounge serviced around the clock by our dedicated lifestyle concierge.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                  <span className="px-3 py-1.5 rounded bg-black/60 border border-white/15 backdrop-blur-md">
                    Calacatta Gold Marble
                  </span>
                  <span className="px-3 py-1.5 rounded bg-black/60 border border-white/15 backdrop-blur-md">
                    24/7 Concierge Service
                  </span>
                </div>
              </div>
            )}

            {/* 4. LEVEL 34 SKY RESIDENCE */}
            {isResidence && (
              <div className="space-y-4 animate-fadeIn">
                <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.28em] text-gold-400 uppercase">
                  <span>Sky Collection</span>
                  <span>•</span>
                  <span>Dual Aspect Panorama</span>
                </div>

                <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide leading-tight drop-shadow-xl">
                  THREE-BEDROOM RESIDENCE
                </h2>

                {/* Metric Badges */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <span className="px-3.5 py-1.5 rounded bg-gold-400/20 border border-gold-400/50 text-gold-200 text-xs font-mono font-medium backdrop-blur-md shadow-lg shadow-gold-500/10">
                    245 m² / 2,637 sq ft
                  </span>
                  <span className="px-3.5 py-1.5 rounded bg-black/60 border border-white/20 text-slate-200 text-xs font-mono backdrop-blur-md">
                    3 Bed • 3.5 Bath
                  </span>
                  <span className="px-3.5 py-1.5 rounded bg-black/60 border border-white/20 text-slate-200 text-xs font-mono backdrop-blur-md">
                    38 m² Sunset Balcony
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-200 font-light max-w-lg leading-relaxed drop-shadow">
                  Expansive living gallery enclosed in full-height motorized glass walls. Seamless transition to your private balcony overlooking the city skyline. Use the atmospheric scrubber below to adjust the room lighting.
                </p>

                <div className="pt-2 flex items-center space-x-3">
                  <button
                    onClick={() => setIsLayoutsOpen(true)}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-gold-400 text-slate-950 font-medium rounded text-xs font-sans tracking-[0.16em] uppercase hover:bg-gold-300 transition-all shadow-xl shadow-gold-500/25"
                  >
                    <span>Inspect Residence Floorplan</span>
                    <Layers className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-5 py-2.5 border border-white/25 hover:border-gold-400 bg-black/50 rounded text-xs font-mono text-slate-200 hover:text-white transition-all"
                  >
                    Book Private Tour
                  </button>
                </div>
              </div>
            )}

            {/* 5. LEVEL 48 SKY PENTHOUSE & POOL */}
            {isPool && (
              <div className="space-y-4 animate-fadeIn">
                <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.28em] text-cyan-300 uppercase">
                  <span>Crown Apex</span>
                  <span>•</span>
                  <span>Level 48</span>
                </div>

                <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide leading-tight drop-shadow-xl">
                  SKY PENTHOUSE & POOL
                </h2>

                <p className="text-sm sm:text-base text-slate-200 font-light max-w-lg leading-relaxed drop-shadow">
                  Suspended 180 meters above the metropolis. Features a 25-meter heated cantilevered infinity pool, alfresco sunset dining, private teak cabanas, and 360-degree horizon panoramas.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsLayoutsOpen(true)}
                    className="px-5 py-2.5 border border-gold-400/60 bg-black/70 rounded text-xs font-mono tracking-wider text-gold-200 hover:bg-gold-500/20 backdrop-blur-md transition-all shadow-xl"
                  >
                    Penthouse Layout (540 m²)
                  </button>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#C5A880] to-[#E2CEB3] text-slate-950 font-medium rounded text-xs font-sans tracking-[0.16em] uppercase hover:scale-[1.02] transition-all shadow-xl"
                  >
                    Book Sky Tour
                  </button>
                </div>
              </div>
            )}

            {/* 6. TWILIGHT TOWER FINALE */}
            {isFinale && (
              <div className="space-y-6 animate-fadeIn">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded bg-gold-500/10 border border-gold-500/30 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-[11px] font-mono tracking-[0.25em] text-gold-300 uppercase">
                    The Crown Landmark
                  </span>
                </div>

                <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[0.98] drop-shadow-2xl">
                  LIVE ABOVE<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8BC94] via-[#F3E5D0] to-[#C5A880] font-normal">
                    THE ORDINARY.
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-200 font-light max-w-lg leading-relaxed drop-shadow">
                  Connect your destination to your next moment. Where architectural legacy meets limitless city views.
                </p>

                <div className="space-y-4 pt-2">
                  <span className="text-xs font-mono tracking-[0.28em] text-gold-400 uppercase block font-medium">
                    BOOK A PRIVATE VIEWING
                  </span>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-slate-950 font-semibold text-xs tracking-[0.22em] uppercase rounded shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all font-sans"
                    >
                      Explore Residences
                    </button>
                    <button
                      onClick={() => setIsLayoutsOpen(true)}
                      className="px-8 py-3.5 border border-white/30 hover:border-gold-400 bg-black/50 hover:bg-gold-500/10 backdrop-blur-md rounded text-xs tracking-[0.22em] uppercase font-sans text-white transition-all duration-300"
                    >
                      Explore Layouts
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* BOTTOM INTERACTIVE STRIP (Pills, Day/Night Scrubber & Level Stamp) */}
          <div className="flex items-end justify-between border-t border-white/10 pt-5 pointer-events-auto">
            
            {/* Left Action / Context Pill */}
            <div>
              {isHero && (
                <div className="flex items-center space-x-6 text-[11px] font-mono text-slate-300">
                  <span className="text-gold-400">01 / 06</span>
                  <span>ARCHITECTURAL LANDMARK</span>
                </div>
              )}

              {isArrival && (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-black/80 border border-gold-400/50 backdrop-blur-md text-xs font-mono text-gold-300 hover:bg-gold-500/20 transition-all shadow-xl"
                >
                  <span>‹</span>
                  <span>24/7 VALET COURTESY</span>
                </button>
              )}

              {isLobby && (
                <div className="text-[11px] font-mono text-slate-300">
                  <span className="text-gold-300">CALACATTA GOLD MARBLE</span>
                  <span className="mx-2">•</span>
                  <span>CURATED CONTEMPORARY ART</span>
                </div>
              )}

              {isResidence && (
                <div className="flex items-center space-x-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-400 hidden sm:inline font-medium">
                    Atmospheric Lighting:
                  </span>
                  <DaylightScrubber
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                  />
                </div>
              )}

              {isPool && (
                <div className="text-[11px] font-mono text-slate-300">
                  <span className="text-cyan-300">HEATED INFINITY POOL</span>
                  <span className="mx-2">•</span>
                  <span>PRIVATE TEAK CABANAS</span>
                </div>
              )}

              {isFinale && (
                <div className="text-[11px] font-mono text-slate-300">
                  <span className="text-gold-400">HANDOVER Q4 2026</span>
                  <span className="mx-2">•</span>
                  <span>PRIVATE EQUITY INQUIRIES</span>
                </div>
              )}
            </div>

            {/* Right Architectural Floor Stamp */}
            <div className="text-right">
              <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase block">
                {isHero && 'STREET LEVEL'}
                {isArrival && 'STREET LEVEL'}
                {isLobby && 'STREET LEVEL'}
                {isResidence && 'TYPICAL FLOOR'}
                {isPool && 'SKY LEVEL'}
                {isFinale && 'SKY LEVEL APEX'}
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-white font-light tracking-wide">
                {isHero && 'AURELIA SPIRE'}
                {isArrival && 'GROUND FLOOR'}
                {isLobby && "RESIDENTS' LOUNGE"}
                {isResidence && <>LEVEL <span className="text-gold-300 font-normal">34</span></>}
                {isPool && <>LEVEL <span className="text-gold-300 font-normal">48</span></>}
                {isFinale && <>LEVEL <span className="text-gold-300 font-normal">48</span></>}
              </span>
            </div>

          </div>

        </div>
      )}

      {/* FLOATING LUXURY REEL CONTROL DOCK (Bottom Center) */}
      <footer className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[#070B10]/95 border border-gold-500/30 backdrop-blur-xl shadow-2xl text-xs font-mono pointer-events-auto select-none">
        
        {/* Auto Tour Play/Pause */}
        <button
          onClick={toggleAutoTour}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            isAutoTouring
              ? 'bg-gold-400 text-slate-950 font-semibold shadow-lg shadow-gold-500/30'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
          title={isAutoTouring ? 'Pause Cinematic Auto Tour' : 'Play Cinematic Auto Tour'}
        >
          {isAutoTouring ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isAutoTouring ? 'Touring...' : 'Auto Tour'}</span>
        </button>

        <div className="h-4 w-[1px] bg-white/20 mx-0.5" />

        {/* Toggle HUD Visibility */}
        <button
          onClick={() => setShowHud(!showHud)}
          className={`p-2 rounded-full transition-colors ${
            showHud ? 'text-slate-400 hover:text-white' : 'text-gold-300 bg-gold-500/20'
          }`}
          title={showHud ? 'Hide Editorial Overlays (Pure Visual Scroll)' : 'Show Editorial Overlays'}
        >
          {showHud ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-full transition-colors ${
            isAudioPlaying ? 'text-gold-300 bg-gold-500/20' : 'text-slate-400 hover:text-white'
          }`}
          title={isAudioPlaying ? 'Mute Atmosphere Music' : 'Play Atmosphere Music'}
        >
          {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Reel Reference Modal Toggle */}
        <button
          onClick={() => setIsReelModalOpen(true)}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-gold-400 hover:text-gold-200 transition-colors"
          title="Compare with Original Reel Reference"
        >
          <Video className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Reel Ref</span>
        </button>
      </footer>

      {/* ALL INTERACTIVE MODALS & DRAWERS */}
      <BookViewingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <ExploreLayoutsModal
        isOpen={isLayoutsOpen}
        onClose={() => setIsLayoutsOpen(false)}
        onBookViewing={() => {
          setIsLayoutsOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <ReelReferenceModal
        isOpen={isReelModalOpen}
        onClose={() => setIsReelModalOpen(false)}
      />

      <AureliaMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateSection={handleNavigateByTarget}
        onOpenBooking={() => {
          setIsMenuOpen(false);
          setIsBookingOpen(true);
        }}
        onOpenLayouts={() => {
          setIsMenuOpen(false);
          setIsLayoutsOpen(true);
        }}
        onOpenReel={() => {
          setIsMenuOpen(false);
          setIsReelModalOpen(true);
        }}
      />

    </div>
  );
}
