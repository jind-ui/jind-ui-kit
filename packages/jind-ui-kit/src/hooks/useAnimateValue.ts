import { useState, useEffect, useRef } from 'react';

export interface UseAnimateValueOptions {
  duration?: number;
  easing?: (t: number) => number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useAnimateValue(
  target: number,
  options: UseAnimateValueOptions = {},
): number {
  const { duration = 300, easing = easeOutCubic } = options;
  const [current, setCurrent] = useState(target);
  const rafRef = useRef<number>(undefined);
  const startRef = useRef({ value: target, time: 0 });
  const fromRef = useRef(target);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    fromRef.current = current;
    startRef.current = { value: target, time: performance.now() };

    const animate = (now: number) => {
      const elapsed = now - startRef.current.time;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      const next = fromRef.current + (target - fromRef.current) * easedProgress;
      setCurrent(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return current;
}
