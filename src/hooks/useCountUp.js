import { useEffect, useState, useRef } from 'react';

export function useCountUp(target, isInView, duration = 1200) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    let raf;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic - premium smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * target);
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setCount(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  // respect reduced motion: if user prefers reduced, jump to target
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (isInView) setCount(target);
    }
  }, [isInView, target]);

  return count;
}
