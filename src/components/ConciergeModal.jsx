import React, { useState, useEffect } from 'react';
import { X, Check, Shield, Clock, Send } from 'lucide-react';

export default function ConciergeModal({ isOpen, onClose, defaultVitola }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vitola: defaultVitola?.name ? `Monarca ${defaultVitola.name}` : 'Monarca Gran Robusto',
    format: 'Cabinet of 25 Vitolas',
    location: 'Geneva Salon',
    notes: '',
  });

  useEffect(() => {
    if (defaultVitola?.name) {
      setFormData((prev) => ({
        ...prev,
        vitola: `Monarca ${defaultVitola.name}`,
      }));
    }
  }, [defaultVitola]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-[#0d0c0a] border border-[#c5a059]/40 rounded-sm p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#7e786e] hover:text-[#dfba73] transition-colors p-2"
          aria-label="Close Allocation Modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#c5a059] uppercase block mb-2">
                PRIVATE ATELIER ALLOCATION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f0ea] tracking-wider font-medium">
                RESERVE YOUR VINTAGE
              </h2>
              <div className="w-12 h-[1px] bg-[#c5a059]/60 mx-auto mt-3" />
              <p className="font-sans text-xs text-[#c2bbb0] mt-3 max-w-md mx-auto leading-relaxed">
                Due to the 5-year natural aging process and limited harvests in Vuelta Abajo, each vitola allocation is curated directly by our Master Sommelier.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] tracking-widest text-[#7e786e] uppercase mb-1.5">
                  FULL NAME / TITLE
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lord / Lady / Citizen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#141210] border border-[#2a241c] focus:border-[#c5a059] px-4 py-2.5 text-sm text-[#f5f0ea] placeholder-[#5a544c] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-[#7e786e] uppercase mb-1.5">
                    PRIVATE EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="concierge@estate.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#141210] border border-[#2a241c] focus:border-[#c5a059] px-4 py-2.5 text-sm text-[#f5f0ea] placeholder-[#5a544c] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-[#7e786e] uppercase mb-1.5">
                    CONTACT TELEPHONE
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+41 22 819 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#141210] border border-[#2a241c] focus:border-[#c5a059] px-4 py-2.5 text-sm text-[#f5f0ea] placeholder-[#5a544c] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-[#7e786e] uppercase mb-1.5">
                    DESIRED VITOLA
                  </label>
                  <select
                    value={formData.vitola}
                    onChange={(e) => setFormData({ ...formData, vitola: e.target.value })}
                    className="w-full bg-[#141210] border border-[#2a241c] focus:border-[#c5a059] px-4 py-2.5 text-sm text-[#f5f0ea] outline-none transition-colors"
                  >
                    <option value="Monarca Gran Robusto">Gran Robusto (54 x 5.5")</option>
                    <option value="Monarca Churchill Reserva">Churchill Reserva (48 x 7.0")</option>
                    <option value="Monarca Torpedo No. 2">Torpedo No. 2 (52 x 6.1")</option>
                    <option value="Monarca Doble Corona">Doble Corona Maduro (56 x 7.5")</option>
                    <option value="Curated Atelier Flight">Curated Atelier Flight (Set of 4)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-[#7e786e] uppercase mb-1.5">
                    PACKAGING FORMAT
                  </label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full bg-[#141210] border border-[#2a241c] focus:border-[#c5a059] px-4 py-2.5 text-sm text-[#f5f0ea] outline-none transition-colors"
                  >
                    <option value="Box of 10 Vitolas">Box of 10 (Spanish Cedar)</option>
                    <option value="Cabinet of 25 Vitolas">Cabinet of 25 (Piano Lacquer)</option>
                    <option value="Private Humidor Trunk (50)">Collector Trunk of 50 Vitolas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-widest text-[#7e786e] uppercase mb-1.5">
                  DELIVERY SALON / VAULT
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#141210] border border-[#2a241c] focus:border-[#c5a059] px-4 py-2.5 text-sm text-[#f5f0ea] outline-none transition-colors"
                >
                  <option value="Geneva Salon">Geneva Salon (Rue du Rhône)</option>
                  <option value="London Club">London St. James's Reserve</option>
                  <option value="New York Atelier">New York Madison Atelier</option>
                  <option value="Dubai Lounge">Dubai DIFC Private Vault</option>
                  <option value="Direct Vault Courier">Direct Climate-Controlled Courier</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#c5a059] to-[#dfba73] hover:from-[#dfba73] hover:to-[#c5a059] text-[#060504] font-serif text-sm tracking-[0.25em] font-semibold uppercase rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.25)] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>TRANSMIT ALLOCATION INQUIRY</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#7e786e] pt-2">
                <span className="flex items-center gap-1">
                  <Shield size={11} className="text-[#c5a059]" /> Strictly Confidential
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} className="text-[#c5a059]" /> 24-Hour Concierge Response
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full border border-[#c5a059] bg-[#1a140d] flex items-center justify-center mx-auto text-[#dfba73] shadow-[0_0_25px_rgba(197,160,89,0.3)]">
              <Check size={28} />
            </div>

            <span className="font-mono text-[10px] tracking-[0.3em] text-[#c5a059] uppercase block">
              ALLOCATION DOSSIER INITIATED
            </span>

            <h3 className="font-serif text-2xl text-[#f5f0ea] tracking-wider">
              HONORED, {formData.name.toUpperCase() || 'DISTINGUISHED GUEST'}
            </h3>

            <p className="font-sans text-xs text-[#c2bbb0] max-w-md mx-auto leading-relaxed">
              Your inquiry for the <span className="text-[#dfba73]">{formData.vitola} ({formData.format})</span> has been logged with our Master Sommelier. Our private vault concierge will reach out within 24 hours to coordinate climate-controlled delivery to <span className="text-[#dfba73]">{formData.location}</span>.
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-8 py-2.5 border border-[#c5a059] text-[#dfba73] hover:bg-[#c5a059] hover:text-[#060504] font-mono text-xs tracking-widest uppercase transition-colors"
              >
                RETURN TO EXPERIENCE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
