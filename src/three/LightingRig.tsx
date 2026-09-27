import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LightingAnimator } from './animations/lightingAnimations';

interface LightingRigProps {
  scrollProgress: number;
}

export const LightingRig: React.FC<LightingRigProps> = ({ scrollProgress }) => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  useFrame((_, delta) => {
    const state = LightingAnimator.getLightingStateAtProgress(scrollProgress);
    const damp = Math.min(1, delta * 3.5);

    if (keyLightRef.current) {
      keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, state.keyIntensity, damp);
      keyLightRef.current.color.set(state.keyColor);
    }
    if (fillLightRef.current) {
      fillLightRef.current.intensity = THREE.MathUtils.lerp(fillLightRef.current.intensity, state.fillIntensity, damp);
    }
    if (rimLightRef.current) {
      rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, state.rimIntensity, damp);
    }
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, state.ambientIntensity, damp);
      ambientLightRef.current.color.set(state.ambientColor);
    }
  });

  return (
    <>
      {/* Ambient Fill Light */}
      <ambientLight ref={ambientLightRef} intensity={0.6} color="#0a192f" />

      {/* Key Studio Light */}
      <directionalLight
        ref={keyLightRef}
        position={[6, 8, 6]}
        intensity={2.2}
        color="#38bdf8"
        castShadow={false}
      />

      {/* Fill Light (Soft cool contrast) */}
      <directionalLight
        ref={fillLightRef}
        position={[-6, 2, -4]}
        intensity={1.0}
        color="#0284c7"
      />

      {/* Rim Light (Edge definition) */}
      <directionalLight
        ref={rimLightRef}
        position={[0, -5, -6]}
        intensity={1.8}
        color="#2dd4bf"
      />
    </>
  );
};
