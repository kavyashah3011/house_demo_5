import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ClinicalAmbientFieldProps {
  scrollProgress: number;
}

export const ClinicalAmbientField: React.FC<ClinicalAmbientFieldProps> = ({ scrollProgress }) => {
  const ringsRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Line>(null);
  const depthNodesRef = useRef<THREE.Points>(null);

  // 1. Clinical Depth Nodes / Spatial Coordinates
  const nodeCount = 280;
  const [nodesGeom] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const color1 = new THREE.Color('#0284c7');
    const color2 = new THREE.Color('#06b6d4');
    const color3 = new THREE.Color('#38bdf8');

    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = -2 - Math.random() * 8; // placed in background

      const c = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return [geom];
  }, []);

  // 2. Continuous Medical Laser Scanning Plane Line
  const [scanGeom] = useMemo(() => {
    const points = [
      new THREE.Vector3(-14, 0, -3),
      new THREE.Vector3(14, 0, -3),
    ];
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return [geom];
  }, []);

  useFrame((state, delta) => {
    // Gentle rotation of background rings
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.04;
      ringsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }

    // Oscillating laser scan line (vertical sweep simulating volumetric scanning)
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 5.5;
    }

    // Gentle drift of background depth nodes
    if (depthNodesRef.current) {
      const positions = depthNodesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        positions[i * 3 + 1] += delta * 0.08;
        if (positions[i * 3 + 1] > 9) {
          positions[i * 3 + 1] = -9;
        }
      }
      depthNodesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Background Floating Depth Nodes */}
      <points ref={depthNodesRef} geometry={nodesGeom}>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Volumetric Laser Scan Line */}
      <primitive
        ref={scanLineRef}
        object={new THREE.Line(
          scanGeom,
          new THREE.LineBasicMaterial({
            color: '#38bdf8',
            transparent: true,
            opacity: 0.25,
            linewidth: 1,
          })
        )}
      />

      {/* Ethereal Clinical Depth Rings in Far Background */}
      <group ref={ringsRef} position={[0, 0, -5]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[5.2, 5.22, 64]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <ringGeometry args={[7.0, 7.02, 64]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};
