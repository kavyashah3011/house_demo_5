import { FrameRegistry } from '../frames/frameRegistry';

export interface InterpolatedLightingState {
  keyIntensity: number;
  fillIntensity: number;
  rimIntensity: number;
  ambientIntensity: number;
  ambientColor: string;
  keyColor: string;
}

export class LightingAnimator {
  public static getLightingStateAtProgress(progress: number): InterpolatedLightingState {
    const { currentFrame, nextFrame, transitionProgress } = FrameRegistry.getFrameAtProgress(progress);
    const t = transitionProgress;

    const key = FrameRegistry.lerp(currentFrame.lighting.key, nextFrame.lighting.key, t);
    const fill = FrameRegistry.lerp(currentFrame.lighting.fill, nextFrame.lighting.fill, t);
    const rim = FrameRegistry.lerp(currentFrame.lighting.rim, nextFrame.lighting.rim, t);
    const env = FrameRegistry.lerp(currentFrame.lighting.environment, nextFrame.lighting.environment, t);

    return {
      keyIntensity: key,
      fillIntensity: fill,
      rimIntensity: rim,
      ambientIntensity: env,
      ambientColor: currentFrame.lighting.ambientColor || '#0a192f',
      keyColor: currentFrame.lighting.keyColor || '#38bdf8',
    };
  }
}
