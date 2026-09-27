import React from 'react';
import { ArrowUp, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';

export default function FooterSection({ onOpenConcierge }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040302] border-t border-[#2a241c] text-[#c2bbb0] py-20 px-6 select-none overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#1c1813]">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm border border-[#c5a059]/40 bg-[#12100d] flex items-center justify-center">
                <span className="font-serif font-bold text-sm tracking-widest text-[#dfba73]">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.25em] text-base text-[#f5f0ea] font-semibold">
                  MONARCA
                </span>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#c5a059]/80 uppercase">
                  1892 • RESERVA PRIVADA
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-[#7e786e] max-w-sm leading-relaxed font-light">
              Crafted in strictly limited annual editions using vintage Cuban-seed Habano leaves from Vuelta Abajo. Aged minimum five years in Spanish cedar humidor vaults.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#c5a059]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} />
                CERTIFIED VUELTA ABAJO ORIGIN
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-[#dfba73] uppercase">
              THE HOUSE
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a href="#collection" className="hover:text-[#dfba73] transition-colors">
                  The Collection
                </a>
              </li>
              <li>
                <a href="#anatomy" className="hover:text-[#dfba73] transition-colors">
                  Cigar Anatomy
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-[#dfba73] transition-colors">
                  Craftsmanship
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#dfba73] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#flavor" className="hover:text-[#dfba73] transition-colors">
                  Flavor Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Salons */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-[#dfba73] uppercase">
              GLOBAL SALONS
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#7e786e]">
              <li className="flex items-center gap-2">
                <MapPin size={11} className="text-[#c5a059]" /> Geneva: Rue du Rhône 42
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={11} className="text-[#c5a059]" /> London: St. James's St 14
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={11} className="text-[#c5a059]" /> Havana: Quinta Avenida 18
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={11} className="text-[#c5a059]" /> Dubai: DIFC Gate Village 08
              </li>
            </ul>
          </div>

          {/* Col 5: Private Concierge */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-[#dfba73] uppercase">
              CONCIERGE
            </h4>
            <p className="text-xs text-[#7e786e] font-light">
              Direct consultation with our Master Sommelier for private cellar curation.
            </p>
            <button
              onClick={onOpenConcierge}
              className="w-full py-2.5 px-4 rounded border border-[#c5a059] bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#dfba73] hover:text-[#060504] font-mono text-[10px] tracking-widest uppercase transition-all duration-300"
            >
              CONTACT CONCIERGE
            </button>
            <div className="text-[10px] font-mono text-[#7e786e] pt-1">
              EMAIL: concierge@monarca1892.ch
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal Compliance & Rights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#7e786e]">
          <div className="flex items-center gap-6">
            <span>© 1892–2026 MONARCA CIGARS ATELIER S.A.</span>
            <span>•</span>
            <a href="#" className="hover:text-[#dfba73] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#dfba73] transition-colors">Terms of Allocation</a>
            <span>•</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#dfba73] transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-[#5a544c]">
              STRICTLY 21+ • FOR CONNOISSEURS ONLY
            </span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-[#2a241c] hover:border-[#dfba73] flex items-center justify-center text-[#7e786e] hover:text-[#dfba73] transition-colors"
              aria-label="Back to Top"
              title="Return to Top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
