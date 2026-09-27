import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Sphere } from '@react-three/drei';

interface HeroSceneProps {
  opacity: number;
  subProgress: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const dnaRef = useRef<THREE.Group>(null);

  // Generate DNA helix rungs procedurally
  const { dnaNodes, rungGeometry } = useMemo(() => {
    const nodes = [];
    const count = 32;
    const rungs = new Float32Array(count * 6);

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count - 0.5) * 4.2;
      const x1 = Math.cos(t) * 1.1;
      const z1 = Math.sin(t) * 1.1;
      const x2 = -x1;
      const z2 = -z1;
      nodes.push({ id: i, pos1: [x1, y, z1] as [number, number, number], pos2: [x2, y, z2] as [number, number, number] });

      rungs[i * 6] = x1;
      rungs[i * 6 + 1] = y;
      rungs[i * 6 + 2] = z1;
      rungs[i * 6 + 3] = x2;
      rungs[i * 6 + 4] = y;
      rungs[i * 6 + 5] = z2;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(rungs, 3));

    return { dnaNodes: nodes, rungGeometry: geom };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth continuous rotation
    groupRef.current.rotation.y += delta * 0.25;
    
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.15;
      coreRef.current.rotation.z += delta * 0.1;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
      ring1Ref.current.rotation.y += delta * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.25;
      ring2Ref.current.rotation.z += delta * 0.15;
    }

    if (dnaRef.current) {
      dnaRef.current.rotation.y += delta * 0.4;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[1.5, 0, 0]} visible={opacity > 0.01}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Central Luminous Bio-Core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.2, 3]} />
          <meshPhysicalMaterial
            color="#0ea5e9"
            emissive="#0284c7"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.1}
            transmission={0.65}
            thickness={1.2}
            transparent
            opacity={opacity * 0.9}
            wireframe={false}
          />
        </mesh>

        {/* Wireframe Holographic Outer Shell */}
        <mesh scale={[1.4, 1.4, 1.4]}>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={opacity * 0.35}
          />
        </mesh>

        {/* Orbiting Quantum Sensor Ring 1 */}
        <group ref={ring1Ref}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.0, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.8}
              transparent
              opacity={opacity * 0.8}
            />
          </mesh>
        </group>

        {/* Orbiting Quantum Sensor Ring 2 */}
        <group ref={ring2Ref}>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[2.3, 0.015, 16, 100]} />
            <meshStandardMaterial
              color="#2dd4bf"
              emissive="#14b8a6"
              emissiveIntensity={0.6}
              transparent
              opacity={opacity * 0.7}
            />
          </mesh>
        </group>

        {/* Double Helix DNA Column */}
        <group ref={dnaRef} scale={[0.65, 0.65, 0.65]}>
          {dnaNodes.map((node) => (
            <group key={node.id}>
              {/* Strand 1 Node */}
              <Sphere args={[0.07, 12, 12]} position={node.pos1}>
                <meshStandardMaterial
                  color="#38bdf8"
                  emissive="#0ea5e9"
                  emissiveIntensity={0.9}
                  transparent
                  opacity={opacity}
                />
              </Sphere>

              {/* Strand 2 Node */}
              <Sphere args={[0.07, 12, 12]} position={node.pos2}>
                <meshStandardMaterial
                  color="#2dd4bf"
                  emissive="#0d9488"
                  emissiveIntensity={0.9}
                  transparent
                  opacity={opacity}
                />
              </Sphere>
            </group>
          ))}

          {/* DNA Ladder Connecting Rungs via single static lineSegments */}
          <lineSegments geometry={rungGeometry}>
            <lineBasicMaterial color="#38bdf8" transparent opacity={opacity * 0.35} />
          </lineSegments>
        </group>
      </Float>
    </group>
  );
};
