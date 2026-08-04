import type { Breakpoint, ResponsiveValue } from '../types';
import { defaultTheme } from '../theme/theme';

export function resolveResponsive<T>(
  value: ResponsiveValue<T>,
  breakpoint: Breakpoint,
): T {
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  const responsive = value as Partial<Record<Breakpoint, T>>;
  const order: Breakpoint[] = ['desktop', 'tablet', 'mobile'];
  const breakpointIndex = order.indexOf(breakpoint);

  for (let i = breakpointIndex; i < order.length; i++) {
    const val = responsive[order[i]];
    if (val !== undefined) return val;
  }

  return responsive.mobile ?? responsive.tablet ?? responsive.desktop ?? (undefined as T);
}

export function getBreakpoint(width: number): Breakpoint {
  const { breakpoints } = defaultTheme;
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
}
