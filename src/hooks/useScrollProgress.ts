import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollProgressState {
  progress: number;
  velocity: number;
  direction: number; // 1 = scrolling down, -1 = scrolling up
}

export function useScrollProgress(): ScrollProgressState {
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    progress: 0,
    velocity: 0,
    direction: 1,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollState({
          progress: self.progress,
          velocity: self.getVelocity(),
          direction: self.direction,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return scrollState;
}
