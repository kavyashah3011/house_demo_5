import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface HumanHealthSceneProps {
  opacity: number;
  subProgress: number;
}

export const HumanHealthScene: React.FC<HumanHealthSceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const lungsRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Mesh>(null);

  // Generate anatomical torso spine and ribcage rings
  const ribRings = useMemo(() => {
    const rings = [];
    for (let i = 0; i < 9; i++) {
      const y = 0.8 - i * 0.22;
      const radiusX = 0.75 + Math.sin((i / 8) * Math.PI) * 0.35;
      const radiusZ = 0.5 + Math.sin((i / 8) * Math.PI) * 0.25;
      rings.push({ id: i, y, radiusX, radiusZ });
    }
    return rings;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gentle anatomical orbit
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;

    // Breathing lung expansion
    if (lungsRef.current) {
      const breath = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      lungsRef.current.scale.set(breath, breath, breath);
    }

    // Cardiac pulse
    if (heartRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4.5) * 0.08;
      heartRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[1.4, -0.2, 0]} visible={opacity > 0.01}>
      {/* Head / Cranium Contour */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial
          color="#0284c7"
          wireframe
          transparent
          opacity={opacity * 0.45}
        />
      </mesh>

      {/* Brain Glow inside Cranium */}
      <mesh position={[0, 1.82, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          transparent
          opacity={opacity * 0.75}
        />
      </mesh>

      {/* Spine / Vertebral Column */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={`vert-${i}`} position={[0, 1.3 - i * 0.18, -0.1]}>
          <cylinderGeometry args={[0.08, 0.09, 0.06, 12]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={opacity * 0.6}
          />
        </mesh>
      ))}

      {/* Ribcage Horizontal Profile Rings */}
      {ribRings.map((rib) => (
        <group key={`rib-${rib.id}`} position={[0, rib.y, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[rib.radiusX, 0.015, 12, 48]} />
            <meshStandardMaterial
              color="#0ea5e9"
              transparent
              opacity={opacity * 0.4}
            />
          </mesh>
        </group>
      ))}

      {/* Lungs (Bilateral) */}
      <group ref={lungsRef} position={[0, 0.4, 0]}>
        {/* Left Lung */}
        <mesh position={[-0.42, 0, 0.05]} rotation={[0, 0, 0.1]}>
          <capsuleGeometry args={[0.26, 0.6, 12, 16]} />
          <meshPhysicalMaterial
            color="#0284c7"
            emissive="#0369a1"
            emissiveIntensity={0.3}
            transparent
            opacity={opacity * 0.55}
            roughness={0.2}
          />
        </mesh>

        {/* Right Lung */}
        <mesh position={[0.42, 0, 0.05]} rotation={[0, 0, -0.1]}>
          <capsuleGeometry args={[0.26, 0.6, 12, 16]} />
          <meshPhysicalMaterial
            color="#0284c7"
            emissive="#0369a1"
            emissiveIntensity={0.3}
            transparent
            opacity={opacity * 0.55}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Heart (Pulsing Center Left) */}
      <mesh ref={heartRef} position={[-0.15, 0.35, 0.2]}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#e11d48"
          emissiveIntensity={1.2}
          roughness={0.2}
          transparent
          opacity={opacity * 0.9}
        />
      </mesh>

      {/* Liver (Right Lower Torso) */}
      <mesh position={[0.32, -0.3, 0.15]} rotation={[0.2, 0.4, -0.3]}>
        <boxGeometry args={[0.55, 0.28, 0.4]} />
        <meshPhysicalMaterial
          color="#14b8a6"
          emissive="#0d9488"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity * 0.6}
          roughness={0.3}
        />
      </mesh>

      {/* 3D Medical Organ Labels placed cleanly on the outer right */}
      <Html position={[0.8, 1.82, 0]} distanceFactor={8}>
        <div className="pointer-events-none select-none rounded bg-slate-900/80 px-2 py-0.5 text-[9px] font-mono tracking-wider text-sky-300 border border-sky-500/40 backdrop-blur-md shadow whitespace-nowrap">
          BRAIN • SYNAPTIC
        </div>
      </Html>

      <Html position={[0.8, 0.35, 0.2]} distanceFactor={8}>
        <div className="pointer-events-none select-none rounded bg-slate-900/80 px-2 py-0.5 text-[9px] font-mono tracking-wider text-rose-300 border border-rose-500/40 backdrop-blur-md shadow whitespace-nowrap">
          HEART • 72 BPM
        </div>
      </Html>

      <Html position={[0.8, -0.3, 0.15]} distanceFactor={8}>
        <div className="pointer-events-none select-none rounded bg-slate-900/80 px-2 py-0.5 text-[9px] font-mono tracking-wider text-teal-300 border border-teal-500/40 backdrop-blur-md shadow whitespace-nowrap">
          LIVER • OPTIMAL
        </div>
      </Html>
    </group>
  );
};
