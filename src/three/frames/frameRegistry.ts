import { HEALTHCARE_FRAMES } from './healthcareFrames';
import { Healthcare3DFrame } from './frameTypes';

export class FrameRegistry {
  private static frames: Healthcare3DFrame[] = HEALTHCARE_FRAMES;

  public static getAllFrames(): Healthcare3DFrame[] {
    return this.frames;
  }

  public static getFrameById(id: string): Healthcare3DFrame | undefined {
    return this.frames.find(frame => frame.id === id);
  }

  public static getFrameByIndex(index: number): Healthcare3DFrame | undefined {
    return this.frames[index];
  }

  public static getTotalFrames(): number {
    return this.frames.length;
  }

  /**
   * Given a global scroll progress (0.0 to 1.0), returns:
   * - current active frame
   * - next frame (if any)
   * - normalized transition progress between current and next (0.0 to 1.0)
   * - normalized progress inside the active frame (0.0 to 1.0)
   */
  public static getFrameAtProgress(progress: number): {
    currentFrame: Healthcare3DFrame;
    nextFrame: Healthcare3DFrame;
    transitionProgress: number;
    subProgress: number;
  } {
    const clampedProgress = Math.max(0, Math.min(0.999999, progress));
    const total = this.frames.length;

    let currentIndex = 0;
    for (let i = 0; i < total; i++) {
      if (clampedProgress >= this.frames[i].startProgress && clampedProgress < this.frames[i].endProgress) {
        currentIndex = i;
        break;
      }
    }

    const currentFrame = this.frames[currentIndex];
    const nextIndex = Math.min(total - 1, currentIndex + 1);
    const nextFrame = this.frames[nextIndex];

    const frameSpan = currentFrame.endProgress - currentFrame.startProgress;
    const subProgress = frameSpan > 0 ? (clampedProgress - currentFrame.startProgress) / frameSpan : 0;

    // Transition progress: when in the last 25% of current frame, interpolate into next
    const transitionZone = 0.25;
    let transitionProgress = 0;
    if (subProgress > 1.0 - transitionZone && currentIndex < total - 1) {
      transitionProgress = (subProgress - (1.0 - transitionZone)) / transitionZone;
    }

    return {
      currentFrame,
      nextFrame,
      transitionProgress,
      subProgress,
    };
  }

  /**
   * Helper to linearly interpolate between two numbers or vectors
   */
  public static lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
  }

  public static lerpVector3(
    start: [number, number, number],
    end: [number, number, number],
    factor: number
  ): [number, number, number] {
    return [
      this.lerp(start[0], end[0], factor),
      this.lerp(start[1], end[1], factor),
      this.lerp(start[2], end[2], factor),
    ];
  }
}
