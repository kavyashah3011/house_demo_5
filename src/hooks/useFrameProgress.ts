import { useMemo } from 'react';
import { FrameRegistry } from '../three/frames/frameRegistry';
import { Healthcare3DFrame } from '../three/frames/frameTypes';

export interface FrameProgressResult {
  currentFrame: Healthcare3DFrame;
  nextFrame: Healthcare3DFrame;
  subProgress: number; // 0.0 to 1.0 within active frame
  transitionProgress: number; // 0.0 to 1.0 during inter-frame transition
  isTransitioning: boolean;
  frameIndex: number;
}

export function useFrameProgress(globalProgress: number): FrameProgressResult {
  return useMemo(() => {
    const data = FrameRegistry.getFrameAtProgress(globalProgress);
    return {
      currentFrame: data.currentFrame,
      nextFrame: data.nextFrame,
      subProgress: data.subProgress,
      transitionProgress: data.transitionProgress,
      isTransitioning: data.transitionProgress > 0,
      frameIndex: data.currentFrame.index,
    };
  }, [globalProgress]);
}
