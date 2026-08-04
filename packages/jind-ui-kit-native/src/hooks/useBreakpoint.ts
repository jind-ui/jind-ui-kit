import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import type { Breakpoint } from '../types';
import { useTheme } from '../theme/ThemeProvider';

export function useBreakpoint(): Breakpoint {
  const theme = useTheme();
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    getBreakpoint(Dimensions.get('window').width, theme.breakpoints),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setBreakpoint(getBreakpoint(window.width, theme.breakpoints));
    });
    return () => subscription.remove();
  }, [theme.breakpoints]);

  return breakpoint;
}

function getBreakpoint(
  width: number,
  breakpoints: { mobile: number; tablet: number; desktop: number },
): Breakpoint {
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
}
