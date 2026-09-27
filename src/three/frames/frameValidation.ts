import { Healthcare3DFrame, FrameValidationResult } from './frameTypes';
import { HEALTHCARE_FRAMES } from './healthcareFrames';

export class FrameValidator {
  /**
   * Validates all frames in the system against production quality constraints.
   */
  public static validateAllFrames(): { [frameId: string]: FrameValidationResult } {
    const results: { [frameId: string]: FrameValidationResult } = {};
    const seenIds = new Set<string>();

    for (let i = 0; i < HEALTHCARE_FRAMES.length; i++) {
      const frame = HEALTHCARE_FRAMES[i];
      const prevFrame = i > 0 ? HEALTHCARE_FRAMES[i - 1] : null;
      results[frame.id] = this.validateFrame(frame, prevFrame, seenIds);
      seenIds.add(frame.id);
    }

    return results;
  }

  public static validateFrame(
    frame: Healthcare3DFrame,
    prevFrame: Healthcare3DFrame | null,
    seenIds: Set<string>
  ): FrameValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Unique ID
    if (!frame.id || frame.id.trim() === '') {
      errors.push(`Frame has missing or empty id`);
    } else if (seenIds.has(frame.id)) {
      errors.push(`Duplicate frame ID detected: ${frame.id}`);
    }

    // 2. Start & End Progress
    if (frame.startProgress < 0 || frame.startProgress > 1) {
      errors.push(`Invalid startProgress ${frame.startProgress}; must be within [0, 1]`);
    }
    if (frame.endProgress <= frame.startProgress || frame.endProgress > 1.0001) {
      errors.push(`Invalid endProgress ${frame.endProgress}; must be > startProgress (${frame.startProgress})`);
    }
    if (prevFrame && Math.abs(prevFrame.endProgress - frame.startProgress) > 0.001) {
      errors.push(`Progress gap or overlap between '${prevFrame.id}' (end ${prevFrame.endProgress}) and '${frame.id}' (start ${frame.startProgress})`);
    }

    // 3. Camera Position & Target Validity
    if (!frame.camera || !Array.isArray(frame.camera.position) || frame.camera.position.length !== 3) {
      errors.push(`Invalid camera position array in frame ${frame.id}`);
    } else {
      const [cx, cy, cz] = frame.camera.position;
      if (isNaN(cx) || isNaN(cy) || isNaN(cz)) {
        errors.push(`NaN detected in camera position for ${frame.id}`);
      }
      const distFromOrigin = Math.sqrt(cx * cx + cy * cy + cz * cz);
      if (distFromOrigin < 1.0) {
        warnings.push(`Camera position is very close to origin (${distFromOrigin.toFixed(2)} units), potential clipping risk`);
      }
      if (distFromOrigin > 30.0) {
        warnings.push(`Camera position is very far (${distFromOrigin.toFixed(2)} units), may exceed view frustum`);
      }
    }

    if (!frame.camera || !Array.isArray(frame.camera.target) || frame.camera.target.length !== 3) {
      errors.push(`Invalid camera target array in frame ${frame.id}`);
    }

    if (frame.camera && (frame.camera.fov < 20 || frame.camera.fov > 90)) {
      warnings.push(`Extreme FOV (${frame.camera.fov}) in frame ${frame.id}; recommended 35-60 for natural perspective`);
    }

    // 4. Object Configurations
    if (!frame.objects || frame.objects.length === 0) {
      errors.push(`Frame ${frame.id} has no defined 3D objects; canvas would be empty`);
    } else {
      frame.objects.forEach((obj, idx) => {
        if (!obj.id) errors.push(`Object at index ${idx} in frame ${frame.id} has no ID`);
        if (!obj.scale || obj.scale.some(s => s <= 0)) {
          errors.push(`Object ${obj.id} in frame ${frame.id} has invalid or zero scale`);
        }
      });
    }

    // 5. Lighting Configured
    if (!frame.lighting) {
      errors.push(`Lighting configuration is missing in frame ${frame.id}`);
    } else {
      if (frame.lighting.key <= 0) warnings.push(`Key light is zero or negative in frame ${frame.id}`);
      if (frame.lighting.fill < 0) warnings.push(`Fill light is negative in frame ${frame.id}`);
    }

    // 6. Text & UI
    if (!frame.text) {
      errors.push(`Text configuration missing in frame ${frame.id}`);
    } else {
      if (!frame.text.headline || frame.text.headline.trim() === '') {
        errors.push(`Headline is missing in frame ${frame.id}`);
      }
      if (!frame.text.description || frame.text.description.trim() === '') {
        warnings.push(`Description is missing in frame ${frame.id}`);
      }
    }

    // 7. Transition jump check
    if (prevFrame) {
      const [px, py, pz] = prevFrame.camera.position;
      const [cx, cy, cz] = frame.camera.position;
      const cameraDelta = Math.sqrt((cx - px) ** 2 + (cy - py) ** 2 + (cz - pz) ** 2);
      if (cameraDelta > 15.0) {
        warnings.push(`Large camera displacement (${cameraDelta.toFixed(1)} units) between '${prevFrame.id}' and '${frame.id}'`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  public static isSystemHealthy(): boolean {
    const report = this.validateAllFrames();
    const hasErrors = Object.values(report).some(r => !r.valid);
    return !hasErrors;
  }
}
