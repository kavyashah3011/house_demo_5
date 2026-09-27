import React, { useState } from 'react';
import { X, Calendar, Clock, Building, User, Mail, Phone, CheckCircle, ShieldCheck } from 'lucide-react';

interface BookViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookViewingModal: React.FC<BookViewingModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residenceType: 'Level 34 — Three-Bedroom Residence',
    date: '2026-10-15',
    time: '14:00',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#0B111A] border border-gold-400/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#101724]">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-mono block">
              Private Concierge
            </span>
            <h3 className="font-serif text-2xl text-white font-normal">
              Book A Private Viewing
            </h3>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-white">Viewing Requested</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <span className="text-gold-300 font-medium">{formData.name || 'Valued Guest'}</span>. Your private appointment for <span className="text-white font-medium">{formData.residenceType}</span> has been logged. Our Private Client Concierge will contact you within 2 business hours.
              </p>
              <div className="pt-4 border-t border-white/10 max-w-xs mx-auto text-[11px] text-slate-400 font-mono">
                REFERENCE: AUR-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 px-6 py-2.5 bg-gold-400 text-slate-950 font-medium text-xs tracking-widest uppercase rounded hover:bg-gold-300 transition-all"
              >
                Close Confirmation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono tracking-wider text-slate-300 uppercase mb-1.5">
                  Select Residence Tier
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gold-400 absolute left-3 top-3" />
                  <select
                    value={formData.residenceType}
                    onChange={(e) => setFormData({ ...formData, residenceType: e.target.value })}
                    className="w-full bg-[#070A0F] border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Level 34 — Three-Bedroom Residence (245 m²)">
                      Level 34 — Three-Bedroom Residence (245 m²)
                    </option>
                    <option value="Level 48 — Sky Penthouse & Infinity Pool (540 m²)">
                      Level 48 — Sky Penthouse & Infinity Pool (540 m²)
                    </option>
                    <option value="Level 22 — Two-Bedroom Horizon Residence (180 m²)">
                      Level 22 — Two-Bedroom Horizon Residence (180 m²)
                    </option>
                    <option value="Full Building Private Architectural Tour">
                      Full Building Private Architectural Tour
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-slate-300 uppercase mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gold-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#070A0F] border border-white/15 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-slate-300 uppercase mb-1.5">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gold-400 absolute left-3 top-3" />
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#070A0F] border border-white/15 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-wider text-slate-300 uppercase mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gold-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord James Hamilton"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070A0F] border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-slate-300 uppercase mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gold-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="client@luxury.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#070A0F] border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-slate-300 uppercase mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gold-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#070A0F] border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>Strict confidentiality & NDA provided upon arrival</span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#C5A880] via-[#D8BC94] to-[#C5A880] text-slate-950 font-medium text-xs tracking-widest uppercase rounded shadow-lg shadow-gold-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all font-sans"
                >
                  Confirm Viewing Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
