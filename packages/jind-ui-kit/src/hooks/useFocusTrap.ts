import { useEffect, useCallback, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled || e.key !== 'Tab' || !ref.current) return;

      const focusable = Array.from(
        ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [ref, enabled],
  );

  useEffect(() => {
    if (!enabled) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    document.addEventListener('keydown', handleKeyDown);

    requestAnimationFrame(() => {
      if (!ref.current) return;
      const focusable = ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        ref.current.setAttribute('tabindex', '-1');
        ref.current.focus();
      }
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [handleKeyDown, enabled, ref]);
}
