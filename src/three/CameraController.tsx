import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraAnimator } from './animations/cameraAnimations';

interface CameraControllerProps {
  scrollProgress: number;
}

export const CameraController: React.FC<CameraControllerProps> = ({ scrollProgress }) => {
  const { camera, pointer } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 8));

  useFrame((state, delta) => {
    // 1. Get interpolated target state from CameraAnimator
    const targetState = CameraAnimator.getCameraStateAtProgress(scrollProgress);

    // 2. Add subtle cursor / mouse parallax (gentle and controlled)
    const mouseOffsetX = pointer.x * 0.25;
    const mouseOffsetY = pointer.y * 0.18;

    const desiredX = targetState.position[0] + mouseOffsetX;
    const desiredY = targetState.position[1] + mouseOffsetY;
    const desiredZ = targetState.position[2];

    const desiredTargetX = targetState.target[0] + mouseOffsetX * 0.1;
    const desiredTargetY = targetState.target[1] + mouseOffsetY * 0.1;
    const desiredTargetZ = targetState.target[2];

    // 3. Smooth dampening (lerp) to avoid any camera pops or jitter
    const dampSpeed = Math.min(1, delta * 4.5);

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, desiredX, dampSpeed);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, desiredY, dampSpeed);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, desiredZ, dampSpeed);

    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, desiredTargetX, dampSpeed);
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, desiredTargetY, dampSpeed);
    currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, desiredTargetZ, dampSpeed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    // FOV adjustment if perspective camera
    if ('fov' in camera) {
      const persCam = camera as THREE.PerspectiveCamera;
      if (Math.abs(persCam.fov - targetState.fov) > 0.05) {
        persCam.fov = THREE.MathUtils.lerp(persCam.fov, targetState.fov, dampSpeed);
        persCam.updateProjectionMatrix();
      }
    }
  });

  return null;
};
