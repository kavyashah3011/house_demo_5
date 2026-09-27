import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TreatmentSceneProps {
  opacity: number;
  subProgress: number; // 0.0 to 1.0 within frame
}

export const TreatmentScene: React.FC<TreatmentSceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cellRef = useRef<THREE.Mesh>(null);
  const nanoRef = useRef<THREE.Group>(null);
  const bioFluidRef = useRef<THREE.Points>(null);

  // Generate receptor protein stalks on the cell surface
  const receptors = useMemo(() => {
    const list = [];
    for (let i = 0; i < 24; i++) {
      const phi = (i / 24) * Math.PI * 2;
      const theta = Math.acos((i % 7) / 3.5 - 1);
      const r = 1.35;
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      list.push({ id: i, pos: [x, y, z] as [number, number, number] });
    }
    return list;
  }, []);

  // Microscopic bio-fluid floating particles
  const fluidCount = 140;
  const { fluidPositions, fluidGeometry } = useMemo(() => {
    const pos = new Float32Array(fluidCount * 3);
    for (let i = 0; i < fluidCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5.0;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { fluidPositions: pos, fluidGeometry: geom };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Organic cell membrane breathing and fluid rotation
    if (cellRef.current) {
      cellRef.current.rotation.y += delta * 0.15;
      const wave = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.03;
      cellRef.current.scale.set(wave, wave, wave);
    }

    // Nanoparticles trajectory: approaching cell receptor based on subProgress & time
    if (nanoRef.current) {
      const approachDistance = THREE.MathUtils.lerp(3.0, 1.4, Math.min(1, subProgress * 1.3));
      nanoRef.current.position.set(-approachDistance * 0.7, approachDistance * 0.4, approachDistance * 0.5);
      nanoRef.current.rotation.x += delta * 0.8;
      nanoRef.current.rotation.y += delta * 1.1;
    }

    // Floating fluid drift
    if (bioFluidRef.current) {
      const positions = bioFluidRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < fluidCount; i++) {
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        positions[i * 3 + 1] += Math.cos(state.clock.elapsedTime + i) * 0.002;
      }
      bioFluidRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[1.4, 0, 0]} visible={opacity > 0.01}>
      {/* Cellular Biological Membrane (Soft Translucent Lipid Bilayer) */}
      <mesh ref={cellRef}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshPhysicalMaterial
          color="#0d9488"
          emissive="#115e59"
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.05}
          transmission={0.7}
          thickness={1.5}
          transparent
          opacity={opacity * 0.88}
        />
      </mesh>

      {/* Internal Cellular Nucleus Organelle */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 20, 20]} />
        <meshPhysicalMaterial
          color="#2dd4bf"
          emissive="#0f766e"
          emissiveIntensity={0.8}
          transparent
          opacity={opacity * 0.9}
        />
      </mesh>

      {/* Transmembrane Surface Receptor Proteins */}
      {receptors.map((rec) => (
        <group key={`rec-${rec.id}`} position={rec.pos}>
          {/* Stalk */}
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
            <meshStandardMaterial color="#5eead4" transparent opacity={opacity} />
          </mesh>
          {/* Receptor Head Pocket */}
          <mesh position={[0, 0.14, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
              color="#99f6e4"
              emissive="#14b8a6"
              emissiveIntensity={0.8}
              transparent
              opacity={opacity}
            />
          </mesh>
        </group>
      ))}

      {/* Targeted Lipid Nanoparticle Carrier delivering payload */}
      <group ref={nanoRef} position={[-2.2, 1.2, 1.5]}>
        {/* Synthetic Nanocapsule Shell */}
        <mesh>
          <dodecahedronGeometry args={[0.42, 1]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.0}
            metalness={0.2}
            roughness={0.15}
            transparent
            opacity={opacity * 0.95}
          />
        </mesh>
        {/* Internal Therapeutic Molecules */}
        <mesh>
          <sphereGeometry args={[0.18, 14, 14]} />
          <meshBasicMaterial color="#f43f5e" transparent opacity={opacity} />
        </mesh>
      </group>

      {/* Floating Bio-Fluid Molecular Micro-Suspension */}
      <points ref={bioFluidRef} geometry={fluidGeometry}>
        <pointsMaterial
          size={0.05}
          color="#2dd4bf"
          transparent
          opacity={opacity * 0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
