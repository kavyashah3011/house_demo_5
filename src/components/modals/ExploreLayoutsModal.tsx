import React, { useState } from 'react';
import { X, Check, BedDouble, Bath, Maximize2, Compass, Layers, Download } from 'lucide-react';
import { FLOORPLANS } from '../../data/aureliaData';

interface ExploreLayoutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookViewing: () => void;
}

export const ExploreLayoutsModal: React.FC<ExploreLayoutsModalProps> = ({
  isOpen,
  onClose,
  onBookViewing,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState(FLOORPLANS[0].id);

  if (!isOpen) return null;

  const currentPlan = FLOORPLANS.find((p) => p.id === selectedPlanId) || FLOORPLANS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl bg-[#0B111A] border border-gold-400/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#101724]">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-mono block">
              Architectural Blueprints
            </span>
            <h3 className="font-serif text-2xl text-white font-normal">
              Aurelia Residence Collections
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 px-6 bg-[#0E1520]">
          {FLOORPLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`py-3.5 px-6 text-xs sm:text-sm tracking-wider uppercase font-medium border-b-2 transition-all ${
                selectedPlanId === plan.id
                  ? 'border-gold-400 text-gold-300 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {plan.title.split('—')[0]}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Blueprint Visualizer */}
          <div className="lg:col-span-7 bg-[#070A0F] border border-white/10 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[340px] shadow-inner">
            <div className="absolute top-4 left-4 flex items-center space-x-2 text-[10px] tracking-wider text-slate-400 font-mono">
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>NORTH ORIENTATION</span>
            </div>

            {/* Custom High-Fidelity SVG Architectural Blueprint */}
            <div className="w-full max-w-md aspect-[4/3] flex items-center justify-center relative">
              <svg viewBox="0 0 400 300" className="w-full h-full text-gold-400/80 stroke-current fill-none stroke-[1.2]">
                {/* Outer perimeter walls */}
                <rect x="20" y="20" width="360" height="260" rx="4" strokeWidth="2.5" stroke="#C5A880" />
                
                {/* Rooms partitioning */}
                {selectedPlanId === 'three-bed' ? (
                  <>
                    {/* Living & Dining Area */}
                    <rect x="25" y="25" width="220" height="150" fill="rgba(197, 168, 128, 0.04)" strokeDasharray="3 3" />
                    <text x="135" y="100" fill="#E8D6B8" fontSize="11" textAnchor="middle" fontFamily="sans-serif" stroke="none">GRAND LIVING & DINING</text>
                    <text x="135" y="115" fill="#A1AAB8" fontSize="9" textAnchor="middle" fontFamily="monospace" stroke="none">10.2m × 6.8m</text>

                    {/* Balcony Terrace */}
                    <rect x="25" y="175" width="220" height="100" stroke="#7A5B34" fill="rgba(197, 168, 128, 0.08)" />
                    <text x="135" y="230" fill="#E8D6B8" fontSize="10" textAnchor="middle" fontFamily="sans-serif" stroke="none">CANTILEVERED BALCONY</text>
                    <text x="135" y="245" fill="#A1AAB8" fontSize="8" textAnchor="middle" fontFamily="monospace" stroke="none">38 m² | Sunset View</text>

                    {/* Master Suite */}
                    <rect x="245" y="25" width="130" height="130" fill="rgba(255, 255, 255, 0.02)" />
                    <text x="310" y="85" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontFamily="sans-serif" stroke="none">MASTER SUITE</text>
                    <text x="310" y="100" fill="#A1AAB8" fontSize="8" textAnchor="middle" fontFamily="monospace" stroke="none">En-Suite & Dressing</text>

                    {/* Bedroom 2 & 3 */}
                    <rect x="245" y="155" width="130" height="120" fill="rgba(255, 255, 255, 0.02)" />
                    <text x="310" y="210" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontFamily="sans-serif" stroke="none">GUEST SUITES</text>
                  </>
                ) : (
                  <>
                    {/* Sky Penthouse Infinity Terrace */}
                    <rect x="25" y="25" width="350" height="100" stroke="#C5A880" fill="rgba(56, 189, 248, 0.12)" />
                    <text x="200" y="70" fill="#7DD3FC" fontSize="12" textAnchor="middle" fontFamily="sans-serif" stroke="none">25M CANTILEVERED INFINITY POOL</text>
                    <text x="200" y="88" fill="#A1AAB8" fontSize="9" textAnchor="middle" fontFamily="monospace" stroke="none">Private Skyline Deck | 145 m²</text>

                    {/* Sky Salon */}
                    <rect x="25" y="130" width="230" height="145" fill="rgba(197, 168, 128, 0.06)" />
                    <text x="140" y="200" fill="#E8D6B8" fontSize="12" textAnchor="middle" fontFamily="sans-serif" stroke="none">DOUBLE HEIGHT GRAND SALON</text>

                    {/* Master Observatory */}
                    <rect x="260" y="130" width="115" height="145" fill="rgba(255, 255, 255, 0.03)" />
                    <text x="317" y="200" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontFamily="sans-serif" stroke="none">MASTER SPA</text>
                  </>
                )}
              </svg>
            </div>
            
            <div className="w-full flex items-center justify-between pt-4 border-t border-white/10 text-[11px] text-slate-400 font-mono">
              <span>SCALE: 1:100 METRIC</span>
              <span className="text-gold-300">AURELIA CERTIFIED PLAN</span>
            </div>
          </div>

          {/* Specs & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-gold-400 uppercase">
                {currentPlan.level}
              </span>
              <h4 className="font-serif text-2xl text-white font-normal mt-1">
                {currentPlan.title}
              </h4>
              <p className="text-sm text-slate-300 mt-2 font-mono">
                {currentPlan.area}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
              <div className="flex items-center space-x-2 text-slate-300 text-xs">
                <BedDouble className="w-4 h-4 text-gold-400" />
                <span>{currentPlan.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 text-xs">
                <Bath className="w-4 h-4 text-gold-400" />
                <span>{currentPlan.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 text-xs">
                <Maximize2 className="w-4 h-4 text-gold-400" />
                <span>{currentPlan.balcony}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 text-xs">
                <Layers className="w-4 h-4 text-gold-400" />
                <span>Private Elevator</span>
              </div>
            </div>

            <div>
              <h5 className="text-[11px] tracking-widest text-gold-300 uppercase font-mono mb-3">
                Architectural Inclusions
              </h5>
              <div className="space-y-2">
                {currentPlan.highlights.map((h, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  onBookViewing();
                }}
                className="flex-1 py-3 px-5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-slate-950 font-medium text-xs tracking-widest uppercase rounded shadow-lg shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Schedule Private Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
