import React from 'react';
import { X, Phone, Mail, MapPin, ExternalLink, Instagram, ShieldCheck, ArrowRight } from 'lucide-react';

interface AureliaMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenLayouts: () => void;
  onOpenReel: () => void;
}

export const AureliaMenuDrawer: React.FC<AureliaMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenBooking,
  onOpenLayouts,
  onOpenReel,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { label: '01. Architecture & Concept', target: 'hero' },
    { label: '02. Private Arrival & Valet', target: 'arrival' },
    { label: '03. Double-Height Grand Lobby', target: 'lobby' },
    { label: '04. Three-Bedroom Residence (Level 34)', target: 'residence' },
    { label: '05. Sky Penthouse & Infinity Pool (Level 48)', target: 'penthouse-pool' },
    { label: '06. Night Skyline & Penthouse Collection', target: 'night-finale' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-[#0B111A] border-l border-gold-400/30 h-full p-8 sm:p-12 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-mono block">
              Menu Navigation
            </span>
            <h3 className="font-serif text-3xl text-white tracking-wider font-light">
              AURELIA
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="py-8 space-y-4">
          <span className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-mono block mb-2">
            The Residence Journey
          </span>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onClose();
                onNavigateSection(item.target);
              }}
              className="w-full text-left py-2.5 px-3 rounded hover:bg-white/5 group flex items-center justify-between transition-colors"
            >
              <span className="font-serif text-lg sm:text-xl text-slate-200 group-hover:text-gold-300 transition-colors">
                {item.label}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        {/* Action CTAs & Floorplans */}
        <div className="py-6 border-y border-white/10 grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              onClose();
              onOpenLayouts();
            }}
            className="py-3 px-4 border border-gold-400/40 text-gold-300 hover:bg-gold-400/10 rounded text-xs font-mono tracking-widest uppercase transition-colors"
          >
            View Floorplans
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="py-3 px-4 bg-gold-400 text-slate-950 font-medium rounded text-xs font-sans tracking-widest uppercase hover:bg-gold-300 transition-colors shadow-lg shadow-gold-500/15"
          >
            Book A Viewing
          </button>
        </div>

        {/* Contact & Location Footer */}
        <div className="pt-6 space-y-3 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>Central District Promenade, Sky Landmark One</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gold-400" />
            <span>+1 (800) 924-AURELIA | VIP Concierge</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gold-400" />
            <span>privateclients@aureliaresidences.com</span>
          </div>

          <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-white/5">
            <button
              onClick={() => {
                onClose();
                onOpenReel();
              }}
              className="flex items-center space-x-1 text-gold-400/80 hover:text-gold-300"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Original Reel Breakdown</span>
            </button>
            <span>© 2026 Aurelia Residences</span>
          </div>
        </div>
      </div>
    </div>
  );
};
