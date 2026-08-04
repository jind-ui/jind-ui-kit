import { useState, useEffect, useRef, useCallback } from 'react';

export type TransitionStatus = 'unmounted' | 'entering' | 'entered' | 'exiting';

export interface UseTransitionOptions {
  duration?: number;
  exitDuration?: number;
}

export function useTransition(
  isOpen: boolean,
  options: UseTransitionOptions = {},
): { mounted: boolean; status: TransitionStatus; style: React.CSSProperties } {
  const { duration = 200, exitDuration } = options;
  const exit = exitDuration ?? duration;

  const [mounted, setMounted] = useState(isOpen);
  const [status, setStatus] = useState<TransitionStatus>(
    isOpen ? 'entered' : 'unmounted',
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isOpen) {
      setMounted(true);
      setStatus('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStatus('entered');
        });
      });
    } else if (mounted) {
      setStatus('exiting');
      timeoutRef.current = setTimeout(() => {
        setMounted(false);
        setStatus('unmounted');
      }, exit);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, exit]);

  const style: React.CSSProperties =
    status === 'entering' || status === 'exiting'
      ? {
          opacity: status === 'entering' ? 0 : 0,
          transition: `opacity ${status === 'exiting' ? exit : duration}ms ease, transform ${status === 'exiting' ? exit : duration}ms ease`,
          transform: 'translateY(8px)',
        }
      : status === 'entered'
        ? {
            opacity: 1,
            transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
            transform: 'translateY(0)',
          }
        : {};

  return { mounted, status, style };
}
