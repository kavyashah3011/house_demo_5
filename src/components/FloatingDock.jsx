import React from 'react';
import { Menu } from 'lucide-react';

export default function FloatingDock({ onOpenBeta, onOpenMenu, isScrolled = false }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500">
      <nav className="glass-dock px-2.5 py-2 rounded-full flex items-center gap-2 shadow-2xl border border-white/20">
        
        {/* Left: Green Globe / Wireframe Icon */}
        <button
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center text-black shadow-[0_0_15px_rgba(52,211,153,0.5)] hover:scale-105 transition-transform"
          title="Astra Ecosystem"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.2]">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8M3.6 15h16.8" />
            <path d="M12 3a14 14 0 0 0 0 18M12 3a14 14 0 0 1 0 18" />
          </svg>
        </button>

        {/* Center: Primary Call to Action Button */}
        <button
          onClick={onOpenBeta}
          className="bg-neutral-950 hover:bg-neutral-900 active:scale-95 text-white font-sans text-xs tracking-wider font-semibold px-6 py-2 rounded-full border border-white/10 transition-all duration-300 hover:shadow-lg hover:border-white/30"
        >
          Join Beta
        </button>

        {/* Right: Hamburger / Navigation Drawer Button */}
        <button
          onClick={onOpenMenu}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-900 flex items-center justify-center shadow-md active:scale-95 transition-all"
          title="Open Story Chapters"
        >
          <div className="flex flex-col gap-1 w-3.5">
            <span className="w-full h-0.5 bg-neutral-900 rounded-full" />
            <span className="w-full h-0.5 bg-neutral-900 rounded-full" />
          </div>
        </button>

      </nav>
    </div>
  );
}
