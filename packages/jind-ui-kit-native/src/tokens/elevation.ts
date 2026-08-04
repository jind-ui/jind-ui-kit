import type { ViewStyle } from 'react-native';
import { Platform } from 'react-native';

export const radius = {
  xs: 4,
  sm: 5,
  md: 8,
  lg: 10,
  full: 999,
  none: 0,
} as const satisfies Record<string, number>;

export const borderWidth = {
  default: 1,
  focus: 2,
} as const satisfies Record<string, number>;

export interface NativeShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export const shadow = {
  xs: {
    shadowColor: '#18274b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor: '#18274b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  card: {
    shadowColor: '#18274b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  menu: {
    shadowColor: '#18274b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
} as const satisfies Record<string, NativeShadow>;

export const focusRing = {
  primary: Platform.select({
    ios: {
      shadowColor: '#1a72f6',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.20,
      shadowRadius: 3,
    },
    default: {},
  }) as ViewStyle,
  danger: Platform.select({
    ios: {
      shadowColor: '#e8503a',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.20,
      shadowRadius: 3,
    },
    default: {},
  }) as ViewStyle,
} as const;

export const duration = {
  fast: 120,
  base: 180,
} as const satisfies Record<string, number>;

export const easing = {
  standard: [0.4, 0, 0.2, 1] as const,
} as const;

export type RadiusKey = keyof typeof radius;
export type ShadowKey = keyof typeof shadow;
