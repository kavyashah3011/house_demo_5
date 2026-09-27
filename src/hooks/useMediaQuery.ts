import { useState, useEffect } from 'react';

export function useMediaQuery() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      const width = window.innerWidth;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        prefersReducedMotion: reducedMotion,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return device;
}
