import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BrainSceneProps {
  opacity: number;
  subProgress: number;
}

export const BrainScene: React.FC<BrainSceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftHemiRef = useRef<THREE.Group>(null);
  const rightHemiRef = useRef<THREE.Group>(null);
  const synapsePointsRef = useRef<THREE.Points>(null);

  // Generate neural network nodes
  const nodeCount = 160;
  const { nodePositions, connections, pointsGeometry, lineGeometry } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const connIndices: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const isRight = i % 2 === 0;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(Math.random() * 2 - 1);
      const r = 0.85 + Math.random() * 0.25;

      const x = (r * Math.sin(theta) * Math.cos(phi)) * 0.8 + (isRight ? 0.45 : -0.45);
      const y = (r * Math.sin(theta) * Math.sin(phi)) * 0.9 + 0.1;
      const z = (r * Math.cos(theta)) * 1.15;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.6) {
          connIndices.push(i, j);
        }
      }
    }

    const lines = new Float32Array(connIndices.length * 3);
    for (let k = 0; k < connIndices.length; k++) {
      const idx = connIndices[k];
      lines[k * 3] = positions[idx * 3];
      lines[k * 3 + 1] = positions[idx * 3 + 1];
      lines[k * 3 + 2] = positions[idx * 3 + 2];
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const lGeom = new THREE.BufferGeometry();
    lGeom.setAttribute('position', new THREE.BufferAttribute(lines, 3));

    return {
      nodePositions: positions,
      connections: connIndices,
      pointsGeometry: pGeom,
      lineGeometry: lGeom,
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow neural scan rotation
    groupRef.current.rotation.y = 0.4 + Math.sin(state.clock.elapsedTime * 0.35) * 0.25;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

    // Firing synapses shimmer
    if (synapsePointsRef.current) {
      const material = synapsePointsRef.current.material as THREE.PointsMaterial;
      material.size = 0.08 + Math.sin(state.clock.elapsedTime * 8) * 0.03;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[1.5, 0, 0]} visible={opacity > 0.01}>
      {/* Left Hemisphere Organic Shell */}
      <group ref={leftHemiRef} position={[-0.45, 0, 0]}>
        <mesh scale={[0.85, 0.95, 1.2]}>
          <sphereGeometry args={[0.9, 20, 20]} />
          <meshPhysicalMaterial
            color="#0ea5e9"
            emissive="#0369a1"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.1}
            transmission={0.6}
            thickness={1.0}
            transparent
            opacity={opacity * 0.85}
            wireframe={false}
          />
        </mesh>
      </group>

      {/* Right Hemisphere Organic Shell */}
      <group ref={rightHemiRef} position={[0.45, 0, 0]}>
        <mesh scale={[0.85, 0.95, 1.2]}>
          <sphereGeometry args={[0.9, 20, 20]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.1}
            transmission={0.6}
            thickness={1.0}
            transparent
            opacity={opacity * 0.85}
            wireframe={false}
          />
        </mesh>
      </group>

      {/* Synaptic Nodes */}
      <points ref={synapsePointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.08}
          color="#67e8f9"
          transparent
          opacity={opacity * 0.95}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Neural Axon Connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={opacity * 0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Brain Stem & Cerebellum Foundation */}
      <mesh position={[0, -0.9, -0.3]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.15, 0.8, 16]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#0369a1"
          emissiveIntensity={0.3}
          roughness={0.4}
          transparent
          opacity={opacity * 0.8}
        />
      </mesh>
    </group>
  );
};
