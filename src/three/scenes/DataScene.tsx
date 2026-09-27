import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataSceneProps {
  opacity: number;
  subProgress: number; // 0.0 to 1.0 within frame
}

export const DataScene: React.FC<DataSceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const matrixGridRef = useRef<THREE.Group>(null);
  const graphBarsRef = useRef<THREE.Group>(null);

  // Generate 3D bar graph heights
  const bars = useMemo(() => {
    const list = [];
    const rows = 5;
    const cols = 5;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const height = 0.4 + Math.sin(r * 0.8 + c * 0.6) * 0.35 + (r + c) * 0.1;
        list.push({
          id: `${r}-${c}`,
          x: (c - cols / 2 + 0.5) * 0.4,
          z: (r - rows / 2 + 0.5) * 0.4,
          height,
        });
      }
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow data environment rotation
    groupRef.current.rotation.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    groupRef.current.rotation.x = 0.25;

    // Pulse graph heights slightly
    if (graphBarsRef.current) {
      graphBarsRef.current.children.forEach((child, idx) => {
        const baseH = bars[idx]?.height || 0.5;
        const dynamicH = baseH * (1 + Math.sin(state.clock.elapsedTime * 2 + idx * 0.2) * 0.15);
        child.scale.y = dynamicH;
      });
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[-1.5, -0.2, 0]} visible={opacity > 0.01}>
      {/* 3D Neural Tensor Data Grid Floor */}
      <group ref={matrixGridRef} position={[0, -0.8, 0]}>
        <gridHelper args={[5, 20, '#38bdf8', '#0f172a']} />
      </group>

      {/* Dynamic 3D Volumetric Clinical Bar Graph */}
      <group ref={graphBarsRef} position={[0, -0.8, 0]}>
        {bars.map((bar) => (
          <mesh key={bar.id} position={[bar.x, bar.height / 2, bar.z]}>
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshPhysicalMaterial
              color="#0ea5e9"
              emissive="#0284c7"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.4}
              transparent
              opacity={opacity * 0.9}
            />
          </mesh>
        ))}
      </group>

      {/* Floating Concentric Neural Ring Indicators */}
      <mesh position={[0, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.015, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={opacity * 0.6} />
      </mesh>
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.012, 16, 64]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={opacity * 0.5} />
      </mesh>
    </group>
  );
};
