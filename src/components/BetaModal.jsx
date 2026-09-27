import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BetaModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState('Engineer');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#34d399', '#6ee7b7', '#ffffff'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl transition-all duration-300">
      <div className="relative w-full max-w-lg glass-dock rounded-3xl p-8 border border-white/20 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase">
                Early Access Protocol
              </span>
              <h3 className="font-serif text-3xl font-light text-white mt-1">
                Enter The New Standard
              </h3>
              <p className="text-sm text-neutral-300 mt-2 font-light">
                Leave outdated credentials behind. Access real-world verification, zero-fluff apprenticeships, and direct founder pipelines.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-white/60 tracking-wider uppercase mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-white/60 tracking-wider uppercase mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-white/60 tracking-wider uppercase mb-1.5">
                  Primary Focus
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Engineer', 'Designer', 'Founder', 'Student', 'Creative', 'Self-Taught'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRole(item)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                        role === item
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:shadow-[0_0_35px_rgba(52,211,153,0.6)] transition-all active:scale-[0.98]"
              >
                <span>Request Priority Invitation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto mb-4 text-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl font-light text-white">
              Invitation Confirmed
            </h3>
            <p className="text-sm text-neutral-300 mt-2">
              Welcome, <span className="text-emerald-300 font-medium">{name || 'Pioneer'}</span>. Your pass #{Math.floor(10000 + Math.random() * 90000)} has been generated and dispatched to <span className="text-emerald-300">{email}</span>.
            </p>
            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-neutral-400 flex items-center justify-between">
              <span>STATUS: IN QUEUE</span>
              <span className="text-emerald-400">POSITION: #142</span>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-widest uppercase transition-colors"
            >
              Return to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
