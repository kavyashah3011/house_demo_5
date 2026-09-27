import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraController } from './CameraController';
import { LightingRig } from './LightingRig';
import { BioParticles } from './scenes/BioParticles';
import { ClinicalAmbientField } from './scenes/ClinicalAmbientField';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface HealthcareCanvasProps {
  scrollProgress: number;
}

export const HealthcareCanvas: React.FC<HealthcareCanvasProps> = ({ scrollProgress }) => {
  const { isMobile } = useMediaQuery();
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-slate-50 p-6 text-center">
        <div className="max-w-md rounded-2xl border border-sky-200 bg-white/90 p-8 backdrop-blur-xl shadow-lg">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-sky-50 p-3 text-sky-600">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900">WebGL Telemetry Active</h2>
          <p className="mt-2 text-sm text-slate-600">
            Displaying high-fidelity static clinical telemetry fallback.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        className="pointer-events-auto"
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} />
          <LightingRig scrollProgress={scrollProgress} />
          <BioParticles />
          <ClinicalAmbientField scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
