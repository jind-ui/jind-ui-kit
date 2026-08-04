import { useState, useEffect } from 'react';
import type { Breakpoint } from '../types';
import { useTheme } from '../theme/ThemeProvider';

export function useBreakpoint(): Breakpoint {
  const theme = useTheme();
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'desktop';
    return computeBreakpoint(window.innerWidth, theme.breakpoints);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setBreakpoint(computeBreakpoint(window.innerWidth, theme.breakpoints));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.breakpoints]);

  return breakpoint;
}

function computeBreakpoint(
  width: number,
  breakpoints: { mobile: number; tablet: number; desktop: number },
): Breakpoint {
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
}
