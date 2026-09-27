import React from 'react';
import { X, ChevronRight, Compass } from 'lucide-react';

export default function MenuDrawer({ isOpen, onClose, onJumpToSection }) {
  if (!isOpen) return null;

  const chapters = [
    { id: 'sec-hero', number: '01', title: 'You Believed', desc: 'The pristine promise of modern education' },
    { id: 'sec-tech', number: '02', title: 'College Would Hire You', desc: 'The tech giant illusion & floating tokens' },
    { id: 'sec-adam', number: '03', title: 'The Promise: JOB', desc: 'Creation of Adam & Tap-and-Hold portal' },
    { id: 'sec-truth', number: '04', title: "That's Bullsh*t", desc: 'The crimson reality break & crisis data' },
    { id: 'sec-dollar', number: '05', title: 'University Sells Paper', desc: 'Banknote medallion & burning currency' },
    { id: 'sec-companies', number: '06', title: 'Companies Care About Proof', desc: 'Torn resumes, CVs, and verifiable skills' },
    { id: 'sec-why', number: '07', title: "...And That's Why", desc: 'The cosmic singularity & early access' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md transition-all duration-300">
      <div className="w-full max-w-md h-full bg-[#050908] border-l border-white/10 p-8 flex flex-col justify-between overflow-y-auto">
        
        {/* Top bar */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs tracking-widest text-emerald-300 uppercase">
                Story Chapters
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chapter List */}
          <div className="mt-8 space-y-4">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  onJumpToSection(ch.id);
                  onClose();
                }}
                className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      {ch.number}
                    </span>
                    <h4 className="font-serif text-lg text-white group-hover:text-emerald-300 transition-colors">
                      {ch.title}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 font-light pl-7">
                    {ch.desc}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-white/10 text-center font-mono text-[11px] text-white/40">
          ASTRA INTERACTIVE SCROLLYTELLING © 2026
        </div>

      </div>
    </div>
  );
}
