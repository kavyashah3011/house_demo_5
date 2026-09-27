import React from 'react';
import { Sun, Sunset, Moon } from 'lucide-react';

export type TimeOfDay = '16:00' | '18:30' | '20:00';

interface DaylightScrubberProps {
  selectedTime: TimeOfDay;
  onSelectTime: (time: TimeOfDay) => void;
}

export const DaylightScrubber: React.FC<DaylightScrubberProps> = ({
  selectedTime,
  onSelectTime,
}) => {
  const times: { id: TimeOfDay; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: '16:00', label: '16:00', icon: <Sun className="w-3.5 h-3.5" />, desc: 'Afternoon Natural Light' },
    { id: '18:30', label: '18:30', icon: <Sunset className="w-3.5 h-3.5" />, desc: 'Golden Hour Sunset' },
    { id: '20:00', label: '20:00', icon: <Moon className="w-3.5 h-3.5" />, desc: 'Metropolitan Night Glow' },
  ];

  return (
    <div className="flex flex-col items-center bg-[#0B111A]/80 border border-white/15 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-2xl">
      <div className="flex items-center space-x-6 sm:space-x-8">
        {times.map((t) => {
          const isActive = selectedTime === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTime(t.id)}
              className={`group flex items-center space-x-1.5 transition-all duration-300 py-1 ${
                isActive
                  ? 'text-gold-300 scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className={`transition-colors ${isActive ? 'text-gold-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {t.icon}
              </span>
              <span className="font-mono text-xs tracking-wider font-medium">
                {t.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_6px_#C5A880] ml-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
