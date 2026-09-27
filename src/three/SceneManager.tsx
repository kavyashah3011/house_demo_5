import React from 'react';
import { HeroScene } from './scenes/HeroScene';
import { HumanHealthScene } from './scenes/HumanHealthScene';
import { HeartScene } from './scenes/HeartScene';
import { BrainScene } from './scenes/BrainScene';
import { DiagnosisScene } from './scenes/DiagnosisScene';
import { TechnologyScene } from './scenes/TechnologyScene';
import { TreatmentScene } from './scenes/TreatmentScene';
import { DataScene } from './scenes/DataScene';
import { PatientJourneyScene } from './scenes/PatientJourneyScene';
import { FinalScene } from './scenes/FinalScene';
import { HEALTHCARE_FRAMES } from './frames/healthcareFrames';

interface SceneManagerProps {
  scrollProgress: number;
}

export const SceneManager: React.FC<SceneManagerProps> = ({ scrollProgress }) => {
  // Helper to compute scene opacity with smooth cross-fade blend window
  const getSceneOpacity = (frameIndex: number): { opacity: number; subProgress: number } => {
    const frame = HEALTHCARE_FRAMES[frameIndex];
    const prevFrame = frameIndex > 0 ? HEALTHCARE_FRAMES[frameIndex - 1] : null;
    const nextFrame = frameIndex < HEALTHCARE_FRAMES.length - 1 ? HEALTHCARE_FRAMES[frameIndex + 1] : null;

    const span = frame.endProgress - frame.startProgress;
    const subProgress = Math.max(0, Math.min(1, (scrollProgress - frame.startProgress) / (span || 1)));

    // Transition cross-fade buffer (e.g., 0.02 progress units)
    const fadeBuffer = 0.02;

    let opacity = 0;

    // Inside frame core active region
    if (scrollProgress >= frame.startProgress && scrollProgress <= frame.endProgress) {
      // Fade in from start if not frame 0
      if (frameIndex > 0 && scrollProgress < frame.startProgress + fadeBuffer) {
        opacity = (scrollProgress - frame.startProgress) / fadeBuffer;
      }
      // Fade out towards end if not last frame
      else if (frameIndex < HEALTHCARE_FRAMES.length - 1 && scrollProgress > frame.endProgress - fadeBuffer) {
        opacity = (frame.endProgress - scrollProgress) / fadeBuffer;
      } else {
        opacity = 1.0;
      }
    }
    // Blend from previous frame
    else if (prevFrame && scrollProgress >= prevFrame.endProgress - fadeBuffer && scrollProgress < frame.startProgress) {
      opacity = (scrollProgress - (prevFrame.endProgress - fadeBuffer)) / fadeBuffer;
    }
    // Blend to next frame
    else if (nextFrame && scrollProgress > frame.endProgress && scrollProgress <= frame.endProgress + fadeBuffer) {
      opacity = 1.0 - (scrollProgress - frame.endProgress) / fadeBuffer;
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      subProgress,
    };
  };

  const f0 = getSceneOpacity(0);
  const f1 = getSceneOpacity(1);
  const f2 = getSceneOpacity(2);
  const f3 = getSceneOpacity(3);
  const f4 = getSceneOpacity(4);
  const f5 = getSceneOpacity(5);
  const f6 = getSceneOpacity(6);
  const f7 = getSceneOpacity(7);
  const f8 = getSceneOpacity(8);
  const f9 = getSceneOpacity(9);

  return (
    <group>
      <HeroScene opacity={f0.opacity} subProgress={f0.subProgress} />
      <HumanHealthScene opacity={f1.opacity} subProgress={f1.subProgress} />
      <HeartScene opacity={f2.opacity} subProgress={f2.subProgress} />
      <BrainScene opacity={f3.opacity} subProgress={f3.subProgress} />
      <DiagnosisScene opacity={f4.opacity} subProgress={f4.subProgress} />
      <TechnologyScene opacity={f5.opacity} subProgress={f5.subProgress} />
      <TreatmentScene opacity={f6.opacity} subProgress={f6.subProgress} />
      <DataScene opacity={f7.opacity} subProgress={f7.subProgress} />
      <PatientJourneyScene opacity={f8.opacity} subProgress={f8.subProgress} />
      <FinalScene opacity={f9.opacity} subProgress={f9.subProgress} />
    </group>
  );
};
