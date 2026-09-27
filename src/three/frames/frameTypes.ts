export type TransitionType = "camera" | "zoom" | "morph" | "hybrid";
export type TextAlignment = "left" | "center" | "right";

export interface FrameCameraConfig {
  position: [number, number, number];
  rotation: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface FrameObjectConfig {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  opacity?: number;
  color?: string;
  wireframe?: boolean;
}

export interface FrameLightingConfig {
  key: number;
  fill: number;
  rim: number;
  environment: number;
  ambientColor?: string;
  keyColor?: string;
}

export interface FrameBackgroundConfig {
  color: string;
  gradient?: string;
  atmosphereDensity?: number;
}

export interface FrameHotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  value: string;
  detail: string;
}

export interface FrameImageConfig {
  src: string;
  alt: string;
  badge?: string;
  caption?: string;
  hotspots?: FrameHotspot[];
}

export interface FrameTextConfig {
  visible: boolean;
  position: string;
  alignment: TextAlignment;
  badge?: string;
  headline: string;
  subheadline?: string;
  description: string;
  primaryCta?: {
    label: string;
    action?: string;
  };
  secondaryCta?: {
    label: string;
    action?: string;
  };
  metrics?: Array<{
    label: string;
    value: string;
    sublabel?: string;
  }>;
}

export interface Healthcare3DFrame {
  id: string;
  name: string;
  index: number;
  startProgress: number;
  endProgress: number;
  camera: FrameCameraConfig;
  objects: FrameObjectConfig[];
  lighting: FrameLightingConfig;
  background: FrameBackgroundConfig;
  image: FrameImageConfig;
  text: FrameTextConfig;
  transition: {
    type: TransitionType;
    ease?: string;
    duration?: number;
  };
}

export interface FrameValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
