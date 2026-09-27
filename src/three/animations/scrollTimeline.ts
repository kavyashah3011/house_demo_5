import { HEALTHCARE_FRAMES } from '../frames/healthcareFrames';

export class ScrollTimelineHelper {
  /**
   * Calculates the exact scroll Y position for a given frame index.
   */
  public static getScrollYForFrame(frameIndex: number, totalHeight: number): number {
    const frame = HEALTHCARE_FRAMES[frameIndex];
    if (!frame) return 0;
    if (frameIndex === 0) return 0;
    if (frameIndex === HEALTHCARE_FRAMES.length - 1) return totalHeight - window.innerHeight;
    // Aim for the middle of the frame's progress window
    const targetProgress = (frame.startProgress + frame.endProgress) / 2;
    return targetProgress * (totalHeight - window.innerHeight);
  }

  /**
   * Smoothly scrolls to the target frame index using window.scrollTo or Lenis.
   */
  public static scrollToFrame(frameIndex: number, lenisInstance?: any) {
    const totalHeight = document.documentElement.scrollHeight;
    const targetY = this.getScrollYForFrame(frameIndex, totalHeight);

    if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
      lenisInstance.scrollTo(targetY, { duration: 1.4 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  }
}
