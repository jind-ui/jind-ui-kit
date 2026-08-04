import { useLayoutEffect, useState, type RefObject } from 'react';

export type Placement = 'top' | 'bottom' | 'left' | 'right';

const oppositePlacement: Record<Placement, Placement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export function useAutoFlip<P extends Placement>(
  overlayRef: RefObject<HTMLElement | null>,
  preferredPlacement: P,
  isOpen: boolean,
): P {
  const [placement, setPlacement] = useState<Placement>(preferredPlacement);

  useLayoutEffect(() => {
    setPlacement(preferredPlacement);
  }, [isOpen, preferredPlacement]);

  useLayoutEffect(() => {
    if (!isOpen || placement !== preferredPlacement) return;
    const el = overlayRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const overflows =
      (preferredPlacement === 'bottom' && rect.bottom > window.innerHeight) ||
      (preferredPlacement === 'top' && rect.top < 0) ||
      (preferredPlacement === 'right' && rect.right > window.innerWidth) ||
      (preferredPlacement === 'left' && rect.left < 0);

    if (overflows) {
      setPlacement(oppositePlacement[preferredPlacement]);
    }
  }, [isOpen, placement, preferredPlacement]);

  return placement as P;
}
