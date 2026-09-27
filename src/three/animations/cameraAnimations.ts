import * as THREE from 'three';
import { FrameRegistry } from '../frames/frameRegistry';

export interface InterpolatedCameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export class CameraAnimator {
  private static tempVecStart = new THREE.Vector3();
  private static tempVecEnd = new THREE.Vector3();

  /**
   * Smoothly interpolates camera position, target lookAt, and FOV
   * based on global master scroll progress (0.0 to 1.0).
   */
  public static getCameraStateAtProgress(progress: number): InterpolatedCameraState {
    const { currentFrame, nextFrame, transitionProgress } = FrameRegistry.getFrameAtProgress(progress);

    // Apply cubic smoothstep or ease-in-out curve to transition progress
    const easeT = this.easeInOutCubic(transitionProgress);

    const pos = FrameRegistry.lerpVector3(currentFrame.camera.position, nextFrame.camera.position, easeT);
    const target = FrameRegistry.lerpVector3(currentFrame.camera.target, nextFrame.camera.target, easeT);
    const fov = FrameRegistry.lerp(currentFrame.camera.fov, nextFrame.camera.fov, easeT);

    return {
      position: pos,
      target: target,
      fov: fov,
    };
  }

  private static easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
}
