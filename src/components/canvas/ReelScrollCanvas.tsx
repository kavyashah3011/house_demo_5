import React, { useEffect, useRef, useState, useCallback } from 'react';

export type CanvasDisplayMode = 'fullscreen' | 'studio';

interface ReelScrollCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  displayMode: CanvasDisplayMode;
  onFrameUpdate?: (frameIndex: number, totalFrames: number) => void;
  className?: string;
}

const TOTAL_FRAMES = 240;

export const ReelScrollCanvas: React.FC<ReelScrollCanvasProps> = ({
  scrollProgress,
  displayMode,
  onFrameUpdate,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedSetRef = useRef<Set<number>>(new Set());
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [initialFrameReady, setInitialFrameReady] = useState(false);

  // Smooth lerp state
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  // Update target progress when prop changes
  useEffect(() => {
    targetProgressRef.current = Math.max(0, Math.min(1, scrollProgress));
  }, [scrollProgress]);

  // Frame URL generator (frame_001.jpg to frame_240.jpg)
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/assets/frames/frame_${frameNum}.jpg`;
  }, []);

  // Progressive image preloading
  useEffect(() => {
    let isCancelled = false;

    // Load a single frame
    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[index]) {
          resolve(imagesRef.current[index]!);
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[index] = img;
          loadedSetRef.current.add(index);
          setLoadedCount(loadedSetRef.current.size);
          if (index === 0) setInitialFrameReady(true);
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    // Priority 1: First 5 frames for instant landing view
    const initialBatch = [0, 1, 2, 3, 4];
    initialBatch.forEach(loadFrame);

    // Priority 2: Key milestones every 6 frames across entire duration
    const milestoneIndices: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += 6) {
      if (!initialBatch.includes(i)) milestoneIndices.push(i);
    }

    // Load milestones sequentially in batches of 6
    const loadMilestones = async () => {
      for (let i = 0; i < milestoneIndices.length; i += 6) {
        if (isCancelled) return;
        const batch = milestoneIndices.slice(i, i + 6);
        await Promise.allSettled(batch.map(loadFrame));
      }

      // Priority 3: Fill in remaining frames
      const remaining: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!loadedSetRef.current.has(i)) remaining.push(i);
      }

      for (let i = 0; i < remaining.length; i += 8) {
        if (isCancelled) return;
        const batch = remaining.slice(i, i + 8);
        await Promise.allSettled(batch.map(loadFrame));
      }
    };

    loadMilestones();

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl]);

  // Helper to find the nearest loaded frame if current isn't ready
  const getNearestLoadedFrame = (targetIndex: number): HTMLImageElement | null => {
    if (imagesRef.current[targetIndex]) {
      return imagesRef.current[targetIndex];
    }

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && imagesRef.current[prev]) {
        return imagesRef.current[prev];
      }
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && imagesRef.current[next]) {
        return imagesRef.current[next];
      }
    }
    return null;
  };

  // Canvas drawing routine
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = getNearestLoadedFrame(frameIndex);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    if (displayMode === 'studio') {
      // STUDIO / REEL VIEW: Full MacBook Pro in Architectural Studio
      // 1. Dark ambient obsidian background fill
      ctx.fillStyle = '#080C12';
      ctx.fillRect(0, 0, cw, ch);

      // 2. Draw blurred atmospheric backlight matching current scene
      ctx.save();
      ctx.filter = 'blur(50px) brightness(0.35)';
      ctx.drawImage(img, 0, 0, cw, ch);
      ctx.restore();

      // 3. Draw sharp centered MacBook (aspect ratio contain)
      const imgAspect = img.width / img.height; // 720 / 1280
      const canvasAspect = cw / ch;

      let drawW, drawH, drawX, drawY;
      if (canvasAspect > imgAspect) {
        drawH = ch;
        drawW = ch * imgAspect;
        drawX = (cw - drawW) / 2;
        drawY = 0;
      } else {
        drawW = cw;
        drawH = cw / imgAspect;
        drawX = 0;
        drawY = (ch - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // 4. Inpaint / Mask out the "Wait till end" social media sticker seamlessly
      // Sticker in original coordinates: x=240..480, y=65..128
      // Sample the wall above the sticker (y=25..55) and patch it over y=65..128
      const scaleX = drawW / img.width;
      const scaleY = drawH / img.height;
      const patchX = drawX + 235 * scaleX;
      const patchY = drawY + 62 * scaleY;
      const patchW = 250 * scaleX;
      const patchH = 68 * scaleY;

      // Draw clean ceiling patch
      ctx.drawImage(
        img,
        235, 20, 250, 40,
        patchX, patchY, patchW, patchH
      );

      // Subtle luxury vignette
      const gradient = ctx.createLinearGradient(0, ch - 100, 0, ch);
      gradient.addColorStop(0, 'rgba(8, 12, 18, 0)');
      gradient.addColorStop(1, 'rgba(8, 12, 18, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, ch - 100, cw, 100);

    } else {
      // FULLSCREEN / SCREEN CROP VIEW:
      // Focus directly on the website shown on the MacBook display
      // Original frame: 720x1280
      // Screen area coordinates:
      const sx = 10;
      const sy = 132;  // Begins cleanly under the notch/sticker
      const sw = 700;
      const sh = 562;  // Ends above keyboard

      const cropAspect = sw / sh; // ~1.24
      const canvasAspect = cw / ch;

      let drawW, drawH, drawX, drawY;
      if (canvasAspect > cropAspect) {
        drawW = cw;
        drawH = cw / cropAspect;
        drawX = 0;
        drawY = (ch - drawH) / 2;
      } else {
        drawH = ch;
        drawW = ch * cropAspect;
        drawX = (cw - drawW) / 2;
        drawY = 0;
      }

      ctx.fillStyle = '#080C12';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, drawX, drawY, drawW, drawH);

      // Subtle luxury cinematic grading & edge vignette
      const radialGrad = ctx.createRadialGradient(
        cw / 2, ch / 2, Math.min(cw, ch) * 0.45,
        cw / 2, ch / 2, Math.max(cw, ch) * 0.85
      );
      radialGrad.addColorStop(0, 'rgba(0,0,0,0)');
      radialGrad.addColorStop(1, 'rgba(8, 12, 18, 0.45)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, cw, ch);
    }

    lastRenderedFrameRef.current = frameIndex;
    if (onFrameUpdate) {
      onFrameUpdate(frameIndex, TOTAL_FRAMES);
    }
  }, [displayMode, onFrameUpdate]);

  // Handle high-DPI resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }

      if (lastRenderedFrameRef.current >= 0) {
        drawFrame(lastRenderedFrameRef.current);
      } else {
        drawFrame(0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Buttery 60 FPS Render loop with inertial physics
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const delta = targetProgressRef.current - currentProgressRef.current;
      
      if (Math.abs(delta) > 0.0004) {
        currentProgressRef.current += delta * 0.38;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastRenderedFrameRef.current || !initialFrameReady) {
        drawFrame(frameIndex);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    animationFrameIdRef.current = animId;

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [drawFrame, initialFrameReady]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
      />

      {/* Frame Loading HUD Pill */}
      {loadPercent < 100 && (
        <div className="absolute top-24 left-6 z-30 flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-black/75 border border-gold-500/30 backdrop-blur-md text-[11px] font-mono text-gold-300 pointer-events-none transition-opacity duration-500 shadow-xl">
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          <span>Syncing 240 Reel Frames: {loadPercent}%</span>
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden ml-1">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-amber-300 transition-all duration-300"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
