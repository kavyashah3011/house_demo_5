import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeartSceneProps {
  opacity: number;
  subProgress: number;
}

export const HeartScene: React.FC<HeartSceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const heartBodyRef = useRef<THREE.Group>(null);
  const flowParticlesRef = useRef<THREE.Points>(null);

  // Generate blood flow trajectory particles
  const particleCount = 180;
  const { particlePositions, particleGeometry } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const r = 0.5 + (Math.random() - 0.5) * 0.3;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { particlePositions: pos, particleGeometry: geom };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow cinematic inspection angle
    groupRef.current.rotation.y = -0.3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    groupRef.current.rotation.x = 0.1 + Math.cos(state.clock.elapsedTime * 0.25) * 0.05;

    // Biorhythmic heartbeat: Lub-Dub contraction sequence
    if (heartBodyRef.current) {
      const t = (state.clock.elapsedTime * 1.2) % 1; // 72 BPM
      let beat = 1;
      if (t < 0.12) {
        beat = 1 + Math.sin((t / 0.12) * Math.PI) * 0.08; // Systolic Lub
      } else if (t >= 0.18 && t < 0.32) {
        beat = 1 + Math.sin(((t - 0.18) / 0.14) * Math.PI) * 0.05; // Diastolic Dub
      }
      heartBodyRef.current.scale.set(beat, beat, beat);
    }

    // Circulation particles movement
    if (flowParticlesRef.current) {
      const positions = flowParticlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * 0.8;
        if (positions[i * 3 + 1] > 1.2) {
          positions[i * 3 + 1] = -1.2;
        }
      }
      flowParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[-1.5, 0, 0]} visible={opacity > 0.01}>
      {/* Heart Muscular Body */}
      <group ref={heartBodyRef}>
        {/* Left Ventricle Main Mass */}
        <mesh position={[-0.15, -0.2, 0]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.75, 1.4, 28]} />
          <meshPhysicalMaterial
            color="#e11d48"
            emissive="#881337"
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.1}
            clearcoat={0.6}
            transparent
            opacity={opacity * 0.95}
          />
        </mesh>

        {/* Right Ventricle Contoured Mass */}
        <mesh position={[0.25, -0.15, 0.1]} rotation={[0, 0, 0.2]}>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshPhysicalMaterial
            color="#be123c"
            emissive="#4c0519"
            emissiveIntensity={0.5}
            roughness={0.3}
            transparent
            opacity={opacity * 0.92}
          />
        </mesh>

        {/* Ascending Aorta Arch */}
        <mesh position={[0.05, 0.65, -0.05]} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.42, 0.16, 16, 36, Math.PI * 0.85]} />
          <meshPhysicalMaterial
            color="#f43f5e"
            emissive="#9f1239"
            emissiveIntensity={0.7}
            roughness={0.2}
            transparent
            opacity={opacity * 0.95}
          />
        </mesh>

        {/* Pulmonary Artery Bifurcation */}
        <mesh position={[-0.25, 0.45, 0.2]} rotation={[Math.PI / 4, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.14, 0.16, 0.6, 16]} />
          <meshPhysicalMaterial
            color="#0284c7"
            emissive="#0369a1"
            emissiveIntensity={0.6}
            roughness={0.25}
            transparent
            opacity={opacity * 0.9}
          />
        </mesh>

        {/* Superior Vena Cava */}
        <mesh position={[0.38, 0.55, -0.1]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.7, 16]} />
          <meshPhysicalMaterial
            color="#0284c7"
            emissive="#0369a1"
            emissiveIntensity={0.6}
            roughness={0.25}
            transparent
            opacity={opacity * 0.9}
          />
        </mesh>

        {/* Coronary Arteries (Superficial Mesh Network) */}
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 14;
          const y = 0.2 - t * 0.8;
          const x = Math.sin(t * 5) * 0.45 - 0.05;
          const z = Math.cos(t * 3) * 0.35 + 0.2;
          return (
            <mesh key={`coronary-${i}`} position={[x, y, z]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color="#fda4af" transparent opacity={opacity * 0.9} />
            </mesh>
          );
        })}
      </group>

      {/* Circulation Flow Stream Particles */}
      <points ref={flowParticlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.06}
          color="#fda4af"
          transparent
          opacity={opacity * 0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
