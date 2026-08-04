import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  container?: HTMLElement;
  children: ReactNode;
}

export function Portal({ container, children }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const target = container ?? document.body;
  return createPortal(children, target);
}
