import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TechnologySceneProps {
  opacity: number;
  subProgress: number; // 0.0 to 1.0 within frame
}

export const TechnologyScene: React.FC<TechnologySceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const arm1Ref = useRef<THREE.Group>(null);
  const arm2Ref = useRef<THREE.Group>(null);
  const wristRef = useRef<THREE.Group>(null);
  const toolTipRef = useRef<THREE.Group>(null);

  // Exploded-view displacement calculation based on subProgress:
  // 0.0 - 0.2: Assembled
  // 0.2 - 0.5: Exploded Separation
  // 0.5 - 0.8: Orbit & Inspection
  // 0.8 - 1.0: Reassemble smoothly
  const explodeFactor = useMemo(() => {
    if (subProgress < 0.2) return 0;
    if (subProgress < 0.5) return (subProgress - 0.2) / 0.3;
    if (subProgress < 0.8) return 1.0;
    return 1.0 - (subProgress - 0.8) / 0.2;
  }, [subProgress]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Cinematic rotational orbit
    groupRef.current.rotation.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.3;

    // Subtle micro-articulation of joints
    if (arm1Ref.current) {
      arm1Ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
    if (wristRef.current) {
      wristRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 1.2) * 0.2;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[-1.6, 0, 0]} visible={opacity > 0.01}>
      {/* Base Console Foundation */}
      <group ref={baseRef} position={[0, -1.4 - explodeFactor * 0.4, 0]}>
        <mesh>
          <cylinderGeometry args={[0.9, 1.1, 0.4, 32]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 24]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>

      {/* Articulated Lower Arm Component */}
      <group ref={arm1Ref} position={[0, -0.6 - explodeFactor * 0.2, 0]}>
        <mesh rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshPhysicalMaterial
            color="#f8fafc"
            metalness={0.3}
            roughness={0.15}
            clearcoat={0.8}
            transparent
            opacity={opacity}
          />
        </mesh>
        {/* Joint Servo Ring */}
        <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.36, 24]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>

      {/* Articulated Upper Arm Component */}
      <group ref={arm2Ref} position={[0, 0.4 + explodeFactor * 0.3, 0]}>
        <mesh rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.25, 1.0, 0.25]} />
          <meshPhysicalMaterial
            color="#0ea5e9"
            emissive="#0369a1"
            emissiveIntensity={0.2}
            metalness={0.4}
            roughness={0.2}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>

      {/* 7-DOF Micro-Wrist Mechanism */}
      <group ref={wristRef} position={[0, 1.2 + explodeFactor * 0.7, 0]}>
        <mesh>
          <sphereGeometry args={[0.24, 20, 20]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.85}
            roughness={0.15}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>

      {/* Endoscopic Tool Tip & Optical Laser Guide */}
      <group ref={toolTipRef} position={[0, 1.7 + explodeFactor * 1.1, 0]}>
        {/* Titanium Micro-Shaft */}
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 16]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={opacity}
          />
        </mesh>
        {/* Optical Sensor Tip */}
        <mesh position={[0, 0.38, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={opacity} />
        </mesh>
        {/* Laser Targeting Guide Beam */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 1.0, 8]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={opacity * 0.75}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
};
