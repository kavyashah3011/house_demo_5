import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface PatientJourneySceneProps {
  opacity: number;
  subProgress: number; // 0.0 to 1.0 within frame
}

export const PatientJourneyScene: React.FC<PatientJourneySceneProps> = ({ opacity, subProgress }) => {
  const groupRef = useRef<THREE.Group>(null);

  // 5 Milestones in 3D Space positioned in the lower-middle half
  const milestones = [
    { title: "1. Early Detection", pos: [-2.6, -0.8, 0.5], color: "#38bdf8", status: "Sensing" },
    { title: "2. Precision Scan", pos: [-1.3, -0.1, 0], color: "#06b6d4", status: "Diagnostic" },
    { title: "3. Robotic Intervention", pos: [0, -0.6, -0.4], color: "#0284c7", status: "Targeted" },
    { title: "4. Cellular Therapy", pos: [1.3, -0.1, 0.2], color: "#14b8a6", status: "Molecular" },
    { title: "5. Longevity Restored", pos: [2.6, -0.5, 0.6], color: "#22c55e", status: "Optimal" },
  ];

  // Continuous curve through all 5 points
  const lineObject = useMemo(() => {
    const points = milestones.map(m => new THREE.Vector3(...m.pos));
    const curve = new THREE.CatmullRomCurve3(points);
    const curvePoints = curve.getPoints(80);
    const geom = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const mat = new THREE.LineBasicMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0.7,
      linewidth: 2,
    });
    return new THREE.Line(geom, mat);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} visible={opacity > 0.01}>
      {/* 3D Spline Path */}
      <primitive object={lineObject} />

      {/* Milestone Nodes */}
      {milestones.map((m, idx) => {
        const isActive = subProgress >= idx * 0.2 && subProgress < (idx + 1) * 0.25;
        return (
          <group key={m.title} position={m.pos as [number, number, number]}>
            {/* Glowing Milestone Core */}
            <mesh>
              <sphereGeometry args={[0.18, 20, 20]} />
              <meshStandardMaterial
                color={m.color}
                emissive={m.color}
                emissiveIntensity={isActive ? 1.8 : 0.8}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Orbiting Ring */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.32, 0.015, 12, 32]} />
              <meshBasicMaterial color={m.color} transparent opacity={opacity * 0.7} />
            </mesh>

            {/* Stage Label Billboard */}
            <Html position={[0, -0.42, 0]} center distanceFactor={8}>
              <div
                className={`select-none rounded px-2 py-0.5 text-center font-mono text-[9px] backdrop-blur transition-all duration-300 ${
                  isActive
                    ? 'bg-sky-500/25 text-sky-200 border border-sky-400 font-bold scale-105 shadow-lg'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-700/60'
                }`}
              >
                <div>{m.title}</div>
                <div className="text-[7.5px] text-teal-400 uppercase">{m.status}</div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
