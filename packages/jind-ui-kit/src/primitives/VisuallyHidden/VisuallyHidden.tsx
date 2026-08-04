import type { CSSProperties, ReactNode } from 'react';

const hiddenStyle: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export interface VisuallyHiddenProps {
  children: ReactNode;
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span style={hiddenStyle}>{children}</span>;
}
