import React, { useState } from 'react';
import { HEALTHCARE_FRAMES } from '../../three/frames/healthcareFrames';
import { Healthcare3DFrame } from '../../three/frames/frameTypes';
import { Proper3DFrameVisual } from './Proper3DFrameVisual';
import { PATIENT_JOURNEY_STAGES } from '../../data/healthcare';

interface FrameOverlayProps {
  scrollProgress: number;
  currentFrameIndex: number;
  onNavigateToFrame: (index: number) => void;
  onOpenContact: () => void;
  onInspectFrame: (frame: Healthcare3DFrame) => void;
}

export const FrameOverlay: React.FC<FrameOverlayProps> = ({
  scrollProgress,
  currentFrameIndex,
  onNavigateToFrame,
  onOpenContact,
  onInspectFrame,
}) => {
  const [selectedJourneyStage, setSelectedJourneyStage] = useState(0);

  return (
    <main className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-center px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto">
      {HEALTHCARE_FRAMES.map((frame, idx) => {
        // Continuous, overlapping cross-fade math
        const transitionBuffer = 0.024;
        let opacity = 0;
        let translateY = 0;

        const minVisible = idx === 0 ? 0 : frame.startProgress - transitionBuffer;
        const maxVisible = idx === HEALTHCARE_FRAMES.length - 1 ? 1.0 : frame.endProgress + transitionBuffer;

        if (scrollProgress >= minVisible && scrollProgress <= maxVisible) {
          if (idx > 0 && scrollProgress < frame.startProgress + transitionBuffer) {
            const t = (scrollProgress - (frame.startProgress - transitionBuffer)) / (2 * transitionBuffer);
            opacity = Math.max(0, Math.min(1, t));
            translateY = (1 - opacity) * 16;
          } else if (idx < HEALTHCARE_FRAMES.length - 1 && scrollProgress > frame.endProgress - transitionBuffer) {
            const t = (frame.endProgress + transitionBuffer - scrollProgress) / (2 * transitionBuffer);
            opacity = Math.max(0, Math.min(1, t));
            translateY = -(1 - opacity) * 16;
          } else {
            opacity = 1.0;
            translateY = 0;
          }
        }

        if (opacity <= 0.01) return null;

        const isRight = frame.text.position === 'right';
        const isJourney = frame.id === 'patient-journey';
        const isFinal = frame.id === 'final-cta';

        return (
          <div
            key={frame.id}
            className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 lg:p-8 pointer-events-none transition-transform duration-200 ease-out"
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
            }}
          >
            {isJourney ? (
              /* FRAME 09 — INTERACTIVE PATIENT JOURNEY / CARE CONTINUUM */
              <div className="flex flex-col items-center justify-center w-full max-w-6xl pointer-events-auto space-y-3 pt-8 pb-14">
                <div className="text-center max-w-2xl space-y-1">
                  {frame.text.badge && (
                    <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full text-[10px] font-mono tracking-wider border bg-sky-50 border-sky-200 text-sky-800 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                      <span>{frame.text.badge}</span>
                    </div>
                  )}
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
                    {frame.text.headline}
                  </h2>
                  <p className="text-xs text-slate-600 max-w-lg mx-auto">
                    {frame.text.description}
                  </p>
                </div>

                {/* 5-Stage Stepper + Proper 3D Pavilion Stage */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-center pt-2">
                  <div className="lg:col-span-7 space-y-2 text-left">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-1">
                      {PATIENT_JOURNEY_STAGES.map((stage, sIdx) => {
                        const isStageActive = selectedJourneyStage === sIdx;
                        return (
                          <button
                            key={stage.id}
                            onClick={() => setSelectedJourneyStage(sIdx)}
                            className={`p-2.5 rounded-xl border text-left transition-all ${
                              isStageActive
                                ? 'bg-sky-50 border-sky-400 shadow-sm ring-1 ring-sky-300'
                                : 'bg-white/80 hover:bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                              STEP 0{stage.step}
                            </div>
                            <div className="font-bold text-xs font-display text-slate-900 truncate">
                              {stage.title.split('. ')[1] || stage.title}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {PATIENT_JOURNEY_STAGES[selectedJourneyStage] && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-sky-200 shadow-md space-y-2.5 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                            PHASE 0{PATIENT_JOURNEY_STAGES[selectedJourneyStage].step} CLINICAL PROTOCOL
                          </span>
                          <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center space-x-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>STANDARDIZED</span>
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {PATIENT_JOURNEY_STAGES[selectedJourneyStage].title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {PATIENT_JOURNEY_STAGES[selectedJourneyStage].description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                            <span className="text-slate-400 uppercase text-[9px] block">Biomarker Focus:</span>
                            <span className="text-sky-800 font-semibold">{PATIENT_JOURNEY_STAGES[selectedJourneyStage].biomarkerFocus}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-teal-50/60 border border-teal-200/80">
                            <span className="text-teal-700 uppercase text-[9px] block">Clinical Outcome:</span>
                            <span className="text-teal-900 font-semibold">{PATIENT_JOURNEY_STAGES[selectedJourneyStage].clinicalOutcome}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <Proper3DFrameVisual
                      image={frame.image}
                      frameIndex={idx}
                      frameId={frame.id}
                      opacity={opacity}
                      onInspect={() => onInspectFrame(frame)}
                    />
                  </div>
                </div>
              </div>
            ) : isFinal ? (
              /* FRAME 10 — FINAL CTA & ENTERPRISE SHOWCASE */
              <div className="flex flex-col items-center text-center max-w-4xl w-full pointer-events-auto space-y-3 pt-6 pb-14">
                <div className="w-full max-w-[280px] sm:max-w-[320px]">
                  <Proper3DFrameVisual
                    image={frame.image}
                    frameIndex={idx}
                    frameId={frame.id}
                    opacity={opacity}
                    onInspect={() => onInspectFrame(frame)}
                  />
                </div>

                {frame.text.badge && (
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border bg-sky-50 border-sky-200 text-sky-800 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                    <span>{frame.text.badge}</span>
                  </div>
                )}

                <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
                  {frame.text.headline}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                  {frame.text.description}
                </p>

                <div className="pt-1 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={onOpenContact}
                    className="px-7 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/25 border border-sky-500 transition-all duration-300 hover:scale-105 font-bold"
                  >
                    Start a Conversation
                  </button>
                  <button
                    onClick={() => onNavigateToFrame(5)}
                    className="px-7 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all duration-300"
                  >
                    Explore Robotic Tech
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200/80 w-full max-w-2xl flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-[10px] text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>FDA 510(k) Ready</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>ISO 13485 Certified</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>CE Medical Mark</span>
                  </div>
                </div>
              </div>
            ) : (
              /* FRAMES 01-08 — HEROIC 3D SUBJECT SPLIT LAYOUT */
              <div
                className={`flex flex-col lg:flex-row items-center justify-between w-full gap-6 sm:gap-10 pointer-events-auto ${
                  isRight ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text Content Column */}
                <div className="max-w-xl space-y-3 sm:space-y-4 text-left">
                  {frame.text.badge && (
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border bg-sky-50 border-sky-200 text-sky-800 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                      <span>{frame.text.badge}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
                    {frame.text.headline}
                  </h2>

                  {frame.text.subheadline && (
                    <p className="text-sm sm:text-base font-semibold text-sky-700 leading-snug">
                      {frame.text.subheadline}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                    {frame.text.description}
                  </p>

                  {frame.text.metrics && frame.text.metrics.length > 0 && (
                    <div className="pt-1 grid grid-cols-2 gap-2.5">
                      {frame.text.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="rounded-xl bg-white/95 p-3 border border-slate-200 shadow-sm"
                        >
                          <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
                            {m.label}
                          </div>
                          <div className="text-base sm:text-lg font-bold font-mono text-sky-700">
                            {m.value}
                          </div>
                          {m.sublabel && (
                            <div className="text-[10px] text-teal-600 font-medium">
                              {m.sublabel}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-3">
                    {frame.text.primaryCta && (
                      <button
                        onClick={() => {
                          if (frame.text.primaryCta?.action === 'scroll-next') {
                            onNavigateToFrame(idx + 1);
                          } else if (frame.text.primaryCta?.action === 'open-contact') {
                            onOpenContact();
                          }
                        }}
                        className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 border border-sky-500 transition-all duration-300 hover:scale-105 font-bold"
                      >
                        {frame.text.primaryCta.label}
                      </button>
                    )}

                    <button
                      onClick={() => onInspectFrame(frame)}
                      className="px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all duration-300 flex items-center space-x-1.5"
                    >
                      <svg className="h-3.5 w-3.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <span>Inspect 3D Model</span>
                    </button>
                  </div>
                </div>

                {/* Heroic Proper 3D Visual Stage Column */}
                <div className="flex items-center justify-center">
                  <Proper3DFrameVisual
                    image={frame.image}
                    frameIndex={idx}
                    frameId={frame.id}
                    opacity={opacity}
                    onInspect={() => onInspectFrame(frame)}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
};
