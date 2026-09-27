import React, { useState } from 'react';
import { HEALTHCARE_FRAMES } from '../../three/frames/healthcareFrames';
import { CameraAnimator } from '../../three/animations/cameraAnimations';

interface FrameDebugHUDProps {
  scrollProgress: number;
  currentFrameIndex: number;
  onNavigateToFrame: (index: number) => void;
}

export const FrameDebugHUD: React.FC<FrameDebugHUDProps> = ({
  scrollProgress,
  currentFrameIndex,
  onNavigateToFrame,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentFrame = HEALTHCARE_FRAMES[currentFrameIndex];
  const camState = CameraAnimator.getCameraStateAtProgress(scrollProgress);

  return (
    <div className="fixed bottom-4 left-4 z-40 font-mono text-[11px] pointer-events-auto">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md bg-white/90 px-3 py-1.5 text-sky-700 border border-slate-300 backdrop-blur-md hover:bg-slate-50 transition-colors shadow-sm font-semibold"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>3D HUD DEBUG</span>
        <span className="text-[10px] text-slate-500">[{isOpen ? 'HIDE' : 'SHOW'}]</span>
      </button>

      {/* Expanded HUD Panel */}
      {isOpen && (
        <div className="mt-2 w-72 rounded-lg bg-white/95 p-4 border border-slate-300 backdrop-blur-xl shadow-xl text-slate-800 space-y-2.5">
          <div className="flex justify-between border-b border-slate-200 pb-1">
            <span className="text-slate-500">CURRENT FRAME:</span>
            <span className="font-bold text-sky-700">
              #{currentFrameIndex + 1} {currentFrame?.id.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">SCROLL PROGRESS:</span>
            <span className="font-bold text-teal-600">{(scrollProgress * 100).toFixed(1)}%</span>
          </div>

          <div className="space-y-0.5 text-[10px] text-slate-600">
            <div>
              <span className="text-slate-400">CAM POS:</span> [
              {camState.position.map((v) => v.toFixed(2)).join(', ')}]
            </div>
            <div>
              <span className="text-slate-400">CAM TARGET:</span> [
              {camState.target.map((v) => v.toFixed(2)).join(', ')}]
            </div>
            <div>
              <span className="text-slate-400">FOV:</span> {camState.fov.toFixed(1)}°
            </div>
          </div>

          {/* Frame Navigation Controls */}
          <div className="pt-2 border-t border-slate-200">
            <div className="text-[9px] uppercase tracking-wider text-slate-500 mb-1 font-semibold">
              Direct Frame Jump:
            </div>
            <div className="grid grid-cols-5 gap-1">
              {HEALTHCARE_FRAMES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigateToFrame(idx)}
                  className={`py-1 text-center rounded border transition-colors ${
                    idx === currentFrameIndex
                      ? 'bg-sky-600 text-white border-sky-600 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  F{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-1 text-[10px]">
            <button
              onClick={() => onNavigateToFrame(Math.max(0, currentFrameIndex - 1))}
              disabled={currentFrameIndex === 0}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded disabled:opacity-40 hover:bg-slate-100 text-slate-700 font-medium"
            >
              Prev Frame
            </button>
            <button
              onClick={() =>
                onNavigateToFrame(Math.min(HEALTHCARE_FRAMES.length - 1, currentFrameIndex + 1))
              }
              disabled={currentFrameIndex === HEALTHCARE_FRAMES.length - 1}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded disabled:opacity-40 hover:bg-slate-100 text-slate-700 font-medium"
            >
              Next Frame
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
