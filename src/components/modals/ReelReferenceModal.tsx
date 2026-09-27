import React from 'react';
import { X, ExternalLink, Check, Play, Pause, Sparkles } from 'lucide-react';

interface ReelReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReelReferenceModal: React.FC<ReelReferenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0B111A] border border-gold-400/40 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#101724]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <h3 className="font-serif text-xl text-white font-normal">
              Instagram Reel Reference & Breakdown
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Reel Video Player */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] aspect-[9/16] bg-black rounded-xl overflow-hidden border border-gold-400/40 shadow-2xl">
              <video
                src="/assets/reel_download.mp4"
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href="https://www.instagram.com/reel/DbORBRzBCyJ/?stkn=OTNsemNla2xodDdj"
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center space-x-1.5 text-xs text-gold-300 hover:text-gold-100 font-mono transition-colors"
            >
              <span>Open on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Breakdown & Analysis */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-mono block">
                Source Reel Analysis
              </span>
              <h4 className="font-serif text-2xl text-white font-normal mt-1">
                Aurelia Residences Scrollytelling
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 font-sans">
                In this Instagram showcase by Pola Naeem, a luxury real estate website is demonstrated on a laptop, using scroll-driven camera movements to ascend through the building architecture.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <h5 className="text-[11px] font-mono tracking-widest text-gold-300 uppercase">
                Recreated Stages & Interactions
              </h5>
              
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Stage 01: Hero Tower</strong> — Central District, "YOUR LIFE. ELEVATED." with Level 01 elevator rail.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Stage 02: Ground Floor Arrival</strong> — Camera zooms into canopy, "&lt; 24/7 VALET", "PRIVATE ARRIVAL" hotspot pin.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Stage 03: Grand Lobby</strong> — Marble columns, sculptural wave chandelier, "RESIDENTS' LOUNGE".</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Stage 04: Level 34 Residence</strong> — Three-Bedroom Residence (245 m²), interactive daylight scrubber (16:00 / 18:30 / 20:00).</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Stage 05: Level 48 Sky Pool</strong> — Rooftop infinity pool overlooking city dusk, "INFINITY POOL", "PRIVATE DINING".</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Stage 06: Illuminated Tower Finale</strong> — "LIVE ABOVE THE ORDINARY", "BOOK A PRIVATE VIEWING".</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>SOUNDTRACK EXTRACTED & SYNCED</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-gold-400 text-slate-950 font-sans font-medium text-xs tracking-wider uppercase rounded hover:bg-gold-300 transition-colors"
              >
                Experience Live Site
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
