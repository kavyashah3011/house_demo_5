import React from 'react';

interface ElevatorRailProps {
  currentLevelIndex: number;
  onSelectLevel: (index: number) => void;
  scrollProgress: number; // 0 to 1
}

export const ElevatorRail: React.FC<ElevatorRailProps> = ({
  currentLevelIndex,
  onSelectLevel,
  scrollProgress,
}) => {
  const levels = [
    { code: '01', label: 'ARRIVAL', sublabel: 'Street Level', sectionIndex: 1 },
    { code: '02', label: 'RESIDENCE', sublabel: 'Level 34', sectionIndex: 3 },
    { code: '03', label: 'SKY LEVEL', sublabel: 'Level 48', sectionIndex: 4 },
  ];

  // Map 0..5 levels to 01, 02, 03
  const getActiveCode = () => {
    if (currentLevelIndex <= 2) return '01';
    if (currentLevelIndex === 3) return '02';
    return '03';
  };

  const activeCode = getActiveCode();

  return (
    <aside className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none pointer-events-auto">
      
      {/* Rotated Vertical Header */}
      <div className="vertical-text text-[9px] tracking-[0.35em] text-slate-400/80 uppercase font-sans mb-6">
        ADDRESS
      </div>

      {/* Vertical Rail Line with Markers */}
      <div className="relative flex flex-col items-center space-y-12">
        {/* Continuous Background Line */}
        <div className="absolute top-2 bottom-2 w-[1px] bg-gradient-to-b from-white/10 via-gold-400/30 to-white/10 pointer-events-none" />

        {/* Live Indicator Pill tracking progress */}
        <div 
          className="absolute w-[2px] bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 shadow-[0_0_12px_#C5A880] transition-all duration-300 pointer-events-none"
          style={{
            top: `${Math.min(Math.max(scrollProgress * 85, 0), 85)}%`,
            height: '24px',
          }}
        />

        {levels.map((lvl) => {
          const isActive = activeCode === lvl.code;

          return (
            <div
              key={lvl.code}
              onClick={() => onSelectLevel(lvl.sectionIndex)}
              className="relative group flex items-center cursor-pointer py-1"
            >
              {/* Tooltip on hover on desktop */}
              <div className="absolute right-10 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-[#0B111A]/95 border border-gold-400/30 px-3 py-1 rounded shadow-xl backdrop-blur-md">
                <span className="text-[10px] tracking-widest text-gold-300 uppercase font-mono block">
                  {lvl.label}
                </span>
                <span className="text-[9px] text-slate-300 block">
                  {lvl.sublabel}
                </span>
              </div>

              {/* Number Label */}
              <span
                className={`font-mono text-xs sm:text-sm tracking-wider mr-3 transition-all duration-300 ${
                  isActive
                    ? 'text-white font-semibold scale-110'
                    : 'text-slate-400 group-hover:text-gold-200'
                }`}
              >
                {lvl.code}
              </span>

              {/* Indicator Dot / Ring */}
              <div className="relative flex items-center justify-center">
                {isActive ? (
                  <div className="relative flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full border border-gold-400/80 animate-ping-slow absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gold-400 shadow-[0_0_10px_#C5A880]" />
                  </div>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500/70 group-hover:bg-gold-300 group-hover:scale-125 transition-all" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Floor readout */}
      <div className="mt-8 flex flex-col items-center">
        <span className="text-[9px] tracking-[0.25em] text-slate-400/70 uppercase font-mono">
          LEVEL
        </span>
        <span className="font-serif text-lg text-gold-300 tracking-wider font-light">
          {currentLevelIndex <= 2 ? '01' : currentLevelIndex === 3 ? '34' : '48'}
        </span>
      </div>
    </aside>
  );
};
