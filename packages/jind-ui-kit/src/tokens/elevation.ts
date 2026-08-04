export const radius: Record<string, number> = {
  xs: 4,
  sm: 5,
  md: 8,
  lg: 10,
  full: 999,
  none: 0,
};

export const borderWidth: Record<string, number> = {
  default: 1,
  focus: 2,
};

export const shadow: Record<string, string> = {
  xs: '0 1px 1px rgba(24, 39, 75, 0.04)',
  sm: '0 1px 2px rgba(24, 39, 75, 0.06)',
  card: '0 2px 6px rgba(24, 39, 75, 0.06)',
  menu: '0 8px 24px rgba(24, 39, 75, 0.10)',
  none: 'none',
};

export const focusRing: Record<string, string> = {
  primary: '0 0 0 3px rgba(26, 114, 246, 0.20)',
  danger: '0 0 0 3px rgba(232, 80, 58, 0.20)',
};

export const duration: Record<string, number> = {
  fast: 120,
  base: 180,
};

export const easing: Record<string, string> = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export type RadiusKey = keyof typeof radius;
export type ShadowKey = keyof typeof shadow;
