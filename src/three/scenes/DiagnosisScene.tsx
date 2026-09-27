import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DiagnosisSceneProps {
  opacity: number;
  subProgress: number; // 0.0 to 1.0 within frame
}

export const DiagnosisScene: React.FC<DiagnosisSceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const scanPlaneRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const anomalyRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Scan plane vertical sweep modulated by subProgress and time
    if (scanPlaneRef.current) {
      const sweepY = Math.sin(state.clock.elapsedTime * 2.5) * 1.4;
      scanPlaneRef.current.position.y = sweepY;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }

    if (anomalyRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.15;
      anomalyRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[1.4, 0, 0]} visible={opacity > 0.01}>
      {/* Tomography Gantry Outer Ring */}
      <mesh ref={ringRef} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.4, 0.06, 16, 80]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.8}
          roughness={0.2}
          transparent
          opacity={opacity * 0.85}
        />
      </mesh>

      {/* Volumetric Layered CT / MRI Slices */}
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 1.2 - i * 0.3;
        const sliceRadius = 1.0 + Math.sin((i / 8) * Math.PI) * 0.3;
        return (
          <group key={`ct-slice-${i}`} position={[0, y, 0]}>
            {/* Slice boundary contour */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[sliceRadius - 0.04, sliceRadius, 36]} />
              <meshBasicMaterial
                color="#22d3ee"
                transparent
                opacity={opacity * (0.2 + (i % 2 === 0 ? 0.2 : 0.1))}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Internal organ cross-section slice fill */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[sliceRadius - 0.05, 24]} />
              <meshBasicMaterial
                color="#0e7490"
                transparent
                opacity={opacity * 0.08}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* Laser Scanning Plane with glowing cyan light sheet */}
      <group ref={scanPlaneRef} position={[0, 0, 0]}>
        {/* Horizontal Laser Grid Disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.8, 2.8]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={opacity * 0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Intense Laser Edge Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.35, 1.4, 48]} />
          <meshBasicMaterial
            color="#67e8f9"
            transparent
            opacity={opacity * 0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Anomaly Detection Reticle & Bounding Box */}
      <group ref={anomalyRef} position={[0.3, 0.2, 0.2]}>
        <mesh>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial
            color="#f59e0b"
            wireframe
            transparent
            opacity={opacity * 0.85}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d97706"
            emissiveIntensity={1.5}
            transparent
            opacity={opacity * 0.9}
          />
        </mesh>
      </group>

      {/* Spatial Scanning Grid Plane */}
      <gridHelper args={[4, 16, '#06b6d4', '#0f172a']} position={[0, -1.8, 0]} />
    </group>
  );
};
