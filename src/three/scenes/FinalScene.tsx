import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

interface FinalSceneProps {
  opacity: number;
  subProgress: number; // 0.0 to 1.0 within frame
}

export const FinalScene: React.FC<FinalSceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 0.3;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.2;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
      haloRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 1.6, 0]} visible={opacity > 0.01} scale={[0.85, 0.85, 0.85]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={beaconRef}>
          {/* Luminous Central Healthcare Cross Emblem */}
          {/* Vertical Arm */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.34, 1.5, 0.34]} />
            <meshPhysicalMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.2}
              transmission={0.5}
              transparent
              opacity={opacity}
            />
          </mesh>

          {/* Horizontal Arm */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.34, 0.34]} />
            <meshPhysicalMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.2}
              transmission={0.5}
              transparent
              opacity={opacity}
            />
          </mesh>

          {/* Core Energy Diamond Jewel */}
          <mesh position={[0, 0, 0]}>
            <octahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#38bdf8"
              emissiveIntensity={2.0}
              transparent
              opacity={opacity}
            />
          </mesh>
        </group>

        {/* Radiant Concentric Halo Rings */}
        <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.3, 1.36, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={opacity * 0.75}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <ringGeometry args={[1.6, 1.65, 64]} />
          <meshBasicMaterial
            color="#2dd4bf"
            transparent
            opacity={opacity * 0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
};
