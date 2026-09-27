import React, { useState } from 'react';
import { Hotspot } from '../../data/aureliaData';
import { Camera, Eye, Building2, Key, Coffee, Sparkles, Maximize2, Sun, Utensils, Crown, Info, X } from 'lucide-react';

interface HotspotMarkerProps {
  hotspot: Hotspot;
  onOpenBooking: () => void;
}

export const HotspotMarker: React.FC<HotspotMarkerProps> = ({ hotspot, onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = () => {
    switch (hotspot.icon) {
      case 'camera': return <Camera className="w-3.5 h-3.5 text-gold-300" />;
      case 'eye': return <Eye className="w-3.5 h-3.5 text-gold-300" />;
      case 'building': return <Building2 className="w-3.5 h-3.5 text-gold-300" />;
      case 'key': return <Key className="w-3.5 h-3.5 text-gold-300" />;
      case 'coffee': return <Coffee className="w-3.5 h-3.5 text-gold-300" />;
      case 'sparkles': return <Sparkles className="w-3.5 h-3.5 text-gold-300" />;
      case 'maximize': return <Maximize2 className="w-3.5 h-3.5 text-gold-300" />;
      case 'sun': return <Sun className="w-3.5 h-3.5 text-gold-300" />;
      case 'utensils': return <Utensils className="w-3.5 h-3.5 text-gold-300" />;
      case 'crown': return <Crown className="w-3.5 h-3.5 text-gold-300" />;
      default: return <Info className="w-3.5 h-3.5 text-gold-300" />;
    }
  };

  return (
    <div
      className="absolute z-30 transition-transform duration-300 select-none"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      {/* Floating Tag Pill matching the Instagram Reel UI */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center space-x-1.5 px-3 py-1.5 bg-[#0B111A]/85 hover:bg-[#0B111A] border border-white/20 hover:border-gold-400/80 rounded backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105"
      >
        {/* Pulsing indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400" />
        </span>

        {getIcon()}

        <span className="font-sans text-[11px] sm:text-xs tracking-[0.14em] text-white font-medium uppercase">
          {hotspot.title}
        </span>

        {hotspot.tag && (
          <span className="text-[8px] tracking-wider px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 uppercase font-mono">
            {hotspot.tag}
          </span>
        )}
      </button>

      {/* Downward Vertical Leader Line */}
      <div className="flex flex-col items-center">
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-gold-400" />
        <div className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_8px_#C5A880]" />
      </div>

      {/* Expandable Architectural Detail Modal / Card */}
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 sm:w-80 bg-[#0B111A]/95 border border-gold-400/40 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-fadeIn z-50">
          <div className="flex items-start justify-between border-b border-white/10 pb-2 mb-3">
            <div>
              <span className="text-[9px] tracking-[0.2em] text-gold-400 uppercase font-mono block">
                {hotspot.subtitle || 'Architectural Highlight'}
              </span>
              <h4 className="font-serif text-lg text-white font-normal">
                {hotspot.title}
              </h4>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
            {hotspot.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-[10px] text-slate-400 font-mono">
              AURELIA HIGHLIGHT
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="text-xs tracking-wider uppercase text-gold-300 hover:text-gold-100 font-medium transition-colors"
            >
              Inquire Experience →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
